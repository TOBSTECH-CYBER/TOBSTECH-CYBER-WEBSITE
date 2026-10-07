import React, { useState } from 'react';
import {
  User,
  Package,
  Calendar,
  CreditCard,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowRight,
  Phone,
  Mail,
  RefreshCw,
  Eye,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderRecord, BookingRecord } from '../types';

interface AccountPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
  onNavigateToBookshop: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  onNavigateToBooking,
  onNavigateToBookshop,
}) => {
  const {
    customer,
    loginCustomer,
    registerCustomer,
    logoutCustomer,
    updateCustomerProfile,
    orders,
    bookings,
    addToCart,
    products,
    getWhatsAppUrl,
  } = useApp();

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmailOrPhone, setAuthEmailOrPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  // Dashboard Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'payments' | 'profile' | 'track'>('orders');

  // Tracking search
  const [trackQuery, setTrackQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderRecord | null>(null);

  // Profile Edit
  const [profileName, setProfileName] = useState(customer?.fullName || '');
  const [profilePhone, setProfilePhone] = useState(customer?.phone || '');
  const [profileEmail, setProfileEmail] = useState(customer?.email || '');

  // Filter orders and bookings for this customer
  const customerOrders = orders.filter((o) => {
    if (!customer) return false;
    return (
      o.customerEmail.toLowerCase() === customer.email.toLowerCase() ||
      o.customerPhone === customer.phone
    );
  });

  const customerBookings = bookings.filter((b) => {
    if (!customer) return false;
    return (
      b.customerEmail.toLowerCase() === customer.email.toLowerCase() ||
      b.customerPhone === customer.phone
    );
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmailOrPhone.trim()) return;
    loginCustomer(authEmailOrPhone, authPassword);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) return;
    registerCustomer(regName.trim(), regPhone.trim(), regEmail.trim());
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      fullName: profileName.trim(),
      phone: profilePhone.trim(),
      email: profileEmail.trim(),
    });
  };

  const handleReorder = (order: OrderRecord) => {
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity);
      }
    });
    alert('Items from this order have been added to your cart!');
  };

  // Tracking query matches
  const foundTrackOrder = orders.find(
    (o) =>
      o.id.toLowerCase() === trackQuery.trim().toLowerCase() ||
      o.customerPhone === trackQuery.trim()
  );

  const foundTrackBooking = bookings.find(
    (b) =>
      b.id.toLowerCase() === trackQuery.trim().toLowerCase() ||
      b.customerPhone === trackQuery.trim()
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Customer Portal & Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            {customer ? `Welcome back, ${customer.fullName}` : 'My Account & Order Tracking'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Track your stationery orders, check printing and KRA/eCitizen booking status, and view M-PESA receipts.
          </p>
        </div>

        {customer && (
          <button
            onClick={logoutCustomer}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      {!customer ? (
        /* If NOT logged in: Show Login / Register + Quick Public Order Tracker */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Track without login */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Track Order or Booking Without Login
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Enter your Order Reference (e.g. <code>TB-ORD-2026-1001</code>) or Booking Reference (e.g. <code>TB-BK-2026-0001</code>) or Phone Number.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Reference No. or Phone (e.g. 0722123456)"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {trackQuery && (
                <div className="pt-2">
                  {foundTrackOrder ? (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>Order {foundTrackOrder.id}</span>
                        <span className="text-emerald-800">{foundTrackOrder.orderStatus}</span>
                      </div>
                      <p className="text-slate-600">Customer: {foundTrackOrder.customerName}</p>
                      <p className="text-slate-600">Amount: KES {foundTrackOrder.totalAmount.toLocaleString()} ({foundTrackOrder.paymentStatus})</p>
                      {foundTrackOrder.mpesaCode && (
                        <p className="font-mono text-emerald-900">M-PESA Code: {foundTrackOrder.mpesaCode}</p>
                      )}
                      <a
                        href={getWhatsAppUrl('order', foundTrackOrder)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  ) : foundTrackBooking ? (
                    <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>Booking {foundTrackBooking.id}</span>
                        <span className="text-teal-800">{foundTrackBooking.bookingStatus}</span>
                      </div>
                      <p className="text-slate-600">Service: {foundTrackBooking.serviceName}</p>
                      <p className="text-slate-600">Date: {foundTrackBooking.preferredDate} at {foundTrackBooking.preferredTime}</p>
                      <p className="text-slate-600">Est. Fee: KES {foundTrackBooking.estimatedCost} ({foundTrackBooking.paymentStatus})</p>
                      <a
                        href={getWhatsAppUrl('booking', foundTrackBooking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 mt-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <p className="text-xs text-rose-500 italic">No record found with that reference or phone.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Login or Register Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex gap-4">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                    authMode === 'login'
                      ? 'text-emerald-700 border-b-2 border-emerald-600 font-black'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Customer Sign In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors ${
                    authMode === 'register'
                      ? 'text-emerald-700 border-b-2 border-emerald-600 font-black'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Demo 1-Click Login for Instant Test */}
              <button
                type="button"
                onClick={() => loginCustomer('0722123456')}
                className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                ⚡ Demo Login (Amina)
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0722 123 456 or amina@example.com"
                    value={authEmailOrPhone}
                    onChange={(e) => setAuthEmailOrPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
                >
                  SIGN IN TO MY ACCOUNT
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Faith Mwende"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white"
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
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. faith@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
                >
                  CREATE ACCOUNT
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        /* If LOGGED IN: Full Account Dashboard */
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
            {[
              { id: 'orders', label: `My Orders (${customerOrders.length})`, icon: Package },
              { id: 'bookings', label: `My Bookings (${customerBookings.length})`, icon: Calendar },
              { id: 'payments', label: 'Payment History', icon: CreditCard },
              { id: 'profile', label: 'Profile & Details', icon: User },
              { id: 'track', label: 'Instant Tracker', icon: Search },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {customerOrders.length > 0 ? (
                <div className="space-y-4">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-900 text-sm">{ord.id}</span>
                          <span className="text-slate-400">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {ord.orderStatus}
                          </span>
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {ord.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 text-xs">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-slate-700">
                            <span>{it.productName} (x{it.quantity})</span>
                            <span className="font-semibold">KES {it.total.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-slate-500">Total: </span>
                          <strong className="text-emerald-700 font-bold">
                            KES {ord.totalAmount.toLocaleString()}
                          </strong>
                          {ord.mpesaCode && (
                            <span className="ml-2 font-mono text-[11px] text-slate-500">
                              (M-PESA: {ord.mpesaCode})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReorder(ord)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Reorder</span>
                          </button>
                          <a
                            href={getWhatsAppUrl('order', ord)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Inquire</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-600">You haven't placed any stationery orders yet.</p>
                  <button
                    onClick={onNavigateToBookshop}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                  >
                    Browse Bookshop
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {customerBookings.length > 0 ? (
                <div className="space-y-4">
                  {customerBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-900 text-sm">{b.id}</span>
                          <span className="text-slate-500">{b.serviceName}</span>
                        </div>
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {b.bookingStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Date & Time</span>
                          <span>{b.preferredDate} at {b.preferredTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Estimated Fee</span>
                          <span className="font-bold text-slate-900">KES {b.estimatedCost}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Payment</span>
                          <span className="font-semibold">{b.paymentStatus} {b.mpesaCode ? `(${b.mpesaCode})` : ''}</span>
                        </div>
                      </div>

                      {b.specs?.fileName && (
                        <div className="text-[11px] text-teal-700 bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                          File: {b.specs.fileName} ({b.specs.numberOfCopies} copies, {b.specs.colorType})
                        </div>
                      )}

                      <div className="pt-2 flex justify-end gap-2">
                        <a
                          href={getWhatsAppUrl('booking', b)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp Update</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-600">No cyber or printing bookings registered.</p>
                  <button
                    onClick={() => onNavigateToBooking()}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                  >
                    Book a Service Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PAYMENT HISTORY */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                M-PESA Till 6816189 Payment Records
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {customerOrders.concat(customerBookings as any).map((record: any, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{record.id}</span>
                      <span className="text-slate-400 text-[11px]">
                        M-PESA Code: <strong>{record.mpesaCode || 'Pay at Counter'}</strong>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">
                        KES {(record.totalAmount || record.estimatedCost || 0).toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        {record.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Customer Details</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: INSTANT TRACKER */}
          {activeTab === 'track' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Instant Order & Booking Lookup</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Order/Booking Reference (e.g. TB-ORD-2026-1001)"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white"
                />
              </div>

              {trackQuery && (
                <div className="pt-2">
                  {foundTrackOrder ? (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>Order {foundTrackOrder.id}</span>
                        <span className="text-emerald-800">{foundTrackOrder.orderStatus}</span>
                      </div>
                      <p className="text-slate-600">Total: KES {foundTrackOrder.totalAmount.toLocaleString()} ({foundTrackOrder.paymentStatus})</p>
                      {foundTrackOrder.adminNotes && (
                        <p className="text-slate-800 bg-white p-2 rounded border border-emerald-100">
                          Tobstech Counter Note: {foundTrackOrder.adminNotes}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No matching record found.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
