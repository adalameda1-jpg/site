
import React from 'react';
import { useConfig } from '../hooks/useConfig';
import { CalendarDays, Sparkles } from 'lucide-react';

const EventsBanners: React.FC = () => {
  const { banners } = useConfig();

  if (!banners || banners.length === 0) return null;

  return (
    <section id="events" className="py-24 bg-[#000d21] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Fique por dentro
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white uppercase tracking-tighter mb-4">
            Eventos e <span className="text-gold">Programações Especiais</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Confira os cartazes dos nossos próximos grandes encontros, congressos e celebrações especiais na AD Alameda 1.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] hover:border-gold/50 transition-all duration-700"
            >
              {/* Imagem do Banner */}
              <img 
                src={banner.image_url} 
                alt={banner.title || 'Evento'} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Sombra na parte inferior (Gradiente Interno) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Conteúdo sobreposto */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-3 drop-shadow-lg">
                  <CalendarDays size={16} /> {banner.title || 'Data no Cartaz'}
                </div>
                <div className="h-1.5 w-16 bg-gold rounded-full transform origin-left transition-all duration-700 group-hover:w-full shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsBanners;
