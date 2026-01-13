
import { GoogleGenAI, Type } from "@google/genai";

// Inicialização segura: Verifica se existe a chave antes de tentar usar, evitando crash
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

export const fetchDailyDevotional = async () => {
  // Se não houver chave configurada, retorna o texto padrão sem tentar chamar a API (evita erros de console)
  if (!apiKey) {
    return {
      verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...",
      reference: "João 3:16",
      reflection: "A fé é o alicerce da nossa caminhada com Cristo e a esperança a âncora da nossa alma. Confiamos que o Senhor trabalha em nosso favor, cumprindo Suas promessas. O melhor de Deus ainda está por vir!"
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Gere um versículo bíblico aleatório e uma reflexão inspiradora de no máximo 250 caracteres para uma igreja Assembleia de Deus. Foque em esperança e fé. Responda em JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: { type: Type.STRING },
            reference: { type: Type.STRING },
            reflection: { type: Type.STRING },
          },
          required: ["verse", "reference", "reflection"],
        },
      },
    });
    
    if (response.text) {
        return JSON.parse(response.text);
    }
    throw new Error("Resposta vazia");

  } catch (error) {
    console.error("Usando devocional de fallback devido a erro:", error);
    return {
      verse: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
      reference: "Jeremias 29:11",
      reflection: "Descanse na certeza de que Deus está no controle de todas as coisas. Seus planos são perfeitos e visam o nosso bem, mesmo quando não compreendemos o caminho."
    };
  }
};
