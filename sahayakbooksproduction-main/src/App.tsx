import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CorporateNavbar } from './components/corporate/CorporateNavbar';
import { CorporateFooter } from './components/corporate/CorporateFooter';
import { WhatsAppButton } from './components/WhatsAppButton';
import { FixedMascot } from './components/corporate/FixedMascot';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SampleReaderModal } from './components/SampleReaderModal';
import { AuthModal } from './components/AuthModal';

// Corporate Views
import { CorporateHomeView } from './views/corporate/CorporateHomeView';
import { ServicesView } from './views/corporate/ServicesView';
import { GurukulView } from './views/corporate/GurukulView';
import { BrochuresView } from './views/corporate/BrochuresView';
import { AchievementsView } from './views/corporate/AchievementsView';
import { CareersView } from './views/corporate/CareersView';
import { BooksLandingView } from './views/corporate/BooksLandingView';

// Bookstore & Existing Views
import { BooksCatalogView } from './views/BooksCatalogView';
import { BookDetailView } from './views/BookDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { UserDashboardView } from './views/UserDashboardView';
import { CustomerAccountView } from './views/CustomerAccountView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { ResetPasswordView } from './views/ResetPasswordView';
import { VerifyEmailView } from './views/VerifyEmailView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AdminSetPasswordView } from './views/AdminSetPasswordView';
import { AuthorsView, AuthorDetailView } from './views/AuthorsView';
import { BlogsView, BlogDetailView } from './views/BlogsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CategoriesView, CategoryDetailView } from './views/CategoriesView';
import {
  PrivacyPolicyView,
  TermsConditionsView,
  ShippingPolicyView,
  ReturnRefundPolicyView,
} from './views/PolicyViews';
import { SitemapView } from './views/SitemapView';

const MainRouter: React.FC = () => {
  const { currentPath, settings } = useStore();

  // Scroll to top on route change & update document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (currentPath === '/') {
      document.title = 'Sahayak Associates | Your Personal Family CFO';
    } else if (currentPath === '/services') {
      document.title = 'The Sahayak Product Basket — 14 Financial Services | Sahayak Associates';
    } else if (currentPath === '/gurukul' || currentPath.startsWith('/gurukul/')) {
      document.title = 'Sahayak Gurukul — Financial Knowledge Hub | Sahayak Associates';
    } else if (currentPath === '/achievements') {
      document.title = 'Company Milestones & Practice Achievements | Sahayak Associates';
    } else if (currentPath === '/careers') {
      document.title = 'Careers & Open Opportunities | Sahayak Associates';
    } else if (currentPath.startsWith('/books/admin') || currentPath.startsWith('/admin')) {
      document.title = 'Admin Master Control | Sahayak Associates';
    } else if (currentPath.startsWith('/books/')) {
      document.title = `Book Dossier | Sahayak Books — Powered by Sahayak Associates`;
    } else if (currentPath === '/books') {
      document.title = 'Sahayak Books — Publishing Imprint | Sahayak Associates';
    } else if (currentPath === '/checkout') {
      document.title = 'Secure Checkout | Sahayak Books';
    } else if (currentPath.startsWith('/order-success')) {
      document.title = 'Order Confirmed | Sahayak Books';
    } else if (currentPath.startsWith('/track-order')) {
      document.title = 'Track Consignment | Sahayak Books';
    } else if (currentPath === '/dashboard') {
      document.title = 'Reader Dashboard | Sahayak Books';
    } else if (currentPath === '/authors') {
      document.title = 'Authors & Jurists Faculty | Sahayak Associates';
    } else if (currentPath === '/blogs') {
      document.title = 'Insights & Articles | Sahayak Gurukul';
    } else if (currentPath === '/about') {
      document.title = 'About Us — Your Personal Family CFO | Sahayak Associates';
    } else if (currentPath === '/contact') {
      document.title = 'Contact Advisory Desk | Sahayak Associates';
    } else {
      document.title = 'Sahayak Associates | Your Personal Family CFO';
    }
  }, [currentPath, settings]);

  // Route Dispatcher
  const renderRoute = () => {
    let cleanPath = (currentPath || '').split('?')[0].trim();
    if (cleanPath.startsWith('#')) cleanPath = cleanPath.substring(1).trim();
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) cleanPath = cleanPath.replace(/\/+$/, '');

    // 1. Corporate Home — Primary Landing
    if (
      cleanPath === '/' ||
      cleanPath === '' ||
      cleanPath === '/home' ||
      cleanPath === 'home' ||
      cleanPath === '/#' ||
      cleanPath === '#' ||
      cleanPath === '/#/'
    ) {
      return <CorporateHomeView />;
    }

    // 2. Corporate Inner Pages
    if (cleanPath === '/services') {
      return <ServicesView />;
    }
    if (cleanPath === '/gurukul') {
      return <GurukulView />;
    }
    if (cleanPath === '/gurukul/brochures') {
      return <BrochuresView />;
    }
    if (cleanPath === '/achievements') {
      return <AchievementsView />;
    }
    if (cleanPath === '/careers') {
      return <CareersView />;
    }

    // 3. Dedicated Bookstore Imprint
    if (cleanPath === '/books') {
      return <BooksLandingView />;
    }
    if (cleanPath === '/books/catalog') {
      return <BooksCatalogView />;
    }

    // Books Admin Alias & Subpaths
    if (cleanPath === '/books/admin' || cleanPath.startsWith('/books/admin/')) {
      return <AdminDashboardView />;
    }

    // 4. Book Detail: /books/:slug
    if (cleanPath.startsWith('/books/')) {
      const slug = cleanPath.replace('/books/', '');
      return <BookDetailView slug={slug} />;
    }

    // 4. Checkout
    if (cleanPath === '/checkout') {
      return <CheckoutView />;
    }

    // 5. Order Success: /order-success/:orderId
    if (cleanPath.startsWith('/order-success')) {
      const parts = cleanPath.split('/');
      const orderId = parts[2] || '';
      return <OrderSuccessView orderId={orderId} />;
    }

    // 6. Order Tracking: /track-order
    if (cleanPath.startsWith('/track-order')) {
      return <OrderTrackingView />;
    }

    // Customer Authentication Routes
    if (cleanPath.startsWith('/login')) {
      return <LoginView />;
    }
    if (cleanPath.startsWith('/register')) {
      return <RegisterView />;
    }
    if (cleanPath.startsWith('/forgot-password')) {
      return <ForgotPasswordView />;
    }
    if (cleanPath.startsWith('/reset-password')) {
      return <ResetPasswordView />;
    }
    if (cleanPath.startsWith('/verify-email')) {
      return <VerifyEmailView />;
    }
    if (cleanPath === '/account' || cleanPath.startsWith('/account/')) {
      return <CustomerAccountView />;
    }

    // 7. Customer Dashboard & Wishlist
    if (cleanPath === '/wishlist') {
      return <CustomerAccountView />;
    }
    if (cleanPath === '/dashboard' || cleanPath.startsWith('/dashboard')) {
      return <CustomerAccountView />;
    }

    // 8. Admin Control Center
    if (cleanPath === '/admin/set-password') {
      return <AdminSetPasswordView />;
    }
    if (cleanPath.startsWith('/admin')) {
      return <AdminDashboardView />;
    }

    // 9. Authors Roster & Detail
    if (cleanPath === '/authors' || cleanPath === '/author') {
      return <AuthorsView />;
    }
    if (cleanPath.startsWith('/authors/')) {
      const slug = cleanPath.replace('/authors/', '');
      return <AuthorDetailView slug={slug} />;
    }
    if (cleanPath.startsWith('/author/')) {
      const slug = cleanPath.replace('/author/', '');
      return <AuthorDetailView slug={slug} />;
    }

    // 10. Blogs & Articles
    if (cleanPath === '/blogs') {
      return <BlogsView />;
    }
    if (cleanPath.startsWith('/blogs/')) {
      const slug = cleanPath.replace('/blogs/', '');
      return <BlogDetailView slug={slug} />;
    }

    // 11. Categories & Disciplines
    if (cleanPath === '/categories') {
      return <CategoriesView />;
    }
    if (cleanPath.startsWith('/categories/')) {
      const slug = cleanPath.replace('/categories/', '');
      return <CategoryDetailView slug={slug} />;
    }

    // 12. Institutional & Information Pages
    if (cleanPath === '/about') {
      return <AboutView />;
    }
    if (cleanPath === '/contact') {
      return <ContactView />;
    }
    if (cleanPath === '/privacy-policy') {
      return <PrivacyPolicyView />;
    }
    if (cleanPath === '/terms-conditions') {
      return <TermsConditionsView />;
    }
    if (cleanPath === '/shipping-policy') {
      return <ShippingPolicyView />;
    }
    if (cleanPath === '/returns-policy') {
      return <ReturnRefundPolicyView />;
    }
    if (cleanPath === '/sitemap') {
      return <SitemapView />;
    }

    // Fallback default
    return <CorporateHomeView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0B192C] font-sans antialiased selection:bg-[#C5A059] selection:text-[#0B192C]">
      {/* Top Corporate Navigation */}
      <CorporateNavbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">{renderRoute()}</main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SampleReaderModal />
      <AuthModal />
      <WhatsAppButton />
      <FixedMascot />

      {/* Corporate Global Footer */}
      <CorporateFooter />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
