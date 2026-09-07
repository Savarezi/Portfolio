import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  ExternalLink,
  User,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'Quais são os principais projetos da Patrícia?',
  'Qual a formação em Protheus e ADVPL?',
  'Qual é o GitHub oficial e repositórios?',
  'Qual a experiência dela com n8n e automação?',
  'Quais certificações e formações ela possui?',
  'Como posso entrar em contato ou contratá-la?'
];

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  role: 'assistant',
  content: 'Olá! Sou a assistente do portfólio da **Patrícia Oliveira**.\n\nPosso tirar qualquer dúvida sobre os **projetos**, **repositórios no GitHub**, **experiências profissionais**, **formação em Protheus (ADVPL)**, **certificações** e **stack técnica** dela.\n\nComo posso ajudar você hoje?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

function getLocalAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Saudações
  if (/^(ol[aá]|oi|opa|oii+|hey|hello|hi|bom dia|boa tarde|boa noite|fala|e a[ií]|e ai)/i.test(q) || q === "ola" || q === "olá" || q === "oi" || q === "tudo bem") {
    return 'Olá, tudo bem? O que você gostaria de saber sobre a Patrícia Oliveira? Posso te explicar sobre os projetos dela, a formação em Protheus (ADVPL), repositórios no GitHub, experiência com n8n, análise de dados ou passar os contatos dela!';
  }

  // 2. Protheus / ADVPL / TOTVS / ERP
  if (q.includes('protheus') || q.includes('advpl') || q.includes('harbour') || q.includes('totvs') || q.includes('erp')) {
    return `A Patrícia possui a **Formação em Desenvolvimento Protheus (ADVPL)** pela TOTVS / Start+.\n\n**Conteúdos do curso:**\n- Desenvolvimento em ADVPL e Protheus\n- Lógica de programação\n- Git e GitHub\n- Harbour e modelagem de dados\n- Operações CRUD\n- Projeto prático (TCC)\n- Desenvolvimento de soluções ERP\n\nVocê também pode conferir os códigos desenvolvidos no repositório oficial no GitHub: [Jornada DEV - Start+ TOTVS](https://github.com/Savarezi/Jornada-DEV).`;
  }

  // 3. Certificados e Formação
  if (q.includes('certificado') || q.includes('certificados') || q.includes('certificação') || q.includes('certificacao') || q.includes('formação') || q.includes('formacao') || q.includes('cursos') || q.includes('curso') || q.includes('faculdade') || q.includes('estudos')) {
    return `Principais certificações e formações de Patrícia Oliveira:\n\n1. **Formação em Desenvolvimento Protheus (ADVPL)** — TOTVS / Start+ (ADVPL, Protheus, lógica de programação, Git, GitHub, Harbour, modelagem de dados, CRUD, TCC e soluções ERP)\n2. **Análise e Desenvolvimento de Sistemas (2º Semestre)** — Ensino Superior Tecnológico (Em andamento)\n3. **DiverseDEV 2025 (360h)** — Ada Tech & Mercado Eletrônico (n8n, Supabase, Lovable, PostgreSQL)\n4. **Bootcamp Santander 2025 – Automação com n8n** — Santander Open Academy\n5. **AI React Front-end (2025)** — Santander Open Academy\n6. **Formação em TI (360h - 2024)** — Escola da Nuvem (AWS, Python, Linux)\n7. **SQL com PostgreSQL (2024)** — Udemy\n8. **Bootcamp Análise de Dados com Python (360h)** — Reprograma\n9. **Excel para Análise de Dados (Nota 10)** — Preditiva Analytics`;
  }

  // 4. GitHub e Repositórios
  if (q.includes('github') || q.includes('git') || q.includes('repositório') || q.includes('repositorio') || q.includes('código') || q.includes('codigo')) {
    return `O GitHub oficial da Patrícia é **[@Savarezi](https://github.com/Savarezi)**.\n\nPrincipais repositórios:\n- **[Jornada DEV - Start+ TOTVS](https://github.com/Savarezi/Jornada-DEV)** (Estudos e projetos em Protheus e ADVPL)\n- **[Porsche Sales Dashboard & IA Reports](https://github.com/Savarezi/IA-Reports-com-Excel-GPT-Agents-e-Claude-Code)** (Excel, GPT Agents e Claude Code)\n- **[Macro Scenario Engine](https://github.com/Savarezi/macro-scenario-engine)** (IA Macroeconômica na B3)\n- **[Mentoria Tech](https://github.com/Savarezi/Mentoria-Tech)** (Chatbot com GPT-4 e Typebot)\n- **[Planej.ai](https://github.com/Savarezi/PlanejAI)** (Planejamento financeiro 50-30-20)\n- **[VendaFácil](https://github.com/Savarezi/VendaFacil)** (SaaS de Gestão Comercial)\n- **[AWS Portfolio](https://github.com/Savarezi/aws-restart-cloud-practitioner)** (Cloud AWS)`;
  }

  // 5. Projetos
  if (q.includes('projeto') || q.includes('projetos') || q.includes('portfolio') || q.includes('portfólio') || q.includes('trabalho')) {
    return `Principais projetos desenvolvidos por Patrícia:\n\n1. **Porsche Sales Dashboard**: Análise de vendas com GPT Agents e Claude Code ([GitHub](https://github.com/Savarezi/IA-Reports-com-Excel-GPT-Agents-e-Claude-Code) | [Demo](https://porschesalesdashboard.netlify.app/))\n2. **Jornada DEV (TOTVS Start+)**: Desenvolvimento em Protheus, ADVPL e POO ([GitHub](https://github.com/Savarezi/Jornada-DEV))\n3. **Macro Scenario Engine**: Motor de IA para análise macroeconômica na B3 ([GitHub](https://github.com/Savarezi/macro-scenario-engine))\n4. **Mentoria Tech / Hub**: Chatbot inteligente para direcionamento em TI ([GitHub](https://github.com/Savarezi/Mentoria-Tech))\n5. **Planej.ai**: App web de orçamento 50-30-20 ([GitHub](https://github.com/Savarezi/PlanejAI) | [Demo](https://planejaai.netlify.app/))\n6. **VendaFácil**: SaaS de gestão para PMEs ([GitHub](https://github.com/Savarezi/VendaFacil))\n7. **AWS Cloud Practitioner**: Laboratórios de infraestrutura na nuvem AWS ([GitHub](https://github.com/Savarezi/aws-restart-cloud-practitioner))`;
  }

  // 6. n8n e Automação
  if (q.includes('n8n') || q.includes('automação') || q.includes('automacao') || q.includes('workflow') || q.includes('typebot') || q.includes('supabase')) {
    return `A Patrícia é **Especialista em n8n** e Automação de Processos:\n\n- Construção de fluxos complexos integrando APIs REST, Webhooks, Supabase, bancos de dados PostgreSQL e Inteligência Artificial (OpenAI, Gemini, Claude).\n- Formações especializadas na Ada Tech (DiverseDEV 360h) e Santander Bootcamp n8n.\n- Foco em otimização de tempo, redução de custos e eliminação de processos manuais.`;
  }

  // 7. Contato
  if (q.includes('contato') || q.includes('contratar') || q.includes('email') || q.includes('whatsapp') || q.includes('telefone') || q.includes('falar')) {
    return `Entre em contato direto com a Patrícia Oliveira:\n\n- **WhatsApp / Telefone**: [(11) 95806-0387](https://wa.me/5511958060387)\n- **Email**: [patriciasavarezioliveira@gmail.com](mailto:patriciasavarezioliveira@gmail.com)\n- **LinkedIn**: [linkedin.com/in/savarezi](https://www.linkedin.com/in/savarezi/)\n- **GitHub**: [github.com/Savarezi](https://github.com/Savarezi)\n- **Localização**: São Paulo - SP`;
  }

  // 8. Resposta Geral
  return `A **Patrícia Oliveira** é Analista de Dados, Desenvolvedora e Especialista em Automação com n8n.\n\nVocê pode me perguntar sobre:\n- A **Formação em Desenvolvimento Protheus (ADVPL)**\n- Os **projetos e repositórios no GitHub** ([@Savarezi](https://github.com/Savarezi))\n- O domínio em **n8n, Python, SQL, Excel e AWS**\n- As **experiências profissionais e certificações**\n- Formas de **contato e contratação**\n\nComo posso ajudar?`;
}

export default function FloatingDuvidasBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleOpen = () => {
    setMessages([INITIAL_MESSAGE]);
    setIsOpen(true);
  };

  const handleClose = () => {
    setMessages([INITIAL_MESSAGE]);
    setIsOpen(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const fallbackReply = getLocalAnswer(text);

    try {
      // Build history for backend API context
      const chatHistory = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/duvidas-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chatHistory: chatHistory.slice(-8)
        })
      });

      const data = await res.json();
      
      // If server returned valid answer and not the error instability message
      let replyContent = fallbackReply;
      if (data && data.success && data.reply && !data.reply.includes('instabilidade momentânea')) {
        replyContent = data.reply;
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (!isOpen) setHasUnread(true);
    } catch (error) {
      console.warn('Usando resposta local garantida:', error);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="floating-duvidas-widget">
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          id="duvidas-floating-button"
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold text-sm rounded-full shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-[#d4af37]/50 group"
          title="Tirar dúvidas sobre o portfólio"
        >
          <div className="relative flex items-center justify-center">
            <HelpCircle className="h-5 w-5 text-black group-hover:rotate-12 transition-transform duration-200" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-black animate-pulse" />
            )}
          </div>
          <span className="tracking-wide">Dúvidas</span>
        </button>
      )}

      {/* CHATBOT WINDOW DIALOG */}
      {isOpen && (
        <div 
          className="bg-[#0b0c10]/95 backdrop-blur-2xl border border-[#d4af37]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] flex flex-col overflow-hidden animate-fade-in transition-all"
          id="duvidas-chat-panel"
        >
          {/* HEADER */}
          <div className="bg-white/[0.08] backdrop-blur-xl border-b border-[#d4af37]/30 p-3.5 px-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#d4af37]/20 text-[#e5c158] rounded-xl border border-[#d4af37]/35 relative">
                <Sparkles className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm leading-tight flex items-center gap-1.5">
                  Dúvidas do Portfólio
                </h3>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Responde sobre projetos, GitHub e carreira
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-zinc-400 hover:text-[#e5c158] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reiniciar conversa"
                id="reset-duvidas-chat-btn"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <button
                onClick={handleClose}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Fechar"
                id="close-duvidas-chat-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* MESSAGES FEED */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-sm" id="duvidas-messages-feed">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0 text-[#e5c158] mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                      isUser
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-medium rounded-tr-none shadow-[0_2px_12px_rgba(212,175,55,0.2)]'
                        : 'bg-white/[0.07] backdrop-blur-md border border-[#d4af37]/25 text-zinc-200 rounded-tl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none space-y-2 leading-relaxed [&_p]:m-0 [&_ul]:my-1.5 [&_ul]:pl-4 [&_li]:my-0.5 [&_a]:text-[#e5c158] [&_a]:underline [&_strong]:text-white [&_strong]:font-semibold">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                    <span 
                      className={`text-[9px] block mt-1 ${
                        isUser ? 'text-black/70 text-right' : 'text-zinc-500 text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* LOADING INDICATOR */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0 text-[#e5c158]">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white/[0.07] border border-[#d4af37]/25 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#e5c158] animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-[#e5c158] animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-[#e5c158] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK QUESTIONS PILLS */}
          {messages.length <= 2 && (
            <div className="px-3.5 pb-2 pt-1 border-t border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1.5">
                Perguntas Frequentes:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-left text-[11px] bg-white/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 hover:border-[#d4af37]/60 text-zinc-200 hover:text-white px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>{q}</span>
                    <ChevronRight className="h-3 w-3 text-[#e5c158] flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INPUT FORM */}
          <div className="p-3 bg-white/[0.04] border-t border-[#d4af37]/30 flex items-center gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua dúvida sobre o portfólio..."
              disabled={isLoading}
              className="flex-1 bg-white/10 border border-[#d4af37]/30 focus:border-[#d4af37] rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-400 outline-none transition-colors"
              id="duvidas-input-field"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all cursor-pointer shadow-[0_2px_10px_rgba(212,175,55,0.3)] flex-shrink-0"
              id="send-duvidas-btn"
              title="Enviar mensagem"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
