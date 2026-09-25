#!/usr/bin/env node
/* =====================================================================
   GERADOR DAS PÁGINAS DE CAPTURA (LPs) — Instituto Infoco
   ---------------------------------------------------------------------
   Lê js/config.js e cria uma página por curso em cursos/<slug>/,
   além da página de agradecimento (obrigado/) e do sitemap.xml.

   Uso (na pasta do projeto):
       node scripts/gerar-lps.js
   Rode de novo sempre que mudar cursos, valores, FAQ ou rastreamento.
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/config.js"), "utf8"), sandbox);
const S = sandbox.window.SITE;
const C = S.instituteContact;
const LPS = S.lpSettings || { siteUrl: "", tracking: {} };
const T = LPS.tracking || {};
const P = S.pricing;

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
/* Imagem de cada curso: assets/img/cursos/<slug>.webp (topo e seções) e <slug>-card.webp (cards) */
const hasImage = (slug) => fs.existsSync(path.join(ROOT, `assets/img/cursos/${slug}.webp`));
const shortName = (name) => name.replace(/^Técnico em /, "");

/* ---------- Ícones ---------- */
const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  laptop: svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>'),
  shield: svg('<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
  globe: svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>'),
  file: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13h6M9 17h4"/>'),
  cap: svg('<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 10v6"/>'),
  book: svg('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),
  briefcase: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
  pin: svg('<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>'),
  arrow: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
  lock: svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41"/></svg>'
};
const ic = (n) => `<span class="i">${I[n] || I.check}</span>`;

/* ---------- Tags de rastreamento (Google Ads / GA4) ---------- */
function gtagHead() {
  const ids = [T.googleAdsId, T.ga4Id].filter(Boolean);
  if (!ids.length) return "  <!-- Rastreamento: preencha lpSettings.tracking em js/config.js e gere as páginas de novo -->";
  return `  <script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ids[0])}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
${ids.map((id) => `    gtag("config", "${esc(id)}");`).join("\n")}
  </script>`;
}

function head({ title, description, rel, canonical, noindex, image }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  ${noindex ? '<meta name="robots" content="noindex" />' : ""}
  <meta name="theme-color" content="#0756C9" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  ${image ? `<meta property="og:image" content="${esc(image)}" />` : ""}
  ${canonical ? `<link rel="canonical" href="${esc(canonical)}" />\n  <meta property="og:url" content="${esc(canonical)}" />` : ""}
  <link rel="icon" type="image/png" href="${rel}assets/img/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${rel}css/styles.css" />
  <link rel="stylesheet" href="${rel}css/lp.css" />
${gtagHead()}
</head>`;
}

function header(rel, waMsg) {
  return `  <header class="lp-header">
    <div class="container lp-header__inner">
      <a href="${rel}" class="brand" aria-label="Instituto Infoco — página inicial">
        <img src="${rel}assets/img/logo-infoco-96.png" alt="" width="40" height="40" class="brand__logo" />
        <span class="brand__text"><small>Instituto</small>Infoco</span>
      </a>
      <a href="#" class="btn btn--whatsapp js-wa" data-wa-msg="${esc(waMsg)}">${ic("whatsapp")} <span class="lp-hide-sm">Falar pelo</span> WhatsApp</a>
    </div>
  </header>`;
}

function footer(rel) {
  return `  <footer class="lp-footer">
    <div class="container">
      <p><strong>${esc(C.name)}</strong> · CNPJ ${esc(C.cnpj)}</p>
      <p>${esc(C.serviceNote)} WhatsApp ${esc(C.whatsappDisplay)} · ${esc(C.email)}</p>
      <p><a href="${rel}">Site do Instituto</a> · <a href="${rel}politica-de-privacidade/">Política de Privacidade</a></p>
    </div>
  </footer>`;
}

/* ---------- LP de um curso ---------- */
function lpPage(course) {
  const rel = "../../";
  const det = S.courseDetails[course.name] || { about: "", workplaces: [] };
  const sn = shortName(course.name);
  const waMsg = `Olá! Tenho interesse no ${course.name} por Competência.`;
  const url = LPS.siteUrl ? `${LPS.siteUrl}/cursos/${course.slug}/` : "";
  const title = `${course.name} por Competência | Diploma reconhecido pelo MEC`;
  const description = `Tenha seu diploma de ${course.name} usando sua experiência profissional. Reconhecido pelo MEC, registrado no SISTEC, avaliação online e diploma em até 48h úteis.`;
  const others = S.courses.filter((c) => c.category === course.category && c.name !== course.name);
  const lpData = {
    course: course.name,
    whatsapp: C.whatsapp,
    email: C.email,
    waMessage: waMsg,
    formSettings: S.formSettings,
    tracking: T,
    thankYouUrl: `${rel}obrigado/?curso=${course.slug}`
  };
  const faqs = S.faqs.filter((f) => !/Quais cursos estão disponíveis/.test(f.q));
  const img = hasImage(course.slug) ? `assets/img/cursos/${course.slug}.webp` : "";
  const ogImage = img && LPS.siteUrl ? `${LPS.siteUrl}/${img}` : "";

  return `${head({ title, description, rel, canonical: url, image: ogImage })}
<body class="lp">
${header(rel, waMsg)}

  <main>
    <!-- ============ TOPO + FORMULÁRIO ============ -->
    <section class="lp-hero${img ? " lp-hero--img" : ""}"${img ? ` style="--hero-img: url('${rel}${img}')"` : ""}>
      <div class="container lp-hero__grid">
        <div class="lp-hero__content">
          <span class="lp-kicker">${esc(course.category)} · Técnico por Competência</span>
          <h1>${esc(course.name)} <span>com diploma em até 48h úteis</span></h1>
          <p class="lp-hero__sub">Já trabalha com ${esc(sn.toLowerCase().replace("libras", "Libras"))}? Transforme sua experiência profissional em diploma técnico reconhecido pelo MEC, com avaliação 100% online.</p>
        </div>
        <div class="lp-hero__extra">
          <ul class="lp-checks">
            <li>${ic("shield")} Reconhecido pelo MEC e registrado no SISTEC</li>
            <li>${ic("globe")} Diploma com validade nacional</li>
            <li>${ic("laptop")} Prova online de múltipla escolha</li>
            <li>${ic("clock")} Diploma em até 48 horas úteis</li>
          </ul>
          ${P && P.show ? `<div class="lp-price">
            <span class="lp-price__badge">${esc(P.discountLabel)}</span>
            <span class="lp-price__old">de <s>${esc(P.oldPrice)}</s></span>
            <span class="lp-price__now">por <strong>${esc(P.price)}</strong></span>
          </div>` : ""}
        </div>

        <div class="lp-form-card" id="formulario">
          <h2>Quero meu diploma de ${esc(course.name)}</h2>
          <p class="lp-form-card__sub">Preencha e receba as orientações pelo WhatsApp.</p>
          <form id="lpForm" class="lead-form" novalidate>
            <div class="field">
              <label for="lp-nome">Nome completo <em>*</em></label>
              <input id="lp-nome" name="nome" type="text" autocomplete="name" required placeholder="Seu nome completo" />
              <small class="field__error" aria-live="polite"></small>
            </div>
            <div class="field">
              <label for="lp-whats">WhatsApp <em>*</em></label>
              <input id="lp-whats" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel" required placeholder="(00) 9 0000-0000" />
              <small class="field__error" aria-live="polite"></small>
            </div>
            <div class="field">
              <label for="lp-email">E-mail <em>*</em></label>
              <input id="lp-email" name="email" type="email" autocomplete="email" required placeholder="seu@email.com" />
              <small class="field__error" aria-live="polite"></small>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="lp-escolaridade">Ensino Médio <em>*</em></label>
                <select id="lp-escolaridade" name="escolaridade" required>
                  <option value="">Selecione</option>
                  <option>Completo</option>
                  <option>Incompleto</option>
                </select>
                <small class="field__error" aria-live="polite"></small>
              </div>
              <div class="field">
                <label for="lp-experiencia">Experiência na área <em>*</em></label>
                <select id="lp-experiencia" name="experiencia" required>
                  <option value="">Selecione</option>
                  <option>2 anos ou mais</option>
                  <option>Menos de 2 anos</option>
                  <option>Não tenho experiência</option>
                </select>
                <small class="field__error" aria-live="polite"></small>
              </div>
            </div>
            <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <div class="field field--check">
              <label class="check">
                <input type="checkbox" name="consentimento" required />
                <span class="check__box" aria-hidden="true"></span>
                <span>Autorizo o Instituto Infoco a entrar em contato comigo sobre cursos e serviços educacionais. <a href="${rel}politica-de-privacidade/" target="_blank" rel="noopener">Política de Privacidade</a></span>
              </label>
              <small class="field__error" aria-live="polite"></small>
            </div>
            <button type="submit" class="btn btn--primary btn--lg btn--block">
              <span class="btn__label">Quero receber as orientações</span>
              <span class="spinner" aria-hidden="true"></span>
            </button>
            <p class="form-note">${ic("lock")} Seus dados são usados apenas para retornar o seu contato.</p>
          </form>
        </div>
      </div>
    </section>

    <!-- ============ SOBRE A PROFISSÃO ============ -->
    <section class="lp-section">
      <div class="container lp-about${img ? " lp-about--img" : ""}">
        ${img ? `<figure class="lp-about__img"><img src="${rel}${img}" width="1200" height="800" loading="lazy" alt="Profissional ${esc(course.name.replace(/^Técnico/, "técnico"))} trabalhando" /></figure>` : ""}
        <div class="lp-about__text">
          <span class="eyebrow">Sobre a profissão</span>
          <h2 class="title">O que faz o ${esc(course.name)}</h2>
          <p class="lead">${esc(det.about)}</p>
          ${det.workplaces.length ? `<div class="lp-work">
            <h3>Onde atuar</h3>
            <ul>${det.workplaces.map((w) => `<li>${ic("pin")} ${esc(w)}</li>`).join("")}</ul>
          </div>` : ""}
        </div>
      </div>
    </section>

    <!-- ============ COMO FUNCIONA ============ -->
    <section class="lp-section lp-section--soft">
      <div class="container">
        <header class="section__head">
          <span class="eyebrow">Como funciona</span>
          <h2 class="title">Da comprovação ao diploma, em 4 etapas</h2>
        </header>
        <ol class="lp-steps">
${S.steps.map((st, i) => `          <li><span class="lp-steps__n">${i + 1}</span><div><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></div></li>`).join("\n")}
        </ol>
      </div>
    </section>

    <!-- ============ REQUISITOS ============ -->
    <section class="lp-section">
      <div class="container">
        <header class="section__head">
          <span class="eyebrow">Requisitos</span>
          <h2 class="title">Quem pode fazer</h2>
        </header>
        <div class="reqs">
${S.requirements.map((r, i) => `          <article class="req">
            <span class="req__icon">${ic(r.icon)}</span>
            <div>
              <span class="req__n">Requisito ${i + 1}</span>
              <h3>${esc(r.title)}</h3>
              <p>${esc(r.text)}</p>
              ${r.detail ? `<p class="req__detail">${esc(r.detail)}</p>` : ""}
            </div>
          </article>`).join("\n")}
        </div>
        <div class="lp-center">
          <a href="#formulario" class="btn btn--primary btn--lg js-to-form">Tenho os requisitos, quero começar ${ic("arrow")}</a>
        </div>
      </div>
    </section>

    ${P && P.show ? `<!-- ============ VALORES ============ -->
    <section class="lp-section lp-section--soft">
      <div class="container pricing">
        <div class="pricing__intro">
          <span class="eyebrow">Valores</span>
          <h2 class="title">${esc(course.name)} com ${esc(P.discountLabel.toLowerCase())}</h2>
          <ul class="pricing__list">
${S.benefits.slice(0, 5).map((b) => `            <li>${ic("check")} ${esc(b.title)}</li>`).join("\n")}
          </ul>
        </div>
        <div class="price-card">
          <span class="price-card__badge">${esc(P.discountLabel)}</span>
          <p class="price-card__program">${esc(course.name)}</p>
          <p class="price-card__old">de <s>${esc(P.oldPrice)}</s></p>
          <p class="price-card__now"><small>por</small> <strong>${esc(P.price)}</strong></p>
          <p class="price-card__note">${esc(P.note)}</p>
          <a href="#formulario" class="btn btn--primary btn--lg btn--block js-to-form">Quero garantir o desconto</a>
          <a href="#" class="btn btn--whatsapp btn--lg btn--block js-wa" data-wa-msg="${esc(waMsg)}">${ic("whatsapp")} Falar pelo WhatsApp</a>
        </div>
      </div>
    </section>` : ""}

    <!-- ============ FAQ ============ -->
    <section class="lp-section">
      <div class="container lp-faq">
        <header class="section__head">
          <span class="eyebrow">Dúvidas frequentes</span>
          <h2 class="title">Perguntas frequentes</h2>
        </header>
        <div class="accordion">
${faqs.map((f, i) => `          <div class="acc">
            <h3 style="margin:0;font-size:inherit"><button type="button" class="acc__btn" id="faq-b-${i}" aria-expanded="false" aria-controls="faq-p-${i}"><span>${esc(f.q)}</span><span class="acc__icon" aria-hidden="true"></span></button></h3>
            <div class="acc__panel" id="faq-p-${i}" role="region" aria-labelledby="faq-b-${i}"><div><p>${esc(f.a)}</p></div></div>
          </div>`).join("\n")}
        </div>
      </div>
    </section>

    <!-- ============ CHAMADA FINAL ============ -->
    <section class="lp-final">
      <div class="container lp-final__inner">
        <h2>Sua experiência já vale um diploma de ${esc(course.name)}</h2>
        <p>Envie seus dados e receba as orientações para começar hoje.</p>
        <div class="lp-final__actions">
          <a href="#formulario" class="btn btn--white btn--lg js-to-form">Quero meu diploma</a>
          <a href="#" class="btn btn--ghost-white btn--lg js-wa" data-wa-msg="${esc(waMsg)}">${ic("whatsapp")} Falar pelo WhatsApp</a>
        </div>
        ${others.length ? `<p class="lp-others">Outros cursos em ${esc(course.category)}: ${others.map((o) => `<a href="../${o.slug}/">${esc(o.name)}</a>`).join(" · ")}</p>` : ""}
      </div>
    </section>
  </main>

${footer(rel)}

  <!-- Barra fixa no celular -->
  <div class="lp-bar">
    <a href="#formulario" class="btn btn--primary js-to-form">Quero meu diploma</a>
    <a href="#" class="btn btn--whatsapp js-wa" data-wa-msg="${esc(waMsg)}" aria-label="Falar pelo WhatsApp">${ic("whatsapp")}</a>
  </div>

  <script>window.LP = ${JSON.stringify(lpData)};</script>
  <script src="${rel}js/lp.js"></script>
</body>
</html>
`;
}

/* ---------- Página de agradecimento ---------- */
function thankYouPage() {
  const rel = "../";
  const conv = T.googleAdsId && T.leadConversionLabel ? `${T.googleAdsId}/${T.leadConversionLabel}` : "";
  return `${head({ title: "Recebemos seus dados | Instituto Infoco", description: "Obrigado pelo interesse no Instituto Infoco.", rel, noindex: true })}
<body class="lp">
${header(rel, "Olá! Acabei de preencher o formulário no site do Instituto Infoco.")}
  <main class="lp-thanks">
    <div class="container">
      <div class="lp-thanks__card">
        <span class="form-success__icon">${ic("check")}</span>
        <h1>Recebemos seus dados!</h1>
        <p id="tyText">Obrigado pelo interesse. A equipe do Instituto Infoco vai entrar em contato pelo WhatsApp.</p>
        <p>Para agilizar, fale com a gente agora mesmo:</p>
        <a href="#" id="tyWa" class="btn btn--whatsapp btn--lg">${ic("whatsapp")} Continuar pelo WhatsApp</a>
        <p class="lp-thanks__back"><a href="${rel}">Voltar para o site</a></p>
      </div>
    </div>
  </main>
${footer(rel)}
  <script>
  (function () {
    var lead = null;
    try { lead = JSON.parse(sessionStorage.getItem("infoco_lead") || "null"); } catch (e) {}
    var msg = lead && lead.wa ? lead.wa : "Olá! Acabei de preencher o formulário no site do Instituto Infoco.";
    var a = document.getElementById("tyWa");
    a.href = "https://wa.me/${C.whatsapp}?text=" + encodeURIComponent(msg);
    a.target = "_blank"; a.rel = "noopener";
    if (lead && lead.curso) document.getElementById("tyText").textContent = "Obrigado pelo interesse no " + lead.curso + ". A equipe do Instituto Infoco vai entrar em contato pelo WhatsApp.";
    // Conversão: dispara uma única vez por envio de formulário
    if (lead && !lead.converted && typeof gtag === "function") {
      ${conv ? `gtag("event", "conversion", { send_to: "${conv}" });` : "/* preencha leadConversionLabel em js/config.js */"}
      gtag("event", "generate_lead", { course: lead.curso });
      lead.converted = true;
      try { sessionStorage.setItem("infoco_lead", JSON.stringify(lead)); } catch (e) {}
    }
  })();
  </script>
</body>
</html>
`;
}

/* ---------- Política de privacidade ---------- */
function privacyPage() {
  const rel = "../";
  return `${head({ title: "Política de Privacidade | Instituto Infoco", description: "Como o Instituto Infoco trata os dados pessoais enviados pelo site.", rel })}
<body class="lp">
${header(rel, "Olá! Tenho uma dúvida sobre meus dados.")}
  <main class="lp-legal">
    <div class="container">
      <h1>Política de Privacidade</h1>
      <p class="lp-legal__note">Modelo de referência. Revise com a instituição (e, se possível, com um advogado) antes de publicar.</p>
      <h2>1. Quem somos</h2>
      <p>${esc(C.name)}, inscrito no CNPJ ${esc(C.cnpj)}, é o responsável pelo tratamento dos dados pessoais coletados neste site. Contato: ${esc(C.email)} · WhatsApp ${esc(C.whatsappDisplay)}.</p>
      <h2>2. Quais dados coletamos</h2>
      <p>Quando você preenche um formulário, coletamos nome, WhatsApp, e-mail, cidade, curso de interesse, escolaridade, tempo de experiência e a mensagem enviada. Também registramos a origem da visita (como parâmetros de campanhas de anúncios) e dados de navegação coletados por ferramentas de medição, como o Google Ads e o Google Analytics.</p>
      <h2>3. Para que usamos</h2>
      <p>Usamos os dados para responder à sua solicitação, enviar informações sobre cursos e serviços educacionais, acompanhar sua matrícula e medir o resultado das nossas campanhas.</p>
      <h2>4. Base legal</h2>
      <p>O tratamento é feito com base no seu consentimento, dado ao marcar a autorização no formulário, e na execução de procedimentos preliminares a um contrato, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
      <h2>5. Compartilhamento</h2>
      <p>Não vendemos seus dados. Eles podem ser processados por fornecedores que nos ajudam a operar o site e o atendimento, como serviços de e-mail, formulários, WhatsApp e ferramentas de publicidade e análise do Google.</p>
      <h2>6. Cookies</h2>
      <p>O site pode usar cookies do Google para medir visitas e conversões de anúncios. Você pode bloqueá-los nas configurações do seu navegador.</p>
      <h2>7. Seus direitos</h2>
      <p>Você pode pedir a confirmação, o acesso, a correção ou a exclusão dos seus dados e revogar o consentimento a qualquer momento pelo e-mail ${esc(C.email)}.</p>
      <h2>8. Por quanto tempo guardamos</h2>
      <p>Mantemos os dados enquanto forem necessários para o atendimento e para cumprir obrigações legais.</p>
      <p class="lp-legal__date">Última atualização: ${new Date().toLocaleDateString("pt-BR")}.</p>
    </div>
  </main>
${footer(rel)}
  <script>window.LP = ${JSON.stringify({ course: "", whatsapp: C.whatsapp, email: C.email, waMessage: "Olá! Tenho uma dúvida sobre meus dados.", tracking: T })};</script>
  <script src="${rel}js/lp.js"></script>
</body>
</html>
`;
}

/* ---------- Gravação ---------- */
function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

S.courses.forEach((c) => write(`cursos/${c.slug}/index.html`, lpPage(c)));

// Lista dos cursos que têm imagem, usada pelos cards do site principal
const withImg = S.courses.filter((c) => hasImage(c.slug)).map((c) => c.slug);
write("js/course-images.js", `/* Gerado por scripts/gerar-lps.js — não edite à mão */\nwindow.COURSE_IMAGES = ${JSON.stringify(withImg, null, 2)};\n`);
const missing = S.courses.filter((c) => !hasImage(c.slug)).map((c) => c.slug);
write("obrigado/index.html", thankYouPage());
write("politica-de-privacidade/index.html", privacyPage());

// Lista de URLs para colar nos anúncios
const base = LPS.siteUrl || "https://SEU-DOMINIO";
const lines = ["Curso;Área;URL da página"].concat(S.courses.map((c) => `${c.name};${c.category};${base}/cursos/${c.slug}/`));
write("cursos/lista-de-urls.csv", "﻿" + lines.join("\n") + "\n");

if (LPS.siteUrl) {
  const urls = [`${LPS.siteUrl}/`].concat(S.courses.map((c) => `${LPS.siteUrl}/cursos/${c.slug}/`));
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
}

console.log(`✔ ${S.courses.length} páginas de curso geradas em cursos/`);
console.log("✔ obrigado/ e politica-de-privacidade/ geradas");
console.log(`✔ ${withImg.length} cursos com imagem`);
if (missing.length) console.log("ℹ Sem imagem (usam o ícone): " + missing.map((m) => `assets/img/cursos/${m}.webp`).join(", "));
console.log("✔ cursos/lista-de-urls.csv (URLs para os anúncios)");
if (!LPS.siteUrl) console.log("ℹ Preencha lpSettings.siteUrl em js/config.js para gerar o sitemap.xml e as URLs completas.");
if (!T.googleAdsId) console.log("ℹ Preencha lpSettings.tracking em js/config.js para ativar a conversão do Google Ads.");
