export const initialProducts = [
  // 1. Phones & Tech
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

  // 2. Ethiopian Traditional Wear
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

  // 3. Ethiopian Specialty Coffee
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
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Whole Bean (ያልተፈጨ)", "Medium Ground (የተፈጨ)"],
    sizes: ["500g Bag", "1kg Bag (Value Pack)", "3kg Family Pack"],
    description: "World-renowned Ethiopian Yirgacheffe Arabica coffee beans with distinct floral jasmine aroma, bergamot citrus notes, and silky smooth body. Freshly roasted in small batches to preserve natural volatile aromatics.",
    descriptionAm: "ዓለም አቀፍ ዝና ያተረፈው የይርጋጨፌ ንጹህ አረቢካ ቡና በልዩ ጣዕም እና መዓዛ የተቆላ። በሙሉ ፍሬ ወይም ተፈጭቶ የሚቀርብ።",
    specs: {
      "Altitude": "1,900 - 2,200 meters above sea level",
      "Processing": "Washed / Sun-dried Arabica",
      "Roast Level": "Medium City Roast",
      "Flavors": "Jasmine, Lemon blossom, Sweet honey"
    },
    reviews: [
      { id: "rev-5", user: "Michael Haile", rating: 5, date: "Yesterday", comment: "Best aroma ever! Fills my entire house every morning. Will order 3kg next time.", verified: true },
      { id: "rev-6", user: "Blen Assefa", rating: 5, date: "5 days ago", comment: "Fresh roast date on the bag, very authentic Sidama/Yirgacheffe taste.", verified: true }
    ]
  },

  // 4. Traditional Jebena Coffee Ceremony Set
  {
    id: "prod-4",
    name: "Handmade Ethiopian Clay Jebena with 6 Sini Cups & Wooden Rekebot",
    nameAm: "የሸክላ ጀበና ከ6 ሲኒዎች እና ከእንጨት ረከቦት ጋር",
    category: "traditional",
    brand: "Merkato Crafts",
    price: 3800,
    originalPrice: 4800,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 78,
    inStock: true,
    stockCount: 24,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: true,
    isEthiopianMade: true,
    sellerId: "seller-1",
    sellerName: "Merkato Shema Terra No. 42",
    images: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Black Clay", "Polished Brown Clay with Traditional Motifs"],
    sizes: ["Standard Family Set (Jebena + 6 Cups + Rekebot)"],
    description: "Complete Ethiopian coffee ceremony set handcrafted from natural fired clay in Wolayta and Merkato. Features the iconic long-neck Jebena (ጀበና), 6 ceramic Sini cups with Ethiopian flag tricolor accents, incense burner (ዕጣን ማጨሻ), and carved wooden Rekebot table.",
    descriptionAm: "ለሙሉ የቡና ማፍላት ስነስርዓት የሚሆን የሸክላ ጀበና፣ 6 ሲኒዎች፣ የዕጣን ማጨሻ እና ውብ የእንጨት ረከቦት።",
    specs: {
      "Included": "1 Clay Jebena + 6 Sini Cups + 1 Etan Burner + 1 Rekebot",
      "Material": "Natural Hand-Fired Terracotta Clay & Solid Pine",
      "Origin": "Merkato Traditional Craft Guild, Ethiopia"
    },
    reviews: [
      { id: "rev-7", user: "Rahel Kassa", rating: 5, date: "4 days ago", comment: "Arrived with very safe foam packaging! None of the cups or the Jebena broke. Beautiful finish.", verified: true }
    ]
  },

  // 5. Gurage Pure Berbere Spice
  {
    id: "prod-5",
    name: "Pure Gurage Organic Berbere Spice Blend 100% Sun-Dried (1kg)",
    nameAm: "የጉራጌ ንጹህ የበርበሬ ድብልቅ (1 ኪሎ ግራም)",
    category: "coffee-spices",
    brand: "Addis Spices",
    price: 1100,
    originalPrice: 1400,
    discountPercent: 21,
    rating: 5.0,
    reviewsCount: 184,
    inStock: true,
    stockCount: 60,
    isFlashDeal: true,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-4",
    sellerName: "Addis Spice & Teff Wholesalers",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Deep Crimson Red"],
    sizes: ["500g", "1kg", "2.5kg Jar", "5kg Wholesale"],
    description: "Premium authentic Gurage / Merkato Berbere made with sun-dried red peppers, Korarima (Ethiopian cardamom), Mekelesha spices, ginger, garlic, and rue. Zero additives or artificial coloring — perfect for rich Doro Wat, Siga Wat, and Shiro.",
    descriptionAm: "100% የተፈጥሮ የጉራጌ በርበሬ ከነኮረሪማው እና መከለሻው በሚገባ የተዘጋጀ። ለዶሮ ወጥ፣ ለስጋ ወጥ እና ለሽሮ ምርጥ ጣዕም ይሰጣል።",
    specs: {
      "Weight": "1.0 Kilogram",
      "Key Ingredients": "Red Pepper, Korarima, Ginger, Garlic, Cloves, Cumin",
      "Purity": "100% Organic, No MSG, No Added Color"
    },
    reviews: [
      { id: "rev-8", user: "Aster Wolde", rating: 5, date: "1 week ago", comment: "The color for Doro Wat is incredible! Smells like my grandmother's kitchen in Butajira.", verified: true }
    ]
  },

  // 6. Magna White Teff Flour
  {
    id: "prod-6",
    name: "Premium Magna Pure White Teff Flour (25kg Sack)",
    nameAm: "የማኛ ንጹህ የነጭ ጤፍ ዱቄት (25 ኪሎ)",
    category: "groceries",
    brand: "Gojjam Harvest",
    price: 6800,
    originalPrice: 7500,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 153,
    inStock: true,
    stockCount: 40,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-4",
    sellerName: "Addis Spice & Teff Wholesalers",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Snow White"],
    sizes: ["25kg Sack", "50kg Bulk Sack"],
    description: "Sourced directly from fertile Gojjam and Ada'a plains. 100% pure iron-rich gluten-free Magna white teff, double-sifted and milled for fluffy, smooth, high-eyeled Injera (የዓይን ማውጣት).",
    descriptionAm: "ከጎጃም እና ከአዳአ እርሻዎች በቀጥታ የመጣ ንጹህ የነጭ ጤፍ ዱቄት። ለሚያምር እና ለስላሳ እንጀራ።",
    specs: {
      "Grade": "Magna Grade 1 (የመጀመሪያ ደረጃ ማኛ)",
      "Origin": "Ada'a / Gojjam, Ethiopia",
      "Weight": "25 KG Heavy Sealed Sack"
    },
    reviews: [
      { id: "rev-9", user: "Genet Tilahun", rating: 5, date: "2 days ago", comment: "The Injera came out with beautiful eyes and zero sour aftertaste. Delivered directly into my kitchen.", verified: true }
    ]
  },

  // 7. Electric Injera Mitad
  {
    id: "prod-7",
    name: "Tefal Pro Digital Electric Injera Mitad with Glass Top Cover (45cm)",
    nameAm: "ዘመናዊ የኤሌክትሪክ እንጀራ ምጣድ ከመስታወት ክዳን ጋር",
    category: "home-kitchen",
    brand: "Tefal",
    price: 14500,
    originalPrice: 17000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    stockCount: 15,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: true,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Mirror Chrome / Black Trim"],
    sizes: ["45cm Standard Diameter"],
    description: "Energy-saving digital Injera baking mitad with precise ceramic heat distribution, non-stick surface coating, insulated cool-touch handles, and tempered steam-vented glass lid. Low power consumption optimized for Ethiopian 220V power grid.",
    descriptionAm: "የኤሌክትሪክ ፍጆታን የሚቆጥብ ዘመናዊ የሴራሚክ እንጀራ ምጣድ። እኩል ሙቀት የሚያሰራጭ እና እንጀራ የማያሳርር።",
    specs: {
      "Power": "1800W Energy Efficient (220V / 50Hz)",
      "Diameter": "45 cm Baking Surface",
      "Features": "Adjustable Thermostat & Steam Vent Lid"
    },
    reviews: [
      { id: "rev-10", user: "Kidist Kebede", rating: 5, date: "6 days ago", comment: "Bakes 20 injeras easily without tripping the fuse. Very solid build quality.", verified: true }
    ]
  },

  // 8. Apple iPhone 15 Pro Max
  {
    id: "prod-8",
    name: "Apple iPhone 15 Pro Max (256GB) Natural Titanium (Factory Unlocked)",
    nameAm: "አፕል አይፎን 15 ፕሮ ማክስ (256GB) ናቹራል ታይታኒየም",
    category: "phones",
    brand: "Apple",
    price: 198000,
    originalPrice: 225000,
    discountPercent: 12,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    stockCount: 9,
    isFlashDeal: true,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Titanium", "Blue Titanium", "Black Titanium"],
    sizes: ["256GB", "512GB", "1TB"],
    description: "Forged in titanium with aerospace-grade alloy, A17 Pro chip, 5x optical zoom camera, customizable Action button, and USB-C speed. Fully factory unlocked and compatible with Ethio Telecom eSIM / physical SIM.",
    descriptionAm: "ከታይታኒየም የተሰራው አይፎን 15 ፕሮ ማክስ በA17 ፕሮ ቺፕ እና በ5x ዙም ካሜራ የታጠቀ። የቴሌኮም ሲም ካርዶችን ያለምንም ችግር ይቀበላል።",
    specs: {
      "Processor": "Apple A17 Pro (3nm)",
      "Display": "6.7-inch Super Retina XDR ProMotion",
      "Camera": "48MP Main + 12MP 5x Telephoto + 12MP Ultra-Wide"
    },
    reviews: [
      { id: "rev-11", user: "Yonas Fikru", rating: 5, date: "3 days ago", comment: "Came in sealed Apple box, IMEI verified on Ethio Telecom network. 100% genuine.", verified: true }
    ]
  },

  // 9. Sony WH-1000XM5 Wireless Headphones
  {
    id: "prod-9",
    name: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    nameAm: "ሶኒ WH-1000XM5 ጫጫታ የሚቀንስ ገመድ አልባ ሄድፎን",
    category: "electronics",
    brand: "Sony",
    price: 48000,
    originalPrice: 55000,
    discountPercent: 13,
    rating: 4.9,
    reviewsCount: 45,
    inStock: true,
    stockCount: 14,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: true,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Midnight Black", "Silver Gray"],
    sizes: ["Standard"],
    description: "Industry-leading noise cancellation with two processors and 8 microphones. Up to 30-hour battery life with quick charging (3 min charge for 3 hrs playback). Ultra-comfortable lightweight design.",
    descriptionAm: "የውጭ ጫጫታን ሙሉ ለሙሉ የሚያጠፋ የሶኒ ሄድፎን። ለ30 ሰዓታት ያለማቋረጥ የሚቆይ ባትሪ ያለው።",
    specs: {
      "Battery Life": "Up to 30 hours (ANC On)",
      "Connectivity": "Bluetooth 5.2 + Multipoint connection",
      "Weight": "250g Ultra-lightweight"
    },
    reviews: [
      { id: "rev-12", user: "Ermias Tesfaye", rating: 5, date: "1 week ago", comment: "Perfect for working in busy cafes around Bole. Total silence!", verified: true }
    ]
  },

  // 10. Traditional Men's Gabi & Netela
  {
    id: "prod-10",
    name: "Authentic Pure Cotton Men's Four-Layer Gabi with Green/Gold Border",
    nameAm: "ባለ 4 ደራብ የጥጥ ጋቢ በአረንጓዴ እና ወርቃማ ጥልፍ",
    category: "traditional",
    brand: "Merkato Weavers",
    price: 7400,
    originalPrice: 9200,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockCount: 30,
    isFlashDeal: false,
    isTrending: true,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-1",
    sellerName: "Merkato Shema Terra No. 42",
    images: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Pure White with Ethiopian Flag Border", "White with Bronze Tilet"],
    sizes: ["Standard Adult (4-Layer Thick)"],
    description: "Handcrafted 4-layer pure woven cotton Gabi (ጋቢ). Heavyweight and deeply warming, perfect for cool Addis Ababa evenings, holiday celebrations, and church ceremonies.",
    descriptionAm: "በእጅ የተሸመነ ባለ 4 ደራብ ንጹህ የሀገር ጥጥ ጋቢ። ለቅዝቃዜ እና ለበዓላት ተመራጭ።",
    specs: {
      "Fabric": "100% Pure Ethiopian Cotton (የሀገር ጥጥ)",
      "Layers": "4 Layers (ባለ አራት ደራብ)",
      "Origin": "Merkato Shema Terra, Addis Ababa"
    },
    reviews: [
      { id: "rev-13", user: "Abebe Kassahun", rating: 5, date: "4 days ago", comment: "Super warm and authentic. My father loved this as an Enkutatash gift.", verified: true }
    ]
  },

  // 11. Ethiopian Natural Koba & Shea Butter Cream
  {
    id: "prod-11",
    name: "Habesha Organic Koba & Shea Butter Herbal Hair & Body Butter (250ml)",
    nameAm: "የሀበሻ ተፈጥሯዊ የኮባ እና የሺያ ቅቤ ለፀጉር እና ለሰውነት",
    category: "beauty",
    brand: "Addis Naturals",
    price: 650,
    originalPrice: 850,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 90,
    isFlashDeal: true,
    isTrending: false,
    isNewArrival: false,
    isEthiopianMade: true,
    sellerId: "seller-4",
    sellerName: "Addis Spice & Teff Wholesalers",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Ivory Butter"],
    sizes: ["250ml Jar", "500ml Family Tub"],
    description: "Infused with traditional Ethiopian false banana (Koba) root extracts, unrefined Shea butter, and rosemary essential oil to deeply moisturize dry skin and strengthen natural curly hair.",
    descriptionAm: "ከተፈጥሮ የኮባ ቅባት እና ከሺያ ቅቤ የተዘጋጀ ለደረቅ ቆዳ እና ለፀጉር እድገት የሚረዳ ልዩ ቅባት።",
    specs: {
      "Volume": "250 ml",
      "Ingredients": "Raw Shea Butter, Koba Extract, Coconut Oil, Vitamin E",
      "Free From": "Parabens, Sulfates, Mineral Oils"
    },
    reviews: [
      { id: "rev-14", user: "Bethlehem Desta", rating: 5, date: "3 days ago", comment: "My curls feel so moisturized! Great natural scent without artificial perfumes.", verified: true }
    ]
  },

  // 12. HP Spectre x360 2-in-1 Laptop
  {
    id: "prod-12",
    name: "HP Spectre x360 14\" OLED Touchscreen (Intel Core Ultra 7 / 32GB RAM / 1TB SSD)",
    nameAm: "ኤችፒ ስፔክተር x360 ባለ 14 ኢንች ኦሌድ ላፕቶፕ (32GB ራም / 1TB)",
    category: "computers",
    brand: "HP",
    price: 195000,
    originalPrice: 220000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 7,
    isFlashDeal: false,
    isTrending: false,
    isNewArrival: true,
    isEthiopianMade: false,
    sellerId: "seller-2",
    sellerName: "Bole Tech Plaza",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Nightfall Black with Pale Brass Accents"],
    sizes: ["Intel Core Ultra 7 / 32GB / 1TB SSD"],
    description: "Flagship 2-in-1 convertible laptop with 2.8K 120Hz OLED touchscreen, AI boost, HP Tilt Pen stylus, backlit keyboard, and 14-hour battery life. Includes original charger and HP carrying sleeve.",
    descriptionAm: "ለስራ እና ለዲዛይን እጅግ ተመራጭ የሆነው ኤችፒ ስፔክተር ላፕቶፕ በ32GB ራም እና በ1TB ኤስኤስዲ የተሟላ።",
    specs: {
      "Processor": "Intel Core Ultra 7 155H (16-Core)",
      "RAM": "32GB LPDDR5x 7467MHz",
      "Display": "14-inch 2.8K (2880 x 1800) OLED 120Hz Touch"
    },
    reviews: [
      { id: "rev-15", user: "Natnael Zeleke", rating: 5, date: "5 days ago", comment: "Blazing fast for programming and 3D rendering. Arrived pristine from Bole Tech.", verified: true }
    ]
  }
];

