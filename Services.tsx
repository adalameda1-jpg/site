
import React from 'react';
import { Clock, Calendar, Star } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';

const Services: React.FC = () => {
  const { cultos } = useConfig();

  return (
    <section id="services" className="py-24 bg-navy-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy-light rounded-full blur-[180px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="text-left">
            <h2 className="text-gold font-cinzel text-sm uppercase tracking-[0.7em] mb-4 font-black">Programação Semanal</h2>
            <h3 className="text-5xl md:text-7xl font-cinzel font-bold text-white uppercase tracking-tighter">Agenda de Cultos</h3>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gold/40">
            <div className="w-24 h-[1px] bg-gold/20"></div>
            <Star size={24} className="animate-pulse text-gold" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cultos.map((service, index) => (
            <div key={service.id || index} className="group relative p-[1px] rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-transparent rounded-[2.5rem] opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full p-8 bg-[#001a42]/60 backdrop-blur-3xl rounded-[2.4rem] flex flex-col items-start text-left shadow-2xl border border-white/5">
                <div className="w-12 h-12 bg-navy-dark text-gold flex items-center justify-center rounded-xl mb-8 border border-gold/20 group-hover:bg-gold group-hover:text-navy-dark transition-all duration-500">
                  <Clock size={20} />
                </div>
                <p className="text-gold font-bold text-xs uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Calendar size={12} /> {service.day}
                </p>
                <h4 className="text-white font-cinzel text-2xl mb-6 font-bold leading-tight group-hover:text-gold transition-colors duration-500">
                  {service.name}
                </h4>
                <div className="mt-auto inline-flex items-center px-6 py-3 bg-gold text-navy-dark rounded-xl font-black text-2xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-500">
                  {service.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24">
          <div className="relative p-12 bg-navy-light/30 backdrop-blur-xl rounded-[3rem] border border-gold/20 shadow-2xl max-w-4xl mx-auto overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gold"></div>
            <p className="text-white text-xl md:text-2xl font-light italic leading-relaxed text-center md:text-left flex-1">
              "Alegrei-me quando me disseram: <br />
              <span className="text-gold font-black not-italic text-3xl md:text-5xl mt-2 block tracking-tighter">VAMOS À CASA DO SENHOR.</span>
              <span className="text-[10px] opacity-40 mt-4 block tracking-[0.5em] uppercase font-bold">— Salmos 122:1</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
