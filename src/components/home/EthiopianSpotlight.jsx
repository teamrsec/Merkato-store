import { useStore } from '../../context/StoreContext';
import ProductCard from '../product/ProductCard';
import { Sparkles, Award, ArrowRight } from 'lucide-react';

export default function EthiopianSpotlight() {
  const { products, lang, t, setCurrentView, setSelectedCategory } = useStore();

  const ethiopianProducts = products.filter((p) => p.isEthiopianMade);

  return (
    <section className="py-14 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Ethiopian pattern accent banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'am' ? 'የሀገር ውስጥ ምርቶች' : 'PROUDLY ETHIOPIAN 🇪🇹'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('ethiopianSpotlightTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              {t('ethiopianSpotlightSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('traditional');
                setCurrentView('shop');
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>{lang === 'am' ? 'ሁሉንም የባህል እቃዎች እይ' : 'Explore All Local Crafts'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ethiopianProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Artisans & Farmers Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{lang === 'am' ? 'የአምራቾች እና ገበሬዎች ድጋፍ' : 'Empowering Ethiopian Artisans & Farmers'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'am'
                ? 'በቀጥታ ከሸማ ተራ፣ ከይርጋጨፌ እና ከጎጃም ገበሬዎች በቀጥታ የተሰበሰበ'
                : 'Direct from Merkato Shema Terra, Yirgacheffe Cooperatives & Gojjam Harvesters'}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              {lang === 'am'
                ? 'እያንዳንዱ ግዢ የአገር ውስጥ ጥበበኞችን እና ገበሬዎችን በቀጥታ ይደግፋል።'
                : '100% fair prices, zero middlemen markups, and guaranteed authenticity on every single order.'}
            </p>
          </div>

          <button
            onClick={() => setCurrentView('seller')}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-xs font-extrabold shadow-lg shadow-amber-400/20 shrink-0 transition-all cursor-pointer"
          >
            {lang === 'am' ? 'የሀገር ውስጥ ሻጭ ይሁኑ' : 'Join as Local Artisan'}
          </button>
        </div>
      </div>
    </section>
  );
}

