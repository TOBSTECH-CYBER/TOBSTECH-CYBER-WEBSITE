import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  CreditCard,
  MessageCircle,
  X,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingRecord } from '../types';

interface BookServicePageProps {
  initialServiceId?: string;
  onNavigateToTracking: (referenceId: string) => void;
}

export const BookServicePage: React.FC<BookServicePageProps> = ({
  initialServiceId,
  onNavigateToTracking,
}) => {
  const {
    services,
    businessConfig,
    createBooking,
    customer,
    submitPaymentForBooking,
    getWhatsAppUrl,
  } = useApp();

  const [serviceId, setServiceId] = useState<string>(initialServiceId || services[0]?.id || '');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('10:00 AM');
  const [fullName, setFullName] = useState<string>(customer?.fullName || '');
  const [phone, setPhone] = useState<string>(customer?.phone || '');
  const [email, setEmail] = useState<string>(customer?.email || '');
  const [instructions, setInstructions] = useState<string>('');

  // Document specifications (for printing, photocopy, typing)
  const [numberOfCopies, setNumberOfCopies] = useState<number>(1);
  const [colorType, setColorType] = useState<'black_and_white' | 'full_colour'>('black_and_white');
  const [paperSize, setPaperSize] = useState<'A4' | 'A3'>('A4');
  const [sided, setSided] = useState<'single_sided' | 'double_sided'>('single_sided');
  const [binding, setBinding] = useState<'none' | 'spiral' | 'staple'>('none');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; sizeMb: number } | null>(null);

  // M-PESA advance payment entry
  const [mpesaCode, setMpesaCode] = useState<string>('');

  // Submission status
  const [submittedBooking, setSubmittedBooking] = useState<BookingRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialServiceId) {
      setServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  const selectedService = services.find((s) => s.id === serviceId) || services[0];
  const isPrintService =
    selectedService?.id === 'srv-printing' ||
    selectedService?.id === 'srv-photocopy' ||
    selectedService?.id === 'srv-typing-cv';

  // Calculate estimated price
  const calculateEstimatedCost = () => {
    let base = selectedService ? selectedService.startingPrice : 100;
    if (isPrintService) {
      const pageUnit = colorType === 'full_colour' ? 30 : 10;
      let cost = pageUnit * numberOfCopies;
      if (binding === 'spiral') cost += 100;
      if (paperSize === 'A3') cost *= 2;
      return Math.max(cost, base);
    }
    return base;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = Number((file.size / (1024 * 1024)).toFixed(2));
      setUploadedFile({
        name: file.name,
        sizeMb: sizeMb || 0.5,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    const estCost = calculateEstimatedCost();

    const booking = createBooking({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || 'customer@tobstech.co.ke',
      preferredDate: date,
      preferredTime: time,
      additionalInstructions: instructions.trim(),
      specs: isPrintService
        ? {
            numberOfCopies,
            colorType,
            paperSize,
            sided,
            binding,
            fileName: uploadedFile?.name,
            fileSizeMb: uploadedFile?.sizeMb,
          }
        : undefined,
      estimatedCost: estCost,
      mpesaCode: mpesaCode.trim() ? mpesaCode.trim().toUpperCase() : undefined,
    });

    setIsSubmitting(false);
    setSubmittedBooking(booking);
  };

  const handleMpesaDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittedBooking || !mpesaCode.trim()) return;
    submitPaymentForBooking(submittedBooking.id, mpesaCode.trim());
    setSubmittedBooking({
      ...submittedBooking,
      mpesaCode: mpesaCode.trim().toUpperCase(),
      paymentStatus: 'Pending Verification',
    });
  };

  if (submittedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Booking Submitted Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Reference: <span className="text-emerald-700 font-mono">{submittedBooking.id}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Thank you, <strong>{submittedBooking.customerName}</strong>. Your service booking has been queued at Tobstech Cyber & Bookshop Magongo.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Service Requested:</span>
              <span className="font-bold text-slate-900">{submittedBooking.serviceName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Scheduled Appointment:</span>
              <span className="font-bold text-slate-900">{submittedBooking.preferredDate} at {submittedBooking.preferredTime}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Customer Phone:</span>
              <span className="font-bold text-slate-900">{submittedBooking.customerPhone}</span>
            </div>
            {submittedBooking.specs?.fileName && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Uploaded Document:</span>
                <span className="font-bold text-teal-700 truncate max-w-xs">{submittedBooking.specs.fileName} ({submittedBooking.specs.fileSizeMb} MB)</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Estimated Starting Cost:</span>
              <span className="font-bold text-slate-900">KES {submittedBooking.estimatedCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Booking Status:</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {submittedBooking.bookingStatus}
              </span>
            </div>
          </div>

          {/* M-PESA Till Section */}
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  Optional Deposit / Payment via M-PESA
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  You can pay ahead to expedite printing or pay at our Magongo counter.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Lipa na M-PESA Buy Goods Till:</span>
                <span className="text-sm font-black font-mono text-emerald-800">{businessConfig.mpesaTillNumber}</span>
                <span className="text-[11px] text-slate-500 block">Name: {businessConfig.mpesaTillName}</span>
              </div>
              <span className="text-xs font-extrabold text-slate-900">KES {submittedBooking.estimatedCost}</span>
            </div>

            {submittedBooking.mpesaCode ? (
              <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block">M-PESA Code Submitted:</span>
                  <strong className="font-mono text-emerald-800 font-bold">{submittedBooking.mpesaCode}</strong>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  {submittedBooking.paymentStatus}
                </span>
              </div>
            ) : (
              <form onSubmit={handleMpesaDepositSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter M-PESA Code (e.g. SI84QW79KL)"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-emerald-300 rounded-xl bg-white uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!mpesaCode.trim()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  Submit Code
                </button>
              </form>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => onNavigateToTracking(submittedBooking.id)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Track This Booking</span>
            </button>

            <a
              href={getWhatsAppUrl('booking', submittedBooking)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setSubmittedBooking(null);
                setUploadedFile(null);
                setMpesaCode('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Convenient Cyber & Document Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Book a Cyber or Printing Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Choose your service, specify document requirements or upload your files. We will have everything prepared for quick pickup in Magongo.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Step 1: Select Service */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Choose Service
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((srv) => {
                const isSelected = srv.id === serviceId;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setServiceId(srv.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{srv.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {srv.shortDescription}
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-700 mt-1 block">
                        From KES {srv.startingPrice} • {srv.estimatedTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Document / Printing Specifications if printing service */}
          {isPrintService && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-emerald-600" />
                  Printing & Document Specifications
                </span>
                <span className="text-[11px] text-slate-500">Fast laser output</span>
              </div>

              {/* Upload Document Box */}
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-5 text-center bg-white transition-colors">
                <input
                  type="file"
                  id="document-upload"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx"
                />
                <label htmlFor="document-upload" className="cursor-pointer block space-y-2">
                  <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-slate-900">
                    {uploadedFile ? (
                      <span className="text-emerald-700 flex items-center justify-center gap-1">
                        <FileCheck className="w-4 h-4" />
                        {uploadedFile.name} ({uploadedFile.sizeMb} MB)
                      </span>
                    ) : (
                      'Click to upload your document (PDF, Word, Image)'
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Max size 50MB. Files are strictly confidential and deleted after printing.
                  </p>
                </label>
                {uploadedFile && (
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="mt-2 text-[11px] text-rose-600 hover:underline flex items-center gap-1 mx-auto"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove File</span>
                  </button>
                )}
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Number of Copies */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Copies
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={numberOfCopies}
                    onChange={(e) => setNumberOfCopies(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>

                {/* Colour Type */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Color
                  </label>
                  <select
                    value={colorType}
                    onChange={(e) => setColorType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="black_and_white">Black & White (KES 10/p)</option>
                    <option value="full_colour">Full Colour (KES 30/p)</option>
                  </select>
                </div>

                {/* Paper Size */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Paper Size
                  </label>
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="A4">A4 Standard</option>
                    <option value="A3">A3 Large</option>
                  </select>
                </div>

                {/* Binding Option */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Binding
                  </label>
                  <select
                    value={binding}
                    onChange={(e) => setBinding(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="none">No Binding</option>
                    <option value="spiral">Spiral Wire (+ KES 100)</option>
                    <option value="staple">Corner Staple</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Preferred Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Step 4: Customer Contact Info */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Contact Details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Mwangi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Phone Number (M-PESA) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Additional Instructions */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Additional Instructions / Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Print page 1 to 15 double sided, cover page on glossy card, or specific KRA password notes..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Summary Box with M-PESA Till */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
                Estimated Service Fee
              </span>
              <span className="text-xl font-black text-slate-900">
                KES {calculateEstimatedCost().toLocaleString()}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pay via M-PESA Till: <strong>{businessConfig.mpesaTillNumber}</strong> or cash at counter upon collection.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              {isSubmitting ? 'Submitting...' : 'SUBMIT SERVICE BOOKING'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
