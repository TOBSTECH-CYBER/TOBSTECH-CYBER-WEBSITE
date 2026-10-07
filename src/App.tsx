/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { NotificationToast } from './components/NotificationToast';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { BookshopPage } from './pages/BookshopPage';
import { BookServicePage } from './pages/BookServicePage';
import { CartPage } from './pages/CartPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { TermsPrivacyPage } from './pages/TermsPrivacyPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { OrderRecord } from './types';

const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>();
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  const { isSearchOpen, setIsSearchOpen } = useApp();

  // Scroll to top on tab change
  const navigateTo = (tab: string, extraData?: any) => {
    if (extraData?.serviceId) {
      setSelectedServiceForBooking(extraData.serviceId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (order: OrderRecord) => {
    setCompletedOrder(order);
    setCurrentTab('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Global Notifications Toast */}
      <NotificationToast />

      {/* Main Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={navigateTo}
        openAdminModal={() => navigateTo('admin')}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage onNavigate={navigateTo} />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            onBookService={(srvId) => {
              setSelectedServiceForBooking(srvId);
              navigateTo('book-service');
            }}
            onNavigateToBookshop={() => navigateTo('bookshop')}
          />
        )}

        {currentTab === 'bookshop' && (
          <BookshopPage onNavigateToCart={() => navigateTo('cart')} />
        )}

        {currentTab === 'book-service' && (
          <BookServicePage
            initialServiceId={selectedServiceForBooking}
            onNavigateToTracking={(referenceId) => {
              navigateTo('account');
            }}
          />
        )}

        {currentTab === 'cart' && (
          <CartPage
            onNavigateToBookshop={() => navigateTo('bookshop')}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {currentTab === 'order-confirmation' && completedOrder && (
          <OrderConfirmationPage
            order={completedOrder}
            onTrackOrder={() => navigateTo('account')}
            onContinueShopping={() => navigateTo('bookshop')}
          />
        )}

        {currentTab === 'account' && (
          <AccountPage
            onNavigateToBooking={(srvId) => {
              setSelectedServiceForBooking(srvId);
              navigateTo('book-service');
            }}
            onNavigateToBookshop={() => navigateTo('bookshop')}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigateToServices={() => navigateTo('services')}
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}

        {currentTab === 'faq' && (
          <FaqPage onNavigateToContact={() => navigateTo('contact')} />
        )}

        {currentTab === 'terms-privacy' && (
          <TermsPrivacyPage />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard onCloseAdmin={() => navigateTo('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={navigateTo}
        openAdminModal={() => navigateTo('admin')}
      />

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppButton />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={(serviceId) => {
          setSelectedServiceForBooking(serviceId);
          navigateTo('book-service');
        }}
        onSelectProduct={(productId) => {
          navigateTo('bookshop');
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
