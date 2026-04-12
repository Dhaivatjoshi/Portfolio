import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BoardViewer } from './BoardViewer';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { LazyImage } from './LazyImage';
import './Projects.css';

const Projects: React.FC = () => {
  const { language } = useLanguage();

  // Create an array of 19 images
  const images = Array.from({ length: 19 }, (_, i) => `/images/project/IMG_${i + 1}.jpg`);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | '3d' | 'schematic'>('gallery');

  const [visibleCount, setVisibleCount] = useState(8);

  // State for active specific PCB design
  const [activeBoardIdx, setActiveBoardIdx] = useState(0);

  const handleOpen = (img: string) => setSelectedImg(img);
  const handleClose = () => setSelectedImg(null);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, images.length));
  };

  // Define multiple PCB projects here
  const pcbFeatures = [
    {
      name: 'Non-Isolated AC-DC Power supply',
      modelUrl: '/models/pcb.gltf',
      schematic: '/images/schematic.jpg',
      layout: '/images/layout.jpg'
    },
    // {
    //   name: 'Secondary Node',
    //   modelUrl: '/models/pcb2.gltf', // Add your second 3D model here
    //   schematic: '/images/schematic2.jpg',
    //   layout: '/images/layout2.jpg'
    // }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-highlight">{language === 'en' ? 'Hardware' : 'Hardware'}</span> Projects & Design
        </h2>

        <p className="projects-subtitle">
          {language === 'en'
            ? "A showcase of my Projects, interactive 3D board visualizations, and PCB layouts."
            : "Ein Schaufenster meiner Projekte, interaktiven 3D-Board-Visualisierungen und Leiterplattenlayouts."}
        </p>

        {/* Tabs System */}
        <div className="project-tabs">
          <button
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            {language === 'en' ? 'Projects' : 'Projekte'}
          </button>
          <button
            className={`tab-btn ${activeTab === '3d' ? 'active' : ''}`}
            onClick={() => setActiveTab('3d')}
          >
            {language === 'en' ? 'Interactive 3D Boards' : 'Interaktive 3D-Boards'}
          </button>
          <button
            className={`tab-btn ${activeTab === 'schematic' ? 'active' : ''}`}
            onClick={() => setActiveTab('schematic')}
          >
            {language === 'en' ? 'Schematic vs Layout' : 'Schaltplan vs Layout'}
          </button>
        </div>

        {/* Tab 1: Gallery */}
        {activeTab === 'gallery' && (
          <div className="gallery-wrapper fade-in">
            <div className="project-grid">
              {images.slice(0, visibleCount).map((img, index) => (
                <div key={index} className="project-card glass-panel" onClick={() => handleOpen(img)}>
                  <div className="card-image-wrapper">
                    <LazyImage src={img} alt={`PCB Project ${index + 1}`} />
                    <div className="card-overlay">
                      <span className="view-text">View Architecture</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < images.length && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button onClick={handleLoadMore} className="btn-primary" style={{ padding: '0.75rem 2.5rem', background: 'transparent', border: '1px solid var(--accent-cyan)' }}>
                  {language === 'en' ? 'Load More' : 'Mehr laden'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Board Selection UI (Visible on 3D or Schematic tabs) */}
        {(activeTab === '3d' || activeTab === 'schematic') && (
          <div className="board-selector" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {pcbFeatures.map((board, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBoardIdx(idx)}
                style={{
                  background: activeBoardIdx === idx ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${activeBoardIdx === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: activeBoardIdx === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.3s ease'
                }}
              >
                {board.name}
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: 3D Board Viewer */}
        {activeTab === '3d' && (
          <div className="viewer-container fade-in">
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {pcbFeatures[activeBoardIdx].name} (3D)
            </h3>
            <BoardViewer modelUrl={pcbFeatures[activeBoardIdx].modelUrl} />
          </div>
        )}

        {/* Tab 3: Schematic Slider */}
        {activeTab === 'schematic' && (
          <div className="viewer-container fade-in">
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {pcbFeatures[activeBoardIdx].name} (Schematic vs Layout)
            </h3>
            <BeforeAfterSlider
              beforeImg={pcbFeatures[activeBoardIdx].schematic}
              afterImg={pcbFeatures[activeBoardIdx].layout}
            />
          </div>
        )}
      </div>

      {/* Lightbox for Gallery */}
      {selectedImg && (
        <div className="lightbox" onClick={handleClose}>
          <div className="lightbox-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImg} alt="Expanded View" />
            <button className="lightbox-close" onClick={handleClose}>×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
