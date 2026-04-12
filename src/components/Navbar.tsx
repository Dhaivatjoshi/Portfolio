import React, { useState, useEffect } from 'react';
import { Download, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: language === 'en' ? 'Portfolio' : 'Portfolio', href: '#projects' },
    { name: language === 'en' ? 'Skills' : 'Skills', href: '#skills' },
    { name: language === 'en' ? 'Connect' : 'Connect', href: '#contact' },
  ];

  const cvLink = language === 'en' ? '/CV/Dhaivat_Joshi_Resume_en_print.pdf' : '/CV/Dhaivat_Joshi_Resume_de_print.pdf';

  return (
    <header className={`navbar-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="container nav-container">
        <a href="#" className="nav-brand">
          <div className="brand-dot"></div>
          DHAIVAT.
        </a>

        {/* Desktop Nav */}
        <div className="nav-desktop">
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-item">
                {link.name}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button onClick={toggleLanguage} className="lang-switcher">
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>
            <a href={cvLink} target="_blank" rel="noreferrer" className="btn-primary nav-cv">
              <span>{language === 'en' ? 'Resume' : 'Lebenslauf'}</span>
              <Download size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-content">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="mobile-divider"></div>
          <button onClick={toggleLanguage} className="mobile-item lang-item">
            <Globe size={24} />
            <span>Switch to {language === 'en' ? 'German' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
