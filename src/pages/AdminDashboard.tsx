import React, { useState, useRef } from 'react';
import {
  LayoutDashboard,
  Package,
  Calendar,
  CreditCard,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  Printer,
  DollarSign,
  Users,
  Search,
  ExternalLink,
  Save,
  Check,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  X,
  FileText,
  MessageSquare,
  HelpCircle,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  OrderStatus,
  PaymentStatus,
  BookingStatus,
  ProductCategory,
  ProductItem,
  ServiceCategory,
  ServiceItem,
  FaqItem,
  TestimonialItem,
} from '../types';

interface AdminDashboardProps {
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onCloseAdmin }) => {
  const {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    orders,
    bookings,
    products,
    services,
    faqs,
    testimonials,
    businessConfig,
    updateBusinessConfig,
    updateOrderStatus,
    verifyOrderPayment,
    updateBookingStatus,
    verifyBookingPayment,
    addProduct,
    updateProduct,
    deleteProduct,
    addService,
    updateService,
    deleteService,
    addFaq,
    updateFaq,
    deleteFaq,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    resetAllCatalogData,
  } = useApp();

  // Admin Login Passcode form
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Admin Section
  const [activeSection, setActiveSection] = useState<
    'overview' | 'orders' | 'bookings' | 'payments' | 'products' | 'services' | 'faqs' | 'testimonials' | 'settings'
  >('overview');

  // Search filter inside admin
  const [adminSearch, setAdminSearch] = useState('');

  // -------------------------------------------------------------
  // PRODUCT MODAL STATE (ADD & EDIT)
  // -------------------------------------------------------------
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    category: ProductCategory;
    description: string;
    price: number;
    stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
    stockCount: number;
    unit: string;
    featured: boolean;
    imageUrl: string;
  }>({
    name: '',
    category: 'stationery',
    description: '',
    price: 150,
    stockStatus: 'in_stock',
    stockCount: 50,
    unit: 'Piece',
    featured: false,
    imageUrl: '',
  });

  const productFileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'stationery',
      description: '',
      price: 150,
      stockStatus: 'in_stock',
      stockCount: 50,
      unit: 'Piece',
      featured: false,
      imageUrl: '',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      description: prod.description,
      price: prod.price,
      stockStatus: prod.stockStatus,
      stockCount: prod.stockCount,
      unit: prod.unit || 'Piece',
      featured: !!prod.featured,
      imageUrl: prod.imageUrl || '',
    });
    setIsProductModalOpen(true);
  };

  // Image Upload handler (converts file to Base64 Data URL)
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large (max 5MB). Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProductForm((prev) => ({ ...prev, imageUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Please enter a product name.');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: productForm.name.trim(),
        category: productForm.category,
        description: productForm.description.trim(),
        price: Number(productForm.price) || 0,
        stockStatus: productForm.stockStatus,
        stockCount: Number(productForm.stockCount) || 0,
        unit: productForm.unit.trim() || 'Piece',
        featured: productForm.featured,
        imageUrl: productForm.imageUrl.trim() || undefined,
      });
    } else {
      addProduct({
        name: productForm.name.trim(),
        category: productForm.category,
        description: productForm.description.trim(),
        price: Number(productForm.price) || 0,
        stockStatus: productForm.stockStatus,
        stockCount: Number(productForm.stockCount) || 0,
        unit: productForm.unit.trim() || 'Piece',
        featured: productForm.featured,
        imageUrl: productForm.imageUrl.trim() || undefined,
      });
    }

    setIsProductModalOpen(false);
  };

  // -------------------------------------------------------------
  // SERVICE MODAL STATE (ADD & EDIT)
  // -------------------------------------------------------------
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    name: string;
    category: ServiceCategory;
    shortDescription: string;
    fullDescription: string;
    startingPrice: number;
    estimatedTime: string;
    iconName: string;
    popular: boolean;
    requiresDocumentUpload: boolean;
  }>({
    name: '',
    category: 'document_services',
    shortDescription: '',
    fullDescription: '',
    startingPrice: 50,
    estimatedTime: '15 mins',
    iconName: 'Printer',
    popular: false,
    requiresDocumentUpload: false,
  });

  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceForm({
      name: '',
      category: 'document_services',
      shortDescription: '',
      fullDescription: '',
      startingPrice: 50,
      estimatedTime: '15 mins',
      iconName: 'Printer',
      popular: false,
      requiresDocumentUpload: false,
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setServiceForm({
      name: srv.name,
      category: srv.category,
      shortDescription: srv.shortDescription,
      fullDescription: srv.fullDescription,
      startingPrice: srv.startingPrice,
      estimatedTime: srv.estimatedTime,
      iconName: srv.iconName,
      popular: !!srv.popular,
      requiresDocumentUpload: !!srv.requiresDocumentUpload,
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) {
      alert('Please enter a service name.');
      return;
    }

    if (editingServiceId) {
      updateService(editingServiceId, {
        name: serviceForm.name.trim(),
        category: serviceForm.category,
        shortDescription: serviceForm.shortDescription.trim(),
        fullDescription: serviceForm.fullDescription.trim(),
        startingPrice: Number(serviceForm.startingPrice) || 0,
        estimatedTime: serviceForm.estimatedTime.trim(),
        iconName: serviceForm.iconName,
        popular: serviceForm.popular,
        requiresDocumentUpload: serviceForm.requiresDocumentUpload,
      });
    } else {
      addService({
        name: serviceForm.name.trim(),
        category: serviceForm.category,
        shortDescription: serviceForm.shortDescription.trim(),
        fullDescription: serviceForm.fullDescription.trim(),
        startingPrice: Number(serviceForm.startingPrice) || 0,
        estimatedTime: serviceForm.estimatedTime.trim(),
        iconName: serviceForm.iconName,
        popular: serviceForm.popular,
        requiresDocumentUpload: serviceForm.requiresDocumentUpload,
      });
    }

    setIsServiceModalOpen(false);
  };

  // -------------------------------------------------------------
  // FAQ MODAL STATE (ADD & EDIT)
  // -------------------------------------------------------------
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  const handleOpenAddFaq = () => {
    setEditingFaqId(null);
    setFaqForm({ question: '', answer: '' });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (f: FaqItem) => {
    setEditingFaqId(f.id);
    setFaqForm({ question: f.question, answer: f.answer });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
    if (editingFaqId) {
      updateFaq(editingFaqId, { question: faqForm.question.trim(), answer: faqForm.answer.trim() });
    } else {
      addFaq({ question: faqForm.question.trim(), answer: faqForm.answer.trim() });
    }
    setIsFaqModalOpen(false);
  };

  // -------------------------------------------------------------
  // TESTIMONIAL MODAL STATE (ADD & EDIT)
  // -------------------------------------------------------------
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    quote: '',
    author: '',
    role: '',
    tag: 'Verified Customer',
  });

  const handleOpenAddTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({ quote: '', author: '', role: '', tag: 'Verified Customer' });
    setIsTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonial = (t: TestimonialItem) => {
    setEditingTestimonialId(t.id);
    setTestimonialForm({ quote: t.quote, author: t.author, role: t.role, tag: t.tag });
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.quote.trim() || !testimonialForm.author.trim()) return;
    if (editingTestimonialId) {
      updateTestimonial(editingTestimonialId, { ...testimonialForm });
    } else {
      addTestimonial({ ...testimonialForm });
    }
    setIsTestimonialModalOpen(false);
  };

  // -------------------------------------------------------------
  // SETTINGS STATE
  // -------------------------------------------------------------
  const [configForm, setConfigForm] = useState({ ...businessConfig });

  // -------------------------------------------------------------
  // AUTH GUARD
  // -------------------------------------------------------------
  if (!isAdmin) {
    const handleAdminPasscode = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginAdmin(passcode);
      if (!success) {
        setPasscodeError(true);
      } else {
        setPasscodeError(false);
      }
    };

    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Tobstech Staff & Admin Access
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Restricted portal for managing Magongo counter orders, M-PESA Till payments, products, photos, services, and FAQs.
            </p>
          </div>

          <form onSubmit={handleAdminPasscode} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Secret Security PIN"
                value={passcode}
                maxLength={10}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                }}
                className="w-full px-4 py-3 text-sm text-center border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest bg-slate-50"
                autoFocus
              />
              {passcodeError && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5">
                  Access denied. Incorrect PIN entered.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                AUTHENTICATE & ENTER
              </button>
            </div>
          </form>

          <button
            onClick={onCloseAdmin}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // Statistics calculation
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Order Received' || o.orderStatus === 'Processing').length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'Completed').length;
  const pendingPayments = orders.filter((o) => o.paymentStatus === 'Pending Verification').length +
    bookings.filter((b) => b.paymentStatus === 'Pending Verification').length;
  const totalBookings = bookings.length;
  const todayBookings = bookings.filter((b) => b.bookingStatus === 'Pending' || b.bookingStatus === 'Confirmed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Verified' ? o.totalAmount : 0), 0);

  const orderStatuses: OrderStatus[] = [
    'Order Received',
    'Payment Pending',
    'Payment Verified',
    'Processing',
    'Ready for Collection',
    'Completed',
    'Cancelled',
  ];

  const bookingStatuses: BookingStatus[] = [
    'Pending',
    'Confirmed',
    'In Progress',
    'Ready for Collection',
    'Completed',
    'Cancelled',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
              Staff & Counter Portal
            </span>
            <span className="text-xs font-mono text-slate-400">Till: {businessConfig.mpesaTillNumber}</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight mt-1">
            TOBSTECH MANAGEMENT DASHBOARD
          </h1>
          <p className="text-xs text-slate-400">
            Magongo Counter • Mombasa, Kenya • Full Editing for Products, Images, Services & Store Details
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCloseAdmin}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors"
          >
            View Customer Site
          </button>
          <button
            onClick={logoutAdmin}
            className="px-4 py-2 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-700/50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
          { id: 'services', label: `Services (${services.length})`, icon: Printer },
          { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
          { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
          { id: 'payments', label: `Payments & M-PESA (${pendingPayments} pending)`, icon: CreditCard },
          { id: 'faqs', label: `FAQs (${faqs.length})`, icon: HelpCircle },
          { id: 'testimonials', label: `Reviews (${testimonials.length})`, icon: MessageSquare },
          { id: 'settings', label: 'Store Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeSection === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: OVERVIEW METRICS */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Products
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {products.length}
              </span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">
                Visible on public shop
              </span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Pending M-PESA Verifications
              </span>
              <span className="text-2xl font-black text-rose-600 mt-1 block">
                {pendingPayments}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Awaiting counter match
              </span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Bookings
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {todayBookings}
              </span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">
                {totalBookings} total booked
              </span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Verified Revenue
              </span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                KES {totalRevenue.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Till: {businessConfig.mpesaTillNumber}
              </span>
            </div>
          </div>

          {/* Quick Action Tables for Orders and Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Products shortcuts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Product Inventory Management
                </h3>
                <button
                  onClick={handleOpenAddProduct}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product & Photo</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-slate-900 block line-clamp-1">{p.name}</span>
                        <span className="text-slate-500">KES {p.price} • Stock: {p.stockCount}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Recent Customer Orders
                </h3>
                <button
                  onClick={() => setActiveSection('orders')}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  View All Orders
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-slate-900 block">{o.id}</span>
                      <span className="text-slate-500">{o.customerName} • KES {o.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {o.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PRODUCTS MANAGEMENT WITH PHOTO UPLOAD */}
      {activeSection === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Bookshop Products & Inventory ({products.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit pricing, update stock, and upload real product photos that are immediately visible to all visitors.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl w-48"
              />

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product & Upload Image</span>
              </button>
            </div>
          </div>

          {/* Product Items Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(
                (p) =>
                  p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
                  p.category.toLowerCase().includes(adminSearch.toLowerCase())
              )
              .map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 relative group">
                      {prod.imageUrl ? (
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-[9px]">No photo</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {prod.category.replace('_', ' ')}
                        </span>
                        {prod.featured && (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            Featured
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{prod.name}</h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-extrabold text-emerald-700 text-xs">
                          KES {prod.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">/{prod.unit || 'pc'}</span>
                      </div>
                      <span className={`text-[10px] font-semibold mt-1 inline-block ${
                        prod.stockStatus === 'in_stock' ? 'text-emerald-700' : 'text-rose-600'
                      }`}>
                        Stock: {prod.stockCount} ({prod.stockStatus})
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg font-bold border border-slate-200 flex items-center gap-1 text-xs"
                    >
                      <Edit2 className="w-3 h-3 text-emerald-600" />
                      <span>Edit & Photo</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete "${prod.name}" from public bookshop?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION 3: SERVICES MANAGEMENT */}
      {activeSection === 'services' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cyber & Printing Services Directory ({services.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit starting prices, turnaround times, and descriptions for all government and document services.
              </p>
            </div>

            <button
              onClick={handleOpenAddService}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {srv.category.replace('_', ' ')}
                    </span>
                    {srv.popular && (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Popular
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{srv.shortDescription}</p>

                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-200/60">
                    <span className="font-extrabold text-slate-900">
                      Starting KES {srv.startingPrice}
                    </span>
                    <span className="text-slate-500 font-medium">{srv.estimatedTime}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEditService(srv)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg font-bold border border-slate-200 flex items-center gap-1 text-xs"
                  >
                    <Edit2 className="w-3 h-3 text-emerald-600" />
                    <span>Edit Service</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete service "${srv.name}"?`)) {
                        deleteService(srv.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: ORDERS MANAGEMENT */}
      {activeSection === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-slate-900">
              Orders Management Desk ({orders.length})
            </h2>
            <input
              type="text"
              placeholder="Filter by Order ID, Customer, Phone..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="px-3.5 py-2 text-xs border border-slate-200 rounded-xl w-full sm:w-64"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {orders
              .filter(
                (o) =>
                  o.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
                  o.customerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                  o.customerPhone.includes(adminSearch)
              )
              .map((order) => (
                <div key={order.id} className="py-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {order.id}
                      </span>
                      <span className="text-slate-400 ml-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                      <span className="ml-3 font-semibold text-slate-700">
                        {order.customerName} ({order.customerPhone})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-700 text-sm">
                        KES {order.totalAmount.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-0.5 rounded">
                        {order.fulfillmentType}
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-600">
                        <span>{it.productName} × {it.quantity}</span>
                        <span>KES {it.total.toLocaleString()}</span>
                      </div>
                    ))}
                    {order.deliveryAddress && (
                      <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        Delivery Address: {order.deliveryAddress}
                      </p>
                    )}
                  </div>

                  {/* Order Control Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Order Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-semibold"
                      >
                        {orderStatuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">M-PESA:</span>
                      <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        {order.mpesaCode || 'Unpaid / Cash'}
                      </span>

                      <select
                        value={order.paymentStatus}
                        onChange={(e) => verifyOrderPayment(order.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-semibold"
                      >
                        <option value="Pending Verification">Pending Verification</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION 5: BOOKINGS MANAGEMENT */}
      {activeSection === 'bookings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-slate-900">
              Cyber & Document Service Bookings ({bookings.length})
            </h2>
            <input
              type="text"
              placeholder="Search bookings..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="px-3.5 py-2 text-xs border border-slate-200 rounded-xl w-full sm:w-64"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {bookings
              .filter(
                (b) =>
                  b.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
                  b.customerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                  b.serviceName.toLowerCase().includes(adminSearch.toLowerCase())
              )
              .map((b) => (
                <div key={b.id} className="py-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-slate-900">{b.id}</span>
                      <strong className="text-emerald-700 ml-2 font-bold">{b.serviceName}</strong>
                      <span className="text-slate-500 ml-3">
                        {b.customerName} ({b.customerPhone})
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500">Scheduled: </span>
                      <strong className="text-slate-900 font-bold">{b.preferredDate} at {b.preferredTime}</strong>
                    </div>
                  </div>

                  {b.specs?.fileName && (
                    <div className="bg-teal-50 p-2.5 rounded-xl border border-teal-100 text-xs text-teal-900 flex items-center justify-between">
                      <span>
                        Document Attached: <strong>{b.specs.fileName}</strong> ({b.specs.fileSizeMb} MB, {b.specs.numberOfCopies} copies, {b.specs.colorType})
                      </span>
                      <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-teal-200">
                        Est: KES {b.estimatedCost}
                      </span>
                    </div>
                  )}

                  {b.additionalInstructions && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                      Instructions: {b.additionalInstructions}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Status:</span>
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-semibold"
                      >
                        {bookingStatuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">M-PESA:</span>
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                        {b.mpesaCode || 'None'}
                      </span>
                      <select
                        value={b.paymentStatus}
                        onChange={(e) => verifyBookingPayment(b.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-semibold"
                      >
                        <option value="Pending Verification">Pending Verification</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION 6: PAYMENTS & M-PESA VERIFICATION */}
      {activeSection === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                M-PESA Till 6816189 Payment Verification
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Match submitted customer transaction codes against your Safaricom M-PESA Till SMS statement.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {orders
              .filter((o) => o.mpesaCode)
              .map((order) => (
                <div key={order.id} className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">{order.id}</span>
                      <span className="font-mono font-bold text-sm text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {order.mpesaCode}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-1">
                      Customer: <strong>{order.customerName}</strong> ({order.mpesaPhone || order.customerPhone})
                    </p>
                    <p className="text-slate-500">
                      Amount: <strong>KES {order.totalAmount.toLocaleString()}</strong> • Submitted:{' '}
                      {order.paymentSubmittedAt ? new Date(order.paymentSubmittedAt).toLocaleTimeString() : 'N/A'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      order.paymentStatus === 'Verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.paymentStatus === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.paymentStatus}
                    </span>

                    {order.paymentStatus !== 'Verified' && (
                      <button
                        onClick={() => verifyOrderPayment(order.id, 'Verified')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </button>
                    )}

                    {order.paymentStatus !== 'Rejected' && (
                      <button
                        onClick={() => verifyOrderPayment(order.id, 'Rejected')}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold flex items-center gap-1 shadow-xs"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION 7: FAQS MANAGEMENT */}
      {activeSection === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Frequently Asked Questions ({faqs.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the questions and answers visible to customers on the FAQ page.
              </p>
            </div>

            <button
              onClick={handleOpenAddFaq}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEditFaq(faq)}
                      className="p-1.5 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-white"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this question?')) deleteFaq(faq.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8: TESTIMONIALS MANAGEMENT */}
      {activeSection === 'testimonials' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Customer Testimonials ({testimonials.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage customer reviews displayed on the homepage.
              </p>
            </div>

            <button
              onClick={handleOpenAddTestimonial}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 text-xs"
              >
                <p className="text-slate-700 italic">"{t.quote}"</p>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900">{t.author}</h5>
                    <span className="text-[11px] text-slate-500">{t.role}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditTestimonial(t)}
                      className="p-1 text-slate-500 hover:text-emerald-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this review?')) deleteTestimonial(t.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 9: STORE SETTINGS */}
      {activeSection === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 max-w-3xl space-y-8">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Tobstech Business Details Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Editable business phone, WhatsApp number, physical location, and M-PESA Till details.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateBusinessConfig(configForm);
              alert('Business details updated successfully!');
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-700 block mb-1">Business Name</label>
              <input
                type="text"
                value={configForm.businessName}
                onChange={(e) => setConfigForm({ ...configForm, businessName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={configForm.phone}
                  onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">WhatsApp Number (e.g. +254712345678)</label>
                <input
                  type="text"
                  value={configForm.whatsappNumber}
                  onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">M-PESA Till Number (Buy Goods)</label>
                <input
                  type="text"
                  value={configForm.mpesaTillNumber}
                  onChange={(e) => setConfigForm({ ...configForm, mpesaTillNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">M-PESA Account Name</label>
                <input
                  type="text"
                  value={configForm.mpesaTillName}
                  onChange={(e) => setConfigForm({ ...configForm, mpesaTillName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Physical Location</label>
                <input
                  type="text"
                  value={configForm.location}
                  onChange={(e) => setConfigForm({ ...configForm, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Landmark / Directions</label>
                <input
                  type="text"
                  value={configForm.landmark}
                  onChange={(e) => setConfigForm({ ...configForm, landmark: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            {/* Operating Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Weekdays Hours</label>
                <input
                  type="text"
                  value={configForm.openingHours.weekdays}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      openingHours: { ...configForm.openingHours, weekdays: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Saturday Hours</label>
                <input
                  type="text"
                  value={configForm.openingHours.saturday}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      openingHours: { ...configForm.openingHours, saturday: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Sunday Hours</label>
                <input
                  type="text"
                  value={configForm.openingHours.sunday}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      openingHours: { ...configForm.openingHours, sunday: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Configuration</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Restore default products, services, FAQs and settings? (Will erase custom edits)')) {
                    resetAllCatalogData();
                    setConfigForm({ ...businessConfig });
                  }
                }}
                className="px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Sample Data</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* PRODUCT ADD/EDIT MODAL WITH PHOTO UPLOAD & PREVIEW       */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingProductId ? 'Edit Product & Photo' : 'Add New Product & Photo'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4 text-xs">
              {/* Product Photo Upload Section */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">
                  Product Image (Visible to all customers)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  {/* Photo Preview Box */}
                  <div className="w-24 h-24 rounded-2xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center relative">
                    {productForm.imageUrl ? (
                      <>
                        <img
                          src={productForm.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setProductForm((p) => ({ ...p, imageUrl: '' }))}
                          className="absolute top-1 right-1 bg-slate-900/80 hover:bg-rose-600 text-white p-1 rounded-full"
                          title="Remove Image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                        <span className="text-[10px] block">No Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={productFileInputRef}
                      onChange={handleProductImageUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => productFileInputRef.current?.click()}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo From Device / Camera</span>
                      </button>

                      {productForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setProductForm((p) => ({ ...p, imageUrl: '' }))}
                          className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold"
                        >
                          Clear Photo
                        </button>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1">
                        Or paste image web URL:
                      </span>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={productForm.imageUrl}
                        onChange={(e) => setProductForm((p) => ({ ...p, imageUrl: e.target.value }))}
                        className="w-full px-3 py-1.5 text-[11px] border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasuku A4 200 Pages Ruled"
                    value={productForm.name}
                    onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm((p) => ({ ...p, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="exercise_books">Exercise Books</option>
                    <option value="books">Books & Setbooks</option>
                    <option value="pens_pencils">Pens & Pencils</option>
                    <option value="stationery">Stationery</option>
                    <option value="files_folders">Files & Folders</option>
                    <option value="school_supplies">School Supplies</option>
                    <option value="office_supplies">Office Supplies</option>
                    <option value="printing_materials">Printing Paper & Reams</option>
                  </select>
                </div>
              </div>

              {/* Price, Unit, Stock Count */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (KES) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Piece, Ream, Box of 50"
                    value={productForm.unit}
                    onChange={(e) => setProductForm((p) => ({ ...p, unit: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm((p) => ({ ...p, stockCount: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>
              </div>

              {/* Stock Status & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Availability</label>
                  <select
                    value={productForm.stockStatus}
                    onChange={(e) => setProductForm((p) => ({ ...p, stockStatus: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-toggle"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="featured-toggle" className="font-bold text-slate-800">
                    Show as Featured on Homepage
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short details about paper thickness, brand, ruling or dimensions..."
                  value={productForm.description}
                  onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs"
                >
                  {editingProductId ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SERVICE ADD/EDIT MODAL                                    */}
      {/* ========================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm((s) => ({ ...s, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm((s) => ({ ...s, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="cyber_government">Cyber & Government Services</option>
                    <option value="document_services">Document & Printing Services</option>
                    <option value="digital_design">Digital Design & Computer Services</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Starting Price (KES) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={serviceForm.startingPrice}
                    onChange={(e) => setServiceForm((s) => ({ ...s, startingPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Turnaround</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 - 30 mins"
                    value={serviceForm.estimatedTime}
                    onChange={(e) => setServiceForm((s) => ({ ...s, estimatedTime: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Icon Style</label>
                  <select
                    value={serviceForm.iconName}
                    onChange={(e) => setServiceForm((s) => ({ ...s, iconName: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="ShieldCheck">Shield (eCitizen/Gov)</option>
                    <option value="FileText">Document / KRA</option>
                    <option value="Printer">Printer</option>
                    <option value="Copy">Photocopy</option>
                    <option value="ScanLine">Scanner</option>
                    <option value="Camera">Passport Photo</option>
                    <option value="Edit3">Typing / CV</option>
                    <option value="BookMarked">Binding</option>
                    <option value="Palette">Graphic Design</option>
                    <option value="Globe">Internet / Downloads</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.shortDescription}
                  onChange={(e) => setServiceForm((s) => ({ ...s, shortDescription: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={serviceForm.popular}
                    onChange={(e) => setServiceForm((s) => ({ ...s, popular: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Popular Service Badge</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={serviceForm.requiresDocumentUpload}
                    onChange={(e) =>
                      setServiceForm((s) => ({ ...s, requiresDocumentUpload: e.target.checked }))
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Enable Document Upload Form</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold"
                >
                  {editingServiceId ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FAQ ADD/EDIT MODAL                                        */}
      {/* ========================================================= */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingFaqId ? 'Edit FAQ' : 'Add New FAQ'}
            </h3>
            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TESTIMONIAL ADD/EDIT MODAL                                */}
      {/* ========================================================= */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingTestimonialId ? 'Edit Review' : 'Add Customer Review'}
            </h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Student, Changamwe"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
