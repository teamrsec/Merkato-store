import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../product/ProductCard';
import { TrendingUp } from 'lucide-react';

export default function TrendingSection() {
  const { products, lang, t } = useStore();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'phones', 'traditional', 'coffee-spices', 'groceries'

  const tabs = [
    { id: 'all', label: lang === 'am' ? 'ሁሉም' : 'All Trending' },
    { id: 'phones', label: lang === 'am' ? 'ስልኮች እና ቴክ' : 'Phones & Tech' },
    { id: 'traditional', label: lang === 'am' ? 'የሀገር ባህል' : 'Habesha Wear' },
    { id: 'coffee-spices', label: lang === 'am' ? 'ቡና እና ቅመም' : 'Coffee & Spices' },
    { id: 'groceries', label: lang === 'am' ? 'የማኛ ጤፍ' : 'Magna Teff' }
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return p.isTrending;
    return p.category === activeTab;
  });

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'በብዛት የተሸጡ' : 'POPULAR IN ADDIS ABABA'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('trendingTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('trendingSubtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/80 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
