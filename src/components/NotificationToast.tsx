import React from 'react';
import { CheckCircle2, AlertCircle, Info, Clock, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationToast: React.FC = () => {
  const { notifications, markNotificationAsRead } = useApp();

  const unreadNotifications = notifications.filter((n) => !n.read).slice(0, 3);

  if (unreadNotifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {unreadNotifications.map((notif) => {
        const getIcon = () => {
          switch (notif.type) {
            case 'payment':
              return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />;
            case 'order':
              return <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />;
            case 'booking':
              return <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />;
            default:
              return <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />;
          }
        };

        return (
          <div
            key={notif.id}
            className="pointer-events-auto bg-white border border-slate-200/90 shadow-xl rounded-xl p-3.5 flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-right-5"
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-slate-900 leading-tight">
                {notif.title}
              </h5>
              <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                {notif.message}
              </p>
            </div>
            <button
              onClick={() => markNotificationAsRead(notif.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
