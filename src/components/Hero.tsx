import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Zap, Github, Linkedin, Instagram, Youtube, Mail, CheckCircle, Terminal, Wifi, Activity, Settings, PenTool, Box, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const [activeDiagram, setActiveDiagram] = useState<'hardware' | 'pcb'>('hardware');
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Determine if on desktop to completely unmount the diagram on mobile
    const checkSize = () => setIsDesktop(window.innerWidth > 1024);
    checkSize(); // Initial check
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

          {/* Stats grid — kept below on both breakpoints */}
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

        {/* ── RIGHT: Complex Architecture Diagram (desktop only) ── */}
        {isDesktop && (
          <div className="hero-visual" aria-hidden="true">
            <div className="system-block-diagram">

            <div className="diagram-toggle">
              <button className={activeDiagram === 'hardware' ? 'active' : ''} onClick={() => setActiveDiagram('hardware')}>
                Architecture
              </button>
              <button className={activeDiagram === 'pcb' ? 'active' : ''} onClick={() => setActiveDiagram('pcb')}>
                PCB Flow
              </button>
            </div>

            <div className="diagram-wrapper">
              {/* SVG Wires Layer */}
              <svg className="diagram-wires" viewBox="0 0 480 440" preserveAspectRatio="none">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(0, 240, 255, 0.5)" />
                  </marker>
                </defs>

                {activeDiagram === 'hardware' ? (
                  <>
                    {/* Row 1 to Row 2 */}
                    <path className="wire-path glow" d="M 80,80 L 80,110 L 240,110 L 240,130" />
                    <path className="wire-path" d="M 80,80 L 80,110 L 240,110 L 240,130" markerEnd="url(#arrow)" />
                    
                    <path className="wire-path glow" d="M 240,80 L 240,130" />
                    <path className="wire-path" d="M 240,80 L 240,130" markerEnd="url(#arrow)" />

                    <path className="wire-path glow" d="M 400,80 L 400,110 L 240,110 L 240,130" />
                    <path className="wire-path" d="M 400,80 L 400,110 L 240,110 L 240,130" markerEnd="url(#arrow)" />

                    {/* Row 2 to Row 3 */}
                    <path className="wire-path glow" d="M 240,210 L 240,230 L 120,230 L 120,250" />
                    <path className="wire-path" d="M 240,210 L 240,230 L 120,230 L 120,250" markerEnd="url(#arrow)" />

                    <path className="wire-path glow" d="M 240,210 L 240,230 L 360,230 L 360,250" />
                    <path className="wire-path" d="M 240,210 L 240,230 L 360,230 L 360,250" markerEnd="url(#arrow)" />

                    {/* Row 3 to Row 4 */}
                    <path className="wire-path glow" d="M 120,310 L 120,340" />
                    <path className="wire-path" d="M 120,310 L 120,340" markerEnd="url(#arrow)" />

                    <path className="wire-path glow" d="M 360,310 L 360,340" />
                    <path className="wire-path" d="M 360,310 L 360,340" markerEnd="url(#arrow)" />
                  </>
                ) : (
                  <>
                ) : (
                  <>
                    {/* Simplified sequential flow for PCB */}
                    {/* Row 1 to Row 2 */}
                    <path className="wire-path glow" d="M 80,80 L 80,110 L 240,110 L 240,130" />
                    <path className="wire-path" d="M 80,80 L 80,110 L 240,110 L 240,130" markerEnd="url(#arrow)" />
                    
                    <path className="wire-path glow" d="M 400,80 L 400,110 L 240,110 L 240,130" />
                    <path className="wire-path" d="M 400,80 L 400,110 L 240,110 L 240,130" markerEnd="url(#arrow)" />

                    {/* Row 2 to Row 3 */}
                    <path className="wire-path glow" d="M 240,210 L 240,230 L 120,230 L 120,250" />
                    <path className="wire-path" d="M 240,210 L 240,230 L 120,230 L 120,250" markerEnd="url(#arrow)" />

                    <path className="wire-path glow" d="M 240,210 L 240,230 L 360,230 L 360,250" />
                    <path className="wire-path" d="M 240,210 L 240,230 L 360,230 L 360,250" markerEnd="url(#arrow)" />

                    {/* Row 3 to Row 4 */}
                    <path className="wire-path glow" d="M 120,310 L 120,340" />
                    <path className="wire-path" d="M 120,310 L 120,340" markerEnd="url(#arrow)" />

                    <path className="wire-path glow" d="M 240,310 L 240,340" />
                    <path className="wire-path" d="M 240,310 L 240,340" markerEnd="url(#arrow)" />

                    <path className="wire-path glow" d="M 360,310 L 360,340" />
                    <path className="wire-path" d="M 360,310 L 360,340" markerEnd="url(#arrow)" />
                  </>
                )}
              </svg>

              <div key={activeDiagram} className="detailed-grid">
                
                {activeDiagram === 'hardware' ? (
                  <>
                    {/* Row 1 */}
                    <div className="sys-block small span-2">
                      <div className="sys-block-header justify-center"><Zap size={12} /> BMS</div>
                      <div className="sys-block-body text-center dim">Li-Ion PMIC</div>
                    </div>
                    <div className="sys-block small span-2">
                      <div className="sys-block-header justify-center"><Activity size={12} /> Clock</div>
                      <div className="sys-block-body text-center dim">40MHz XTAL</div>
                    </div>
                    <div className="sys-block small span-2">
                      <div className="sys-block-header justify-center"><Terminal size={12} /> Debug</div>
                      <div className="sys-block-body text-center dim">JTAG / SWD</div>
                    </div>

                    {/* Row 2 */}
                    <div className="sys-block mcu span-6">
                      <div className="sys-block-header justify-center"><Cpu size={16} /> ESP32 / STM32 Core</div>
                      <div className="sys-block-body mcu-tasks">
                        <span className="task">FreeRTOS</span>
                        <span className="task">Sensor Fusion</span>
                        <span className="task">PID Loop</span>
                        <span className="task">DMA/ISRs</span>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center"><Activity size={14} /> Sensors</div>
                      <div className="sys-block-body text-center dim">SPI/I2C IMU, GPS</div>
                    </div>
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center"><Wifi size={14} /> Comms</div>
                      <div className="sys-block-body text-center dim">MQTT / Wi-Fi / LoRa</div>
                    </div>

                    {/* Row 4 */}
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center"><Settings size={14} /> Actuators</div>
                      <div className="sys-block-body text-center dim">BLDC Motor Drivers</div>
                    </div>
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center"><CheckCircle size={14} /> Cloud IoT</div>
                      <div className="sys-block-body text-center dim">AWS / Dashboard</div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Row 1: Schematic Prep */}
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center">
                        <span className="step-num">1</span> <PenTool size={14} /> Schematic Capture
                      </div>
                      <div className="sys-block-body text-center dim">Symbols & Netnames</div>
                    </div>
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center">
                        <span className="step-num">2</span> <Activity size={14} /> Rules Check
                      </div>
                      <div className="sys-block-body text-center dim">ERC & Footprint Assoc</div>
                    </div>

                    {/* Row 2: Layout Design */}
                    <div className="sys-block mcu span-6">
                      <div className="sys-block-header justify-center">
                        <span className="step-num">3</span> <Layers size={16} /> PCB Layout Workflow
                      </div>
                      <div className="sys-block-body mcu-tasks">
                        <span className="task">Outline & Constraints</span>
                        <span className="task">Component Placement</span>
                        <span className="task">Routing & Silkscreen</span>
                      </div>
                    </div>

                    {/* Row 3: Verification */}
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center">
                        <span className="step-num">4</span> <Box size={14} /> Design Rules
                      </div>
                      <div className="sys-block-body text-center dim">DRC & Error Fixing</div>
                    </div>
                    <div className="sys-block small span-3">
                      <div className="sys-block-header justify-center">
                        <span className="step-num">5</span> <Terminal size={14} /> Gerber Export
                      </div>
                      <div className="sys-block-body text-center dim">Gerber & Drill Prep</div>
                    </div>

                    {/* Row 4: Manufacturing */}
                    <div className="sys-block small span-2">
                      <div className="sys-block-header justify-center">
                        <Settings size={12} /> Fab
                      </div>
                      <div className="sys-block-body text-center dim">External Fab</div>
                    </div>
                    <div className="sys-block small span-2">
                      <div className="sys-block-header justify-center">
                        <Activity size={12} /> Test
                      </div>
                      <div className="sys-block-body text-center dim">Verify Connectivity</div>
                    </div>
                    <div className="sys-block small span-2">
                      <div className="sys-block-header justify-center">
                        <CheckCircle size={12} /> PCBA
                      </div>
                      <div className="sys-block-body text-center dim">Pick & Place</div>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
        )}

      </div>
    </section>
  );
};

export default Hero;
