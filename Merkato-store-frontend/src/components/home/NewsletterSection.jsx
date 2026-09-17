import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const { lang, t, addToast } = useStore();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setSubscribed(true);
    addToast('Subscribed to Merkato weekly deals! Use code WELCOME10 for 10% off.', 'success');
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700/80 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'ልዩ ሳምንታዊ ኩፖኖች' : 'EXCLUSIVE DISCOUNTS'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('newsletterTitle')}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300">
              {t('newsletterSub')}
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>
                  {lang === 'am'
                    ? 'እናመሰግናለን! የ10% የቅናሽ ኮድዎ፡ WELCOME10'
                    : 'Thank you for subscribing! Your 10% discount code is: WELCOME10'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={lang === 'am' ? 'ኢሜይል ወይም ስልክ ቁጥር ያስገቡ...' : 'Enter your email or phone number...'}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-600 rounded-2xl text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all shrink-0 cursor-pointer"
                >
                  {t('subscribe')}
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-400 pt-1">
              {lang === 'am' ? 'ምንም አይነት አላስፈላጊ መልእክቶች አንልክም። በማንኛውም ጊዜ ማቋረጥ ይችላሉ።' : 'No spam. Unsubscribe at any time.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

