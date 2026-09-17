import { useStore } from '../../context/StoreContext';
import {
  Tv,
  Smartphone,
  Sparkles,
  Coffee,
  ShoppingBag,
  Shirt,
  Home,
  Heart,
  Laptop,
  Smile,
  BookOpen,
  Car,
  ChevronRight
} from 'lucide-react';

const iconMap = {
  Tv,
  Smartphone,
  Sparkles,
  Coffee,
  ShoppingBag,
  Shirt,
  Home,
  Heart,
  Laptop,
  Smile,
  BookOpen,
  Car
};

export default function CategoryPills() {
  const { categories, lang, t, setSelectedCategory, setCurrentView } = useStore();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <span>{lang === 'am' ? 'የገበያ ምድቦች' : 'EXPLORE BY DEPARTMENT'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('categoriesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('categoriesSubtitle')}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentView('shop');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer group"
          >
            <span>{t('viewAll')} (12 {lang === 'am' ? 'ምድቦች' : 'Categories'})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || ShoppingBag;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Background image preview on hover */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-emerald-700 transition-colors">
                    {cat.itemCount}+
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                    {lang === 'am' ? cat.nameAm : cat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 mt-0.5 block group-hover:text-slate-600">
                    {lang === 'am' ? 'እቃዎችን እይ' : 'Shop Now'} &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

