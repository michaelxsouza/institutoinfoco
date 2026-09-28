/* =====================================================================
   INSTITUTO INFOCO — ARQUIVO DE CONFIGURAÇÃO DO SITE
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que a equipe precisa editar para atualizar
   contatos, cursos, valores, etapas, requisitos, benefícios,
   perguntas frequentes e depoimentos.
   Não é necessário mexer no HTML, CSS ou main.js.
   ===================================================================== */

const instituteContact = {
  name: "Instituto Infoco",
  cnpj: "36.811.992/0001-84",
  whatsapp: "5531989151531",
  whatsappDisplay: "(31) 9 8915-1531",
  email: "inst.infoco@gmail.com",
  instagram: "https://www.instagram.com/institutoinfoco_/",
  instagramHandle: "@institutoinfoco_",
  facebook: "Instituto Infoco",
  // Cole aqui o link oficial da página do Facebook.
  // Enquanto estiver vazio, o nome aparece sem link.
  facebookUrl: "",
  serviceNote: "Atendimento realizado online, pelos nossos canais digitais."
};

/* ---------------------------------------------------------------------
   ENVIO DO FORMULÁRIO
   provider: "formsubmit" (e-mail via FormSubmit.co) | "custom" | "whatsapp"
   Na PRIMEIRA mensagem via FormSubmit, chega um e-mail de ativação em
   inst.infoco@gmail.com — clique em "Activate" uma única vez.
   --------------------------------------------------------------------- */
const formSettings = {
  provider: "formsubmit",
  customEndpoint: "",
  openWhatsAppAfterSubmit: true,
  emailSubject: "Novo lead pelo site — Instituto Infoco"
};

/* ---------------------------------------------------------------------
   VALORES
   Para remover a oferta do site, defina show: false.
   --------------------------------------------------------------------- */
const pricing = {
  show: true,
  program: "Técnico por Competência",
  discountLabel: "40% de desconto",
  oldPrice: "R$ 1.665,90",
  price: "R$ 999,90",
  note: "Valor por curso técnico. Consulte as condições de pagamento pelo WhatsApp."
};

/* ---------------------------------------------------------------------
   CURSOS
   • category: usada nos filtros (agrupamento automático).
   • description / duration / modality: se ficarem vazios em um curso,
     o site usa os valores padrão de courseDefaults.
   • icon: book, laptop, briefcase, chart, heart, cap, tool, users,
     lightbulb, globe, building, shield, leaf, car, gear, map
   --------------------------------------------------------------------- */
const courseDefaults = {
  description: "Certificação técnica por competência para quem já atua na área e comprova experiência profissional.",
  duration: "Diploma em até 48h úteis",
  modality: "Avaliação online"
};

const courseCategories = [
  { name: "Saúde", icon: "heart", courses: [
    "Técnico em Agente Comunitário de Saúde",
    "Técnico em Análises Clínicas",
    "Técnico em Cuidados de Idosos",
    "Técnico em Enfermagem",
    "Técnico em Equipamentos Biomédicos",
    "Técnico em Estética",
    "Técnico em Farmácia",
    "Técnico em Gerência em Saúde",
    "Técnico em Nutrição e Dietética",
    "Técnico em Veterinária"
  ]},
  { name: "Administração e Gestão", icon: "briefcase", courses: [
    "Técnico em Administração",
    "Técnico em Contabilidade",
    "Técnico em Logística",
    "Técnico em Marketing",
    "Técnico em Qualidade",
    "Técnico em Recursos Humanos",
    "Técnico em Secretaria Escolar",
    "Técnico em Segurança do Trabalho",
    "Técnico em Serviços Jurídicos",
    "Técnico em Transações Imobiliárias",
    "Técnico em Vendas",
    "Técnico em Eventos"
  ]},
  { name: "Tecnologia e Informática", icon: "laptop", courses: [
    "Técnico em Biotecnologia",
    "Técnico em Design Gráfico",
    "Técnico em Desenvolvimento de Sistemas",
    "Técnico em Informática para Internet",
    "Técnico em Redes de Computadores",
    "Técnico em Sistemas de Energia Renovável",
    "Técnico em Telecomunicações",
    "Técnico em Tradução e Interpretação de Libras"
  ]},
  { name: "Engenharia e Manutenção", icon: "gear", courses: [
    "Técnico em Automação Industrial",
    "Técnico em Eletromecânica",
    "Técnico em Eletrotécnica",
    "Técnico em Eletrônica",
    "Técnico em Manutenção de Máquinas Industriais",
    "Técnico em Máquinas Pesadas",
    "Técnico em Metalurgia",
    "Técnico em Refrigeração e Climatização",
    "Técnico em Soldagem",
    "Técnico em Manutenção de Máquinas Navais"
  ]},
  { name: "Construção e Infraestrutura", icon: "building", courses: [
    "Técnico em Agrimensura",
    "Técnico em Edificações",
    "Técnico em Mineração",
    "Técnico em Segurança do Trabalho",
    "Técnico em Prevenção e Combate ao Incêndio",
    "Técnico em Defesa Civil",
    "Técnico em Trânsito"
  ]},
  { name: "Meio Ambiente e Agropecuária", icon: "leaf", courses: [
    "Técnico em Agricultura",
    "Técnico em Agropecuária",
    "Técnico em Aquicultura",
    "Técnico em Meio Ambiente"
  ]},
  { name: "Serviços", icon: "map", courses: [
    "Técnico em Gastronomia",
    "Técnico em Design de Interiores",
    "Técnico em Guia de Turismo"
  ]}
];

// Lista final de cursos (gerada a partir das categorias acima).
// Um curso pode aparecer em mais de uma área (ex.: Segurança do Trabalho):
// ele entra uma única vez na lista, com todas as áreas em "categories".
const courses = [];
courseCategories.forEach((cat) => cat.courses.forEach((name) => {
  const found = courses.find((c) => c.name === name);
  if (found) { found.categories.push(cat.name); return; }
  courses.push({
    name,
    category: cat.name,
    categories: [cat.name],
    icon: cat.icon,
    description: courseDefaults.description,
    duration: courseDefaults.duration,
    modality: courseDefaults.modality
  });
}));

/* ---------------------------------------------------------------------
   TÉCNICOS REGULARES (curso completo, para quem ainda não tem
   experiência na área). Não usam o valor do Técnico por Competência.
   • featured: os mais procurados (aparecem em destaque, na ordem).
   • categories: lista completa, por área.
   --------------------------------------------------------------------- */
const regularCourses = {
  show: true,
  duration: "8 a 14 meses",
  featured: [
    { name: "Técnico em Mecânica", icon: "gear" },
    { name: "Técnico em Eletrotécnica", icon: "lightbulb" },
    { name: "Técnico em Segurança do Trabalho", icon: "shield" },
    { name: "Técnico em Administração", icon: "briefcase" },
    { name: "Técnico em Meio Ambiente", icon: "leaf" },
    { name: "Técnico em Informática", icon: "laptop" }
  ],
  categories: [
    { name: "Engenharia e Manutenção", icon: "gear", courses: [
      "Técnico em Mecânica", "Técnico em Eletrotécnica", "Técnico em Segurança do Trabalho",
      "Técnico em Automação Industrial", "Técnico em Eletromecânica", "Técnico em Eletroeletrônica",
      "Técnico em Eletrônica", "Técnico em Mecatrônica", "Técnico em Refrigeração e Climatização",
      "Técnico em Soldagem", "Técnico em Metalurgia", "Técnico em Petróleo e Gás", "Técnico em Qualidade",
      "Técnico em Manutenção de Máquinas Industriais", "Técnico em Manutenção de Máquinas Navais",
      "Técnico em Máquinas Pesadas", "Técnico em Estradas"
    ]},
    { name: "Administração, Gestão e Serviços", icon: "briefcase", courses: [
      "Técnico em Administração", "Técnico em Contabilidade", "Técnico em Finanças", "Técnico em Logística",
      "Técnico em Recursos Humanos", "Técnico em Marketing e Comunicação", "Técnico em Vendas",
      "Técnico em Serviços Jurídicos", "Técnico em Transações Imobiliárias", "Técnico em Seguros",
      "Técnico em Secretaria Escolar", "Técnico em Eventos", "Técnico em Guia de Turismo",
      "Técnico em Gastronomia", "Técnico em Confeitaria", "Técnico em Design de Interiores",
      "Técnico em Geoprocessamento"
    ]},
    { name: "Tecnologia e Informática", icon: "laptop", courses: [
      "Técnico em Informática", "Técnico em Desenvolvimento de Sistemas", "Técnico em Informática para Internet",
      "Técnico em Redes de Computadores", "Técnico em Computação Gráfica", "Técnico em Programação de Jogos Digitais",
      "Técnico em Design Gráfico", "Técnico em Telecomunicações", "Técnico em Sistemas de Energia Renovável",
      "Técnico em Biotecnologia", "Técnico em Tradução e Interpretação de Libras"
    ]},
    { name: "Meio Ambiente e Agropecuária", icon: "leaf", courses: [
      "Técnico em Meio Ambiente", "Técnico em Saneamento", "Técnico em Agricultura", "Técnico em Agropecuária",
      "Técnico em Agroindústria", "Técnico em Aquicultura"
    ]},
    { name: "Construção e Infraestrutura", icon: "building", courses: [
      "Técnico em Edificações", "Técnico em Mineração", "Técnico em Prevenção e Combate ao Incêndio",
      "Técnico em Defesa Civil", "Técnico em Trânsito"
    ]},
    { name: "Saúde", icon: "heart", courses: [
      "Técnico em Gerência em Saúde", "Técnico em Agente Comunitário de Saúde",
      "Técnico em Nutrição e Dietética", "Técnico em Estética e Cosmetologia"
    ]}
  ]
};
regularCourses.total = new Set(regularCourses.categories.flatMap((c) => c.courses)).size;

// Valor dos Técnicos Regulares (use show: false para esconder o preço)
regularCourses.pricing = {
  show: true,
  discountLabel: "40% de desconto",
  oldPrice: "R$ 1.665,90",
  price: "R$ 999,90",
  installments: "ou 12x de R$ 98,90 no cartão",
  note: "Valor por curso técnico regular. Consulte as condições pelo WhatsApp."
};

// Textos das páginas de captura dos Técnicos Regulares (tecnico-regular/<curso>/)
regularCourses.highlights = [
  "Curso técnico completo, de 8 a 14 meses",
  "Não precisa ter experiência na área",
  "Escolas parceiras registradas no SISTEC",
  "Diploma de técnico com validade nacional"
];
regularCourses.steps = [
  { title: "Inscrição", text: "Preencha o formulário ou fale com a nossa equipe pelo WhatsApp." },
  { title: "Orientação", text: "Tiramos suas dúvidas sobre o curso, valores e condições de pagamento." },
  { title: "Matrícula", text: "Envie seus documentos e garanta a sua vaga." },
  { title: "Curso e diploma", text: "Conclua o curso em 8 a 14 meses e receba o seu diploma de técnico." }
];
regularCourses.requirements = [
  { title: "Ensino Médio", text: "Ter concluído ou estar cursando o Ensino Médio. Consulte as condições pelo WhatsApp.", icon: "book" },
  { title: "Documentos pessoais", text: "RG, CPF, comprovante de residência e comprovante de escolaridade.", icon: "file" },
  { title: "Vontade de aprender", text: "Não é preciso ter experiência na área: o curso prepara você desde o início.", icon: "cap" }
];
regularCourses.faqs = [
  { q: "Quanto tempo dura o curso?", a: "Os cursos técnicos regulares têm duração de 8 a 14 meses, conforme o curso escolhido." },
  { q: "Preciso ter experiência na área?", a: "Não. O Técnico Regular é o curso completo, indicado para quem quer começar em uma nova profissão. Se você já tem experiência comprovada, veja também o Técnico por Competência, com diploma em até 48 horas úteis." },
  { q: "O diploma tem validade nacional?", a: "Sim. Os cursos são oferecidos por escolas parceiras registradas no SISTEC (Sistema Nacional de Informações da Educação Profissional e Tecnológica)." },
  { q: "O curso tem estágio?", a: "Depende do curso e da escola. Consulte pelo WhatsApp as regras de estágio e de atividades práticas do curso escolhido." },
  { q: "Qual é o valor?", a: "O Técnico Regular está com 40% de desconto: de R$ 1.665,90 por R$ 999,90, ou 12x de R$ 98,90 no cartão." },
  { q: "Como posso falar com o Instituto Infoco?", a: "Pelo WhatsApp (31) 9 8915-1531, pelo e-mail inst.infoco@gmail.com ou pelo Instagram @institutoinfoco_." }
];

/* ---------------------------------------------------------------------
   COMO FUNCIONA (etapas, na ordem)
   --------------------------------------------------------------------- */
const steps = [
  { title: "Comprovação", text: "Envio da documentação que comprova sua experiência profissional na área.", icon: "file" },
  { title: "Matrícula", text: "Após a aprovação da documentação, a matrícula é realizada.", icon: "check" },
  { title: "Atividades", text: "Prova online com questões de múltipla escolha.", icon: "laptop" },
  { title: "Diploma", text: "Receba seu diploma em até 48 horas úteis e seja um técnico.", icon: "cap" }
];

/* ---------------------------------------------------------------------
   REQUISITOS
   --------------------------------------------------------------------- */
const requirements = [
  {
    title: "Ter o Ensino Médio completo",
    text: "A certificação técnica é destinada a trabalhadores que possuem certificado de conclusão do Ensino Médio.",
    icon: "book"
  },
  {
    title: "Ter experiência profissional na área do curso",
    text: "É necessário demonstrar conhecimentos e competências relacionados ao curso técnico escolhido. Em processos específicos, é exigido o mínimo de 2 anos de experiência comprovada na área.",
    icon: "briefcase"
  },
  {
    title: "Comprovar essa experiência",
    text: "Podem ser solicitados documentos que demonstrem a atuação profissional na área, como CTPS ou CNPJ. Quando não há nenhum registro, deve ser apresentada uma declaração de experiência profissional.",
    detail: "A declaração deve ser emitida por quem tenha legitimidade e conhecimento para comprovar as atividades: proprietário ou responsável da empresa, gerente ou responsável do setor, responsável legal pela empresa ou outro profissional habilitado, quando permitido.",
    icon: "file"
  }
];

const requirementsSummary =
  "Para fazer o Técnico por Competência, é necessário ter o Ensino Médio completo e experiência profissional na área do curso escolhido. Essa experiência precisa ser comprovada e, durante o processo, o candidato passa por uma avaliação online de múltipla escolha. Após a aprovação, tem acesso ao certificado em até 48h úteis.";

/* ---------------------------------------------------------------------
   BENEFÍCIOS
   --------------------------------------------------------------------- */
const benefits = [
  { title: "Diploma em até 48 horas úteis", icon: "clock" },
  { title: "Reconhecido pelo MEC e registrado no SISTEC", icon: "shield" },
  { title: "Para quem tem mais de 2 anos de experiência na área", icon: "briefcase" },
  { title: "Validação de conhecimentos prévios", icon: "check" },
  { title: "Certificação com validade nacional", icon: "globe" },
  { title: "Avaliação online, sem sair de casa", icon: "laptop" },
  { title: "Atendimento personalizado pelo WhatsApp", icon: "whatsapp" },
  { title: "Orientação para escolher o curso", icon: "compass" }
];

/* ---------------------------------------------------------------------
   PERGUNTAS FREQUENTES
   --------------------------------------------------------------------- */
const CONFIRM = "Entre em contato com o Instituto Infoco para confirmar essa informação.";

const faqs = [
  {
    q: "Qual o tempo mínimo para conclusão do curso?",
    a: "Todo o processo, incluindo a entrega do diploma, é concluído em até 48 horas úteis."
  },
  {
    q: "Consigo obter o registro após a conclusão do curso?",
    a: "Sim. Após a conclusão do curso técnico, você poderá solicitar o registro no conselho responsável pela sua área de atuação. O curso atende aos requisitos necessários para esse registro."
  },
  {
    q: "O curso é reconhecido pelo MEC?",
    a: "Sim, é reconhecido pelo MEC (Ministério da Educação), o que garante a validade do seu diploma em todo o território nacional."
  },
  {
    q: "O curso é cadastrado no SISTEC?",
    a: "Sim. O curso técnico é cadastrado no SISTEC (Sistema Nacional de Informações da Educação Profissional e Tecnológica), o que assegura a regularidade e a qualidade da formação oferecida."
  },
  {
    q: "Quem pode fazer o Técnico por Competência?",
    a: "Quem tem o Ensino Médio completo e experiência profissional comprovada na área do curso escolhido. Em processos específicos, é exigido o mínimo de 2 anos de experiência."
  },
  {
    q: "Quais documentos são necessários?",
    a: "Certificado de conclusão do Ensino Médio e documentos que comprovem a experiência na área, como CTPS ou CNPJ. Sem registro formal, é aceita uma declaração de experiência profissional emitida pelo proprietário, gerente ou responsável legal da empresa."
  },
  {
    q: "Os cursos são online ou presenciais?",
    a: "O processo é realizado online: o envio da documentação e a avaliação de múltipla escolha são feitos pela internet."
  },
  {
    q: "Quais cursos estão disponíveis?",
    a: `No Técnico por Competência são ${courses.length} cursos em ${courseCategories.length} áreas: ${courseCategories.map((c) => c.name).join(", ")}. Também oferecemos ${regularCourses.total} Técnicos Regulares, para quem ainda não tem experiência na área. Veja as listas completas na seção Cursos.`
  },
  {
    q: "Qual a diferença entre o Técnico por Competência e o Técnico Regular?",
    a: `O Técnico por Competência é para quem já tem experiência comprovada na área: a experiência é validada por uma avaliação online e o diploma sai em até 48 horas úteis. O Técnico Regular é o curso completo, com duração de ${regularCourses.duration}, indicado para quem quer entrar em uma nova área. Os mais procurados são Mecânica, Eletrotécnica, Segurança do Trabalho, Administração, Meio Ambiente e Informática. O Técnico Regular está com 40% de desconto: de R$ 1.665,90 por R$ 999,90, ou 12x de R$ 98,90 no cartão.`
  },
  {
    q: "Qual é o valor?",
    a: "O Técnico por Competência está com 40% de desconto: de R$ 1.665,90 por R$ 999,90."
  },
  { q: "Quais são as formas de pagamento?", a: CONFIRM },
  {
    q: "Como posso falar com o Instituto Infoco?",
    a: "Pelo WhatsApp (31) 9 8915-1531, pelo e-mail inst.infoco@gmail.com ou pelo Instagram @institutoinfoco_."
  }
];

/* ---------------------------------------------------------------------
   DEPOIMENTOS
   Use apenas depoimentos REAIS, com autorização do aluno.
   Enquanto placeholder: true, o card aparece marcado como provisório.
   Para esconder a seção inteira, deixe a lista vazia: [].
   --------------------------------------------------------------------- */
const testimonials = [
  { text: "Depoimento real de aluno — substituir antes da publicação.", name: "[NOME DO ALUNO]", course: "[CURSO REALIZADO]", placeholder: true },
  { text: "Depoimento real de aluno — substituir antes da publicação.", name: "[NOME DO ALUNO]", course: "[CURSO REALIZADO]", placeholder: true },
  { text: "Depoimento real de aluno — substituir antes da publicação.", name: "[NOME DO ALUNO]", course: "[CURSO REALIZADO]", placeholder: true }
];

/* ---------------------------------------------------------------------
   PÁGINAS DE CAPTURA (LPs) POR CURSO — usadas no Google Ads
   Depois de editar qualquer coisa neste arquivo, gere as páginas de novo:
       node scripts/gerar-lps.js
   Cada curso ganha a página  cursos/<nome-do-curso>/
   --------------------------------------------------------------------- */
const lpSettings = {
  // Endereço final do site (sem barra no final). Usado nas tags de
  // compartilhamento e no sitemap. Ex.: "https://www.institutoinfoco.com.br"
  siteUrl: "",
  tracking: {
    // Google Ads → Metas → Conversões. Ex.: "AW-123456789"
    googleAdsId: "",
    // Rótulo da conversão "Envio de formulário". Ex.: "AbCdEfGhIjk"
    leadConversionLabel: "",
    // (Opcional) rótulo de uma conversão para cliques no WhatsApp
    whatsappConversionLabel: "",
    // (Opcional) Google Analytics 4. Ex.: "G-XXXXXXX"
    ga4Id: ""
  }
};

/* Texto de cada curso nas LPs: o que o profissional faz e onde atua. */
const courseDetails = {
  /* Cursos que existem só no Técnico Regular */
  "Técnico em Mecânica": { about: "O Técnico em Mecânica atua em projetos, fabricação, montagem e manutenção de máquinas, equipamentos e componentes mecânicos.", workplaces: ["Indústrias", "Mineração e siderurgia", "Oficinas e empresas de manutenção", "Setor automotivo"] },
  "Técnico em Eletroeletrônica": { about: "O Técnico em Eletroeletrônica atua na instalação e manutenção de sistemas elétricos e eletrônicos, comandos, automação e equipamentos industriais.", workplaces: ["Indústrias", "Concessionárias de energia", "Assistências técnicas", "Empresas de automação"] },
  "Técnico em Mecatrônica": { about: "O Técnico em Mecatrônica integra mecânica, eletrônica e programação na montagem, operação e manutenção de sistemas automatizados e robóticos.", workplaces: ["Indústrias automatizadas", "Setor automotivo", "Integradoras de automação", "Empresas de manutenção"] },
  "Técnico em Petróleo e Gás": { about: "O Técnico em Petróleo e Gás atua em operações de exploração, produção, transporte e refino de petróleo e gás natural, com foco em segurança.", workplaces: ["Plataformas e refinarias", "Empresas de óleo e gás", "Distribuidoras de combustíveis", "Prestadoras de serviço do setor"] },
  "Técnico em Estradas": { about: "O Técnico em Estradas atua em projetos, construção, conservação e fiscalização de rodovias, ferrovias e obras de pavimentação.", workplaces: ["Construtoras de infraestrutura", "Órgãos rodoviários", "Concessionárias de rodovias", "Escritórios de engenharia"] },
  "Técnico em Finanças": { about: "O Técnico em Finanças atua no controle financeiro, fluxo de caixa, crédito, cobrança, investimentos e análise de custos.", workplaces: ["Bancos e cooperativas de crédito", "Departamentos financeiros", "Corretoras e financeiras", "Escritórios de contabilidade"] },
  "Técnico em Marketing e Comunicação": { about: "O Técnico em Marketing e Comunicação atua em campanhas, redes sociais, produção de conteúdo e ações de comunicação de marcas.", workplaces: ["Agências de publicidade e marketing", "Departamentos de comunicação", "Comércio e varejo", "Trabalho remoto e freelancer"] },
  "Técnico em Seguros": { about: "O Técnico em Seguros atua na venda, emissão, análise e acompanhamento de apólices e sinistros de seguros.", workplaces: ["Seguradoras", "Corretoras de seguros", "Bancos", "Atuação autônoma"] },
  "Técnico em Confeitaria": { about: "O Técnico em Confeitaria produz bolos, doces, sobremesas e massas, com técnicas de confeitaria, apresentação e segurança alimentar.", workplaces: ["Confeitarias e padarias", "Restaurantes e hotéis", "Buffets", "Negócio próprio"] },
  "Técnico em Geoprocessamento": { about: "O Técnico em Geoprocessamento trabalha com mapas, imagens de satélite, GPS e sistemas de informação geográfica para análise do território.", workplaces: ["Órgãos públicos e prefeituras", "Mineradoras", "Empresas de agronegócio", "Consultorias ambientais"] },
  "Técnico em Informática": { about: "O Técnico em Informática atua na montagem, manutenção e suporte de computadores, redes, sistemas e atendimento ao usuário.", workplaces: ["Departamentos de TI", "Empresas de tecnologia", "Assistências técnicas", "Suporte e help desk"] },
  "Técnico em Computação Gráfica": { about: "O Técnico em Computação Gráfica cria imagens, modelagens 3D, animações e efeitos visuais para mídias digitais.", workplaces: ["Estúdios de animação e games", "Agências de publicidade", "Escritórios de arquitetura", "Trabalho remoto e freelancer"] },
  "Técnico em Programação de Jogos Digitais": { about: "O Técnico em Programação de Jogos Digitais desenvolve jogos para computador, celular e consoles, da programação à lógica de jogo.", workplaces: ["Estúdios de games", "Empresas de tecnologia", "Startups", "Trabalho remoto e freelancer"] },
  "Técnico em Saneamento": { about: "O Técnico em Saneamento atua em sistemas de abastecimento de água, esgoto, drenagem e gestão de resíduos sólidos.", workplaces: ["Empresas de saneamento", "Prefeituras e órgãos públicos", "Indústrias", "Consultorias ambientais"] },
  "Técnico em Agroindústria": { about: "O Técnico em Agroindústria atua no processamento e na conservação de produtos de origem animal e vegetal, com controle de qualidade.", workplaces: ["Agroindústrias", "Laticínios e frigoríficos", "Cooperativas", "Indústria de alimentos"] },
  "Técnico em Estética e Cosmetologia": { about: "O Técnico em Estética e Cosmetologia realiza procedimentos estéticos faciais e corporais e orienta o uso de cosméticos.", workplaces: ["Clínicas de estética", "Spas e salões de beleza", "Indústria de cosméticos", "Atendimento próprio"] },
  "Técnico em Agente Comunitário de Saúde": { about: "O Técnico em Agente Comunitário de Saúde atua na promoção da saúde e na prevenção de doenças junto às famílias, fazendo a ligação entre a comunidade e a unidade de saúde.", workplaces: ["Unidades Básicas de Saúde", "Estratégia Saúde da Família", "Secretarias municipais de saúde", "Projetos sociais e comunitários"] },
  "Técnico em Análises Clínicas": { about: "O Técnico em Análises Clínicas atua na coleta, no preparo e na análise de amostras biológicas, apoiando o diagnóstico em laboratório.", workplaces: ["Laboratórios de análises clínicas", "Hospitais", "Clínicas", "Bancos de sangue"] },
  "Técnico em Cuidados de Idosos": { about: "O Técnico em Cuidados de Idosos presta cuidados diários à pessoa idosa, com atenção à higiene, alimentação, mobilidade, bem-estar e autonomia.", workplaces: ["Instituições de longa permanência", "Atendimento domiciliar", "Centros-dia", "Clínicas e casas de repouso"] },
  "Técnico em Enfermagem": { about: "O Técnico em Enfermagem presta assistência de enfermagem aos pacientes, como curativos, administração de medicamentos e acompanhamento, sob supervisão do enfermeiro.", workplaces: ["Hospitais", "Clínicas", "Unidades de saúde", "Atendimento domiciliar"] },
  "Técnico em Equipamentos Biomédicos": { about: "O Técnico em Equipamentos Biomédicos atua na instalação, manutenção e calibração de equipamentos médico-hospitalares.", workplaces: ["Hospitais", "Clínicas e laboratórios", "Empresas de engenharia clínica", "Fabricantes e distribuidores de equipamentos"] },
  "Técnico em Veterinária": { about: "O Técnico em Veterinária auxilia o médico-veterinário no atendimento, manejo, exames e cuidados com animais de pequeno e grande porte.", workplaces: ["Clínicas e hospitais veterinários", "Pet shops", "Propriedades rurais", "Indústria agropecuária"] },
  "Técnico em Marketing": { about: "O Técnico em Marketing atua em pesquisas de mercado, campanhas, redes sociais e ações de divulgação de produtos e serviços.", workplaces: ["Agências de publicidade e marketing", "Departamentos de marketing", "Comércio e varejo", "Trabalho remoto e freelancer"] },
  "Técnico em Qualidade": { about: "O Técnico em Qualidade atua no controle e na melhoria de processos, produtos e serviços, com inspeções, indicadores e normas de qualidade.", workplaces: ["Indústrias", "Empresas de serviços", "Laboratórios", "Consultorias"] },
  "Técnico em Recursos Humanos": { about: "O Técnico em Recursos Humanos atua em recrutamento, seleção, treinamento, rotinas de departamento pessoal e benefícios.", workplaces: ["Departamentos de RH", "Agências de emprego e recrutamento", "Escritórios de contabilidade", "Órgãos públicos"] },
  "Técnico em Segurança do Trabalho": { about: "O Técnico em Segurança do Trabalho atua na prevenção de acidentes e doenças ocupacionais, com inspeções, treinamentos, EPIs e cumprimento das normas regulamentadoras.", workplaces: ["Indústrias", "Construtoras", "Mineração e siderurgia", "Consultorias de segurança"] },
  "Técnico em Serviços Jurídicos": { about: "O Técnico em Serviços Jurídicos apoia rotinas jurídicas, como organização de processos, prazos, documentos e atendimento a clientes.", workplaces: ["Escritórios de advocacia", "Departamentos jurídicos", "Cartórios", "Órgãos públicos"] },
  "Técnico em Vendas": { about: "O Técnico em Vendas atua no atendimento, na negociação e na prospecção de clientes, com foco em resultados comerciais.", workplaces: ["Comércio e varejo", "Indústrias e distribuidoras", "Representação comercial", "Atuação autônoma"] },
  "Técnico em Eventos": { about: "O Técnico em Eventos planeja, organiza e executa eventos sociais, corporativos e culturais, do orçamento à produção.", workplaces: ["Empresas de eventos", "Hotéis e centros de convenções", "Buffets e cerimoniais", "Atuação autônoma"] },
  "Técnico em Biotecnologia": { about: "O Técnico em Biotecnologia atua em laboratórios com processos biológicos, análises e produção nas áreas de saúde, alimentos, agropecuária e meio ambiente.", workplaces: ["Laboratórios de pesquisa", "Indústrias farmacêuticas e de alimentos", "Empresas agropecuárias", "Centros de pesquisa"] },
  "Técnico em Design Gráfico": { about: "O Técnico em Design Gráfico cria peças visuais para meios impressos e digitais, como identidades visuais, materiais publicitários e layouts.", workplaces: ["Agências de publicidade", "Gráficas", "Departamentos de marketing", "Trabalho remoto e freelancer"] },
  "Técnico em Redes de Computadores": { about: "O Técnico em Redes de Computadores instala, configura e mantém redes, servidores e a infraestrutura de comunicação de dados.", workplaces: ["Provedores de internet", "Departamentos de TI", "Empresas de tecnologia", "Suporte técnico"] },
  "Técnico em Sistemas de Energia Renovável": { about: "O Técnico em Sistemas de Energia Renovável atua na instalação e manutenção de sistemas de energia solar, eólica e outras fontes limpas.", workplaces: ["Empresas de energia solar", "Concessionárias de energia", "Indústrias", "Atuação autônoma"] },
  "Técnico em Telecomunicações": { about: "O Técnico em Telecomunicações atua na instalação e manutenção de sistemas de telefonia, internet, fibra óptica e transmissão de dados.", workplaces: ["Operadoras de telecomunicações", "Provedores de internet", "Empresas de instalação", "Indústrias"] },
  "Técnico em Eletrônica": { about: "O Técnico em Eletrônica atua na montagem, manutenção e testes de circuitos, placas e equipamentos eletrônicos.", workplaces: ["Indústrias", "Assistências técnicas", "Empresas de automação", "Telecomunicações"] },
  "Técnico em Manutenção de Máquinas Industriais": { about: "O Técnico em Manutenção de Máquinas Industriais atua na manutenção preventiva e corretiva de máquinas e equipamentos da indústria.", workplaces: ["Indústrias", "Mineração e siderurgia", "Empresas de manutenção", "Usinas"] },
  "Técnico em Máquinas Pesadas": { about: "O Técnico em Máquinas Pesadas atua na operação, inspeção e manutenção de máquinas como escavadeiras, tratores e caminhões fora de estrada.", workplaces: ["Mineradoras", "Construtoras e obras de infraestrutura", "Locadoras de equipamentos", "Agronegócio"] },
  "Técnico em Metalurgia": { about: "O Técnico em Metalurgia atua nos processos de produção e transformação de metais, controle de qualidade e ensaios de materiais.", workplaces: ["Siderúrgicas", "Fundições", "Indústrias metalúrgicas", "Laboratórios de ensaios"] },
  "Técnico em Agrimensura": { about: "O Técnico em Agrimensura realiza levantamentos topográficos, medições e demarcações de terrenos e áreas rurais e urbanas.", workplaces: ["Escritórios de topografia", "Construtoras", "Mineradoras", "Órgãos públicos e cartórios"] },
  "Técnico em Prevenção e Combate ao Incêndio": { about: "O Técnico em Prevenção e Combate ao Incêndio atua na prevenção de incêndios, em planos de emergência, brigadas e inspeção de sistemas de combate.", workplaces: ["Indústrias", "Brigadas de incêndio", "Empresas de segurança", "Shoppings, hospitais e condomínios"] },
  "Técnico em Agricultura": { about: "O Técnico em Agricultura atua no planejamento e manejo de lavouras, no preparo do solo, no plantio, na colheita e no controle de pragas.", workplaces: ["Propriedades rurais", "Cooperativas agrícolas", "Revendas de insumos", "Empresas de assistência técnica"] },
  "Técnico em Agropecuária": { about: "O Técnico em Agropecuária atua na produção agrícola e na criação de animais, com planejamento, manejo e assistência ao produtor.", workplaces: ["Fazendas e propriedades rurais", "Cooperativas", "Agroindústrias", "Órgãos de extensão rural"] },
  "Técnico em Aquicultura": { about: "O Técnico em Aquicultura atua na criação de peixes, camarões e outros organismos aquáticos, do manejo à qualidade da água.", workplaces: ["Pisciculturas", "Fazendas aquícolas", "Cooperativas", "Órgãos ambientais e de pesca"] },
  "Técnico em Meio Ambiente": { about: "O Técnico em Meio Ambiente atua no controle e monitoramento ambiental, gestão de resíduos, licenciamento e educação ambiental.", workplaces: ["Indústrias e mineradoras", "Consultorias ambientais", "Órgãos ambientais", "Empresas de saneamento"] },
  "Técnico em Gastronomia": { about: "O Técnico em Gastronomia atua no preparo de alimentos, na criação de cardápios e na gestão de cozinhas, com técnicas e segurança alimentar.", workplaces: ["Restaurantes", "Hotéis e buffets", "Cozinhas industriais", "Negócio próprio"] },
  "Técnico em Administração": { about: "O Técnico em Administração atua no apoio à gestão de empresas, em rotinas de finanças, pessoal, compras, vendas e processos administrativos.", workplaces: ["Empresas privadas", "Órgãos públicos", "Escritórios e consultorias", "Comércio e indústria"] },
  "Técnico em Contabilidade": { about: "O Técnico em Contabilidade atua em rotinas contábeis, fiscais e de departamento pessoal, como escrituração, apuração de impostos e folha de pagamento.", workplaces: ["Escritórios de contabilidade", "Departamentos financeiros e fiscais", "Empresas de todos os portes", "Órgãos públicos"] },
  "Técnico em Logística": { about: "O Técnico em Logística atua no planejamento e controle de estoques, armazenagem, compras, distribuição e transporte de materiais.", workplaces: ["Centros de distribuição", "Indústrias", "Transportadoras", "Comércio e varejo"] },
  "Técnico em Secretaria Escolar": { about: "O Técnico em Secretaria Escolar organiza a documentação e a vida escolar dos alunos, como matrículas, históricos, registros e rotinas da secretaria.", workplaces: ["Escolas públicas e privadas", "Instituições de ensino técnico e superior", "Secretarias de educação"] },
  "Técnico em Transações Imobiliárias": { about: "O Técnico em Transações Imobiliárias atua na intermediação de compra, venda e locação de imóveis, na avaliação de mercado e no atendimento a clientes.", workplaces: ["Imobiliárias", "Construtoras e incorporadoras", "Administradoras de imóveis", "Atuação autônoma"] },
  "Técnico em Desenvolvimento de Sistemas": { about: "O Técnico em Desenvolvimento de Sistemas atua no desenvolvimento, teste e manutenção de sistemas e aplicativos, com programação e banco de dados.", workplaces: ["Empresas de tecnologia", "Departamentos de TI", "Startups", "Trabalho remoto e freelancer"] },
  "Técnico em Informática para Internet": { about: "O Técnico em Informática para Internet desenvolve sites, sistemas web e aplicações para a internet, do layout à programação.", workplaces: ["Agências digitais", "Empresas de tecnologia", "Departamentos de TI", "Trabalho remoto e freelancer"] },
  "Técnico em Automação Industrial": { about: "O Técnico em Automação Industrial atua na instalação, programação e manutenção de sistemas automatizados, como CLPs, sensores e acionamentos.", workplaces: ["Indústrias", "Mineração e siderurgia", "Integradoras de automação", "Empresas de manutenção"] },
  "Técnico em Eletromecânica": { about: "O Técnico em Eletromecânica atua na montagem, instalação e manutenção de máquinas e equipamentos eletromecânicos.", workplaces: ["Indústrias", "Mineração e siderurgia", "Empresas de manutenção", "Concessionárias de energia"] },
  "Técnico em Eletrotécnica": { about: "O Técnico em Eletrotécnica atua em projetos, instalação e manutenção de sistemas elétricos prediais e industriais.", workplaces: ["Indústrias", "Concessionárias de energia", "Construtoras", "Empresas de manutenção elétrica"] },
  "Técnico em Manutenção de Máquinas Navais": { about: "O Técnico em Manutenção de Máquinas Navais atua na manutenção de motores, máquinas e sistemas de embarcações.", workplaces: ["Estaleiros", "Portos", "Empresas de navegação", "Setor de óleo e gás"] },
  "Técnico em Refrigeração e Climatização": { about: "O Técnico em Refrigeração e Climatização atua na instalação e manutenção de sistemas de refrigeração, ar-condicionado e climatização.", workplaces: ["Empresas de climatização", "Indústrias", "Comércio e serviços", "Atuação autônoma"] },
  "Técnico em Soldagem": { about: "O Técnico em Soldagem atua na execução e inspeção de processos de soldagem em estruturas, peças e equipamentos.", workplaces: ["Indústrias metalúrgicas", "Construção e montagem industrial", "Estaleiros", "Mineração e siderurgia"] },
  "Técnico em Edificações": { about: "O Técnico em Edificações atua no acompanhamento de obras, em desenhos técnicos, orçamentos e controle de qualidade na construção civil.", workplaces: ["Construtoras", "Escritórios de engenharia e arquitetura", "Órgãos públicos", "Obras e reformas"] },
  "Técnico em Design de Interiores": { about: "O Técnico em Design de Interiores planeja ambientes internos, com projetos de layout, mobiliário, cores e iluminação.", workplaces: ["Escritórios de design e arquitetura", "Lojas de móveis planejados", "Construtoras", "Atuação autônoma"] },
  "Técnico em Tradução e Interpretação de Libras": { about: "O Técnico em Tradução e Interpretação de Libras atua na tradução e interpretação entre a Língua Brasileira de Sinais e a língua portuguesa, promovendo acessibilidade.", workplaces: ["Escolas e universidades", "Órgãos públicos", "Eventos e comunicação", "Serviços de saúde"] },
  "Técnico em Estética": { about: "O Técnico em Estética realiza procedimentos estéticos faciais e corporais, com foco em cuidado, bem-estar e autoestima.", workplaces: ["Clínicas de estética", "Spas e salões de beleza", "Clínicas dermatológicas", "Atendimento próprio"] },
  "Técnico em Farmácia": { about: "O Técnico em Farmácia atua no atendimento, na dispensação de medicamentos, no controle de estoque e nas rotinas de farmácias e drogarias, sob supervisão do farmacêutico.", workplaces: ["Farmácias e drogarias", "Hospitais", "Farmácias de manipulação", "Distribuidoras de medicamentos"] },
  "Técnico em Gerência em Saúde": { about: "O Técnico em Gerência em Saúde atua na gestão administrativa de serviços de saúde, como fluxos de atendimento, faturamento e organização de setores.", workplaces: ["Hospitais e clínicas", "Laboratórios", "Operadoras de planos de saúde", "Unidades públicas de saúde"] },
  "Técnico em Nutrição e Dietética": { about: "O Técnico em Nutrição e Dietética atua na produção de refeições, no controle de qualidade dos alimentos e no apoio ao nutricionista.", workplaces: ["Restaurantes e cozinhas industriais", "Hospitais", "Escolas", "Indústria de alimentos"] },
    "Técnico em Mineração": { about: "O Técnico em Mineração atua em operações de lavra, beneficiamento de minérios, controle de produção e segurança nas minas.", workplaces: ["Mineradoras", "Siderurgia", "Empresas de sondagem e geologia", "Consultorias ambientais"] },
  "Técnico em Guia de Turismo": { about: "O Técnico em Guia de Turismo conduz e acompanha grupos e visitantes, apresentando roteiros e atrativos turísticos.", workplaces: ["Agências de turismo", "Receptivos e hotéis", "Atrativos turísticos", "Atuação autônoma"] },
  "Técnico em Defesa Civil": { about: "O Técnico em Defesa Civil atua na prevenção, preparação e resposta a desastres, apoiando ações de proteção da população.", workplaces: ["Órgãos de defesa civil", "Empresas e indústrias", "Brigadas e equipes de emergência", "Consultorias de segurança"] },
  "Técnico em Trânsito": { about: "O Técnico em Trânsito atua em ações de educação, planejamento e operação do trânsito e da mobilidade urbana.", workplaces: ["Órgãos de trânsito", "Prefeituras", "Empresas de transporte", "Centros de formação de condutores"] }
};

// Endereço (slug) da LP de cada curso. Ex.: "Técnico em Óptica" → "tecnico-em-optica"
const slugify = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
courses.forEach((c) => { c.slug = slugify(c.name); });

window.SITE = {
  instituteContact, formSettings, pricing, courses, courseCategories,
  steps, requirements, requirementsSummary, benefits, faqs, testimonials,
  lpSettings, courseDetails, slugify, regularCourses
};
