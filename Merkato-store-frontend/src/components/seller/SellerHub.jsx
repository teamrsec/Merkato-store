import { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Store,
  Plus,
  TrendingUp,
  Package,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Image,
  Upload,
  Tag,
  Star,
  Sparkles,
  ArrowDownToLine,
  MessageSquare,
  Edit,
  Save,
  Send
} from 'lucide-react';

export default function SellerHub() {
  const {
    products,
    setProducts,
    addSellerProduct,
    categories,
    t,
    formatPrice,
    addToast
  } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeSellerTab, setActiveSellerTab] = useState('products'); // 'products', 'inventory', 'messages', 'payouts', 'profile'

  // New Product Form state
  const [newTitle, setNewTitle] = useState('');
  const [newTitleAm, setNewTitleAm] = useState('');
  const [newCategory, setNewCategory] = useState('traditional');
  const [newBrand, setNewBrand] = useState('Merkato Artisans');
  const [newPrice, setNewPrice] = useState('');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newStock, setNewStock] = useState('20');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80');
  const [newDescription, setNewDescription] = useState('');
  const [isFeaturedDeal, setIsFeaturedDeal] = useState(false);

  // Store Profile State
  const [storeName, setStoreName] = useState('Merkato Shema Terra No. 42');
  const [shopLocation, setShopLocation] = useState('Addis Ketema (Merkato), Addis Ababa');
  const [storeBio, setStoreBio] = useState('Handwoven authentic traditional Habesha wear crafted with pure Ethiopian cotton.');
  const [tinNumber, setTinNumber] = useState('0029481928');
  const [telebirrMerchantId, setTelebirrMerchantId] = useState('TB-MERCHANT-8492');

  // Payout State
  const [payoutAmount, setPayoutAmount] = useState('50000');
  const [payoutMethod, setPayoutMethod] = useState('telebirr');

  // Customer Inquiries State
  const [customerInquiries, setCustomerInquiries] = useState([
    {
      id: 'inq-1',
      customerName: 'Rahel Desta',
      phone: '+251 911 234567',
      productName: 'Royal Silk Habesha Kemis',
      question: 'Is size Medium available for same-day delivery to Bole?',
      reply: 'Yes! We have it in stock and can dispatch via motorcycle today.',
      date: '2 hours ago',
      answered: true
    },
    {
      id: 'inq-2',
      customerName: 'Yonas Mekonnen',
      phone: '+251 922 887766',
      productName: 'Yirgacheffe Grade 1 Coffee',
      question: 'Is this roasted recently? What is the harvest date?',
      reply: '',
      date: '30 mins ago',
      answered: false
    }
  ]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Editing state for inline catalog edit
  const [editingProductId, setEditingProductId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // Sample quick image presets
  const sampleImagePresets = [
    { label: 'Habesha Dress', url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80' },
    { label: 'Coffee Beans', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
    { label: 'Handicraft', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
    { label: 'Spices / Berbere', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80' }
  ];

  const calculatedDiscount = newPrice && newOriginalPrice && Number(newOriginalPrice) > Number(newPrice)
    ? Math.round(((Number(newOriginalPrice) - Number(newPrice)) / Number(newOriginalPrice)) * 100)
    : 0;

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) {
      addToast('Please provide a product title and price', 'error');
      return;
    }

    const priceNum = Number(newPrice);
    const origPriceNum = newOriginalPrice ? Number(newOriginalPrice) : Math.round(priceNum * 1.2);
    const discount = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    try {
      await addSellerProduct({
      name: newTitle,
      nameAm: newTitleAm || newTitle,
      category: newCategory,
      brand: newBrand,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: discount,
      stockCount: Number(newStock) || 15,
      sellerName: storeName,
      sellerId: 'seller-1',
      isFlashDeal: isFeaturedDeal,
      images: [newImage],
      description: newDescription || 'Premium handcrafted item made with pride in Ethiopia.',
      descriptionAm: newDescription || 'በከፍተኛ ጥራት በኢትዮጵያ የተዘጋጀ ልዩ እቃ።'
      });
    } catch (error) {
      addToast(error.message || 'Unable to publish the product.', 'error');
      return;
    }

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewTitleAm('');
    setNewPrice('');
    setNewOriginalPrice('');
    setNewDescription('');
    setIsFeaturedDeal(false);
  };

  const handleRequestPayout = (e) => {
    e.preventDefault();
    addToast(`Payout request of ETB ${Number(payoutAmount).toLocaleString()} submitted via ${payoutMethod.toUpperCase()}! Transfer arrives in 1-2 hours.`, 'success');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Store profile & verification details updated successfully!', 'success');
  };

  const handleUpdateStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stockCount: Math.max(0, (p.stockCount || 10) + delta) } : p
      )
    );
    addToast('Inventory count updated', 'info');
  };

  const handleSaveInlinePrice = (productId) => {
    if (!editPrice || isNaN(Number(editPrice))) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, price: Number(editPrice) } : p
      )
    );
    setEditingProductId(null);
    setEditPrice('');
    addToast('Product price updated successfully!', 'success');
  };

  const handleSendReply = (inquiryId) => {
    if (!replyText.trim()) return;
    setCustomerInquiries((prev) =>
      prev.map((item) =>
        item.id === inquiryId ? { ...item, reply: replyText, answered: true } : item
      )
    );
    setActiveReplyId(null);
    setReplyText('');
    addToast('Reply sent to customer SMS & Chat!', 'success');
  };

  return (
    <div className="bg-[#F8FAFC] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Store className="w-3.5 h-3.5" />
              <span>{t('sellerHubTitle')}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {storeName}
              </h1>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" title="Verified Merchant" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {shopLocation} | Verified Ethiopian Merchant (TIN: {tinNumber}) 🇪🇹
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addNewProduct')}</span>
            </button>
          </div>
        </div>

        {/* Performance KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">{t('revenue')}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">ETB 482,900</span>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +18% growth this month
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">{t('totalOrders')}</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">128 Orders</span>
            <span className="text-[10px] text-slate-400 block mt-1">98% fulfillment rate in Addis</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">{t('activeProducts')}</span>
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">{products.length} Items</span>
            <span className="text-[10px] text-teal-600 font-bold block mt-1">Active in Catalog</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Store Rating</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900">4.9 / 5.0</span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              KYC Verified Merchant (Tier 1)
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-3 bg-white p-2 rounded-2xl border">
          {[
            { id: 'products', label: `Catalog (${products.length})` },
            { id: 'inventory', label: 'Inventory & Stock Control' },
            { id: 'messages', label: `Customer Inquiries (${customerInquiries.filter(i => !i.answered).length} New)` },
            { id: 'payouts', label: 'Telebirr Payouts & Earnings' },
            { id: 'profile', label: 'Store Profile & KYC Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSellerTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeSellerTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. CATALOG TAB */}
        {activeSellerTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Rating</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-3 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border bg-white shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 truncate block max-w-xs">{p.name}</span>
                        {p.isFlashDeal && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-rose-600 font-bold">
                            <Sparkles className="w-2.5 h-2.5" /> Featured Flash Deal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 uppercase font-semibold">{p.category}</td>
                    <td className="py-3 font-extrabold text-slate-900">
                      {editingProductId === p.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 px-1.5 py-0.5 border border-slate-300 rounded text-xs"
                            placeholder={p.price}
                          />
                          <button
                            onClick={() => handleSaveInlinePrice(p.id)}
                            className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span>{formatPrice(p.price)}</span>
                      )}
                    </td>
                    <td className="py-3 text-slate-700">{p.stockCount || 15} units</td>
                    <td className="py-3 font-bold text-amber-600">⭐ {p.rating}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          setEditingProductId(p.id);
                          setEditPrice(p.price);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit Price</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. INVENTORY & STOCK CONTROL */}
        {activeSellerTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900">Live Inventory Quantity Adjustment</h3>
            <div className="space-y-2">
              {products.slice(0, 8).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images?.[0] || p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-white" />
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <span className="text-[10px] text-slate-500 font-mono">{formatPrice(p.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStock(p.id, -5)}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      -5
                    </button>
                    <span className="font-bold font-mono px-2 text-slate-900">{p.stockCount || 15} in stock</span>
                    <button
                      onClick={() => handleUpdateStock(p.id, 5)}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      +5
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CUSTOMER INQUIRIES & MESSAGES TAB */}
        {activeSellerTab === 'messages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">Customer Inquiries & Product Q&A</h3>
              </div>
              <span className="text-xs text-slate-500">Instant SMS & Chat replies</span>
            </div>

            <div className="space-y-4">
              {customerInquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{inq.customerName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{inq.phone}</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        Product: {inq.productName}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400">{inq.date}</span>
                  </div>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                    "{inq.question}"
                  </p>

                  {inq.reply ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                      <strong>Your Reply:</strong> {inq.reply}
                    </div>
                  ) : activeReplyId === inq.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply to customer..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                      <button
                        onClick={() => handleSendReply(inq.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveReplyId(inq.id);
                        setReplyText('');
                      }}
                      className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Reply to Customer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PAYOUTS & TELEBIRR EARNINGS */}
        {activeSellerTab === 'payouts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h3 className="font-black text-base text-slate-900">Request Merchant Payout</h3>
              <p className="text-xs text-slate-500">
                Withdraw funds directly into your Telebirr SuperApp merchant account or Commercial Bank of Ethiopia (CBE).
              </p>

              <form onSubmit={handleRequestPayout} className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Withdrawal Amount in ETB</label>
                  <input
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Payout Destination</label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  >
                    <option value="telebirr">Telebirr Merchant (TB-MERCHANT-8492)</option>
                    <option value="cbe">Commercial Bank of Ethiopia (1000284920194)</option>
                    <option value="awash">Awash Bank Account</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>Withdraw Earnings to Telebirr</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h3 className="font-black text-base text-slate-900">Recent Settlement History</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900">ETB 120,000 (Telebirr)</span>
                    <p className="text-[10px] text-slate-400">Processed on Aug 20, 2026</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900">ETB 85,000 (CBE Direct)</span>
                    <p className="text-[10px] text-slate-400">Processed on Aug 14, 2026</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. STORE PROFILE & KYC SETTINGS */}
        {activeSellerTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-8 border border-slate-200 max-w-2xl mx-auto space-y-4 shadow-sm">
            <h3 className="text-lg font-black text-slate-900">Store Profile & KYC Settings</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Store / Brand Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Physical Shop Location</label>
              <input
                type="text"
                value={shopLocation}
                onChange={(e) => setShopLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Store Description</label>
              <textarea
                rows={2}
                value={storeBio}
                onChange={(e) => setStoreBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">TIN Tax Number</label>
                <input
                  type="text"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Telebirr Merchant ID</label>
                <input
                  type="text"
                  value={telebirrMerchantId}
                  onChange={(e) => setTelebirrMerchantId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Store Profile</span>
            </button>
          </form>
        )}
      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 z-10 space-y-4">
            <h3 className="font-black text-lg text-slate-900">{t('addNewProduct')}</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title (English) *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Traditional Pure Cotton Netela"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title (Amharic አማርኛ)</label>
                <input
                  type="text"
                  value={newTitleAm}
                  onChange={(e) => setNewTitleAm(e.target.value)}
                  placeholder="e.g. ንጹህ የሀገር ጥጥ ነጠላ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Brand / Maker</label>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Selling Price (ETB) *</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="18500"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Original Price (ETB)</label>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(e.target.value)}
                    placeholder="22000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              {calculatedDiscount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Calculated Discount: {calculatedDiscount}% OFF</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeaturedDeal}
                      onChange={(e) => setIsFeaturedDeal(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Featured Deal
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Image className="w-3.5 h-3.5 text-slate-500" />
                    Product Image URL
                  </label>
                  <span className="text-[10px] text-slate-400">Choose preset or custom URL</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sampleImagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewImage(preset.url)}
                      className="text-[10px] px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t('saveProduct')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
