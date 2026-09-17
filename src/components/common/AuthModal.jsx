import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Phone,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  
  
  CheckCircle2,
  Store,
  UserCheck
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    lang,
    locations,
    addToast
  } = useStore();

  // Sign In fields
  const [signInIdentifier, setSignInIdentifier] = useState('0911458920');
  const [signInPassword, setSignInPassword] = useState('123456');

  // Sign Up fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpSubCity, setSignUpSubCity] = useState('bole');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole] = useState('buyer'); // 'buyer' | 'seller'

  // OTP Verification state
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  if (!isAuthModalOpen) return null;

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInIdentifier.trim()) {
      addToast('Please enter your phone number or email', 'error');
      return;
    }

    // Determine name from identifier or default
    const formattedUser = {
      name: signInIdentifier.includes('amanuel') || signInIdentifier.includes('0911') ? 'Amanuel Kebede' : 'Merkato Customer',
      phone: signInIdentifier.startsWith('+251') || signInIdentifier.startsWith('09') ? signInIdentifier : '+251 911 458920',
      email: signInIdentifier.includes('@') ? signInIdentifier : 'customer@merkatostore.et',
      subCity: 'Bole (ቦሌ)',
      address: 'Addis Ababa, Ethiopia',
      role: 'buyer',
      isLoggedIn: true,
      points: 450
    };

    login(formattedUser);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpPhone.trim()) {
      addToast('Please enter your full name and phone number', 'error');
      return;
    }

    const newUser = {
      name: signUpName,
      phone: signUpPhone.startsWith('+251') || signUpPhone.startsWith('09') ? signUpPhone : `+251 ${signUpPhone}`,
      email: signUpEmail || `${signUpName.toLowerCase().replace(/\s+/g, '')}@merkatostore.et`,
      subCity: locations.find((l) => l.id === signUpSubCity)?.[lang === 'am' ? 'subCityAm' : 'subCityEn'] || 'Bole',
      address: 'Addis Ababa, Ethiopia',
      role: signUpRole,
      isLoggedIn: true,
      points: 100 // Welcome reward points
    };

    setPendingUser(newUser);
    setIsOtpStep(true);
    addToast(`SMS verification code sent to ${newUser.phone}! (Use code: 1234)`, 'info');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (pendingUser) {
      register(pendingUser);
      setIsOtpStep(false);
      setPendingUser(null);
    }
  };

  // Quick Demo Logins
  const handleQuickDemoLogin = (type) => {
    if (type === 'shopper') {
      login({
        name: 'Amanuel Kebede',
        phone: '+251 911 458920',
        email: 'amanuel.kebede@example.com',
        subCity: 'Bole (ቦሌ)',
        address: 'Bole Medhanialem, Near Edna Mall',
        role: 'buyer',
        isLoggedIn: true,
        points: 450
      });
    } else if (type === 'seller') {
      login({
        name: 'Selamawit Craft Store',
        phone: '+251 912 884433',
        email: 'selamawit.crafts@merkatostore.et',
        subCity: 'Addis Ketema (Merkato)',
        address: 'Merkato Shema Terra No. 42',
        role: 'seller',
        isLoggedIn: true,
        points: 1200
      });
    } else if (type === 'admin') {
      login({
        name: 'Merkato Admin Team',
        phone: '+251 900 001122',
        email: 'admin@merkatostore.et',
        subCity: 'Kirkos (ካዛንቺስ)',
        address: 'Merkato Tech HQ, Kazanchis',
        role: 'admin',
        isLoggedIn: true,
        points: 9999
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'am' ? 'እንኳን ወደ መርካቶ ስቶር በደህና መጡ' : 'Welcome to Merkato Store'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'am'
              ? 'በኢትዮጵያ ስልክ ቁጥርዎ ወይም በኢሜይል በቀላሉ ይግቡ ወይም ይመዝገቡ'
              : 'Ethiopia\'s premier marketplace for fast delivery and secure payments.'}
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Sign Up) */}
        {!isOtpStep && (
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200">
            <button
              onClick={() => setAuthModalMode('signin')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authModalMode === 'signin'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'am' ? 'ይግቡ (Sign In)' : 'Sign In'}
            </button>
            <button
              onClick={() => setAuthModalMode('signup')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authModalMode === 'signup'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'am' ? 'አዲስ መለያ ይፍጠሩ (Sign Up)' : 'Create Account'}
            </button>
          </div>
        )}

        {/* OTP STEP */}
        {isOtpStep ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                SMS OTP Sent to {pendingUser?.phone}
              </span>
              <p className="text-slate-600">
                Please enter the 4-digit code to verify your phone number (Sample code: <strong>1234</strong>).
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {lang === 'am' ? 'የማረጋገጫ ኮድ (4 አሃዝ)' : '4-Digit Verification Code'}
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="1 2 3 4"
                maxLength={4}
                className="w-full text-center tracking-widest text-xl font-mono font-bold px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{lang === 'am' ? 'አረጋግጥ እና መለያ ፍጠር' : 'Verify & Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsOtpStep(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              {lang === 'am' ? 'ወደ ኋላ ተመለስ' : '← Back to Details'}
            </button>
          </form>
        ) : authModalMode === 'signin' ? (
          /* SIGN IN FORM */
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {lang === 'am' ? 'የስልክ ቁጥር ወይም ኢሜይል' : 'Phone Number or Email'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  placeholder="0911 23 45 67 or email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-mono"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'am' ? 'የይለፍ ቃል' : 'Password / PIN'}
                </label>
                <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer">
                  {lang === 'am' ? 'ረሱት?' : 'Forgot?'}
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{lang === 'am' ? 'ግባ' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'am' ? 'ሙሉ ስም' : 'Full Name'} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. Bethlehem Tadesse"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'am' ? 'የስልክ ቁጥር' : 'Ethiopian Phone'} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    placeholder="0911 234567"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'am' ? 'ክፍለ ከተማ' : 'Sub-City'}
                </label>
                <select
                  value={signUpSubCity}
                  onChange={(e) => setSignUpSubCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {lang === 'am' ? l.subCityAm : l.subCityEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'am' ? 'ኢሜይል (አማራጭ)' : 'Email Address (Optional)'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'am' ? 'የይለፍ ቃል ፍጠር' : 'Create Password'} *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              <span>{lang === 'am' ? 'ይመዝገቡ እና ይቀጥሉ' : 'Create Account & Get 100 Pts'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Quick Demo Test Accounts Bar */}
        {!isOtpStep && (
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2.5">
              ⚡ {lang === 'am' ? 'ፈጣን የሙከራ መለያዎች' : 'Quick Demo Test Accounts (1-Click)'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('shopper')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Shopper (Amanuel)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('seller')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span>Merchant (Selamawit)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-800 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Admin Ops</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
