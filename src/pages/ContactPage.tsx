import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Navigation,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { businessConfig, getWhatsAppUrl, addNotification } = useApp();

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    addNotification(
      'Message Received',
      `Thank you ${senderName}. Your message regarding "${subject}" has been received. Our team will get back to you shortly.`,
      'info'
    );

    setIsSent(true);
    setSenderName('');
    setSenderPhone('');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Magongo, Mombasa, Kenya
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact Tobstech Cyber & Bookshop
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have questions about document printing, KRA/eCitizen applications, bulk photocopy orders, or school book supplies? Reach out to us or stop by our Magongo centre.
          </p>
        </div>
      </div>

      {/* Main Grid: Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Store Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Physical Location</span>
                  <p className="text-slate-600 mt-0.5">{businessConfig.landmark}</p>
                  <p className="text-slate-500">{businessConfig.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700 shrink-0 border border-teal-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Telephone / Call Us</span>
                  <a
                    href={`tel:${businessConfig.phone}`}
                    className="text-emerald-700 hover:underline font-semibold block mt-0.5"
                  >
                    {businessConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">WhatsApp Desk</span>
                  <a
                    href={getWhatsAppUrl('general')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-semibold block mt-0.5"
                  >
                    {businessConfig.whatsappNumber} (Chat Now)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700 shrink-0 border border-blue-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Email Address</span>
                  <a
                    href={`mailto:${businessConfig.email}`}
                    className="text-blue-700 hover:underline block mt-0.5"
                  >
                    {businessConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0 border border-slate-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Working Hours</span>
                  <p className="text-slate-600 mt-0.5">Monday - Friday: {businessConfig.openingHours.weekdays}</p>
                  <p className="text-slate-600">Saturday: {businessConfig.openingHours.saturday}</p>
                  <p className="text-slate-600">Sunday: {businessConfig.openingHours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${businessConfig.phone}`}
                className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>

              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* M-PESA Till Card */}
          <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Official Payment Till
            </span>
            <div className="text-xs text-slate-200">
              Lipa na M-PESA Buy Goods Till:
            </div>
            <div className="font-mono font-black text-2xl text-emerald-300">
              {businessConfig.mpesaTillNumber}
            </div>
            <p className="text-[11px] text-slate-400">
              Name: {businessConfig.mpesaTillName}
            </p>
          </div>
        </div>

        {/* Contact Form & Simulated Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Send Us a Message
            </h3>

            {isSent ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">Message Sent Successfully</h4>
                <p className="text-xs text-emerald-800">
                  Thank you! Our attendant will review your request and get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs font-bold text-emerald-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Ochieng"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. samuel@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="General Cyber Inquiry">General Cyber Inquiry</option>
                      <option value="Bulk Printing / Photocopying">Bulk Printing / Photocopying</option>
                      <option value="KRA & eCitizen Assistance">KRA & eCitizen Assistance</option>
                      <option value="Bookshop & School Stationery">Bookshop & School Stationery</option>
                      <option value="Order Tracking Help">Order Tracking Help</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what service you need or what questions you have..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map & Directions Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Location & Map Directions
                </h4>
                <p className="text-[11px] text-slate-500">Magongo, Mombasa (Opposite Posta)</p>
              </div>

              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Navigation className="w-3 h-3 text-emerald-600" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Visual Simulated Map Card */}
            <div className="relative h-48 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg mb-2 animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900">
                TOBSTECH CYBER & BOOKSHOP
              </span>
              <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">
                Magongo Main Road, Opposite Posta / Near Magongo Roundabout, Mombasa Kenya
              </p>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-2 border border-emerald-200">
                Easily accessible from Airport Road, Changamwe & Mikindani
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
