import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Bot, 
  Sparkles, 
  ArrowUpRight, 
  PlayCircle,
  Eye,
  Search,
  Filter,
  X,
  CreditCard
} from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ia' | 'fullstack' | 'data' | 'cloud'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for active iframe preview inside the site
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'ia', label: 'IA & Automação' },
    { id: 'fullstack', label: 'SaaS & Full-Stack' },
    { id: 'data', label: 'Engenharia de Dados' },
    { id: 'cloud', label: 'Cloud Computing' }
  ];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenPreview = (url: string, title: string) => {
    setPreviewUrl(url);
    setPreviewTitle(title);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="projects-section-container">
      {/* Header section */}
      <div className="space-y-2 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white">
            Meus Projetos
          </h2>
          <p className="text-zinc-400 font-sans text-sm">
            Uma seleção de trabalhos que combinam design sofisticado, inteligência artificial e alto valor corporativo.
          </p>
        </div>
        
        {/* Search Input bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tag, nome..."
            className="w-full bg-[#0b0f19] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors font-sans"
          />
        </div>
      </div>

      {/* Categories filter tabs */}
      <div className="flex flex-wrap items-center gap-2" id="project-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border
              ${activeCategory === cat.id 
                ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                : 'bg-[#0b0f19] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-gird">
          {filteredProjects.map((project) => {
            const isIa = project.category === 'ia';
            return (
              <div 
                key={project.id}
                className="bg-[#0b0f19]/60 border border-[#1e293b] rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                id={`project-card-${project.id}`}
              >
                <div className="p-6 space-y-4">
                  {/* Category & Badge header */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-[10px] font-bold font-mono uppercase tracking-widest rounded-lg border
                      ${isIa 
                        ? 'bg-purple-950/20 text-purple-400 border-purple-500/20' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {project.category}
                    </span>
                    
                    {/* Repository link badge */}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="Ver no GitHub"
                        id={`github-link-${project.id}`}
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>

                  {/* Title & description */}
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-400 transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-zinc-950/80 border border-zinc-800 text-zinc-500 text-[10px] font-mono px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Actions footer */}
                <div className="p-4 bg-zinc-950/40 border-t border-zinc-900/60 flex items-center justify-between gap-2.5">
                  {project.chatbotUrl ? (
                    <button
                      onClick={() => handleOpenPreview(project.chatbotUrl!, project.title)}
                      id={`test-bot-btn-${project.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 hover:from-purple-900/40 hover:to-indigo-900/40 border border-purple-500/30 text-purple-300 font-medium text-xs rounded-xl transition-all"
                    >
                      <Bot className="h-3.5 w-3.5 text-purple-400" />
                      <span>Testar Chatbot</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  ) : project.liveUrl ? (
                    <button
                      onClick={() => handleOpenPreview(project.liveUrl!, project.title)}
                      id={`open-app-btn-${project.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-xs rounded-xl transition-all"
                    >
                      <Eye className="h-3.5 w-3.5 text-purple-400" />
                      <span>Visualizar Demo</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs rounded-xl transition-all"
                    >
                      <span>Ver Repositório</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b0f19]/30 rounded-2xl border border-zinc-800 space-y-2">
          <p className="text-zinc-500 text-sm font-sans">Nenhum projeto encontrado para os termos pesquisados.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
            className="text-purple-400 text-xs font-semibold hover:underline"
          >
            Limpar filtros e busca
          </button>
        </div>
      )}

      {/* FULL FRAME RESIZE INTEGRATED IFRAME PREVIEW MODAL */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          {/* Overlay mask */}
          <div 
            className="fixed inset-0 bg-black/85 transition-opacity duration-300" 
            onClick={() => setPreviewUrl(null)}
          />

          {/* Dialog Container */}
          <div className="relative bg-[#080b11] rounded-2xl border border-zinc-800 w-full max-w-5xl h-[85vh] flex flex-col justify-between shadow-2xl z-10 animate-fade-in">
            
            {/* Header top row */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                <div>
                  <h3 className="font-display font-medium text-sm text-white">
                    {previewTitle}
                  </h3>
                  <span className="text-zinc-500 text-[10px] font-mono">
                    Ambiente de Simulação Integrados AI Studio
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium rounded-lg border border-zinc-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>Abrir em Nova Aba</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="p-1.5 bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 rounded-lg border border-zinc-800 transition-colors"
                  id="close-iframe-preview-btn"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sandbox content body - iframe frame */}
            <div className="flex-1 bg-black overflow-hidden relative">
              <iframe 
                src={previewUrl} 
                title={previewTitle}
                className="w-full h-full border-none"
                allow="camera; microphone; geolocation"
              />
            </div>

            {/* Simulated footer indicator */}
            <div className="px-6 py-3 border-t border-zinc-900 flex justify-between items-center bg-zinc-950 flex-shrink-0">
              <span className="text-zinc-500 text-[10px] font-mono tracking-wider">
                URL: {previewUrl}
              </span>
              <span className="text-zinc-600 text-[10px] font-mono">
                Pressione ESC para fechar
              </span>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
