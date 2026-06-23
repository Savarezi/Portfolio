import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Initialize Gemini SDK with telemetry header per guidelines
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// Raw content about Patricia to be injected as source of truth for the Gemini model
const PATRICIA_CV_CONTEXT = `
Nome Completo: Patrícia Oliveira
Cargo Principal: Analista de Dados, Desenvolvedora & Analista de Automação (Especialista em n8n)
Email: patriciasavarezioliveira@gmail.com
Celular/WhatsApp: (11) 95806-0387
LinkedIn: https://www.linkedin.com/in/savarezi/
GitHub: https://github.com/Savarezi
Localidade: São Paulo - Zona Leste - SP - CEP 08536-040

OBJETIVO PROFISSIONAL:
Atuar como Analista de Dados, Desenvolvedora ou Analista de Automação, aplicando Python, SQL, Cloud Computing, Especialização e Automação Avançada com n8n e Inteligência Artificial na criação de soluções eficientes e orientadas a dados.

RESUMO DE QUALIFICAÇÕES:
Profissional em formação em Análise e Desenvolvimento de Sistemas, com sólida competência e especialização em n8n, análise de dados, automação inteligente de processos, computação em nuvem (AWS) e aplicação de Inteligência Artificial / LLMs. Conhecimentos avançados em Python (Fundamentos ao Avançado), SQL (básico ao avançado), Excel Avançado (Dashboards interativos), automações e orquestrações complexas via n8n, conexões multiplataformas e Engenharia de Prompt, focando em otimização de tempo, redução de falhas e inteligência operacional ou comercial de alta aplicabilidade.

PROJETOS PRINCIPAIS:
1. Mentoria Tech / Hub (https://github.com/Savarezi/Mentoria-Tech)
   - Chatbot: https://typebot.co/mentoria-hub-jy978rh
   - Descrição: Solução inteligente e automatizada voltada para o desenvolvimento de carreira na área de tecnologia, recomendando trilhas de estudo estruturadas.
2. Macro Scenario Engine (https://github.com/Savarezi/macro-scenario-engine)
   - Chatbot: https://typebot.co/macro-scenario-engine-ayae11f
   - Descrição: Motor de Análise Macroeconômica baseado em IA desenvolvido para interpretar cenários econômicos e sugerir tomadas de decisão inteligentes para investimentos na B3.
3. Planej.ai (https://github.com/Savarezi/PlanejAI, Live: https://planejaai.netlify.app/)
   - Descrição: Plataforma inteligente de planejamento financeiro pessoal baseada na consagrada regra orçamentária 50-30-20.
4. VendaFácil (https://github.com/Savarezi/VendaFacil)
   - Descrição: Plataforma SaaS corporativa completa, unificando operações logísticas, comerciais e financeiras de PMEs em um Dark Mode de alta usabilidade.
5. Venda-Insights (https://github.com/Savarezi/Venda-Insights)
   - Descrição: Engenharia e análise exploratória de dados de vendas reais em Python com Pandas, extraindo inteligência comercial tática.
6. Clima São Paulo (https://github.com/Savarezi/Clima)
   - Descrição: Coleta histórica, tratamento e visualização de dados climáticos meteorológicos utilizando Python e integrando com a API Open-Meteo.
7. AWS Cloud Practitioner Portfolio (https://github.com/Savarezi/aws-restart-cloud-practitioner)
   - Descrição: Laboratórios práticos cobrindo governança e serviços vitais da nuvem Amazon Web Services (AWS re/Start).
8. Simulador de Empréstimo (Chatbot: https://typebot.co/simulador-de-atendimento-ue57nx5)
   - Descrição: Atendimento conversacional simulando fluxograma corporativo e taxas rítmicas de empréstimo.

EXPERIÊNCIA PROFISSIONAL:
- Analista de Relacionamento (YOU.BPOTECH): Diagnóstico ágil de problemas em sistemas, mapeamento minucioso de requisitos de usuários finais, interpretação pragmática de métricas de engajamento e otimização geral de performance de plataformas.
- Central de Relacionamento (AC Camargo Cancer Center): Cadastro e controle de dados críticos, governança e rastreabilidade cadastral em conformidade operacional, e monitoramento de processos de ponta a ponta via ferramenta de CRM Salesforce e Plusoft.
- Consultora de Vendas (TMKT): Análise diária de métricas comerciais e indicadores de conversão (KPIs), acompanhamento direto de metas corporativas e apoio a decisões estratégicas com fundamentação em dados.
- Profissional de Suporte Técnico e Atendimento Digital (Voluntária no Descomplica SP): Atendimento digital avançado, autenticação segura, e resolução eficiente de chamados e cadastros em múltiplos sistemas com excelente experiência de usuário.

CERTIFICAÇÕES E FORMAÇÕES:
- Análise e Desenvolvimento de Sistemas (2º Semestre) - Superior Tecnólogo (Fevereiro de 2026 - Em Andamento)
- Formação em Desenvolvimento de Soluções Digitais e Automação (360 horas) - Mercado Eletrônico | DiverseDEV 2025 | Ada Tech (Concluido em Fevereiro de 2026) - n8n, Supabase, Lovable, lógica de programação e banco de dados.
- Bootcamp Santander 2025 – Automação com n8n - Santander Open Academy (Foco em IA, automação e orquestração de APIs)
- Formação em Tecnologia da Informação (360h) - Escola da Nuvem (Nuvem AWS, Python, Linux, IA aplicada)
- Bootcamp – Análise de Dados com Python (360h) – Reprograma (EDA e insights analíticos estratégicos)
- Excel para Análise de Dados – Preditiva Analytics (Nota 10) (Fórmulas avançadas, dashboards estruturados)
- AWS re/Start Bootcamp / Fundamentos em Nuvem AWS – DIO / SQL para Análise de Dados – Udemy / Engenharia de Prompt – Alura / Metodologias Ágeis (Scrum) – ADA / Versionamento Git/GitHub – DIO
`;

// API routes
app.post("/api/cv/generate", async (req, res) => {
  const { prompt, format, focusRole } = req.body;
  
  try {
    const ai = getGeminiClient();
    
    const userPrompt = prompt || "Por favor, crie um currículo geral destacando minhas principais competências com Dados, Automação n8n e Cloud AWS.";
    const targetFocus = focusRole ? `Foco no cargo/área: ${focusRole}` : "";

    const systemInstruction = `
Você é uma inteligência geradora de currículos customizados de altíssimo nível.
Sua missão única é formatar um currículo profissional impecável em português para Patrícia Oliveira, com base nos seus dados reais contidos na fonte de verdade.

Dados Reais de Patrícia para usar como fonte de verdade absoluta (NÃO invente nenhuma empresa ou projeto fictício):
${PATRICIA_CV_CONTEXT}

Diretrizes de formatação e conteúdo:
1. Ajuste a narrativa do Perfil Profissional, Resumo e Destaques de Habilidades de forma inteligente para satisfazer o que o usuário solicitou (${userPrompt}). Se ele descreveu uma vaga de emprego específica, realce as experiências de Patrícia que MAIS combinam com essa vaga.
2. Estruture em seções de markdown elegantes:
   - **Cabeçalho**: Nome Completo, Contatos Reais (Telefone: (11) 95806-0387, Email: patriciasavarezioliveira@gmail.com, Localidade: São Paulo - SP, links com a URL completa escrita explicitamente ex: LinkedIn: [https://www.linkedin.com/in/savarezi/](https://www.linkedin.com/in/savarezi/) | GitHub: [https://github.com/Savarezi](https://github.com/Savarezi)).
   - **Perfil Profissional**: Pequeno parágrafo profissional, centrado nos pontos fortes da vaga pretendida.
   - **Competências Técnicas**: Bullet points estruturados.
   - **Experiência Profissional**: Liste as experiências com dados, relacionamento e suporte dela, incluindo conquistas marcantes.
   - **Projetos em Destaque**: Selecione os projetos práticos reais dela de maior relevância, indicando a URL do GitHub completa escrita explicitamente ex: [https://github.com/Savarezi/...](https://github.com/Savarezi/...), estimulando a navegação de forma clara. Cadeia de entrega rítmica e real.
   - **Certificações e Educação**: Listados de forma categórica e limpa.
3. NÃO invente experiências ou empresas em que ela não trabalhou, use estritamente as que estão listadas na fonte de verdade.
4. Retorne APENAS o conteúdo em formato Markdown limpo e extremamente profissional. Não use tags adicionais ou comentários de IA fora do próprio currículo gerado.
5. Tom maduro, sofisticado e de altíssimo impacto executivo.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Gere um currículo sofisticado e otimizado com base na seguinte solicitação de customização: "${userPrompt}". ${targetFocus}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const markdownText = response.text || "Erro ao gerar currículo. Tente novamente.";
    res.json({ success: true, cvMarkdown: markdownText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, error: error.message || "Internal server error" });
  }
});

// Mock or intelligent chatbot API for answering recruiter questions about Patricia
app.post("/api/recruiter-chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  try {
    const ai = getGeminiClient();
    const systemInstruction = `
Você é a Assistente Virtual de Recrutamento de Patrícia Oliveira, simulando de forma extremamente empática, cordial e inteligente as habilidades dela.
Sua meta é responder perguntas de recrutadores sobre a Patrícia com base nos dados reais dela fornecidos:

${PATRICIA_CV_CONTEXT}

Tom de voz:
- Profissional, entusiasmado, prestativo e humilde, mas extremamente confiante.
- Sempre responda em português com boa formatação (use negritos leves para facilitar a leitura).
- Caso perguntem por algo que ela não possui ou não sabe, seja honesto(a) e mostre que ela é uma profissional com rápida curva de aprendizado (aprendeu AWS, IA e Typebot em curtos períodos, desenvolvendo projetos funcionais excelentes).

Seja conciso, as respostas devem ter no máximo 2 ou 3 parágrafos explicativos.
`;

    // Process messaging history inside chat system or basic prompt integration
    const formattedHistory = chatHistory && Array.isArray(chatHistory) 
      ? chatHistory.map((ch: any) => `${ch.role === 'user' ? 'Recrutador' : 'Assistente'}: ${ch.content}`).join("\n")
      : "";

    const userQuery = `${formattedHistory}\nRecrutador: ${message}\nAssistente:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.6,
      }
    });

    res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error("Recruiter Chat Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API route for job compatibility analysis (Dossier generation)
app.post("/api/cv/match-analysis", async (req, res) => {
  const { jobTitle, jobDescription } = req.body;
  
  if (!jobTitle) {
    return res.status(400).json({ success: false, error: "O título da vaga é obrigatório para a análise." });
  }

  try {
    const ai = getGeminiClient();
    
    const systemInstruction = `
Você é uma inteligência especializada em recrutamento tech e análise detalhada de competências e aderência profissional (ATS & Headhunting).
Sua missão única é analisar o quão compatível a Patrícia Oliveira é para uma vaga específica fornecida pelo recrutador, baseando-se estritamente em sua fonte de dados reais.

Dados Reais de Patrícia Oliveira (Fonte de verdade absoluta):
${PATRICIA_CV_CONTEXT}

Diretrizes Críticas da análise:
1. RIGOR E COERÊNCIA DE SCORE: Você deve ser extremamente criterioso, realista e honesto ao avaliar o score de compatibilidade técnica. NÃO dê notas altas por "vontade de aprender" ou soft skills se a pessoa não tiver a qualificação técnica exigida.
2. CASO DE EXCLUSÃO (VAGAS FORA DE TECNOLOGIA/DADOS): Se a vaga informada pertencer a áreas completamente fora da TI, Dados, Nuvem ou Automações (por exemplo: enfermagem, medicina, psicologia, saúde em geral, culinária/gastronomia, engenharia civil, pedagogia/professor infantil, advocacia, veterinária, mecânica de automóveis, segurança física, etc.):
   - O score ("score") DEVE ser obrigatoriamente muito baixo, entre 0% e 15% no máximo.
   - O resumo ("summary") deve explicar respeitosamente que o portfólio e formação acadêmica da Patrícia são focados 100% no setor de Tecnologia da Informação (Automações, Dados, Nuvem), não possuindo as habilitações técnicas, licenças profissionais obrigatórias (como COREN para enfermagem, CRM para medicina, OAB para direito) ou a formação assistencial/técnica exigida para essa ocupação.
   - Os pontos fortes ("strengths") podem citar competências de organização lógica e digital abstrata, mas devem destacar claramente que não se aplicam profissionalmente ao cargo prático requisitado.
   - Os gaps ("gaps") devem pontuar explicitamente a ausência completa de formação acadêmica na área e a falta de registro legal para atuação na profissão.
   - O parecer consultivo ("fullReportMarkdown") deve de forma honesta e profissional desencorajar a contratação para este fim específico, sugerindo direcioná-la apenas para oportunidades de Dados, Automação ou Tech.
3. ADERÊNCIA TÉCNICA REAL:
   - Sinergia Excelente (70% - 98%): Vagas focadas em automação de processos (n8n, Typebot, Zapier), análise de dados (Python Pandas, SQL, Excel com dashboards), suporte técnico a sistemas ou computação em nuvem (AWS).
   - Sinergia Moderada (30% - 65%): Vagas de escritório gerais que demandem CRM (Salesforce), atendimento digital, resolução de chamados ou Excel avançado, mas sem programação profunda.
   - Sinergia Mínima/Nula (0% - 25%): Vagas técnicas extremamente distantes do foco dela (ex: Programador C++ sênior de sistemas operacionais embarcados, Desenvolvedor Mobile nativo Swift/Kotlin, Engenheiro de Redes físicas de telecomunicações, Arquiteto de Hardware) e as funções não-tecnológicas descritas na diretriz 2.

Você DEVE responder estritamente em formato JSON válido seguindo exatamente esta estrutura:
{
  "score": 10,
  "summary": "Breve parágrafo de resumo executivo explicando transparentemente o nível de match real...",
  "strengths": ["Competência analítica e de lógica estruturada...", "Grande iniciativa de aprendizado..."],
  "gaps": ["Falta de registro profissional ou formação específica na área solicitada..."],
  "projects": [
    {
      "name": "Nome de um projeto tecnológico real dela (apenas como referência de base)",
      "whyFit": "Por que este projeto comprova que a mente dela é estruturada, embora a especialidade seja estritamente técnica."
    }
  ],
  "fullReportMarkdown": "# Relatório de Sinergia Profissional\\n\\nFaça uma análise concisa, transparente e realista justificando a pontuação atribuída."
}
`;

    const userPrompt = `Analise a compatibilidade técnica da Patrícia para a vaga de: "${jobTitle}" com os seguintes detalhes/requisitos: "${jobDescription || 'Não informados'}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const textOutput = response.text || "{}";
    
    // Attempt parsing. If anything fails, build a robust fallback object.
    let analysis;
    try {
      analysis = JSON.parse(textOutput);
    } catch (parseError) {
      console.warn("Failed to parse Gemini output as JSON, reconstructing safe fallback.", parseError);
      // Clean raw text or extract JSON block manually
      let jsonMatch = textOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysis = JSON.parse(jsonMatch[0]);
        } catch {
          throw new Error("Formato inválido de resposta de IA.");
        }
      } else {
        throw new Error("Falha ao analisar a resposta da IA.");
      }
    }

    res.json({ success: true, analysis });
  } catch (error: any) {
    console.error("Match Analysis Error:", error);
    res.status(500).json({ success: false, error: error.message || "Internal server error" });
  }
});

// Vite middleware flow for full stack deployment
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
