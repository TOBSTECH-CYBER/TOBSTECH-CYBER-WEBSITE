import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  ProductItem,
  CartItem,
  OrderRecord,
  BookingRecord,
  CustomerUser,
  BusinessConfig,
  AppNotification,
  PaymentStatus,
  OrderStatus,
  BookingStatus,
  FaqItem,
  TestimonialItem,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_BUSINESS_CONFIG,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
} from '../data/initialData';

interface AppContextType {
  // Business Config
  businessConfig: BusinessConfig;
  updateBusinessConfig: (config: Partial<BusinessConfig>) => void;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Products
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  // FAQs
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;

  // Testimonials
  testimonials: TestimonialItem[];
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Restore defaults
  resetAllCatalogData: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Orders
  orders: OrderRecord[];
  createOrder: (orderData: Omit<OrderRecord, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'> & {
    mpesaCode?: string;
    mpesaAmountPaid?: number;
    mpesaPhone?: string;
  }) => OrderRecord;
  submitPaymentForOrder: (orderId: string, mpesaCode: string, amountPaid: number, phone: string) => boolean;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => void;
  verifyOrderPayment: (orderId: string, paymentStatus: PaymentStatus, adminNotes?: string) => void;

  // Bookings
  bookings: BookingRecord[];
  createBooking: (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'bookingStatus' | 'paymentStatus'>) => BookingRecord;
  submitPaymentForBooking: (bookingId: string, mpesaCode: string) => boolean;
  updateBookingStatus: (bookingId: string, status: BookingStatus, adminNotes?: string) => void;
  verifyBookingPayment: (bookingId: string, paymentStatus: PaymentStatus, adminNotes?: string) => void;

  // Customer Auth
  customer: CustomerUser | null;
  loginCustomer: (emailOrPhone: string, password?: string) => { success: boolean; message: string };
  registerCustomer: (name: string, phone: string, email: string) => { success: boolean; message: string };
  logoutCustomer: () => void;
  updateCustomerProfile: (data: Partial<CustomerUser>) => void;

  // Admin Auth
  isAdmin: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type?: 'order' | 'booking' | 'payment' | 'info', link?: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;

  // WhatsApp helper
  getWhatsAppUrl: (type: 'general' | 'service' | 'product' | 'order' | 'booking', payload?: any) => string;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'tobstech_services_v1',
  PRODUCTS: 'tobstech_products_v1',
  ORDERS: 'tobstech_orders_v1',
  BOOKINGS: 'tobstech_bookings_v1',
  CONFIG: 'tobstech_config_v1',
  CART: 'tobstech_cart_v1',
  CUSTOMER: 'tobstech_customer_v1',
  IS_ADMIN: 'tobstech_is_admin_v1',
  FAQS: 'tobstech_faqs_v1',
  TESTIMONIALS: 'tobstech_testimonials_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.whatsappNumber?.includes('785852079')) {
          parsed.whatsappNumber = '+254785852079';
          parsed.phone = '+254 785 852 079';
        }
        return parsed;
      } catch (e) {
        return INITIAL_BUSINESS_CONFIG;
      }
    }
    return INITIAL_BUSINESS_CONFIG;
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Products
  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // FAQs
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Bookings
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Customer
  const [customer, setCustomer] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
    return saved ? JSON.parse(saved) : null;
  });

  // Admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true';
  });

  // Search & Notifications
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-welcome',
      title: 'Karibu Tobstech Cyber & Bookshop',
      message: 'Fast printing, eCitizen, KRA and school stationery in Magongo. Pay via M-PESA Till 6816189.',
      timestamp: new Date().toISOString(),
      type: 'info',
      read: false,
    },
  ]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(businessConfig));
  }, [businessConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(customer));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CUSTOMER);
    }
  }, [customer]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // Notifications
  const addNotification = (
    title: string,
    message: string,
    type: 'order' | 'booking' | 'payment' | 'info' = 'info',
    link?: string
  ) => {
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      timestamp: new Date().toISOString(),
      type,
      read: false,
      link,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Config Actions
  const updateBusinessConfig = (config: Partial<BusinessConfig>) => {
    setBusinessConfig((prev) => ({ ...prev, ...config }));
    addNotification('Settings Updated', 'Business details have been updated.', 'info');
  };

  // Service Actions
  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: 'srv-' + Date.now(),
    };
    setServices((prev) => [newService, ...prev]);
    addNotification('Service Added', `${serviceData.name} is now available.`, 'info');
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, ...updates } : srv))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((srv) => srv.id !== id));
  };

  // Product Actions
  const addProduct = (productData: Omit<ProductItem, 'id'>) => {
    const newProduct: ProductItem = {
      ...productData,
      id: 'prod-' + Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    addNotification('Product Added', `${productData.name} added to catalog.`, 'info');
  };

  const updateProduct = (id: string, updates: Partial<ProductItem>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // FAQ Actions
  const addFaq = (faqData: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...faqData,
      id: 'faq-' + Date.now(),
    };
    setFaqs((prev) => [...prev, newFaq]);
    addNotification('FAQ Added', `New question "${faqData.question}" added.`, 'info');
  };

  const updateFaq = (id: string, updates: Partial<FaqItem>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Testimonial Actions
  const addTestimonial = (testimonialData: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...testimonialData,
      id: 'test-' + Date.now(),
    };
    setTestimonials((prev) => [...prev, newTestimonial]);
    addNotification('Review Added', `Customer testimonial added.`, 'info');
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset to initial catalog data
  const resetAllCatalogData = () => {
    setServices(INITIAL_SERVICES);
    setProducts(INITIAL_PRODUCTS);
    setFaqs(INITIAL_FAQS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setBusinessConfig(INITIAL_BUSINESS_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    addNotification('Catalog Reset', 'Reset to initial default catalog.', 'info');
  };

  // Cart Actions
  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addNotification('Added to Cart', `${product.name} (x${quantity}) added.`, 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Orders
  const createOrder = (orderData: Omit<OrderRecord, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'> & {
    mpesaCode?: string;
    mpesaAmountPaid?: number;
    mpesaPhone?: string;
  }): OrderRecord => {
    const orderNumber = `TB-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const hasPaid = !!orderData.mpesaCode?.trim();

    const newOrder: OrderRecord = {
      ...orderData,
      id: orderNumber,
      createdAt: new Date().toISOString(),
      orderStatus: hasPaid ? 'Processing' : 'Order Received',
      paymentStatus: hasPaid ? 'Pending Verification' : 'Pending Verification',
      paymentSubmittedAt: hasPaid ? new Date().toISOString() : undefined,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    addNotification(
      'Order Received',
      `Order ${orderNumber} has been received. Total: KES ${newOrder.totalAmount.toLocaleString()}`,
      'order',
      `/orders/${orderNumber}`
    );

    if (hasPaid) {
      addNotification(
        'Payment Submitted',
        `M-PESA code ${orderData.mpesaCode} submitted for verification by Tobstech.`,
        'payment'
      );
    }

    return newOrder;
  };

  const submitPaymentForOrder = (
    orderId: string,
    mpesaCode: string,
    amountPaid: number,
    phone: string
  ): boolean => {
    let success = false;
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          success = true;
          return {
            ...order,
            mpesaCode: mpesaCode.toUpperCase().trim(),
            mpesaAmountPaid: amountPaid,
            mpesaPhone: phone,
            paymentSubmittedAt: new Date().toISOString(),
            paymentStatus: 'Pending Verification',
            orderStatus: order.orderStatus === 'Payment Pending' || order.orderStatus === 'Order Received' ? 'Processing' : order.orderStatus,
          };
        }
        return order;
      })
    );

    if (success) {
      addNotification(
        'Payment Details Submitted',
        `Your payment details for order ${orderId} have been submitted for verification. Tobstech staff will verify shortly.`,
        'payment'
      );
    }
    return success;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, adminNotes?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: status,
              adminNotes: adminNotes !== undefined ? adminNotes : o.adminNotes,
            }
          : o
      )
    );

    if (status === 'Ready for Collection') {
      addNotification('Order Ready!', `Order ${orderId} is packed and ready for collection at Tobstech Magongo.`, 'order');
    } else if (status === 'Completed') {
      addNotification('Order Completed', `Order ${orderId} has been marked completed. Thank you!`, 'order');
    }
  };

  const verifyOrderPayment = (orderId: string, paymentStatus: PaymentStatus, adminNotes?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const newOrderStatus: OrderStatus =
            paymentStatus === 'Verified' ? 'Processing' : o.orderStatus;
          return {
            ...o,
            paymentStatus,
            orderStatus: newOrderStatus,
            adminNotes: adminNotes !== undefined ? adminNotes : o.adminNotes,
          };
        }
        return o;
      })
    );

    if (paymentStatus === 'Verified') {
      addNotification(
        'Payment Verified',
        `Payment for order ${orderId} has been verified by Tobstech staff.`,
        'payment'
      );
    } else if (paymentStatus === 'Rejected') {
      addNotification(
        'Payment Issue',
        `Payment code for order ${orderId} could not be matched. Please contact Tobstech on WhatsApp.`,
        'payment'
      );
    }
  };

  // Bookings
  const createBooking = (
    bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'bookingStatus' | 'paymentStatus'>
  ): BookingRecord => {
    const bookingNumber = `TB-BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const hasMpesa = !!bookingData.mpesaCode?.trim();

    const newBooking: BookingRecord = {
      ...bookingData,
      id: bookingNumber,
      createdAt: new Date().toISOString(),
      bookingStatus: 'Pending',
      paymentStatus: hasMpesa ? 'Pending Verification' : 'Pending Verification',
    };

    setBookings((prev) => [newBooking, ...prev]);

    addNotification(
      'Service Booking Received',
      `Booking ${bookingNumber} for ${bookingData.serviceName} submitted. Estimated KES ${bookingData.estimatedCost}.`,
      'booking'
    );

    return newBooking;
  };

  const submitPaymentForBooking = (bookingId: string, mpesaCode: string): boolean => {
    let success = false;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          success = true;
          return {
            ...b,
            mpesaCode: mpesaCode.toUpperCase().trim(),
            paymentStatus: 'Pending Verification',
          };
        }
        return b;
      })
    );
    if (success) {
      addNotification(
        'Booking Payment Submitted',
        `Payment for booking ${bookingId} submitted for verification.`,
        'payment'
      );
    }
    return success;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, adminNotes?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: status,
              adminNotes: adminNotes !== undefined ? adminNotes : b.adminNotes,
            }
          : b
      )
    );
    if (status === 'Confirmed') {
      addNotification('Booking Confirmed', `Booking ${bookingId} has been confirmed by Tobstech.`, 'booking');
    } else if (status === 'Ready for Collection') {
      addNotification('Document Ready!', `Your service ${bookingId} is ready for collection at our Magongo branch.`, 'booking');
    }
  };

  const verifyBookingPayment = (bookingId: string, paymentStatus: PaymentStatus, adminNotes?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus,
              adminNotes: adminNotes !== undefined ? adminNotes : b.adminNotes,
            }
          : b
      )
    );
  };

  // Customer Auth
  const loginCustomer = (emailOrPhone: string, _password?: string) => {
    const trimmed = emailOrPhone.trim().toLowerCase();
    // Check existing customer or create session
    const existing = orders.find(
      (o) => o.customerEmail.toLowerCase() === trimmed || o.customerPhone === trimmed
    );

    const user: CustomerUser = {
      id: 'cust-' + (existing ? existing.customerPhone : 'demo'),
      fullName: existing ? existing.customerName : 'Valued Customer',
      phone: existing ? existing.customerPhone : emailOrPhone,
      email: existing ? existing.customerEmail : emailOrPhone.includes('@') ? emailOrPhone : 'customer@tobstech.co.ke',
      createdAt: new Date().toISOString(),
    };

    setCustomer(user);
    addNotification('Welcome Back', `Logged in as ${user.fullName}`, 'info');
    return { success: true, message: 'Logged in successfully.' };
  };

  const registerCustomer = (name: string, phone: string, email: string) => {
    const user: CustomerUser = {
      id: 'cust-' + Date.now(),
      fullName: name,
      phone,
      email,
      createdAt: new Date().toISOString(),
    };
    setCustomer(user);
    addNotification('Account Created', `Welcome to Tobstech Cyber & Bookshop, ${name}!`, 'info');
    return { success: true, message: 'Account registered successfully.' };
  };

  const logoutCustomer = () => {
    setCustomer(null);
    addNotification('Logged Out', 'You have been signed out.', 'info');
  };

  const updateCustomerProfile = (data: Partial<CustomerUser>) => {
    if (customer) {
      setCustomer({ ...customer, ...data });
      addNotification('Profile Updated', 'Your profile details have been saved.', 'info');
    }
  };

  // Admin Auth - Protected with secret PIN
  const loginAdmin = (passcode: string) => {
    if (passcode.trim() === '202020') {
      setIsAdmin(true);
      addNotification('Staff Access Granted', 'Welcome to Tobstech Management Dashboard.', 'info');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    addNotification('Admin Mode Closed', 'Returned to customer view.', 'info');
  };

  // WhatsApp link generator
  const getWhatsAppUrl = (
    type: 'general' | 'service' | 'product' | 'order' | 'booking',
    payload?: any
  ): string => {
    let phone = businessConfig.whatsappNumber.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      phone = '254' + phone.slice(1);
    }
    let text = `Hello ${businessConfig.businessName}. `;

    switch (type) {
      case 'service':
        text += `I would like to enquire about your service: ${payload?.name || 'Cyber & Printing'}.`;
        break;
      case 'product':
        text += `I would like to enquire about this product: ${payload?.name || 'Stationery'}.`;
        break;
      case 'order':
        text += `I have placed order ${payload?.id || ''}. I would like assistance with my order.`;
        break;
      case 'booking':
        text += `I have submitted booking ${payload?.id || ''} for ${payload?.serviceName || 'service'}. I would like to follow up.`;
        break;
      case 'general':
      default:
        text += `I need assistance with cyber, printing or bookshop services in Magongo.`;
        break;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        businessConfig,
        updateBusinessConfig,
        services,
        addService,
        updateService,
        deleteService,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        resetAllCatalogData,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        createOrder,
        submitPaymentForOrder,
        updateOrderStatus,
        verifyOrderPayment,
        bookings,
        createBooking,
        submitPaymentForBooking,
        updateBookingStatus,
        verifyBookingPayment,
        customer,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        updateCustomerProfile,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        notifications,
        addNotification,
        markNotificationAsRead,
        clearNotifications,
        getWhatsAppUrl,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
