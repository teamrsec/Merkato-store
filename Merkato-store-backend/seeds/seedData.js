const categoriesData = [
  {
    id: "electronics",
    name: "Electronics & Gadgets",
    nameAm: "ኤሌክትሮኒክስ እና መገልገያዎች",
    icon: "Tv",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
    itemCount: 1420,
    featured: true,
    color: "from-blue-500/10 to-indigo-500/20",
    sortOrder: 1
  },
  {
    id: "phones",
    name: "Phones & Accessories",
    nameAm: "ስልኮች እና እቃዎች",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    itemCount: 890,
    featured: true,
    color: "from-emerald-500/10 to-teal-500/20",
    sortOrder: 2
  },
  {
    id: "traditional",
    name: "Habesha Wear & Crafts",
    nameAm: "የሀበሻ ባህል ልብስ እና እደ-ጥበብ",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80",
    itemCount: 650,
    featured: true,
    color: "from-amber-500/10 to-yellow-500/20",
    sortOrder: 3
  },
  {
    id: "coffee-spices",
    name: "Coffee & Ethiopian Spices",
    nameAm: "የሀበሻ ቡና እና ቅመማቅመም",
    icon: "Coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    itemCount: 430,
    featured: true,
    color: "from-orange-500/10 to-amber-500/20",
    sortOrder: 4
  },
  {
    id: "groceries",
    name: "Groceries & Teff",
    nameAm: "የምግብ ሸቀጦች እና ጤፍ",
    icon: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    itemCount: 1120,
    featured: true,
    color: "from-green-500/10 to-emerald-500/20",
    sortOrder: 5
  },
  {
    id: "fashion",
    name: "Modern Fashion & Shoes",
    nameAm: "ዘመናዊ ፋሽን እና ጫማዎች",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
    itemCount: 2340,
    featured: true,
    color: "from-purple-500/10 to-pink-500/20",
    sortOrder: 6
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen Appliances",
    nameAm: "የቤት እና የወጥ ቤት እቃዎች",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    itemCount: 980,
    featured: true,
    color: "from-rose-500/10 to-orange-500/20",
    sortOrder: 7
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    nameAm: "ውበት እና የሰውነት እንክብካቤ",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    itemCount: 560,
    featured: true,
    color: "from-pink-500/10 to-rose-500/20",
    sortOrder: 8
  },
  {
    id: "computers",
    name: "Computers & Laptops",
    nameAm: "ኮምፒውተሮች እና ላፕቶፖች",
    icon: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    itemCount: 340,
    featured: false,
    color: "from-slate-500/10 to-blue-500/20",
    sortOrder: 9
  },
  {
    id: "baby-kids",
    name: "Baby & Kids",
    nameAm: "የህጻናት እና ልጆች",
    icon: "Smile",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    itemCount: 470,
    featured: false,
    color: "from-yellow-500/10 to-amber-500/20",
    sortOrder: 10
  },
  {
    id: "books",
    name: "Books & Stationery",
    nameAm: "መጽሐፍት እና የትምህርት እቃዎች",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    itemCount: 320,
    featured: false,
    color: "from-teal-500/10 to-emerald-500/20",
    sortOrder: 11
  },
  {
    id: "automotive",
    name: "Automotive Accessories",
    nameAm: "የመኪና እቃዎች እና መለዋወጫዎች",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80",
    itemCount: 290,
    featured: false,
    color: "from-neutral-500/10 to-zinc-500/20",
    sortOrder: 12
  }
];

const sellersData = [
  {
    sellerId: "seller-1",
    name: "Merkato Shema Terra No. 42",
    nameAm: "መርካቶ ሸማ ተራ ቁጥር 42",
    logo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    reviewsCount: 382,
    salesCount: 2450,
    location: "Addis Ketema (Merkato), Addis Ababa",
    badge: "Master Artisan 🇪🇹",
    isVerified: true,
    joinedYear: "2023",
    description: "Authentic handwoven Habesha Kemis, Gabi, and traditional Ethiopian festive attires crafted by master weavers in Shiromeda and Merkato.",
    tinNumber: "0029481928",
    telebirrMerchantId: "TB-MERCHANT-8492"
  },
  {
    sellerId: "seller-2",
    name: "Bole Tech Plaza",
    nameAm: "ቦሌ ቴክ ፕላዛ",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    reviewsCount: 520,
    salesCount: 4120,
    location: "Bole Medhanialem, Addis Ababa",
    badge: "Official Electronics Partner",
    isVerified: true,
    joinedYear: "2022",
    description: "Authorized importer of smartphones, laptops, high-performance audio, and original smart gadgets with full 1-year warranty.",
    tinNumber: "0038472910",
    telebirrMerchantId: "TB-MERCHANT-9120"
  },
  {
    sellerId: "seller-3",
    name: "Yirgacheffe Coffee Farmers Union",
    nameAm: "የይርጋጨፌ ገበሬዎች ህብረት ስራ ማህበር",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80",
    rating: 5.0,
    reviewsCount: 610,
    salesCount: 5890,
    location: "Sidama / Addis Ababa Distribution Center",
    badge: "Direct Farmer Cooperative ☕",
    isVerified: true,
    joinedYear: "2021",
    description: "Grade 1 Specialty Arabica green and freshly medium/dark roasted coffee beans directly sourced from smallholder Ethiopian farmers.",
    tinNumber: "0049281729",
    telebirrMerchantId: "TB-MERCHANT-4411"
  },
  {
    sellerId: "seller-4",
    name: "Addis Spice & Teff Wholesalers",
    nameAm: "አዲስ ቅመማቅመም እና ጤፍ ጅምላ አከፋፋይ",
    logo: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    reviewsCount: 290,
    salesCount: 3100,
    location: "Merkato Ehil Berenda, Addis Ababa",
    badge: "Quality Guaranteed",
    isVerified: true,
    joinedYear: "2023",
    description: "Pure Gurage Berbere, Korarima, Shiro blends, and premium Magna White Teff flour milled to perfection.",
    tinNumber: "0058291039",
    telebirrMerchantId: "TB-MERCHANT-7722"
  }
];

const usersData = [
  {
    name: "Amanuel Kebede",
    phone: "+251 911 458920",
    email: "amanuel.kebede@example.com",
    password: "password123",
    role: "buyer",
    subCity: "Bole (ቦሌ)",
    city: "Addis Ababa",
    address: "Near Edna Mall, Addis Ababa",
    points: 450,
    isVerified: true,
    savedAddresses: [
      {
        fullName: "Amanuel Kebede",
        phone: "+251 911 458920",
        city: "Addis Ababa",
        subCity: "Bole (ቦሌ)",
        address: "Bole Medhanialem, Near Edna Mall",
        instructions: "Call upon arrival at the gate",
        isDefault: true
      }
    ]
  },
  {
    name: "Merkato Artisan Seller",
    phone: "+251 912 884433",
    email: "seller@merkatostore.et",
    password: "password123",
    role: "seller",
    sellerId: "seller-1",
    subCity: "Addis Ketema (Merkato)",
    city: "Addis Ababa",
    address: "Shema Terra No. 42",
    points: 1200,
    isVerified: true
  },
  {
    name: "Merkato Store Admin",
    phone: "+251 900 000000",
    email: "admin@merkatostore.et",
    password: "adminpassword123",
    role: "admin",
    subCity: "Bole",
    city: "Addis Ababa",
    address: "Merkato HQ, Bole Road",
    points: 9999,
    isVerified: true
  }
];

const productsData = [
  {
    id: "prod-1",
    name: "Samsung Galaxy S24 Ultra (512GB / 12GB RAM) Titanium Black",
    nameAm: "ሳምሰንግ ጋላክሲ S24 አልትራ (512GB) ታይታኒየም",
    category: "phones",
    brand: "Samsung",
    price: 185000,
    originalPrice: 210000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 18,
    isFlashDeal: true,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Titanium Gray", "Titanium Black", "Titanium Yellow"],
    sizes: ["256GB", "512GB", "1TB"],
    description: "The ultimate Galaxy AI flagship with 200MP camera, built-in S-Pen, Snapdragon 8 Gen 3 for Galaxy, and 7 years of OS upgrades. Includes official 1-year warranty and free screen protector installation in Addis Ababa.",
    descriptionAm: "ዘመናዊው ሳምሰንግ ጋላክሲ S24 አልትራ ስማርት ስልክ በ200 ሜጋፒክስል ካሜራ፣ አብሮት በሚመጣ እስክሪብቶ (S-Pen) እና እጅግ ፈጣን ፕሮሰሰር የታጠቀ። የአንድ አመት ዋስትና ያለው።",
    specs: {
      "Display": "6.8-inch Dynamic AMOLED 2X 120Hz",
      "Camera": "200MP Main + 50MP Periscope + 10MP Telephoto",
      "Battery": "5000 mAh (45W Fast Charge)",
      "Network": "5G Ethio Telecom Ready",
      "Warranty": "1 Year Official Bole Tech Warranty"
    },
    reviews: [
      { id: "rev-1", user: "Dawit Bekele", rating: 5, date: "2 days ago", comment: "Legit original phone! Delivered to Bole Japan in less than 2 hours. Paid with Telebirr smoothly.", verified: true },
      { id: "rev-2", user: "Selamawit Girma", rating: 5, date: "1 week ago", comment: "Amazing camera quality, battery lasts almost 2 full days.", verified: true }
    ]
  },
  {
    id: "prod-2",
    name: "Handwoven Royal Habesha Kemis with Gold Tilet Embroidery",
    nameAm: "በእጅ የተሸመነ የሀበሻ ቀሚስ በወርቃማ ጥልፍ",
    category: "traditional",
    brand: "Merkato Weavers",
    price: 18500,
    originalPrice: 24000,
    discountPercent: 23,
    rating: 5.0,
    reviewsCount: 96,
    inStock: true,
    stockCount: 12,
    isFlashDeal: true,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-1",
    sellerName: "Merkato Shema Terra No. 42",
    images: [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Pure White with Gold Tilet", "Ivory with Red & Green Tilet", "White with Bronze Tilet"],
    sizes: ["S", "M", "L", "XL", "Custom Tailored"],
    description: "100% pure organic Ethiopian cotton (የሀገር ጥጥ) handwoven by master artisans in Shiromeda and Merkato. Features intricate traditional Ethiopian cross and floral gold tilet patterns on sleeves, collar, and hemline. Includes matching lightweight Netela scarf.",
    descriptionAm: "100% ንጹህ የሀገር ጥጥ በእጅ የተሸመነ ውብ የሀበሻ ቀሚስ ከነጠላው ጋር። ለሰርግ፣ ለበዓላት እና ለተለያዩ ልዩ ዝግጅቶች የሚሆን።",
    specs: {
      "Material": "100% Pure Organic Ethiopian Cotton",
      "Craftsmanship": "100% Handwoven & Hand-embroidered",
      "Included": "Dress + Matching Netela (ነጠላ)",
      "Origin": "Shiromeda / Merkato, Addis Ababa"
    },
    reviews: [
      { id: "rev-3", user: "Hellen Mengistu", rating: 5, date: "3 days ago", comment: "The cotton texture is so soft and the gold tilet shines elegantly! Wore it to a family wedding in Kazanchis.", verified: true },
      { id: "rev-4", user: "Tigist Alemu", rating: 5, date: "2 weeks ago", comment: "Perfect fit and arrived neatly packaged with dry cleaning fragrance.", verified: true }
    ]
  },
  {
    id: "prod-3",
    name: "Yirgacheffe Grade 1 Single-Origin Roasted Coffee Beans (500g)",
    nameAm: "የይርጋጨፌ ግሬድ 1 የተቆላ የቡና ፍሬ (500 ግራም)",
    category: "coffee-spices",
    brand: "Yirgacheffe Union",
    price: 950,
    originalPrice: 1200,
    discountPercent: 21,
    rating: 4.9,
    reviewsCount: 210,
    inStock: true,
    stockCount: 85,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-3",
    sellerName: "Yirgacheffe Coffee Farmers Union",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Medium Roast (መካከለኛ የተቆላ)", "Dark Roast (በደንብ የተቆላ)"],
    sizes: ["250g", "500g", "1kg Bag"],
    description: "Sourced directly from certified smallholder washing stations in Gedeo, Yirgacheffe. High-altitude heirloom arabica bursting with floral jasmine aroma, bergamot citrus notes, and silky wine-like acidity.",
    descriptionAm: "ከይርጋጨፌ ገበሬዎች ህብረት በቀጥታ የመጣ ግሬድ 1 የተቆላ የቡና ፍሬ። ለቤት ውስጥ እና ለቢሮ የቡና ዝግጅት ምርጥ መዓዛ ያለው።",
    specs: {
      "Grade": "Grade 1 Specialty Arabica",
      "Process": "Washed & Sun-Dried on Raised Beds",
      "Altitude": "1,900 - 2,200m",
      "Roast Date": "Fresh Weekly Batch in Addis Ababa"
    },
    reviews: [
      { id: "rev-5", user: "Michael Tadesse", rating: 5, date: "Yesterday", comment: "The jasmine floral aroma fills the entire house during morning Jebena brewing!", verified: true }
    ]
  },
  {
    id: "prod-4",
    name: "Apple iPhone 15 Pro (256GB Natural Titanium) Factory Unlocked",
    nameAm: "አፕል አይፎን 15 ፕሮ (256GB) ናቹራል ታይታኒየም",
    category: "phones",
    brand: "Apple",
    price: 178000,
    originalPrice: 195000,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    stockCount: 14,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    description: "Aerospace-grade titanium design with A17 Pro chip, Action button, USB-C 3 speeds, and 48MP Pro camera system with 3x optical zoom. Includes original sealed Apple box.",
    descriptionAm: "ዘመናዊው አይፎን 15 ፕሮ ስማርት ስልክ በታይታኒየም አካል፣ በፈጣን A17 ፕሮ ቺፕ እና በላቀ የካሜራ ጥራት የተዘጋጀ።",
    specs: {
      "Chip": "A17 Pro Bionic chip",
      "Display": "6.1-inch Super Retina XDR with ProMotion 120Hz",
      "SIM": "Physical Nano-SIM + eSIM Dual SIM",
      "Port": "USB-C (up to 10Gb/s)"
    },
    reviews: [
      { id: "rev-6", user: "Robel Assefa", rating: 5, date: "4 days ago", comment: "Original sealed box checked via Apple IMEI checker. Fast delivery to CMC.", verified: true }
    ]
  },
  {
    id: "prod-5",
    name: "Pure Gurage Organic Berbere Spice Blend 100% Sun-Dried (1kg)",
    nameAm: "የጉራጌ ንጹህ የበርበሬ ድብልቅ (1 ኪሎ ግራም)",
    category: "coffee-spices",
    brand: "Merkato Spice Mill",
    price: 1100,
    originalPrice: 1400,
    discountPercent: 21,
    rating: 5.0,
    reviewsCount: 178,
    inStock: true,
    stockCount: 120,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-4",
    sellerName: "Addis Spice & Teff Wholesalers",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Medium Spicy (መካከለኛ ቃሪያ)", "Rich Red Spicy (ደማቅ ቀይ ቃሪያ)"],
    sizes: ["500g", "1kg", "2kg Family Pack", "5kg Wholesale Bucket"],
    description: "Prepared using traditional ancestral recipes with 16 indigenous aromatic spices including Korarima, Tikur Azmud, Nech Azmud, Garlic, and Ginger. Stone-milled at Merkato Ehil Berenda.",
    descriptionAm: "ለዶሮ ወጥ፣ ለስጋ ወጥ እና ለተለያዩ የሀበሻ ምግቦች ልዩ ጣዕም እና ደማቅ ቀለም የሚሰጥ ንጹህ የጉራጌ በርበሬ።",
    specs: {
      "Ingredients": "Red Pepper, Korarima, Black Cumin, Garlic, Ginger, Sacred Basil (Besobila)",
      "Purity": "100% Organic, Zero Artificial Colors, Sun-Dried",
      "Packaging": "Airtight Resealable Food-grade Pouch"
    },
    reviews: [
      { id: "rev-7", user: "Almaz Kassa", rating: 5, date: "1 week ago", comment: "Made Doro Wat for holiday and the color was vibrant deep red. Very clean!", verified: true }
    ]
  },
  {
    id: "prod-6",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones Silver",
    nameAm: "ሶኒ WH-1000XM5 ገመድ አልባ ጫጫታ የሚቀንስ ሄድፎን",
    category: "electronics",
    brand: "Sony",
    price: 49500,
    originalPrice: 58000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    stockCount: 9,
    isFlashDeal: true,
    isTrending: true,
    isNewArrival: true,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Platinum Silver", "Midnight Black"],
    sizes: ["One Size Adjustable"],
    description: "Industry-leading noise cancellation with 8 microphones and Auto NC Optimizer. Up to 30-hour battery life with quick charging (3 mins for 3 hours of playback).",
    descriptionAm: "ምርጥ የድምፅ ጥራት እና የውጭ ጫጫታን ሙሉ በሙሉ የመቀነስ አቅም ያለው የሶኒ ሄድፎን። 30 ሰአታት የሚቆይ ባትሪ ያለው።",
    specs: {
      "Driver": "30mm Precision Engineered Driver",
      "Battery Life": "30 Hours with ANC ON (40 Hours ANC OFF)",
      "Bluetooth": "v5.2 with LDAC High-Res Audio",
      "Warranty": "1 Year Replacement Warranty"
    },
    reviews: [
      { id: "rev-8", user: "Natnael D.", rating: 5, date: "3 weeks ago", comment: "Best ANC for working in noisy cafes around Bole. Delivered swiftly.", verified: true }
    ]
  },
  {
    id: "prod-7",
    name: "Handcrafted Ethiopian Traditional Clay Jebena with Sini Cups Set",
    nameAm: "በእጅ የተሰራ የሸክላ ጀበና ከሲኒዎች ማቅረቢያ ጋር",
    category: "traditional",
    brand: "Addis Pottery Works",
    price: 3800,
    originalPrice: 4800,
    discountPercent: 21,
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    stockCount: 25,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-1",
    sellerName: "Merkato Shema Terra No. 42",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Traditional Black Smoked Clay", "Decorated Golden Painted Clay"],
    sizes: ["Standard Family Size (6 Cups)", "Large Ceremony Size (12 Cups)"],
    description: "Traditional Ethiopian coffee ceremony set made from high-fire natural clay. Includes authentic smoke-glazed Jebena coffee pot, clay Rekebot stand, and 6 matching ceramic Sini cups with ornate Ethiopian cross patterns.",
    descriptionAm: "ለባህላዊ የቡና ማፍላት ስነ-ስርዓት የሚሆን በእጅ የተሰራ የሸክላ ጀበና እና 6 ውብ የሲኒ ስብስቦች።",
    specs: {
      "Included Pieces": "1 Clay Jebena + 1 Mat + 6 Sini Cups + 1 Incense Burner (ዕጣን ማጨሻ)",
      "Material": "100% Natural Ethiopian Clay (የሸክላ አፈር)",
      "Safe Packaging": "Custom foam padded wooden box for zero-breakage transport"
    },
    reviews: [
      { id: "rev-9", user: "Bethlehem Shiferaw", rating: 5, date: "5 days ago", comment: "Arrived in Bole without a single scratch! The clay flavor makes coffee taste 10x better.", verified: true }
    ]
  },
  {
    id: "prod-8",
    name: "Premium Magna White Teff Flour Double Milled Export Grade (25kg)",
    nameAm: "ምርጥ የማኛ ነጭ ጤፍ ዱቄት (25 ኪሎ ግራም)",
    category: "groceries",
    brand: "Gojjam Teff Union",
    price: 5200,
    originalPrice: 6000,
    discountPercent: 13,
    rating: 5.0,
    reviewsCount: 310,
    inStock: true,
    stockCount: 60,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-4",
    sellerName: "Addis Spice & Teff Wholesalers",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Pure Magna White (ንጹህ ማኛ ነጭ)"],
    sizes: ["10kg Bag", "25kg Sack", "50kg Bulk Sack"],
    description: "Authentic 100% Gojjam Magna Teff cleaned with modern optical sorters and stone-ground to ultra-fine consistency. Makes spongy, soft, naturally gluten-free Injera with beautiful eyes (አይነ-ስጋ).",
    descriptionAm: "ከጎጃም በቀጥታ የመጣ ንጹህ የማኛ ጤፍ። ዓይናማ እና ለስላሳ እንጀራ የሚወጣው።",
    specs: {
      "Origin": "East Gojjam, Amhara Region",
      "Grain Type": "100% Pure Magna White Teff (Gluten-Free)",
      "Milling": "Double Stone Ground, Sifted & Pre-cleaned"
    },
    reviews: [
      { id: "rev-10", user: "Marta Haile", rating: 5, date: "2 weeks ago", comment: "The Injera came out with perfect eyes and remained soft for 4 days.", verified: true }
    ]
  },
  {
    id: "prod-9",
    name: "Apple MacBook Pro 14-inch M3 Pro (18GB / 512GB) Space Black",
    nameAm: "አፕል ማክቡክ ፕሮ 14 ኢንች M3 ፕሮ (18GB/512GB) ስፔስ ብላክ",
    category: "computers",
    brand: "Apple",
    price: 320000,
    originalPrice: 350000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 41,
    inStock: true,
    stockCount: 6,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: true,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Space Black", "Silver"],
    sizes: ["512GB SSD", "1TB SSD"],
    description: "Liquid Retina XDR display, up to 18 hours of battery life, hardware-accelerated ray tracing, 3 Thunderbolt 4 ports, HDMI port, SDXC card slot, and MagSafe 3 charging.",
    descriptionAm: "እጅግ ፈጣኑ የአፕል ላፕቶፕ በM3 ፕሮ ቺፕ የታጠቀ። ለቪዲዮ ኤዲቲንግ፣ ለሶፍትዌር ኢንጂነሪንግ እና ለከባድ ስራዎች ተመራጭ።",
    specs: {
      "Processor": "Apple M3 Pro (11-core CPU, 14-core GPU)",
      "Memory": "18GB Unified Memory",
      "Display": "14.2-inch Liquid Retina XDR (3024x1964) 120Hz ProMotion",
      "Battery": "Up to 18 hours video playback"
    },
    reviews: [
      { id: "rev-11", user: "Yonas K.", rating: 5, date: "1 month ago", comment: "Unbeatable rendering speeds and thermals. Delivered in original sealed carton.", verified: true }
    ]
  },
  {
    id: "prod-10",
    name: "Royal Oromia Hand-Carved Wooden Gabi Stool (በርጩማ) Decor",
    nameAm: "በእጅ የተቀረጸ የኦሮሞ ባህላዊ የእንጨት በርጩማ",
    category: "traditional",
    brand: "Sheger Carvers",
    price: 6400,
    originalPrice: 8200,
    discountPercent: 22,
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    stockCount: 16,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-1",
    sellerName: "Merkato Shema Terra No. 42",
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Dark Wanza Wood", "Polished Honey Acacia"],
    sizes: ["Small (30cm)", "Medium (45cm)", "Large (60cm)"],
    description: "Carved from a single solid trunk of indigenous Ethiopian Wanza (Cordia africana) hardwood. Features traditional geometric Oromo and Sidama motifs. Perfect as a coffee table stool or decorative cultural piece.",
    descriptionAm: "ከጠንካራ የዋንዛ እንጨት ከአንድ ግንድ ተፈልፍሎ በእጅ የተቀረጸ ውብ የባህል በርጩማ።",
    specs: {
      "Wood Type": "100% Solid Ethiopian Wanza Hardwood",
      "Craft": "Single-block Carving (No Nails/Glues)",
      "Weight": "Approx. 4.8 kg"
    },
    reviews: [
      { id: "rev-12", user: "Tadesse W.", rating: 5, date: "2 weeks ago", comment: "Looks magnificent in our living room next to the coffee corner.", verified: true }
    ]
  },
  {
    id: "prod-11",
    name: "Samsung 65-inch Crystal UHD 4K Smart TV CU8000 Series",
    nameAm: "ሳምሰንግ 65 ኢንች ክሪስታል 4K ስማርት ቴሌቪዥን",
    category: "electronics",
    brand: "Samsung",
    price: 118000,
    originalPrice: 135000,
    discountPercent: 13,
    rating: 4.7,
    reviewsCount: 76,
    inStock: true,
    stockCount: 8,
    isFlashDeal: true,
    isTrending: false,
    isNewArrival: false,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Titan Black Slim Design"],
    sizes: ["55-inch", "65-inch", "75-inch"],
    description: "Dynamic Crystal Color with over a billion shades, AirSlim design, Crystal Processor 4K upscaling, SolarCell Remote, and built-in Smart Hub with YouTube, Netflix, and DSTV Stream apps.",
    descriptionAm: "ጥራት ያለው ምስል የሚያሳይ 65 ኢንች ሳምሰንግ 4K ስማርት ቲቪ። የዩቲዩብ እና የኔትፍሊክስ አፕሊኬሽኖች የተጫኑበት።",
    specs: {
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Audio": "20W 2CH with Object Tracking Sound Lite",
      "Connectivity": "3x HDMI, 2x USB, Wi-Fi 5, Bluetooth 5.2",
      "Warranty": "1 Year Bole Tech Warranty"
    },
    reviews: [
      { id: "rev-13", user: "Kidus Melaku", rating: 5, date: "3 weeks ago", comment: "Free wall mounting and installation done within 3 hours in Kazanchis!", verified: true }
    ]
  },
  {
    id: "prod-12",
    name: "Organic Raw Sidama Wild Forest Honey Unpasteurized (1kg Jar)",
    nameAm: "የሲዳማ የተፈጥሮ የጫካ ንጹህ ማር (1 ኪሎ ግራም)",
    category: "groceries",
    brand: "Habesha Apiaries",
    price: 1450,
    originalPrice: 1800,
    discountPercent: 19,
    rating: 5.0,
    reviewsCount: 145,
    inStock: true,
    stockCount: 45,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: true,
    isEthiopianMade: true,
    sellerId: "seller-3",
    sellerName: "Yirgacheffe Coffee Farmers Union",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Golden Amber Raw", "White Tigray Highland Honey"],
    sizes: ["500g Jar", "1kg Glass Jar", "3kg Bulk Tub"],
    description: "Harvested by traditional beekeepers in the pristine high-altitude rainforests of Kaffa and Sidama. Unfiltered, unheated, retaining natural enzymes, bee pollen, and propolis.",
    descriptionAm: "ከሲዳማ የተፈጥሮ ጫካዎች በቀጥታ የተሰበሰበ ያልተበረዘ ንጹህ የተፈጥሮ ማር። ለመድሃኒትነት እና ለጤና ተመራጭ።",
    specs: {
      "Type": "100% Raw Wild Forest Flower Honey",
      "Purity": "Zero added sugar or heat processing",
      "Origin": "Sidama & Kaffa Biosphere Reserves"
    },
    reviews: [
      { id: "rev-14", user: "Helen Tesfaye", rating: 5, date: "6 days ago", comment: "Rich thick aroma and great natural crystallisation. 100% genuine.", verified: true }
    ]
  },
  {
    id: "prod-13",
    name: "Classic Ethiopian Handwoven Men's Cotton Gabi & Netela Set",
    nameAm: "በእጅ የተሸመነ የባህል የወንዶች ጋቢ እና ነጠላ",
    category: "traditional",
    brand: "Merkato Weavers",
    price: 9200,
    originalPrice: 11500,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 68,
    inStock: true,
    stockCount: 22,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: true,
    isEthiopianMade: true,
    sellerId: "seller-1",
    sellerName: "Merkato Shema Terra No. 42",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["White with Blue & Red Border", "White with Gold Tilet", "Ivory White"],
    sizes: ["Standard 4-Layer Heavy (ድርብ ጋቢ)", "Lightweight 2-Layer"],
    description: "Four-layered heavyweight handwoven pure cotton Gabi providing exceptional warmth during Addis Ababa cold evenings and church ceremonies. Soft, breathable, and durable.",
    descriptionAm: "ለብርድ እና ለተለያዩ ክብረ በዓላት የሚሆን በእጅ የተሸመነ ባለ 4 ድርብ ወፍራም የሀገር ጥጥ ጋቢ።",
    specs: {
      "Material": "100% Fine Ethiopian Cotton",
      "Layers": "4-Layer Traditional Weaving (ድርብ)",
      "Origin": "Shiromeda Artisans Cooperative"
    },
    reviews: [
      { id: "rev-15", user: "Samuel Girma", rating: 5, date: "1 week ago", comment: "Warm and authentic cotton feel. Bought as a gift for my father.", verified: true }
    ]
  },
  {
    id: "prod-14",
    name: "NutriBullet Pro 900W High-Speed Personal Nutrient Extractor Blender",
    nameAm: "ኒውትሪቡሌት ፕሮ 900 ዋት ፈጣን የጁስ እና የፍራፍሬ መፍጫ",
    category: "home-kitchen",
    brand: "NutriBullet",
    price: 16500,
    originalPrice: 19800,
    discountPercent: 17,
    rating: 4.8,
    reviewsCount: 59,
    inStock: true,
    stockCount: 15,
    isFlashDeal: true,
    isTrending: false,
    isNewArrival: false,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Matte Charcoal", "Champagne Gold"],
    sizes: ["900 Watt (9-Piece Set)"],
    description: "900-watt motor breaks down tough fruits, vegetables, nuts, and seeds. Includes 2 colossal cups, 2 to-go lids, extractor blade, and recipe guide. 220V Ethiopian socket plug compatible.",
    descriptionAm: "ፈጣን እና ኃይለኛ የፍራፍሬ መፍጫ በ900 ዋት ሞተር። ለስላሳ እና ጤናማ ጁስ ለማዘጋጀት ተመራጭ።",
    specs: {
      "Power": "900 Watts (220-240V / 50-60Hz compatible with Ethiopian power grid)",
      "Blades": "Stainless Steel Extractor Blade",
      "Capacity": "900ml + 700ml BPA-free Cups",
      "Warranty": "1 Year Bole Tech Warranty"
    },
    reviews: [
      { id: "rev-16", user: "Tigist M.", rating: 5, date: "2 weeks ago", comment: "Effortlessly blends hard avocado and flax seeds. Fast shipping.", verified: true }
    ]
  }
];

const sampleOrdersData = [
  {
    id: "ETH-84920",
    items: [
      {
        id: "prod-3",
        name: "Yirgacheffe Grade 1 Single-Origin Roasted Coffee Beans (500g)",
        nameAm: "የይርጋጨፌ ግሬድ 1 የተቆላ የቡና ፍሬ (500 ግራም)",
        price: 950,
        originalPrice: 1200,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
        category: "coffee-spices",
        brand: "Yirgacheffe Union",
        sellerName: "Yirgacheffe Coffee Farmers Union",
        selectedVariant: "Whole Bean (ያልተፈጨ)"
      },
      {
        id: "prod-5",
        name: "Pure Gurage Organic Berbere Spice Blend 100% Sun-Dried (1kg)",
        nameAm: "የጉራጌ ንጹህ የበርበሬ ድብልቅ (1 ኪሎ ግራም)",
        price: 1100,
        originalPrice: 1400,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
        category: "coffee-spices",
        brand: "Merkato Spice Mill",
        sellerName: "Addis Spice & Teff Wholesalers",
        selectedVariant: "1kg"
      }
    ],
    subtotal: 3000,
    deliveryFee: 150,
    discount: 300,
    total: 2850,
    paymentMethod: "telebirr",
    paymentStatus: "Paid via Telebirr (TXN: TB-938210)",
    deliveryAddress: {
      fullName: "Amanuel Kebede",
      phone: "+251 911 458920",
      city: "Addis Ababa",
      subCity: "Bole (ቦሌ)",
      address: "Bole Medhanialem, Near Edna Mall",
      instructions: "Call upon arrival at the gate"
    },
    status: "out_for_delivery",
    courier: {
      name: "Yared Tadesse",
      phone: "+251 912 884433",
      vehicle: "Motorcycle (Plate: AA-3-4920)",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    timeline: [
      { status: "order_placed", label: "Order Placed", time: "Yesterday 10:30 AM", completed: true },
      { status: "payment_confirmed", label: "Payment Confirmed (Telebirr)", time: "Yesterday 10:31 AM", completed: true },
      { status: "preparing", label: "Packed at Merkato Central Hub", time: "Yesterday 02:15 PM", completed: true },
      { status: "shipped", label: "Handed to Motorcycle Courier", time: "Today 08:30 AM", completed: true },
      { status: "out_for_delivery", label: "Out for Delivery (in Bole area)", time: "Today 11:45 AM", completed: true },
      { status: "delivered", label: "Delivered", time: "Expected by 02:00 PM", completed: false }
    ]
  }
];

module.exports = {
  categoriesData,
  sellersData,
  usersData,
  productsData,
  sampleOrdersData
};
