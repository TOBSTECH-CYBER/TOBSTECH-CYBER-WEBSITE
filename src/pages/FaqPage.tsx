import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FaqPage: React.FC<{ onNavigateToContact: () => void }> = ({ onNavigateToContact }) => {
  const { getWhatsAppUrl, businessConfig, faqs } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Quick answers about our cyber services, M-PESA Till 6816189 payment, document printing uploads, and stationery orders in Magongo.
          </p>
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-emerald-950">
            Still have a question not covered here?
          </h3>
          <p className="text-xs text-emerald-800 mt-1">
            Our Magongo attendants are active daily. Chat directly on WhatsApp or submit a quick contact message.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href={getWhatsAppUrl('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={onNavigateToContact}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Contact Page
          </button>
        </div>
      </div>
    </div>
  );
};
