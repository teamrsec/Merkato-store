import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function CustomerReviews() {
  const { lang } = useStore();

  const reviews = [
    {
      id: 1,
      name: 'Yared Mamo',
      location: 'Bole Medhanialem, Addis Ababa',
      role: 'Tech Enthusiast',
      rating: 5,
      comment:
        lang === 'am'
          ? 'ሳምሰንግ ጋላክሲ S24 አልትራ አዝዤ በ2 ሰዓት ውስጥ በሞተር ደረሰኝ። በቴሌብር በቀጥታ ከፍዬ ወዲያውኑ መልእክት ደረሰኝ። እጅግ ፈጣን አገልግሎት!'
          : 'Ordered a Samsung Galaxy S24 Ultra and it reached my office in Bole in under 2 hours. Paid with Telebirr seamlessly. Truly revolutionary for Ethiopia!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      itemPurchased: 'Samsung Galaxy S24 Ultra'
    },
    {
      id: 2,
      name: 'Frehiwot Bekele',
      location: 'Kazanchis, Addis Ababa',
      role: 'Bride / Designer',
      rating: 5,
      comment:
        lang === 'am'
          ? 'ለሰርጌ ያዘዝኩት የወርቅ ጥልፍ የሀበሻ ቀሚስ የጥጥ ጥራቱ እና የጥልፉ አሰራር እጅግ በጣም ያምራል። ሻጩ በስልክ አረጋግጦልኝ በሰዓቱ አደረሰኝ።'
          : 'The handwoven gold tilet Habesha Kemis I ordered for my wedding was breathtaking. The cotton is pure organic and the tailoring was flawless.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      itemPurchased: 'Royal Habesha Kemis'
    },
    {
      id: 3,
      name: 'Abel Teshome',
      location: 'Hawassa City Center',
      role: 'Coffee Roaster & Cafe Owner',
      rating: 5,
      comment:
        lang === 'am'
          ? 'የይርጋጨፌ ግሬድ 1 ቡና ፍሬ እና የጉራጌ በርበሬ ወደ ሀዋሳ በ2 ቀን ውስጥ በሰላም ደረሰኝ። እሽጉ ጥራት ያለው እና ንጹህ ነው።'
          : 'Ordered 5kg of Yirgacheffe Grade 1 coffee and pure Gurage Berbere. Arrived safely in Hawassa via regional transport in fresh airtight packaging.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      itemPurchased: 'Yirgacheffe Coffee & Berbere'
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {lang === 'am' ? 'የገዢዎች ምስክርነት' : 'VERIFIED SHOPPER EXPERIENCES'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {lang === 'am' ? 'ደንበኞቻችን ምን ይላሉ?' : 'Loved by Shoppers Across Ethiopia'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            {lang === 'am'
              ? 'በሺዎች የሚቆጠሩ ኢትዮጵያውያን በመርካቶ ስቶር በየቀኑ በደስታ ይገበያያሉ።'
              : 'Join over 45,000+ satisfied Ethiopian customers shopping with speed and trust.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{rev.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

