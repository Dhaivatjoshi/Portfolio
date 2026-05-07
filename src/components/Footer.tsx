import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const lastUpdated = new Date('2026-05-07').toLocaleDateString(language === 'en' ? 'en-GB' : 'de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <footer className="footer-section">
      <div className="footer-divider"></div>
      <div className="container footer-content">
        <div className="footer-bottom">
          {/* <div className="footer-copyright">
            © {currentYear} Dhaivat Joshi. {language === 'en' ? 'All rights reserved.' : 'Alle Rechte vorbehalten.'}
          </div> */}

          <div className="footer-made-with">
            {language === 'en' ? 'Made with' : 'Erstellt mit'}{' '}
            <Heart size={16} className="heart-icon" />{' '}
            {language === 'en' ? 'and precision engineering' : 'und Präzisionstechnik'}
          </div>

          <div className="footer-last-updated">
            {language === 'en' ? 'Last updated' : 'Zuletzt aktualisiert'}{': '}
            <span className="footer-last-updated-date">{lastUpdated}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
