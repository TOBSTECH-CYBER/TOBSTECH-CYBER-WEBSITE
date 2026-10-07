import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TermsPrivacyPage: React.FC = () => {
  const { businessConfig } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Legal & Customer Protection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Tobstech Cyber & Bookshop is committed to safeguarding customer personal data, sensitive documents, and ensuring transparent business operations in Magongo, Mombasa.
          </p>
        </div>
      </div>

      {/* Customer Data Notice & Document Policy */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-600 text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-emerald-950">
              Customer Data Notice & Document Confidentiality Promise
            </h2>
            <p className="text-xs text-emerald-800">
              Kenyan Data Protection Act (2019) Compliance
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-emerald-950 leading-relaxed">
          <p>
            When you book printing, scanning, typing, or eCitizen assistance with Tobstech:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Temporary Processing Only:</strong> Files uploaded or provided via USB are used solely to fulfill your specific printing or document request.
            </li>
            <li>
              <strong>Automatic Queue Deletion:</strong> Printed files and local temporary copies are permanently purged from cyber café workstations immediately following customer collection.
            </li>
            <li>
              <strong>Credential Protection:</strong> Passwords, KRA PIN codes, and eCitizen credentials entered during service sessions are never saved, written down, or shared.
            </li>
            <li>
              <strong>Strict Confidentiality:</strong> No customer telephone numbers, emails, or personal documents are rented, sold, or disclosed to third parties.
            </li>
          </ul>
        </div>
      </div>

      {/* Terms of Service Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Terms of Service
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
              1. Service Bookings & Turnaround
            </h3>
            <p className="text-xs text-slate-600">
              Orders and bookings submitted through this platform are scheduled according to operational hours in Magongo (7:30 AM to 8:30 PM). While we strive for immediate turnarounds, peak periods may require a few extra minutes. Customers are notified when their work is ready for collection.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
              2. M-PESA Payments & Till Verification
            </h3>
            <p className="text-xs text-slate-600">
              All electronic payments must be remitted exclusively to the official <strong>Lipa na M-PESA Buy Goods Till: 6816189</strong> registered under <strong>{businessConfig.mpesaTillName}</strong>. Submitted transaction codes are verified by staff prior to final fulfillment. Cash payments are also accepted at the counter.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
              3. Copyright & Lawful Documents
            </h3>
            <p className="text-xs text-slate-600">
              Tobstech Cyber & Bookshop adheres strictly to Kenyan copyright and statutory laws. We will not duplicate counterfeit currency, fake academic credentials, fraudulent title deeds, or unauthorized pirated publications.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
              4. Uncollected Orders & Storage
            </h3>
            <p className="text-xs text-slate-600">
              Printed hardcopy documents and stationery orders will be safely stored at our Magongo counter for up to 30 days. Items uncollected after this period may be disposed of to ensure customer privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Contact for Inquiries */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <span>For any legal or privacy questions, reach us at: <strong>{businessConfig.email}</strong></span>
        <span className="font-mono text-emerald-700 font-bold">Magongo, Mombasa</span>
      </div>
    </div>
  );
};
