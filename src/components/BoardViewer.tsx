import React, { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'shadow-intensity'?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        reveal?: 'auto' | 'interaction' | 'manual';
      };
    }
  }
}

export const BoardViewer: React.FC<{ modelUrl?: string }> = ({ modelUrl }) => {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!document.querySelector('script[src="https://unpkg.com/@google/model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer';
      document.head.appendChild(script);
    }
  }, []);

  const resetView = () => {
    if (viewerRef.current) {
      (viewerRef.current as any).cameraOrbit = "auto auto auto";
      (viewerRef.current as any).cameraTarget = "auto auto auto";
    }
  };

  return (
    <div className="glass-panel" style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
      {modelUrl ? (
        <>
          <model-viewer
            ref={viewerRef}
            src={modelUrl}
            alt="3D PCB Model"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            loading="lazy"
            reveal="auto"
            style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'transparent', 
              '--poster-color': 'transparent',
              '--progress-bar-color': 'var(--accent-cyan)',
              '--progress-bar-height': '4px'
            } as any}
          >
            {/* Embedded 3D Hotspot Annotations */}
            <button 
              slot="hotspot-mcu" 
              data-position="0 0.05 0" 
              data-normal="0 1 0" 
              className="pcb-hotspot"
            >
              <div className="hotspot-tooltip">
                <span className="tooltip-title">Main Controller</span>
                <p>32-bit Cortex-M4 MCU running custom RTOS.</p>
              </div>
            </button>

            <button 
              slot="hotspot-power" 
              data-position="0.1 0.05 -0.1" 
              data-normal="0 1 0" 
              className="pcb-hotspot"
            >
              <div className="hotspot-tooltip">
                <span className="tooltip-title">Power Regulation</span>
                <p>High-efficiency buck converter (3.3V / 1A)</p>
              </div>
            </button>
          </model-viewer>
          <button 
            onClick={resetView} 
            title="Reset View"
            style={{
              position: 'absolute', top: '15px', right: '15px',
              width: '40px', height: '40px',
              background: 'url("https://cdn-icons-png.flaticon.com/512/61/61444.png") no-repeat center',
              backgroundSize: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'all 0.3s',
              zIndex: 10,
              filter: 'invert(1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
          />
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
          <p style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>No 3D Model provided yet.</p>
        </div>
      )}
    </div>
  );
};
