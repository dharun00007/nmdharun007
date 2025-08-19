
import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className: string;
  fallback: React.ReactNode;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageWithFallback;
