import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Truck,
  Search,
  
  CheckCircle2,
  
  MapPin,
  Phone,
  
  Calendar } from 'lucide-react';

export default function OrderTracker() {
  const { orders, lang, t, formatPrice } = useStore();

  const [searchId, setSearchId] = useState(orders[0]?.id || 'ETH-84920');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  const handleSearch = (e) => {
    e?.preventDefault();
    const found = orders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      setSelectedOrder(null);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የቀጥታ ትዕዛዝ ክትትል' : 'REAL-TIME DISPATCH TRACKER'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('trackYourOrder')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            {t('trackSubtitle')}
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2 pt-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder={t('orderIdPlaceholder')}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-2xl text-xs uppercase font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              {t('trackBtn')}
            </button>
          </form>
        </div>

        {/* Selected Order Details */}
        {selectedOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8 animate-in fade-in duration-200">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Order ID:</span>
                  <span className="font-mono font-black text-slate-900 text-base">
                    {selectedOrder.id}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    {selectedOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Placed on {selectedOrder.date}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">{t('total')}:</span>
                <span className="font-black text-lg text-emerald-800">
                  {formatPrice(selectedOrder.total)}
                </span>
              </div>
            </div>

            {/* Visual Progress Timeline */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-6">
                {lang === 'am' ? 'የትዕዛዝ ሂደት ደረጃዎች' : 'Live Order Journey Timeline'}
              </h3>

              <div className="space-y-6 relative pl-6 sm:pl-8 border-l-2 border-emerald-500/40 ml-4">
                {selectedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        step.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                          : 'bg-white border-slate-300 text-slate-300'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            step.completed ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Card & Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              {/* Courier Profile */}
              {selectedOrder.courier && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
                  <img
                    src={selectedOrder.courier.photo}
                    alt={selectedOrder.courier.name}
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-300"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase block">
                      {t('assignedCourier')}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 truncate">
                      {selectedOrder.courier.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{selectedOrder.courier.phone}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Destination Address */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    {t('deliverTo')}
                  </span>
                  <p className="font-bold text-slate-900">
                    {selectedOrder.deliveryAddress.fullName}
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    {selectedOrder.deliveryAddress.address}, {selectedOrder.deliveryAddress.subCity}
                  </p>
                </div>
              </div>
            </div>

            {/* Items in Order */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                {lang === 'am' ? 'የታዘዙ እቃዎች' : 'Ordered Products'}
              </h4>

              <div className="space-y-2">
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg border bg-white"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900 truncate max-w-xs">
                          {lang === 'am' && item.nameAm ? item.nameAm : item.name}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          Qty: {item.quantity} | {item.selectedVariant}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-xs">
              No order found with ID "{searchId}". Try checking your account or search for <strong>ETH-84920</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
