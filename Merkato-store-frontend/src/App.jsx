import { StoreProvider, useStore } from './context/StoreContext';
import TopAnnouncementBar from './components/layout/TopAnnouncementBar';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import HeroBanner from './components/home/HeroBanner';
import CategoryPills from './components/home/CategoryPills';
import FlashDeals from './components/home/FlashDeals';
import TrendingSection from './components/home/TrendingSection';
import EthiopianSpotlight from './components/home/EthiopianSpotlight';
import WhyMerkato from './components/home/WhyMerkato';
import CustomerReviews from './components/home/CustomerReviews';
import AppPromoBanner from './components/home/AppPromoBanner';
import NewsletterSection from './components/home/NewsletterSection';
import ShopView from './components/shop/ShopView';
import ProductDetailView from './components/product/ProductDetailView';
import CheckoutFlow from './components/checkout/CheckoutFlow';
import OrderTracker from './components/orders/OrderTracker';
import UserAccount from './components/account/UserAccount';
import SellerHub from './components/seller/SellerHub';
import AdminDashboard from './components/admin/AdminDashboard';
import CartDrawer from './components/common/CartDrawer';
import QuickViewModal from './components/common/QuickViewModal';
import AuthModal from './components/common/AuthModal';
import ProductCompareModal from './components/compare/ProductCompareModal';
import LoyaltyRewardsModal from './components/rewards/LoyaltyRewardsModal';
import RecentlyViewedBar from './components/common/RecentlyViewedBar';
import FloatingSupport from './components/common/FloatingSupport';
import Toast from './components/common/Toast';

function AppContent() {
  const { currentView, selectedDetailProduct } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Bar with Announcement & Location */}
      <TopAnnouncementBar />

      {/* Main Responsive Header */}
      <Navbar />

      {/* Dynamic Content Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroBanner />
            <CategoryPills />
            <FlashDeals />
            <TrendingSection />
            <EthiopianSpotlight />
            <WhyMerkato />
            <CustomerReviews />
            <AppPromoBanner />
            <NewsletterSection />
          </>
        )}

        {(currentView === 'shop' || currentView === 'deals') && <ShopView />}

        {currentView === 'product-detail' && (
          <ProductDetailView key={selectedDetailProduct?.id || 'default-product'} />
        )}

        {currentView === 'checkout' && <CheckoutFlow />}

        {currentView === 'track' && <OrderTracker />}

        {currentView === 'account' && <UserAccount />}

        {currentView === 'seller' && <SellerHub />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Recently Viewed Products Strip */}
      <RecentlyViewedBar />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <AuthModal />
      <ProductCompareModal />
      <LoyaltyRewardsModal />
      <FloatingSupport />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
