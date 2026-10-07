import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Clock,
  Lock,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AboutPageProps {
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToServices,
  onNavigateToContact,
}) => {
  const { businessConfig } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            About Tobstech Cyber & Bookshop
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Empowering Magongo with Reliable Digital, Document & Educational Solutions
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Established along Magongo Main Road in Mombasa, Tobstech Cyber & Bookshop serves students, local entrepreneurs, job seekers, and the surrounding community with dependable cyber services, high-speed printing, and quality school stationery.
          </p>
        </div>
      </div>

      {/* Core Mission & Community Commitment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Purpose & Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In today's fast-moving digital economy, accessing government portals like eCitizen, filing KRA tax returns, submitting KUCCPS or HELB applications, and printing essential contracts should be seamless and stress-free.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Tobstech, we combine modern technology, fast fibre internet, high-volume laser printers, and trained staff to ensure you receive prompt, accurate, and professional assistance every time you visit or book online.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>Serving Magongo, Changamwe, Mikindani & Greater Mombasa</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Customer Privacy & Security First</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We understand that cyber customers entrust us with sensitive personal data: National IDs, KRA PIN certificates, bank statements, academic records, and CVs.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tobstech enforces a rigorous confidentiality standard. Soft copies uploaded for printing are processed on secure workstations and permanently purged from print queues once jobs are collected. We never retain or expose customer files.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Confidentiality & Data Protection Promise</span>
          </div>
        </div>
      </div>

      {/* Pillar Values */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Core Principles
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">What Guides Tobstech</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Convenience',
              desc: 'Book your service or order stationery online, pay via M-PESA Till 6816189, and pick up without queuing.',
              icon: <Clock className="w-5 h-5 text-emerald-600" />,
            },
            {
              title: 'Efficiency',
              desc: 'High-speed laser printing, commercial photocopiers, and fast computer terminals minimize turnaround time.',
              icon: <Award className="w-5 h-5 text-teal-600" />,
            },
            {
              title: 'Professional Service',
              desc: 'Our assistants treat every student, elder, and business client with patience, clarity, and respect.',
              icon: <Users className="w-5 h-5 text-blue-600" />,
            },
            {
              title: 'Reliable Assistance',
              desc: 'From troubleshooting complex eCitizen form issues to formatting university thesis reports, we deliver.',
              icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
            },
          ].map((val, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 inline-block mb-3">
                {val.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{val.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Store Location Showcase */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Visit Us in Person</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Conveniently Located in Magongo, Mombasa
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Situated along Magongo Main Road (Opposite Posta / near the Magongo Roundabout). Open from 7:30 AM on weekdays and Saturdays for early morning student and office runs.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onNavigateToServices}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
          >
            Explore Services
          </button>
          <button
            onClick={onNavigateToContact}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
          >
            Contact & Directions
          </button>
        </div>
      </div>
    </div>
  );
};
