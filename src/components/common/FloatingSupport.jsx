import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  ExternalLink,
  Bot
} from 'lucide-react';

export default function FloatingSupport() {
  const { lang, isLiveChatOpen, setIsLiveChatOpen } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text:
        lang === 'am'
          ? 'ሰላም! እንኳን ወደ መርካቶ ስቶር የደንበኞች ድጋፍ በደህና መጡ። ስለ እቃዎች፣ የቴሌብር ክፍያ ወይም የበር አደራረስ ምን ማወቅ ይፈልጋሉ?'
          : 'Hello! Welcome to Merkato Store Customer Support. How can we help you today with delivery, Telebirr payment, or seller inquiries?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = inputMessage.toLowerCase();
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      if (currentQuery.includes('telebirr') || currentQuery.includes('ቴሌብር') || currentQuery.includes('payment') || currentQuery.includes('ክፍያ')) {
        reply =
          lang === 'am'
            ? 'በቴሌብር በቀጥታ በQR ኮድ ወይም በስልክ ቁጥርዎ የክፍያ ጥያቄ (USSD Push) በመላክ ወዲያውኑ መክፈል ይችላሉ። ምንም ተጨማሪ ክፍያ አይጠየቅም!'
            : 'You can pay instantly using Telebirr via QR code scan or direct phone push notification. Plus get 5% cashback on special promotional deals!';
      } else if (currentQuery.includes('delivery') || currentQuery.includes('አደራረስ') || currentQuery.includes('ቦሌ') || currentQuery.includes('bole')) {
        reply =
          lang === 'am'
            ? 'በአዲስ አበባ ውስጥ (ቦሌ፣ ቂርቆስ፣ አራዳ፣ የካ፣ ወዘተ) በተመሳሳይ ቀን ከ2-4 ሰዓታት ውስጥ በሞተር ሳይክል እስከ ቤትዎ እናደርሳለን።'
            : 'We offer same-day express delivery across Addis Ababa (Bole, Kirkos, Arada, Yeka, etc.) within 2-4 hours via motorcycle couriers.';
      } else if (currentQuery.includes('seller') || currentQuery.includes('ሻጭ') || currentQuery.includes('መሸጥ')) {
        reply =
          lang === 'am'
            ? 'በመርካቶ ስቶር እቃዎችዎን ለመሸጥ ከላይ "ሻጭ ይሁኑ" የሚለውን በመጫን ሱቅዎን በነጻ መመዝገብ ይችላሉ።'
            : 'To register as a seller, click "Become a Seller" in the top navigation to set up your store and list products in under 2 minutes!';
      } else {
        reply =
          lang === 'am'
            ? 'እናመሰግናለን! ጥያቄዎትን ተቀብለናል። ለፈጣን ምላሽ በቴሌግራም ቻናላችን @MerkatoStoreET ወይም በስልክ መስመር 8899 በቀጥታ ማግኘት ይችላሉ።'
            : 'Thank you for reaching out! You can also connect with our live representative directly on Telegram @MerkatoStoreET or call our toll-free line 8899.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      {/* Trigger Button */}
      {!isLiveChatOpen && (
        <button
          onClick={() => setIsLiveChatOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 text-white rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 transition-all cursor-pointer group border border-emerald-400/30"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
            {lang === 'am' ? 'የደንበኞች ድጋፍ' : 'Need Help? Chat'}
          </span>
        </button>
      )}

      {/* Live Support Window */}
      {isLiveChatOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>Merkato Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </h4>
                <p className="text-[10px] text-emerald-300 font-medium">
                  {lang === 'am' ? 'ፈጣን የኢትዮጵያ ድጋፍ' : '24/7 Ethiopian Support AI'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLiveChatOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Channels Bar */}
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px]">
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sky-700 font-semibold hover:underline"
            >
              <span>Telegram: @MerkatoStoreET</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-slate-400">|</span>
            <span className="text-slate-700 font-medium flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-600" />
              8899
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-1">
                    M
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1 ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-8">
                <span className="animate-pulse">Typing response...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={lang === 'am' ? 'መልእክትዎን እዚህ ይጻፉ...' : 'Ask about Telebirr, delivery, orders...'}
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
