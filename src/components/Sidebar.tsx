import React from 'react';
import { 
  User, 
  Briefcase, 
  Code2, 
  Cpu, 
  GraduationCap, 
  Linkedin, 
  Github, 
  Mail, 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare,
  Bot,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onOpenRecruiterBot: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed,
  onOpenRecruiterBot,
  theme,
  toggleTheme
}: SidebarProps) {
  
  const menuItems = [
    { id: 'sobre', label: 'Sobre', icon: User },
    { id: 'experiencia', label: 'Experiência', icon: Briefcase },
    { id: 'projetos', label: 'Projetos', icon: Code2 },
    { id: 'habilidades', label: 'Habilidades', icon: Cpu },
    { id: 'certificacoes', label: 'Certificações / Cursos', icon: GraduationCap },
    { id: 'dossie', label: 'Dossiê Compatibilidade 📄', icon: Sparkles },
  ];

  return (
    <aside 
      className={`bg-white/[0.07] backdrop-blur-xl border-r border-[#d4af37]/35 flex flex-col justify-between transition-all duration-300 h-screen sticky top-0 z-40
        ${collapsed ? 'w-20' : 'w-72'} 
        md:flex hidden`}
      id="portfolio-sidebar"
    >
      {/* Top Brand Block */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-[#d4af37] flex items-center justify-center font-display font-bold text-black text-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            PO
          </div>
          {!collapsed && (
            <div className="flex flex-col animate-fade-in">
              <span className="font-display font-bold text-white text-lg tracking-wide whitespace-nowrap">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[#e5c158] text-xs font-medium tracking-tight">
                Dados & Automação
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all group duration-200 cursor-pointer
                ${isActive 
                  ? 'bg-white/10 text-[#e5c158] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#e5c158]' : 'text-zinc-400 group-hover:text-[#e5c158]'}`} />
              {!collapsed && <span className="text-sm font-sans tracking-wide whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}

        {/* Special Button for IA Recrutadora in Sidebar as well to ensure accessibility */}
        <button
          onClick={onOpenRecruiterBot}
          id="nav-item-ia-recrutadora"
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-[#e5c158] hover:bg-[#d4af37]/15 border border-dashed border-[#d4af37]/40 transition-all group duration-200 cursor-pointer"
        >
          <Bot className="h-5 w-5 flex-shrink-0 text-[#e5c158] group-hover:scale-110" />
          {!collapsed && <span className="text-sm font-sans tracking-wide whitespace-nowrap">Entrevistar via IA</span>}
        </button>
      </nav>

      {/* Footer Contact & Action Blocks */}
      <div className="p-4 border-t border-[#d4af37]/30 space-y-4">
        {!collapsed && (
          <div className="px-2 animate-fade-in space-y-2">
            <span className="text-zinc-400 text-[10px] font-mono tracking-wider uppercase block">
              Contato
            </span>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="text-zinc-200 hover:text-[#e5c158] text-xs font-mono flex items-center gap-2 truncate"
              title={PERSONAL_INFO.email}
              id="sidebar-email-link"
            >
              <Mail className="h-4.0 w-4.0 text-[#e5c158] flex-shrink-0" />
              <span className="truncate">{PERSONAL_INFO.email}</span>
            </a>
          </div>
        )}

        {/* Social Buttons Flow */}
        <div className={`flex items-center gap-2 ${collapsed ? 'justify-center flex-col' : 'px-2'}`}>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="sidebar-linkedin-btn"
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-[#e5c158] border border-[#d4af37]/30 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            id="sidebar-github-btn"
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-[#e5c158] border border-[#d4af37]/30 transition-colors"
            title="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>

          {/* Theme switcher button */}
          <button
            onClick={toggleTheme}
            id="theme-toggler-btn"
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-[#e5c158] border border-[#d4af37]/30 transition-colors cursor-pointer"
            title={theme === 'dark' ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-[#e5c158]" /> : <Moon className="h-4.5 w-4.5 text-zinc-400" />}
          </button>
          
          {/* Collapse Trigger Button inside sidebar footer matching Gustavo's Layout */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            id="sidebar-collapse-btn"
            className={`h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-[#e5c158] border border-[#d4af37]/30 transition-colors ${collapsed ? '' : 'ml-auto'}`}
            title={collapsed ? "Expandir Menu" : "Recolher Menu"}
          >
            {collapsed ? <ChevronRight className="h-4.5 w-4.5" /> : <ChevronLeft className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
