import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Printer,
  Copy,
  ScanLine,
  Shield,
  Camera,
  Edit3,
  BookMarked,
  Palette,
  Globe,
  GraduationCap,
  Calendar,
  MessageCircle,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, ServiceItem } from '../types';

interface ServicesPageProps {
  onBookService: (serviceId: string) => void;
  onNavigateToBookshop: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onBookService,
  onNavigateToBookshop,
}) => {
  const { services, getWhatsAppUrl } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'cyber_government', label: 'Cyber & Government Services' },
    { id: 'document_services', label: 'Document & Printing Services' },
    { id: 'digital_design', label: 'Digital Design & Computer Services' },
  ];

  const filteredServices = services.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'FileText': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-600" />;
      case 'Printer': return <Printer className="w-5 h-5 text-teal-600" />;
      case 'Copy': return <Copy className="w-5 h-5 text-indigo-600" />;
      case 'ScanLine': return <ScanLine className="w-5 h-5 text-sky-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-600" />;
      case 'Camera': return <Camera className="w-5 h-5 text-purple-600" />;
      case 'Edit3': return <Edit3 className="w-5 h-5 text-rose-600" />;
      case 'BookMarked': return <BookMarked className="w-5 h-5 text-orange-600" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-600" />;
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-600" />;
      default: return <Printer className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Magongo, Mombasa Service Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cyber & Document Services Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Professional eCitizen and KRA portal assistance, high-speed document printing, scanning, laminating, passport photos, and document typing. Book online or visit our Magongo counter.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {renderIcon(service.iconName)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Est: {service.estimatedTime}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900">{service.name}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {service.shortDescription}
              </p>

              {service.requiresDocumentUpload && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Document upload supported</span>
                </div>
              )}
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting from</span>
                <span className="text-sm font-extrabold text-slate-900">
                  KES {service.startingPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppUrl('service', service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl border border-slate-200 transition-colors"
                  title="Ask on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onBookService(service.id)}
                  className="px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bookshop & Stationery Cross-Link Banner */}
      <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Looking for School & Office Stationery?
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            We supply Kasuku exercise books, A4 printing reams, mathematical sets, pens, and files in Magongo.
          </p>
        </div>
        <button
          onClick={onNavigateToBookshop}
          className="shrink-0 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
        >
          <span>Visit Bookshop Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
