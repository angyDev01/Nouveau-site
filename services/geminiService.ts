
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getProductRecommendations = async (userInput: string, products: any[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Basé sur la demande suivante: "${userInput}", suggère les meilleurs produits de notre catalogue: ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category })))}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            productId: { type: Type.STRING },
            reason: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const chatWithAssistant = async (message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "Tu es l'assistant IA de Guinée STORE. Réponds de manière polie, moderne et serviable. Aide les clients à choisir des tailles, explique les modes de livraison en Guinée (Orange Money, etc.) et promeus la culture guinéenne.",
    },
  });
  const result = await chat.sendMessage({ message });
  return result.text;
};
