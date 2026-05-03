import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Layers, Terminal, Cpu, PenTool } from 'lucide-react';
import './Skills.css';

const Skills: React.FC = () => {
  const { language } = useLanguage();

  const skillCategories = [
    {
      title: language === 'en' ? 'Embedded Software' : 'Embedded Software',
      icon: <Terminal className="cat-icon" />,
      skills: ['Embedded C', 'C++', 'FreeRTOS', 'Micro-ROS', 'Python']
    },
    {
      title: language === 'en' ? 'PCB Design & Architecture' : 'Leiterplattendesign',
      icon: <PenTool className="cat-icon" />,
      skills: ['KiCAD', 'EASYEDA', 'Schematic Design', 'Upto 4-Layer Layouts', 'Symbol & Footprint Creation']
    },
    {
      title: language === 'en' ? 'Hardware & Sensors' : 'Hardware & Sensoren',
      icon: <Cpu className="cat-icon" />,
      skills: ['ESP32', "AVR Microcontrollers", 'Raspberry Pi', 'Robotics Integration', 'Communication Protocols']
    },
    {
      title: language === 'en' ? 'Web Technologies' : 'Web-Technologien',
      icon: <Layers className="cat-icon" />,
      skills: ['HTML', 'CSS', 'PHP', 'React', 'TypeScript']
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-highlight">{language === 'en' ? 'Core' : 'Kern'}</span> Expertise
        </h2>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel skill-card">
              <div className="skill-header">
                <div className="icon-wrapper glass-panel">{cat.icon}</div>
                <h3>{cat.title}</h3>
              </div>

              <ul className="skill-list">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx}>
                    <span className="bullet"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
