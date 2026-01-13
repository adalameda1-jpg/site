
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    type: 'contact'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;
      
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '', type: 'contact' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy-light/30 border border-gold/20 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gold/10 text-gold rounded-2xl">
          <MessageSquare size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-cinzel font-bold text-white uppercase tracking-tight">Fale Conosco</h3>
          <p className="text-gray-400 text-sm">Dúvidas, informações ou pedidos de oração.</p>
        </div>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          <CheckCircle2 size={64} className="text-gold mb-4" />
          <h4 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h4>
          <p className="text-gray-400">Recebemos seu contato e retornaremos em breve.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-6 text-gold text-xs font-bold uppercase tracking-widest hover:underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/60 ml-2">Nome Completo</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: João Silva"
                className="w-full bg-navy-dark/50 border border-white/10 rounded-2xl p-4 text-white focus:border-gold outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/60 ml-2">Telefone / WhatsApp</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(00) 00000-0000"
                className="w-full bg-navy-dark/50 border border-white/10 rounded-2xl p-4 text-white focus:border-gold outline-none transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/60 ml-2">Tipo de Mensagem</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'contact'})}
                className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                  formData.type === 'contact' 
                    ? 'bg-gold text-navy-dark border-gold' 
                    : 'bg-transparent text-white border-white/10 hover:border-gold/50'
                }`}
              >
                Informação
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'prayer_request'})}
                className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                  formData.type === 'prayer_request' 
                    ? 'bg-gold text-navy-dark border-gold' 
                    : 'bg-transparent text-white border-white/10 hover:border-gold/50'
                }`}
              >
                Pedido de Oração
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/60 ml-2">Sua Mensagem</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Como podemos te ajudar?"
              className="w-full bg-navy-dark/50 border border-white/10 rounded-2xl p-4 text-white focus:border-gold outline-none transition-all resize-none placeholder:text-white/20"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-navy-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-gold/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            <span className="uppercase tracking-[0.2em]">Enviar Agora</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
