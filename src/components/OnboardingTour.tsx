import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, Play, Volume2, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface TourStep {
  targetId: string;
  mobileTargetId?: string;
  title: string;
  description: string;
  tabId: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'nav-item-sobre',
    mobileTargetId: 'mobile-nav-item-sobre',
    title: 'Apresentação & Sobre 👤',
    description: 'Aqui você conhece minha biografia, visão técnica e a ferramenta premium capaz de construir e exportar currículos otimizados para ATS.',
    tabId: 'sobre'
  },
  {
    targetId: 'nav-item-experiencia',
    mobileTargetId: 'mobile-nav-item-experiencia',
    title: 'Histórico Profissional 💼',
    description: 'Explore minha jornada detalhada na área de tecnologia, com conquistas reais e forte foco no fluxo de inteligência empresarial.',
    tabId: 'experiencia'
  },
  {
    targetId: 'nav-item-projetos',
    mobileTargetId: 'mobile-nav-item-projetos',
    title: 'Soluções e Projetos 🚀',
    description: 'Consulte meus projetos em destaque carregados de automação avançada com n8n, inteligência artificial e computação em nuvem.',
    tabId: 'projetos'
  },
  {
    targetId: 'nav-item-habilidades',
    mobileTargetId: 'mobile-nav-item-habilidades',
    title: 'Matriz de Habilidades 📊',
    description: 'Veja detalhadamente minhas soft skills e hard skills divididas por categorias como IA, cloud computing, automações e bancos de dados.',
    tabId: 'habilidades'
  },
  {
    targetId: 'nav-item-certificacoes',
    mobileTargetId: 'mobile-nav-item-certificacoes',
    title: 'Educação & Certificados 🎓',
    description: 'Confira minhas credenciais de peso e certificações oficiais de destaque, como as emitidas pela Amazon Web Services (AWS).',
    tabId: 'certificacoes'
  },
  {
    targetId: 'nav-item-dossie',
    mobileTargetId: 'mobile-nav-item-dossie',
    title: 'Dossiê de Compatibilidade IA 📄',
    description: 'Agora com poder do Gemini-3.5: Cole os requisitos de qualquer vaga corporativa para gerar instantaneamente um parecer analítico comparativo detalhado da Patrícia.',
    tabId: 'dossie'
  },
  {
    targetId: 'nav-item-ia-recrutadora',
    mobileTargetId: 'mobile-nav-item-ia-recrutadora',
    title: 'Assistente e Simulador de Recrutamento 🤖',
    description: 'Clique aqui a qualquer momento para abrir meu Agente de Recrutamento Inteligente e simular uma entrevista realista em tempo real.',
    tabId: 'ia-recrutadora'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tabId: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenRecruiterBot: () => void;
}

export default function OnboardingTour({
  isOpen,
  onClose,
  setActiveTab,
  setMobileMenuOpen,
  onOpenRecruiterBot
}: OnboardingTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check responsive sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Side-effects on step index changes
  useEffect(() => {
    if (!isOpen) return;

    // 1. Automatically switch tab to highlight right content segment
    if (currentStep.tabId === 'ia-recrutadora') {
      // For recruiter assistant, keep current view or switch back to "sobre"
    } else {
      setActiveTab(currentStep.tabId);
    }

    // 2. Control mobile menu state to reveal mobile buttons correctly
    if (isMobile) {
      if (currentStep.tabId === 'ia-recrutadora') {
        setMobileMenuOpen(false);
      } else {
        setMobileMenuOpen(true);
      }
    } else {
      setMobileMenuOpen(false);
    }
  }, [currentStepIndex, isOpen, isMobile, currentStep.tabId, setActiveTab, setMobileMenuOpen]);

  // Keep track of DOM position
  useEffect(() => {
    if (!isOpen) return;

    const findAndSetRect = () => {
      const activeId = isMobile ? currentStep.mobileTargetId : currentStep.targetId;
      if (activeId) {
        const element = document.getElementById(activeId);
        if (element) {
          setRect(element.getBoundingClientRect());
        } else {
          setRect(null);
        }
      }
    };

    // Delay rect acquisition slightly to allow transition render states to settle
    const timeout = setTimeout(findAndSetRect, 220);

    window.addEventListener('resize', findAndSetRect);
    window.addEventListener('scroll', findAndSetRect, true);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', findAndSetRect);
      window.removeEventListener('scroll', findAndSetRect, true);
    };
  }, [currentStepIndex, isOpen, isMobile, currentStep]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Trigger recruiter widget open automatically on finishing if they want to try it
      if (currentStep.tabId === 'ia-recrutadora') {
        onOpenRecruiterBot();
      }
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenPortfolioTour_v1', 'true');
    setActiveTab('sobre');
    setCurrentStepIndex(0);
    
    // Trigger majestic confetti shower in purple, emerald, and silver!
    const colors = ['#a855f7', '#10b981', '#e2e8f0', '#94a3b8'];
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.85 },
      colors
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.85 },
      colors
    });
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 90,
        spread: 90,
        origin: { x: 0.5, y: 0.6 },
        colors
      });
    }, 300);

    onClose();
  };

  // Safe defaults for overlay coordinate tracking
  const padding = 6;
  const rx = 12;
  const x = rect ? rect.left - padding : 0;
  const y = rect ? rect.top - padding : 0;
  const width = rect ? rect.width + padding * 2 : 0;
  const height = rect ? rect.height + padding * 2 : 0;

  // Let's position the help description card
  const cardStyle: React.CSSProperties = {};
  if (rect && !isMobile) {
    // If element is on the left sidebar, place card to its right
    cardStyle.position = 'fixed';
    cardStyle.left = `${rect.right + 24}px`;
    cardStyle.top = `${Math.min(window.innerHeight - 260, Math.max(20, rect.top + (rect.height / 2) - 100))}px`;
    cardStyle.width = '340px';
  } else {
    // Center card on bottom on mobile or fallback
    cardStyle.position = 'fixed';
    cardStyle.bottom = '24px';
    cardStyle.left = '50%';
    cardStyle.transform = 'translate(-50%, 0)';
    cardStyle.width = 'calc(100% - 32px)';
    cardStyle.maxWidth = '380px';
  }

  return (
    <div className="fixed inset-0 z-[9999] select-none" id="onboarding-tour-root">
      {/* Dynamic Clipping Mask SVG Backdrop */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[10000]">
        <defs>
          <mask id="onboarding-cutout-mask">
            {/* White color makes the background visible (opaque) */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black elements subtract from mask, making cutouts fully clear */}
            {rect && (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={rx}
                fill="black"
              />
            )}
          </mask>
        </defs>
        
        {/* Semi-transparent dark overlay applying the cutout mask */}
        <rect
          width="100%"
          height="100%"
          fill="rgba(5, 5, 10, 0.78)"
          mask="url(#onboarding-cutout-mask)"
          className="pointer-events-auto backdrop-blur-[1.5px]"
        />
      </svg>

      {/* Pulsing Visual border focus on active item */}
      {rect && (
        <div
          style={{
            position: 'fixed',
            left: x,
            top: y,
            width: width,
            height: height,
            borderRadius: rx,
          }}
          className="pointer-events-none z-[10001] border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-300"
        />
      )}

      {/* Floating explanation Dialog Card */}
      <div
        style={cardStyle}
        className="z-[10002] bg-[#0c101d] border border-purple-500/40 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7),_0_0_20px_rgba(168,85,247,0.15)] flex flex-col gap-4 animate-fade-in text-zinc-100"
        id="tour-tooltip-card"
      >
        {/* Card Header Info */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="font-display font-bold text-sm tracking-wide text-purple-400">
            Tour do Portfólio ({currentStepIndex + 1} de {TOUR_STEPS.length})
          </span>
          <button
            onClick={handleComplete}
            id="tour-close-corner-btn"
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-zinc-800"
            title="Pular tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Card Body Information */}
        <div className="space-y-1.5 pr-2">
          <h4 className="font-display font-semibold text-white text-base">
            {currentStep.title}
          </h4>
          <p className="text-zinc-400 text-xs font-sans leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Progress Bar indicator */}
        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-purple-500 h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {currentStepIndex === TOUR_STEPS.length - 1 ? (
            <div className="w-full flex justify-end">
              <button
                onClick={handleComplete}
                id="tour-btn-finalizar"
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Finalizar</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleComplete}
                id="tour-btn-pular"
                className="text-zinc-400 hover:text-white text-xs font-medium px-2 py-1.5 hover:underline cursor-pointer"
              >
                Pular tour
              </button>
              
              <div className="flex items-center gap-2">
                {currentStepIndex > 0 && (
                  <button
                    onClick={handlePrev}
                    id="tour-btn-voltar"
                    className="text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Voltar
                  </button>
                )}
                <button
                  onClick={handleNext}
                  id="tour-btn-proximo"
                  className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Próximo</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Block clicks from bypassing the system on non-focused components */}
      <div className="fixed inset-0 bg-transparent z-[9998] pointer-events-auto" />
    </div>
  );
}
