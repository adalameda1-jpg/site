
import React, { useState } from 'react';
import { Youtube, ExternalLink, Play } from 'lucide-react';
import { YOUTUBE_LINK } from '../constants';
import { useConfig } from '../hooks/useConfig';

const YouTubeSection: React.FC = () => {
  const { youtubeVideos } = useConfig();
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const getEmbedUrl = (videoId: string, start: number) => {
    const params = new URLSearchParams({
      autoplay: '1',
      start: start.toString(),
      rel: '0',
      modestbranding: '1',
      origin: window.location.origin,
      enablejsapi: '1'
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  if (!youtubeVideos || youtubeVideos.length === 0) return null;

  return (
    <section id="videos" className="py-24 bg-navy-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-navy-light rounded-full blur-[140px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-gold font-cinzel text-sm uppercase tracking-[0.5em] mb-4">Mídia e Transmissões</h2>
          <h3 className="text-3xl md:text-5xl font-cinzel font-bold text-white uppercase tracking-tighter">Assista Nossos Cultos</h3>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.5)]"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {youtubeVideos.map((video, index) => {
            const thumb = `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`;
            return (
              <div 
                key={video.id} 
                className="group relative bg-[#001a42]/60 backdrop-blur-xl border border-gold/20 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-gold/60 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col h-full"
              >
                <div 
                  className="aspect-video w-full bg-black relative overflow-hidden cursor-pointer" 
                  onClick={() => setActiveVideoIndex(index)}
                >
                  {activeVideoIndex === index ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={getEmbedUrl(video.video_id, video.start_seconds)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full z-20"
                    ></iframe>
                  ) : (
                    <>
                      <img 
                        src={thumb} 
                        alt={video.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover:bg-transparent transition-all">
                        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy-dark shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                          <Play size={28} fill="currentColor" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Culto Gravado</span>
                    <h4 className="text-white font-cinzel text-xl group-hover:text-gold transition-colors leading-tight min-h-[3rem]">
                      {video.title}
                    </h4>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gold/10">
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.video_id}${video.start_seconds > 0 ? `&t=${video.start_seconds}s` : ''}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-4 bg-gold text-navy-dark rounded-2xl text-[11px] uppercase tracking-[0.2em] font-black flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 shadow-xl"
                    >
                      Assistir no YouTube <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-4 px-12 py-5 bg-[#F5F5DC] border-none rounded-full transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <Youtube size={24} className="text-gold group-hover:text-navy-dark transition-colors duration-300" /> 
            <span className="text-gold group-hover:text-navy-dark font-cinzel text-sm tracking-[0.2em] uppercase font-bold transition-colors duration-300">
              Inscreva-se em nosso Canal
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
