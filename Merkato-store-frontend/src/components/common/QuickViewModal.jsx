import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct } = useStore();

  if (!quickViewProduct) return null;

  return (
    <QuickViewContent
      key={quickViewProduct.id}
      product={quickViewProduct}
    />
  );
}

function QuickViewContent({ product }) {
  const {
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isProductWishlisted,
    formatPrice,
    lang,
    t,
    selectedLocation,
    openProductDetail
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    () => product.colors?.[0] ?? ''
  );
  const [selectedSize, setSelectedSize] = useState(
    () => product.sizes?.[0] ?? ''
  );
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [product.image];
  const isWishlisted = isProductWishlisted(product.id);

  const handleAddToCart = () => {
    const variant = selectedColor ? `${selectedColor}${selectedSize ? ' / ' + selectedSize : ''}` : selectedSize || 'Standard';
    addToCart(product, quantity, variant);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                  -{product.discountPercent}% {t('off')}
                </span>
              )}

              {product.isEthiopianMade && (
                <span className="absolute bottom-3 left-3 bg-amber-500/90 backdrop-blur-xs text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Made in Ethiopia 🇪🇹
                </span>
              )}
            </div>

            {/* Thumbnail switcher */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-emerald-600 ring-2 ring-emerald-600/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-emerald-700 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {product.sellerName}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {lang === 'am' && product.nameAm ? product.nameAm : product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} {t('reviewsCount')})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                {lang === 'am' && product.descriptionAm ? product.descriptionAm : product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                    {t('selectColor')}: <span className="font-normal text-slate-500">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedColor === col
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-3">
                  <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                    {t('selectSize')}: <span className="font-normal text-slate-500">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery notice */}
              <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {t('deliverTo')} <strong>{lang === 'am' ? selectedLocation.subCityAm : selectedLocation.subCityEn}</strong>
                  </span>
                </div>
                <span className="font-bold text-emerald-700">
                  {lang === 'am' ? selectedLocation.estimatedTimeAm : selectedLocation.estimatedTime}
                </span>
              </div>
            </div>

            {/* Actions (Add to Cart, Wishlist, Full Page) */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  onDoubleClick={handleBuyNow}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t('addToCart')}</span>
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details Link */}
              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  openProductDetail(product);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{lang === 'am' ? 'ሙሉ የምርት መረጃ እና ግምገማዎች' : 'View Full Details, Specs & Reviews'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
