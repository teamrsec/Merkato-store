import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import NotificationPopover from '../common/NotificationPopover';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  
  Store,
  ShieldCheck,
  TrendingUp,
  Flame,
  Truck,
  
  LogIn,
  UserPlus,
  LogOut,
  Bell,
  Scale,
  Coins
} from 'lucide-react';

export default function Navbar() {
  const {
    lang,
    t,
    currentView,
    setCurrentView,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totalCartItemsCount,
    wishlist,
    compareList,
    setIsCompareModalOpen,
    setIsRewardsModalOpen,
    notifications,
    setIsCartDrawerOpen,
    openAuthModal,
    user,
    logout,
    products,
    openProductDetail
  } = useStore();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Click outside listener for Search dropdown, User menu, and Category menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setIsCategoryMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setIsUserMenuOpen(false);
        setIsCategoryMenuOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter products for live search autocomplete
  const liveSearchResults = searchQuery.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameAm.includes(searchQuery) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const popularSearches = ['Habesha Kemis', 'Yirgacheffe Coffee', 'Samsung S24', 'Berbere Spice', 'Electric Mitad', 'iPhone 15'];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setIsSearchFocused(false);
    setCurrentView('shop');
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setIsCategoryMenuOpen(false);
    setCurrentView('shop');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setCurrentView('home');
              }}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tight text-amber-300">M</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    Merkato<span className="text-emerald-600">Store</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-300/60 rounded">
                    ET 🇪🇹
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  {lang === 'am' ? 'የኢትዮጵያ የኦንላይን ገበያ' : 'Ethiopia\'s Premier Marketplace'}
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar with live autocomplete */}
          <div className="flex-1 max-w-2xl relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-11 pr-24 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-emerald-600 rounded-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-3 focus:ring-emerald-600/20 transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-20 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  {lang === 'am' ? 'ፈልግ' : 'Search'}
                </button>
              </div>
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && (
              <div
                className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {liveSearchResults.length > 0
                      ? (lang === 'am' ? 'የተገኙ ውጤቶች' : 'Matching Products')
                      : (lang === 'am' ? 'በብዛት የሚፈለጉ' : 'Popular Searches in Addis')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSearchFocused(false)}
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Close</span>
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {liveSearchResults.length > 0 ? (
                  <div className="space-y-1">
                    {liveSearchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setIsSearchFocused(false);
                          openProductDetail(prod);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50/60 cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {lang === 'am' ? prod.nameAm : prod.name}
                          </p>
                          <p className="text-[11px] text-emerald-700 font-bold">
                            ETB {prod.price.toLocaleString()}
                          </p>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {prod.brand}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(item);
                          setIsSearchFocused(false);
                          setCurrentView('shop');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-xs text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action buttons (Rewards, Compare, Notifications, Become a Seller, Wishlist, Cart, User) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Rewards / Points Shortcut */}
            <button
              onClick={() => setIsRewardsModalOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300 text-xs font-bold transition-all cursor-pointer"
              title="Merkato Rewards & Points"
            >
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>{user ? `${user.points || 450} Pts` : 'Rewards'}</span>
            </button>

            {/* Compare Products Button */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="p-2.5 rounded-full text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors relative cursor-pointer"
                title="Compare Products"
              >
                <Scale className="w-5 h-5 text-emerald-700" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-full text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationPopover
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>

            {/* Become a Seller Button */}
            <button
              onClick={() => setCurrentView('seller')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'seller'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 border border-amber-500/30'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-700" />
              {t('becomeSeller')}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentView('account')}
              className="p-2.5 rounded-full text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors relative cursor-pointer"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 rounded-full transition-all border border-emerald-200/80 relative cursor-pointer group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
                {totalCartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4.5 h-4.5 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs animate-bounce">
                    {totalCartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline text-emerald-900">
                {t('cart')}
              </span>
            </button>

            {/* USER / AUTHENTICATION SECTION */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                /* LOGGED IN VIEW */
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center text-xs font-bold">
                    {user.name[0]}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[11px] font-bold text-slate-800 leading-tight truncate max-w-[90px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[9px] text-emerald-600 font-semibold">
                      {user.points || 450} Pts
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>
              ) : (
                /* LOGGED OUT: CLEAR SIGN IN / SIGN UP BUTTONS */
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{lang === 'am' ? 'ይግቡ' : 'Sign In'}</span>
                  </button>

                  <button
                    onClick={() => openAuthModal('signup')}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'am' ? 'ይመዝገቡ' : 'Sign Up'}</span>
                  </button>
                </div>
              )}

              {/* User Dropdown Menu when Logged In */}
              {isUserMenuOpen && user && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.phone}</p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('account');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    {t('account')}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('track');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    {t('trackOrder')}
                  </button>

                  <button
                    onClick={() => {
                      setIsRewardsModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>Rewards & Referral (ETB 200)</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('seller');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                    {t('sellerDashboard')}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    {t('adminPortal')}
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('signOut')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-16 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1 px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-bold cursor-pointer"
            >
              {lang === 'am' ? 'ፈልግ' : 'Go'}
            </button>
          </form>
        </div>
      </div>

      {/* Secondary Category & Quick Navigation Bar */}
      <nav className="bg-slate-900 text-slate-200 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Categories Dropdown */}
          <div className="relative" ref={categoryMenuRef}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center gap-2 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>{t('allCategories')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoryMenuOpen && (
              <div
                className="absolute left-0 top-full w-64 bg-white text-slate-800 rounded-b-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150"
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{lang === 'am' ? cat.nameAm : cat.name}</span>
                    <span className="text-[10px] text-slate-400">({cat.itemCount})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCurrentView('home');
              }}
              className={`py-2.5 hover:text-white transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300'
              }`}
            >
              {t('home')}
            </button>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setCurrentView('shop');
              }}
              className={`py-2.5 hover:text-white transition-colors cursor-pointer ${
                currentView === 'shop' && !selectedCategory ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300'
              }`}
            >
              {t('shop')}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('traditional');
                setCurrentView('shop');
              }}
              className="py-2.5 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-amber-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'am' ? 'የሀገር ባህል' : 'Made in Ethiopia 🇪🇹'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('deals');
              }}
              className={`py-2.5 hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                currentView === 'deals' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>{t('deals')}</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setCurrentView('shop');
              }}
              className="py-2.5 hover:text-white transition-colors cursor-pointer text-slate-300"
            >
              {t('newArrivals')}
            </button>

            <button
              onClick={() => setCurrentView('track')}
              className={`py-2.5 hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                currentView === 'track' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('trackOrder')}</span>
            </button>
          </div>

          {/* Right Hotline */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300">
            <span>{lang === 'am' ? 'የደንበኞች መስመር፡' : 'Helpline:'}</span>
            <span className="font-mono font-bold text-amber-400">8899 / +251 911 234567</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
