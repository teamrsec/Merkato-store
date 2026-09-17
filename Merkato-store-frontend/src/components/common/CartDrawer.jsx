import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    lang,
    t,
    formatPrice,
    setCurrentView,
    selectedLocation
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{t('cart')}</h3>
                <p className="text-xs text-slate-500">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 transition-colors cursor-pointer"
                >
                  {lang === 'am' ? 'ሁሉንም አጽዳ' : 'Clear All'}
                </button>
              )}
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">
                  {lang === 'am' ? 'የእርስዎ ጋሪ ባዶ ነው' : 'Your Shopping Cart is Empty'}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  {lang === 'am'
                    ? 'በመርካቶ ስቶር የሚፈልጓቸውን እቃዎች አሁኑኑ ይመልከቱ እና ይዘዙ።'
                    : 'Explore fresh spices, authentic Habesha wear, electronics, and daily essentials from trusted sellers.'}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  {t('shopNow')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedVariant}`}
                  className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                          {lang === 'am' && item.nameAm ? item.nameAm : item.name}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedVariant)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-500 font-medium bg-white px-2 py-0.5 rounded border border-slate-200">
                          {item.selectedVariant}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
                      <span className="font-extrabold text-sm text-emerald-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.selectedVariant, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.selectedVariant, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 space-y-3">
              {/* Coupon Engine */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. WELCOME10)"
                    className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs uppercase text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  {t('apply')}
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-100/80 border border-emerald-300 px-3 py-1.5 rounded-lg text-emerald-900 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    {appliedCoupon.label}
                  </span>
                  <span className="font-bold">Active</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-2">
                <div className="flex justify-between text-slate-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    {t('deliveryFee')}
                    <span className="text-[10px] text-slate-400">
                      ({lang === 'am' ? selectedLocation.subCityAm : selectedLocation.subCityEn})
                    </span>
                  </span>
                  <span className="font-semibold text-slate-900">{formatPrice(deliveryFee)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{t('discount')}</span>
                    <span>- {formatPrice(cartSubtotal + deliveryFee - cartTotal)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t('total')}</span>
                  <span className="text-emerald-700 text-base">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <span>{lang === 'am' ? 'ወደ ክፍያ እና ማዘዣ ቀጥል' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Telebirr & CBE Birr Instant Protected Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

