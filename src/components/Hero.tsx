import React from 'react';
import { ArrowRight, Cpu, Zap, Github, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="hero-section">
      <div className="container hero-content">

        <div className="hero-badge glass-panel">
          <div className="badge-pulse"></div>
          {language === 'en' ? 'Available for new opportunities' : 'Verfügbar für neue Projekte'}
        </div>

        <h1 className="hero-heading">
          Embedded Systems
          <br />
          <span className="text-gradient">& Low-Level Development</span>
        </h1>

        <p className="hero-subtext">
          {language === 'en'
            ? "I design and develop embedded systems, from PCB design to firmware, with a focus on practical and reliable solutions."
            : "Ich entwickle Embedded-Systeme von der Leiterplatte bis zur Firmware mit Fokus auf praktische und zuverlässige Lösungen."}
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            <span>{language === 'en' ? 'Explore Projects' : 'Projekte erkunden'}</span>
            <ArrowRight size={18} />
          </a>

          <div className="hero-socials">
            <a href="https://github.com/Dhaivatjoshi" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/dhaivatjoshi-jd/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
            <a href="https://www.instagram.com/justelectronicx?igsh=ODRsamQzdWJzbHc5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="https://www.youtube.com/@JustElectronicX" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <Youtube size={22} />
            </a>
            <a href="mailto:dhaivatjoshi0106@gmail.com" className="social-icon" aria-label="Email">
              <Mail size={22} />
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item glass-panel">
            <Cpu className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">Microcontrollers</span>
              <span className="stat-label">Embedded Control</span>
            </div>
          </div>

          <div className="stat-item glass-panel">
            <Zap className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">MQTT / Serial / WiFi</span>
              <span className="stat-label">Communication</span>
            </div>
          </div>

          <div className="stat-item glass-panel">
            <Zap className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">KiCad</span>
              <span className="stat-label">PCB Design</span>
            </div>
          </div>

          <div className="stat-item glass-panel">
            <Cpu className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">ROS2 / micro-ROS</span>
              <span className="stat-label">Robotics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
