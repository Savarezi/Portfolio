# 🌟 Portfólio High-Tech & IA de Recrutamento — Patrícia Oliveira

Seja muito bem-vindo ao portfólio profissional de **Patrícia Oliveira**. Este projeto representa um ecossistema interativo de ponta, focado na exibição de competências em Desenvolvimento de Software, Cloud Computing (AWS), Inteligência Artificial (Typebot) e Desenvolvimento SaaS.


---

## 🚀 Funcionalidades Principais

- **🤖 Assistente de Recrutamento Virtual Integrada**: Acesso interativo direto ao Typebot oficial de recrutamento para sanar dúvidas instantâneas sobre o perfil da Patrícia.
- **📄 Gerador Inteligente de Currículo com IA**: Criação de currículos personalizados sob medida usando inteligência artificial com foco voltado para diferentes áreas técnicas.
- **💾 Sistema de Download e Cópia Robusta**: Mecanismo inteligente capaz de simular e efetuar o download do arquivo `.md` (Markdown) do currículo gerado ou copiá-lo para a área de transferência com feedbacks de banner visual (com tratamento de exceções de sandbox/iframe).
- **🎨 Design Futurista Profissional**: Baseado em tons modernos e interfaces no estilo Glassmorphism, construído puramente com **Tailwind CSS** e **Framer Motion** para transições de alta fidelidade e excelente experiência do usuário.

---

## 📂 Estrutura de Arquivos (Ambiente Clicável)

Explore as principais pastas e códigos-fonte do projeto clicando nos links diretamente na tabela abaixo:

| Estrutura de Pastas | Atalho Clicável | Função Principal / Arquitetura do Componente | Stack Utilizada |
| :--- | :--- | :--- | :--- |
| **📂about** | [`/src/components/AboutSection.tsx`](./src/components/AboutSection.tsx) | Gerencia o Painel de Boas-Vindas e o Gerador de Currículo com IA (com download e cópia) | `React`, `Framer Motion`, `Gemini API` |
| **📂floating-bot** | [`/src/components/FloatingBot.tsx`](./src/components/FloatingBot.tsx) | Widget flutuante que hospeda o Typebot de chat oficial da candidata para suporte rápido | `Typebot Embed`, `Lucide Icons` |
| **📂projects** | [`/src/components/ProjectsSection.tsx`](./src/components/ProjectsSection.tsx) | Grade interativa com renderização de tags dinâmicas e links para repositórios | `Tailwind CSS`, `motion` |
| **📂skills** | [`/src/components/SkillsSection.tsx`](./src/components/SkillsSection.tsx) | Catálogo interativo de habilidades divididas em Ia, DevOps e Desenvolvimento | `Grid Layouts`, `Subtle Hover Animations` |
| **📂experience** | [`/src/components/ExperienceSection.tsx`](./src/components/ExperienceSection.tsx) | Linha do tempo animada contendo o histórico profissional de Patrícia | `Framer Motion Timeline` |
| **📂education** | [`/src/components/EducationSection.tsx`](./src/components/EducationSection.tsx) | Bloco contendo as graduações acadêmicas, cursos e certificações AWS | `Responsive Cards` |
| **📂navigation** | [`/src/components/Sidebar.tsx`](./src/components/Sidebar.tsx) | Painel lateral estilizado e responsivo que controla as seções ativas do portfólio | `Glassmorphic Navigation` |

---

## 🛠️ Como Executar e Compilar o Projeto

Para testar ou desenvolver localmente o projeto, siga as instruções rápidas abaixo:

### 1. Clonar e Instalar Dependências

```bash
# Instale as dependências listadas no package.json
npm install
```

### 2. Executar em Ambiente de Desenvolvimento

```bash
# Inicie o servidor local (Porta 3000)
npm run dev
```

### 3. Verificar Erros e Formatação (Linter)

```bash
# Executa a verificação estática do TypeScript
npm run lint
```

### 4. Compilar para Produção (Build)

```bash
# Compila e otimiza todos os assets para a pasta /dist
npm run build
```

---

## 📝 Compromisso e Autoria

Este portfólio reúne as melhores práticas de desenvolvimento moderna em **React + TypeScript**, garantindo adaptabilidade móvel de alta performance, design centrado na conversão de recrutamento e soluções limpas e modulares de código.

*Desenvolvido com excelência por Patrícia Oliveira.*
