import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  QrCode,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

export default function CheckoutFlow() {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    lang,
    t,
    formatPrice,
    locations,
    selectedLocation,
    setSelectedLocation,
    user,
    createOrder,
    setCurrentView,
    addToast
  } = useStore();

  const [step, setStep] = useState(1); // 1: Cart, 2: Delivery, 3: Payment, 4: Confirmed

  // Delivery Form
  const [fullName, setFullName] = useState(user?.name || 'Amanuel Kebede');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '+251 911 458920');
  const [city, setCity] = useState('Addis Ababa');
  const [subCity, setSubCity] = useState(selectedLocation?.id || 'bole');
  const [address, setAddress] = useState(user?.address || 'Bole Medhanialem, Near Edna Mall');
  const [instructions, setInstructions] = useState('Please call when the motorcycle courier reaches the building gate.');

  // Payment Form
  const [paymentMethod, setPaymentMethod] = useState('telebirr'); // 'telebirr', 'cbe-birr', 'bank', 'cod'
  const [telebirrPhone, setTelebirrPhone] = useState(user?.phone || '+251 911 458920');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);
  const [copiedBank, setCopiedBank] = useState(false);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleProceedToDelivery = () => {
    if (cart.length === 0) {
      addToast('Your cart is empty', 'error');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      addToast('Please fill all required delivery details', 'error');
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    const deliveryAddress = {
      fullName,
      phone: phoneNumber,
      city,
      subCity: locations.find((l) => l.id === subCity)?.[lang === 'am' ? 'subCityAm' : 'subCityEn'] || subCity,
      address,
      instructions
    };

    try {
      const orderId = await createOrder({
        paymentMethod,
        deliveryAddress
      });

      setConfirmedOrderId(orderId);
      setStep(4);
      triggerConfetti();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      addToast(error.message || 'Unable to place the order. Please try again.', 'error');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                  step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                1
              </div>
              <span className="text-[11px] font-bold mt-1 text-slate-700 hidden sm:block">
                {lang === 'am' ? 'ጋሪ' : 'Cart'}
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                  step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </div>
              <span className="text-[11px] font-bold mt-1 text-slate-700 hidden sm:block">
                {lang === 'am' ? 'አድራሻ' : 'Delivery'}
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                  step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                3
              </div>
              <span className="text-[11px] font-bold mt-1 text-slate-700 hidden sm:block">
                {lang === 'am' ? 'ክፍያ' : 'Payment'}
              </span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                  step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                4
              </div>
              <span className="text-[11px] font-bold mt-1 text-slate-700 hidden sm:block">
                {lang === 'am' ? 'ማረጋገጫ' : 'Confirmation'}
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: CART REVIEW */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <span>{t('step1Cart')}</span>
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-500 text-sm mb-4">Your cart is empty.</p>
                  <button
                    onClick={() => setCurrentView('shop')}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold"
                  >
                    {t('shopNow')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedVariant}`}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {lang === 'am' && item.nameAm ? item.nameAm : item.name}
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          Variant: {item.selectedVariant} | Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-extrabold text-sm text-emerald-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                {t('orderSummary')}
              </h3>

              <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
                <div className="flex justify-between text-slate-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(deliveryFee)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{t('discount')} ({appliedCoupon.code})</span>
                    <span>- {formatPrice(cartSubtotal + deliveryFee - cartTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t">
                  <span>{t('total')}</span>
                  <span className="text-emerald-700">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToDelivery}
                disabled={cart.length === 0}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('proceedToDelivery')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DELIVERY DETAILS */}
        {step === 2 && (
          <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>{t('step2Delivery')}</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('back')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+251 911 234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {t('city')} *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {t('subCity')} *
                  </label>
                  <select
                    value={subCity}
                    onChange={(e) => {
                      setSubCity(e.target.value);
                      const found = locations.find((l) => l.id === e.target.value);
                      if (found) setSelectedLocation(found);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {lang === 'am' ? loc.subCityAm : loc.subCityEn} ({loc.deliveryFee} ETB)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {t('specificAddress')} *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Bole Medhanialem, next to Edna Mall, House No. 402"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {t('deliveryNotes')}
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Call before coming, leave with building security..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs flex items-center gap-2 text-emerald-800">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Estimated delivery to <strong>{selectedLocation.subCityEn}</strong>: {selectedLocation.estimatedTime}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                {t('orderSummary')}
              </h3>
              <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
                <div className="flex justify-between text-slate-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t">
                  <span>{t('total')}</span>
                  <span className="text-emerald-700">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('proceedToPayment')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ETHIOPIAN PAYMENT SYSTEM */}
        {step === 3 && (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span>{t('paymentMethods')}</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('back')}</span>
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div className="space-y-3">
                {/* 1. Telebirr */}
                <div
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    paymentMethod === 'telebirr'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === 'telebirr'}
                    onChange={() => setPaymentMethod('telebirr')}
                    className="mt-1 text-emerald-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Telebirr (ቴሌብር)
                      </h4>
                      <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                        Instant
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{t('telebirrDesc')}</p>

                    {paymentMethod === 'telebirr' && (
                      <div className="mt-4 p-4 rounded-xl bg-white border border-emerald-300/80 space-y-3">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="w-24 h-24 bg-slate-900 rounded-xl p-2 flex items-center justify-center shrink-0">
                            <QrCode className="w-20 h-20 text-emerald-400" />
                          </div>
                          <div className="text-xs text-slate-600 space-y-1">
                            <span className="font-bold text-slate-900 block">
                              Option A: Scan QR on Telebirr App
                            </span>
                            <span className="font-bold text-slate-900 block pt-1">
                              Option B: Push USSD Prompt to phone
                            </span>
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="tel"
                                value={telebirrPhone}
                                onChange={(e) => setTelebirrPhone(e.target.value)}
                                placeholder="0911..."
                                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. CBE Birr */}
                <div
                  onClick={() => setPaymentMethod('cbe-birr')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    paymentMethod === 'cbe-birr'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === 'cbe-birr'}
                    onChange={() => setPaymentMethod('cbe-birr')}
                    className="mt-1 text-emerald-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-slate-900">
                      CBE Birr (የኢትዮጵያ ንግድ ባንክ)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{t('cbeBirrDesc')}</p>
                  </div>
                </div>

                {/* 3. Bank Transfer */}
                <div
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    paymentMethod === 'bank'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="mt-1 text-emerald-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-slate-900">
                      Bank Transfer (CBE / Awash / Dashen)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{t('bankTransferDesc')}</p>

                    {paymentMethod === 'bank' && (
                      <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase">CBE Account:</span>
                            <p className="font-mono font-bold text-slate-900">1000284920194</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard?.writeText('1000284920194');
                              setCopiedBank(true);
                              setTimeout(() => setCopiedBank(false), 2000);
                            }}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 cursor-pointer"
                          >
                            {copiedBank ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Cash on Delivery (COD) */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-emerald-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-slate-900">
                      Cash on Delivery (ክፍያ በርክክብ ወቅት)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{t('codDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                {t('orderSummary')}
              </h3>

              <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
                <div className="flex justify-between text-slate-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-bold text-slate-900">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t">
                  <span>{t('total')}</span>
                  <span className="text-emerald-700">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isProcessingPayment ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{t('placeOrder')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit Ethiopian Checkout</span>
              </div>
            </div>
          </form>
        )}

        {/* STEP 4: ORDER CONFIRMED */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md shadow-emerald-700/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                SUCCESSFUL ORDER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {lang === 'am' ? 'ትዕዛዝዎ በተሳካ ሁኔታ ተጠናቋል!' : 'Order Successfully Placed!'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'am'
                  ? `የትዕዛዝ መለያ ቁጥርዎ፡ ${confirmedOrderId}`
                  : `Your Order Reference ID: ${confirmedOrderId}`}
              </p>
            </div>

            {/* Order Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t('fullName')}:</span>
                <span className="font-bold text-slate-900">{fullName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t('subCity')}:</span>
                <span className="font-bold text-slate-900">{subCity} ({city})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-emerald-800 uppercase">{paymentMethod} (Verified)</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span className="text-emerald-700 font-extrabold">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setCurrentView('track')}
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{t('trackOrder')}</span>
              </button>

              <button
                onClick={() => setCurrentView('shop')}
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{t('continueShopping')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
