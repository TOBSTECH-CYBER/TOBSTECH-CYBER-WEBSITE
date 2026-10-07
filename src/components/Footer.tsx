import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openAdminModal }) => {
  const { businessConfig, getWhatsAppUrl } = useApp();

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Magongo's Trusted Cyber Hub</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Fast eCitizen, KRA tax returns, online applications, and high-speed photocopying.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-900/60 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Lipa na M-PESA Till: 6816189</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Pay safely via Buy Goods & Services. Instant order tracking and verified receipts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Prompt Document Turnaround</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your assignments or reports online. Collect printed and bound copies on time.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  TOBSTECH
                </span>
                <span className="text-[10px] ml-2 font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-800">
                  MOMBASA
                </span>
                <p className="text-xs font-medium text-slate-400">
                  Cyber • Printing • Document Services • Bookshop
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Your one-stop technology, document processing, and school stationery centre in Magongo, Mombasa. Dedicated to assisting students, SMEs, institutions, and the local community with reliable and confidential service.
            </p>

            {/* M-PESA Box */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-900/50 inline-block">
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Official M-PESA Payment Details
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs text-slate-300">Buy Goods Till:</span>
                <span className="font-mono text-base font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {businessConfig.mpesaTillNumber}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Name: {businessConfig.mpesaTillName}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-emerald-400 transition-colors">
                  Cyber & Printing Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bookshop')} className="hover:text-emerald-400 transition-colors">
                  Bookshop & Stationery Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('book-service')} className="hover:text-emerald-400 transition-colors">
                  Book a Service (Online Upload)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cart')} className="hover:text-emerald-400 transition-colors">
                  Shopping Cart & Orders
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-emerald-400 transition-colors">
                  My Account / Order Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200">eCitizen Portal Assistance</li>
              <li className="hover:text-slate-200">KRA PIN Registration & Returns</li>
              <li className="hover:text-slate-200">Colour & Black/White Laser Printing</li>
              <li className="hover:text-slate-200">Commercial Photocopying & Scanning</li>
              <li className="hover:text-slate-200">Instant Passport-Size Photos</li>
              <li className="hover:text-slate-200">Spiral & Hardcover Document Binding</li>
              <li className="hover:text-slate-200">Laminating & PVC Card Protection</li>
              <li className="hover:text-slate-200">School CBC Books & Exercise Books</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{businessConfig.landmark}, {businessConfig.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${businessConfig.phone}`} className="hover:text-white transition-colors">
                  {businessConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {businessConfig.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-white transition-colors">
                  {businessConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-medium">Mon - Fri: {businessConfig.openingHours.weekdays}</span>
                  <span className="block text-slate-400">Sat: {businessConfig.openingHours.saturday}</span>
                  <span className="block text-slate-400">Sun: {businessConfig.openingHours.sunday}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Staff Link & Copyright */}
        <div className="pt-8 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Tobstech Cyber & Bookshop. All Rights Reserved. Magongo, Mombasa, Kenya.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => handleNav('faq')} className="hover:text-slate-300 transition-colors">
              FAQ
            </button>
            <span>•</span>
            <button onClick={() => handleNav('terms-privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('terms-privacy')} className="hover:text-slate-300 transition-colors">
              Terms & Customer Notice
            </button>
            <span>•</span>
            <button
              onClick={openAdminModal}
              className="text-slate-400 hover:text-emerald-400 font-medium transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
