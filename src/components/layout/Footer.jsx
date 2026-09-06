import { useStore } from '../../context/StoreContext';
import {
  Truck,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  
  
  
  Store,
  CreditCard
} from 'lucide-react';

export default function Footer() {
  const { lang, t, setCurrentView, setSelectedCategory } = useStore();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{t('fastDelivery')}</h4>
              <p className="text-xs text-slate-400">{t('fastDeliverySub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{t('securePayments')}</h4>
              <p className="text-xs text-slate-400">{t('securePaymentsSub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{t('verifiedSellers')}</h4>
              <p className="text-xs text-slate-400">{t('verifiedSellersSub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{t('localSupport')}</h4>
              <p className="text-xs text-slate-400">{t('localSupportSub')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg text-amber-300">
                M
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Merkato<span className="text-emerald-500">Store</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                ET 🇪🇹
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {lang === 'am'
                ? 'መርካቶ ስቶር በኢትዮጵያ ቀዳሚው የኦንላይን የገበያ ማዕከል ነው። ከታመኑ ነጋዴዎች፣ በቴሌብር እና በባንክ ፈጣን ክፍያ፣ እስከ በርዎ ድረስ በታማኝነት እናደርሳለን።'
                : 'Merkato Store is Ethiopia\'s premier e-commerce marketplace connecting verified local sellers with millions of customers for fast doorstep delivery and seamless Telebirr checkouts.'}
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Bole Medhanialem & Merkato Hub, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Helpline: +251 911 234567 / Toll Free 8899</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>support@merkatostore.et</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="Telegram"
              >
                TG
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="TikTok"
              >
                TT
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="Facebook"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="Instagram"
              >
                IG
              </a>
            </div>
          </div>

          {/* Quick Shop */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'am' ? 'ሱቅ' : 'Shop'}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('phones');
                    setCurrentView('shop');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'am' ? 'ስልኮች እና እቃዎች' : 'Phones & Accessories'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('traditional');
                    setCurrentView('shop');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'am' ? 'የሀበሻ ባህል አልባሳት' : 'Habesha Traditional Wear'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('coffee-spices');
                    setCurrentView('shop');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'am' ? 'የይርጋጨፌ ቡና እና ቅመሞች' : 'Ethiopian Coffee & Spices'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('groceries');
                    setCurrentView('shop');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {lang === 'am' ? 'የማኛ ጤፍ እና ሸቀጦች' : 'Magna Teff & Groceries'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('deals')}
                  className="hover:text-emerald-400 transition-colors text-amber-400 font-semibold"
                >
                  {t('flashDealsTitle')}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'am' ? 'የደንበኞች አገልግሎት' : 'Customer Service'}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('track')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('trackOrder')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('account')}
                </button>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {lang === 'am' ? 'የማድረሻ ክፍያዎች እና ከተሞች' : 'Delivery Zones & Fees'}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {lang === 'am' ? 'የቴሌብር አከፋፈል መመሪያ' : 'Telebirr Payment Guide'}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {lang === 'am' ? 'የእቃ መመለስ እና ዋስትና' : 'Returns & Warranty'}
                </span>
              </li>
            </ul>
          </div>

          {/* Sellers & Admin */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'am' ? 'ነጋዴዎች እና አጋሮች' : 'Sellers & Partners'}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('seller')}
                  className="hover:text-amber-400 transition-colors font-bold text-amber-400 flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" />
                  {t('becomeSeller')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('seller')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('sellerDashboard')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('adminPortal')}
                </button>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {t('privacyPolicy')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {t('termsOfService')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 mr-2">
              {lang === 'am' ? 'የተደገፉ የክፍያ አማራጮች፡' : 'Supported Ethiopian Payments:'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-bold">
              Telebirr 📱
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/60 text-xs font-bold">
              CBE Birr 🏦
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-700 text-xs font-medium">
              Awash / Dashen / Abyssinia
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-700 text-xs font-medium">
              Cash on Delivery (COD) 💵
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026 Merkato Store. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

