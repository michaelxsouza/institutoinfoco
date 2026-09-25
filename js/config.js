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

window.SITE = {
  instituteContact, formSettings, pricing, courses, courseCategories,
  steps, requirements, requirementsSummary, benefits, faqs, testimonials
};
