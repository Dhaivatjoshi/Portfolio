import React, { useState } from 'react';
import './LazyImage.css';

export const LazyImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="lazy-image-wrapper" onClick={onClick}>
      {!isLoaded && <div className="lazy-skeleton"></div>}
      <img
        src={src}
        alt={alt}
        className={`lazy-img ${isLoaded ? 'loaded' : ''} ${className || ''}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
