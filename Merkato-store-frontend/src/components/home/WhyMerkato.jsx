import { useStore } from '../../context/StoreContext';
import { Truck, ShieldCheck, CheckCircle2, Headphones } from 'lucide-react';

export default function WhyMerkato() {
  const { lang } = useStore();

  const features = [
    {
      icon: Truck,
      color: 'bg-emerald-100 text-emerald-700',
      title: lang === 'am' ? 'ፈጣን የበር አደራረስ' : 'Fast Doorstep Delivery',
      desc: lang === 'am' ? 'በአዲስ አበባ እና በ15+ የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ አቅርቦት።' : 'Express delivery across Addis Ababa & 15+ major regional cities.'
    },
    {
      icon: ShieldCheck,
      color: 'bg-amber-100 text-amber-700',
      title: lang === 'am' ? 'አስተማማኝ ክፍያ' : 'Secure Ethiopian Payments',
      desc: lang === 'am' ? 'በቴሌብር፣ በሲቢኢ ብር፣ በባንክ ዝውውር እና በጥሬ ገንዘብ ይክፈሉ።' : 'Seamless instant checkout via Telebirr, CBE Birr, Awash, or Cash on Delivery.'
    },
    {
      icon: CheckCircle2,
      color: 'bg-teal-100 text-teal-700',
      title: lang === 'am' ? '100% የታመኑ ሻጮች' : 'Verified Ethiopian Sellers',
      desc: lang === 'am' ? 'ከመርካቶ እና ከታወቁ አስመጪዎች ትክክለኛ እና ጥራት ያላቸው እቃዎች።' : 'Handpicked merchants directly from Merkato, Bole, and registered artisans.'
    },
    {
      icon: Headphones,
      color: 'bg-rose-100 text-rose-700',
      title: lang === 'am' ? '24/7 የደንበኞች አገልግሎት' : 'Local Support Designed for You',
      desc: lang === 'am' ? 'በአማርኛ፣ በኦሮምኛ እና በእንግሊዝኛ በስልክ 8899 እና በቴሌግራም ፈጣን ድጋፍ።' : 'Dedicated assistance in Amharic, Oromo, and English via Phone 8899 & Telegram.'
    }
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {lang === 'am' ? 'ለምን መርካቶ ስቶር?' : 'THE MERKATO ADVANTAGE'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {lang === 'am' ? 'ለምን በመርካቶ ስቶር ይገበያያሉ?' : 'Why Shop with Merkato Store?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            {lang === 'am'
              ? 'የመርካቶን ሰፊ የገበያ ምርጫ ከዘመናዊ ቴክኖሎጂ እና አስተማማኝ አሰራር ጋር አጣምረን አቅርበናል።'
              : 'Combining the vast selection of the historic Merkato bazaar with cutting-edge 2026 digital commerce.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
