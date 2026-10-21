// ==========================================================================
// SITE CONFIG — único arquivo que você precisa editar para personalizar o site.
// Salve o arquivo e a página recarrega sozinha (npm run dev).
// Imagens: coloque em /public/images e referencie como '/images/arquivo.jpg'.
// ==========================================================================

export default {
  // ---- Marca ------------------------------------------------------------
  brand: {
    name: '47 SPEC',              // nome completo (títulos, mensagens de WhatsApp, rodapé)
    logoImage: '/logo.svg',        // opcional: imagem no lugar do logo em texto (apague a linha para usar mark + wordmark)
    mark: '47',                   // parte destacada do logo (aparece em caixa colorida)
    wordmark: 'SPEC',             // restante do logo
    tagline: 'Detalhe que transforma. Estética e proteção automotiva especializada em São Bernardo do Campo.',
    footerBadge: 'ALTA PERFORMANCE AUTOMOTIVA',
    copyright: '© 2026 47 SPEC - Estética Automotiva. Todos os direitos reservados.'
  },

  // ---- SEO --------------------------------------------------------------
  seo: {
    lang: 'pt-BR',
    title: '47 SPEC | Detalhe que transforma · Estética e Proteção Automotiva',
    description: 'Estética automotiva especializada em São Bernardo do Campo. Car detailing, vitrificação cerâmica, PPF, polimento técnico e pacotes Renova e Spec for Race.'
  },

  // ---- Tema (cores e fontes) -------------------------------------------
  theme: {
    accent: '#1fd3d9',            // cor de destaque (botões, detalhes). Hover e tons derivados são automáticos.
    background: '#03070a',        // fundo principal
    surface: '#071217',           // fundo das seções alternadas
    card: '#0c1c23',              // cartões
    text: '#ffffff',
    textMuted: '#9db4ba',
    // Fontes do Google Fonts: nome + pesos. Troque à vontade.
    fonts: {
      display: { family: 'Barlow Condensed', weights: [600, 700, 800], italic: true },
      body: { family: 'Barlow', weights: [400, 500, 600, 700] }
    }
  },

  // ---- Contato ----------------------------------------------------------
  contact: {
    whatsapp: '5511974939359',    // só números, com DDI + DDD
    phoneLabel: '(11) 97493-9359',
    instagram: '47.spec',         // usuário sem @
    defaultMessage: 'Olá, gostaria de um orçamento para o meu veículo na 47 SPEC.',
    floatingLabel: 'Orçamento Rápido'
  },

  // ---- Endereço e mapa --------------------------------------------------
  location: {
    eyebrow: 'ONDE ESTAMOS',
    title: 'NOSSO ESTÚDIO EM SÃO BERNARDO DO CAMPO',
    text: 'Localização privilegiada no bairro Nova Petrópolis, com fácil acesso pelas principais vias do ABC e Grande São Paulo. Ambiente fechado com monitoramento e segurança total para o seu veículo.',
    street: 'R. Dom Luís, 380 - Nova Petrópolis',
    city: 'São Bernardo do Campo - SP, CEP 09770-290',
    mapsQuery: 'R. Dom Luís, 380 - Nova Petrópolis, São Bernardo do Campo - SP, 09770-290',
    wazeQuery: 'Rua Dom Luis 380 Sao Bernardo do Campo',
    cardShortAddress: 'R. Dom Luís, 380',
    cardNeighborhood: 'Nova Petrópolis, São Bernardo do Campo',
    rating: '5.0 (3 avaliações no Google)',
    // Mapa oficial do Google (Maps Embed API). Sem chave, o site mostra o cartão estilizado.
    // Chave: Google Cloud Console > ativar "Maps Embed API" > Credenciais > criar chave
    // e restringir por HTTP referrer ao seu domínio. Também aceita a variável GOOGLE_MAPS_API_KEY.
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    mapZoom: 16,
    mapDark: true               // deixa o mapa escuro para combinar com o tema
  },

  // ---- Horários (0 = domingo ... 6 = sábado; open/close em horas, null = fechado)
  hours: [
    { day: 1, name: 'Segunda-feira', open: 8, close: 18 },
    { day: 2, name: 'Terça-feira',   open: 8, close: 18 },
    { day: 3, name: 'Quarta-feira',  open: 8, close: 18 },
    { day: 4, name: 'Quinta-feira',  open: 8, close: 18 },
    { day: 5, name: 'Sexta-feira',   open: 8, close: 18 },
    { day: 6, name: 'Sábado',        open: 8, close: 12 },
    { day: 0, name: 'Domingo',       open: null, close: null }
  ],

  // ---- Seções: ligue/desligue e reordene o menu ------------------------
  // Para esconder uma seção, troque enabled para false.
  sections: {
    pillars:    { enabled: true, navLabel: 'O Estúdio' },
    services:   { enabled: true, navLabel: 'Serviços' },
    gallery:    { enabled: true, navLabel: 'Galeria' },
    comparison: { enabled: true, navLabel: 'Antes & Depois' },
    simulator:  { enabled: true, navLabel: 'Simular Projeto' },
    location:   { enabled: true, navLabel: 'Localização' }
  },
  // Ordem do menu (ids acima).
  navOrder: ['services', 'gallery', 'pillars', 'comparison', 'simulator', 'location'],

  // ---- Textos de botões -------------------------------------------------
  buttons: {
    headerCta: 'AGENDAR NO WHATSAPP',
    drawerCta: 'FALAR NO WHATSAPP',
    serviceLink: 'CONSULTAR PROJETO →',
    mapRoute: 'TRAÇAR ROTA NO MAPS'
  },

  // ---- Hero -------------------------------------------------------------
  hero: {
    image: '/images/hero-studio.jpg',
    imageAlt: 'Estúdio 47 SPEC com iluminação técnica hexagonal e supercarro com acabamento espelhado',
    badgeAccent: 'SÃO BERNARDO DO CAMPO · SP',
    badgeText: 'ESTÉTICA • PROTEÇÃO',
    title: 'DETALHE QUE TRANSFORMA.',
    description: 'Vitrificação Cerâmica de alta durabilidade, blindagem com PPF auto-regenerativo e Polimento Técnico corretivo. O padrão definitivo de detalhamento para quem não aceita marcas na pintura.',
    primaryCta: { label: 'SOLICITAR AVALIAÇÃO TÉCNICA', message: 'Olá! Vim pelo site da 47 SPEC e gostaria de fazer uma avaliação do meu carro.' },
    secondaryCta: { label: 'EXPLORAR SERVIÇOS', href: '#servicos' },
    stats: [
      { value: '5.0 ★', label: 'AVALIAÇÃO NO GOOGLE (100% SATISFAÇÃO)' },
      { value: '9H+',   label: 'DUREZA & REPELÊNCIA HIDROFÓBICA CERÂMICA' },
      { value: '100%',  label: 'AMBIENTE CONTROLADO LIVRE DE CONTAMINAÇÃO' },
      { value: '14+',   label: 'PROCEDIMENTOS DE ALTA PERFORMANCE' }
    ]
  },

  // ---- Diferenciais -----------------------------------------------------
  // icon: 'layers' | 'shield' | 'check' | 'clock' | 'pin' | 'star' | 'bolt' | 'wrench'
  pillars: {
    eyebrow: 'ENGENHARIA DO DETALHE',
    title: 'O PADRÃO 47 SPEC DE EXECUÇÃO',
    subtitle: 'Tratamos cada veículo não como uma lavagem comum, mas como uma obra de arte mecânica que exige precisão geométrica, química refinada e ambiente esterilizado.',
    items: [
      { icon: 'layers', title: 'INSPEÇÃO ÓPTICA CIRÚRGICA', text: 'Cabine equipada com painel de LED hexagonal de alto IRC (Índice de Reprodução de Cor) e microscópio digital de espessura de verniz, revelando micro-riscos, teias de aranha e imperfeições invisíveis à luz do dia.' },
      { icon: 'shield', title: 'BARREIRA NANOTECNOLÓGICA', text: 'Aplicação de vitrificadores cerâmicos e películas PPF em ambiente com ar filtrado e temperatura monitorada, garantindo a ancoragem molecular perfeita da proteção no verniz do automóvel.' },
      { icon: 'check',  title: 'QUÍMICA pH NEUTRO & NÃO CORROSIVA', text: 'Utilizamos produtos nobres biodegradáveis para limpeza técnica de chassi, rodas e motor, sem solupans ou ácidos agressivos que oxidem borrachas, alumínio forjado ou pinças de freio.' }
    ]
  },

  // ---- Serviços e pacotes ----------------------------------------------
  services: {
    eyebrow: 'SERVIÇOS DE ALTA PERFORMANCE',
    title: 'PROCEDIMENTOS ESPECIALIZADOS',
    subtitle: 'Do detalhamento minucioso do motor à aplicação de blindagem invisível de pintura. Selecione os serviços ideais para o seu objetivo.',
    // featured: true destaca o cartão e mostra a tag.
    items: [
      { featured: true, tag: 'PROTEÇÃO SUPREMA', title: 'VITRIFICAÇÃO CERÂMICA (COATING)',
        text: 'Criação de uma camada de vidro flexível de dureza extrema sobre o verniz original. Oferece proteção contra raios solares UV, seiva de árvores, excrementos de pássaros, chuva ácida e confere repelência hidrofóbica incomparável.',
        features: ['Efeito lótus (hidrorrepelência extrema)', 'Proteção contra desbotamento solar e oxidação', 'Brilho vítreo espelhado de longa duração'] },
      { featured: true, tag: 'BLINDAGEM FÍSICA', title: 'APLICAÇÃO DE PPF (PAINT PROTECTION FILM)',
        text: 'Filme transparente de poliuretano termoplástico de nível aeroespacial com tecnologia auto-regenerativa (self-healing). Protege a pintura frontal ou integral contra impactos diretos de pedriscos de estrada, riscos leves e vandalismo.',
        features: ['Auto-regeneração de riscos com calor', 'Defesa contra lascas de pedras em rodovias', 'Instalação cirúrgica com cortes precisos'] },
      { title: 'POLIMENTO TÉCNICO & REPARO DE PINTURA',
        text: "Correção de defeitos do verniz através de etapas controladas de corte, refino e lustro. Eliminação de hologramas, marcas de boina, manchas d'água e micro-riscos circulares provocados por lavagens incorretas.",
        features: ['Medição de espessura de verniz em mícrons', 'Restauração da nitidez e profundidade de cor', 'Acabamento livre de hologramas'] },
      { title: 'PELÍCULAS EM JANELAS (INSULFILM TÉRMICO)',
        text: 'Aplicação de películas de alta performance para controle solar e privacidade. Rejeição expressiva do calor por radiação infravermelha (IR) e 99% de retenção dos raios UV, preservando o interior do carro.',
        features: ['Redução drástica do calor na cabine', 'Proteção contra estilhaços e segurança', 'Tonalidades em conformidade com as normas'] },
      { title: 'LAVAGEM TÉCNICA COMPLETA & RODAS',
        text: 'Processo de dois baldes com grit guards e snow foam de alta densidade. Descontaminação ferrosa profunda das rodas e pinças, detalhamento de caixas de roda e secagem por ar filtrado sem atrito mecânico.',
        features: ['Zero risco de micro-arranhões durante a lavagem', 'Descontaminação de pó de freio e alcatrão', 'Selamento protetor para pneus e rodas'] },
      { title: 'DETALHAMENTO DE MOTOR & CHASSI',
        text: 'Limpeza técnica do cofre do motor com desengraxantes dielétricos e vapor controlado. Proteção de módulos eletrônicos e verniz de motor resistente a altas temperaturas, mantendo o aspecto original de montadora.',
        features: ['Proteção de sensores e chicotes elétricos', 'Verniz térmico acetinado não pegajoso', 'Remoção de crostas de óleo e fuligem'] },
      { title: 'HIGIENIZAÇÃO INTERNA & TRATAMENTO DE COURO',
        text: 'Limpeza de assentos com xampu específico e extratora profissional, descontaminação biológica, hidratação nobre para couros foscos e aromatização exclusiva de longa permanência para uma cabine impecável.',
        features: ['Eliminação de ácaros, fungos e odores', 'Couro com toque acetinado original (sem brilho gorduroso)', 'Aromatização refinada de interiores'] },
      { title: 'POLIMENTO DE FARÓIS & ESCAPAMENTOS',
        text: 'Restauração da clareza dos faróis de policarbonato oxidados ou amarelados com proteção contra novos raios UV. Polimento abrasivo especializado para ponteiras de escapamento em aço inox ou titânio.',
        features: ['Restauração do foco e segurança da iluminação', 'Brilho metálico livre de queima de gases', 'Verniz anti-UV de alta resistência térmica'] }
    ],
    packages: {
      enabled: true,
      eyebrow: 'CONFIGURAÇÕES ASSINADAS',
      title: 'PACOTES EXCLUSIVOS 47 SPEC',
      items: [
        { badge: 'POPULAR', name: 'PACOTE RENOVA',
          summary: 'Ideal para veículos que precisam de uma restauração de presença e valorização de mercado.',
          features: ['Lavagem técnica profunda com descontaminação ferrosa', 'Tratamento completo com barra descontaminante (Clay Bar)', 'Polimento técnico para correção de micro-riscos e brilho', 'Enceramento nobre ou selante polimérico de alta ancoragem', 'Higienização interna completa com hidratação de couros e plásticos', 'Aromatização exclusiva de interiores'],
          cta: 'SOLICITAR PACOTE RENOVA' },
        { badge: 'ALTA PERFORMANCE', highlight: true, name: 'SPEC FOR RACE',
          summary: 'Projetado para automóveis esportivos, carros de pista e quem exige o máximo em proteção mecânica e química.',
          features: ['Aplicação de PPF frontal de impacto (para-choque, capô, faróis e retrovisores)', 'Polimento técnico multipassos com correção máxima de verniz', 'Vitrificação cerâmica total (lataria, pinças de freio e vidros)', 'Detalhamento completo do cofre de motor com verniz térmico', 'Proteção hidrofóbica de rodas para fácil remoção de pó de freio', 'Relatório técnico de espessura de pintura e garantia do serviço'],
          cta: 'SOLICITAR SPEC FOR RACE' }
      ]
    }
  },

  // ---- Galeria (fotos em /public/images; proporção ideal 11:16, retrato) -----
  gallery: {
    eyebrow: 'NO ESTÚDIO',
    title: 'O TRABALHO EM CADA DETALHE',
    subtitle: 'Bastidores de um pacote Turbo Flash: descontaminação da pintura, polimento técnico e lavagem detalhada.',
    items: [
      { src: '/images/studio-1.jpg', alt: 'Gol preto rebaixado sob o letreiro 47 no estúdio', caption: 'Pacote Turbo Flash' },
      { src: '/images/studio-2.jpg', alt: 'Profissional da 47 SPEC trabalhando na lateral do carro', caption: 'Descontaminação da pintura' },
      { src: '/images/studio-3.jpg', alt: 'Polimento técnico do retrovisor com politriz', caption: 'Polimento técnico' },
      { src: '/images/studio-4.jpg', alt: 'Polimento da lateral do carro diante do letreiro 47', caption: 'Polimento técnico' }
    ]
  },

  // ---- Antes & Depois ---------------------------------------------------
  comparison: {
    eyebrow: 'PRECISÃO VISÍVEL',
    title: 'O EFEITO DO POLIMENTO E VITRIFICAÇÃO',
    subtitle: 'Arraste o cursor abaixo para comparar uma superfície automotiva danificada por micro-riscos com o resultado espelhado e hidrofóbico após o tratamento na 47 SPEC.',
    afterImage: '/images/hydrophobic-detail.jpg',
    afterAlt: 'Pintura automotiva tratada com vitrificação cerâmica e repelência hidrofóbica',
    // Se não houver foto "antes", deixe beforeImage = null: o site simula riscos sobre a foto "depois".
    // Com foto real, informe o caminho e o efeito simulado é desligado.
    beforeImage: null,
    beforeAlt: 'Pintura danificada com micro-riscos e opacidade',
    afterTag: 'DEPOIS: VITRIFICAÇÃO & CORREÇÃO 47 SPEC',
    beforeTag: 'ANTES: RISCOS, HOLOGRAMAS E OPACIDADE',
    hint: 'Dica: Arraste a linha central para a esquerda e direita para inspecionar os detalhes'
  },

  // ---- Simulador de orçamento (monta mensagem de WhatsApp) -------------
  simulator: {
    eyebrow: 'CONFIGURADOR INTERATIVO',
    title: 'MONTE SEU PROJETO',
    subtitle: 'Selecione o porte do seu veículo e os procedimentos que você deseja realizar. Criaremos uma mensagem personalizada para envio direto ao nosso time no WhatsApp.',
    trustPoints: ['Atendimento técnico sem compromisso', 'Avaliação física do verniz com paquímetro óptico', 'Garantia documentada de aplicação'],
    vehicleLabel: '1. PORTE DO VEÍCULO',
    proceduresLabel: '2. PROCEDIMENTOS DESEJADOS',
    summaryLabel: 'Resumo do Pedido:',
    sendLabel: 'ENVIAR SOLICITAÇÃO VIA WHATSAPP →',
    vehicles: [
      { name: 'HATCH / COMPACTO',    desc: 'Ex: Golf, Polo, Audi A3, Cooper',          value: 'Hatch / Esportivo Compacto' },
      { name: 'SEDAN / COUPÉ',      desc: 'Ex: BMW Série 3, Civic, C300, Mustang',     value: 'Sedan Médio / Coupé' },
      { name: 'SUV / CROSSOVER',    desc: 'Ex: Compass, X1, Macan, Tiguan',            value: 'SUV / Crossover' },
      { name: 'SUPERCARRO / PICAPE', desc: 'Ex: 911, Hilux, Defender, RAM, Ferrari',   value: 'SUV Grande / Picape / Supercarro' }
    ],
    procedures: [
      { label: 'Vitrificação Cerâmica',  value: 'Vitrificação Cerâmica', checked: true },
      { label: 'Aplicação de PPF',       value: 'Aplicação de PPF' },
      { label: 'Polimento Técnico',      value: 'Polimento Técnico', checked: true },
      { label: 'Insulfilm em Janelas',   value: 'Películas em Janelas (Insulfilm)' },
      { label: 'Higienização & Couros',  value: 'Higienização Interna & Couros' },
      { label: 'Detalhamento de Motor',  value: 'Detalhamento de Motor & Chassi' },
      { label: 'Lavagem Técnica',        value: 'Lavagem Técnica & Rodas' },
      { label: 'Faróis & Escapamentos',  value: 'Polimento de Faróis & Escapes' }
    ],
    // Mensagem enviada. Variáveis: {brand}, {vehicle}, {procedures}
    message: 'Olá, equipe da {brand}! Gostaria de um orçamento para o meu veículo:\n\n• Categoria: {vehicle}\n• Procedimentos de interesse:\n{procedures}\n\nPoderiam me passar a disponibilidade e estimativa técnica? Obrigado!'
  },

  // ---- Rodapé -----------------------------------------------------------
  footer: {
    serviceLinks: ['Vitrificação Cerâmica', 'Aplicação de PPF', 'Polimento Técnico', 'Películas em Janelas', 'Detalhamento de Motor'],
    shortAddress: 'R. Dom Luís, 380 - SBC'
  }
};
