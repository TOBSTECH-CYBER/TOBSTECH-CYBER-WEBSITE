export type ServiceCategory = 'cyber_government' | 'document_services' | 'bookshop_stationery' | 'digital_design';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number; // in KES
  estimatedTime: string;
  iconName: string;
  popular?: boolean;
  requiresDocumentUpload?: boolean;
}

export type ProductCategory = 
  | 'books'
  | 'exercise_books'
  | 'pens_pencils'
  | 'stationery'
  | 'files_folders'
  | 'school_supplies'
  | 'office_supplies'
  | 'printing_materials';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in KES
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount: number;
  imageUrl?: string;
  featured?: boolean;
  unit?: string; // e.g. "Pack of 10", "Piece", "Ream"
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export type PaymentStatus = 'Pending Verification' | 'Verified' | 'Rejected' | 'Refunded';

export type OrderStatus = 
  | 'Order Received'
  | 'Payment Pending'
  | 'Payment Verified'
  | 'Processing'
  | 'Ready for Collection'
  | 'Completed'
  | 'Cancelled';

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'In Progress'
  | 'Ready for Collection'
  | 'Completed'
  | 'Cancelled';

export interface OrderRecord {
  id: string; // e.g., TB-ORD-2026-1042
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentType: 'collection' | 'delivery';
  deliveryAddress?: string;
  deliveryNotes?: string;
  items: {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'M-PESA Till 6816189' | 'Cash at Counter';
  mpesaCode?: string;
  mpesaAmountPaid?: number;
  mpesaPhone?: string;
  paymentSubmittedAt?: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  adminNotes?: string;
}

export interface BookingRecord {
  id: string; // e.g., TB-BK-2026-0042
  createdAt: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  preferredDate: string;
  preferredTime: string;
  additionalInstructions: string;
  // Printing specifications if applicable
  specs?: {
    numberOfCopies?: number;
    colorType?: 'black_and_white' | 'full_colour';
    paperSize?: 'A4' | 'A3' | 'Letter';
    sided?: 'single_sided' | 'double_sided';
    binding?: 'none' | 'spiral' | 'staple';
    fileName?: string;
    fileSizeMb?: number;
  };
  estimatedCost: number;
  paymentStatus: PaymentStatus;
  mpesaCode?: string;
  bookingStatus: BookingStatus;
  adminNotes?: string;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface BusinessConfig {
  businessName: string;
  location: string;
  landmark: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  mpesaTillNumber: string;
  mpesaTillName: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'booking' | 'payment' | 'info';
  read: boolean;
  link?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  tag: string;
}

