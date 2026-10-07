import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Package,
  MessageCircle,
  ArrowRight,
  CreditCard,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { OrderRecord } from '../types';
import { useApp } from '../context/AppContext';

interface OrderConfirmationPageProps {
  order: OrderRecord;
  onTrackOrder: (orderId: string) => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onTrackOrder,
  onContinueShopping,
}) => {
  const { businessConfig, submitPaymentForOrder, getWhatsAppUrl } = useApp();
  const [mpesaCode, setMpesaCode] = useState(order.mpesaCode || '');
  const [mpesaPhone, setMpesaPhone] = useState(order.mpesaPhone || order.customerPhone);
  const [hasSubmittedPayment, setHasSubmittedPayment] = useState(!!order.mpesaCode);

  const handleSubmitLater = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaCode.trim()) return;
    submitPaymentForOrder(order.id, mpesaCode.trim(), order.totalAmount, mpesaPhone);
    setHasSubmittedPayment(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Order Reference: <span className="font-mono text-emerald-700">{order.id}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Thank you, <strong>{order.customerName}</strong>. Your order has been registered in our Magongo fulfillment system.
          </p>
        </div>

        {/* Status Snapshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Order Status
            </span>
            <span className="text-xs font-bold text-slate-900 mt-1 inline-block">
              {order.orderStatus}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Payment Status
            </span>
            <span className="text-xs font-bold text-amber-600 mt-1 inline-block">
              {order.paymentStatus}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Fulfillment
            </span>
            <span className="text-xs font-bold text-slate-900 mt-1 inline-block capitalize">
              {order.fulfillmentType}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Total Amount
            </span>
            <span className="text-xs font-extrabold text-emerald-700 mt-1 inline-block">
              KES {order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Ordered Items ({order.items.length})
          </h3>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-white flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{item.productName}</span>
                  <span className="text-slate-500 block text-[11px]">
                    Qty: {item.quantity} × KES {item.unitPrice.toLocaleString()}
                  </span>
                </div>
                <span className="font-bold text-slate-900">
                  KES {item.total.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="p-3.5 bg-slate-50 flex items-center justify-between text-xs font-bold">
              <span>Grand Total</span>
              <span className="text-emerald-700 text-sm">
                KES {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Verification Card */}
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                M-PESA Till Number: 6816189
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Pay using M-PESA Buy Goods and Services.
              </p>
            </div>
          </div>

          {hasSubmittedPayment ? (
            <div className="bg-white p-4 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Code:</span>
                <span className="font-mono font-bold text-emerald-800">{order.mpesaCode || mpesaCode}</span>
              </div>
              <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                Payment details submitted successfully. Your payment will be verified by Tobstech staff in Magongo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitLater} className="space-y-3 bg-white p-4 rounded-xl border border-emerald-200">
              <span className="text-[11px] font-bold text-slate-700 block">
                Already paid? Enter M-PESA code to link with your order:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SI84QW79KL"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!mpesaCode.trim()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => onTrackOrder(order.id)}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <span>Track My Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppUrl('order', order)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm Order via WhatsApp</span>
          </a>

          <button
            onClick={onContinueShopping}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
