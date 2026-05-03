import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BoardViewer } from './BoardViewer';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { LazyImage } from './LazyImage';
import './Projects.css';

// ─── Project Data ────────────────────────────────────────────────────────────
// TODO: Replace placeholder titles, descriptions, and tags with real project details.

// Each project can have multiple media items (images or videos).
// If `media` is empty or not set, the card thumbnail is used as the only item.
export interface MediaItem {
  type: 'image' | 'video';
  src: string;          // path relative to /public, e.g. '/images/project/IMG_1b.jpg'
  caption?: string;     // optional caption shown below the media
}

interface Project {
  id: number;
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
  tags: string[];
  category: 'Power Electronics' | 'MCU Boards' | 'Sensor Modules' | 'RF & Wireless' | 'Motor Control';
  image: string;        // thumbnail shown on the card grid
  media?: MediaItem[];  // TODO: add extra photos/videos per project here
}

const projectData: Project[] = [
  {
    id: 1,
    title: 'GPS Data Logger',
    titleDe: 'GPS-Datenlogger',
    description: `• The paper introduces a GPS Data Logger that utilizes Arduino and an SD card to read and log GPS location and time
• The system consists of an Arduino Uno, a GPS receiver, an SD card module, and a voltage regulator
• The Arduino Uno is used to control the system, the GPS receiver is used to obtain the current location, the SD card module is used to store the logged data, and the voltage regulator is used to provide a stable power supply for the system
• The system was tested in different locations and proved to accurately log the location and time of each point
• The system is capable of storing up to 1000 points before requiring a reset
• The solution provided by this paper is cost-effective for GPS data logging using Arduino and an SD card`,
    descriptionDe: `• Die Arbeit stellt einen GPS-Datenlogger vor, der Arduino und eine SD-Karte verwendet, um GPS-Ort und Zeit zu erfassen
• Das System besteht aus einem Arduino Uno, einem GPS-Empfänger, einem SD-Kartenmodul und einem Spannungsregler
• Der Arduino Uno steuert das System, der GPS-Empfänger ermittelt den aktuellen Standort, das SD-Kartenmodul speichert die Daten und der Regler liefert eine stabile Stromversorgung
• Das System wurde an verschiedenen Orten getestet und protokollierte zuverlässig Ort und Zeit
• Das System kann bis zu 1000 Punkte speichern, bevor ein Reset erforderlich ist
• Diese Lösung ist kostengünstig für die GPS-Datenaufzeichnung mittels Arduino und SD-Karte`,
    tags: ['Arduino', 'GPS', 'SD Card', 'Data Logging'],
    category: 'MCU Boards',
    image: '/images/project/IMG_1.jpg',
    media: [
      { type: 'image', src: '/images/project/IMG_1.jpg' },
      { type: 'image', src: '/images/project/IMG_1A.jpg' },
      { type: 'image', src: '/images/project/IMG_1B.jpg' },
      // { type: 'video', src: '/videos/project_1_demo.mp4', caption: 'Working prototype demonstration' }
    ]
  },
  {
    id: 2,
    title: 'Smart Helmet Module',
    titleDe: 'Smartes Helm-Modul',
    description: `• The project involves an automatic accident detection module mounted on a helmet
• The module is designed to detect accidents and trigger an alarm
• A mobile application is integrated with the module to inform predefined emergency contact numbers
• The mobile application provides all details of the victim including their live location
• The system is designed to ensure prompt emergency response and minimize the severity of injuries resulting from accidents`,
    descriptionDe: `• Das Projekt umfasst ein automatisches Unfallerkennungsmodul, das an einem Helm montiert ist
• Das Modul ist darauf ausgelegt, Unfälle zu erkennen und einen Alarm auszulösen
• Eine mobile Anwendung ist integriert, um vordefinierte Notfallkontakte zu informieren
• Die mobile Anwendung liefert alle Details des Opfers, einschließlich seines Live-Standorts
• Das System sorgt für eine schnelle Notfallreaktion und minimiert die Schwere von Verletzungen`,
    tags: ['Accident Detection', 'IoT', 'Mobile App', 'Safety'],
    category: 'Sensor Modules',
    image: '/images/project/IMG_2.jpg',
    media: [
      { type: 'image', src: '/images/project/IMG_2.jpg' },
      { type: 'image', src: '/images/project/IMG_2A.jpg' },
      { type: 'image', src: '/images/project/IMG_2B.jpg' },
    ]
  },
  {
    id: 3,
    title: 'RGB Touch Plant Using Arduino',
    titleDe: 'RGB-Touch-Pflanze mit Arduino',
    description: `• Built an RGB Touch plant to be controlled by an Arduino Pro Mini
• The device requires 3 RGB-LED strips and 3 npn transistors to control 12v RGB led strips
• Requires several passive components and a 3v3 LDO to convert 12v to 3.3v to power the controller
• Features of the project include up to 20 different static colours, 1 random fade in-fade-out animation, and capacitive touch sensing
• Optional IR controller also included
• The project utilizes capacitive touch, and the Arduino detects the conductive object when someone touches the plant leaves, which results in a change in the RGB LED colour. The RGB light can also be controlled via the IR Remote`,
    descriptionDe: `• Entwicklung einer RGB-Touch-Pflanze, die von einem Arduino Pro Mini gesteuert wird
• Das Gerät benötigt 3 RGB-LED-Streifen und 3 npn-Transistoren zur Steuerung von 12V-LED-Streifen
• Verwendet passive Komponenten und einen 3v3 LDO zur Stromversorgung des Controllers
• Das Projekt bietet bis zu 20 statische Farben, 1 zufällige Fade-Animation und kapazitive Berührungserkennung
• Ein optionaler IR-Controller ist ebenfalls enthalten
• Berührt jemand die Pflanzenblätter, erkennt der Arduino dies über kapazitive Berührung und ändert die LED-Farbe. Das Licht kann auch per IR-Fernbedienung gesteuert werden`,
    tags: ['Arduino Pro Mini', 'Capacitive Touch', 'RGB LED', 'IR Remote'],
    category: 'MCU Boards',
    image: '/images/project/IMG_3.jpg',
    media: [
      { type: 'image', src: '/images/project/IMG_3.jpg' },
      { type: 'image', src: '/images/project/IMG_3A.jpg' },
    ]
  },
  {
    id: 4,
    title: 'Third Eye',
    titleDe: 'Drittes Auge',
    description: `• Third Eye for the Blind is an innovative device that helps visually impaired people navigate their surroundings
• The device uses ultrasonic waves to detect nearby obstacles and alerts the user through a buzzer sound or vibration
• It is a multidisciplinary project that involves the fields of computer science, electronics engineering, and health science
• The device provides blind people with increased speed and confidence in their ability to travel independently
• When the sensor detects an object, the user is immediately notified through a beep or vibration, allowing them to react accordingly
• The device is fully automated and does not require any manual operation, making it easy and convenient for the user
• Third Eye for the Blind has the potential to significantly improve the quality of life for visually impaired individuals by enabling them to travel to different places with greater ease and safety`,
    descriptionDe: `• Third Eye for the Blind ist ein innovatives Gerät, das sehbehinderten Menschen hilft, sich in ihrer Umgebung zurechtzufinden
• Das Gerät nutzt Ultraschallwellen zur Hinderniserkennung und warnt den Benutzer durch einen Summton oder Vibration
• Ein multidisziplinäres Projekt aus den Bereichen Informatik, Elektronik und Gesundheitswissenschaften
• Das Gerät gibt blinden Menschen mehr Geschwindigkeit und Selbstvertrauen beim unabhängigen Reisen
• Wenn der Sensor ein Objekt erkennt, wird der Benutzer sofort benachrichtigt, um entsprechend reagieren zu können
• Das Gerät ist vollautomatisiert und erfordert keine manuelle Bedienung
• Es hat das Potenzial, die Lebensqualität von Sehbehinderten deutlich zu verbessern`,
    tags: ['Ultrasonic', 'Accessibility', 'Sensor', 'Vibration'],
    category: 'Sensor Modules',
    image: '/images/project/IMG_4.jpg',
  },
  {
    id: 5,
    title: 'Voice Activated Scrolling Display',
    titleDe: 'Sprachgesteuerte Laufschrift-Anzeige',
    description: `• Developed an IoT Voice-activated scrolling display using Node MCU (ESP8266) and P10 LED matrix panels, allowing wireless control via an Android app
• Designed schematic and PCB layouts using KiCad and fabricated the PCB using the Ferric Chloride etching process for efficient prototyping
• Utilized MQTT protocol for global connectivity, enabling remote updates and live control of the display over the internet from any location
• Developed a customized Android app in Kodular for seamless voice-command functionality, supporting dynamic content updates on the LED display with high visibility and user flexibility`,
    descriptionDe: `• Entwicklung einer sprachgesteuerten IoT-Laufschrift-Anzeige mit Node MCU (ESP8266) und P10 LED-Matrix-Panels, drahtlos steuerbar über eine Android-App
• Schaltplan- und PCB-Layout-Design mit KiCad sowie PCB-Fertigung durch Eisen-III-Chlorid-Ätzverfahren für effizientes Prototyping
• Nutzung des MQTT-Protokolls für globale Konnektivität, was Remote-Updates und Live-Steuerung über das Internet ermöglicht
• Entwicklung einer maßgeschneiderten Android-App in Kodular für nahtlose Sprachbefehle und dynamische Inhaltsaktualisierungen`,
    tags: ['ESP8266', 'P10 Matrix', 'MQTT', 'Voice Control'],
    category: 'MCU Boards',
    image: '/images/project/IMG_5.jpg',
  },
  {
    id: 6,
    title: 'USBASP AVR Programmer',
    titleDe: 'USBASP AVR-Programmiergerät',
    description: `• USBasp is an in-circuit programmer designed for Atmel AVR controllers
• It utilizes an ATMega88 or ATMega8 microcontroller along with a few passive components
• The programmer uses a firmware-only USB driver, eliminating the need for a special USB controller
• In System Programming (ISP) is the preferred method for programming AVR microcontrollers as it allows them to be programmed in-circuit
• AVR ISP is the tool used for programming AVR microcontrollers
• Arduino boards utilize the simplest and cheapest options for AVR ISP programming`,
    descriptionDe: `• USBasp ist ein In-Circuit-Programmiergerät für Atmel AVR-Controller
• Es verwendet einen ATMega88- oder ATMega8-Mikrocontroller sowie einige passive Komponenten
• Das Gerät nutzt einen reinen Firmware-USB-Treiber und benötigt keinen speziellen USB-Controller
• In System Programming (ISP) ist die bevorzugte Methode, da AVR-Mikrocontroller in der Schaltung programmiert werden können
• AVR ISP ist das Standardwerkzeug für die AVR-Programmierung
• Arduino-Boards verwenden die einfachsten und günstigsten Optionen für die AVR ISP-Programmierung`,
    tags: ['AVR', 'ISP', 'USBasp', 'ATMega8'],
    category: 'MCU Boards',
    image: '/images/project/IMG_6.jpg',
  },
  {
    id: 7,
    title: 'IOT, Bluetooth and IR Controlled Home Automation',
    titleDe: 'IoT-, Bluetooth- und IR-gesteuerte Hausautomation',
    description: `• Designed and developed an Atmega328p microcontroller-based home automation system, which consists of 10 relays controlling various home appliances. The system can be controlled by a Bluetooth app. The app was created using the Kodular platform. The system uses an HC-05 module for Bluetooth communication and also includes an IR receiver module for additional control options
• Designed and developed an ESP8266 microcontroller-based IOT home automation system, which consists of 4 relays and 1 fan speed control module. The system can be controlled by Google Assistant and Blynk APP
• Both IOT and Bluetooth-based home automation systems can also be controlled manually`,
    descriptionDe: `• Entwicklung eines Atmega328p-basierten Hausautomationssystems mit 10 Relais zur Steuerung diverser Haushaltsgeräte. Das System wird über eine mit Kodular erstellte Bluetooth-App gesteuert. Zur Kommunikation wird ein HC-05-Modul genutzt; ein IR-Empfänger bietet zusätzliche Optionen
• Entwicklung eines ESP8266-basierten IoT-Systems mit 4 Relais und 1 Lüfterdrehzahl-Steuermodul. Steuerbar über Google Assistant und die Blynk-App
• Beide Systeme lassen sich zudem vollständig manuell steuern`,
    tags: ['IoT', 'Home Automation', 'Bluetooth', 'ESP8266'],
    category: 'Power Electronics',
    image: ' images/project/IMG_7.jpg',

  },
  {
    id: 8,
    title: 'IOT SPY ROBOT',
    titleDe: 'IoT Spionage-Roboter',
    description: `• Spy robots are compact, remotely controlled robots equipped with a CCD camera and LED lighting for video transmission, even in dark areas.
• They include a wireless camera, antenna, batteries, and four Omni wheels for enhanced mobility.
• Radio Frequency modules enable wireless control via two PIC microcontrollers, managing motor functions.
• Three Brush DC motors are driven by dual L298N modules for efficient movement control.`,
    descriptionDe: `• Spionageroboter sind kompakte, ferngesteuerte Roboter mit CCD-Kamera und LED-Beleuchtung zur Videoübertragung, selbst in dunklen Bereichen.
• Sie verfügen über eine drahtlose Kamera, Antenne, Batterien und vier Omni-Räder für verbesserte Mobilität.
• RF-Module ermöglichen die drahtlose Steuerung über zwei PIC-Mikrocontroller, die die Motorfunktionen verwalten.
• Drei DC-Bürstenmotoren werden über zwei L298N-Module für effiziente Bewegungssteuerung angetrieben.`,
    tags: ['Robotics', 'IoT', 'Wireless Video', 'Motor Control'],
    category: 'Motor Control',
    image: '/images/project/IMG_8.jpg',
  },
];

const ALL_CATEGORIES = ['All', 'Power Electronics', 'MCU Boards', 'Sensor Modules', 'RF & Wireless', 'Motor Control'] as const;
type FilterCategory = typeof ALL_CATEGORIES[number];

// ─── Component ────────────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'gallery' | 'pcb-design'>('gallery');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lbMediaIdx, setLbMediaIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeBoardIdx, setActiveBoardIdx] = useState(0);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? projectData
      : projectData.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  // Build the active media list: use project.media if defined, else fall back to thumbnail
  const lbMedia: MediaItem[] = selectedProject
    ? (selectedProject.media?.length
      ? selectedProject.media
      : [{ type: 'image', src: selectedProject.image }])
    : [];

  const handleOpen = (project: Project) => {
    setSelectedProject(project);
    setLbMediaIdx(0);
  };
  const handleClose = () => setSelectedProject(null);
  const lbPrev = (e: React.MouseEvent) => { e.stopPropagation(); setLbMediaIdx(i => (i - 1 + lbMedia.length) % lbMedia.length); };
  const lbNext = (e: React.MouseEvent) => { e.stopPropagation(); setLbMediaIdx(i => (i + 1) % lbMedia.length); };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, filteredProjects.length));
  };

  // Reset visible count on filter change
  const handleFilterChange = (cat: FilterCategory) => {
    setActiveFilter(cat);
    setVisibleCount(8);
  };

  // PCB Design tab data — add more boards here
  // TODO: Replace placeholder specs with your real design details
  const pcbFeatures = [
    {
      name: 'Non-Isolated AC-DC Power Supply',
      modelUrl: '/models/pcb.gltf',
      schematic: '/images/schematic.jpg',
      layout: '/images/layout.jpg',
      specs: {
        layers: '2-Layer',
        dimensions: '65 × 45 mm',
        components: '38 SMD + 12 THT',
        software: 'KiCad 7',
        designTime: '~3 weeks',
        status: 'Prototype tested ✓',
        highlight: 'Achieved >88% efficiency at full load with onboard NTC thermal protection and EMI filter stage.',
      },
    },
    // {
    //   name: 'STM32 Dev Board',
    //   modelUrl: '/models/pcb2.gltf',
    //   schematic: '/images/schematic2.jpg',
    //   layout: '/images/layout2.jpg',
    //   specs: { layers: '4-Layer', dimensions: '80 × 60 mm', components: '72 SMD', software: 'KiCad 7', designTime: '~5 weeks', status: 'Production v1.1', highlight: '...' },
    // },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-highlight">{language === 'en' ? 'Hardware' : 'Hardware'}</span>{' '}
          {language === 'en' ? 'Projects & Design' : 'Projekte & Design'}
        </h2>

        <p className="projects-subtitle">
          {language === 'en'
            ? 'A showcase of my PCB designs, interactive 3D board visualizations, and hardware schematics.'
            : 'Ein Schaufenster meiner Leiterplattendesigns, interaktiven 3D-Board-Visualisierungen und Hardware-Schaltpläne.'}
        </p>

        {/* ── Main Tabs ──────────────────────────────────────────────── */}
        <div className="project-tabs">
          <button
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            {language === 'en' ? 'Projects' : 'Projekte'}
          </button>
          <button
            className={`tab-btn ${activeTab === 'pcb-design' ? 'active' : ''}`}
            onClick={() => setActiveTab('pcb-design')}
          >
            {language === 'en' ? 'PCB Deep Dive' : 'PCB Detailansicht'}
          </button>
        </div>

        {/* ── Tab 1: Gallery ─────────────────────────────────────────── */}
        {activeTab === 'gallery' && (
          <div className="gallery-wrapper fade-in">

            {/* Category Filter Bar */}
            <div className="category-filter-bar">
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-chip ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project count indicator */}
            <p className="results-count">
              {language === 'en'
                ? `Showing ${Math.min(visibleCount, filteredProjects.length)} of ${filteredProjects.length} projects`
                : `${Math.min(visibleCount, filteredProjects.length)} von ${filteredProjects.length} Projekten`}
            </p>

            {/* Grid */}
            <div className="project-grid">
              {filteredProjects.slice(0, visibleCount).map((project) => (
                <div
                  key={project.id}
                  className="project-card glass-panel"
                  onClick={() => handleOpen(project)}
                >
                  <div className="card-image-wrapper">
                    <LazyImage src={project.image} alt={project.title} />
                    <div className="card-overlay">
                      <span className="view-text">View Details</span>
                    </div>
                    {/* Category badge */}
                    <span className="card-category-badge">{project.category}</span>
                  </div>

                  <div className="card-body">
                    <h3 className="card-title">
                      {language === 'en' ? project.title : project.titleDe}
                    </h3>
                    <p className="card-description">
                      {language === 'en' ? project.description : project.descriptionDe}
                    </p>
                    <div className="card-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredProjects.length && (
              <div className="load-more-wrapper">
                <button onClick={handleLoadMore} className="load-more-btn">
                  {language === 'en' ? 'Load More' : 'Mehr laden'}
                  <span className="load-more-count">
                    +{Math.min(8, filteredProjects.length - visibleCount)}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 2: PCB Deep Dive ────────────────────────────────────── */}
        {activeTab === 'pcb-design' && (
          <div className="pcb-dive-wrapper fade-in">

            {/* Board selector pills */}
            {pcbFeatures.length > 1 && (
              <div className="board-selector">
                {pcbFeatures.map((board, idx) => (
                  <button
                    key={idx}
                    className={`board-select-btn ${activeBoardIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveBoardIdx(idx)}
                  >
                    {board.name}
                  </button>
                ))}
              </div>
            )}

            {/* Board name heading */}
            <h3 className="pcb-board-title">
              {pcbFeatures[activeBoardIdx].name}
            </h3>

            {/* ── Row 1: Schematic ↔ Layout + Specs ── */}
            <div className="pcb-top-row">
              <div className="pcb-slider-panel">
                <p className="pcb-panel-label">
                  <span className="pcb-label-dot" />
                  {language === 'en' ? 'Schematic  ↔  PCB Layout — drag to compare' : 'Schaltplan  ↔  Layout — ziehen zum Vergleich'}
                </p>
                <BeforeAfterSlider
                  beforeImg={pcbFeatures[activeBoardIdx].schematic}
                  afterImg={pcbFeatures[activeBoardIdx].layout}
                />
              </div>

              <div className="pcb-spec-panel glass-panel">
                <h4 className="pcb-spec-title">
                  {language === 'en' ? 'Board Specifications' : 'Platinen-Spezifikationen'}
                </h4>

                <ul className="pcb-spec-list">
                  <li><span className="spec-key">🔲 Layers</span><span className="spec-val">{pcbFeatures[activeBoardIdx].specs.layers}</span></li>
                  <li><span className="spec-key">📐 Dimensions</span><span className="spec-val">{pcbFeatures[activeBoardIdx].specs.dimensions}</span></li>
                  <li><span className="spec-key">⚙️ Components</span><span className="spec-val">{pcbFeatures[activeBoardIdx].specs.components}</span></li>
                  <li><span className="spec-key">🛠 Software</span><span className="spec-val">{pcbFeatures[activeBoardIdx].specs.software}</span></li>
                  <li><span className="spec-key">⏱ Design Time</span><span className="spec-val">{pcbFeatures[activeBoardIdx].specs.designTime}</span></li>
                  <li><span className="spec-key">✅ Status</span><span className="spec-val spec-status">{pcbFeatures[activeBoardIdx].specs.status}</span></li>
                </ul>

                <div className="pcb-highlight-box">
                  <span className="pcb-highlight-icon">💡</span>
                  <p>{pcbFeatures[activeBoardIdx].specs.highlight}</p>
                </div>
              </div>
            </div>

            {/* ── Row 2: 3D Viewer ── */}
            <div className="pcb-3d-row">
              <p className="pcb-panel-label">
                <span className="pcb-label-dot" />
                {language === 'en' ? 'Interactive 3D Model — rotate, zoom & pan' : 'Interaktives 3D-Modell — drehen, zoomen & verschieben'}
              </p>
              <BoardViewer modelUrl={pcbFeatures[activeBoardIdx].modelUrl} />
            </div>

          </div>
        )}
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {selectedProject && (
        <div className="lightbox" onClick={handleClose}>
          <div className="lightbox-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={handleClose}>×</button>

            {/* LEFT: Media Carousel */}
            <div className="lightbox-image-panel">
              <div className="lb-main-media">
                {lbMedia[lbMediaIdx]?.type === 'video' ? (
                  <video
                    key={lbMedia[lbMediaIdx].src}
                    src={lbMedia[lbMediaIdx].src}
                    controls
                    autoPlay
                    className="lb-video"
                  />
                ) : (
                  <img
                    key={lbMedia[lbMediaIdx]?.src}
                    src={lbMedia[lbMediaIdx]?.src}
                    alt={selectedProject.title}
                    className="lb-img"
                  />
                )}

                {/* Caption */}
                {lbMedia[lbMediaIdx]?.caption && (
                  <p className="lb-caption">{lbMedia[lbMediaIdx].caption}</p>
                )}

                {/* Arrow navigation — only when > 1 media item */}
                {lbMedia.length > 1 && (
                  <>
                    <button className="lb-arrow lb-arrow-left" onClick={lbPrev}>&#8249;</button>
                    <button className="lb-arrow lb-arrow-right" onClick={lbNext}>&#8250;</button>
                    <span className="lb-counter">{lbMediaIdx + 1} / {lbMedia.length}</span>
                  </>
                )}
              </div>

              {/* Thumbnail strip — only when > 1 media item */}
              {lbMedia.length > 1 && (
                <div className="lb-thumb-strip">
                  {lbMedia.map((m, i) => (
                    <button
                      key={i}
                      className={`lb-thumb ${i === lbMediaIdx ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setLbMediaIdx(i); }}
                    >
                      {m.type === 'video' ? (
                        <span className="lb-thumb-play">▶</span>
                      ) : (
                        <img src={m.src} alt={`view ${i + 1}`} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Project Info */}
            <div className="lightbox-info-panel">
              <span className="lightbox-category">{selectedProject.category}</span>
              <h3 className="lightbox-title">
                {language === 'en' ? selectedProject.title : selectedProject.titleDe}
              </h3>
              <p className="lightbox-description">
                {language === 'en' ? selectedProject.description : selectedProject.descriptionDe}
              </p>
              <div className="lightbox-tags">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
