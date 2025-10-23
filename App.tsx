import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';

import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Chatbot from './components/Chatbot';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg">
          <Header />
          <main className="flex-grow">
            {/* Fix: Wrap Routes in a div to provide Suspense with a simple direct child, preventing potential issues with complex router components. */}
            <Suspense fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
              <div>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </div>
            </Suspense>
          </main>
          <Footer />
        </div>
        <BackToTopButton />
        <Chatbot />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
