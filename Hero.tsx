
import React, { useState, useEffect } from 'react';
import { useConfig } from '../hooks/useConfig';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_BANNERS } from '../constants';

const Hero: React.FC = () => {
  const { heroConfig, heroSliders } = useConfig();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Usamos os sliders do banco, se não houver nenhum, usamos os constantes como fallback
  const displaySliders = heroSliders.length > 0 ? heroSliders.map(s => s.image_url) : HERO_BANNERS;

  useEffect(() => {
    if (displaySliders.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displaySliders.length);
    }, 30000);

    return () => clearInterval(timer);
  }, [displaySliders.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % displaySliders.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + displaySliders.length) % displaySliders.length);

  if (!heroConfig) return null;

  return (
    <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-navy-dark">
      {/* Container de Banners (Slider) */}
      <div className="absolute inset-0 z-0">
        {displaySliders.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <img 
              src={banner} 
              alt={`Banner ${index + 1}`} 
              className={`w-full h-full object-cover transition-transform duration-[30000ms] ease-linear ${
                index === currentIndex ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
        {/* Overlay de Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-transparent to-navy-dark"></div>
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up">
        {heroConfig.show_title && (
          <h1 className="text-4xl md:text-7xl font-cinzel font-bold text-white mb-6 leading-tight uppercase tracking-tighter drop-shadow-2xl">
            {heroConfig.title}
          </h1>
        )}
        {heroConfig.show_subtitle && (
          <p className="text-lg md:text-2xl text-gold font-light tracking-widest uppercase mb-10">
            {heroConfig.subtitle}
          </p>
        )}
      </div>

      {/* Controles de Navegação */}
      {displaySliders.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 z-20 p-3 rounded-full bg-black/20 text-white/50 hover:text-gold hover:bg-black/40 transition-all hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 z-20 p-3 rounded-full bg-black/20 text-white/50 hover:text-gold hover:bg-black/40 transition-all hidden md:block"
          >
            <ChevronRight size={32} />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-12 left-0 w-full flex justify-center gap-3 z-20">
            {displaySliders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  index === currentIndex ? 'w-12 bg-gold' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-navy-dark to-transparent"></div>
    </section>
  );
};

export default Hero;
