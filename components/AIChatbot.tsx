
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const botResponse = await chatWithAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse || "Je n'ai pas pu traiter votre demande." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Oups, une erreur est survenue." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">Besoin d'aide ?</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-white w-[90vw] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 bg-green-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">GS</div>
              <div>
                <p className="font-bold">Guinée Store AI</p>
                <p className="text-xs text-green-100 italic">En ligne</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-10">
                <p>👋 Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <button onClick={() => setInput("Quels sont vos délais de livraison ?")} className="text-xs bg-gray-100 p-2 rounded-lg hover:bg-gray-200">Délais de livraison</button>
                  <button onClick={() => setInput("Puis-je payer avec Orange Money ?")} className="text-xs bg-gray-100 p-2 rounded-lg hover:bg-gray-200">Modes de paiement</button>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl"><Loader2 className="w-5 h-5 animate-spin text-green-600" /></div>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Votre message..."
              className="flex-1 bg-gray-50 rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button onClick={handleSend} className="bg-green-600 text-white p-2 rounded-full"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
