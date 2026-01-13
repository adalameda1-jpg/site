
import { ServiceInfo, DepartmentInfo } from './types';

export const SERVICES: ServiceInfo[] = [
  { day: 'Segunda-feira', time: '19:00', description: 'Culto de Oração' },
  { day: 'Quinta-feira', time: '19:00', description: 'Culto de Ensino' },
  { day: 'Domingo', time: '09:00', description: 'Escola Bíblica Dominical (EBD)' },
  { day: 'Domingo', time: '18:00', description: 'Culto Aberto' },
];

export const DEPARTMENTS: DepartmentInfo[] = [
  { name: 'Juventude Alameda', description: 'União de Jovens da AD Alameda 1 - Força e renovo para a nova geração.', icon: 'Users' },
  { name: 'DEFAD Alameda', description: 'Departamento Feminino da AD Alameda 1 - Mulheres de joelhos, igreja de pé.', icon: 'Heart' },
  { name: 'DIADEM Alameda', description: 'Departamento Infantil da AD Alameda 1 - Ensinando a criança no caminho em que deve andar.', icon: 'Smile' },
  { name: 'DEADEM Alameda', description: 'Departamento de Adolescentes da AD Alameda 1 - Identidade e propósito firmados na Palavra.', icon: 'Globe' },
];

export const INSTAGRAM_LINK = "https://www.instagram.com/adalameda1";
export const YOUTUBE_LINK = "https://www.youtube.com/@ADALAMEDA1";
export const FACEBOOK_LINK = "https://www.facebook.com/adalameda1";
export const MAP_LINK = "https://www.google.com/maps/place/Assembleia+de+Deus+-+Alameda+1/@-5.2177174,-37.3415819,17z/data=!3m1!4b1!4m6!3m5!1s0x7ba064b65a08cf9:0x2905bcfc68b8b71c!8m2!3d-5.2177174!4d-37.3415819!16s%2Fg%2F11c5033bqq";
export const ADDRESS_TEXT = "R. Hilda Brasil Leite, 24 - Planalto Treze de Maio, Mossoró - RN, 59631-503";
export const CHURCH_LOGO = "https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/2pzx2inf/nq5/su5/mqr/LOGO%20AL%201%20%5BMEDIA%20QUALIDADE%5D.png";

// Novos Banners para o Slider
export const HERO_BANNERS = [
  "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=2000"
];

export const HERO_BANNER_URL = HERO_BANNERS[0];
