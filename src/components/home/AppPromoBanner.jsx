import { useStore } from '../../context/StoreContext';
import { Smartphone,  QrCode } from 'lucide-react';

export default function AppPromoBanner() {
  const { lang } = useStore();

  return (
    <section className="py-14 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'የሞባይል መተግበሪያ' : 'FAST MOBILE APP'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {lang === 'am'
                ? 'የመርካቶ ስቶርን መተግበሪያ በስልክዎ ይጫኑ'
                : 'Shop Faster on the Merkato Mobile App'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {lang === 'am'
                ? 'በቴሌብር ፈጣን ክፍያ፣ የቀጥታ የትዕዛዝ ክትትል፣ እና ልዩ የመተግበሪያ ቅናሾችን በእጅዎ ያግኙ። ለአንድሮይድ እና ለአይፎን ተዘጋጅቷል።'
                : 'Get instant live push notifications on order delivery, 1-click Telebirr payments, and exclusive mobile-only flash coupons.'}
            </p>

            {/* Badges / Download Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 rounded-2xl border border-slate-700 cursor-pointer transition-all shadow-md">
                <Smartphone className="w-6 h-6 text-emerald-400" />
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 uppercase block">Download for</span>
                  <span className="text-xs font-extrabold text-white">Android APK / Google Play</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 rounded-2xl border border-slate-700 cursor-pointer transition-all shadow-md">
                <Smartphone className="w-6 h-6 text-amber-400" />
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 uppercase block">Download for</span>
                  <span className="text-xs font-extrabold text-white">iOS App Store</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right QR Scan & App Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl text-center flex flex-col items-center max-w-xs">
              <div className="w-36 h-36 bg-white rounded-2xl p-3 shadow-lg flex items-center justify-center mb-3">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>
              <span className="text-xs font-bold text-amber-300 mb-1">
                {lang === 'am' ? 'በስልክዎ ካሜራ ይቃኙ' : 'Scan to Download & Install'}
              </span>
              <p className="text-[11px] text-slate-300">
                {lang === 'am' ? 'በቴሌብር ሲከፍሉ ተጨማሪ 5% ቅናሽ ያግኙ' : 'Get 5% off your first in-app purchase with code APP5'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

