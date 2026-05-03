import React, { useState, useRef, useEffect } from 'react';

export const BeforeAfterSlider: React.FC<{ beforeImg: string, afterImg: string }> = ({ beforeImg, afterImg }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', () => setIsDragging(false));
    window.addEventListener('touchend', () => setIsDragging(false));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      className="glass-panel" 
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
      ref={containerRef}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* After Image (Full width background) */}
      <img 
        src={afterImg} 
        alt="After Layout" 
        style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} 
      />

      {/* Before Image (Clipped) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}>
        <img 
          src={beforeImg} 
          alt="Before Schematic" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>

      {/* Slider Line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${sliderPosition}%`,
        width: '2px', background: 'var(--accent-cyan)', transform: 'translateX(-50%)',
        boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)'
      }}>
        {/* Slider Handle */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-surface)',
          border: '2px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: '12px', height: '12px', background: 'var(--accent-cyan)', borderRadius: '50%' }}></div>
        </div>
      </div>
    </div>
  );
};
