
import React from 'react';
import { Instagram, Youtube, Facebook, MapPin, Mail, ExternalLink } from 'lucide-react';
import { INSTAGRAM_LINK, YOUTUBE_LINK, FACEBOOK_LINK, MAP_LINK, ADDRESS_TEXT, CHURCH_LOGO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-navy-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12 pb-16">
        <div className="col-span-1 md:col-span-1">
          <img 
            src={CHURCH_LOGO} 
            alt="Logo Assembleia de Deus Alameda 1" 
            className="h-12 w-auto object-contain mb-6 filter brightness-110"
          />
          <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
            "Uma igreja comprometida com a sã doutrina e o evangelho genuíno de Cristo."
          </p>
          <div className="flex space-x-3">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-dark transition-all shadow-lg hover:shadow-gold/20">
              <span className="sr-only">Instagram</span>
              <Instagram size={20} />
            </a>
            <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-dark transition-all shadow-lg hover:shadow-gold/20">
              <span className="sr-only">Facebook</span>
              <Facebook size={20} />
            </a>
            <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-dark transition-all shadow-lg hover:shadow-gold/20">
              <span className="sr-only">YouTube</span>
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h5 className="font-cinzel text-lg text-white mb-6 uppercase tracking-[0.2em] border-b border-gold/20 pb-2 inline-block">Navegação</h5>
          <ul className="space-y-4 text-gray-400 text-sm font-light">
            <li><a href="#home" className="hover:text-gold transition-colors flex items-center gap-2">Início</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors flex items-center gap-2">Sobre Nós</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors flex items-center gap-2">Horários de Culto</a></li>
            <li><a href="#departments" className="hover:text-gold transition-colors flex items-center gap-2">Departamentos</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h5 className="font-cinzel text-lg text-white mb-6 uppercase tracking-[0.2em] border-b border-gold/20 pb-2 inline-block">Contato & Localização</h5>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-start gap-3 p-3 bg-navy-light/40 border border-gold/5 rounded-2xl">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-1" />
                <span>{ADDRESS_TEXT}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-navy-light/40 border border-gold/5 rounded-2xl">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <span className="truncate">contato@adalameda1.com.br</span>
              </div>
            </div>
            
            <div className="relative w-full h-40 md:h-full min-h-[160px] rounded-3xl overflow-hidden group border border-gold/20 shadow-2xl shadow-black/40">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.936615568142!2d-37.344156825139!3d-5.217717351571221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ba064b65a08cf9%3A0x2905bcfc68b8b71c!2sAssembleia%20de%20Deus%20-%20Alameda%201!5e0!3m2!1spt-BR!2sbr!4v1715421234567!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  className="grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
                <a 
                  href={MAP_LINK} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="absolute inset-0 bg-navy-dark/40 group-hover:bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="bg-gold text-navy-dark px-4 py-2 rounded-full font-bold flex items-center gap-2 text-xs uppercase tracking-tighter shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                    Abrir Mapa <ExternalLink size={14} />
                  </div>
                </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-navy-light py-8 text-center text-gray-500 text-[10px] border-t border-gold/10 px-4">
        <p className="uppercase tracking-[0.1em]">&copy;2026 - Assembleia de Deus Alameda 1 | Todos os Direitos Reservados</p>
      </div>
    </footer>
  );
};

export default Footer;