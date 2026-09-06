import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../product/ProductCard';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  Truck,
  Plus,
  LogIn,
  UserPlus,
  UserCheck
} from 'lucide-react';

export default function UserAccount() {
  const {
    user,
    logout,
    orders,
    wishlist,
    lang,
    t,
    formatPrice,
    setCurrentView,
    addToCart,
    openAuthModal,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'wishlist', 'addresses', 'payments'

  const handleMoveAllWishlistToCart = () => {
    wishlist.forEach((item) => addToCart(item, 1));
    addToast('All wishlist items added to cart!', 'success');
  };

  // If user is not signed in
  if (!user) {
    return (
      <div className="bg-[#F8FAFC] py-16 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md shadow-emerald-700/20">
              <User className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {lang === 'am' ? 'ወደ መለያዎ ይግቡ' : 'Sign In to Your Account'}
              </h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                {lang === 'am'
                  ? 'የትዕዛዝ ሂደትዎን ለመከታተል፣ የምኞት ዝርዝርዎን ለማየት እና በቴሌብር በፍጥነት ለመገበያየት ይግቡ ወይም ይመዝገቡ።'
                  : 'Track your deliveries across Addis Ababa, manage your wishlist, and enjoy instant 1-click Telebirr checkout.'}
              </p>
            </div>

            {/* Main Auth Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'am' ? 'ይግቡ (Sign In)' : 'Sign In'}</span>
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>{lang === 'am' ? 'አዲስ መለያ ይፍጠሩ (Sign Up)' : 'Create New Account'}</span>
              </button>
            </div>

            {/* Quick Demo Logins */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                ⚡ {lang === 'am' ? 'በቀላሉ ለመሞከር' : 'Quick 1-Click Demo Login'}
              </span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Log in as Shopper (Amanuel Kebede)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Top Profile Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 text-amber-300 font-black text-2xl flex items-center justify-center shadow-lg">
                {user.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/40">
                    {user.role === 'admin' ? 'Admin 🛡️' : user.role === 'seller' ? 'Seller 🏪' : 'Verified Member 🇪🇹'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{user.phone} | {user.email}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 sm:gap-6 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
              <div className="text-center px-3">
                <span className="text-xs text-slate-400 block">{t('totalOrders')}</span>
                <span className="text-lg font-black text-white">{orders.length}</span>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-center px-3">
                <span className="text-xs text-slate-400 block">{t('wishlist')}</span>
                <span className="text-lg font-black text-amber-400">{wishlist.length}</span>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-center px-3">
                <span className="text-xs text-slate-400 block">Rewards</span>
                <span className="text-lg font-black text-emerald-400">{user.points || 450} Pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Body Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-3 space-y-2 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm h-fit">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'am' ? 'የእኔ ትዕዛዞች' : 'My Orders'}</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>{t('wishlist')}</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{lang === 'am' ? 'የተቀመጡ አድራሻዎች' : 'Saved Addresses'}</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'payments'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-teal-600" />
              <span>{lang === 'am' ? 'የክፍያ መንገዶች (ቴሌብር)' : 'Telebirr & Payments'}</span>
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all border-t border-slate-100 pt-3 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('signOut')}</span>
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm min-h-[400px]">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900">
                  {lang === 'am' ? 'የቅርብ ጊዜ ትዕዛዞች' : 'Order History & Status'}
                </h3>

                {orders.length === 0 ? (
                  <p className="text-xs text-slate-500">No orders placed yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                          <div>
                            <span className="font-mono font-black text-sm text-slate-900">
                              Order #{order.id}
                            </span>
                            <p className="text-[11px] text-slate-400">{order.date}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                              {order.status.replace(/_/g, ' ')}
                            </span>

                            <button
                              onClick={() => setCurrentView('track')}
                              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Truck className="w-3.5 h-3.5 text-amber-400" />
                              <span>{t('trackOrder')}</span>
                            </button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-slate-700">
                                {item.quantity}x {item.name} ({item.selectedVariant})
                              </span>
                              <span className="font-bold text-slate-900">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-xs">
                          <span className="text-slate-500">{order.paymentStatus}</span>
                          <span className="font-black text-sm text-emerald-800">
                            Total: {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900">
                    {t('wishlist')} ({wishlist.length})
                  </h3>
                  {wishlist.length > 0 && (
                    <button
                      onClick={handleMoveAllWishlistToCart}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      {lang === 'am' ? 'ሁሉንም ወደ ጋሪ ጨምር' : 'Move All to Cart'}
                    </button>
                  )}
                </div>

                {wishlist.length === 0 ? (
                  <p className="text-xs text-slate-500">Your wishlist is currently empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900">
                    {lang === 'am' ? 'የተቀመጡ አድራሻዎች' : 'Saved Delivery Addresses'}
                  </h3>
                  <button className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Home (Default)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium">{user.address}</p>
                  <p className="text-slate-500">{user.subCity} | Phone: {user.phone}</p>
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900">
                  {lang === 'am' ? 'የክፍያ ዘዴዎች' : 'Linked Ethiopian Payment Methods'}
                </h3>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      TB
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Telebirr Wallet (Linked)</h4>
                      <p className="text-[11px] text-slate-500">{user.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-800 font-bold">Active & Verified</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
