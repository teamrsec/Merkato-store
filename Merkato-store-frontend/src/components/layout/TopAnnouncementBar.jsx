import { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, CreditCard, Flame, MapPin, ChevronDown } from 'lucide-react';

export default function TopAnnouncementBar() {
  const { lang, setLang, t, locations, selectedLocation, setSelectedLocation, setCurrentView } = useStore();
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const announcements = [
    { text: t('topAnnouncement1'), icon: Truck, color: 'text-emerald-300' },
    { text: t('topAnnouncement2'), icon: CreditCard, color: 'text-amber-300' },
    { text: t('topAnnouncement3'), icon: Flame, color: 'text-rose-300' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const activeAnnouncement = announcements[currentAnnouncementIndex];
  const IconComponent = activeAnnouncement.icon;

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 relative z-40">
      {/* Subtle Ethiopian tricolor line */}
      <div className="ethiopian-accent-bar"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Dynamic Rotating Announcement */}
        <div className="flex items-center gap-2 overflow-hidden h-5 transition-all">
          <IconComponent className={`w-3.5 h-3.5 ${activeAnnouncement.color} animate-pulse`} />
          <span className="font-medium tracking-wide text-slate-200 truncate">
            {activeAnnouncement.text}
          </span>
        </div>

        {/* Right: Location Selector, Language Toggle, and Quick Links */}
        <div className="flex items-center gap-4 text-slate-300">
          {/* Location Picker */}
          <div className="relative">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors py-0.5 px-2 rounded bg-slate-800/80 border border-slate-700/60 cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] font-medium text-slate-200">
                {lang === 'am' ? selectedLocation.subCityAm : selectedLocation.subCityEn}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLocationDropdownOpen && (
              <div
                className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 z-50 max-h-64 overflow-y-auto"
                onMouseLeave={() => setIsLocationDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  {t('selectLocation')} (Addis Ababa & Regional)
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      selectedLocation.id === loc.id ? 'text-emerald-400 font-semibold bg-emerald-950/40' : 'text-slate-200'
                    }`}
                  >
                    <span>{lang === 'am' ? loc.subCityAm : loc.subCityEn}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {loc.deliveryFee} ETB
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Order Tracking shortcut */}
          <button
            onClick={() => setCurrentView('track')}
            className="hover:text-emerald-400 transition-colors hidden md:inline-flex items-center gap-1 text-[11px]"
          >
            <Truck className="w-3 h-3 text-amber-400" />
            {t('trackOrder')}
          </button>

          {/* Language Switcher Button (EN / አማርኛ) */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded border border-slate-700/60">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('am')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                lang === 'am'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              አማርኛ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

