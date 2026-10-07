import React from 'react';
import {
  ShieldCheck,
  FileText,
  GraduationCap,
  Printer,
  Copy,
  ScanLine,
  Shield,
  Camera,
  Edit3,
  BookMarked,
  Palette,
  Globe,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Calendar,
  CreditCard,
  MapPin,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onNavigate: (tab: string, extraData?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { businessConfig, services, products, testimonials, getWhatsAppUrl, addToCart } = useApp();

  // Helper to resolve Lucide icon by name
  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'Printer': return <Printer className="w-6 h-6 text-teal-600" />;
      case 'Copy': return <Copy className="w-6 h-6 text-indigo-600" />;
      case 'ScanLine': return <ScanLine className="w-6 h-6 text-sky-600" />;
      case 'Shield': return <Shield className="w-6 h-6 text-emerald-600" />;
      case 'Camera': return <Camera className="w-6 h-6 text-purple-600" />;
      case 'Edit3': return <Edit3 className="w-6 h-6 text-rose-600" />;
      case 'BookMarked': return <BookMarked className="w-6 h-6 text-orange-600" />;
      case 'Palette': return <Palette className="w-6 h-6 text-pink-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-cyan-600" />;
      default: return <Printer className="w-6 h-6 text-emerald-600" />;
    }
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Kenyan Location Notice Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Magongo, Mombasa • Opposite Posta / Near Roundabout</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Your Trusted Cyber, Printing & Bookshop Partner in{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-200">
                  Magongo
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Fast, reliable and convenient digital, printing, document and stationery services — all in one place. Serving students, businesses, and Mombasa residents with utmost confidentiality.
              </p>

              {/* Primary & Secondary Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('book-service')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('bookshop')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold border border-slate-700 shadow-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>Shop Now</span>
                </button>

                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 text-sm font-bold border border-emerald-600/50 shadow-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>M-PESA Till: <strong className="text-white font-mono">{businessConfig.mpesaTillNumber}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Mon-Sat from 7:30 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>100% Privacy & Data Security</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic / Service Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xs">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                      TB
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Magongo Express Counter</h3>
                      <p className="text-[11px] text-slate-400">Order Online • Collect in Minutes</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                    Live Desk
                  </span>
                </div>

                {/* Instant Quick Book/Order Shortcuts inside Hero */}
                <div className="space-y-3 py-4">
                  <div
                    onClick={() => onNavigate('book-service', { serviceId: 'srv-printing' })}
                    className="p-3 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-700/60 cursor-pointer transition-all hover:border-emerald-500/60 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/50">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Upload Document & Print
                        </div>
                        <div className="text-[11px] text-slate-400">B&W and Colour • Spiral Binding</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div
                    onClick={() => onNavigate('book-service', { serviceId: 'srv-ecitizen' })}
                    className="p-3 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-700/60 cursor-pointer transition-all hover:border-emerald-500/60 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          eCitizen & KRA Services
                        </div>
                        <div className="text-[11px] text-slate-400">PIN, Returns, Good Conduct, DL</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div
                    onClick={() => onNavigate('bookshop')}
                    className="p-3 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-700/60 cursor-pointer transition-all hover:border-emerald-500/60 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Stationery & School Books
                        </div>
                        <div className="text-[11px] text-slate-400">A4 reams, Kasuku books, Oxford sets</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Counter M-PESA Banner */}
                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600/40 text-center">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 block">
                    Fast & Verified Payment
                  </span>
                  <div className="text-xs text-white font-medium mt-0.5">
                    Lipa na M-PESA Buy Goods Till: <span className="font-mono font-bold text-emerald-300 bg-emerald-900/90 px-1.5 py-0.5 rounded text-sm">{businessConfig.mpesaTillNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Professional & Government Solutions
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            OUR SERVICES
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            From high-speed printing and urgent government portals to university project binding and CBC stationery, we have got you covered in Magongo.
          </p>
        </div>

        {/* 12 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-400/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                    {renderIcon(service.iconName)}
                  </div>
                  {service.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
                  <span className="text-xs font-extrabold text-slate-900">
                    KES {service.startingPrice}
                  </span>
                </div>

                <button
                  onClick={() => onNavigate('book-service', { serviceId: service.id })}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors"
          >
            <span>View Full Services Directory with Pricing Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. FEATURED BOOKSHOP & STATIONERY */}
      <section className="bg-slate-100/60 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                School & Office Supplies
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Stationery & Bookshop Essentials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Quality Kasuku exercise books, A4 printing reams, mathematical sets, and office files.
              </p>
            </div>
            <button
              onClick={() => onNavigate('bookshop')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white px-4 py-2 rounded-xl border border-slate-300 shadow-2xs hover:shadow transition-all self-start md:self-auto"
            >
              <span>Explore Full Bookshop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute top-2 right-2 text-[10px] font-bold uppercase bg-white/95 text-emerald-800 px-2 py-0.5 rounded shadow-xs">
                      {product.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-base font-extrabold text-slate-900">
                      KES {product.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-400">{product.unit || 'Piece'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        onNavigate('cart');
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE TOBSTECH? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Trust & Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            WHY CHOOSE TOBSTECH?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            We are dedicated to serving Magongo with modern cyber infrastructure, honest pricing, and strict privacy safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Fast Service',
              desc: 'High-speed laser printers, multi-core computer stations, and skilled attendants mean you never waste precious hours waiting in queues.',
              icon: <Clock className="w-5 h-5 text-emerald-600" />,
            },
            {
              title: 'Convenient Online Booking',
              desc: 'Submit your printing documents, CV requests, or eCitizen applications online anytime from your phone and pick up ready copies.',
              icon: <Calendar className="w-5 h-5 text-teal-600" />,
            },
            {
              title: 'Professional Assistance',
              desc: 'Our staff are courteous, patient, and knowledgeable with government portals, college admissions, tax compliance, and document layout.',
              icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
            },
            {
              title: 'Customer Privacy',
              desc: 'Your national ID copies, sensitive bank slips, and private documents are handled with strict confidentiality and deleted after printing.',
              icon: <Lock className="w-5 h-5 text-rose-600" />,
            },
            {
              title: 'Reliable Service',
              desc: 'Reliable power backup and stable fibre internet guarantee that your urgent deadlines, KUCCPS applications, or job tenders will be completed.',
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
            },
            {
              title: 'Affordable Prices',
              desc: 'Fair, transparent pricing for students, small business owners, and schools in Magongo, with convenient M-PESA Till 6816189 checkout.',
              icon: <CreditCard className="w-5 h-5 text-amber-600" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (5-STEP PROCESS) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Simple 5-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              HOW IT WORKS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Get your cyber services or stationery without hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Choose a service',
                desc: 'Browse our cyber services or stationery products catalog.',
              },
              {
                step: '02',
                title: 'Book or place order',
                desc: 'Upload files, specify copies/options, or add stationery to cart.',
              },
              {
                step: '03',
                title: 'Make payment',
                desc: 'Pay via M-PESA Buy Goods Till: 6816189 and enter transaction code.',
              },
              {
                step: '04',
                title: 'Receive confirmation',
                desc: 'Get your unique reference (e.g. TB-2026-0001) and real-time tracking.',
              },
              {
                step: '05',
                title: 'Collect / Receive',
                desc: 'Pick up your completed work in Magongo or receive delivery.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/70 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Community Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            What Magongo Customers Say
          </h2>
          <p className="text-xs text-slate-400 mt-1 italic">
            [Sample reviews - can be updated or managed by the business]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STRONG FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-600/40">
              Fast Turnaround in Magongo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Need a Cyber Service Today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Skip the long queues. Book your printing, CV preparation, eCitizen application or stationery order now. Pay conveniently via M-PESA Till 6816189.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('book-service')}
                className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold rounded-xl text-xs shadow-md transition-all active:scale-95"
              >
                BOOK A SERVICE
              </button>
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP US</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
