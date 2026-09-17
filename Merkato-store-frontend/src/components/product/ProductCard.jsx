import { useStore } from '../../context/StoreContext';
import {
  Star,
  Heart,
  Eye,
  ShoppingCart,
  ShieldCheck,
  Zap,
  
  Scale
} from 'lucide-react';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const {
    lang,
    t,
    formatPrice,
    addToCart,
    toggleWishlist,
    isProductWishlisted,
    addToCompare,
    setQuickViewProduct,
    openProductDetail
  } = useStore();

  const isWishlisted = isProductWishlisted(product.id);
  const image = product.images?.[0] || product.image;

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 p-4 flex flex-col sm:flex-row gap-4 relative overflow-hidden">
        {/* Product Image */}
        <div
          className="relative w-full sm:w-52 h-48 sm:h-auto rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
          onClick={() => openProductDetail(product)}
        >
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {product.discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
              -{product.discountPercent}%
            </span>
          )}

          {product.isEthiopianMade && (
            <span className="absolute bottom-2.5 left-2.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span>🇪🇹 Made in ET</span>
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-emerald-700 uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {product.sellerName}
              </span>
            </div>

            <h3
              onClick={() => openProductDetail(product)}
              className="font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2"
            >
              {lang === 'am' && product.nameAm ? product.nameAm : product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount})</span>
            </div>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2">
              {lang === 'am' && product.descriptionAm ? product.descriptionAm : product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => addToCompare(product)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="Compare Product"
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                onClick={() => setQuickViewProduct(product)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title={t('quickView')}
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
                title={t('wishlist')}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{t('addToCart')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100/70">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 cursor-pointer"
          onClick={() => openProductDetail(product)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
              -{product.discountPercent}%
            </span>
          )}

          {product.isFlashDeal && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-slate-950" />
              <span>Deal</span>
            </span>
          )}
        </div>

        {/* Made in Ethiopia Indicator */}
        {product.isEthiopianMade && (
          <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>🇪🇹 Made in ET</span>
          </span>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-rose-600 text-white'
                : 'bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600'
            }`}
            title={t('wishlist')}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => addToCompare(product)}
            className="w-8 h-8 rounded-full bg-white text-slate-700 shadow-md hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer"
            title="Compare"
          >
            <Scale className="w-4 h-4" />
          </button>

          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-8 h-8 rounded-full bg-white text-slate-700 shadow-md hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer"
            title={t('quickView')}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Seller */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-emerald-700 uppercase tracking-wider truncate max-w-[110px]">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400 truncate max-w-[110px]">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              {product.sellerName}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProductDetail(product)}
            className="font-bold text-xs sm:text-sm text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2 leading-snug cursor-pointer mb-1.5 h-9"
          >
            {lang === 'am' && product.nameAm ? product.nameAm : product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-none">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through mt-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center group/btn"
            title={t('addToCart')}
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
