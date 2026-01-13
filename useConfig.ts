
import { useState, useEffect } from 'react';
import { HERO_BANNER_URL } from '../constants';
import { supabase } from '../lib/supabase';

export interface HeroConfig {
  id: number;
  title: string;
  subtitle: string;
  banner_url: string;
  btn1_text: string;
  btn2_text: string;
  show_title: boolean;
  show_subtitle: boolean;
  show_btns: boolean;
  show_banner: boolean;
}

export interface HeroSlider {
  id: number;
  image_url: string;
  active: boolean;
  sort_order: number;
}

export interface YouTubeVideo {
  id: number;
  title: string;
  video_id: string;
  start_seconds: number;
  active: boolean;
}

export interface Banner {
  id: string;
  image_url: string;
  title: string;
  active: boolean;
}

export interface Culto {
  id: number;
  day: string;
  name: string;
  time: string;
  active: boolean;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  info_text: string;
  icon: string;
  active: boolean;
}

export interface SiteConfig {
  about: {
    title: string;
    subtitle: string;
    text: string;
    vision: string;
    mission: string;
  };
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
  about: {
    title: "Um lugar para crer, crescer e pertencer.",
    subtitle: "Nossa História",
    text: "A Assembleia de Deus Alameda 1 nasceu de um pequeno grupo de oração e se tornou um farol de esperança na comunidade.",
    vision: "Alcançar nossa cidade através do amor de Jesus Cristo.",
    mission: "Pregar o gospel a toda criatura e formar discípulos."
  }
};

const DEFAULT_HERO_CONFIG: HeroConfig = {
  id: 1,
  title: "Assembleia de Deus Alameda 1",
  subtitle: "Uma igreja para pertencer, uma família para amar.",
  banner_url: HERO_BANNER_URL,
  btn1_text: "Horários de Culto",
  btn2_text: "Conheça nossa história",
  show_title: false,
  show_subtitle: false,
  show_btns: false,
  show_banner: true
};

export const useConfig = () => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [heroSliders, setHeroSliders] = useState<HeroSlider[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [cultos, setCultos] = useState<Culto[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [heroRes, slidersRes, siteRes, bannerRes, cultosRes, videosRes, deptRes] = await Promise.all([
        supabase.from('hero_config').select('*').eq('id', 1).single(),
        supabase.from('hero_sliders').select('*').eq('active', true).order('sort_order'),
        supabase.from('site_configs').select('data').eq('id', 'main').maybeSingle(),
        supabase.from('event_banners').select('*').eq('active', true),
        supabase.from('cultos').select('*').eq('active', true).order('id'),
        supabase.from('youtube_videos').select('*').eq('active', true).order('created_at', { ascending: false }),
        supabase.from('departments').select('*').eq('active', true).order('id')
      ]);

      if (heroRes.data) setHeroConfig(heroRes.data);
      if (slidersRes.data) setHeroSliders(slidersRes.data);
      if (siteRes.data?.data) setConfig({ ...DEFAULT_SITE_CONFIG, ...siteRes.data.data });
      if (bannerRes.data) setBanners(bannerRes.data);
      if (cultosRes.data) setCultos(cultosRes.data);
      if (videosRes.data) setYoutubeVideos(videosRes.data);
      if (deptRes.data) setDepartments(deptRes.data);

    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateHeroConfig = async (newHero: HeroConfig) => {
    setHeroConfig(newHero);
    await supabase.from('hero_config').upsert(newHero);
  };

  const addHeroSlider = async (url: string) => {
    const { data } = await supabase.from('hero_sliders').insert([{ image_url: url, active: true }]).select();
    if (data) setHeroSliders(prev => [...prev, data[0]]);
  };

  const deleteHeroSlider = async (id: number) => {
    await supabase.from('hero_sliders').delete().eq('id', id);
    setHeroSliders(prev => prev.filter(s => s.id !== id));
  };

  const updateSiteConfig = async (newConfig: Partial<SiteConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    await supabase.from('site_configs').upsert({ id: 'main', data: updated });
  };

  const addCulto = async (culto: any) => {
    const { data } = await supabase.from('cultos').insert([{ ...culto, active: true }]).select();
    if (data) setCultos(prev => [...prev, data[0]]);
  };

  const deleteCulto = async (id: number) => {
    await supabase.from('cultos').delete().eq('id', id);
    setCultos(prev => prev.filter(c => c.id !== id));
  };

  const addBanner = async (url: string, title: string) => {
    const { data } = await supabase.from('event_banners').insert([{ image_url: url, title, active: true }]).select();
    if (data) setBanners(prev => [data[0], ...prev]);
  };

  const deleteBanner = async (id: string) => {
    await supabase.from('event_banners').delete().eq('id', id);
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const addYouTubeVideo = async (video: any) => {
    const { data } = await supabase.from('youtube_videos').insert([{ ...video, active: true }]).select();
    if (data) setYoutubeVideos(prev => [data[0], ...prev]);
  };

  const deleteYouTubeVideo = async (id: number) => {
    await supabase.from('youtube_videos').delete().eq('id', id);
    setYoutubeVideos(prev => prev.filter(v => v.id !== id));
  };

  const addDepartment = async (dept: any) => {
    const { data } = await supabase.from('departments').insert([{ ...dept, active: true }]).select();
    if (data) setDepartments(prev => [...prev, data[0]]);
  };

  const deleteDepartment = async (id: number) => {
    await supabase.from('departments').delete().eq('id', id);
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  return { 
    config, heroConfig, heroSliders, banners, cultos, youtubeVideos, departments,
    updateSiteConfig, updateHeroConfig, addHeroSlider, deleteHeroSlider,
    addBanner, deleteBanner, 
    addCulto, deleteCulto, 
    addYouTubeVideo, deleteYouTubeVideo,
    addDepartment, deleteDepartment,
    loading 
  };
};
