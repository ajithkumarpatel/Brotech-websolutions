import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Code2 } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const activeLinkStyle = {
    color: '#4f46e5',
    fontWeight: '600',
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Code2 size={28} />
          <span>BroTech</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/contact" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-all duration-200 font-semibold transform hover:-translate-y-1 active:scale-95">
            Get a Quote
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="ml-4 p-2" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-dark-bg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="flex flex-col items-center py-4">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              onClick={closeMenu} 
              className="py-3 text-lg w-full text-center hover:bg-gray-100 dark:hover:bg-dark-card transition-colors duration-200"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/contact" onClick={closeMenu} className="bg-primary text-white px-6 py-3 rounded-md mt-4 hover:bg-primary-hover transition-all duration-300 font-semibold transform active:scale-95 inline-block">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;