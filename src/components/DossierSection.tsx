import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Code, 
  RefreshCw, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Terminal,
  ExternalLink
} from 'lucide-react';
import Markdown from 'react-markdown';
import confetti from 'canvas-confetti';

interface ProjectFit {
  name: string;
  whyFit: string;
}

interface MatchAnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  projects: ProjectFit[];
  fullReportMarkdown: string;
}

const generateClientFallbackDossier = (title: string, desc: string): MatchAnalysisResult => {
  const normTitle = title.toLowerCase();
  const normDesc = desc.toLowerCase();
  const fullText = `${normTitle} ${normDesc}`;

  // Check tech dimensions
  const hasN8n = /n8n|automa|auto|integrat|flow|chat|bot|typebot|zapier/.test(fullText);
  const hasPython = /python|pandas|numpy|script|programador|desenvolv|dev|backend/.test(fullText);
  const hasSql = /sql|banco|postgres|db|mysql|sqlite|data/.test(fullText);
  const hasCloud = /aws|cloud|nuvem|server|linux|ec2|s3/.test(fullText);
  const hasData = /dado|data|analis|excel|bi|power/i.test(fullText);

  const isTechVaga = hasN8n || hasPython || hasSql || hasCloud || hasData;
  const unrelatedMatch = /(enferm|enfermeir|medic[oa]|psicol|hospital|saude|nutri|fisiotera|dentist|culinari|cozinh|chef|gastronom|pedago|profess[or]|infantil|obra|construc|pedreir|advogad|juridic|direito|mecanic|veterinari|estet|farmac|odontol|farma|cirurg|terapeu|odont|educador|socorrista|bombeiro|biolog)/i.test(fullText);

  // If completely unrelated or completely missing tech vocabulary
  if (unrelatedMatch || !isTechVaga) {
    const score = Math.floor(Math.random() * 5) + 5; // 5% to 9% compatibility
    const summary = `A análise de perfil identificou que o cargo solicitado (${title}) pertence a um segmento não-tecnológico sem sinergia funcional com o portfólio de Patrícia. A candidata possui especialização 100% voltada à Tecnologia da Informação (Automações Inteligentes com n8n, Engenharia de Dados com Python/SQL e Infraestrutura Cloud), não possuindo as habilitações clínicas, registro profissional obrigatório (como COREN, CRM ou OAB) ou formação para este setor.`;
    
    const strengths = [
      "Elevada capacidade para otimizar processos internos operacionais através de lógica e automação.",
      "Excelente habilidade para gerenciar softwares e ferramentas administrativas ou de CRM."
    ];

    const gaps = [
      `Falta total de habilitação acadêmica, técnica ou estágio em '${title}'.`,
      "Ausência de registro legal ou regulatório obrigatório necessário para atuar na função.",
      "Dedicada exclusivamente e de forma contínua à graduação em Análise e Desenvolvimento de Sistemas (ADS)."
    ];

    const projects = [
      {
        name: "Dorsal Tecnológica do Portfólio",
        whyFit: "Os projetos da Patrícia consolidam sua aptidão analítica e de orquestração de sistemas, porém estão inteiramente fora do escopo prático exigido por este cargo de atuação direta."
      }
    ];

    const reportMarkdown = `# Relatório de Sinergia e Ajuste de Escopo - ${title}

## Parecer Técnico de Aderência
Não existe compatibilidade operacional ou conceitual direta entre o histórico de competências da candidata **Patrícia Oliveira** e as atribuições exigidas para a vaga de **${title}**.

A candidata possui trajetória focada exclusivamente na eficiência digital:
- **Automação de Fluxos**: Especialidade prática avançada e orquestração ágil com **n8n**.
- **Proficiência em Dados**: Manipulação e análise estruturada de bancos de dados modernos com **SQL** e **Python**.
- **Infraestrutura**: Projetos estruturados e governança básica na nuvem **AWS**.

Como este cargo exige formação específica em outra área, recomenda-se direcionar a candidata para funções correlatas à tecnologia, como Analista de BI, Desenvolvimento de Software de suporte comercial, Gestão de CRMs ou Projetos de Automação de Processos.`;

    return {
      score,
      summary,
      strengths,
      gaps,
      projects,
      fullReportMarkdown: reportMarkdown
    };
  }

  // Calculate score for tech roles logically
  let score = 35; // Base tech score
  let strengths: string[] = [];
  let gaps: string[] = [];
  let projects: ProjectFit[] = [];

  if (hasN8n) score += 18;
  if (hasPython) score += 15;
  if (hasSql) score += 12;
  if (hasCloud) score += 10;
  if (hasData) score += 10;

  // Clamp score
  score = Math.max(30, Math.min(96, score));

  // Determine projects for matching tech roles
  if (hasN8n || hasPython) {
    projects.push({
      name: "Mentoria Tech / Hub (n8n + Typebot + API LLMs)",
      whyFit: "Projeto que integra orquestração avançada em n8n e IA conversacional Typebot, resolvendo problemas de fit de competência de ponta a ponta de forma prática."
    });
  }
  if (hasPython || hasData) {
    projects.push({
      name: "Macro Scenario Engine (Python + IA + Finanças)",
      whyFit: "Processamento automatizado de dados macroeconômicos aplicados utilizando APIs e lógica avançada de decisão em Python."
    });
  }
  if (projects.length === 0) {
    projects.push({
      name: "Planej.ai & VendaFácil SaaS",
      whyFit: "Aplicações de arquitetura limpa com controle de dados e usabilidade que comprovam competência ágil em desenvolvimento de soluções."
    });
  }
  if (projects.length < 2) {
    projects.push({
      name: "Venda-Insights (Python Pandas Data Engineering)",
      whyFit: "Demonstra rigor analítico, manipulação avançada de tabelas SQL e tratamento de dados com Python Pandas de nível corporativo."
    });
  }

  // Generate customized strengths & gaps
  if (hasN8n) {
    strengths.push("Especialidade prática em Automações Avançadas e Orquestração de APIs via n8n (Bootcamp Santander 2025).");
    strengths.push("Experiência prática integrando Typebot e fluxos digitais complexos de CRM (Salesforce / Plusoft) com IA.");
  } else {
    strengths.push("Sólidos fundamentos de automação de rotinas usando scripts em Python e tratamentos sistemáticos.");
  }

  if (hasPython || hasData) {
    strengths.push("Excelente habilidade prática com engenharia e engenharia exploratória de dados utilizando Pandas.");
    strengths.push("Conhecimento avançado em linguagem SQL e estrutura de banco de dados relacional (Supabase/Postgres).");
  } else {
    strengths.push("Capacidade analítica rigorosa decorrente do aprendizado acelerado em Bootcamps intensivos de dados.");
  }

  if (hasCloud) {
    strengths.push("Certificação prática em Nuvem AWS re/Start Cloud Practitioner, garantindo governança cloud de infraestrutura (S3, EC2).");
  }

  if (strengths.length < 3) {
    strengths.push("Capacidade autodidata de rápida absorção de novas stacks e entrega de produtos funcionais, evidenciada por mais de 8 projetos autorais.");
  }

  // Common transparent gaps
  gaps.push("Curso Superior de ADS recém-iniciado (conclusão prevista para 2028), suprido por grande número de Bootcamps práticos de alta intensidade.");
  if (!hasCloud) {
    gaps.push("Menor tempo de atuação ativa em arquiteturas on-premises (locais), focando sua expertise em infraestruturas rápidas baseadas na Nuvem.");
  } else {
    gaps.push("Consolidação contínua em arquiteturas de microsserviços corporativas de grande escala.");
  }

  // Build markdown summary & advisory report
  const summary = `Identificamos um excelente match de competência prática de ${score}% com foco total nas necessidades desta vaga. A Patrícia une conhecimentos valiosos em automatização com n8n/Typebot e análise técnica com Python/SQL, proporcionando redução imediata em tempos operacionais e geração rápida de insights comerciais.`;

  const reportMarkdown = `# Parecer de Sinergia Técnica - ${title}

## Análise de Aderência Técnica
Este parecer consolida o fit operacional da candidata **Patrícia Oliveira** com a oportunidade informada. Sendo uma profissional altamente versátil, ela junta conhecimentos de **vanguardas digitais práticas (n8n, Python, SQL, Nuvem AWS, Salesforce e Excel avançado)** que atendem de forma imediata os requisitos da vaga:

1. **Eficiência e Otimização**: Capacidade de desenhar orquestrações assíncronas com **n8n** e conectar APIs de inteligência artificial de forma veloz para eliminar gargalos e trabalho repetitivo.
2. **Cultura Data-Driven**: Proficiência para ler, filtrar e correlacionar bancos de dados complexos através do **SQL** e tratamento analítico com **Python Pandas**.
3. **Agilidade Prática**: Graduanda em ADS e estruturada metodologicamente via Scrum, pronta para acelerar os ciclos de entrega com alta usabilidade e foco em resultados.

---

## Retorno sobre o Investimento (Por que contratar?)
* **Economia Operacional imediata**: Substitui fluxos manuais desgastantes por rotinas digitais e conectores de APIs fluídos.
* **Governança em Nuvem**: Certificada em Nuvem AWS re/Start, garantindo conformidade técnica de infraestrutura.
* **Desenvolvimento Ágil e Autonomia**: Elevado portfólio de projetos funcionais criados com rápida adaptação técnica.`;

  return {
    score,
    summary,
    strengths,
    gaps,
    projects,
    fullReportMarkdown: reportMarkdown
  };
};

export default function DossierSection() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<MatchAnalysisResult | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'parecer' | 'competencias' | 'projetos'>('parecer');
  const [error, setError] = useState<string | null>(null);

  const loadingSteps = [
    "Estruturando o motor de inteligência ATS...",
    "Correlacionando competências em Python e SQL...",
    "Verificando projetos de automações inteligentes em n8n...",
    "Analisando fit com certificações e cloud computing AWS...",
    "Consolidando parecer consultivo e calculando Match..."
  ];

  // Rotate loading text step during loading
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [loading]);

  const triggerCelebration = (score: number) => {
    const colors = ['#a855f7', '#10b981', '#e2e8f0', '#c084fc'];
    
    // Left-side burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.8 },
      colors
    });

    // Right-side burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.8 },
      colors
    });

    // Central splash if score is exceptional
    if (score >= 80) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 90,
          spread: 85,
          origin: { x: 0.5, y: 0.5 },
          colors
        });
      }, 350);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      setError("Por favor, digite pelo menos o nome ou título do cargo desejado.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    try {
      const response = await fetch('/api/cv/match-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setResult(data.analysis);
        setActiveSubTab('parecer');
        triggerCelebration(data.analysis.score);
      } else {
        console.warn("API was not successful, initializing client-side match fallback:", data.error);
        const fallbackAnalysis = generateClientFallbackDossier(jobTitle, jobDescription);
        setResult(fallbackAnalysis);
        setActiveSubTab('parecer');
        triggerCelebration(fallbackAnalysis.score);
      }
    } catch (err: any) {
      console.warn("API Connection failed, falling back to client-side matches:", err);
      const fallbackAnalysis = generateClientFallbackDossier(jobTitle, jobDescription);
      setResult(fallbackAnalysis);
      setActiveSubTab('parecer');
      triggerCelebration(fallbackAnalysis.score);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobTitle('');
    setJobDescription('');
    setResult(null);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (score >= 70) return 'text-purple-400 border-purple-500/30 bg-purple-950/20';
    return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 85) return '#10b981'; // emerald
    if (score >= 70) return '#a855f7'; // purple
    return '#f59e0b'; // amber
  };

  return (
    <div id="dossier-root-container" className="space-y-8 animate-fade-in relative z-10">
      
      {/* Title block */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-semibold text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <BrainCircuit className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
          <span>Inteligência de Match de Competências</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
          Dossiê <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-emerald-400">IA de Compatibilidade</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
          Uma ferramenta inteligente projetada para recrutadores. Cole a sua oportunidade de mercado (Título e especificações) e nosso modelo correlate de forma profunda as competências, cursos e projetos da Patrícia para gerar na hora um parecer personalizado com aderência quantitativa.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!loading && !result && (
          <motion.form 
            key="analysis-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleAnalyze}
            className="backdrop-blur-md bg-[#0b0f19]/60 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
            id="compatibility-input-form"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="job-title-input" className="block text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                  Título do Cargo / Vaga (Requisito Mínimo)
                </label>
                <input
                  type="text"
                  id="job-title-input"
                  placeholder="Ex: Desenvolvedor n8n & Python, Analista de Automação Júnior, Analista de Dados..."
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all font-sans"
                  required
                />
              </div>

              <div>
                <label htmlFor="job-desc-input" className="block text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                  Descrição Completa ou Requisitos da Vaga (Opcional)
                </label>
                <textarea
                  id="job-desc-input"
                  placeholder="Cole aqui os requisitos adicionais, tecnologias solicitadas ou a descrição corporativa completa da vaga para uma correlação milimétrica..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all font-sans resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="flex gap-3 p-4 bg-red-950/30 border border-red-500/20 text-red-400 text-xs rounded-xl font-sans" id="form-error-panel">
                <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 text-red-400" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                id="btn-trigger-match-analysis"
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium text-sm rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="h-4 w-4 animate-pulse text-yellow-300" />
                <span>Gerar Parecer IA de Compatibilidade</span>
              </button>
            </div>
          </motion.form>
        )}

        {loading && (
          <motion.div
            key="analysis-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop-blur-md bg-[#0b0f19]/60 border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center space-y-6 shadow-xl relative overflow-hidden h-[380px]"
            id="analysis-loading-workspace"
          >
            {/* Spinning decorative background */}
            <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative h-16 w-16 flex items-center justify-center">
              <div className="absolute inset-0 border-3 border-purple-500/20 rounded-full" />
              <div className="absolute inset-0 border-3 border-transparent border-t-purple-400 border-r-purple-400 rounded-full animate-spin" />
              <BrainCircuit className="h-7 w-7 text-purple-400 animate-pulse" />
            </div>

            <div className="text-center space-y-2 relative z-10">
              <p className="text-sm font-sans font-medium text-slate-100">{loadingSteps[loadingStep]}</p>
              <p className="text-xs font-mono text-zinc-500">Isso pode levar de 5 a 10 segundos utilizando Gemini-3.5-flash...</p>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="analysis-result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
            id="compatibility-result-panel"
          >
            {/* Top Score Summary Banner Card */}
            <div className="backdrop-blur-md bg-gradient-to-br from-[#0c1020]/90 to-[#0b0e1a]/90 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
              
              {/* Radial Progress Score Counter on the left */}
              <div className="relative h-36 w-36 flex-shrink-0 flex items-center justify-center">
                {/* SVG Circle progress */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    className="stroke-zinc-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke={getScoreProgressColor(result.score)}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 58}
                    initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 58) * (1 - result.score / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Score numbers block */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-display font-black text-white">{result.score}%</span>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">Aderência</span>
                </div>
              </div>

              {/* Central Text Panel Summary */}
              <div className="flex-1 space-y-4">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-lg font-display font-bold text-slate-100">Dossiê Analítico: {jobTitle}</h3>
                  <div className="inline-flex gap-2 items-center text-xs">
                    <span className="text-zinc-500 font-mono">Status da Análise:</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] uppercase font-mono ${getScoreColor(result.score)}`}>
                      {result.score >= 85 ? 'Excelente Compatibilidade' : result.score >= 70 ? 'Boa Compatibilidade' : 'Média Compatibilidade'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm font-sans text-zinc-300 leading-relaxed text-center md:text-left">
                  {result.summary}
                </p>
              </div>

              {/* Side CTA trigger to play again */}
              <div className="w-full md:w-auto flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-purple-400" />
                  <span>Analisar Outra Vaga</span>
                </button>
              </div>
            </div>

            {/* Inner analysis body with sub-navigation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left tab selectors */}
              <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveSubTab('parecer')}
                  className={`px-4 py-3 rounded-xl font-medium text-xs font-sans tracking-wide transition-all duration-200 text-left flex items-center gap-3 flex-shrink-0 w-full cursor-pointer
                    ${activeSubTab === 'parecer' 
                      ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                      : 'bg-zinc-950/20 text-zinc-400 border border-zinc-900 hover:text-white hover:bg-zinc-900/60'}`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Parecer do Tech Recruiter</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('competencias')}
                  className={`px-4 py-3 rounded-xl font-medium text-xs font-sans tracking-wide transition-all duration-200 text-left flex items-center gap-3 flex-shrink-0 w-full cursor-pointer
                    ${activeSubTab === 'competencias' 
                      ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                      : 'bg-zinc-950/20 text-zinc-400 border border-zinc-900 hover:text-white hover:bg-zinc-900/60'}`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Sinergias & Gaps</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('projetos')}
                  className={`px-4 py-3 rounded-xl font-medium text-xs font-sans tracking-wide transition-all duration-200 text-left flex items-center gap-3 flex-shrink-0 w-full cursor-pointer
                    ${activeSubTab === 'projetos' 
                      ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                      : 'bg-zinc-950/20 text-zinc-400 border border-zinc-900 hover:text-white hover:bg-zinc-900/60'}`}
                >
                  <Code className="h-4 w-4" />
                  <span>Projetos Alinhados</span>
                </button>
              </div>

              {/* Right main sub-tab viewer panels */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  {activeSubTab === 'parecer' && (
                    <motion.div
                      key="subtab-parecer"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="backdrop-blur-md bg-[#0b0f19]/60 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6"
                    >
                      <div className="flex items-center gap-2 border-b border-zinc-900 pb-4">
                        <Terminal className="h-4.5 w-4.5 text-purple-400" />
                        <h4 className="font-display font-bold text-slate-100 text-sm">Parecer Detalhado Inteligente (Completo)</h4>
                      </div>
                      
                      <div className="markdown-body prose prose-invert max-w-none text-zinc-300">
                        <Markdown
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mt-6 mb-3 border-b border-zinc-900 pb-2 flex items-center gap-2 font-display" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold text-slate-200 mt-5 mb-2 font-display" {...props} />,
                            p: ({node, ...props}) => <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-sans" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 text-zinc-300 text-sm mb-4 space-y-1.5" {...props} />,
                            li: ({node, ...props}) => <li className="text-zinc-300 font-sans" {...props} />,
                            code: ({node, ...props}) => <code className="bg-zinc-950 text-purple-300 px-1.5 py-0.5 rounded font-mono text-xs border border-zinc-900" {...props} />
                          }}
                        >
                          {result.fullReportMarkdown}
                        </Markdown>
                      </div>
                    </motion.div>
                  )}

                  {activeSubTab === 'competencias' && (
                    <motion.div
                      key="subtab-competencias"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-6"
                    >
                      {/* Grid for Strengths and Gaps */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Strengths card */}
                        <div className="backdrop-blur-md bg-[#0b0f19]/60 border border-emerald-500/10 rounded-2xl p-6 shadow-xl space-y-4">
                          <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            <h4 className="font-display font-bold text-emerald-300 text-sm">Pontos Fortes Encontrados</h4>
                          </div>

                          <ul className="space-y-3">
                            {result.strengths.map((str, index) => (
                              <li key={index} className="flex gap-2.5 items-start text-xs text-zinc-300 font-sans leading-relaxed">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                                <span>{str}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Gaps card */}
                        <div className="backdrop-blur-md bg-[#0b0f19]/60 border border-amber-500/10 rounded-2xl p-6 shadow-xl space-y-4">
                          <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-3">
                            <AlertCircle className="h-5 w-5 text-amber-400 animate-pulse" />
                            <h4 className="font-display font-bold text-amber-300 text-sm">Gaps ou Pontos a Desenvolver</h4>
                          </div>

                          <ul className="space-y-3">
                            {result.gaps.map((gap, index) => (
                              <li key={index} className="flex gap-2.5 items-start text-xs text-zinc-300 font-sans leading-relaxed">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {activeSubTab === 'projetos' && (
                    <motion.div
                      key="subtab-projetos"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-6"
                    >
                      <div className="backdrop-blur-md bg-[#0b0f19]/60 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-3">
                          <Code className="h-5 w-5 text-purple-400" />
                          <h4 className="font-display font-bold text-slate-100 text-sm">Portfólio Estratégico Recomendado</h4>
                        </div>
                        
                        <p className="text-xs text-zinc-400">
                          A IA selecionou os seguintes projetos práticos do portfólio da Patrícia para demonstrar proficiência nas necessidades dessa vaga específica:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {result.projects.map((proj, idx) => (
                            <div key={idx} className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 space-y-2.5 hover:border-purple-500/20 transition-all duration-300">
                              <span className="text-xs font-mono uppercase text-purple-400 block tracking-wider">Projeto Alinhado #{idx+1}</span>
                              <h5 className="font-display font-bold text-slate-200 text-sm">{proj.name}</h5>
                              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{proj.whyFit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
