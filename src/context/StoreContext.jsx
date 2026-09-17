import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { initialProducts } from '../data/products';
import { ethiopianLocations } from '../data/locations';
import { categories } from '../data/categories';
import { verifiedSellers } from '../data/sellers';
import { notificationService } from '../services/notificationService';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Language state
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('merkato_lang') || 'en';
  });

  // 2. Navigation / Current View
  const [currentView, setCurrentView] = useState('home'); // 'home', 'shop', 'deals', 'track', 'account', 'seller', 'admin', 'checkout', 'product-detail'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewHistory, setViewHistory] = useState([]);

  // 3. Products state
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('merkato_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialProducts;
  });

  // 4. Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('merkato_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // 5. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('merkato_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // 6. Compare Products state
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // 7. Loyalty & Rewards state
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);

  // 8. Notifications Feed state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: '🚚 Order In Transit (Bole)',
      message: 'Your order #ETH-84920 has been dispatched with courier Yared Tadesse.',
      time: '10m ago',
      read: false,
      type: 'order'
    },
    {
      id: 'notif-2',
      title: '🔥 Telebirr 5% Cashback Live',
      message: 'Use code TELEBIRR5 on your next electronics or Habesha Kemis purchase.',
      time: '1h ago',
      read: false,
      type: 'deal'
    },
    {
      id: 'notif-3',
      title: '☕ Yirgacheffe Coffee Restocked',
      message: 'Fresh Grade 1 single-origin roasted beans from Sidama Union are now available.',
      time: '3h ago',
      read: true,
      type: 'product'
    }
  ]);

  // 9. Selected Location & Delivery Address
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return ethiopianLocations[0]; // Bole by default
  });

  // 10. Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  // 11. User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('merkato_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      name: 'Amanuel Kebede',
      phone: '+251 911 458920',
      email: 'amanuel.kebede@example.com',
      subCity: 'Bole (ቦሌ)',
      address: 'Near Edna Mall, Addis Ababa',
      role: 'buyer',
      isLoggedIn: true,
      points: 450
    };
  });

  // 12. Orders state with sample tracked order
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('merkato_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'ETH-84920',
        date: '2026-08-25 10:30 AM',
        items: [
          {
            id: 'prod-3',
            name: 'Yirgacheffe Grade 1 Single-Origin Roasted Coffee Beans (500g)',
            nameAm: 'የይርጋጨፌ ግሬድ 1 የተቆላ የቡና ፍሬ (500 ግራም)',
            price: 950,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
            selectedVariant: 'Whole Bean (ያልተፈጨ)'
          },
          {
            id: 'prod-5',
            name: 'Pure Gurage Organic Berbere Spice Blend 100% Sun-Dried (1kg)',
            nameAm: 'የጉራጌ ንጹህ የበርበሬ ድብልቅ (1 ኪሎ ግራም)',
            price: 1100,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
            selectedVariant: '1kg'
          }
        ],
        subtotal: 3000,
        deliveryFee: 150,
        discount: 300,
        total: 2850,
        paymentMethod: 'telebirr',
        paymentStatus: 'Paid via Telebirr (TXN: TB-938210)',
        deliveryAddress: {
          fullName: 'Amanuel Kebede',
          phone: '+251 911 458920',
          city: 'Addis Ababa',
          subCity: 'Bole (ቦሌ)',
          address: 'Bole Medhanialem, Near Edna Mall',
          instructions: 'Call upon arrival at the gate'
        },
        status: 'out_for_delivery',
        courier: {
          name: 'Yared Tadesse',
          phone: '+251 912 884433',
          vehicle: 'Motorcycle (Plate: AA-3-4920)',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        timeline: [
          { status: 'order_placed', label: 'Order Placed', time: 'Yesterday 10:30 AM', completed: true },
          { status: 'payment_confirmed', label: 'Payment Confirmed (Telebirr)', time: 'Yesterday 10:31 AM', completed: true },
          { status: 'preparing', label: 'Packed at Merkato Central Hub', time: 'Yesterday 02:15 PM', completed: true },
          { status: 'shipped', label: 'Handed to Motorcycle Courier', time: 'Today 08:30 AM', completed: true },
          { status: 'out_for_delivery', label: 'Out for Delivery (in Bole area)', time: 'Today 11:45 AM', completed: true },
          { status: 'delivered', label: 'Delivered', time: 'Expected by 02:00 PM', completed: false }
        ]
      }
    ];
  });

  // 13. Active coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // 14. Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('merkato_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('merkato_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('merkato_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('merkato_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('merkato_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('merkato_user', JSON.stringify(user));
  }, [user]);

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  // Toast trigger
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open Auth Modal
  const openAuthModal = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const register = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    addToast(`Account created successfully! Welcome to Merkato Store, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    addToast(lang === 'am' ? 'በሰላም ወጥተዋል' : 'Signed out successfully', 'info');
  };

  // Compare functions
  const addToCompare = (product) => {
    if (compareList.some((p) => p.id === product.id)) {
      addToast('Product already in compare list', 'info');
      setIsCompareModalOpen(true);
      return;
    }
    if (compareList.length >= 4) {
      addToast('You can compare up to 4 products at once', 'error');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    setIsCompareModalOpen(true);
    addToast(`${product.name} added to comparison`, 'success');
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompareList = () => {
    setCompareList([]);
    setIsCompareModalOpen(false);
  };

  // Notification functions
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedVariant === selectedVariant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            nameAm: product.nameAm,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images?.[0] || product.image,
            category: product.category,
            brand: product.brand,
            sellerName: product.sellerName,
            quantity,
            selectedVariant: selectedVariant || product.colors?.[0] || product.sizes?.[0] || 'Standard'
          }
        ];
      }
    });
    addToast(`${lang === 'am' && product.nameAm ? product.nameAm : product.name} ${t('addedToCart')}`, 'success');
  };

  const updateCartQuantity = (productId, selectedVariant, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedVariant);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedVariant === selectedVariant
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedVariant) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedVariant === selectedVariant)
      )
    );
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    if (isWishlisted) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(t('removedFromWishlist'), 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(t('addedToWishlist'), 'success');
    }
  };

  const isProductWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // View Product details
  const openProductDetail = (product) => {
    setSelectedDetailProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track view history
    setViewHistory((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Price Formatter in ETB
  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('en-ET', {
      maximumFractionDigits: 0
    }).format(amount || 0);
    return lang === 'am' ? `${formatted} ብር` : `ETB ${formatted}`;
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartSavings = cart.reduce(
    (sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0),
    0
  );
  const deliveryFee = cart.length > 0 ? (selectedLocation?.deliveryFee || 150) : 0;
  
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      couponDiscount = appliedCoupon.value;
    }
  }
  
  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - couponDiscount);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Apply Coupon code
  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      const coupon = { code: 'WELCOME10', type: 'percentage', value: 10, label: '10% First Order Discount' };
      setAppliedCoupon(coupon);
      addToast('Coupon WELCOME10 applied (10% OFF)!', 'success');
      return true;
    } else if (clean === 'TELEBIRR5') {
      const coupon = { code: 'TELEBIRR5', type: 'percentage', value: 5, label: '5% Telebirr Special Offer' };
      setAppliedCoupon(coupon);
      addToast('Coupon TELEBIRR5 applied (5% OFF)!', 'success');
      return true;
    } else if (clean === 'MERKATO500') {
      const coupon = { code: 'MERKATO500', type: 'fixed', value: 500, label: 'ETB 500 Grand Discount' };
      setAppliedCoupon(coupon);
      addToast('Coupon MERKATO500 applied (500 ETB OFF)!', 'success');
      return true;
    } else {
      addToast('Invalid coupon code. Try WELCOME10 or TELEBIRR5', 'error');
      return false;
    }
  };

  // Add Seller product
  const addSellerProduct = (newProd) => {
    const productItem = {
      ...newProd,
      id: `prod-custom-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      isFlashDeal: false,
      isTrending: true,
      isNewArrival: true,
      isEthiopianMade: true,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          user: user?.name || 'Verified Customer',
          rating: 5,
          date: 'Just now',
          comment: 'High quality and fast dispatch!',
          verified: true
        }
      ]
    };
    setProducts((prev) => [productItem, ...prev]);
    addToast('Product published to Merkato Store catalog!', 'success');
  };

  // Create Order
  const createOrder = (orderData) => {
    const newOrderId = `ETH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      discount: couponDiscount,
      total: cartTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'Payment Verified (Instant Telebirr/Bank)',
      deliveryAddress: orderData.deliveryAddress,
      status: 'order_placed',
      courier: {
        name: 'Abebe Tadesse',
        phone: '+251 911 889900',
        vehicle: 'Motorcycle (Plate: AA-2-8921)',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      },
      timeline: [
        { status: 'order_placed', label: 'Order Placed', time: 'Just now', completed: true },
        { status: 'payment_confirmed', label: 'Payment Confirmed', time: 'Pending', completed: orderData.paymentMethod !== 'cod' },
        { status: 'preparing', label: 'Preparing at Merkato Hub', time: 'Estimated in 30 mins', completed: false },
        { status: 'shipped', label: 'Handed to Dispatch Courier', time: 'Pending', completed: false },
        { status: 'out_for_delivery', label: 'Out for Delivery', time: 'Pending', completed: false },
        { status: 'delivered', label: 'Delivered', time: 'Today', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    // Add real-time notification
    notificationService.sendOrderNotification('ORDER_PLACED', newOrder, user);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `🎉 Order #${newOrderId} Placed!`,
        message: `Your order for ETB ${newOrder.total.toLocaleString()} has been placed and is being prepared in Merkato Hub.`,
        time: 'Just now',
        read: false,
        type: 'order'
      },
      ...prev
    ]);

    clearCart();
    setAppliedCoupon(null);
    return newOrderId;
  };

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        t,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products,
        setProducts,
        categories,
        sellers: verifiedSellers,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartSavings,
        deliveryFee,
        cartTotal,
        totalCartItemsCount,
        appliedCoupon,
        applyCouponCode,
        wishlist,
        toggleWishlist,
        isProductWishlisted,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompareList,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isRewardsModalOpen,
        setIsRewardsModalOpen,
        notifications,
        markAllNotificationsAsRead,
        selectedLocation,
        setSelectedLocation,
        locations: ethiopianLocations,
        quickViewProduct,
        setQuickViewProduct,
        selectedDetailProduct,
        setSelectedDetailProduct,
        openProductDetail,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        isLiveChatOpen,
        setIsLiveChatOpen,
        user,
        setUser,
        login,
        register,
        logout,
        orders,
        setOrders,
        createOrder,
        addSellerProduct,
        toasts,
        addToast,
        removeToast,
        formatPrice,
        viewHistory
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// The provider and hook intentionally share this module for the app-wide store API.
// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
