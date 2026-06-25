import { Project, Experience, EducationCertification, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: 'Patrícia Oliveira',
  title: 'Analista de Dados, Desenvolvedora & Analista de Automação (Especialista em n8n)',
  bio: 'Profissional em formação em Análise e Desenvolvimento de Sistemas com sólida competência prática e especialização em n8n, análise de dados, automação inteligente de processos, computação em nuvem (AWS) e Engenharia de Prompt aplicada. Foco em eficiência operacional, orquestração de workflows complexos e tomadas de decisão baseadas em dados.',
  email: 'patriciasavarezioliveira@gmail.com',
  phone: '(11) 95806-0387',
  location: 'São Paulo - Zona Leste - SP',
  linkedin: 'https://www.linkedin.com/in/savarezi/',
  github: 'https://github.com/Savarezi',
  avatarUrl: 'https://github.com/Savarezi.png',
  cvPromptPlaceholder: 'Por exemplo: Vaga de Analista de Automação com n8n ou Desenvolvedora Python Júnior, destacando minhas competências em cloud e dados...',
};

export const PROJECTS: Project[] = [
  {
    id: 'ia-reports-excel',
    title: 'IA Reports & Porsche Sales Dashboard',
    description: 'Projeto de aceleração voltado para a criação de fluxos de trabalho inteligentes, utilizando a integração de dados em Excel, agentes baseados em GPT e Claude Code para sanitização, análise e visualização de dados.',
    githubUrl: 'https://github.com/Savarezi/IA-Reports-com-Excel-GPT-Agents-e-Claude-Code',
    liveUrl: 'https://porschesalesdashboard.netlify.app/',
    tags: ['GPT Agents', 'Claude Code', 'Excel', 'Data Analytics', 'Dashboards'],
    category: 'ia',
  },
  {
    id: 'jornada-dev-totvs',
    title: 'Jornada DEV - Start+ TOTVS',
    description: 'Este repositório armazena estudos, práticas e projetos desenvolvidos ao longo da jornada no programa Start+ da TOTVS, focando em Lógica de Programação, Desenvolvimento de Sistemas, Protheus, ADVPL e Orientação a Objetos. (Ainda em construção 🚀)',
    githubUrl: 'https://github.com/Savarezi/Jornada-DEV',
    tags: ['TOTVS Start+', 'ADVPL', 'Protheus', 'Lógica de Programação', 'OOP', 'Em Construção'],
    category: 'fullstack',
  },
  {
    id: 'mentoria-tech',
    title: 'Mentoria Tech / Hub',
    description: 'Uma solução inteligente e automatizada voltada para o desenvolvimento de carreira na área de tecnologia. O sistema recomenda trilhas de estudo, sugere posicionamento profissional e automatiza a orientação na área.',
    githubUrl: 'https://github.com/Savarezi/Mentoria-Tech',
    chatbotUrl: 'https://typebot.co/mentoria-hub-jy978rh',
    tags: ['Inteligência Artificial', 'Typebot', 'GPT-4', 'Python', 'Aconselhamento'],
    category: 'ia',
  },
  {
    id: 'macro-scenario-engine',
    title: 'Macro Scenario Engine',
    description: 'O Motor de Análise Macroeconômica é uma solução baseada em Inteligência Artificial desenvolvida para interpretar cenários econômicos e gerar recomendações estratégicas sobre setores e oportunidades de investimento na Bolsa Brasileira B3.',
    githubUrl: 'https://github.com/Savarezi/macro-scenario-engine',
    chatbotUrl: 'https://typebot.co/macro-scenario-engine-ayae11f',
    tags: ['IA', 'Macroeconomia', 'B3', 'Typebot Integrado', 'Finanças'],
    category: 'ia',
  },
  {
    id: 'planej-ai',
    title: 'Planej.ai',
    description: 'Uma plataforma de planejamento financeiro pessoal inteligente baseada na famosa regra orçamentária 50-30-20. O sistema guia o usuário em sua jornada de poupar de forma realista e interativa.',
    githubUrl: 'https://github.com/Savarezi/PlanejAI',
    liveUrl: 'https://planejaai.netlify.app/',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Finanças Pessoais'],
    category: 'fullstack',
  },
  {
    id: 'venda-facil',
    title: 'VendaFácil',
    description: 'Plataforma SaaS de alta performance projetada para otimizar e unificar as operações comerciais, financeiras e logísticas de micro, pequenas e médias empresas (PMEs) com um belíssimo Dark Mode corporativo.',
    githubUrl: 'https://github.com/Savarezi/VendaFacil',
    tags: ['React', 'TypeScript', 'Tailwind', 'SaaS', 'Engenharia de Dados'],
    category: 'fullstack',
  },
  {
    id: 'venda-insights',
    title: 'Venda-Insights',
    description: 'Projeto de Análise de Vendas! Exploração profunda de dados reais de vendas para compreender o comportamento dos produtos, categorias, marcas e clientes, impulsionando decisões estratégicas através de inteligência.',
    githubUrl: 'https://github.com/Savarezi/Venda-Insights',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Data Analytics', 'Insights'],
    category: 'data',
  },
  {
    id: 'clima',
    title: 'Clima São Paulo',
    description: 'Este projeto realiza a coleta histórica, análise e visualização interativa de dados meteorológicos de temperatura e precipitação para a cidade de São Paulo, consumindo da API aberta e gratuita do Open-Meteo.',
    githubUrl: 'https://github.com/Savarezi/Clima',
    tags: ['Python', 'Open-Meteo API', 'Pandas', 'Visualização de Dados'],
    category: 'data',
  },
  {
    id: 'aws-restart',
    title: 'AWS Cloud Practitioner Portfolio',
    description: 'Documentação completa e laboratórios práticos executados durante o programa AWS re/Start. Demonstra e atesta competências em serviços chave da Amazon Web Services (AWS) e preparatórios de certificação.',
    githubUrl: 'https://github.com/Savarezi/aws-restart-cloud-practitioner',
    tags: ['AWS', 'Cloud Computing', 'VPC', 'EC2', 'S3', 'RDS', 'Security'],
    category: 'cloud',
  },
  {
    id: 'simulador-emprestimo',
    title: 'Simulador de Atendimento (Empréstimos)',
    description: 'Um chatbot inteligente projetado para simular o atendimento interativo ao cliente de uma instituição financeira de empréstimo. Simula simbiose perfeita de taxas rítmicas e fluxograma comercial.',
    chatbotUrl: 'https://typebot.co/simulador-de-atendimento-ue57nx5',
    tags: ['Typebot', 'Atendimento Conversacional', 'UX Conversacional', 'Empréstimos'],
    category: 'ia',
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Analista de Relacionamento',
    company: 'YOU.BPOTECH',
    period: 'Experiência Recente',
    description: 'Foco em diagnóstico aprofundado de problemas de software/usuario e otimização contínua de performance e fluxos operacionais.',
    bullets: [
      'Diagnóstico ágil de problemas complexos e proposição de melhorias significativas no fluxo de experiência do usuário.',
      'Mapeamento consultivo de necessidades e interpretação analítica de métricas de engajamento.',
      'Identificação rápida de padrões e prevenção proativa de falhas de processamento e acessos.',
      'Otimização contínua de rotinas e da performance funcional geral de plataformas corporativas.'
    ]
  },
  {
    role: 'Profissional de Atendimento & Suporte Técnico (Voluntária)',
    company: 'Descomplica SP',
    period: 'Experiência Voluntária',
    description: 'Atuação voluntária de alto impacto em atendimento digital, suporte técnico e resolução de demandas críticas do cidadão.',
    bullets: [
      'Atuação resolutiva em suporte técnico direto ao usuário, realizando cadastro, autenticação segura e triagem avançada de chamados de software.',
      'Resolução de demandas cruciais em múltiplos sistemas governamentais e ferramentas corporativas simultaneamente.',
      'Garantia de altíssima agilidade, precisão e excelência no acolhimento e suporte digital do usuário final.'
    ]
  },
  {
    role: 'Central de Relacionamento',
    company: 'AC Camargo Cancer Center',
    period: 'Experiência Corporativa',
    description: 'Gestão de processos relacionais e integridade cadastral inteligente utilizando plataformas empresariais líderes no ecossistema.',
    bullets: [
      'Cadastro, governança e atualização minuciosa de dados críticos em sistemas corporativos hospitalares.',
      'Garantia irrestrita de integridade cadastral e rastreabilidade metódica de informações sensíveis.',
      'Operação ativa com a ferramenta de CRM Salesforce e sistema Plusoft para o monitoramento contínuo de processos e rotinas administrativas.'
    ]
  },
  {
    role: 'Consultora de Vendas',
    company: 'TMKT',
    period: 'Experiência Comercial',
    description: 'Inteligência de dados aplicada ao monitoramento e otimização de metas comerciais e fluxo analítico de funil de vendas.',
    bullets: [
      'Análise preditiva e diagnóstica de indicadores-chave de desempenho comercial e indicadores de conversão.',
      'Monitoramento rigoroso de metas de mercado e formulação de relatórios de fechamento.',
      'Apoio estratégico à tomada de decisão executiva fundamentada estritamente em analytics.',
      'Utilização avançada de sistemas digitais dedicados para o acompanhamento diário de resultados.'
    ]
  }
];

export const EDUCATION_CERTS: EducationCertification[] = [
  {
    title: 'Análise e Desenvolvimento de Sistemas (2º Semestre)',
    institution: 'Ensino Superior Tecnológico',
    year: 'Em Andamento',
    type: 'academic'
  },
  {
    title: 'Mercado Eletrônico | DiverseDEV 2025 (360h)',
    institution: 'Ada Tech',
    year: 'Fevereiro de 2026',
    type: 'certification'
  },
  {
    title: 'AI React Front-end',
    institution: 'Santander Open Academy',
    year: '2025',
    type: 'certification'
  },
  {
    title: 'Microsoft Forms',
    institution: 'Microsoft',
    year: '2025',
    type: 'certification'
  },
  {
    title: 'Bootcamp Santander 2025 – Automação com n8n',
    institution: 'Santander Open Academy',
    year: '2025',
    type: 'certification'
  },
  {
    title: 'Formação em Tecnologia da Informação (360h)',
    institution: 'Escola da Nuvem',
    year: '2024',
    type: 'certification'
  },
  {
    title: 'SQL com PostgreSQL',
    institution: 'Udemy',
    year: '2024',
    type: 'certification'
  },
  {
    title: 'Bootcamp – Análise de Dados com Python (360h)',
    institution: 'Reprograma',
    year: '2024',
    type: 'certification'
  },
  {
    title: 'Excel para Análise de Dados (Nota 10)',
    institution: 'Preditiva Analytics',
    year: '2023',
    type: 'certification'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Dados & Estatística',
    iconName: 'Database',
    skills: ['Análise Exploratória (EDA)', 'Excel Avançado (Dashboards)', 'SQL (Básico ao Avançado)', 'Machine Learning (Basics)', 'Álgebra Linear aplicada']
  },
  {
    title: 'Inteligência Artificial',
    iconName: 'Cpu',
    skills: ['Engenharia de Prompt', 'Aplicação de LLMs', 'IA aplicada a processos', 'AWS AI (Bedrock, Textract)', 'AWS Polly & Lex']
  },
  {
    title: 'Automação & Integração',
    iconName: 'Layout',
    skills: ['n8n Process Automation', 'Workflows Orchestration', 'Supabase & Lovable Integration', 'Otimização de Processos']
  },
  {
    title: 'Cloud Computing',
    iconName: 'Cloud',
    skills: ['AWS (EC2, S3, RDS)', 'AWS Lambda & VPC', 'AWS Route 53 & WAF', 'Infraestrutura de Nuvem', 'Linux Fundamentals']
  },
  {
    title: 'Desenvolvimento',
    iconName: 'Shield',
    skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Desenvolvimento SPA', 'Python', 'C# (Fundamentos)', 'Git & GitHub']
  }
];
