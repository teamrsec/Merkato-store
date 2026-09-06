import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Scale,
  Star,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Sparkles,
  Check,
  ArrowRight
} from 'lucide-react';

export default function ProductCompareModal() {
  const {
    compareList,
    removeFromCompare,
    clearCompareList,
    isCompareModalOpen,
    setIsCompareModalOpen,
    formatPrice,
    addToCart,
    lang,
    t
  } = useStore();

  if (!isCompareModalOpen || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCompareModalOpen(false)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-200 z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === 'am' ? 'ምርቶችን ያወዳድሩ' : 'Compare Products Side-by-Side'}
              </h2>
              <p className="text-xs text-slate-500">
                Comparing {compareList.length} items in detail
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompareList}
              className="text-xs text-slate-400 hover:text-rose-600 font-semibold px-2 py-1 cursor-pointer transition-colors"
            >
              {lang === 'am' ? 'ሁሉንም አጽዳ' : 'Clear All'}
            </button>
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-w-[700px]">
            {compareList.map((product) => (
              <div
                key={product.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-slate-200">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-slate-600 hover:text-rose-600 shadow-xs cursor-pointer"
                    title="Remove from compare"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                    {product.brand}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {lang === 'am' && product.nameAm ? product.nameAm : product.name}
                  </h4>

                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-sm text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                  </div>

                  {/* Attributes comparison */}
                  <div className="pt-3 border-t border-slate-200 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Origin:</span>
                      <span className="font-bold text-slate-800">
                        {product.isEthiopianMade ? '🇪🇹 Ethiopia' : 'Imported'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Stock:</span>
                      <span className="font-bold text-emerald-700">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seller:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[100px]">
                        {product.sellerName}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{t('addToCart')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

