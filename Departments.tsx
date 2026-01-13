
import React from 'react';
import { Users, Smile, Heart, Globe, ArrowRight } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';

const iconMap: any = {
  Users: <Users size={32} />,
  Smile: <Smile size={32} />,
  Heart: <Heart size={32} />,
  Globe: <Globe size={32} />,
};

const Departments: React.FC = () => {
  const { departments } = useConfig();

  const handleLearnMore = (dept: any) => {
    if (dept.info_text) {
      alert(`${dept.name}\n\n${dept.info_text}`);
    } else {
      alert(`${dept.name}\n\nEntre em contato conosco para saber mais sobre este departamento!`);
    }
  };

  if (!departments || departments.length === 0) return null;

  return (
    <section id="departments" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-light/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-navy-dark font-cinzel text-sm uppercase tracking-[0.5em] mb-4 font-bold opacity-70">Unidade e Serviço</h2>
            <h3 className="text-3xl md:text-5xl font-cinzel font-bold text-navy-dark leading-tight">Nossos Departamentos</h3>
          </div>
          <div className="text-navy-dark font-bold italic md:text-right bg-navy-dark/5 px-6 py-3 rounded-2xl border border-navy-dark/10 backdrop-blur-sm">
            Cada membro um ministro, <br /> cada casa uma igreja.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {departments.map((dept) => (
            <div 
              key={dept.id} 
              className="relative overflow-hidden group rounded-3xl bg-white border border-gray-100 p-8 flex gap-6 items-start transition-all duration-500 hover:border-navy-dark/20 hover:shadow-[0_20px_50px_rgba(0,18,46,0.1)]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.08] group-hover:scale-150 transition-transform duration-1000 text-navy-dark">
                {iconMap[dept.icon] || <Users size={32} />}
              </div>
              
              <div className="flex-shrink-0 text-white bg-navy-dark p-5 rounded-2xl shadow-lg group-hover:bg-gold group-hover:text-navy-dark transition-all duration-500">
                {iconMap[dept.icon] || <Users size={32} />}
              </div>
              
              <div className="relative z-10 flex-1">
                <h4 className="text-2xl font-cinzel text-navy-dark mb-2 group-hover:text-navy-light transition-colors font-bold">
                  {dept.name}
                </h4>
                <p className="text-black leading-relaxed font-medium mb-4">
                  {dept.description}
                </p>
                <button 
                  onClick={() => handleLearnMore(dept)}
                  className="text-xs uppercase tracking-widest text-navy-dark font-black flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Saiba Mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;
