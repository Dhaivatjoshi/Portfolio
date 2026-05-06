import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Zap, Github, Linkedin, Instagram, Youtube, Mail, Terminal, Coffee, Moon, Repeat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth > 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <section className="hero-section">
      <div className="container hero-inner">

        {/* ── LEFT: Text ───────────────────────────── */}
        <div className="hero-text-col">
          <div className="hero-badge glass-panel">
            <div className="badge-pulse"></div>
            {language === 'en' ? 'Available for new opportunities' : 'Verfügbar für neue Projekte'}
          </div>

          <h1 className="hero-heading">
            Embedded Systems
            <br />
            <span className="text-gradient">&amp; Low-Level Dev</span>
          </h1>

          <p className="hero-subtext">
            {language === 'en'
              ? 'I design and develop embedded systems, from PCB design to firmware, with a focus on practical and reliable solutions.'
              : 'Ich entwickle Embedded-Systeme von der Leiterplatte bis zur Firmware mit Fokus auf praktische und zuverlässige Lösungen.'}
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

          {/* Stats grid */}
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
        {/* ── END LEFT ─────────────────────────────── */}

        {/* ── RIGHT: Routine Diagram (desktop only) ── */}
        {isDesktop && (
          <div className="hero-visual" aria-hidden="true">
            <div className="diagram-wrapper">
              <svg className="diagram-svg" viewBox="0 0 480 480" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </marker>
                </defs>

                {/* Orbit ring */}
                <circle cx="240" cy="240" r="148" fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="1" strokeDasharray="3 7" />

                {/* Centre */}
                <text className="diag-ct" x="240" y="233" textAnchor="middle">while</text>
                <text className="diag-ct" x="240" y="248" textAnchor="middle">(alive)</text>

                {/* ── EAT — flat-top hexagon (top) ── */}
                <g className="diag-node diag-eat">
                  <polygon points="175,57 305,57 325,92 305,127 175,127 155,92" />
                  <text className="diag-em" x="240" y="78" textAnchor="middle" dominantBaseline="central">☕</text>
                  <text className="diag-nt" x="240" y="100" textAnchor="middle" dominantBaseline="central">EAT</text>
                  <text className="diag-ns" x="240" y="116" textAnchor="middle" dominantBaseline="central">Fuel for Logic</text>
                </g>

                {/* ── SLEEP — pill (right) ── */}
                <g className="diag-node diag-sleep">
                  <rect x="314" y="204" width="148" height="72" rx="36" />
                  <text className="diag-em" x="388" y="229" textAnchor="middle" dominantBaseline="central">🌙</text>
                  <text className="diag-nt" x="388" y="248" textAnchor="middle" dominantBaseline="central">SLEEP</text>
                  <text className="diag-ns" x="388" y="263" textAnchor="middle" dominantBaseline="central">Recharge</text>
                </g>

                {/* ── CODE — chamfered octagon (bottom) ── */}
                <g className="diag-node diag-code">
                  <polygon points="166,360 314,360 334,388 314,416 166,416 146,388" />
                  <text className="diag-em" x="240" y="372" textAnchor="middle" dominantBaseline="central">⌨️</text>
                  <text className="diag-nt" x="240" y="392" textAnchor="middle" dominantBaseline="central">CODE</text>
                  <text className="diag-ns" x="240" y="408" textAnchor="middle" dominantBaseline="central">Fix · Build · Ship</text>
                </g>

                {/* ── REPEAT — diamond (left) ── */}
                <g className="diag-node diag-repeat">
                  <polygon points="92,180 152,240 92,300 32,240" />
                  <text className="diag-em" x="92" y="224" textAnchor="middle" dominantBaseline="central">🔁</text>
                  <text className="diag-nt" x="92" y="246" textAnchor="middle" dominantBaseline="central">REPEAT</text>
                  <text className="diag-ns" x="92" y="262" textAnchor="middle" dominantBaseline="central">↻ loop()</text>
                </g>

                {/* EAT → SLEEP */}
                <path className="wire-glow eat-wire" d="M 318,114 Q 395,145 388,204" />
                <path className="wire-line eat-wire" d="M 318,114 Q 395,145 388,204" markerEnd="url(#arr)" />

                {/* SLEEP → CODE */}
                <path className="wire-glow sleep-wire" d="M 355,274 Q 370,345 314,360" />
                <path className="wire-line sleep-wire" d="M 355,274 Q 370,345 314,360" markerEnd="url(#arr)" />

                {/* CODE → REPEAT */}
                <path className="wire-glow code-wire" d="M 158,410 Q 100,400 92,300" />
                <path className="wire-line code-wire" d="M 158,410 Q 100,400 92,300" markerEnd="url(#arr)" />

                {/* REPEAT → EAT */}
                <path className="wire-glow repeat-wire" d="M 92,180 Q 100,100 162,94" />
                <path className="wire-line repeat-wire" d="M 92,180 Q 100,100 162,94" markerEnd="url(#arr)" />
              </svg>
            </div>
          </div>
        )}
        {/* ── END RIGHT ────────────────────────────── */}

      </div>
    </section>
  );
};

export default Hero;