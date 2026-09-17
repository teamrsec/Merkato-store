import { useStore } from '../../context/StoreContext';
import {
  ArrowRight,
  Flame,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  Gift
} from 'lucide-react';

export default function HeroBanner() {
  const { lang, t, setCurrentView, setSelectedCategory, formatPrice, openProductDetail, products } = useStore();

  const featuredProduct = products.find((p) => p.id === 'prod-2') || products[0];

  if (!featuredProduct) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-300 text-sm font-semibold">Loading Merkato Store catalog...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-6 pb-12 sm:pb-16">
      {/* Decorative background elements with Ethiopian palette warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telebirr promo bar */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-inner">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{t('telebirrBanner')}</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-amber-300 font-bold">Code: TELEBIRR5</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'am' ? 'የኢትዮጵያ ታላቁ የገበያ ማዕከል' : 'ETHIOPIA\'S 2026 MARKETPLACE'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
                {t('heroTitle')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  {t('heroHighlight')}
                </span>
              </h1>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentView('shop');
                }}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentView('deals')}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>{t('exploreDeals')}</span>
              </button>
            </div>

            {/* Quick Micro Trust Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-slate-800/80 max-w-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-slate-300 font-medium leading-tight">
                  {lang === 'am' ? 'የተረጋገጡ ሻጮች' : 'Verified Sellers'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-slate-300 font-medium leading-tight">
                  {lang === 'am' ? 'የበር አደራረስ' : 'Doorstep Delivery'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-[11px] text-slate-300 font-medium leading-tight">
                  {lang === 'am' ? 'ሳምንታዊ ቅናሾች' : 'Weekly Deals'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Spotlight Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/40 via-amber-500/20 to-teal-500/30 shadow-2xl">
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-[22px] p-5 sm:p-6 overflow-hidden relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{lang === 'am' ? 'የሳምንቱ ምርጥ' : 'Featured Spotlight'}</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    🇪🇹 {lang === 'am' ? 'መርካቶ ሸማ ተራ' : 'Merkato Shema Terra'}
                  </span>
                </div>

                <div
                  className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-slate-800 cursor-pointer group"
                  onClick={() => openProductDetail(featuredProduct)}
                >
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="text-xs font-bold text-amber-300">
                        {lang === 'am' ? 'በእጅ የተሸመነ የሀበሻ ቀሚስ' : '100% Handwoven Ethiopian Cotton'}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {lang === 'am' && featuredProduct.nameAm ? featuredProduct.nameAm : featuredProduct.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'am' ? 'ልዩ ዋጋ' : 'Special Price'}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-amber-300">
                        {formatPrice(featuredProduct.price)}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        {formatPrice(featuredProduct.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openProductDetail(featuredProduct)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    {lang === 'am' ? 'ይመልከቱ' : 'Quick View'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
