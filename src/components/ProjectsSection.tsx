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
  CreditCard,
  Calculator,
  Sun,
  History,
  Settings,
  ShoppingCart,
  Package,
  Users,
  Truck,
  ArrowRight,
  Lock,
  Mail,
  User,
  TrendingUp,
  Coins,
  BarChart2,
  CheckCircle2,
  Layers,
  Database,
  MessageSquare,
  Plus,
  Play,
  Check
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
                className="backdrop-blur-md bg-[#0b0f19]/50 border border-[#1e293b] rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between group"
                id={`project-card-${project.id}`}
              >
                {/* Project visual header banner */}
                <div className="relative h-48 w-full overflow-hidden border-b border-zinc-900 bg-zinc-950">
                  {project.id === 'macro-scenario-engine' ? (
                    <div className="w-full h-full relative group-hover:scale-[1.03] transition-transform duration-500 overflow-hidden bg-[#a6cfe2]">
                      {/* Diagonal stripe background pattern */}
                      <div className="absolute inset-0 opacity-[0.15]" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #1e3a5f, #1e3a5f 1.5px, transparent 1.5px, transparent 10px)'
                      }}></div>

                      {/* Responsive HTML/SVG Vector Illustration matching the image exactly */}
                      <svg viewBox="0 0 400 200" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                        {/* Soft white clouds */}
                        <path d="M 280,25 C 275,25 272,30 275,34 C 270,34 268,39 272,42 C 274,45 285,45 288,42 C 293,42 295,37 292,34 C 292,30 285,25 280,25 Z" fill="#ffffff" opacity="0.85" />
                        <path d="M 340,55 C 337,55 335,58 337,60 C 333,60 332,63 334,65 C 336,67 344,67 346,65 C 350,65 351,62 349,60 C 349,58 344,55 340,55 Z" fill="#ffffff" opacity="0.65" />
                        <path d="M 260,35 C 258,35 257,37 258,38 C 255,38 254,40 255,42 C 256,43 262,43 263,42 C 265,42 266,40 265,38 C 265,37 262,35 260,35 Z" fill="#ffb3b3" opacity="0.5" /> {/* pinkish cloud */}

                        {/* Background light blue soft circular shadow area */}
                        <circle cx="200" cy="110" r="85" fill="#cce6f4" opacity="0.5" />

                        {/* Dark teal ground floor */}
                        <rect x="98" y="175" width="204" height="12" rx="6" fill="#2d6a7f" />

                        {/* Left vegetation/ferns */}
                        <path d="M 68,140 Q 75,115 88,140" stroke="#4a7c91" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
                        <path d="M 60,150 Q 70,128 80,150" stroke="#4a7c91" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
                        <path d="M 78,145 Q 85,120 95,145" stroke="#4a7c91" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.7" />

                        {/* Pink Soil Mound for the main plant */}
                        <path d="M 137,180 C 137,168 190,168 190,180 Z" fill="#ffb3b3" />

                        {/* Central growing green plant with 5 leaves */}
                        <g>
                          {/* Stem */}
                          <line x1="163" y1="180" x2="163" y2="135" stroke="#1b6051" strokeWidth="3" strokeLinecap="round" />
                          {/* Leaves */}
                          <path d="M 163,165 C 150,165 145,152 163,150 Z" fill="#1b6051" />
                          <path d="M 163,165 C 176,165 181,152 163,150 Z" fill="#1b6051" />
                          <path d="M 163,148 C 148,148 143,135 163,133 Z" fill="#277d6b" />
                          <path d="M 163,148 C 178,148 183,135 163,133 Z" fill="#277d6b" />
                          <path d="M 163,133 C 155,120 171,120 163,133 Z" fill="#2a8c77" />
                        </g>

                        {/* Analyst figure with magnifying glass */}
                        <g>
                          {/* Body / Suit */}
                          <line x1="115" y1="147" x2="115" y2="182" stroke="#686282" strokeWidth="3.5" strokeLinecap="round" /> {/* Legs */}
                          <line x1="124" y1="147" x2="124" y2="182" stroke="#686282" strokeWidth="3.5" strokeLinecap="round" />
                          <rect x="109" y="125" width="22" height="24" rx="5" fill="#1e1e24" /> {/* Coat */}
                          {/* Head */}
                          <circle cx="117" cy="116" r="6" fill="#fdf0ed" />
                          <rect x="111" y="116" width="12" height="4" fill="#1e1e24" /> {/* Beard/Hair style */}
                          {/* Arms */}
                          <path d="M 109,130 C 104,135 106,145 112,142" stroke="#1e1e24" strokeWidth="3" fill="none" strokeLinecap="round" /> {/* Left arm */}
                          <path d="M 128,130 C 135,130 137,138 136,142" stroke="#1e1e24" strokeWidth="3" fill="none" strokeLinecap="round" /> {/* Right arm holding glass */}
                          
                          {/* Magnifying Glass */}
                          <line x1="136" y1="142" x2="136" y2="152" stroke="#ff7c7c" strokeWidth="3.5" strokeLinecap="round" /> {/* Handle */}
                          <circle cx="139" cy="119" r="10" stroke="#718c99" strokeWidth="2.5" fill="#ffffff" fillOpacity="0.4" /> {/* Frame */}
                        </g>

                        {/* Chart Area Inside Hand Frame */}
                        {/* Bar charts (pastel blue & coral) */}
                        <g opacity="0.85">
                          <rect x="201" y="70" width="5" height="50" fill="#acd9e6" />
                          <rect x="209" y="88" width="5" height="32" fill="#ffb3b3" />
                          <rect x="216" y="55" width="5" height="65" fill="#acd9e6" />
                          <rect x="223" y="72" width="5" height="48" fill="#ffb3b3" />
                          <rect x="230" y="82" width="5" height="38" fill="#acd9e6" />
                          <rect x="237" y="65" width="5" height="55" fill="#acd9e6" />
                          <rect x="244" y="92" width="5" height="28" fill="#ffb3b3" />
                        </g>

                        {/* Zig-Zag Lines & Nodes */}
                        <polyline points="156,105 182,85 208,110 234,70 255,108 277,68" fill="none" stroke="#252431" strokeWidth="2" strokeLinecap="round" />
                        <polyline points="156,110 166,95 181,105 198,82 212,102 232,85 245,115 258,92 277,105" fill="none" stroke="#ff5c5c" strokeWidth="1.5" strokeLinecap="round" />
                        
                        {/* Chart Dots */}
                        <circle cx="156" cy="105" r="2.5" fill="#ff5c5c" />
                        <circle cx="182" cy="85" r="2.5" fill="#252431" />
                        <circle cx="208" cy="110" r="2.5" fill="#ff5c5c" />
                        <circle cx="234" cy="70" r="2.5" fill="#252431" />
                        <circle cx="255" cy="108" r="2.5" fill="#ff5c5c" />
                        <circle cx="277" cy="68" r="2.5" fill="#252431" />

                        {/* Little sparkling star elements */}
                        <path d="M 180,95 L 182,92 L 180,89 L 178,92 Z" fill="#ffffff" />
                        <path d="M 255,75 L 257,72 L 255,69 L 253,72 Z" fill="#ffffff" />

                        {/* Left giant hand (coming from top left) */}
                        <g>
                          {/* Sleeve / Cuff */}
                          <rect x="-10" y="23" width="94" height="43" fill="#252431" /> {/* Black suit sleeve */}
                          <path d="M 84,27 L 84,62 L 72,62 L 72,27 Z" fill="#ffd5df" /> {/* Pink cuff */}
                          <circle cx="78" cy="34" r="2.5" fill="#ffffff" /> {/* Cuff link */}
                          
                          {/* White hand outline & fingers */}
                          <path d="M 84,25 
                                   C 110,23 150,23 158,23 
                                   C 170,23 176,33 176,36
                                   C 176,39 168,43 150,43
                                   C 142,43 140,50 144,58
                                   C 146,63 152,78 152,90
                                   C 152,95 146,98 140,98
                                   C 134,98 131,90 131,80
                                   C 131,70 135,65 135,55
                                   C 125,55 124,63 124,70
                                   C 124,78 116,81 110,81
                                   C 104,81 102,74 102,64
                                   C 102,55 106,52 106,45
                                   C 96,45 94,52 94,59
                                   C 94,66 88,69 82,69
                                   C 76,69 74,62 74,48
                                   C 74,38 80,30 84,25 Z" fill="#ffffff" />
                        </g>

                        {/* Right giant hand (coming from bottom right) */}
                        <g>
                          {/* Sleeve / Cuff */}
                          <rect x="320" y="125" width="94" height="43" fill="#252431" /> {/* Black suit sleeve */}
                          <path d="M 320,129 L 320,164 L 308,164 L 308,129 Z" fill="#ffd5df" /> {/* Pink cuff */}
                          <circle cx="314" cy="157" r="2.5" fill="#ffffff" /> {/* Cuff link */}
                          
                          {/* White hand outline & fingers */}
                          <path d="M 308,166
                                   C 282,168 242,168 234,168
                                   C 222,168 216,158 216,155
                                   C 216,152 224,148 242,148
                                   C 250,148 252,141 248,133
                                   C 246,128 240,113 240,101
                                   C 240,96 246,93 252,93
                                   C 258,93 261,101 261,111
                                   C 261,121 257,126 257,136
                                   C 267,136 268,128 268,121
                                   C 268,113 276,110 282,110
                                   C 288,110 290,117 290,127
                                   C 290,136 286,139 286,146
                                   C 296,146 298,139 298,132
                                   C 298,125 304,122 310,122
                                   C 316,122 318,129 318,143
                                   C 318,153 312,161 308,166 Z" fill="#ffffff" />
                        </g>
                      </svg>

                      {/* Interactive focus frame outline on hover */}
                      <div className="absolute inset-0 border border-transparent group-hover:border-white/10 pointer-events-none transition-all duration-300"></div>
                    </div>
                  ) : project.id === 'mentoria-tech' ? (

                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500 bg-[#080d1a] overflow-hidden flex items-center justify-center">
                      {/* Workstation blurred background */}
                      <img 
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80" 
                        alt="Mentoria Tech / Hub Workstation" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-[1px]"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Cyber city grid lines overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080d1a]/80 to-[#080d1a]"></div>
                      
                      {/* Network & Central Glowing M Container */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                        {/* Glowing M hub */}
                        <div className="relative w-16 h-16 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
                          {/* Inner glowing icon */}
                          <span className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 tracking-wider">
                            M
                          </span>
                          
                          {/* Orbiting nodes lines */}
                          <div className="absolute inset-[-8px] border border-dashed border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                          <div className="absolute inset-[-16px] border border-dotted border-indigo-500/15 rounded-full animate-[spin_20s_linear_infinite] reverse"></div>
                        </div>

                        {/* Floating Badges pointing to center */}
                        {/* Top Left */}
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-lg border border-blue-500/20 bg-[#0b1329]/95 shadow-[0_0_10px_rgba(59,130,246,0.15)] backdrop-blur-sm scale-[0.75] origin-top-left">
                          <span className="text-[10px] font-mono font-bold text-blue-300 tracking-wide uppercase">VALORAÇÃO TÉCNICA</span>
                        </div>

                        {/* Top Right */}
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg border border-cyan-500/20 bg-[#0b1329]/95 shadow-[0_0_10px_rgba(34,211,238,0.15)] backdrop-blur-sm scale-[0.75] origin-top-right">
                          <span className="text-[10px] font-mono font-bold text-cyan-300 tracking-wide uppercase">PLANO DE CARREIRA SÊNIOR</span>
                        </div>

                        {/* Middle Left */}
                        <div className="absolute top-[52px] left-1 px-2 py-1 rounded-lg border border-purple-500/25 bg-[#0b1329]/95 shadow-[0_0_10px_rgba(168,85,247,0.15)] backdrop-blur-sm scale-[0.7] origin-left">
                          <span className="text-[9px] font-mono font-semibold text-purple-300">CONHECIMENTOS: PYTHON, JS, SQL...</span>
                        </div>

                        {/* Middle Right */}
                        <div className="absolute top-[52px] right-1 px-2 py-1 rounded-lg border border-indigo-500/25 bg-[#0b1329]/95 shadow-[0_0_10px_rgba(99,102,241,0.15)] backdrop-blur-sm scale-[0.7] origin-right">
                          <span className="text-[9px] font-mono font-semibold text-indigo-300">3 PASSOS PRÁTICOS (3 MESES)</span>
                        </div>

                        {/* Bottom Left */}
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg border border-rose-500/20 bg-[#0b1329]/95 shadow-[0_0_10px_rgba(244,63,94,0.15)] backdrop-blur-sm scale-[0.75] origin-bottom-left">
                          <span className="text-[9px] font-mono font-semibold text-rose-300">SOFT SKILLS & LIDERANÇA</span>
                        </div>

                        {/* Bottom Right */}
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg border border-emerald-500/20 bg-[#0b1329]/95 shadow-[0_0_10px_rgba(16,185,129,0.15)] backdrop-blur-sm scale-[0.75] origin-bottom-right">
                          <span className="text-[9px] font-mono font-semibold text-emerald-300">HUMANIZADO & ESTRATÉGICO</span>
                        </div>
                      </div>
                    </div>
                  ) : project.id === 'planej-ai' ? (
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500 bg-[#030712] overflow-hidden flex flex-col justify-between text-white p-3 font-sans select-none">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:10px_10px] opacity-10"></div>
                      
                      {/* Top Bar Mockup */}
                      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-1.5 relative z-10">
                        {/* Logo on Left */}
                        <div className="flex items-center gap-1">
                          <div className="w-3.5 h-3.5 rounded-md bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center">
                            <Sparkles className="w-2.5 h-2.5 text-white" />
                          </div>
                          <span className="text-[10px] font-black tracking-tight text-white font-sans">Planej<span className="text-purple-400">.ai</span></span>
                          <span className="text-[6px] font-mono font-bold text-purple-400/80 scale-[0.8] origin-left uppercase">PERSONAL FINANCE AI</span>
                        </div>
                        
                        {/* Control buttons on Right */}
                        <div className="flex items-center gap-1">
                          <Sun className="w-2.5 h-2.5 text-yellow-400/80" />
                          <div className="px-1 py-0.5 rounded border border-zinc-800 bg-zinc-950/60 text-[6px] font-mono text-zinc-400 flex items-center gap-0.5 scale-[0.85] origin-right">
                            <History className="w-1.5 h-1.5 text-zinc-500" />
                            Histórico
                          </div>
                          <div className="px-1 py-0.5 rounded border border-zinc-800 bg-zinc-950/60 text-[6px] font-mono text-zinc-400 flex items-center gap-0.5 scale-[0.85] origin-right">
                            <Settings className="w-1.5 h-1.5 text-zinc-500" />
                            Configuração IA •
                          </div>
                        </div>
                      </div>

                      {/* Middle Hero Mockup */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 my-1 space-y-1">
                        {/* Top Pill Badge */}
                        <div className="px-2 py-0.5 rounded-full border border-purple-500/20 bg-purple-950/25 text-[6px] font-bold text-purple-400 uppercase tracking-widest scale-[0.8] origin-center flex items-center gap-1 shadow-[0_0_8px_rgba(168,85,247,0.1)]">
                          <Sparkles className="w-1.5 h-1.5" />
                          PLANEJAMENTO INTEGRADO COM INTELIGÊNCIA ARTIFICIAL
                        </div>
                        
                        {/* Main Title */}
                        <div className="space-y-0 text-center">
                          <h4 className="text-[11px] font-extrabold tracking-tight text-zinc-100 leading-none">
                            Conquiste seus sonhos
                          </h4>
                          <p className="text-[7px] font-medium text-zinc-400 leading-none py-0.5">com</p>
                          <h4 className="text-[12px] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 drop-shadow-[0_2px_10px_rgba(168,85,247,0.2)]">
                            Planejamento Inteligente
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-[6px] text-zinc-500 max-w-[240px] leading-relaxed scale-[0.9] origin-center">
                          Uma ferramenta simples, sem complicações, que analisa sua renda, custos fixos e aponta um mapa prático detalhado de investimentos e renda extra para realizar seus objetivos.
                        </p>

                        {/* Interactive simulation button */}
                        <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/20 text-[7px] font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:from-purple-500 hover:to-indigo-500 transition-all duration-300">
                          <Calculator className="w-2 h-2" />
                          <span>Iniciar Simulação Financeira</span>
                          <span className="font-bold scale-90">&gt;</span>
                        </div>
                      </div>

                      {/* Footer Info Mockup */}
                      <div className="border-t border-zinc-900/80 pt-1 flex items-center justify-center gap-1 relative z-10 scale-[0.8] origin-bottom">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-[5.5px] font-mono tracking-wider text-zinc-500 uppercase">NENHUM DADO COMPARTILHADO • TOTALMENTE PRIVADO E LOCAL</span>
                      </div>
                    </div>
                  ) : project.id === 'venda-facil' ? (
                    <div className="w-full h-full bg-[#f8fafc] overflow-hidden flex font-sans select-none border-b border-zinc-200">
                      {/* Left Area (Frente de Caixa & Grid) - 58% width */}
                      <div className="w-[58%] h-full p-2.5 flex flex-col justify-between border-r border-slate-200/80">
                        {/* Header logo & Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-md bg-[#00a86b] flex items-center justify-center">
                              <ShoppingCart className="w-2.5 h-2.5 text-white" />
                            </div>
                            <div className="flex flex-col text-left">
                              <div className="flex items-center gap-1 leading-none">
                                <span className="text-[9px] font-extrabold text-[#0f172a] tracking-tight">VendaFácil</span>
                                <span className="px-1 py-0.2 bg-emerald-50 text-[#00a86b] border border-emerald-200 text-[4.5px] font-bold uppercase rounded scale-[0.9] origin-left">
                                  Frente de Caixa
                                </span>
                              </div>
                              <span className="text-[4.5px] font-mono font-bold text-slate-400 tracking-wider">SISTEMA OPERACIONAL COMERCIAL</span>
                            </div>
                          </div>
                          
                          {/* Active state pill */}
                          <div className="px-1.5 py-0.5 rounded-full border border-emerald-100 bg-emerald-50 flex items-center gap-0.5 scale-[0.8] origin-right">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[4.5px] font-bold text-emerald-700 font-mono">Caixa Pronto</span>
                          </div>
                        </div>

                        {/* Middle: Headline text */}
                        <div className="text-left space-y-0.5">
                          <div className="inline-block px-1 py-0.2 rounded bg-emerald-50 border border-emerald-200/60 text-[5px] font-bold text-[#00a86b] uppercase tracking-wider">
                            ⚡ AGILIDADE DIÁRIA
                          </div>
                          <h4 className="text-[10px] font-black leading-tight text-[#0f172a] tracking-tight">
                            Seu caixa digital: <span className="text-[#00a86b]">vender, registrar e fechar</span> sem complicação.
                          </h4>
                        </div>

                        {/* Bottom: 9 Micro Cards Grid */}
                        <div className="grid grid-cols-3 gap-1">
                          {/* Card 1 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">🛒 Abrir Caixa</span>
                              <span className="text-[4px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-0.5 scale-[0.9] origin-right">Frente</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Frente de caixa ágil, carrinho de compras...</p>
                          </div>
                          {/* Card 2 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">📦 Itens & Estoque</span>
                              <span className="text-[4px] text-blue-500 bg-blue-50 border border-blue-100 rounded px-0.5 scale-[0.9] origin-right">Catálogo</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Consulta instantânea de preços, nível...</p>
                          </div>
                          {/* Card 3 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">👥 Clientes & Crediário</span>
                              <span className="text-[4px] text-indigo-500 bg-indigo-50 border border-indigo-100 rounded px-0.5 scale-[0.9] origin-right">Fidelidade</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Fichas de clientes, histórico de...</p>
                          </div>
                          {/* Card 4 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">🚚 Fornecedores</span>
                              <span className="text-[4px] text-amber-500 bg-amber-50 border border-amber-100 rounded px-0.5 scale-[0.9] origin-right">Logística</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Mapeamento de distribuidores e parceiros...</p>
                          </div>
                          {/* Card 5 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">📥 Entrada de Carga</span>
                              <span className="text-[4px] text-pink-500 bg-pink-50 border border-pink-100 rounded px-0.5 scale-[0.9] origin-right">Suprimentos</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Registros de notas e reposições de estoque...</p>
                          </div>
                          {/* Card 6 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">🔄 Fechamento</span>
                              <span className="text-[4px] text-emerald-500 bg-emerald-50 border border-emerald-100 rounded px-0.5 scale-[0.9] origin-right">Controle</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Controles de entrada de turno e sangria...</p>
                          </div>
                          {/* Card 7 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">📉 Contas a Pagar</span>
                              <span className="text-[4px] text-rose-500 bg-rose-50 border border-rose-100 rounded px-0.5 scale-[0.9] origin-right">Saídas</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Controle de despesas diárias e boletos...</p>
                          </div>
                          {/* Card 8 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">📈 Contas a Receber</span>
                              <span className="text-[4px] text-cyan-500 bg-cyan-50 border border-cyan-100 rounded px-0.5 scale-[0.9] origin-right">Recebíveis</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Acompanhamento do faturamento de cartões...</p>
                          </div>
                          {/* Card 9 */}
                          <div className="bg-white border border-slate-100 rounded p-1 text-left flex flex-col justify-between min-h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] font-bold text-slate-800 flex items-center gap-0.5">📊 Resumo de Vendas</span>
                              <span className="text-[4px] text-purple-500 bg-purple-50 border border-purple-100 rounded px-0.5 scale-[0.9] origin-right">Gerencial</span>
                            </div>
                            <p className="text-[4.5px] leading-tight text-slate-400 line-clamp-1">Faturamento do dia, cupom médio e curva...</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Area (Identificação do Operador Form Card) - 42% width */}
                      <div className="w-[42%] h-full bg-white p-3 flex flex-col justify-center items-center">
                        <div className="w-full max-w-[140px] space-y-2 border border-slate-100 rounded-xl p-2.5 bg-[#fdfdfd] shadow-[0_4px_15px_rgba(0,0,0,0.03)] scale-[0.92] origin-center">
                          {/* Heading */}
                          <div className="text-left space-y-0.5">
                            <h4 className="text-[9px] font-black text-[#0f172a] leading-none">Identificação do Operador</h4>
                            <p className="text-[5.5px] text-slate-400 leading-tight">Inicie seu login para ter acesso aos terminais de venda e fechamento.</p>
                          </div>

                          {/* Inputs form */}
                          <div className="space-y-1.5 text-left">
                            {/* Input 1 */}
                            <div className="space-y-0.5">
                              <label className="text-[4.5px] font-bold text-slate-500 font-mono block uppercase">NOME DO OPERADOR (OPCIONAL - EX: JOÃO)</label>
                              <div className="relative flex items-center">
                                <User className="w-2 h-2 text-slate-400 absolute left-1.5" />
                                <input 
                                  type="text" 
                                  readOnly 
                                  placeholder="Seu nome (padrão: Operador)" 
                                  className="w-full pl-4.5 pr-1.5 py-0.8 bg-white border border-slate-200 rounded text-[5.5px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                                />
                              </div>
                            </div>
                            
                            {/* Input 2 */}
                            <div className="space-y-0.5">
                              <label className="text-[4.5px] font-bold text-slate-500 font-mono block uppercase">E-MAIL DO OPERADOR OU SUPERVISOR</label>
                              <div className="relative flex items-center">
                                <Mail className="w-2 h-2 text-slate-400 absolute left-1.5" />
                                <input 
                                  type="text" 
                                  readOnly 
                                  placeholder="demo@empresa.com" 
                                  className="w-full pl-4.5 pr-1.5 py-0.8 bg-white border border-slate-200 rounded text-[5.5px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                                />
                              </div>
                            </div>

                            {/* Input 3 */}
                            <div className="space-y-0.5">
                              <label className="text-[4.5px] font-bold text-slate-500 font-mono block uppercase">SENHA DE ACESSO / CHAVE</label>
                              <div className="relative flex items-center">
                                <Lock className="w-2 h-2 text-slate-400 absolute left-1.5" />
                                <input 
                                  type="password" 
                                  readOnly 
                                  value="••••••••"
                                  className="w-full pl-4.5 pr-4 py-0.8 bg-white border border-slate-200 rounded text-[5.5px] text-slate-700 focus:outline-none focus:border-emerald-500"
                                />
                                <Eye className="w-2 h-2 text-slate-400 absolute right-1.5" />
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button className="w-full py-1 rounded bg-[#00a86b] hover:bg-[#008f5a] text-white text-[7px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all duration-300">
                            <span>Entrar no Caixa</span>
                            <ArrowRight className="w-2 h-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : project.id === 'venda-insights' ? (
                    <div className="w-full h-full bg-[#05070f] overflow-hidden flex flex-col justify-between p-3 select-none text-white font-sans border-b border-zinc-900 relative group">
                      {/* Top Title Bar with 3D colorful bar chart logo */}
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-1.5 text-left">
                          {/* Colored bar chart logo */}
                          <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5">
                            <span className="w-[3px] h-1.5 bg-[#22c55e] rounded-t-[1px]"></span>
                            <span className="w-[3px] h-3 bg-[#f97316] rounded-t-[1px]"></span>
                            <span className="w-[3px] h-2.5 bg-[#3b82f6] rounded-t-[1px]"></span>
                          </div>
                          <h4 className="text-[10px] md:text-[11px] font-black tracking-tight text-white font-sans flex items-center gap-1">
                            Análise de Vendas <span className="text-zinc-400 font-medium">- Projeto Python</span>
                          </h4>
                        </div>
                      </div>

                      {/* Top Horizontal divider line */}
                      <div className="w-full h-[0.5px] bg-zinc-800/80 my-1 relative z-10"></div>

                      {/* Description sub-text */}
                      <p className="text-[6.5px] leading-relaxed text-zinc-300 font-medium px-0.5 text-left relative z-10">
                        Bem-vinda(o) ao projeto de Análise de Vendas! 🚀 Aqui exploramos dados reais de vendas para entender o comportamento dos produtos, clientes, marcas e categorias, gerando insights valiosos para decisões estratégicas.
                      </p>

                      {/* Bottom Horizontal divider line */}
                      <div className="w-full h-[0.5px] bg-zinc-800/80 my-1 relative z-10"></div>

                      {/* Chart Area Container (White Card) */}
                      <div className="flex-1 w-full bg-[#f4faff] rounded border border-zinc-800/50 flex items-center justify-center p-1.5 min-h-[92px] max-h-[105px] overflow-hidden relative z-10 group-hover:scale-[1.01] transition-transform duration-300">
                        <svg viewBox="0 0 240 100" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                          {/* Y-Axis Line */}
                          <line x1="25" y1="10" x2="25" y2="85" stroke="#000000" strokeWidth="1.5" strokeLinecap="square" />
                          
                          {/* Y-Axis Ticks */}
                          <line x1="21" y1="20" x2="25" y2="20" stroke="#000000" strokeWidth="1.5" />
                          <line x1="21" y1="33" x2="25" y2="33" stroke="#000000" strokeWidth="1.5" />
                          <line x1="21" y1="46" x2="25" y2="46" stroke="#000000" strokeWidth="1.5" />
                          <line x1="21" y1="59" x2="25" y2="59" stroke="#000000" strokeWidth="1.5" />
                          <line x1="21" y1="72" x2="25" y2="72" stroke="#000000" strokeWidth="1.5" />
                          
                          {/* X-Axis Line */}
                          <line x1="24" y1="85" x2="225" y2="85" stroke="#000000" strokeWidth="1.5" strokeLinecap="square" />
                          
                          {/* X-Axis Ticks */}
                          <line x1="42" y1="85" x2="42" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="64" y1="85" x2="64" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="86" y1="85" x2="86" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="108" y1="85" x2="108" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="130" y1="85" x2="130" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="152" y1="85" x2="152" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="174" y1="85" x2="174" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="196" y1="85" x2="196" y2="89" stroke="#000000" strokeWidth="1.5" />
                          <line x1="218" y1="85" x2="218" y2="89" stroke="#000000" strokeWidth="1.5" />

                          {/* Blue Bars matching the exact proportions of the image */}
                          {/* Bar 1: Short-medium */}
                          <rect x="34" y="58" width="16" height="27" fill="#6ea8ff" />
                          
                          {/* Bar 2: Medium-tall */}
                          <rect x="56" y="42" width="16" height="43" fill="#6ea8ff" />
                          
                          {/* Bar 3: Very short */}
                          <rect x="78" y="73" width="16" height="12" fill="#6ea8ff" />
                          
                          {/* Bar 4: Tall */}
                          <rect x="100" y="36" width="16" height="49" fill="#6ea8ff" />
                          
                          {/* Bar 5: Medium-low */}
                          <rect x="122" y="55" width="16" height="30" fill="#6ea8ff" />
                          
                          {/* Bar 6: Short */}
                          <rect x="144" y="66" width="16" height="19" fill="#6ea8ff" />
                          
                          {/* Bar 7: Tall */}
                          <rect x="166" y="36" width="16" height="49" fill="#6ea8ff" />
                          
                          {/* Bar 8: Medium-tall */}
                          <rect x="188" y="44" width="16" height="41" fill="#6ea8ff" />
                        </svg>
                      </div>
                    </div>
                  ) : project.id === 'clima' ? (
                    <div className="w-full h-full bg-black overflow-hidden flex flex-col justify-center px-8 relative group font-sans select-none border-b border-zinc-900">
                      {/* Starry Night Canvas Layer */}
                      <div className="absolute inset-0 opacity-40">
                        {/* SVG with starry night constellation dots */}
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10%" cy="20%" r="0.75" fill="#fff" opacity="0.6" />
                          <circle cx="25%" cy="15%" r="1" fill="#fff" opacity="0.8" />
                          <circle cx="35%" cy="45%" r="0.5" fill="#fff" opacity="0.5" />
                          <circle cx="50%" cy="10%" r="0.75" fill="#fff" opacity="0.4" />
                          <circle cx="65%" cy="30%" r="1.2" fill="#fff" opacity="0.9" />
                          <circle cx="80%" cy="15%" r="0.5" fill="#fff" opacity="0.5" />
                          <circle cx="90%" cy="40%" r="1" fill="#fff" opacity="0.7" />
                          <circle cx="15%" cy="75%" r="0.6" fill="#fff" opacity="0.3" />
                          <circle cx="30%" cy="85%" r="1" fill="#fff" opacity="0.8" />
                          <circle cx="45%" cy="65%" r="0.75" fill="#fff" opacity="0.5" />
                          <circle cx="60%" cy="80%" r="0.5" fill="#fff" opacity="0.4" />
                          <circle cx="75%" cy="70%" r="1.5" fill="#fff" opacity="0.9" className="animate-pulse" />
                          <circle cx="85%" cy="90%" r="0.6" fill="#fff" opacity="0.6" />
                          
                          <circle cx="5%" cy="50%" r="0.5" fill="#fff" opacity="0.3" />
                          <circle cx="95%" cy="60%" r="0.75" fill="#fff" opacity="0.5" />
                          <circle cx="40%" cy="25%" r="1" fill="#fff" opacity="0.6" />
                          <circle cx="70%" cy="50%" r="0.5" fill="#fff" opacity="0.4" />
                        </svg>
                      </div>

                      {/* Smooth dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

                      {/* Text content matching the image exactly */}
                      <div className="relative z-10 text-left space-y-2 max-w-[85%]">
                        <div className="space-y-1">
                          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                            Análise de Dados
                          </h4>
                          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                            Meteorológicos: Visão Geral
                          </h4>
                        </div>
                        <p className="text-[10px] md:text-xs text-zinc-400 font-normal leading-relaxed max-w-[280px] md:max-w-[340px]">
                          Uma jornada pelos dados climáticos, revelando padrões e insights essenciais para a compreensão do nosso ambiente.
                        </p>
                      </div>
                    </div>
                  ) : project.id === 'aws-restart' ? (
                    <div className="w-full h-full bg-[#0d1f3d] overflow-hidden flex flex-col justify-between font-sans select-none border-b border-zinc-900 group">
                      {/* Top Sky panel with networks and skyline */}
                      <div className="h-[65%] w-full bg-gradient-to-b from-[#1351be] via-[#1a4387] to-[#0c162c] relative overflow-hidden flex flex-col justify-end">
                        <svg viewBox="0 0 400 130" className="w-full h-full absolute inset-0 select-none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#1351be" />
                              <stop offset="60%" stopColor="#1a4387" />
                              <stop offset="100%" stopColor="#0c162c" />
                            </linearGradient>
                            <linearGradient id="cloudGlow" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.6" />
                            </linearGradient>
                          </defs>

                          {/* Network connection paths radiating outwards */}
                          <g stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.3">
                            <path d="M 130,55 Q 80,45 35,25" />
                            <path d="M 135,70 Q 75,85 45,110" />
                            <path d="M 270,55 Q 320,45 365,25" />
                            <path d="M 265,70 Q 325,85 355,110" />
                            <path d="M 200,20 Q 220,10 240,5" />
                            <path d="M 200,20 Q 180,10 160,5" />
                            <path d="M 125,40 C 90,30 50,45 25,15" />
                            <path d="M 275,40 C 310,30 350,45 375,15" />
                          </g>

                          {/* Network nodes/circles at endpoints */}
                          <g fill="#ffffff" opacity="0.75">
                            <circle cx="35" cy="25" r="2.5" />
                            <circle cx="45" cy="110" r="2" />
                            <circle cx="365" cy="25" r="2.5" />
                            <circle cx="355" cy="110" r="2" />
                            <circle cx="240" cy="5" r="1.5" />
                            <circle cx="160" cy="5" r="1.5" />
                            <circle cx="25" cy="15" r="2" />
                            <circle cx="375" cy="15" r="2" />
                          </g>

                          {/* Double Layer City Skyline Silhouette */}
                          {/* Back Skyline */}
                          <path d="M 0,130 L 10,130 L 10,95 L 25,95 L 25,130 L 40,130 L 40,80 L 60,80 L 60,130 L 80,130 L 80,100 L 95,100 L 95,130 L 115,130 L 115,75 L 135,75 L 135,130 L 150,130 L 150,90 L 170,90 L 170,130 L 190,130 L 190,70 L 210,70 L 210,130 L 230,130 L 230,85 L 245,85 L 245,130 L 265,130 L 265,60 L 285,60 L 285,130 L 305,130 L 305,95 L 320,95 L 320,130 L 340,130 L 340,75 L 360,75 L 360,130 L 380,130 L 380,90 L 395,90 L 395,130 L 400,130 Z" fill="#142340" opacity="0.7" />

                          {/* Front Skyline */}
                          <path d="M 0,130 L 20,130 L 20,105 L 35,105 L 35,130 L 55,130 L 55,85 L 75,85 L 75,130 L 95,130 L 95,110 L 110,110 L 110,130 L 130,130 L 130,95 L 150,95 L 150,130 L 175,130 L 175,80 L 200,80 L 200,130 L 220,130 L 220,105 L 235,105 L 235,130 L 255,130 L 255,90 L 275,90 L 275,130 L 295,130 L 295,110 L 310,110 L 310,130 L 330,130 L 330,85 L 350,85 L 350,130 L 370,130 L 370,100 L 385,100 L 385,130 L 400,130 Z" fill="#080e1a" />

                          {/* Glowing building windows */}
                          <g fill="#eab308" opacity="0.8">
                            <rect x="25" y="115" width="2" height="2" />
                            <rect x="29" y="115" width="2" height="2" />
                            <rect x="25" y="121" width="2" height="2" opacity="0.6" />
                            <rect x="60" y="95" width="2" height="2" />
                            <rect x="65" y="95" width="2" height="2" fill="#38bdf8" />
                            <rect x="60" y="105" width="2" height="2" />
                            <rect x="140" y="105" width="2" height="2" />
                            <rect x="144" y="105" width="2" height="2" opacity="0.6" />
                            <rect x="180" y="90" width="2" height="3" />
                            <rect x="185" y="90" width="2" height="3" opacity="0.5" />
                            <rect x="190" y="90" width="2" height="3" />
                            <rect x="260" y="100" width="2" height="2" fill="#38bdf8" />
                            <rect x="265" y="100" width="2" height="2" />
                            <rect x="340" y="95" width="2" height="2" />
                            <rect x="340" y="105" width="2" height="2" opacity="0.6" />
                          </g>

                          {/* Central Dashed Digital Cloud */}
                          <g filter="drop-shadow(0px 2px 10px rgba(255,255,255,0.15))" className="group-hover:scale-[1.02] origin-center transition-transform duration-500">
                            {/* Translucent white cloud interior fill */}
                            <path d="M 140,80 C 130,80 120,70 125,55 C 125,40 140,25 160,30 C 170,15 200,10 220,25 C 235,15 265,20 270,40 C 285,40 295,50 290,65 C 290,80 275,80 260,80 Z" fill="#ffffff" opacity="0.08" />
                            
                            {/* Main glowing white cloud outline */}
                            <path d="M 140,80 C 130,80 120,70 125,55 C 125,40 140,25 160,30 C 170,15 200,10 220,25 C 235,15 265,20 270,40 C 285,40 295,50 290,65 C 290,80 275,80 260,80 Z" stroke="url(#cloudGlow)" strokeWidth="2" strokeDasharray="5,3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Floating Digital Square Pixels Inside the Cloud */}
                            <g fill="#ffffff">
                              <rect x="155" y="45" width="4" height="4" opacity="0.4" />
                              <rect x="165" y="55" width="5" height="5" opacity="0.8" />
                              <rect x="180" y="35" width="6" height="6" opacity="0.5" />
                              <rect x="195" y="50" width="4" height="4" opacity="0.9" />
                              <rect x="210" y="40" width="5" height="5" opacity="0.3" />
                              <rect x="220" y="60" width="4" height="4" opacity="0.7" />
                              <rect x="235" y="35" width="5" height="5" opacity="0.6" />
                              <rect x="245" y="50" width="6" height="6" opacity="0.8" />
                              <rect x="175" y="65" width="4" height="4" opacity="0.5" />
                              <rect x="225" y="50" width="5" height="5" opacity="0.4" />
                              <rect x="190" y="65" width="5" height="5" opacity="0.7" />
                              <rect x="205" y="25" width="4" height="4" opacity="0.6" />
                              <rect x="185" y="48" width="5" height="5" opacity="0.9" />
                            </g>
                          </g>
                          
                          {/* Vibrant blue divider line inside SVG */}
                          <rect x="0" y="128.5" width="400" height="1.5" fill="#00a2e8" />
                        </svg>
                      </div>

                      {/* Bottom Escola da Nuvem logo panel */}
                      <div className="h-[35%] w-full bg-[#f8fafc] flex items-center justify-center p-2 relative">
                        <svg viewBox="0 0 200 70" className="h-full select-none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="logoCloudGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#0ea5e9" />
                              <stop offset="100%" stopColor="#00b4d8" />
                            </linearGradient>
                          </defs>

                          {/* Brand Typography */}
                          <text x="45" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="400" fill="#475569" letterSpacing="-0.03em">escola</text>
                          <text x="45" y="37" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="400" fill="#475569" letterSpacing="-0.03em">da</text>
                          <text x="45" y="56" fontFamily="system-ui, -apple-system, sans-serif" fontSize="19.5" fontWeight="800" fill="#1e293b" letterSpacing="-0.04em">nuvem.</text>

                          {/* Beautiful matching cloud outline next to 'da' */}
                          <path 
                            d="M 68,36 C 66,33 67,27 72,27 C 75,21 83,21 86,26 C 90,24 95,28 94,33 C 98,34 98,39 94,40 L 70,40 C 67,40 67,37 68,36 Z" 
                            fill="none" 
                            stroke="url(#logoCloudGrad)" 
                            strokeWidth="2.2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                          />
                        </svg>
                      </div>
                    </div>
                  ) : project.id === 'simulador-emprestimo' ? (
                    <div className="w-full h-full bg-[#060813] overflow-hidden flex flex-col justify-between font-sans select-none border-b border-zinc-950 relative group">
                      {/* Grid background overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25"></div>
                      
                      {/* Interactive Connector Wires (SVG Layer) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#a855f7" strokeWidth="1" strokeDasharray="3,3" fill="none">
                          <path d="M 65,42 Q 100,42 125,55" />
                          <path d="M 235,90 Q 255,90 275,65" />
                          <path d="M 385,55 Q 405,55 425,75" />
                          <path d="M 535,75 Q 560,75 575,110" />
                        </g>
                        <g stroke="#f97316" strokeWidth="1.2" fill="none" opacity="0.6">
                          <path d="M 235,110 C 255,115 255,145 275,145" />
                          <path d="M 385,155 Q 405,155 425,140" />
                          <path d="M 535,140 Q 560,140 575,145" />
                          <path d="M 685,110 Q 710,110 725,120" />
                        </g>
                      </svg>

                      {/* Header Editor Top Bar */}
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm relative z-10">
                        {/* Title and breadcrumb */}
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded bg-purple-600 flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                            <Bot className="w-2.5 h-2.5 text-white" />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest">Typebot /</span>
                            <span className="text-[9px] font-bold text-zinc-100 tracking-tight">Simulador de Atendimento</span>
                          </div>
                        </div>

                        {/* Control actions */}
                        <div className="flex items-center gap-1.5 scale-[0.85] origin-right">
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[5.5px] font-bold text-emerald-400">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                            PUBLICADO
                          </span>
                          <span className="text-[6px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5">
                            v2.4.1
                          </span>
                        </div>
                      </div>

                      {/* Flow Builder Canvas with Horizontally Scrollable Nodes */}
                      <div className="flex-1 w-full overflow-x-auto overflow-y-hidden flex items-start gap-4 p-3 relative z-10 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        
                        {/* Node Group 1: Onboarding */}
                        <div className="flex flex-col gap-2 min-w-[140px] max-w-[140px] shrink-0 text-left">
                          {/* Start Flag */}
                          <div className="bg-[#18181b] border border-zinc-800 rounded-lg p-1.5 shadow-lg flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#f97316]/25 border border-[#f97316] flex items-center justify-center">
                              <Play className="w-1.5 h-1.5 text-[#f97316] fill-[#f97316]" />
                            </div>
                            <span className="text-[7.5px] font-extrabold text-zinc-100 uppercase tracking-wider">Início do Fluxo</span>
                          </div>

                          {/* Saudação card */}
                          <div className="bg-[#121214]/95 border border-zinc-800/80 rounded-xl p-2 shadow-lg space-y-1.5 relative">
                            <div className="flex items-center justify-between border-b border-zinc-800/50 pb-1">
                              <span className="text-[6.5px] font-bold text-[#f97316] font-mono">#saudacao</span>
                              <MessageSquare className="w-2.5 h-2.5 text-zinc-500" />
                            </div>
                            <p className="text-[6px] text-zinc-400 leading-relaxed">
                              Olá! Seja muito bem-vindo(a) à nossa <strong>simulação de atendimento</strong>! 💬
                            </p>
                            <div className="bg-purple-950/40 border border-purple-500/20 rounded p-1 flex items-center justify-between text-[5.5px]">
                              <span className="text-purple-400 font-mono">nome_candidato</span>
                              <span className="text-zinc-500 text-[4.5px] font-mono uppercase">Input</span>
                            </div>
                          </div>
                        </div>

                        {/* Node Group 2: Instructions (Tall) */}
                        <div className="flex flex-col gap-2 min-w-[145px] max-w-[145px] shrink-0 text-left">
                          <div className="bg-[#121214]/95 border border-purple-500/30 rounded-xl p-2 shadow-lg space-y-1.5 relative ring-1 ring-purple-500/10">
                            <div className="flex items-center justify-between border-b border-zinc-800/50 pb-1">
                              <span className="text-[6.5px] font-bold text-purple-400 font-mono">Group #15</span>
                              <div className="px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 text-[4.5px] font-mono uppercase">
                                Ativo
                              </div>
                            </div>
                            <div className="inline-block px-1 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[5px] font-mono font-bold leading-none">
                              {`{x}`} nome_candidato !!
                            </div>
                            <p className="text-[5.5px] text-zinc-400 leading-normal">
                              Antes de começarmos, algumas regras fundamentais para este teste técnico corporativo:
                            </p>
                            <ul className="space-y-0.5 text-[5px] text-zinc-500 list-disc pl-2 leading-tight">
                              <li>As perguntas simulam casos reais de atendimento.</li>
                              <li>Responda com raciocínio próprio e clareza.</li>
                              <li>Evite respostas clonadas ou de IA generativa.</li>
                            </ul>
                            <div className="pt-0.5 border-t border-zinc-800/40 text-[5px] text-zinc-400 font-medium">
                              Boa sorte! 🍀😊
                            </div>
                          </div>
                        </div>

                        {/* Node Group 3: Email Registration */}
                        <div className="flex flex-col gap-2 min-w-[135px] max-w-[135px] shrink-0 text-left">
                          {/* Group 4 text node */}
                          <div className="bg-[#121214]/95 border border-zinc-800/80 rounded-xl p-2 shadow-lg space-y-1">
                            <span className="text-[6.5px] font-bold text-zinc-500 font-mono block">Group #4</span>
                            <p className="text-[6px] text-zinc-400 leading-relaxed">
                              Perfeito! Agora, informe seu e-mail para registrar seu desempenho. ✉️
                            </p>
                          </div>

                          {/* Group 17 Email Input */}
                          <div className="bg-[#121214]/95 border border-zinc-800/80 rounded-xl p-2 shadow-lg space-y-1.5">
                            <div className="flex items-center justify-between text-[6.5px] text-zinc-500 font-mono">
                              <span>Group #17</span>
                              <Mail className="w-2 h-2" />
                            </div>
                            <div className="border border-zinc-800 bg-zinc-900 rounded p-1 text-[5.5px] text-zinc-400 font-mono flex items-center justify-between">
                              <span>seuemail@exemplo.com</span>
                              <span className="text-zinc-600 scale-[0.8]">&gt;</span>
                            </div>
                            <div className="bg-purple-950/30 border border-purple-500/10 rounded p-0.5 text-[5px] text-purple-400 font-mono text-center">
                              Set: email_candidato
                            </div>
                          </div>
                        </div>

                        {/* Node Group 4: Loans Core Simulator */}
                        <div className="flex flex-col gap-2 min-w-[150px] max-w-[150px] shrink-0 text-left">
                          {/* Loans Type Question */}
                          <div className="bg-[#121214]/95 border border-zinc-800/80 rounded-xl p-2 shadow-lg space-y-1.5">
                            <span className="text-[6.5px] font-bold text-zinc-500 font-mono block">Group #6 • Tipos de Empréstimo</span>
                            <p className="text-[5.8px] text-zinc-400 leading-relaxed font-semibold">
                              "Quais são os tipos de empréstimos que sua empresa oferece?"
                            </p>
                            <div className="border border-dashed border-zinc-800 p-1 text-[5px] text-zinc-500 font-mono">
                              Sua resposta... [Set: resposta_1]
                            </div>
                          </div>

                          {/* Requirements Question */}
                          <div className="bg-[#121214]/95 border border-zinc-800/80 rounded-xl p-2 shadow-lg space-y-1.5">
                            <span className="text-[6.5px] font-bold text-zinc-500 font-mono block">Group #7 • Requisitos</span>
                            <p className="text-[5.8px] text-zinc-400 leading-relaxed">
                              "Quais são os requisitos básicos para a contratação e análise?"
                            </p>
                            <div className="border border-dashed border-zinc-800 p-1 text-[5px] text-zinc-500 font-mono">
                              Sua resposta... [Set: resposta_2]
                            </div>
                          </div>
                        </div>

                        {/* Node Group 5: Advanced & AI Dispatch */}
                        <div className="flex flex-col gap-2 min-w-[150px] max-w-[150px] shrink-0 text-left">
                          {/* Credit analysis */}
                          <div className="bg-[#121214]/95 border border-zinc-800/80 rounded-xl p-2 shadow-lg space-y-1">
                            <span className="text-[6.5px] font-bold text-zinc-500 font-mono block">Group #8 • Tempo de Análise</span>
                            <p className="text-[5.8px] text-zinc-400 leading-tight">
                              "Como funciona a análise de crédito e tempo médio?"
                            </p>
                            <div className="border border-zinc-800 bg-zinc-900/60 p-0.5 text-[5px] text-zinc-500 font-mono text-center">
                              Set: resposta_3
                            </div>
                          </div>

                          {/* AI Brain Card */}
                          <div className="bg-[#0f0e1d] border border-purple-500/30 rounded-xl p-2 shadow-[0_0_15px_rgba(168,85,247,0.15)] space-y-1.5">
                            <div className="flex items-center justify-between text-[6.5px] text-purple-400 font-mono font-bold">
                              <span>Group #3 • IA Integrada</span>
                              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                            </div>
                            <div className="p-1 rounded bg-[#1e153a]/50 border border-purple-500/20 text-center">
                              <span className="text-[6px] font-bold text-white tracking-wide uppercase">Create Chat Completion</span>
                            </div>
                            <p className="text-[5px] text-purple-300 font-mono text-center leading-none">
                              Model: gemini-1.5-pro
                            </p>
                          </div>
                        </div>

                        {/* Node Group 6: Integrations & Save */}
                        <div className="flex flex-col gap-2 min-w-[140px] max-w-[140px] shrink-0 text-left">
                          {/* Spreadsheet Action */}
                          <div className="bg-[#0c1a14] border border-emerald-500/30 rounded-xl p-2 shadow-md space-y-1">
                            <div className="flex items-center justify-between text-[6.5px] text-emerald-400 font-mono">
                              <span>Google Sheets</span>
                              <Database className="w-2 h-2 text-emerald-400" />
                            </div>
                            <div className="bg-emerald-950/40 p-1 border border-emerald-500/15 rounded text-center text-[5.5px] font-bold text-emerald-300">
                              Insert Row (candidatos)
                            </div>
                          </div>

                          {/* Final Success Card */}
                          <div className="bg-[#0b101d] border border-blue-500/30 rounded-xl p-2 shadow-lg space-y-1">
                            <div className="flex items-center gap-1 text-[6.5px] text-blue-400 font-bold font-mono">
                              <CheckCircle2 className="w-2 h-2 text-blue-400" />
                              <span>Salvo no Banco</span>
                            </div>
                            <p className="text-[5px] text-zinc-400 leading-normal">
                              Sua participação foi registrada e enviada ao avaliador com sucesso!
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Footer Details */}
                      <div className="px-3 py-1 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between relative z-10 text-[6px] text-zinc-500 font-mono">
                        <span>ESTADO DO TRABALHO: SINCRONIZADO COM N8N & SHEETS</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></span>
                          PORTAL DE RECRUTAMENTO ATIVO
                        </span>
                      </div>
                    </div>
                  ) : project.id === 'jornada-dev-totvs' ? (
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                        alt="Jornada DEV - Start+ TOTVS" 
                        className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-black/30"></div>
                      
                      {/* Top-left tag */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold tracking-wider uppercase rounded bg-[#0b0f19]/90 backdrop-blur-sm">
                        Aulas em Julho
                      </div>
                      
                      {/* Interactive banner title mockup */}
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <div className="font-mono text-base md:text-lg font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-1.5 flex-wrap">
                          <span className="text-[#00ffcc] font-black font-sans">&lt;</span>
                          <span className="text-[#00ffcc] font-black font-sans">PROGRAMA</span>
                          <span className="text-white font-black font-sans">START 2026</span>
                          <span className="text-[#00ffcc] font-black font-sans">/&gt;</span>
                        </div>
                      </div>
                    </div>
                  ) : project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105
                      ${project.category === 'ia' 
                        ? 'from-purple-950/40 via-indigo-950/20 to-[#0b0f19]' 
                        : project.category === 'fullstack'
                        ? 'from-blue-950/40 via-sky-950/20 to-[#0b0f19]'
                        : project.category === 'data'
                        ? 'from-emerald-950/40 via-teal-950/20 to-[#0b0f19]'
                        : 'from-amber-950/40 via-orange-950/20 to-[#0b0f19]'
                      }`}
                    >
                      {/* Subtle grid pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
                      
                      {/* Simple futuristic icon accent */}
                      <div className="rounded-2xl p-4 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm text-zinc-500 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all duration-300">
                        {project.category === 'ia' ? (
                          <Bot className="h-6 w-6 text-purple-400" />
                        ) : (
                          <Sparkles className="h-6 w-6 text-indigo-400" />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
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
                  </div>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
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
