import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Code2, 
  Cpu, 
  GraduationCap, 
  Menu, 
  X, 
  Mail, 
  Github, 
  Linkedin,
  Bot,
  Sun,
  Moon
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import FloatingBot from './components/FloatingBot';
import { PERSONAL_INFO } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sobre');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recruiterWidgetOpen, setRecruiterWidgetOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenRecruiterWidget = () => {
    setRecruiterWidgetOpen(true);
    setMobileMenuOpen(false); // Close mobile menus if any
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'sobre':
        return <AboutSection onNavigateToProjects={() => setActiveTab('projetos')} />;
      case 'experiencia':
        return <ExperienceSection />;
      case 'projetos':
        return <ProjectsSection />;
      case 'habilidades':
        return <SkillsSection />;
      case 'certificacoes':
        return <EducationSection />;
      default:
        return <AboutSection onNavigateToProjects={() => setActiveTab('projetos')} />;
    }
  };

  const tabsMeta = [
    { id: 'sobre', label: 'Sobre', icon: User },
    { id: 'experiencia', label: 'Experiência', icon: Briefcase },
    { id: 'projetos', label: 'Projetos', icon: Code2 },
    { id: 'habilidades', label: 'Habilidades', icon: Cpu },
    { id: 'certificacoes', label: 'Certificações / Cursos', icon: GraduationCap },
  ];

  return (
    <div className={`flex min-h-screen font-sans selection:bg-purple-900/40 selection:text-purple-300 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#030712] text-zinc-100 theme-dark' : 'bg-[#f8fafc] text-slate-900 theme-light'}`} id="main-portfolio-root">
      
      {/* 1. DESKTOP SIDEBAR NAVIGATION */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        onOpenRecruiterBot={handleOpenRecruiterWidget}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. RESPONSIVE MOBILE NAVIGATION HEADER */}
      <header className="md:hidden flex items-center justify-between w-full h-16 bg-[#0b0f19] px-6 border-b border-zinc-800 fixed top-0 z-40" id="mobile-navigation-bar">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center font-display font-bold text-white text-sm shadow-[0_0_10px_rgba(168,85,247,0.4)]">
            PO
          </div>
          <span className="font-display font-semibold text-white tracking-wide text-sm">{PERSONAL_INFO.name}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 bg-zinc-900 rounded-lg text-amber-400 hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
            id="mobile-theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-zinc-400" />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            id="mobile-menu-trigger-btn"
            className="text-zinc-400 hover:text-white p-1"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU NAV PANEL DRAWERS */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#080b11] z-50 flex flex-col justify-between"
            id="mobile-drawer-overlay"
          >
            {/* Top Close Row */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-800">
              <span className="font-display font-bold text-white text-sm">Navegação</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                id="close-mobile-drawer-btn"
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation links block */}
            <nav className="p-6 space-y-3 flex-1 flex flex-col justify-center">
              {tabsMeta.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all w-full
                      ${isActive 
                        ? 'bg-purple-950/40 text-purple-400 border border-purple-500/30' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                      }`}
                  >
                    <Icon className="h-5.5 w-5.5 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <button
                onClick={handleOpenRecruiterWidget}
                className="flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 border border-dashed border-emerald-500/20 w-full transition-all"
              >
                <Bot className="h-5.5 w-5.5 flex-shrink-0 text-emerald-400" />
                <span>Entrevistar via IA (Patricia)</span>
              </button>
            </nav>

            {/* Footer row contacts inside mobile dropdown */}
            <div className="p-6 border-t border-zinc-900 bg-zinc-950/40 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Contato Oficial</span>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs text-zinc-300 font-mono block hover:text-purple-400 truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 rounded-xl flex-1 text-center font-display text-sm font-medium border border-zinc-800 flex items-center justify-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl flex-1 text-center font-display text-sm font-medium border border-zinc-800 flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE MAIN CONTENT FRAME */}
      <main className="flex-1 min-w-0 flex flex-col pt-16 md:pt-0" id="main-content-scroller">
        
        {/* Dynamic Inner wrapper */}
        <div className="max-w-6xl w-full mx-auto px-6 py-8 md:p-12 md:py-16 space-y-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Footer Signature per strict visual guidelines - No Telemetry / Margins clutter */}
        <footer className="mt-auto border-t border-zinc-900/60 py-8 bg-zinc-950/20 text-center">
          <p className="text-[11px] text-zinc-500 font-sans tracking-wide">
            &copy; {new Date().getFullYear()} Patrícia Oliveira &bull; Desenvolvido em React e Tailwind. Todos os direitos reservados.
          </p>
        </footer>
      </main>

      {/* FLOATING CORNER INTERACTIVE RECRUITING ASSISTANT CHATBOT */}
      <FloatingBot isOpen={recruiterWidgetOpen} setIsOpen={setRecruiterWidgetOpen} />
      
    </div>
  );
}
