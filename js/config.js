/* =====================================================================
   INSTITUTO INFOCO — ARQUIVO DE CONFIGURAÇÃO DO SITE
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que a equipe precisa editar para atualizar
   contatos, cursos, perguntas frequentes e depoimentos.
   Não é necessário mexer no HTML, CSS ou main.js.

   Regras importantes:
   • Não publique informações que não foram confirmadas pela instituição.
   • Campos entre colchetes, como "[NOME DO CURSO]", são placeholders
     e DEVEM ser substituídos antes da publicação.
   • Para ocultar um dado (ex.: duração ou modalidade), deixe o valor
     como "" (texto vazio).
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
  // Texto de atendimento. A instituição não possui endereço físico.
  // Confirme com a instituição antes de publicar.
  serviceNote: "Atendimento realizado online, pelos nossos canais digitais."
};

/* ---------------------------------------------------------------------
   ENVIO DO FORMULÁRIO
   provider:
     "formsubmit" → envia o lead para o e-mail acima via FormSubmit.co
                    (gratuito). Na PRIMEIRA mensagem, o FormSubmit envia
                    um e-mail de ativação para inst.infoco@gmail.com —
                    é preciso clicar em "Activate" uma única vez.
     "custom"     → envia um POST (JSON) para customEndpoint
                    (ex.: sua API, Make, Zapier, n8n, Supabase Function).
     "whatsapp"   → não envia por e-mail; apenas abre o WhatsApp com
                    a mensagem preenchida.
   openWhatsAppAfterSubmit: após enviar, oferece continuar no WhatsApp.
   --------------------------------------------------------------------- */
const formSettings = {
  provider: "formsubmit",
  customEndpoint: "",
  openWhatsAppAfterSubmit: true,
  emailSubject: "Novo lead pelo site — Instituto Infoco"
};

/* ---------------------------------------------------------------------
   CURSOS
   Para adicionar um curso, copie um bloco { ... } e edite os campos.
   • category: usada nos filtros (cursos com a mesma categoria são
     agrupados automaticamente).
   • duration / modality: preencha SOMENTE se confirmados. Deixe ""
     para ocultar.
   • icon: um de → book, laptop, briefcase, chart, heart, cap, tool,
     users, lightbulb, globe
   --------------------------------------------------------------------- */
const courses = [
  {
    name: "[NOME DO CURSO 1]",
    category: "[CATEGORIA 1]",
    description: "[BREVE DESCRIÇÃO DO CURSO]",
    duration: "[DURAÇÃO DO CURSO]",
    modality: "",
    icon: "laptop"
  },
  {
    name: "[NOME DO CURSO 2]",
    category: "[CATEGORIA 1]",
    description: "[BREVE DESCRIÇÃO DO CURSO]",
    duration: "[DURAÇÃO DO CURSO]",
    modality: "",
    icon: "chart"
  },
  {
    name: "[NOME DO CURSO 3]",
    category: "[CATEGORIA 2]",
    description: "[BREVE DESCRIÇÃO DO CURSO]",
    duration: "",
    modality: "",
    icon: "briefcase"
  },
  {
    name: "[NOME DO CURSO 4]",
    category: "[CATEGORIA 2]",
    description: "[BREVE DESCRIÇÃO DO CURSO]",
    duration: "",
    modality: "",
    icon: "users"
  },
  {
    name: "[NOME DO CURSO 5]",
    category: "[CATEGORIA 3]",
    description: "[BREVE DESCRIÇÃO DO CURSO]",
    duration: "",
    modality: "",
    icon: "heart"
  },
  {
    name: "[NOME DO CURSO 6]",
    category: "[CATEGORIA 3]",
    description: "[BREVE DESCRIÇÃO DO CURSO]",
    duration: "",
    modality: "",
    icon: "tool"
  }
];

/* ---------------------------------------------------------------------
   PERGUNTAS FREQUENTES
   Substitua as respostas somente por informações confirmadas.
   --------------------------------------------------------------------- */
const CONFIRM = "Entre em contato com o Instituto Infoco para confirmar essa informação.";

const faqs = [
  {
    q: "Quais cursos estão disponíveis?",
    a: "Os cursos disponíveis estão listados na seção Cursos deste site. " + CONFIRM
  },
  {
    q: "Como posso solicitar informações?",
    a: "Você pode preencher o formulário desta página ou falar diretamente com o Instituto Infoco pelo WhatsApp (31) 9 8915-1531 ou pelo e-mail inst.infoco@gmail.com."
  },
  { q: "Como faço minha inscrição?", a: CONFIRM },
  { q: "Os cursos possuem certificado?", a: CONFIRM },
  { q: "Qual é a duração dos cursos?", a: "A duração varia de acordo com cada curso. " + CONFIRM },
  { q: "Os cursos são online ou presenciais?", a: CONFIRM },
  {
    q: "Como funciona o atendimento?",
    a: "O atendimento é realizado pelos canais digitais do Instituto Infoco: WhatsApp, e-mail e redes sociais."
  },
  { q: "Quais documentos são necessários?", a: CONFIRM },
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
   --------------------------------------------------------------------- */
const testimonials = [
  { text: "Depoimento real de aluno — substituir antes da publicação.", name: "[NOME DO ALUNO]", course: "[CURSO REALIZADO]", placeholder: true },
  { text: "Depoimento real de aluno — substituir antes da publicação.", name: "[NOME DO ALUNO]", course: "[CURSO REALIZADO]", placeholder: true },
  { text: "Depoimento real de aluno — substituir antes da publicação.", name: "[NOME DO ALUNO]", course: "[CURSO REALIZADO]", placeholder: true }
];

window.SITE = { instituteContact, formSettings, courses, faqs, testimonials };
