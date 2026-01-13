
import React, { useState, useEffect } from 'react';
import { fetchDailyDevotional } from '../services/geminiService';
import { Quote } from 'lucide-react';

const DailyVerse: React.FC = () => {
  const [devotional, setDevotional] = useState<{ verse: string; reference: string; reflection: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDailyDevotional();
      setDevotional(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <section className="py-20 bg-navy-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Quote className="mx-auto text-gold/30 mb-8" size={60} />
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 w-3/4 mx-auto rounded"></div>
            <div className="h-4 bg-gray-700 w-1/2 mx-auto rounded"></div>
            <div className="h-4 bg-gray-700 w-1/4 mx-auto rounded"></div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-cinzel text-white mb-4 italic leading-relaxed">
              "{devotional?.verse}"
            </h3>
            <span className="text-gold font-bold tracking-widest text-sm uppercase">
              {devotional?.reference}
            </span>
            <div className="mt-10 p-8 border border-gold/10 blur-overlay bg-navy-dark/40 rounded-lg">
              <p className="text-gray-400 leading-loose text-lg font-light">
                {devotional?.reflection}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyVerse;
