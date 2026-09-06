import React from 'react';
import { useStore } from '../../context/StoreContext';
import { History, Eye, X, ChevronRight } from 'lucide-react';

export default function RecentlyViewedBar() {
  const { viewHistory, openProductDetail, formatPrice, lang } = useStore();

  if (!viewHistory || viewHistory.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-xs sm:text-sm text-slate-800">
            {lang === 'am' ? 'በቅርብ ያዩዋቸው እቃዎች' : 'Recently Viewed by You'}
          </h3>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {viewHistory.map((product) => (
          <div
            key={product.id}
            onClick={() => openProductDetail(product)}
            className="flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer shrink-0 min-w-[220px] max-w-[260px]"
          >
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-800 truncate">
                {lang === 'am' && product.nameAm ? product.nameAm : product.name}
              </h4>
              <p className="text-xs font-extrabold text-emerald-700">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

