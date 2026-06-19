import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Code, 
  Bot, 
  Cpu, 
  Wrench, 
  ArrowRight,
  TrendingUp,
  Download,
  Copy,
  Check,
  Printer,
  ChevronRight,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import Markdown from 'react-markdown';

const FALLBACK_MARKDOWN_CV = `# PATRÍCIA OLIVEIRA
**Analista de Dados, Desenvolvedora & Analista de Automação (Especialista em n8n)**

📍 São Paulo - SP | 📞 (11) 95806-0387 | ✉️ [patriciasavarezioliveira@gmail.com](mailto:patriciasavarezioliveira@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/savarezi/) | 💻 [GitHub](https://github.com/Savarezi)

---

## PERFIL PROFISSIONAL
Profissional altamente especializada na otimização de processos de negócios por meio de automações inteligentes com n8n, análise de dados estratégica, computação em nuvem (AWS) e Engenharia de Prompt. Experiência prática avançada na criação de sistemas integrando LLMs e fluxos conversacionais eficientes, gerando soluções ricas em dados e orientadas para inteligência comercial e excelência de atendimento.

---

## COMPETÊNCIAS TÉCNICAS
* **Linguagens & Tecnologias**: Python (Avançado), SQL para Banco de Dados, JavaScript/TypeScript, HTML5, CSS3, C# (Sintaxe).
* **Análise de Dados**: Engenharia de Dados (Pandas), Estatística descritiva, Excel Avançado (Dashboards dinâmicos).
* **Automação & Integrações**: Orquestração n8n, Integromat, Criação de chatbots eficientes (Typebot) e conexões robustas via APIs de LLMs (OpenAI, Gemini).
* **Cloud Computing**: Nuvem AWS (EC2, S3, RDS, IAM, VPC), Governança Cloud, Linux/Unix Bash.
* **Metodologias**: Scrum, Kanban, Metodologias Ágeis de Gestão de Projetos.

---

## EXPERIÊNCIA PROFISSIONAL

### **Analista de Relacionamento** | *YOU.BPOTECH*
* Atuação de suporte avançado com mapeamento de requisitos e diagnóstico ágil de problemas em plataformas digitais.
* Coleta e interpretação pragmática de métricas de engajamento do usuário final para direcionamento de updates de engenharia.
* Otimização contínua de performance e processos de atendimento operacional corporativo.

### **Central de Relacionamento** | *AC Camargo Cancer Center*
* Governança, cadastro e controle rigoroso de dados críticos de pacientes em conformidade com políticas de segurança da informação.
* Rastreabilidade cadastral ponta a ponta utilizando as ferramentas de mercado Salesforce CRM e Plusoft.
* Monitoramento de fluxos operacionais internos visando otimização constante de rotinas de atendimento.

### **Consultora de Vendas** | *TMKT*
* Levantamento e análise diária de indicadores operacionais e KPIs comerciais de conversão direta.
* Criação de relatórios analíticos de engajamento e apoio tático direto a decisões baseadas em dados.

### **Atendimento Digital e Suporte Técnico** | *Descomplica SP (Voluntariado)*
* Atendimento presencial e digital qualificado para autenticação e orientação de usuários em sistemas complexos do governo.
* Resolução ágil de chamados de rede e inconsistências de segurança garantindo máxima usabilidade e integridade de acesso.

---

## PROJETOS EM DESTAQUE

### **Mentoria Tech / Hub** — [*GitHub*](https://github.com/Savarezi/Mentoria-Tech)
* *Descrição*: Plataforma inteligente integrando Typebot e APIs de modelos de linguagem para orientação personalizada de trilhas de carreira e competências no mercado de TI.

### **Macro Scenario Engine** — [*GitHub*](https://github.com/Savarezi/macro-scenario-engine)
* *Descrição*: Solução analítica com aplicação direta de Inteligência Artificial para leitura, tratamento e inferência de dados macroeconômicos aplicados à B3.

### **Planej.ai** — [*GitHub*](https://github.com/Savarezi/PlanejAI)
* *Descrição*: Web application de planejamento financeiro pessoal baseado em regras estruturadas (50-30-20) com usabilidade e foco no usuário.

### **VendaFácil SaaS** — [*GitHub*](https://github.com/Savarezi/VendaFacil)
* *Descrição*: Sistema SaaS consolidado em Dark Mode reunindo módulos corporativos integrados de estoque, automação de faturamento e relatórios financeiros unificados.

---

## CERTIFICAÇÕES E EDUCAÇÃO
* **Ensino Superior**: Tecnologia em Análise e Desenvolvimento de Sistemas — *Em andamento (Fev/2026 - Conclusão estimada)*
* **Formação em Desenvolvimento de Soluções Digitais e Automação (360h)** — *Ada Tech | Mercado Eletrônico (Concluído em Fevereiro de 2026)*
* **Bootcamp Automação de Processos com n8n** — *Santander Open Academy (IA e Orquestração de APIs)*
* **Formação em Tecnologia da Informação (360h)** — *Escola da Nuvem (Nuvem AWS, Python, Linux & Linux Server)*
* **Formação em Análise de Dados com Python (360h)** — *Bootcamp Reprograma (Análise Exploratória e Insights Estratégicos)*
* **Excel para Análise de Dados** — *Preditiva Analytics (Nota Máxima: 10/10)*
* **Fundamentos AWS (re/Start) & Cloud Practitioner** — *Amazon Web Services / DIO*
`;

interface AboutSectionProps {
  onNavigateToProjects: () => void;
}

export default function AboutSection({ onNavigateToProjects }: AboutSectionProps) {
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvPrompt, setCvPrompt] = useState('');
  const [focusRole, setFocusRole] = useState('Analista de Dados, Desenvolvedora & Analista de Automação');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCv, setGeneratedCv] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = [
    { value: '+8', label: 'Projetos e Aplicações', desc: 'Integrações em IA, Finanças e SaaS', icon: Code },
    { value: '+15', label: 'Tecnologias Dominadas', desc: 'Typebot, Python, Cloud & JS', icon: Wrench },
    { value: '100h+', label: 'Mentorias & Soluções', desc: 'Sistemas inteligentes orientados a resultados', icon: Cpu }
  ];

  // Robust CV generation method utilizing Gemini 3.5 with instantaneous premium fallback on any issue
  const triggerCvGeneration = async (customPrompt?: string, customRole?: string) => {
    setIsGenerating(true);
    setGeneratedCv('');
    
    const targetPrompt = customPrompt !== undefined ? customPrompt : cvPrompt;
    const targetRole = customRole !== undefined ? customRole : focusRole;
    
    try {
      const response = await fetch('/api/cv/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: targetPrompt,
          focusRole: targetRole
        })
      });
      
      const data = await response.json();
      if (data.success && data.cvMarkdown) {
        setGeneratedCv(data.cvMarkdown);
      } else {
        // Safe, graceful fallback to complete, beautifully-formatted markdown resume loaded with real details
        setGeneratedCv(FALLBACK_MARKDOWN_CV);
      }
    } catch (err: any) {
      console.error("Erro ao gerar currículo:", err);
      // Safe fallback
      setGeneratedCv(FALLBACK_MARKDOWN_CV);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenCvModal = () => {
    setShowCvModal(true);
    triggerCvGeneration(cvPrompt, focusRole);
  };

  const handleGenerateCv = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCvGeneration(cvPrompt, focusRole);
  };

  const runFallbackCopy = () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = generatedCv;
      
      // Keep offscreen
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert("Não foi possível copiar automaticamente devido às restrições do navegador na visualização. Por favor, selecione e copie o texto abaixo manualmente.");
      }
    } catch (fallbackError) {
      console.error("Fallback copy failed:", fallbackError);
      alert("Não foi possível copiar automaticamente devido a restrições de sandbox. Por favor, selecione o texto abaixo manualmente.");
    }
  };

  const handleCopy = () => {
    if (!generatedCv) return;
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedCv)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.warn("navigator.clipboard failed, running fallback copy:", err);
            runFallbackCopy();
          });
      } else {
        runFallbackCopy();
      }
    } catch (err) {
      console.warn("Clipboard API error:", err);
      runFallbackCopy();
    }
  };

  const handleDownload = () => {
    if (!generatedCv) return;
    
    // Check if we are inside an iframe (preview environment)
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
      // Copy text since downloads are typically blocked in sandboxed iframes
      try {
        runFallbackCopy();
        alert("Atenção: Como você está na área de visualização do editor, o navegador bloqueia downloads de arquivos por segurança. O currículo gerado foi copiado automaticamente para a sua área de transferência com sucesso! Você também pode abrir o portfólio em uma aba cheia para baixar o arquivo .md diretamente.");
      } catch (e) {
        alert("Por favor, selecione o texto abaixo e copie manualmente ou abra o portfólio em uma aba cheia para baixar o arquivo .md.");
      }
      return;
    }

    try {
      const element = document.createElement("a");
      const file = new Blob([generatedCv], { type: 'text/markdown;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = "curriculo_patricia_oliveira.md";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      console.error("Erro ao baixar:", err);
      // Fallback to copy and message
      runFallbackCopy();
      alert("O download falhou devido a políticas de segurança do seu navegador. O texto foi copiado com sucesso para a sua área de transferência!");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Curriculo_Patricia_Savarezi_Customizado</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 0 20px; }
            h1 { font-size: 2.25rem; color: #7c3aed; margin-bottom: 0.25rem; font-weight: 700; }
            h2 { font-size: 1.5rem; color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.25rem; margin-top: 1.75rem; font-weight: 600; }
            h3 { font-size: 1.125rem; color: #4338ca; margin-top: 1.25rem; margin-bottom: 0.25rem; font-weight: 600; }
            p { margin: 0 0 1rem 0; }
            ul { margin: 0 0 1rem 0; padding-left: 1.5rem; }
            li { margin-bottom: 0.35rem; }
            strong { color: #0f172a; }
            a { color: #7c3aed; text-decoration: none; }
            .meta { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; }
            hr { border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
            @media print {
              body { margin: 20px; font-size: 12pt; }
              h2 { margin-top: 15px; }
              hr { margin: 15px 0; }
            }
          </style>
        </head>
        <body>
          <div id="content"></div>
          <script>
            // Simple markdown parser for printer compatibility
            const rawMarkdown = \`${generatedCv.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            // Simple replacement for headers and bullets
            let html = rawMarkdown
              .replace(/^### (.*$)/gim, '<h3>$1</h3>')
              .replace(/^## (.*$)/gim, '<h2>$1</h2>')
              .replace(/^# (.*$)/gim, '<h1>$1</h1>')
              .replace(/^\\* (.*$)/gim, '<li>$1</li>')
              .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
              .replace(/\\[(.*?)\\]\\((.*?)\\)/g, '<a href="$2" target="_blank">$1</a>')
              .replace(/\\n/g, '<br>');
            
            // wrap remaining lis
            html = html.replace(/(<li>.*?<\\/li>)/sg, '<ul>$1</ul>');
            
            document.getElementById('content').innerHTML = html;
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-12 animate-fade-in" id="about-section-container">
      {/* Top Banner Cover Block */}
      <section 
        className="relative bg-zinc-950/40 rounded-3xl border border-[#1e293b] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-8 md:items-center shadow-[0_0_50px_rgba(168,85,247,0.02)]"
        id="profile-hero-card"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glowing background blob */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        
        {/* Profile Avatar Frame with glowing purple border */}
        <div className="relative flex-shrink-0 mx-auto md:mx-0">
          <div className="relative h-44 w-44 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <img 
              src={PERSONAL_INFO.avatarUrl} 
              alt={PERSONAL_INFO.name} 
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-lg p-2 shadow-lg">
            <Bot className="h-4 w-4" />
          </div>
        </div>

        {/* Short bio and buttons */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-purple-400 font-medium text-sm md:text-base font-display">
              {PERSONAL_INFO.title}
            </p>
          </div>
          
          <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
            {PERSONAL_INFO.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            {/* Real AI-CV Generator Dialog Link Button */}
            <button
              onClick={handleOpenCvModal}
              id="generate-cv-trigger"
              className="flex items-center gap-2.5 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-5 w-5" />
              <span>Gerar Currículo (IA)</span>
            </button>

            <button
              onClick={onNavigateToProjects}
              id="navigate-projects-btn"
              className="flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl border border-zinc-800 transition-all"
            >
              <span>Ver Portfólio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Profile Metrics Bento Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="stats-dashboard-bento">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="relative p-6 bg-[#0b0f19]/60 border border-[#1e293b] rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 group shadow-md"
            >
              <div className="absolute top-4 right-4 text-purple-600/20 group-hover:text-purple-500/20 transition-colors">
                <Icon className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <span className="block font-display font-extrabold text-4xl text-white tracking-tight">
                  {stat.value}
                </span>
                <div>
                  <h3 className="text-zinc-200 font-display font-semibold text-sm">
                    {stat.label}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1 leading-normal font-sans">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Short introduction paragraph with cards about her core vision */}
      <section className="bg-zinc-950/20 rounded-2xl border border-zinc-800/40 p-6 md:p-8 space-y-6" id="mission-card">
        <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
          <Bot className="text-purple-400 h-5 w-5" />
          Minha Proposta de Valor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-zinc-800/80 rounded-xl p-5 bg-zinc-900/40 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-500 tracking-wider uppercase">Foco Tecnológico</span>
            <p className="text-white font-medium text-sm">Sistemas Autônomos e Chatbots</p>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Desenvolvo automações inteligentes utilizando arquiteturas conversacionais refinadas. Através do Typebot integrado com LLMs personalizadas, crio consultores corporativos funcionais capazes de processar dados em tempo real o dia inteiro.
            </p>
          </div>
          <div className="border border-zinc-800/80 rounded-xl p-5 bg-zinc-900/40 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-500 tracking-wider uppercase">Pragmatismo de Negócios</span>
            <p className="text-white font-medium text-sm">Decisões e Inteligência Comercial</p>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Unifico engenharia de software pura com análise de dados estratégica. Meus projetos (como VendaFácil e Macro Scenario Engine) não são apenas códigos no GitHub, são aceleradores que direcionam decisões econômicas complexas na B3.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE IA RESUME GENERATOR MODAL */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-black/80 transition-opacity" 
              aria-hidden="true" 
              onClick={() => { if(!isGenerating) setShowCvModal(false); }}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-[#0b0f19] rounded-2xl text-left overflow-hidden shadow-2xl border border-zinc-800 transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Modal Title bar */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-600/10 text-purple-400 rounded-lg">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white leading-6">
                        Gerador de Currículo Inteligente (IA)
                      </h3>
                      <p className="text-zinc-400 text-xs mt-0.5">
                        Otimizado dinamicamente focando em suas conquistas de Dados, Automação n8n e Cloud AWS.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCvModal(false)}
                    id="close-cv-modal-btn"
                    className="text-zinc-400 hover:text-white text-base font-semibold px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
                  >
                    Fechar
                  </button>
                </div>

                {/* Multi-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Column 1: Config (35% width, lg:col-span-4) */}
                  <div className="lg:col-span-4 space-y-6 border-b lg:border-b-0 lg:border-r border-zinc-800/60 pb-6 lg:pb-0 lg:pr-6">
                    <form onSubmit={handleGenerateCv} className="space-y-4">
                      <div>
                        <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5 font-display">
                          Cargo / Foco Desejado
                        </label>
                        <input
                          type="text"
                          required
                          value={focusRole}
                          onChange={(e) => setFocusRole(e.target.value)}
                          placeholder="Ex: Analista de Dados, Automação ou Dev Python..."
                          className="w-full bg-zinc-900 border border-zinc-700/85 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5 font-display">
                          Instruções / Vaga Desejada
                        </label>
                        <textarea
                          rows={5}
                          value={cvPrompt}
                          onChange={(e) => setCvPrompt(e.target.value)}
                          placeholder="Cole o descritivo da vaga ou digite o foco para reformular de forma personalizada..."
                          className="w-full bg-zinc-900 border border-zinc-700/85 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-all font-sans resize-none"
                        />
                        <span className="text-zinc-500 text-[10px] block mt-1 leading-normal font-sans">
                          O Gemini irá realçar os projetos e competências que mais combinam com o perfil desejado.
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isGenerating}
                        id="submit-generate-cv"
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white text-sm font-semibold rounded-xl shadow-[0_4px_15px_rgba(168,85,247,0.3)] transition-all"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Gerando Currículo...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            <span>Refinar com IA</span>
                          </>
                        )}
                      </button>
                    </form>

                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold text-zinc-200">Garantia de Funcionamento</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                        Se a chave API do Gemini não estiver configurada no ambiente, o sistema ativa imediatamente nossa formatação premium customizada contendo todos os dados e certificações reais da Patrícia.
                      </p>
                    </div>
                  </div>

                  {/* Column 2: Resume Preview (65% width, lg:col-span-8) */}
                  <div className="lg:col-span-8 space-y-4 flex flex-col h-full min-h-[450px]">
                    
                    {/* Preview Action Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/40 border border-[#1e293b] p-3 rounded-xl">
                      <span className="text-zinc-300 text-xs font-semibold flex items-center gap-1.5 font-mono">
                        {isGenerating ? (
                          <span className="text-purple-400 flex items-center gap-2 animate-pulse">
                            <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                            Otimizando currículo com Gemini 3.5...
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <Check className="h-4 w-4 animate-bounce" />
                            Currículo pronto para exportação!
                          </span>
                        )}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                           onClick={handleDownload}
                           disabled={isGenerating || !generatedCv}
                           className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-zinc-300 text-xs rounded-lg transition-colors font-medium border border-[#1e293b]"
                           title="Baixar currículo formatado em Markdown (.md)"
                        >
                           <Download className="h-3.5 w-3.5 text-purple-400" />
                           <span>Baixar (.md)</span>
                        </button>
                        <button
                           onClick={handleCopy}
                           disabled={isGenerating || !generatedCv}
                           className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-zinc-300 text-xs rounded-lg transition-colors font-medium border border-[#1e293b]"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                        </button>
                        <button
                          onClick={handlePrint}
                          disabled={isGenerating || !generatedCv}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs rounded-lg font-semibold transition-colors shadow-sm"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>Visualizar e Imprimir</span>
                        </button>
                      </div>
                    </div>

                    {/* Main Render box */}
                    <div className="relative bg-zinc-950/60 border border-zinc-800 rounded-xl p-6 overflow-y-auto max-h-[440px] min-h-[350px] flex-1">
                      {isGenerating ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070a13]/95 p-8 space-y-4 z-10">
                          <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
                          <div className="text-center space-y-1">
                            <p className="text-sm font-semibold text-white font-display">Ajustando foco profissional...</p>
                            <p className="text-xs text-zinc-400 max-w-sm">
                              Formatando cabeçalhos, filtrando competências e integrando os melhores projetos técnicos da Patrícia.
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {generatedCv ? (
                        <div className="markdown-body prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4 select-text">
                          <Markdown>{generatedCv}</Markdown>
                        </div>
                      ) : (
                        !isGenerating && (
                          <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                            Nenhum currículo gerado ainda. Clique em "Refinar com IA" para iniciar.
                          </div>
                        )
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-zinc-500 text-[10px] leading-relaxed">
                        * Você pode salvar o documento final como PDF utilizando a opção "Visualizar e Imprimir" de maneira muito simples.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
