import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';
import { ethiopianLocations } from '../data/locations';
import { notificationService } from '../services/notificationService';

// Backend Services
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import sellerService from '../services/sellerService';
import authService from '../services/authService';
import orderService from '../services/orderService';

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

  // 3. Data states (initialized with safe fallbacks, dynamically loaded from MongoDB)
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const token = localStorage.getItem('merkato_token');
    const saved = localStorage.getItem('merkato_user');
    if (token && saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // 12. Orders state
  const [orders, setOrders] = useState([]);

  // 13. Active coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // 14. Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast trigger
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  // Price Formatter in ETB
  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('en-ET', {
      maximumFractionDigits: 0
    }).format(amount || 0);
    return lang === 'am' ? `${formatted} ብር` : `ETB ${formatted}`;
  };

  // 15. Load Real Data from Backend API on Mount
  const loadDatabaseData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedCategories, fetchedProducts, fetchedSellers, fetchedOrders] = await Promise.allSettled([
        categoryService.getCategories(),
        productService.getProducts(),
        sellerService.getSellers(),
        localStorage.getItem('merkato_token') ? orderService.getOrders() : Promise.resolve([])
      ]);

      if (fetchedCategories.status === 'fulfilled' && fetchedCategories.value.length > 0) {
        setCategories(fetchedCategories.value);
      }

      if (fetchedProducts.status === 'fulfilled' && fetchedProducts.value.length > 0) {
        setProducts(fetchedProducts.value);
      }

      if (fetchedSellers.status === 'fulfilled' && fetchedSellers.value.length > 0) {
        setSellers(fetchedSellers.value);
      }

      if (fetchedOrders.status === 'fulfilled' && fetchedOrders.value.length > 0) {
        setOrders(fetchedOrders.value);
      }
    } catch (e) {
      console.warn('Database initialization warning:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = setTimeout(loadDatabaseData, 0);
    return () => clearTimeout(loadTimer);
  }, [loadDatabaseData]);

  useEffect(() => {
    if (!localStorage.getItem('merkato_token')) return;
    authService.getMe()
      .then(async (currentUser) => {
        setUser({ ...currentUser, isLoggedIn: true });
        setOrders(await orderService.getOrders());
      })
      .catch(() => {
        authService.logout();
        setUser(null);
      });
  }, []);

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
    if (user) {
      localStorage.setItem('merkato_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('merkato_user');
    }
  }, [user]);

  // Open Auth Modal
  const openAuthModal = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const login = async (userData) => {
    const apiUser = await authService.login(
      userData.phone || userData.email || userData.identifier,
      userData.password
    );
    const finalUser = { ...userData, ...apiUser, isLoggedIn: true };
    setUser(finalUser);
    setOrders(await orderService.getOrders());
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${finalUser.name}!`, 'success');
    return finalUser;
  };

  const register = async (userData) => {
    const apiUser = await authService.register(userData);
    const finalUser = { ...userData, ...apiUser, isLoggedIn: true };
    setUser(finalUser);
    setOrders(await orderService.getOrders());
    setIsAuthModalOpen(false);
    addToast(`Account created successfully! Welcome to Merkato Store, ${finalUser.name}!`, 'success');
    return finalUser;
  };

  const logout = () => {
    authService.logout();
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

  // Add Seller product to MongoDB & Local State
  const addSellerProduct = async (newProd) => {
    const productItem = {
      ...newProd,
      id: `prod-custom-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: Number(newProd.stockCount || 20),
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

    const finalProd = await productService.createProduct(productItem);
    setProducts((prev) => [finalProd, ...prev]);
    addToast('Product published to Merkato Store database!', 'success');
    return finalProd;
  };

  // Add Review to Product
  const submitProductReview = async (productId, reviewData) => {
    const updatedProduct = await productService.addReview(productId, reviewData);
    if (updatedProduct) {
      setProducts((prev) => prev.map((p) => (p.id === productId ? updatedProduct : p)));
      if (selectedDetailProduct?.id === productId) {
        setSelectedDetailProduct(updatedProduct);
      }
    }
    addToast('Review submitted successfully!', 'success');
    return true;
  };

  // Create Order in MongoDB & Local State
  const createOrder = async (orderData) => {
    const payload = {
      items: [...cart],
      couponCode: appliedCoupon?.code,
      paymentMethod: orderData.paymentMethod,
      deliveryAddress: orderData.deliveryAddress
    };

    const orderToStore = await orderService.createOrder(payload);

    setOrders((prev) => [orderToStore, ...prev]);

    // Send order notification
    notificationService.sendOrderNotification('ORDER_PLACED', orderToStore, user);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `🎉 Order #${orderToStore.id} Placed!`,
        message: `Your order for ETB ${orderToStore.total.toLocaleString()} has been placed and is being prepared in Merkato Hub.`,
        time: 'Just now',
        read: false,
        type: 'order'
      },
      ...prev
    ]);

    clearCart();
    setAppliedCoupon(null);
    return orderToStore.id;
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
        setCategories,
        sellers,
        setSellers,
        isLoading,
        loadDatabaseData,
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
        submitProductReview,
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

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
