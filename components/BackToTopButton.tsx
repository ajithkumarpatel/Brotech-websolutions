import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-hover transition-all duration-300 z-40 transform active:scale-90 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-label="Go to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default BackToTopButton;