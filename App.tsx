
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import EventsBanners from './components/EventsBanners';
import Departments from './components/Departments';
import DailyVerse from './components/DailyVerse';
import YouTubeSection from './components/YouTubeSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ContactForm from './components/ContactForm';
import { Share2, Lock, Youtube, Instagram, Facebook, Loader2 } from 'lucide-react';
import { FACEBOOK_LINK, INSTAGRAM_LINK, YOUTUBE_LINK } from './constants';
import { useConfig } from './hooks/useConfig';

function App() {
  const { config, heroConfig, loading } = useConfig();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#painel') {
        setShowLogin(true);
      } else {
        setShowLogin(false);
        setIsAdmin(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'adalameda1') {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert('Senha incorreta!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-dark flex flex-col items-center justify-center text-gold gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-cinzel text-sm uppercase tracking-widest animate-pulse text-center">Iniciando Experiência AD Alameda 1...</p>
      </div>
    );
  }

  if (isAdmin) {
    return <AdminPanel onExit={() => { setIsAdmin(false); window.location.hash = ''; }} />;
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-navy-light/40 p-10 rounded-[3rem] border border-gold/20 backdrop-blur-3xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={30} />
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-white mb-2">Acesso Restrito</h2>
          <p className="text-gray-400 text-sm mb-8">Insira a senha para gerenciar o site.</p>
          <input 
            type="password" 
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-navy-dark border border-white/10 rounded-2xl p-4 text-center outline-none focus:border-gold transition-all mb-6 text-white"
            placeholder="Senha"
          />
          <button type="submit" className="w-full bg-gold text-navy-dark font-black py-4 rounded-2xl hover:scale-[1.02] transition-all uppercase tracking-widest">
            Entrar
          </button>
          <button type="button" onClick={() => window.location.hash = ''} className="mt-6 text-gray-500 hover:text-white text-xs uppercase tracking-widest font-bold">
            Voltar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-dark selection:bg-gold selection:text-navy-dark pb-8">
      <Navbar />
      
      <main className="space-y-4">
        <Hero />

        {/* SEÇÃO SOBRE NÓS */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 -rotate-3 rounded-3xl -z-10 translate-x-4 translate-y-4 blur-sm"></div>
              <img 
                src={heroConfig.banner_url} 
                alt="Sobre AD Alameda 1" 
                className="rounded-3xl shadow-2xl relative z-10 filter sepia-[0.1] hover:sepia-0 transition-all duration-700 object-cover w-full h-[400px] md:h-[500px]" 
              />
              <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-navy-light p-4 rounded-full border-4 border-gold hidden md:flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md">
                <span className="text-gold font-bold text-3xl font-cinzel">25</span>
                <span className="text-white text-[10px] uppercase font-bold tracking-tighter leading-none">Anos de Fé<br/>e Obras</span>
              </div>
            </div>
            
            <div className="space-y-6 bg-navy-light/20 p-8 md:p-12 rounded-3xl border border-gold/10 backdrop-blur-sm">
              <h2 className="text-gold font-cinzel text-sm uppercase tracking-[0.5em]">{config.about.subtitle}</h2>
              <h3 className="text-3xl md:text-5xl font-cinzel font-bold text-white leading-tight">{config.about.title}</h3>
              <p className="text-gray-400 leading-loose text-lg font-light">
                {config.about.text}
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="p-4 border border-gold/5 rounded-2xl bg-navy-dark/40">
                  <h4 className="text-gold font-bold text-xl mb-2 font-cinzel uppercase tracking-widest">Visão</h4>
                  <p className="text-gray-500 text-sm italic">{config.about.vision}</p>
                </div>
                <div className="p-4 border border-gold/5 rounded-2xl bg-navy-dark/40">
                  <h4 className="text-gold font-bold text-xl mb-2 font-cinzel uppercase tracking-widest">Missão</h4>
                  <p className="text-gray-500 text-sm italic">{config.about.mission}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
           <div className="rounded-3xl overflow-hidden shadow-2xl">
              <DailyVerse />
           </div>
        </div>

        <YouTubeSection />
        <Services />
        <EventsBanners />
        <Departments />

        <div id="contact" className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 p-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest">
                <Share2 size={14} /> Juntos em todo lugar
              </div>
              <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white leading-tight">
                Fique <span className="text-gold">conectado</span> com a gente!
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-lg">
                A distância não nos separa. Faça parte da nossa família digital e receba diariamente uma palavra de vida e esperança.
              </p>
              
              <div className="flex flex-col gap-4">
                <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-[#FF0000]/10 border border-[#FF0000]/20 text-white rounded-2xl hover:bg-[#FF0000]/20 transition-all">
                  <div className="p-3 bg-[#FF0000] rounded-xl"><Youtube size={24} /></div>
                  <span className="font-bold uppercase tracking-widest text-sm">Inscreva-se no Youtube</span>
                </a>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-pink-500/10 border border-pink-500/20 text-white rounded-2xl hover:bg-pink-500/20 transition-all">
                  <div className="p-3 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-xl"><Instagram size={24} /></div>
                  <span className="font-bold uppercase tracking-widest text-sm">Siga no Instagram</span>
                </a>
                <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-[#1877F2]/10 border border-[#1877F2]/20 text-white rounded-2xl hover:bg-[#1877F2]/20 transition-all">
                  <div className="p-3 bg-[#1877F2] rounded-xl"><Facebook size={24} /></div>
                  <span className="font-bold uppercase tracking-widest text-sm">Curta no Facebook</span>
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
