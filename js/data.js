/**
 * ============================================================
 * CONTEÚDO EDITÁVEL DO PORTFÓLIO — Herbet Rodrigues
 * ============================================================
 * Edite textos, links e listas abaixo.
 * Campos entre [COLCHETES] ainda aguardam informação pessoal.
 * ============================================================
 */

window.portfolioData = {
  /* ---------- IDENTIDADE ---------- */
  name: "Herbet Rodrigues",
  roleLabel: "Projetos com apoio de IA",
  tagline: "Eu crio soluções digitais com apoio de inteligência artificial.",
  heroSupporting:
    "Do planejamento à entrega, uso IA para transformar necessidades reais em produtos e ferramentas úteis.",

  photoEnabled: true,
  photo: "assets/foto-perfil-cutout.png",
  photoAlt: "Herbet Rodrigues",

  heroPanels: [
    {
      title: "Sobre mim",
      text: "Desenvolvo projetos digitais com apoio de IA, unindo ideia, construção e melhoria contínua.",
      href: "#sobre",
      linkLabel: "Saiba mais",
    },
    {
      title: "Meus projetos",
      text: "Healthcare, ferramentas Suri CS/Shop e Gestão de Squad Técnico.",
      href: "#projetos",
      linkLabel: "Ver portfólio",
    },
  ],

  /* ---------- SOBRE MIM ---------- */
  about: {
    title: "Sobre mim",
    paragraphs: [
      "Sou Herbet Rodrigues e desenvolvo projetos digitais com apoio de inteligência artificial — da definição do problema até a entrega.",
      "Tenho interesse em produtos que resolvem necessidades reais: sistemas de gestão, automações e ferramentas internas. A IA entra no planejamento, na construção e no aprimoramento de cada projeto.",
    ],
  },

  /* ---------- PROJETOS ---------- */
  projects: [
    {
      id: "healthcare",
      name: "Healthcare",
      shortDescription:
        "Sistema de gestão odontológica multi-clínica: agenda, pacientes, financeiro, CRM e assinatura.",
      problem:
        "A operação da clínica costuma ficar espalhada entre planilhas, caixa solto e confirmações manuais — sem um sistema único com permissões, multi-unidade e cobrança recorrente.",
      whatItDoes:
        "Centraliza a operação da clínica: dashboard, agenda, pacientes (com prontuário e odontograma), profissionais, procedimentos, estoque, financeiro, CRM/leads, relatórios e gestão de assinatura via Asaas.",
      tools: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "shadcn/ui",
        "Supabase",
        "TanStack Query",
        "React Router",
        "Asaas",
        "Vitest",
        "Cursor / IA",
      ],
      aiProcess:
        "Desenvolvimento iterativo com Cursor: definição de módulos, implementação de telas e regras, integrações (Asaas, Meta), correções de produção, testes e checklist de go-live.",
      context:
        "SaaS B2B voltado a clínicas odontológicas, com isolamento por clínica (RLS), LGPD e fluxo de assinatura.",
      objective:
        "Oferecer um ERP odontológico completo e vendável por assinatura, cobrindo operação, financeiro e aquisição de leads.",
      solution:
        "SPA React + Supabase como backend (Postgres, Auth, Storage e Edge Functions). Regras sensíveis e webhooks ficam nas functions; a UI organiza módulos por perfil de acesso.",
      learnings:
        "Billing e webhooks pedem idempotência e reconciliação; integrações externas precisam de camada dedicada; documentação de deploy e checklist fazem parte do produto.",
      image: "assets/projects/healthcare-dashboard.png",
      imageAlt: "Captura de tela do dashboard do Healthcare",
      link: "https://www.healthcare.app.br/",
      linkLabel: "Ver demonstração",
      repoLink: "https://github.com/DyoneCacau/healtcare-modified",
      gallery: [
        {
          src: "assets/projects/healthcare-dashboard.png",
          alt: "Dashboard — visão geral da clínica",
        },
        {
          src: "assets/projects/healthcare-pacientes.png",
          alt: "Pacientes — lista e prontuário",
        },
        {
          src: "assets/projects/healthcare-financeiro.png",
          alt: "Financeiro — caixa e contas a receber",
        },
        {
          src: "assets/projects/healthcare-profissionais.png",
          alt: "Profissionais — equipe da clínica",
        },
      ],
    },
    {
      id: "requisicao-http",
      name: "CS - Requisição HTTP",
      shortDescription:
        "Ensina e guia a montagem de requisições HTTP na Suri para analistas e clientes que precisam consultar cadastro no fluxo operacional.",
      problem:
        "Muitos analistas e clientes precisam de requisição HTTP dentro do fluxo Suri, mas montar planilha, Apps Script e card HTTP na mão é confuso, lento e fácil de errar.",
      whatItDoes:
        "Orienta passo a passo a criação da planilha por segmento, geração do Apps Script e montagem do card HTTP pronto para o fluxo operacional na Suri.",
      tools: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Radix UI",
        "SheetJS (xlsx)",
        "Google Apps Script",
        "Cursor / IA",
      ],
      aiProcess:
        "Desenvolvimento com Cursor: wizard por etapas, modelos de planilha por segmento, geração de script e validação do pacote exportável para a Suri.",
      context:
        "Ferramenta de apoio ao time de CS e a clientes Suri que precisam de consulta de cadastro via requisição no atendimento.",
      objective:
        "Facilitar e padronizar a criação de requisições HTTP na Suri, reduzindo dúvida e retrabalho na implementação.",
      solution:
        "Fluxo guiado no browser: escolher segmento, gerar estrutura de planilha, preparar Apps Script e exportar o que sobe no card HTTP da Suri.",
      learnings:
        "Segmentos diferentes pedem colunas e identificação distintas; o wizard reduz erro quando a geração de script e o card HTTP seguem o mesmo padrão.",
      image: "assets/projects/requisicao-http-wizard.png",
      imageAlt: "Wizard de Requisição HTTP na Suri",
      link: "https://cs-requisicao.vercel.app/",
      linkLabel: "Ver demonstração",
      repoLink: "https://github.com/DyoneCacau/cs-requisicao",
      gallery: [
        {
          src: "assets/projects/requisicao-http-wizard.png",
          alt: "Wizard — criar planilha e requisição HTTP",
        },
        {
          src: "assets/projects/suri-cs-hub.png",
          alt: "Hub SURI CS — entrada da ferramenta",
        },
      ],
    },
    {
      id: "rd-fluxo",
      name: "RD Fluxo",
      shortDescription:
        "Migra fluxos da RD Conversas para a Suri: importa os JSONs, organiza e exporta no padrão unificado da plataforma Suri.",
      problem:
        "Clientes que saem da RD Conversas para a Suri precisam levar o fluxo, mas o formato da RD não sobe direto e a conversão manual é trabalhosa e inconsistente.",
      whatItDoes:
        "Recebe os arquivos exportados da RD, monta a visão do fluxo e gera um pacote formatado no padrão Suri para upload unificado na plataforma.",
      tools: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Radix UI",
        "Parser RD → Suri",
        "Cursor / IA",
      ],
      aiProcess:
        "Construção com Cursor: leitura dos JSONs da RD, mapeamento de nós e ligações, relatório de compatibilidade e exportação no formato Suri.",
      context:
        "Apoio a migrações RD Conversas → Suri, para CS e implementação que precisam preservar o atendimento automatizado.",
      objective:
        "Permitir baixar o fluxo da RD e subir na Suri de forma unificada, no formato padrão da plataforma.",
      solution:
        "Importação de um ou mais JSONs da RD, visualização do grafo pelas conexões observadas e exportação do pacote Suri pronto para importar.",
      learnings:
        "O formato RD não é o da Suri; a conversão precisa tratar menus, requisições HTTP e autenticação com revisão pontual.",
      image: "assets/projects/rd-fluxo-arquivos.png",
      imageAlt: "Tela do RD Fluxo — migração RD Conversas para Suri",
      link: "https://cs-requisicao.vercel.app/",
      linkLabel: "Ver demonstração",
      repoLink: "https://github.com/DyoneCacau/cs-requisicao",
      gallery: [
        {
          src: "assets/projects/rd-fluxo-arquivos.png",
          alt: "RD Fluxo — arquivos JSON e conversão para Suri",
        },
        {
          src: "assets/projects/suri-cs-hub.png",
          alt: "Hub SURI CS — acesso ao RD Fluxo",
        },
      ],
    },
    {
      id: "suri-shop-logistica",
      name: "Automação Logística — Suri Shop",
      shortDescription:
        "Preenchimento intuitivo de políticas de logística do Suri Shop (entrega, retirada, CEP e prazo) com exportação da planilha pronta para upload.",
      problem:
        "Muitos clientes têm dificuldade para preencher a planilha de logística do Suri Shop — cidade, bairros, CEP, prazos e frete — e erram formato ou deixam campos incompletos.",
      whatItDoes:
        "Oferece campos guiados e mais claros para montar as regras de entrega e retirada; ao final, exporta a planilha preenchida para subir no ambiente do Suri Shop.",
      tools: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Radix UI",
        "SheetJS (xlsx)",
        "Cursor / IA",
      ],
      aiProcess:
        "Desenvolvimento com Cursor: wizard de logística, tipagens de CEP/bairro/prazo e exportação XLSX no formato esperado pelo Suri Shop.",
      context:
        "Módulo do SURI SHOP voltado a lojas que configuram frete e retirada no atendimento Suri.",
      objective:
        "Tornar o preenchimento da logística mais simples e gerar a planilha correta para importar no Suri Shop.",
      solution:
        "Interface por etapas com campos intuitivos; depois do preenchimento, exportação da planilha formatada para upload no ambiente Suri Shop.",
      learnings:
        "Planilha complexa fica mais confiável quando a UI valida cidade, CEP, bairros e prazos antes de gerar o Excel.",
      image: "assets/projects/suri-shop-logistica-frete.png",
      imageAlt: "Automação Logística do Suri Shop — políticas de frete",
      link: "https://cs-requisicao.vercel.app/",
      linkLabel: "Ver demonstração",
      repoLink: "https://github.com/DyoneCacau/cs-requisicao",
      gallery: [
        {
          src: "assets/projects/suri-shop-logistica-frete.png",
          alt: "Logística — políticas de frete, CEP e prazos",
        },
        {
          src: "assets/projects/suri-cs-hub.png",
          alt: "Hub SURI CS — entrada do SURI SHOP",
        },
      ],
    },
    {
      id: "squad-tecnico",
      name: "Gestão de Squad Técnico",
      shortDescription:
        "Novo setor dentro da implantação inbound: coordenação técnica de integrações nativas e externas com Suri Shop.",
      problem:
        "Implantações inbound com Suri Shop misturam integrações nativas e externas, e sem um squad técnico dedicado o fluxo fica disperso entre CS, implementação e parceiros.",
      whatItDoes:
        "Estrutura a gestão do squad técnico no inbound: prioriza demandas de integração, padroniza handoff, acompanha nativas e externas com Suri Shop e mantém a entrega alinhada à operação.",
      tools: [
        "Gestão de squad",
        "Implantação inbound",
        "Suri Shop",
        "Integrações nativas",
        "Integrações externas",
        "Cursor / IA",
      ],
      aiProcess:
        "Uso de IA no apoio a playbooks, checklists de integração, documentação de handoff e organização das frentes do squad técnico.",
      context:
        "Setor novo dentro da implantação inbound, focado em questões técnicas de integração com Suri Shop — nativas da plataforma e externas (parceiros/APIs).",
      objective:
        "Dar ritmo e clareza à frente técnica do inbound: quem faz o quê, em qual ordem, e como a integração sobe com qualidade no Suri Shop.",
      solution:
        "Modelo de squad técnico com filas, critérios de complexidade, rituais de acompanhamento e pacotes de entrega para integrações nativas e externas.",
      learnings:
        "Integração nativa e externa pedem trilhas diferentes; o squad reduz retrabalho quando o inbound já nasce com critério técnico e dono claro.",
      image: "assets/projects/squad-tecnico-dashboard.png",
      imageAlt: "Gestão de Squad Técnico — painel de chamados",
      link: "",
      linkLabel: "Em construção",
      repoLink: "",
      gallery: [
        {
          src: "assets/projects/squad-tecnico-dashboard.png",
          alt: "Dashboard — gestão de chamados do squad técnico",
        },
        {
          src: "assets/projects/squad-tecnico-novo-chamado.png",
          alt: "Novo chamado — analista e acompanhamento do squad",
        },
        {
          src: "assets/projects/squad-tecnico-lista.png",
          alt: "Lista de chamados — integração nativa e externa",
        },
      ],
    },
  ],

  /* ---------- FERRAMENTAS E PROCESSO ---------- */
  toolsProcess: {
    title: "Ferramentas e processo",
    intro:
      "As ferramentas mudam conforme o projeto. Abaixo, um recorte do que aparece com frequência no meu trabalho com IA.",
    groups: [
      {
        label: "Planejamento e ideação",
        tools: ["Cursor", "Documentação do produto", "Fluxos e requisitos"],
      },
      {
        label: "Criação e desenvolvimento",
        tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      },
      {
        label: "Aprimoramento e entrega",
        tools: ["Vitest", "GitHub", "Vercel", "Revisão com IA"],
      },
    ],
    aiWorkflow: {
      title: "Como utilizo IA",
      steps: [
        {
          stage: "Planejamento",
          description:
            "Uso IA para esclarecer o problema, organizar o escopo, comparar abordagens e montar um plano de implementação antes de escrever código.",
        },
        {
          stage: "Criação",
          description:
            "Construo telas, lógica e integrações com apoio do Cursor — sempre revisando o que faz sentido para o projeto e ajustando o que a IA sugere.",
        },
        {
          stage: "Aprimoramento",
          description:
            "Peço ajuda para revisar, testar, corrigir regressões e melhorar a entrega, mantendo o controle das decisões finais.",
        },
      ],
    },
  },

  /* ---------- CONTATO ---------- */
  contact: {
    title: "Contato",
    intro:
      "Quer conversar sobre um projeto ou saber mais? Use os canais abaixo.",
    email: "dh.dev@hotmail.com",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/DyoneCacau",
        enabled: true,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/dyoneherbet/",
        enabled: true,
      },
      { label: "[OUTRO PERFIL]", url: "", enabled: false },
    ],
  },
};
