import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  User,
  Mail,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderRecord } from '../types';

interface CartPageProps {
  onNavigateToBookshop: () => void;
  onOrderComplete: (order: OrderRecord) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateToBookshop,
  onOrderComplete,
}) => {
  const {
    cart,
    cartSubtotal,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    businessConfig,
    customer,
  } = useApp();

  // Checkout Form State
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [fulfillmentType, setFulfillmentType] = useState<'collection' | 'delivery'>('collection');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [fullName, setFullName] = useState(customer?.fullName || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [email, setEmail] = useState(customer?.email || '');

  // Payment Form State
  const [mpesaCode, setMpesaCode] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState(customer?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = fulfillmentType === 'delivery' ? 150 : 0;
  const orderTotal = cartSubtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your delivery location in Magongo / Mombasa.');
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      unitPrice: item.product.price,
      quantity: item.quantity,
      total: item.product.price * item.quantity,
    }));

    const newOrder = createOrder({
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || 'customer@tobstech.co.ke',
      fulfillmentType,
      deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress.trim() : undefined,
      deliveryNotes: deliveryNotes.trim() || undefined,
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee,
      totalAmount: orderTotal,
      paymentMethod: 'M-PESA Till 6816189',
      mpesaCode: mpesaCode.trim() ? mpesaCode.trim().toUpperCase() : undefined,
      mpesaAmountPaid: mpesaCode.trim() ? orderTotal : undefined,
      mpesaPhone: mpesaPhone.trim() || phone.trim(),
    });

    setIsSubmitting(false);
    onOrderComplete(newOrder);
  };

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          You haven't added any stationery, printing paper, or books yet. Explore our Magongo bookshop catalog.
        </p>
        <button
          onClick={onNavigateToBookshop}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
        >
          <span>Explore Stationery Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {step === 'cart' ? 'Review Your Items' : 'Checkout & M-PESA Payment'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
            {step === 'cart' ? 'Shopping Cart' : 'Order Checkout'}
          </h1>
        </div>
        {step === 'checkout' && (
          <button
            onClick={() => setStep('cart')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
          >
            ← Back to Cart
          </button>
        )}
      </div>

      {step === 'cart' ? (
        /* STEP 1: CART REVIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        KES {item.product.price.toLocaleString()} /{item.product.unit || 'unit'}
                      </p>
                      <span className="text-xs font-bold text-emerald-700 mt-1 block">
                        Subtotal: KES {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-7 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={clearCart}
                className="hover:text-rose-600 underline font-medium"
              >
                Clear Cart
              </button>
              <button
                onClick={onNavigateToBookshop}
                className="hover:text-emerald-700 font-bold"
              >
                + Add More Products
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items count:</span>
                <span className="font-bold text-slate-800">{cartCount} items</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">
                  KES {cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Collection / Delivery:</span>
                <span className="font-semibold text-slate-500">Calculated next step</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black text-slate-900">
                <span>Total:</span>
                <span className="text-emerald-700">KES {cartSubtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Till highlight */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <span className="font-bold block">Payable via M-PESA Till: 6816189</span>
              <p className="text-slate-600">
                Buy Goods and Services • Tobstech Cyber & Bookshop
              </p>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: CHECKOUT & PAYMENT */
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Customer Info & Fulfillment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fulfillment Choice */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                1. Select Fulfillment Method
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFulfillmentType('collection')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    fulfillmentType === 'collection'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Collect at Tobstech</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      FREE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Pick up in person at Magongo Main Road, opposite Posta.
                  </p>
                </div>

                <div
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Request Delivery</span>
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      KES 150
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Magongo, Changamwe, Mikindani & nearby Mombasa locales.
                  </p>
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Delivery Address / Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chaani Phase 1, near stage, gate opposite pharmacy"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Delivery Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call when rider arrives"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                2. Contact Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amina Hassan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Phone Number (M-PESA) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0722 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. amina@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: M-PESA Payment System Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              3. M-PESA Till Payment
            </span>

            {/* Prominent M-PESA Till Card */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  Buy Goods and Services
                </span>
                <span className="text-[11px] font-mono text-emerald-300">Lipa na M-PESA</span>
              </div>

              <div>
                <span className="text-xs text-slate-300 block">TILL NUMBER:</span>
                <span className="text-3xl font-black font-mono tracking-wider text-white">
                  {businessConfig.mpesaTillNumber}
                </span>
                <span className="text-xs text-emerald-300 block mt-0.5">
                  Account Name: {businessConfig.mpesaTillName}
                </span>
              </div>

              {/* Step by step */}
              <div className="bg-slate-900/80 rounded-xl p-3 text-[11px] text-slate-300 space-y-1">
                <p>1. Go to M-PESA menu → <strong>Lipa na M-PESA</strong></p>
                <p>2. Select <strong>Buy Goods and Services</strong></p>
                <p>3. Enter Till: <strong className="text-white font-mono">{businessConfig.mpesaTillNumber}</strong></p>
                <p>4. Amount: <strong className="text-white">KES {orderTotal.toLocaleString()}</strong></p>
                <p>5. Enter PIN & Send</p>
              </div>
            </div>

            {/* Submission fields */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  M-PESA Transaction Code (from SMS)
                </label>
                <input
                  type="text"
                  placeholder="e.g. SI84QW79KL"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-mono uppercase tracking-wider focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Phone Number Used for Payment
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0722 123 456"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                />
              </div>

              {/* Crucial Verification Notice */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Important Notice:</strong> Payment details submitted are verified manually by Tobstech counter staff in Magongo. Status will show <em>Pending Verification</em> until approved.
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span>KES {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Fulfillment Fee:</span>
                <span>{deliveryFee === 0 ? 'Free (Pickup)' : `KES ${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Grand Total:</span>
                <span className="text-emerald-700">KES {orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-slate-900 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              {isSubmitting ? 'Submitting Order...' : 'SUBMIT PAYMENT & PLACE ORDER'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
