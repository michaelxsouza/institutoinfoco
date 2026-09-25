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
  { name: "Gestão e Negócios", icon: "briefcase", courses: [
    "Técnico em Administração",
    "Técnico em Contabilidade",
    "Técnico em Logística",
    "Técnico em Secretaria Escolar",
    "Técnico em Transações Imobiliárias"
  ]},
  { name: "Informação e Comunicação", icon: "laptop", courses: [
    "Técnico em Desenvolvimento de Sistemas",
    "Técnico em Informática para Internet"
  ]},
  { name: "Controle e Processos Industriais", icon: "gear", courses: [
    "Técnico em Automação Industrial",
    "Técnico em Eletromecânica",
    "Técnico em Eletrotécnica",
    "Técnico em Manutenção de Máquinas Navais",
    "Técnico em Refrigeração e Climatização",
    "Técnico em Soldagem"
  ]},
  { name: "Infraestrutura", icon: "building", courses: [
    "Técnico em Edificações",
    "Técnico em Design de Interiores"
  ]},
  { name: "Desenvolvimento Educacional e Social", icon: "users", courses: [
    "Técnico em Tradução e Interpretação de Libras"
  ]},
  { name: "Ambiente e Saúde", icon: "heart", courses: [
    "Técnico em Estética",
    "Técnico em Farmácia",
    "Técnico em Gerência em Saúde",
    "Técnico em Nutrição e Dietética",
    "Técnico em Óptica"
  ]},
  { name: "Recursos Naturais", icon: "leaf", courses: [
    "Técnico em Mineração"
  ]},
  { name: "Turismo, Hospitalidade e Lazer", icon: "map", courses: [
    "Técnico em Guia de Turismo"
  ]},
  { name: "Segurança", icon: "shield", courses: [
    "Técnico em Defesa Civil"
  ]},
  { name: "Transporte", icon: "car", courses: [
    "Técnico em Trânsito"
  ]}
];

// Lista final de cursos (gerada a partir das categorias acima).
const courses = courseCategories.flatMap((cat) =>
  cat.courses.map((name) => ({
    name,
    category: cat.name,
    icon: cat.icon,
    description: courseDefaults.description,
    duration: courseDefaults.duration,
    modality: courseDefaults.modality
  }))
);

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
    a: "São 25 cursos técnicos em 10 áreas, como Gestão e Negócios, Informação e Comunicação, Processos Industriais, Infraestrutura, Saúde, Segurança e Transporte. Veja a lista completa na seção Cursos."
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
  "Técnico em Óptica": { about: "O Técnico em Óptica atua na montagem e ajuste de óculos, na interpretação de receitas e no atendimento em óticas.", workplaces: ["Óticas", "Laboratórios ópticos", "Clínicas oftalmológicas", "Atendimento próprio"] },
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
  lpSettings, courseDetails, slugify
};
