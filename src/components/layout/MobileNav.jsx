import { useStore } from '../../context/StoreContext';
import { Home, Grid, ShoppingCart, User, Flame } from 'lucide-react';

export default function MobileNav() {
  const { currentView, setCurrentView, totalCartItemsCount, setIsCartDrawerOpen, t, setSelectedCategory } = useStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-3">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setCurrentView('home');
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentView === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">{t('home')}</span>
        </button>

        {/* Categories / Shop */}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setCurrentView('shop');
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentView === 'shop' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">{t('allCategories')}</span>
        </button>

        {/* Deals */}
        <button
          onClick={() => setCurrentView('deals')}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentView === 'deals' ? 'text-rose-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Flame className="w-5 h-5 text-rose-500" />
          <span className="text-[10px]">{t('deals')}</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-500 relative transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalCartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">{t('cart')}</span>
        </button>

        {/* Account / Track */}
        <button
          onClick={() => setCurrentView('account')}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            currentView === 'account' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">{t('account')}</span>
        </button>
      </div>
    </div>
  );
}

