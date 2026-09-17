import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Award,
  Sparkles,
  Gift,
  Share2,
  Copy,
  Check,
  Coins,
  TrendingUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function LoyaltyRewardsModal() {
  const {
    user,
    isRewardsModalOpen,
    setIsRewardsModalOpen,
    lang,
    t,
    formatPrice,
    addToast
  } = useStore();

  const [copiedReferral, setCopiedReferral] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftCardBalance, setGiftCardBalance] = useState(null);

  if (!isRewardsModalOpen) return null;

  const points = user?.points || 450;
  const etbValue = points; // 1 point = 1 ETB
  const referralCode = `MERKATO-${user?.name?.split(' ')[0]?.toUpperCase() || 'ETH'}-2026`;

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(`Join Merkato Store using my code ${referralCode} and get ETB 200 off your first order! https://merkatostore.et?ref=${referralCode}`);
    setCopiedReferral(true);
    addToast('Referral link copied! Share with friends.', 'success');
    setTimeout(() => setCopiedReferral(false), 2500);
  };

  const handleCheckGiftCard = (e) => {
    e.preventDefault();
    if (!giftCardCode.trim()) return;

    if (giftCardCode.toUpperCase().includes('GIFT') || giftCardCode.toUpperCase().includes('ETH')) {
      setGiftCardBalance(1500);
      addToast('Gift card valid! Balance: ETB 1,500', 'success');
    } else {
      setGiftCardBalance(0);
      addToast('Invalid or expired gift card code.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsRewardsModalOpen(false)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-6">
        <button
          onClick={() => setIsRewardsModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {lang === 'am' ? 'የመርካቶ ሽልማት እና ፖይንት' : 'Merkato Rewards & Loyalty Hub'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'am' ? 'በእያንዳንዱ ግዢ ፖይንት ያግኙ እና በቅናሽ ይቀይሩ' : 'Earn points on every order & redeem directly for ETB discounts.'}
            </p>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {lang === 'am' ? 'የተጠራቀመ ፖይንት' : 'Your Point Balance'}
            </span>
            <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
              Gold Tier 🇪🇹
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
              {points} Points
            </span>
            <span className="text-sm text-emerald-400 font-bold">
              = {formatPrice(etbValue)} Discount Value
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            Apply points at checkout to deduct ETB directly from your cart total.
          </p>
        </div>

        {/* Referral Program */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-700" />
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
              {lang === 'am' ? 'ጓደኛዎን ይጋብዙ (ETB 200 ያግኙ)' : 'Refer & Earn (Give ETB 200, Get ETB 200)'}
            </h4>
          </div>

          <p className="text-xs text-slate-600 leading-snug">
            Share your unique referral code. When a friend places their first order, you both get <strong>ETB 200</strong> in rewards!
          </p>

          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-emerald-200">
            <span className="font-mono font-bold text-xs text-slate-900 flex-1 px-2 select-all">
              {referralCode}
            </span>
            <button
              onClick={handleCopyReferral}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            >
              {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Gift Card Balance Checker */}
        <form onSubmit={handleCheckGiftCard} className="space-y-2 pt-1">
          <label className="text-xs font-bold text-slate-700 block">
            {lang === 'am' ? 'የስጦታ ካርድ ኮድ ይፈትሹ (Gift Card)' : 'Check Gift Card Balance'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
              placeholder="e.g. MERKATO-GIFT-5000"
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono uppercase text-slate-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Check
            </button>
          </div>

          {giftCardBalance !== null && (
            <p className="text-xs font-bold text-emerald-800 pt-1">
              Available Balance: {formatPrice(giftCardBalance)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

