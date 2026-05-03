import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, MapPin, Mail, Loader2, Github, Linkedin, Instagram, Youtube } from 'lucide-react';
import './Contact.css';

const scriptURL = 'https://script.google.com/macros/s/AKfycbwC_tYn5pyEFKkWjrzwotZUfojRowbvGJtsj3-6DmYSguJrKhE0W0ObWBJAUTSoPR8/exec';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const now = new Date();
    formData.append('DateTime', now.toLocaleString());

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(() => {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((error) => {
        console.error('Error!', error.message);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-highlight">{language === 'en' ? 'Start' : 'Projekt'}</span> a Project
        </h2>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3 className="info-title">
              {language === 'en' ? "Let's build something incredible together." : "Lassen Sie uns gemeinsam etwas Unglaubliches bauen."}
            </h3>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon glass-panel"><Mail /></div>
                <div>
                  <p className="info-label">{language === 'en' ? 'Email' : 'E-Mail'}</p>
                  <a href="mailto:dhaivatjoshi0106@gmail.com" className="info-value">dhaivatjoshi0106@gmail.com</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon glass-panel"><MapPin /></div>
                <div>
                  <p className="info-label">{language === 'en' ? 'Location' : 'Standort'}</p>
                  <p className="info-value">Magdeburg, Germany</p>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/Dhaivatjoshi" target="_blank" rel="noopener noreferrer" className="contact-social-icon" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/dhaivatjoshi-jd/" target="_blank" rel="noopener noreferrer" className="contact-social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/justelectronicx?igsh=ODRsamQzdWJzbHc5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="contact-social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@JustElectronicX" target="_blank" rel="noopener noreferrer" className="contact-social-icon" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <form className="contact-form glass-panel" onSubmit={handleSubmit} name="submit-to-google-sheet">
            <div className="input-group">
              <label htmlFor="Name">{language === 'en' ? 'Name' : 'Name'}</label>
              <input type="text" name="Name" id="Name" required placeholder="John Doe" />
            </div>

            <div className="input-group">
              <label htmlFor="Email">{language === 'en' ? 'Email' : 'E-Mail'}</label>
              <input type="email" name="Email" id="Email" required placeholder="john@example.com" />
            </div>

            <div className="input-group">
              <label htmlFor="Message">{language === 'en' ? 'Message' : 'Nachricht'}</label>
              <textarea name="Message" id="Message" rows={5} required placeholder={language === 'en' ? 'How can I help you?' : 'Wie kann ich Ihnen helfen?'}></textarea>
            </div>

            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
              <span>
                {status === 'loading' ? (
                  <Loader2 className="spinner" />
                ) : language === 'en' ? 'Send Message' : 'Nachricht senden'}
              </span>
              {status !== 'loading' && <Send size={18} />}
            </button>

            {status === 'success' && (
              <p className="status-msg success">
                {language === 'en' ? 'Message sent successfully!' : 'Nachricht erfolgreich gesendet!'}
              </p>
            )}
            {status === 'error' && (
              <p className="status-msg error">
                {language === 'en' ? 'Something went wrong.' : 'Etwas ist schief gelaufen.'}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
