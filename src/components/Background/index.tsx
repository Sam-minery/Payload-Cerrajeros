import React from 'react';

interface BackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ className = '', children }) => {
  return (
    <div className={`relative ${className} overflow-hidden`}>
      {/* Dot background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export { Background }; 

