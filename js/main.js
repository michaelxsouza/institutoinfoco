/* =====================================================================
   INSTITUTO INFOCO — COMPORTAMENTO DO SITE
   Para editar conteúdo, use js/config.js (não é preciso alterar aqui).
   ===================================================================== */
(function () {
  "use strict";

  const { instituteContact: C, formSettings, courses, faqs, testimonials, pricing, steps, requirements, requirementsSummary, benefits } = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- Ícones (SVG inline) ---------------- */
  const S = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    arrow: S('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    cap: S('<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 10v6"/>'),
    chat: S('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>'),
    trend: S('<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'),
    compass: S('<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>'),
    book: S('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),
    image: S('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'),
    key: S('<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>'),
    lightbulb: S('<path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 1 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>'),
    search: S('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    user: S('<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'),
    users: S('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    send: S('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
    grid: S('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    laptop: S('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>'),
    briefcase: S('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    chart: S('<path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="7" rx="1"/><rect x="12" y="6" width="3" height="11" rx="1"/><rect x="17" y="13" width="3" height="4" rx="1"/>'),
    heart: S('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>'),
    tool: S('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>'),
    globe: S('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>'),
    mail: S('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    lock: S('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
    check: S('<path d="M20 6 9 17l-5-5"/>'),
    close: S('<path d="M18 6 6 18M6 6l12 12"/>'),
    clock: S('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    file: S('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13h6M9 17h4"/>'),
    shield: S('<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    building: S('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>'),
    leaf: S('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.2-6.1 2.4-.5 4.9-2 5.8-3.9"/>'),
    car: S('<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 6H7.4a2 2 0 0 0-1.7 1L4 10l-1.5.6A2 2 0 0 0 1 12.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>'),
    gear: S('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    map: S('<path d="M14.1 4.9 9.9 3.1a2 2 0 0 0-1.8 0L3.6 5.3A1 1 0 0 0 3 6.2v13.2a1 1 0 0 0 1.4.9l3.7-1.9a2 2 0 0 1 1.8 0l4.2 2.1a2 2 0 0 0 1.8 0l4.5-2.2a1 1 0 0 0 .6-.9V4.6a1 1 0 0 0-1.4-.9l-3.7 1.9a2 2 0 0 1-1.8 0Z"/><path d="M15 5.8v15M9 3.2v15"/>'),
    tag: S('<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1"/>'),
    quote: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.5 5C6.2 5 3.5 7.7 3.5 11v8h7v-7H7c0-2 1.2-3.5 2.5-3.5zM20 5c-3.3 0-6 2.7-6 6v8h7v-7h-3.5c0-2 1.2-3.5 2.5-3.5z"/></svg>',
    instagram: S('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
    facebook: S('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41"/></svg>'
  };
  const icon = (name) => `<span class="i">${ICONS[name] || ICONS.book}</span>`;
  const hydrateIcons = (root = document) => $$("[data-icon]", root).forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ""; el.removeAttribute("data-icon"); });

  /* ---------------- WhatsApp ---------------- */
  const waLink = (msg) => `https://wa.me/${C.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  function bindWhatsApp(root = document) {
    $$(".js-wa", root).forEach((a) => {
      a.href = waLink(a.dataset.waMsg || "");
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------------- Dados de contato no HTML ---------------- */
  function bindContact() {
    $$("[data-bind]").forEach((el) => { el.textContent = C[el.dataset.bind] ?? ""; });
    $$("[data-bind-href]").forEach((el) => {
      const k = el.dataset.bindHref;
      el.href = k === "mailto" ? `mailto:${C.email}` : C[k] || "#";
    });
    if (C.facebookUrl) {
      const fb = $("#facebookIcon"); fb.href = C.facebookUrl; fb.hidden = false;
      $("#facebookLine").innerHTML = `<a href="${esc(C.facebookUrl)}" target="_blank" rel="noopener">Facebook: ${esc(C.facebook)}</a>`;
    }
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------------- Cabeçalho ---------------- */
  function initHeader() {
    const header = $("#header"), burger = $("#burger"), nav = $("#nav");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const setMenu = (open) => {
      header.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
    $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    document.addEventListener("click", (e) => { if (!header.contains(e.target)) setMenu(false); });

    // Link ativo conforme a seção visível
    const links = $$(".nav__link");
    const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && map.has(en.target.id)) {
          links.forEach((l) => l.classList.remove("is-active"));
          map.get(en.target.id).classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------------- Animações ao rolar ---------------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => {
      const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
      const idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = `${Math.min(idx, 7) * 70}ms`;
      io.observe(el);
    });
  }

  /* ---------------- Cursos ---------------- */
  const state = { q: "", cat: "Todos" };
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function renderFilters() {
    const cats = ["Todos", ...new Set(courses.map((c) => c.category).filter(Boolean))];
    const count = (c) => c === "Todos" ? courses.length : courses.filter((x) => x.category === c).length;
    $("#courseFilters").innerHTML = cats.map((c) =>
      `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${c === state.cat}">${esc(c)} <span class="chip__n">${count(c)}</span></button>`).join("");
  }

  const INITIAL_COURSES = 9;
  let showAll = false;

  function renderCourses() {
    const list = courses.filter((c) =>
      (state.cat === "Todos" || c.category === state.cat) &&
      (!state.q || norm(c.name).includes(norm(state.q)) || norm(c.category).includes(norm(state.q))));
    const limited = !showAll && state.cat === "Todos" && !state.q && list.length > INITIAL_COURSES;
    const visible = limited ? list.slice(0, INITIAL_COURSES) : list;
    $("#coursesGrid").innerHTML = visible.map((c) => {
      const i = courses.indexOf(c);
      const meta = [
        c.duration ? `<span class="tag">${icon("clock")} ${esc(c.duration)}</span>` : "",
        c.modality ? `<span class="tag">${icon("laptop")} ${esc(c.modality)}</span>` : ""
      ].join("");
      return `
      <article class="course">
        <div class="course__head">
          <span class="course__icon">${icon(c.icon)}</span>
          <div>
            ${c.category ? `<span class="course__cat">${esc(c.category)}</span>` : ""}
            <h3>${esc(c.name)}</h3>
          </div>
        </div>
        ${meta ? `<div class="course__meta">${meta}</div>` : ""}
        <button type="button" class="btn btn--primary js-interest" data-index="${i}">Tenho interesse ${icon("arrow")}</button>
      </article>`;
    }).join("");
    $("#coursesEmpty").hidden = list.length > 0;
    $("#coursesMoreWrap").hidden = !limited;
    if (limited) $("#coursesMore").textContent = `Ver todos os ${list.length} cursos`;
  }

  function fillCourseSelects() {
    const opts = [`<option value="">Selecione uma opção</option>`,
      ...courses.map((c) => `<option value="${esc(c.name)}">${esc(c.name)}</option>`),
      `<option value="Ainda não sei / Quero orientação">Ainda não sei / Quero orientação</option>`,
      `<option value="Outro curso ou área">Outro curso ou área</option>`].join("");
    $$(".js-course-select").forEach((s) => (s.innerHTML = opts));
  }

  function initCourses() {
    renderFilters(); renderCourses(); fillCourseSelects();
    let t;
    $("#courseSearch").addEventListener("input", (e) => {
      clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim(); renderCourses(); }, 150);
    });
    $("#courseFilters").addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      state.cat = b.dataset.cat;
      $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      renderCourses();
    });
    $("#coursesMore").addEventListener("click", () => { showAll = true; renderCourses(); });
    $("#coursesGrid").addEventListener("click", (e) => {
      const b = e.target.closest(".js-interest"); if (!b) return;
      openModal(courses[+b.dataset.index], b);
    });
  }

  /* ---------------- Modal ---------------- */
  const modal = $("#interestModal");
  let lastFocus = null;
  function openModal(course, trigger) {
    lastFocus = trigger || document.activeElement;
    resetForm($("#modalForm"));
    $("#modalCourseName").textContent = course.name;
    $("#modalPrice").textContent = pricing && pricing.show ? pricing.price : "";
    $("#m-curso").value = course.name;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    setTimeout(() => $("#m-nome").focus(), 60);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }
  function initModal() {
    modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") { // mantém o foco dentro do modal
        const f = $$('button, [href], input:not(.hp), select, textarea', modal).filter((el) => el.offsetParent !== null);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------- Etapas, requisitos, benefícios e valores ---------------- */
  function renderSteps() {
    $("#stepsList").innerHTML = steps.map((st, i) => `
      <li class="step reveal">
        <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
        <span class="step__icon">${icon(st.icon)}</span>
        <h3>${esc(st.title)}</h3>
        <p>${esc(st.text)}</p>
      </li>`).join("");
  }

  function renderRequirements() {
    $("#requirementsList").innerHTML = requirements.map((r, i) => `
      <article class="req reveal">
        <span class="req__icon">${icon(r.icon)}</span>
        <div>
          <span class="req__n">Requisito ${i + 1}</span>
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.text)}</p>
          ${r.detail ? `<p class="req__detail">${esc(r.detail)}</p>` : ""}
        </div>
      </article>`).join("");
    $("#requirementsSummary").textContent = requirementsSummary;
  }

  function renderBenefits() {
    $("#benefitsGrid").innerHTML = benefits.map((b) =>
      `<article class="benefit reveal">${icon(b.icon)}<h3>${esc(b.title)}</h3></article>`).join("");
  }

  function renderPricing() {
    const sec = $("#valores");
    if (!pricing || !pricing.show) { sec.hidden = true; $$('a[href="#valores"]').forEach((a) => a.closest("li")?.remove()); return; }
    $$("[data-price]", sec).forEach((el) => { el.textContent = pricing[el.dataset.price] || ""; });
    $("#pricingList").innerHTML = benefits.slice(0, 5).map((b) =>
      `<li>${icon("check")} ${esc(b.title)}</li>`).join("");
  }

  /* ---------------- Testemunhos e FAQ ---------------- */
  function renderTestimonials() {
    if (!testimonials.length) { $("#depoimentos").hidden = true; return; }
    $("#testimonialsGrid").innerHTML = testimonials.map((t, i) => `
      <figure class="testimonial reveal ${t.placeholder ? "testimonial--placeholder" : ""}" style="margin:0">
        ${t.placeholder ? `<span class="badge-draft">Provisório</span>` : ""}
        <span class="testimonial__quote">${ICONS.quote}</span>
        <blockquote class="testimonial__text" style="margin:0">“${esc(t.text)}”</blockquote>
        <figcaption class="testimonial__person">
          <span class="testimonial__avatar">${icon("user")}</span>
          <span><strong>${esc(t.name)}</strong><small>${esc(t.course)}</small></span>
        </figcaption>
      </figure>`).join("");
  }

  function renderFaq() {
    $("#faqList").innerHTML = faqs.map((f, i) => `
      <div class="acc">
        <h3 style="margin:0;font-size:inherit">
          <button type="button" class="acc__btn" id="faq-b-${i}" aria-expanded="false" aria-controls="faq-p-${i}">
            <span>${esc(f.q)}</span><span class="acc__icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div class="acc__panel" id="faq-p-${i}" role="region" aria-labelledby="faq-b-${i}"><div><p>${esc(f.a)}</p></div></div>
      </div>`).join("");
    $("#faqList").addEventListener("click", (e) => {
      const btn = e.target.closest(".acc__btn"); if (!btn) return;
      const item = btn.closest(".acc");
      const open = !item.classList.contains("is-open");
      $$(".acc", $("#faqList")).forEach((a) => { a.classList.remove("is-open"); $(".acc__btn", a).setAttribute("aria-expanded", "false"); });
      if (open) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------------- Formulários ---------------- */
  const digits = (v) => v.replace(/\D/g, "");
  function maskPhone(v) {
    let d = digits(v);
    if (d.startsWith("55") && d.length > 11) d = d.slice(2);
    d = d.slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
  }
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateField(el) {
    const v = el.type === "checkbox" ? el.checked : el.value.trim();
    let msg = "";
    switch (el.name) {
      case "nome":
        if (!v) msg = "Informe seu nome completo.";
        else if (v.length < 3 || !/\s\S/.test(v)) msg = "Informe nome e sobrenome.";
        break;
      case "whatsapp": {
        const d = digits(el.value);
        if (!d) msg = "Informe seu WhatsApp com DDD.";
        else if (d.length < 10 || d.length > 11 || +d.slice(0, 2) < 11) msg = "Número inválido. Use o formato (00) 9 0000-0000.";
        else if (d.length === 11 && d[2] !== "9") msg = "Celulares devem começar com 9 após o DDD.";
        break;
      }
      case "email":
        if (!v) msg = "Informe seu e-mail.";
        else if (!EMAIL_RE.test(v)) msg = "Informe um e-mail válido (ex.: nome@email.com).";
        break;
      case "cidade":
        if (!v) msg = "Informe sua cidade e estado.";
        else if (v.length < 3) msg = "Informe cidade e estado (ex.: Belo Horizonte - MG).";
        break;
      case "curso":
        if (!v) msg = "Selecione um curso ou área de interesse.";
        break;
      case "consentimento":
        if (!v) msg = "É necessário autorizar o contato para enviar.";
        break;
    }
    const field = el.closest(".field");
    field.classList.toggle("has-error", !!msg);
    field.classList.toggle("is-valid", !msg && el.type !== "checkbox" && !!v);
    $(".field__error", field).textContent = msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  function resetForm(form) {
    form.reset();
    form.hidden = false;
    $$(".field", form).forEach((f) => { f.classList.remove("has-error", "is-valid"); const e = $(".field__error", f); if (e) e.textContent = ""; });
    $$(".form-alert", form).forEach((a) => a.remove());
    const success = form.parentElement.querySelector(".form-success");
    if (success) success.hidden = true;
  }

  function buildWaMessage(d) {
    return [
      `Olá! Vim pelo site do ${C.name} e gostaria de mais informações.`,
      ``,
      `*Nome:* ${d.nome}`,
      `*Cidade/UF:* ${d.cidade}`,
      `*Interesse:* ${d.curso}`,
      d.mensagem ? `*Mensagem:* ${d.mensagem}` : ""
    ].filter((l) => l !== "").join("\n");
  }

  async function sendLead(data) {
    const payload = {
      ...data,
      origem: data.origem,
      pagina: location.href,
      data_envio: new Date().toLocaleString("pt-BR")
    };
    if (formSettings.provider === "formsubmit") {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(C.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: formSettings.emailSubject, _template: "table", _captcha: "false" })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error(json.message || "Falha no envio");
      return;
    }
    if (formSettings.provider === "custom" && formSettings.customEndpoint) {
      const res = await fetch(formSettings.customEndpoint, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Falha no envio");
      return;
    }
    // provider "whatsapp": envio é feito pelo próprio WhatsApp
    window.open(waLink(buildWaMessage(payload)), "_blank", "noopener");
  }

  function initForms() {
    $$("[data-mask='phone']").forEach((el) => el.addEventListener("input", () => {
      el.value = maskPhone(el.value);
    }));

    $$(".lead-form").forEach((form) => {
      const inputs = $$("input[name]:not(.hp), select[name], textarea[name]", form).filter((el) => el.name !== "mensagem");
      inputs.forEach((el) => {
        const ev = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "blur";
        el.addEventListener(ev, () => validateField(el));
        el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) validateField(el); });
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $$(".form-alert", form).forEach((a) => a.remove());
        if (form._honey && form._honey.value) return; // bot

        const results = inputs.map(validateField);
        if (results.includes(false)) {
          const firstBad = inputs[results.indexOf(false)];
          firstBad.focus();
          return;
        }

        const fd = new FormData(form);
        const data = {
          nome: fd.get("nome").trim(),
          whatsapp: fd.get("whatsapp").trim(),
          email: fd.get("email").trim(),
          cidade: fd.get("cidade").trim(),
          curso: fd.get("curso"),
          mensagem: (fd.get("mensagem") || "").trim(),
          consentimento: "Sim",
          origem: form.dataset.source
        };

        const btn = $("button[type=submit]", form);
        btn.classList.add("is-loading"); btn.disabled = true;
        let ok = true;
        try { await sendLead(data); }
        catch (err) { ok = false; console.warn("[Instituto Infoco] Envio do formulário:", err); }
        btn.classList.remove("is-loading"); btn.disabled = false;

        const success = form.parentElement.querySelector(".form-success");
        const waBtn = $(".js-success-wa", success);
        waBtn.href = waLink(buildWaMessage(data)); waBtn.target = "_blank"; waBtn.rel = "noopener";
        waBtn.hidden = !formSettings.openWhatsAppAfterSubmit && ok;

        if (!ok) {
          // Falha no envio por e-mail: não perde o lead — direciona ao WhatsApp
          const alert = document.createElement("p");
          alert.className = "form-alert";
          alert.setAttribute("role", "alert");
          alert.innerHTML = `Não foi possível enviar agora. <a href="${waLink(buildWaMessage(data))}" target="_blank" rel="noopener" style="text-decoration:underline">Envie sua solicitação pelo WhatsApp</a>.`;
          btn.before(alert);
          return;
        }
        form.hidden = true;
        success.hidden = false;
        success.focus();
        if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { form: data.origem, course: data.curso });
        if (typeof window.fbq === "function") window.fbq("track", "Lead", { content_name: data.curso });
      });
    });

    $$(".js-form-reset").forEach((b) => b.addEventListener("click", () => {
      const form = b.closest(".form-card").querySelector(".lead-form");
      resetForm(form); $("input", form).focus();
    }));
  }

  /* ---------------- Hero: movimento com o mouse (somente desktop) ---------------- */
  function initHeroParallax() {
    const hero = $(".hero"), media = $(".hero__media");
    if (!hero || !media) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1101px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    hero.addEventListener("mousemove", (e) => {
      if (!fine.matches || reduce.matches) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        media.style.setProperty("--hx", `${(x * -18).toFixed(1)}px`);
        media.style.setProperty("--hy", `${(y * -14).toFixed(1)}px`);
      });
    });
    hero.addEventListener("mouseleave", () => {
      media.style.setProperty("--hx", "0px");
      media.style.setProperty("--hy", "0px");
    });
  }

  /* ---------------- Inicialização ---------------- */
  document.documentElement.classList.remove("no-js");
  hydrateIcons();
  bindContact();
  bindWhatsApp();
  initHeader();
  initCourses();
  renderSteps();
  renderRequirements();
  renderBenefits();
  renderPricing();
  renderTestimonials();
  renderFaq();
  initModal();
  initForms();
  hydrateIcons();
  initReveal();
  initHeroParallax();
})();
