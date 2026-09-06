import { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../product/ProductCard';
import { Flame, Clock, ChevronRight } from 'lucide-react';

export default function FlashDeals() {
  const { products, t, setCurrentView } = useStore();

  const flashDealProducts = products.filter((p) => p.isFlashDeal);

  // Real-time Countdown timer (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 p-4 sm:p-6 rounded-3xl border border-rose-200/60 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 shrink-0 animate-bounce">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  LIMITED TIME
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t('flashDealsTitle')}
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {t('flashDealsSubtitle')}
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>{t('endsIn')}:</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-sm font-extrabold shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}
                <span className="text-[9px] block text-slate-400 font-sans font-normal text-center">hrs</span>
              </div>
              <span className="text-slate-900 font-black">:</span>
              <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-sm font-extrabold shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="text-[9px] block text-slate-400 font-sans font-normal text-center">min</span>
              </div>
              <span className="text-slate-900 font-black">:</span>
              <div className="bg-rose-600 text-white px-2.5 py-1.5 rounded-xl text-sm font-extrabold shadow-xs">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="text-[9px] block text-rose-200 font-sans font-normal text-center">sec</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('deals')}
              className="hidden lg:flex items-center gap-1 ml-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <span>{t('viewAll')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDealProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
