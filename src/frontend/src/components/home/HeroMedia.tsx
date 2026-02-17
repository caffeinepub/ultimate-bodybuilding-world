import { useState } from 'react';

export default function HeroMedia() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: 'url(/assets/generated/bg-marble-black-gold.dim_2048x2048.png)',
            backgroundSize: '512px 512px'
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
    </div>
  );
}
