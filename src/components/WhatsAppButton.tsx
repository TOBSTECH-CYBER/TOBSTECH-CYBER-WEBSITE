import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppButton: React.FC = () => {
  const { businessConfig, getWhatsAppUrl } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    { label: 'Print my document', text: 'Hello Tobstech, I have a document I need printed today.' },
    { label: 'eCitizen / KRA Assistance', text: 'Hello Tobstech, I need assistance with eCitizen / KRA services.' },
    { label: 'Check bookshop item stock', text: 'Hello Tobstech, do you have school stationery / exercise books in stock?' },
    { label: 'Order status inquiry', text: 'Hello Tobstech, I would like to check on my order status.' },
  ];

  const handleSendPrompt = (text: string) => {
    let phone = businessConfig.whatsappNumber.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      phone = '254' + phone.slice(1);
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleSendPrompt(customMsg);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Mini Popup Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-92 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-emerald-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">Tobstech WhatsApp Support</h4>
                <p className="text-[11px] text-emerald-100 font-medium">Magongo, Mombasa • Active Now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-xs">
              <p className="font-semibold text-slate-900 mb-1">Karibu! How can we assist you today?</p>
              Send us a message directly on WhatsApp for instant feedback on printing, KRA/eCitizen, stationery or orders.
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Quick Messages:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendPrompt(p.text)}
                    className="text-left px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 rounded-lg border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between group"
                  >
                    <span>{p.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 opacity-60 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom text input */}
            <form onSubmit={handleSendCustom} className="pt-1 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                type="submit"
                disabled={!customMsg.trim()}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          {isOpen ? 'Close' : 'Chat on WhatsApp'}
        </span>
      </button>
    </div>
  );
};
