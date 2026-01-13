
import React, { useState } from 'react';
import { useConfig } from '../hooks/useConfig';
import { 
  Save, Trash2, Plus, Loader2, Layout, Calendar, 
  Clock, Eye, EyeOff, Youtube, Users, Heart, Smile, Globe, Image as ImageIcon
} from 'lucide-react';

const AdminPanel: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { 
    config, heroConfig, heroSliders, banners, cultos, youtubeVideos, departments,
    updateSiteConfig, updateHeroConfig, addHeroSlider, deleteHeroSlider,
    addBanner, deleteBanner, 
    addCulto, deleteCulto,
    addYouTubeVideo, deleteYouTubeVideo,
    addDepartment, deleteDepartment
  } = useConfig();
  
  const [localHero, setLocalHero] = useState(heroConfig);
  const [localAbout, setLocalAbout] = useState(config.about);
  const [isSaving, setIsSaving] = useState(false);

  // Estados para novas entradas
  const [newHeroSliderUrl, setNewHeroSliderUrl] = useState('');
  const [newBannerUrl, setNewBannerUrl] = useState('');
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newCulto, setNewCulto] = useState({ day: '', name: '', time: '' });
  const [newVideo, setNewVideo] = useState({ title: '', video_id: '', start_seconds: 0 });
  const [newDept, setNewDept] = useState({ name: '', description: '', info_text: '', icon: 'Users' });

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateHeroConfig(localHero);
      await updateSiteConfig({ about: localAbout });
      alert('Configurações salvas com sucesso!');
    } catch (e) {
      alert('Erro ao salvar.');
    } finally {
      setIsSaving(false);
    }
  };

  const Toggle = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest ${
        active ? 'bg-gold/20 border-gold text-gold' : 'bg-navy-dark border-white/10 text-gray-500'
      }`}
    >
      {active ? <Eye size={14} /> : <EyeOff size={14} />}
      {label}: {active ? 'Visível' : 'Oculto'}
    </button>
  );

  return (
    <div className="min-h-screen bg-navy-dark text-white pb-32">
      <div className="max-w-6xl mx-auto p-4 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sticky top-0 z-50 bg-navy-dark/95 backdrop-blur-xl py-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl font-cinzel font-bold text-gold uppercase tracking-tighter">Gestão AD Alameda 1</h1>
            <p className="text-gray-400 text-sm">Painel de Controle Unificado</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onExit} className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">Sair</button>
            <button onClick={handleSaveAll} disabled={isSaving} className="flex items-center gap-2 px-8 py-2 rounded-xl bg-gold text-navy-dark font-black hover:scale-105 transition-all disabled:opacity-50 text-xs uppercase tracking-widest">
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Publicar Tudo
            </button>
          </div>
        </header>

        <div className="space-y-12">
          {/* CARROSSEL INICIAL (HERO SLIDERS) */}
          <section className="bg-navy-light/20 border border-gold/40 p-8 rounded-[3rem] space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <ImageIcon className="text-gold" /> <h2 className="text-xl font-cinzel font-bold uppercase tracking-tighter">Carrossel da Tela Inicial (30s)</h2>
            </div>
            <div className="flex gap-2 bg-navy-dark/40 p-4 rounded-2xl">
              <input 
                placeholder="URL da nova imagem para o carrossel" 
                value={newHeroSliderUrl} 
                onChange={e => setNewHeroSliderUrl(e.target.value)} 
                className="bg-navy-dark border border-white/10 rounded-xl p-3 text-xs flex-1 outline-none focus:border-gold" 
              />
              <button onClick={() => {addHeroSlider(newHeroSliderUrl); setNewHeroSliderUrl('')}} className="bg-gold p-3 rounded-xl text-navy-dark font-bold flex items-center gap-2 hover:scale-105 transition-all">
                <Plus size={18}/> Adicionar
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {heroSliders.map(s => (
                <div key={s.id} className="aspect-[16/9] relative group rounded-2xl overflow-hidden border border-white/10">
                  <img src={s.image_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <button onClick={() => deleteHeroSlider(s.id)} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-red-600/40 transition-all">
                    <Trash2 size={24} className="text-white"/>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CONFIGURAÇÃO TEXTOS INÍCIO */}
          <section className="bg-navy-light/20 border border-gold/20 p-8 rounded-[3rem] space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Layout className="text-gold" size={24} /> 
              <h2 className="text-2xl font-cinzel font-bold uppercase">Textos do Início</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Conteúdo de Texto</label>
                <input type="text" value={localHero.title} onChange={e => setLocalHero({...localHero, title: e.target.value})} className="w-full bg-navy-dark border border-white/10 rounded-2xl p-4 focus:border-gold outline-none" placeholder="Título Principal" />
                <input type="text" value={localHero.subtitle} onChange={e => setLocalHero({...localHero, subtitle: e.target.value})} className="w-full bg-navy-dark border border-white/10 rounded-2xl p-4 focus:border-gold outline-none" placeholder="Subtítulo" />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Controles de Visibilidade</label>
                <div className="grid grid-cols-2 gap-3">
                  <Toggle active={localHero.show_title} label="Título" onClick={() => setLocalHero({...localHero, show_title: !localHero.show_title})} />
                  <Toggle active={localHero.show_subtitle} label="Subtítulo" onClick={() => setLocalHero({...localHero, show_subtitle: !localHero.show_subtitle})} />
                </div>
              </div>
            </div>
          </section>

          {/* RESTO DO PAINEL (CULTOS, VÍDEOS, etc) */}
          <section className="bg-navy-light/20 border border-red-500/20 p-8 rounded-[3rem] space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Youtube className="text-red-500" /> <h2 className="text-xl font-cinzel font-bold uppercase">Vídeos</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-3 bg-navy-dark/40 p-4 rounded-2xl">
              <input type="text" placeholder="Título" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="bg-navy-dark border border-white/10 rounded-xl p-3 text-sm" />
              <input type="text" placeholder="ID YouTube (ex: XojMWabWa4Y)" value={newVideo.video_id} onChange={e => setNewVideo({...newVideo, video_id: e.target.value})} className="bg-navy-dark border border-white/10 rounded-xl p-3 text-sm" />
              <button onClick={() => {addYouTubeVideo(newVideo); setNewVideo({title:'', video_id:'', start_seconds:0})}} className="bg-red-600 font-bold p-3 rounded-xl flex items-center justify-center gap-2"><Plus size={18}/> Adicionar</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {youtubeVideos.map(v => (
                <div key={v.id} className="bg-navy-dark/50 p-3 rounded-2xl border border-white/5 flex flex-col gap-2 relative group">
                  <img src={`https://img.youtube.com/vi/${v.video_id}/mqdefault.jpg`} className="rounded-lg opacity-60" />
                  <p className="text-[10px] font-bold truncate">{v.title}</p>
                  <button onClick={() => deleteYouTubeVideo(v.id)} className="absolute top-2 right-2 p-1 bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-navy-light/20 border border-navy-light p-8 rounded-[3rem] space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Users className="text-gold" /> <h2 className="text-xl font-cinzel font-bold uppercase">Departamentos</h2>
            </div>
            <div className="space-y-3 bg-navy-dark/40 p-4 rounded-2xl">
               <div className="grid md:grid-cols-2 gap-3">
                 <input type="text" placeholder="Nome" value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} className="bg-navy-dark border border-white/10 rounded-xl p-3 text-sm" />
                 <select value={newDept.icon} onChange={e => setNewDept({...newDept, icon: e.target.value})} className="bg-navy-dark border border-white/10 rounded-xl p-3 text-sm">
                    <option value="Users">Users</option><option value="Heart">Heart</option><option value="Smile">Smile</option><option value="Globe">Globe</option>
                 </select>
               </div>
               <textarea placeholder="Resumo" value={newDept.description} onChange={e => setNewDept({...newDept, description: e.target.value})} className="w-full bg-navy-dark border border-white/10 rounded-xl p-3 text-sm h-20" />
               <button onClick={() => {addDepartment(newDept); setNewDept({name:'', description:'', info_text:'', icon:'Users'})}} className="w-full bg-white/10 p-3 rounded-xl font-bold border border-white/10 hover:bg-white/20 transition-all">Adicionar Departamento</button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {departments.map(d => (
                <div key={d.id} className="bg-navy-dark/50 p-4 rounded-2xl border border-white/5 flex justify-between items-start">
                  <div><p className="font-bold text-sm">{d.name}</p><p className="text-[10px] text-gray-500 line-clamp-1">{d.description}</p></div>
                  <button onClick={() => deleteDepartment(d.id)} className="text-red-500/50 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-navy-light/10 p-8 rounded-[3rem] space-y-4">
               <h3 className="font-cinzel font-bold uppercase flex items-center gap-2"><Clock size={18}/> Cultos</h3>
               <div className="flex gap-2">
                 <input placeholder="Dia" value={newCulto.day} onChange={e => setNewCulto({...newCulto, day:e.target.value})} className="bg-navy-dark border border-white/10 rounded-xl p-2 text-xs flex-1" />
                 <input placeholder="Hora" value={newCulto.time} onChange={e => setNewCulto({...newCulto, time:e.target.value})} className="bg-navy-dark border border-white/10 rounded-xl p-2 text-xs w-20" />
                 <button onClick={() => {addCulto(newCulto); setNewCulto({day:'', name:'', time:''})}} className="bg-gold p-2 rounded-xl text-navy-dark"><Plus size={16}/></button>
               </div>
               {cultos.map(c => (
                 <div key={c.id} className="flex justify-between items-center bg-navy-dark/40 p-2 rounded-lg text-xs">
                   <span>{c.day} - {c.time}</span>
                   <button onClick={() => deleteCulto(c.id)}><Trash2 size={12} className="text-gray-500"/></button>
                 </div>
               ))}
            </section>
            <section className="bg-navy-light/10 p-8 rounded-[3rem] space-y-4">
               <h3 className="font-cinzel font-bold uppercase flex items-center gap-2"><Calendar size={18}/> Banners de Eventos</h3>
               <div className="flex gap-2">
                 <input placeholder="URL da Imagem" value={newBannerUrl} onChange={e => setNewBannerUrl(e.target.value)} className="bg-navy-dark border border-white/10 rounded-xl p-2 text-xs flex-1" />
                 <button onClick={() => {addBanner(newBannerUrl, ''); setNewBannerUrl('')}} className="bg-gold p-2 rounded-xl text-navy-dark"><Plus size={16}/></button>
               </div>
               <div className="grid grid-cols-4 gap-2">
                 {banners.map(b => (
                   <div key={b.id} className="aspect-square relative group">
                     <img src={b.image_url} className="w-full h-full object-cover rounded-lg opacity-60" />
                     <button onClick={() => deleteBanner(b.id)} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-red-600/40 rounded-lg"><Trash2 size={14}/></button>
                   </div>
                 ))}
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
