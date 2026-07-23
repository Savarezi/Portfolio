import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  X,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data';

interface FloatingBotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function FloatingBot({ isOpen, setIsOpen }: FloatingBotProps) {
  const [pulsing, setPulsing] = useState(true);

  // Stop pulsing after manual opening
  useEffect(() => {
    if (isOpen) {
      setPulsing(false);
    }
  }, [isOpen]);

  const triggerCelebration = () => {
    const colors = ['#d4af37', '#e5c158', '#ffffff', '#b8860b'];
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.8, y: 0.9 },
      colors
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.9 },
      colors
    });
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 90,
        spread: 80,
        origin: { x: 0.88, y: 0.75 },
        colors
      });
    }, 250);
  };

  // Listen to postMessage from Typebot simulation completions
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Typebot notifies parent document on state changes or completions
      if (
        event.data && 
        typeof event.data === 'object' && 
        (
          event.data.type === 'typebotCompleted' || 
          event.data.type === 'typebot:completed' ||
          (typeof event.data.type === 'string' && event.data.type.includes('completed'))
        )
      ) {
        triggerCelebration();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="floating-recruitment-bot-widget">
      {/* Trigger floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="floating-recruiting-trigger"
          className={`flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold rounded-2xl shadow-[0_4px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all outline-none group border border-[#d4af37]/40 cursor-pointer
            ${pulsing ? 'animate-bounce' : ''}`}
        >
          <div className="relative">
            <Bot className="h-5 w-5 animate-pulse text-black group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 border border-black" />
          </div>
          <span className="text-sm font-sans tracking-wide">Fale com a Patrícia (IA)</span>
        </button>
      )}

      {/* Actual Chat Dialog Card */}
      {isOpen && (
        <div 
          className="bg-[#0a0a0d]/95 backdrop-blur-2xl border border-[#d4af37]/40 rounded-2xl shadow-2xl w-full max-w-sm h-[500px] flex flex-col overflow-hidden animate-fade-in"
          id="recruiter-chat-dialog-panel"
        >
          {/* Header */}
          <div className="bg-white/[0.08] backdrop-blur-xl border-b border-[#d4af37]/30 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#d4af37]/15 text-[#e5c158] rounded-xl relative border border-[#d4af37]/30">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-xs leading-none">
                  IA Recrutadora Patrícia
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Conectado</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={triggerCelebration}
                className="p-1 px-2 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#e5c158] rounded-lg text-[10px] font-bold border border-[#d4af37]/30 cursor-pointer transition-all active:scale-95"
                title="Comemorar Sucesso na Entrevista! 🏆"
                id="floating-celebrate-sucess-btn"
              >
                <Trophy className="h-3 w-3 text-[#e5c158] animate-pulse" />
                <span>Celebrar!</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                id="close-chat-widget-btn"
                title="Minimizar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Core body content: Only her official Typebot iframe */}
          <div className="flex-1 bg-black relative h-full">
            <iframe 
              src="https://typebot.co/ia-recrutadora-patricia-ro4zr79" 
              title="IA Recrutadora Patrícia"
              className="w-full h-full border-none"
            />
          </div>
          
        </div>
      )}
    </div>
  );
}
