
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Youtube, Facebook } from 'lucide-react';
import { INSTAGRAM_LINK, YOUTUBE_LINK, FACEBOOK_LINK, CHURCH_LOGO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Background change logic
      setScrolled(window.scrollY > 50);

      // Scroll Spy logic
      const sections = ['home', 'about', 'services', 'events', 'departments', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', id: 'home', href: '#home' },
    { name: 'Sobre Nós', id: 'about', href: '#about' },
    { name: 'Cultos', id: 'services', href: '#services' },
    { name: 'Eventos', id: 'events', href: '#events' },
    { name: 'Departamentos', id: 'departments', href: '#departments' },
    { name: 'Contato', id: 'contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-xl py-3 md:py-4 ${
      scrolled 
        ? 'bg-[#000814]/85 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center gap-2">
              <img 
                src={CHURCH_LOGO} 
                alt="Logo Assembleia de Deus Alameda 1" 
                className="h-10 md:h-14 w-auto object-contain transition-transform hover:scale-105 duration-300"
              />
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-300 font-medium text-sm uppercase tracking-widest relative group ${
                  activeSection === link.id ? 'text-gold' : 'text-white/90 hover:text-gold'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
            <div className="flex space-x-5 pl-4 items-center">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="text-white/70 hover:text-gold transition-all hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="text-white/70 hover:text-gold transition-all hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer" className="text-white/70 hover:text-gold transition-all hover:scale-110">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gold focus:outline-none p-2 transition-transform active:scale-90"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Sem traçados/bordas internas */}
      <div className={`md:hidden absolute w-full top-full left-0 transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 shadow-2xl' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-10 space-y-4 text-center bg-navy-dark/98 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 text-xl font-medium uppercase tracking-widest transition-colors ${
                activeSection === link.id ? 'text-gold' : 'text-white hover:text-gold'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="flex justify-center space-x-10 pt-10 pb-4">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="text-gold hover:scale-125 transition-transform"><Instagram size={28} /></a>
            <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="text-gold hover:scale-125 transition-transform"><Facebook size={28} /></a>
            <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer" className="text-gold hover:scale-125 transition-transform"><Youtube size={28} /></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
