import { useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Bell, Package, Flame } from 'lucide-react';

export default function NotificationPopover({ isOpen, onClose }) {
  const { notifications, markAllNotificationsAsRead, lang, setCurrentView } = useStore();
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-400" />
          <h4 className="font-bold text-xs">
            {lang === 'am' ? 'ማሳወቂያዎች' : 'Notifications Feed'}
          </h4>
        </div>
        <button
          onClick={markAllNotificationsAsRead}
          className="text-[10px] text-emerald-300 hover:text-emerald-200 font-semibold cursor-pointer"
        >
          {lang === 'am' ? 'ሁሉንም አንብብ' : 'Mark all as read'}
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-2">
        {notifications.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-400">No new notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.type === 'order') setCurrentView('track');
                if (n.type === 'deal') setCurrentView('deals');
                onClose();
              }}
              className={`p-3 rounded-2xl transition-colors cursor-pointer flex gap-3 ${
                n.read ? 'bg-white hover:bg-slate-50' : 'bg-emerald-50/50 hover:bg-emerald-50'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'order' ? <Package className="w-4 h-4" /> : <Flame className="w-4 h-4 text-rose-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-xs text-slate-900 truncate">{n.title}</h5>
                  <span className="text-[9px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">
                  {n.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

