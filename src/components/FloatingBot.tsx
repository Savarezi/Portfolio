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
    const colors = ['#a855f7', '#10b981', '#e2e8f0', '#94a3b8'];
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
          className={`flex items-center gap-2.5 px-5 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-2xl shadow-[0_4px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_35px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all outline-none group border border-purple-500/20
            ${pulsing ? 'animate-bounce' : ''}`}
        >
          <div className="relative">
            <Bot className="h-5 w-5 animate-pulse text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 border border-purple-600" />
          </div>
          <span className="text-sm font-sans tracking-wide">Fale com a Patrícia (IA)</span>
        </button>
      )}

      {/* Actual Chat Dialog Card */}
      {isOpen && (
        <div 
          className="bg-[#080b11] border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-sm h-[500px] flex flex-col overflow-hidden animate-fade-in"
          id="recruiter-chat-dialog-panel"
        >
          {/* Header */}
          <div className="bg-[#0b0f19] border-b border-zinc-800 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-600/10 text-purple-400 rounded-xl relative">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-xs leading-none">
                  IA Recrutadora Patrícia
                </h3>
                <span className="text-[10px] text-zinc-500 font-mono">Conectado</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={triggerCelebration}
                className="p-1 px-2 flex items-center gap-1.5 bg-purple-950/40 hover:bg-purple-900/40 text-purple-400 hover:text-purple-300 rounded-lg text-[10px] font-bold border border-purple-500/20 cursor-pointer transition-all active:scale-95"
                title="Comemorar Sucesso na Entrevista! 🏆"
                id="floating-celebrate-sucess-btn"
              >
                <Trophy className="h-3 w-3 text-amber-400 animate-pulse" />
                <span>Celebrar!</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
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
