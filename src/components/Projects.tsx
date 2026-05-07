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
  category: 'Power Electronics' | 'Prototype Boards' | 'Sensor Modules' | 'RF & Wireless' | 'Motor Control';
  image: string;        // thumbnail shown on the card grid
  media?: MediaItem[];  // TODO: add extra photos/videos per project here
}

const projectData: Project[] = [
  {
    id: 1,
    title: 'GPS Data Logger',
    titleDe: 'GPS-Datenlogger',
    description: `This project presents a GPS data logging system built using an Arduino Uno and an SD card. The system is designed to record location coordinates and time data from a GPS module.

It includes four main components: the Arduino Uno, a GPS receiver, an SD card module, and a voltage regulator. The Arduino acts as the controller, managing communication between all components. The GPS receiver obtains real-time location and time information from satellites, while the SD card module stores this data for later use. The voltage regulator ensures a stable power supply for reliable operation.

The system was tested across multiple locations and was able to accurately log position and time at each point. It can store up to 1000 data entries before requiring a reset.

Overall, this project demonstrates a simple and cost-effective method for GPS data logging using Arduino and an SD card.`,
    descriptionDe: `Die Arbeit stellt einen GPS-Datenlogger vor, der Arduino und eine SD-Karte verwendet, um GPS-Ort und Zeit zu erfassen

Das System besteht aus einem Arduino Uno, einem GPS-Empfänger, einem SD-Kartenmodul und einem Spannungsregler

Der Arduino Uno steuert das System, der GPS-Empfänger ermittelt den aktuellen Standort, das SD-Kartenmodul speichert die Daten und der Regler liefert eine stabile Stromversorgung

Das System wurde an verschiedenen Orten getestet und protokollierte zuverlässig Ort und Zeit

Das System kann bis zu 1000 Punkte speichern, bevor ein Reset erforderlich ist

Diese Lösung ist kostengünstig für die GPS-Datenaufzeichnung mittels Arduino und SD-Karte`,
    tags: ['Arduino', 'GPS', 'SD Card', 'Data Logging'],
    category: 'Prototype Boards',
    image: '/docs/img/IMG_1.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_1.jpg' },
      { type: 'image', src: '/docs/img/IMG_1A.jpg' },
      { type: 'image', src: '/docs/img/IMG_1B.jpg' },
      { type: 'image', src: '/docs/img/IMG_1C.jpg' },
      { type: 'image', src: '/docs/img/IMG_1D.jpg' },
      { type: 'image', src: '/docs/img/IMG_1E.jpg' },
      // { type: 'vi/deo', src: '/videos/project_1_demo.mp4', caption: 'Working prototype demonstration' }
    ]
  },
  {
    id: 2,
    title: 'Smart Helmet Module',
    titleDe: 'Smartes Helm-Modul',
    description: `This project features an automatic accident detection module designed to be mounted on a safety helmet. The primary objective is to detect collisions or falls and immediately trigger an alarm system for rapid emergency response.

The module is integrated with a dedicated mobile application that automatically notifies predefined emergency contacts. This application provides critical victim details, including their real-time location, ensuring that medical assistance can be dispatched precisely where it is needed most.

By combining hardware sensors with mobile connectivity, this system significantly reduces response times during emergencies, potentially saving lives and minimizing the severity of injuries resulting from accidents.`,
    descriptionDe: `Dieses Projekt umfasst ein automatisches Unfallerkennungsmodul für Schutzhelme. Ziel ist es, Stürze oder Kollisionen sofort zu erkennen und ein Alarmsystem für eine schnelle Notfallreaktion auszulösen.

Das Modul ist mit einer mobilen Anwendung verbunden, die vordefinierte Notfallkontakte automatisch benachrichtigt. Die App liefert wichtige Details zum Opfer, einschließlich des Echtzeit-Standorts, um eine präzise Rettung zu ermöglichen.

Durch die Kombination von Hardware-Sensoren und mobiler Konnektivität verkürzt dieses System die Reaktionszeiten in Notfällen erheblich und minimiert so die Schwere von Unfallfolgen.`,
    tags: ['IMU', 'IoT', 'Mobile App', 'Safety', 'Buzzer', 'Alert System'],
    category: 'Prototype Boards',
    image: '/docs/img/IMG_2.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_2.jpg' },
      { type: 'image', src: '/docs/img/IMG_2A.jpg' },
      { type: 'image', src: '/docs/img/IMG_2B.jpg' },
    ]
  },
  {
    id: 3,
    title: 'RGB Touch Plant Using Arduino',
    titleDe: 'RGB-Touch-Pflanze mit Arduino',
    description: `This unique project combines nature with technology by creating an interactive RGB LED system controlled via an Arduino Pro Mini. It utilizes capacitive touch sensing to detect human interaction with plant leaves, triggering dynamic color changes.

The hardware setup includes three RGB LED strips driven by NPN transistors to handle high-current 12V loads. A 3.3V LDO regulator ensures the microcontroller receives stable power, while passive components filter noise for reliable touch detection.

The system features 20 static colors and a random fade animation. For added convenience, an optional IR remote controller is integrated, allowing users to customize the lighting effects wirelessly.`,
    descriptionDe: `Dieses Projekt verbindet Natur mit Technik durch ein interaktives RGB-LED-System, das über einen Arduino Pro Mini gesteuert wird. Es nutzt kapazitive Berührungssensoren, um Interaktionen mit den Blättern einer Pflanze zu erkennen und dynamische Farbwechsel auszulösen.

Das Hardware-Setup umfasst drei RGB-LED-Streifen, die über NPN-Transistoren für 12V-Lasten angesteuert werden. Ein 3,3V-LDO-Regler sorgt für eine stabile Stromversorgung, während passive Komponenten eine zuverlässige Berührungserkennung gewährleisten.

Das System bietet 20 statische Farben und eine Zufalls-Animation. Zusätzlich ist eine IR-Fernbedienung integriert, mit der die Lichteffekte bequem drahtlos gesteuert werden können.`,
    tags: ['Arduino Pro Mini', 'Capacitive Touch', 'RGB LED', 'IR Remote', 'Demo'],
    category: 'Prototype Boards',
    image: '/docs/img/IMG_3.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_3.jpg' },
      { type: 'image', src: '/docs/img/IMG_3A.jpg' },
    ]
  },
  {
    id: 4,
    title: 'Third Eye',
    titleDe: 'Drittes Auge',
    description: `Third Eye for the Blind is an assistive technology device designed to enhance the mobility and independence of visually impaired individuals. It uses ultrasonic waves to scan the environment for obstacles and provides real-time feedback to the user.

When an obstacle is detected within range, the device alerts the user through haptic vibrations or audible buzzer sounds. This multidisciplinary project bridges the gap between electronics engineering, computer science, and healthcare technology.

The system is fully automated and requires no manual input, allowing users to navigate unfamiliar surroundings with increased confidence, speed, and safety.`,
    descriptionDe: `Third Eye for the Blind ist ein assistives Gerät, das die Mobilität und Unabhängigkeit sehbehinderter Menschen verbessert. Es nutzt Ultraschallwellen, um die Umgebung nach Hindernissen zu scannen und liefert dem Benutzer Echtzeit-Feedback.

Sobald ein Hindernis erkannt wird, warnt das Gerät den Benutzer durch Vibrationen oder akustische Signale. Dieses multidisziplinäre Projekt verbindet Elektronik, Informatik und Medizintechnik.

Das System arbeitet vollautomatisch und ermöglicht es Benutzern, sich in unbekannten Umgebungen mit mehr Vertrauen und Sicherheit zu bewegen.`,
    tags: ['Ultrasonic', 'Accessibility', 'Sensor', 'Vibration', 'Demo'],
    category: 'Prototype Boards',
    image: '/docs/img/IMG_4.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_4.jpg' },
      { type: 'image', src: '/docs/img/IMG_4A.jpg' },
      { type: 'image', src: '/docs/img/IMG_4B.jpg' },
      { type: 'image', src: '/docs/img/IMG_4C.jpg' },
      { type: 'image', src: '/docs/img/IMG_4D.jpg' },
      { type: 'video', src: '/docs/videos/VID_4.mp4' }
    ]
  },
  {
    id: 5,
    title: 'Voice Activated Scrolling Display',
    titleDe: 'Sprachgesteuerte Laufschrift-Anzeige',
    description: `This IoT-based project features a high-visibility scrolling LED display controlled via voice commands. It is powered by a NodeMCU (ESP8266) and utilizes P10 LED matrix panels for a professional-grade visual output.

The system leverages the MQTT protocol for global connectivity, enabling users to update the display content remotely from anywhere in the world. A custom Android application provides a seamless interface for voice interaction and content management.

The hardware was designed and prototyped using KiCad, with the final PCB fabricated via a chemical etching process to ensure reliability and performance in a compact form factor.`,
    descriptionDe: `Dieses IoT-Projekt umfasst eine gut sichtbare LED-Laufschriftanzeige, die per Sprachbefehl gesteuert wird. Basierend auf einem NodeMCU (ESP8266) und P10 LED-Matrix-Panels bietet es eine professionelle Anzeige.

Das System nutzt das MQTT-Protokoll für globale Konnektivität, sodass Inhalte von überall auf der Welt aktualisiert werden können. Eine maßgeschneiderte Android-App dient als nahtlose Schnittstelle für Sprachbefehle und Inhaltsverwaltung.

Die Hardware wurde mit KiCad entworfen und prototypisiert, wobei die finale Leiterplatte durch chemisches Ätzen für maximale Zuverlässigkeit gefertigt wurde.`,
    tags: ['ESP8266', 'P10 Matrix', 'MQTT', 'Voice Control', 'Demo'],
    category: 'Prototype Boards',
    image: '/docs/img/IMG_5.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_5.jpg' },
      { type: 'image', src: '/docs/img/IMG_5A.jpg' },
      { type: 'video', src: 'https://www.youtube.com/embed/hgi-9XjMkho' }
    ]
  },
  {
    id: 6,
    title: 'USBASP AVR Programmer',
    titleDe: 'USBASP AVR-Programmiergerät',
    description: `USBasp is an essential tool for embedded developers, providing an efficient in-circuit programming solution for Atmel AVR microcontrollers. It is built around an ATmega8 or ATmega88 microcontroller and utilizes a firmware-only USB driver.

This design eliminates the need for specialized USB controller chips, making it a cost-effective and accessible programmer for development. It supports In-System Programming (ISP), allowing chips to be updated directly in the circuit.

The project follows industry-standard AVR ISP protocols, ensuring compatibility with a wide range of microcontrollers and providing a robust interface for firmware deployment.`,
    descriptionDe: `USBasp ist ein essentielles Werkzeug für Embedded-Entwickler und bietet eine effiziente In-Circuit-Programmierlösung für Atmel AVR-Mikrocontroller. Es basiert auf einem ATmega8 oder ATmega88 und nutzt einen reinen Firmware-USB-Treiber.

Dieses Design macht spezialisierte USB-Controller-Chips überflüssig und bietet einen kostengünstigen Programmierer. Es unterstützt In-System-Programming (ISP), wodurch Chips direkt in der Schaltung aktualisiert werden können.

Das Projekt folgt dem AVR-ISP-Standard und gewährleistet Kompatibilität mit einer Vielzahl von Mikrocontrollern für eine zuverlässige Firmware-Bereitstellung.`,
    tags: ['AVR', 'ISP', 'USBasp', 'ATMega8'],
    category: 'Prototype Boards',
    image: '/docs/img/IMG_6.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_6.jpg' },
    ]
  },
  {
    id: 7,
    title: 'IOT, Bluetooth and IR Controlled Home Automation',
    titleDe: 'IoT-, Bluetooth- und IR-gesteuerte Hausautomation',
    description: `This project involves the design and implementation of two distinct home automation platforms. The first is an ATmega328p-based system capable of controlling up to ten high-power appliances via a 10-relay board, featuring Bluetooth connectivity and IR remote support.

The second platform utilizes an ESP8266 (NodeMCU) for IoT-enabled control. It manages four relays and includes a specialized module for fan speed adjustment, allowing for seamless integration with Google Assistant and the Blynk mobile ecosystem.

Both systems provide the flexibility of manual overrides alongside their smart features, offering a reliable and versatile solution for modern smart home integration.`,
    descriptionDe: `Dieses Projekt umfasst zwei verschiedene Hausautomations-Plattformen. Das erste ist ein ATmega328p-basiertes System zur Steuerung von bis zu zehn Geräten über Relais, inklusive Bluetooth- und IR-Steuerung.

Die zweite Plattform nutzt einen ESP8266 (NodeMCU) für die IoT-Steuerung. Sie verwaltet vier Relais und ein Modul zur Lüftersteuerung, integriert in Google Assistant und das Blynk-Ökosystem.

Beide Systeme bieten manuelle Steuerungsmöglichkeiten neben den Smart-Funktionen und stellen so eine vielseitige Lösung für die moderne Hausautomation dar.`,
    tags: ['IoT', 'Home Automation', 'Bluetooth', 'ESP8266'],
    category: 'Power Electronics',
    image: '/docs/img/IMG_7.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_7.jpg' },
      { type: 'image', src: '/docs/img/IMG_7A.jpg' },
      { type: 'image', src: '/docs/img/IMG_7B.jpg' },
      { type: 'image', src: '/docs/img/IMG_7C.jpg' },
      { type: 'video', src: '/docs/videos/VID_7.mp4' },
      { type: 'video', src: '/docs/videos/VID_7A.mp4' },
      // { type: 'video', src: 'https://youtube.com/shorts/o2yQO0yKD5w?feature=share' },
    ]
  },
  {
    id: 8,
    title: 'IOT SPY ROBOT',
    titleDe: 'IoT Spionage-Roboter',
    description: `The IoT Spy Robot is a compact, remotely operated vehicle designed for reconnaissance and surveillance missions. It features a high-definition CCD camera and integrated LED lighting for live video transmission in both daylight and low-light environments.

The robot is built on a four-wheel chassis using Omni wheels for superior maneuverability in tight spaces. Its drivetrain consists of three high-torque DC motors driven by dual L298N H-bridge modules for precise motion control.

A wireless communication system, powered by PIC microcontrollers and RF modules, ensures reliable control over extended ranges, making it an effective tool for remote monitoring applications.`,
    descriptionDe: `Der IoT-Spionageroboter ist ein kompaktes, ferngesteuertes Fahrzeug für Aufklärungsmissionen. Er verfügt über eine CCD-Kamera und LED-Beleuchtung für die Live-Videoübertragung bei Tag und Nacht.

Das Fahrzeug nutzt Omni-Räder für maximale Wendigkeit auf engem Raum. Der Antrieb besteht aus drei DC-Motoren und L298N-Treibern für eine präzise Steuerung.

Ein drahtloses Kommunikationssystem auf Basis von PIC-Mikrocontrollern und RF-Modulen garantiert eine zuverlässige Steuerung über große Entfernungen für Fernüberwachungsanwendungen.`,
    tags: ['Robotics', 'IoT', 'Wireless Video', 'Motor Control'],
    category: 'Motor Control',
    image: '/docs/img/IMG_8.jpg',
    media: [
      { type: 'image', src: '/docs/img/IMG_8.jpg' },
    ]
  },
];

const ALL_CATEGORIES = ['All', 'Power Electronics', 'Prototype Boards', 'Motor Control'] as const;
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

  // Disable body scroll when lightbox is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

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
      modelUrl: '/docs/PCB/Design_1/pcb.gltf',
      schematic: '/docs/PCB/Design_1/schematic.jpg',
      layout: '/docs/PCB/Design_1/layout.jpg',
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
    <section id="projects" className={`projects-section ${selectedProject ? 'has-lightbox' : ''}`}>
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
            {language === 'en' ? 'PCB Design' : 'Leiterplattendesign'}
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
                  lbMedia[lbMediaIdx].src.includes('youtube.com') ? (
                    <iframe
                      key={lbMedia[lbMediaIdx].src}
                      src={lbMedia[lbMediaIdx].src}
                      title="Project Demo"
                      className="lb-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={lbMedia[lbMediaIdx].src}
                      src={lbMedia[lbMediaIdx].src}
                      controls
                      autoPlay
                      className="lb-video"
                    />
                  )
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
