import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, GraduationCap, ExternalLink } from 'lucide-react';
import './Experience.css';

const Experience: React.FC = () => {
  const { language } = useLanguage();

  const experiences = [
    {
      role: language === 'en' ? 'Embedded Software Developer | PCB Designer' : 'Embedded Software Entwickler | PCB Designer',
      company: 'enord',
      link: 'https://enord.co/',
      date: '05/2025 - 07/2025 | Delhi, India',
      type: 'exp'
    },
    {
      role: language === 'en' ? 'Embedded Software Developer' : 'Embedded Software Entwickler',
      company: 'InSignEx',
      link: 'https://www.insignex.com/index.html',
      date: '06/2021 - 10/2023 | Anand, India',
      type: 'exp'
    },
    {
      role: language === 'en' ? 'Project Internship' : 'Praktikum im Projekt',
      company: 'InSignEx',
      link: 'https://www.insignex.com/index.html',
      date: '01/2021 - 05/2021 | Anand, India',
      type: 'exp'
    }
  ];

  const education = [
    {
      degree: language === 'en' ? "Master’s Degree in Electrical Engineering & IT" : "Masterabschluss in Elektrotechnik & IT",
      school: 'Otto-von-Guericke University',
      link: 'https://www.ovgu.de/',
      date: '10/2023 - Present | Magdeburg, Germany',
      type: 'edu'
    },
    {
      degree: language === 'en' ? 'Bachelor of Engineering in Electronics and Communication' : 'B.E in Nachrichtenelektronik und Kommunikation',
      school: 'CHARUSAT University',
      link: 'https://www.charusat.ac.in/',
      date: '06/2017 - 05/2021 | Anand, India',
      type: 'edu'
    }
  ];

  return (
    <section id="experience" className="timeline-section">
      <div className="container">

        <div className="timeline-grid">

          {/* Experience Column */}
          <div className="timeline-column">
            <h2 className="timeline-title">
              <Briefcase className="title-icon" />
              {language === 'en' ? 'Experience' : 'Erfahrung'}
            </h2>
            <div className="timeline-path">
              {experiences.map((item, idx) => (
                <div key={idx} className="timeline-item glass-panel">
                  <div className="timeline-dot"></div>
                  <h3 className="item-role">{item.role}</h3>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="item-company">
                    {item.company} <ExternalLink size={14} />
                  </a>
                  <p className="item-date">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="timeline-column">
            <h2 className="timeline-title">
              <GraduationCap className="title-icon" />
              {language === 'en' ? 'Education' : 'Ausbildung'}
            </h2>
            <div className="timeline-path">
              {education.map((item, idx) => (
                <div key={idx} className="timeline-item glass-panel">
                  <div className="timeline-dotedu"></div>
                  <h3 className="item-role">{item.degree}</h3>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="item-company">
                    {item.school} <ExternalLink size={14} />
                  </a>
                  <p className="item-date">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
