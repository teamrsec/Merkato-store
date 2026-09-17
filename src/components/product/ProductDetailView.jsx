import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from './ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Share2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Scale
} from 'lucide-react';

export default function ProductDetailView() {
  const {
    selectedDetailProduct,
    products,
    setProducts,
    setSelectedDetailProduct,
    lang,
    t,
    formatPrice,
    addToCart,
    toggleWishlist,
    isProductWishlisted,
    addToCompare,
    selectedLocation,
    setSelectedLocation,
    locations,
    setCurrentView,
    addToast
  } = useStore();

  const product = selectedDetailProduct || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(() => product?.colors?.[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(() => product?.sizes?.[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'specs', 'reviews'

  // Review Form state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');

  const images = product.images || [product.image];
  const isWishlisted = isProductWishlisted(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const variant = selectedColor
      ? `${selectedColor}${selectedSize ? ' / ' + selectedSize : ''}`
      : selectedSize || 'Standard';
    addToCart(product, quantity, variant);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCurrentView('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Merkato Store!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      user: newReviewAuthor || 'Verified Customer',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verified: true
    };

    const updatedProduct = {
      ...product,
      reviews: [newRev, ...(product.reviews || [])],
      reviewsCount: (product.reviewsCount || 0) + 1
    };
    setProducts((prev) => prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)));
    setSelectedDetailProduct(updatedProduct);
    setIsReviewModalOpen(false);
    setNewReviewComment('');
    setNewReviewAuthor('');
    addToast('Review submitted successfully! Thank you.', 'success');
  };

  return (
    <div className="bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-emerald-700 transition-colors"
          >
            {t('home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => setCurrentView('shop')}
            className="hover:text-emerald-700 transition-colors uppercase"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {lang === 'am' && product.nameAm ? product.nameAm : product.name}
          </span>
        </div>

        {/* Product Hero Layout */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    -{product.discountPercent}% {t('off')}
                  </span>
                )}

                {product.isEthiopianMade && (
                  <span className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md">
                    Made in Ethiopia 🇪🇹
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Buy Box & Options */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Seller header */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-extrabold text-emerald-700 tracking-wider uppercase">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/60 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{product.sellerName}</span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                  {lang === 'am' && product.nameAm ? product.nameAm : product.name}
                </h1>

                {/* Rating & In-Stock */}
                <div className="flex items-center gap-3 mt-3 flex-wrap">
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
                  <span className="text-xs text-slate-400">
                    ({product.reviewsCount} {t('reviewsCount')})
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                    {t('inStock')} ({product.stockCount || 15} left)
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block mb-1">
                    {lang === 'am' ? 'የእቃው ዋጋ' : 'Price in Ethiopian Birr'}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-bold text-slate-800 block mb-2">
                      {t('selectColor')}: <span className="font-medium text-slate-500">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((col) => (
                        <button
                          key={col}
                          onClick={() => setSelectedColor(col)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedColor === col
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-600/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-slate-800 block mb-2">
                      {t('selectSize')}: <span className="font-medium text-slate-500">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-600/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ethiopian Location Delivery Selector */}
                <div className="mt-5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      {t('deliveryEstimate')}
                    </span>

                    <select
                      value={selectedLocation.id}
                      onChange={(e) => {
                        const loc = locations.find((l) => l.id === e.target.value);
                        if (loc) setSelectedLocation(loc);
                      }}
                      className="bg-white border border-slate-300 rounded-lg px-2 py-1 font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                    >
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {lang === 'am' ? l.subCityAm : l.subCityEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 pt-1">
                    <span>
                      {lang === 'am' ? 'የሚደርስበት ጊዜ፡' : 'Est. Time:'}{' '}
                      <strong className="text-slate-900">
                        {lang === 'am' ? selectedLocation.estimatedTimeAm : selectedLocation.estimatedTime}
                      </strong>
                    </span>
                    <span>
                      {t('deliveryFee')}:{' '}
                      <strong className="text-emerald-800 font-extrabold font-mono">
                        {formatPrice(selectedLocation.deliveryFee)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-extrabold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600'
                    }`}
                    title={t('wishlist')}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>

                  {/* Compare */}
                  <button
                    onClick={() => addToCompare(product)}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                    title="Compare"
                  >
                    <Scale className="w-5 h-5" />
                  </button>

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title={t('shareProduct')}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t('buyNow')} (Telebirr / CBE / COD)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info (Description, Specs, Reviews) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="flex border-b border-slate-200 gap-6 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'description'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {lang === 'am' ? 'የእቃው መግለጫ' : 'Description'}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t('specifications')}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{t('customerReviews')}</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs">
                {product.reviews?.length || 0}
              </span>
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed max-w-none">
              <p>{lang === 'am' && product.descriptionAm ? product.descriptionAm : product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && product.specs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <span className="font-semibold text-slate-600">{key}:</span>
                  <span className="font-bold text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-slate-900">{product.rating}</span>
                  <div>
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
                    <span className="text-xs text-slate-500">
                      Based on {product.reviewsCount} verified reviews
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {t('writeReview')}
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{rev.user}</span>
                          {rev.verified && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No reviews yet. Be the first to leave a review!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">{t('relatedProducts')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 z-10 space-y-4">
            <h3 className="font-bold text-lg text-slate-900">{t('writeReview')}</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Bethlehem M."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Review</label>
                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Tell other shoppers about product quality, fit, or delivery speed..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
