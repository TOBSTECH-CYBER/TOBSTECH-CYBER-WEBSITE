import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Phone,
  MessageCircle,
  Calendar,
  ShieldAlert,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openAdminModal,
}) => {
  const {
    businessConfig,
    cartCount,
    customer,
    isAdmin,
    setIsSearchOpen,
    getWhatsAppUrl,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    { id: 'bookshop', label: 'BOOKSHOP' },
    { id: 'cart', label: 'ORDER' },
    { id: 'book-service', label: 'BOOK A SERVICE' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100">
      {/* Top Banner Bar with Kenyan Local info & M-PESA Till */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {businessConfig.location}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Till No (Buy Goods): <strong className="text-white font-mono bg-emerald-950/80 px-1.5 py-0.5 rounded text-[11px] border border-emerald-500/30">{businessConfig.mpesaTillNumber}</strong>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300">
              Open Daily: {businessConfig.openingHours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            <a
              href={`tel:${businessConfig.phone}`}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">{businessConfig.phone}</span>
            </a>

            <span className="text-slate-600">|</span>

            {/* Quick Admin Toggle / Entry for Management */}
            <button
              onClick={openAdminModal}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Staff & Management Dashboard"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>{isAdmin ? 'Admin Active' : 'Staff Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  TOBSTECH
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  MAGONGO
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider -mt-0.5">
                Cyber • Printing • Bookshop
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-xs font-bold tracking-wide rounded-lg transition-all ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/90 font-extrabold'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Area: Search, Cart, Account, Book, WhatsApp */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search services & stationery"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Cart / Orders"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Profile */}
            <button
              onClick={() => handleNavClick('account')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentTab === 'account'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              title="Customer Account"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">
                {customer ? customer.fullName.split(' ')[0] : 'My Account'}
              </span>
            </button>

            {/* WhatsApp Us Button */}
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs hover:shadow transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WHATSAPP US</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={() => handleNavClick('book-service')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>BOOK NOW</span>
            </button>
          </div>

          {/* Mobile Right Icons & Hamburger */}
          <div className="flex items-center gap-1 sm:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute 1 top-0 right-0 bg-emerald-600 text-white font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {/* Quick Till alert inside mobile menu */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
              <span className="text-emerald-900 font-medium">Lipa na M-PESA Till:</span>
              <span className="font-mono font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                6816189
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between transition-colors ${
                    currentTab === link.id
                      ? 'bg-emerald-600 text-white font-extrabold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}

              <button
                onClick={() => handleNavClick('account')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                  currentTab === 'account'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>MY ACCOUNT / TRACK ORDER</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminModal();
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Tobstech Staff / Admin Portal</span>
              </button>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-3 grid grid-cols-2 gap-2">
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs active:bg-emerald-700"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP US</span>
              </a>

              <button
                onClick={() => handleNavClick('book-service')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs active:bg-slate-800"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>BOOK NOW</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
