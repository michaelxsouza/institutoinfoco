/* =====================================================================
   INSTITUTO INFOCO — COMPORTAMENTO DAS PÁGINAS DE CAPTURA (LPs)
   Os dados de cada página ficam em window.LP (gerado por
   scripts/gerar-lps.js a partir de js/config.js).
   ===================================================================== */
(function () {
  "use strict";
  const LP = window.LP;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------- Rastreamento: UTM + GCLID (guardados na sessão) ---------- */
  const TRACK_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
  const params = new URLSearchParams(location.search);
  const tracking = {};
  TRACK_KEYS.forEach((k) => {
    let v = params.get(k);
    try {
      if (v) sessionStorage.setItem("infoco_" + k, v);
      else v = sessionStorage.getItem("infoco_" + k);
    } catch (e) { /* armazenamento indisponível */ }
    if (v) tracking[k] = v;
  });

  const gtagSafe = (...args) => { if (typeof window.gtag === "function") window.gtag(...args); };
  const T = LP.tracking || {};

  /* ---------- WhatsApp ---------- */
  const waLink = (msg) => `https://wa.me/${LP.whatsapp}?text=${encodeURIComponent(msg)}`;
  $$(".js-wa").forEach((a) => {
    a.href = waLink(a.dataset.waMsg || LP.waMessage);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () => {
      gtagSafe("event", "whatsapp_click", { course: LP.course });
      if (T.googleAdsId && T.whatsappConversionLabel) {
        gtagSafe("event", "conversion", { send_to: `${T.googleAdsId}/${T.whatsappConversionLabel}` });
      }
    });
  });

  /* ---------- Botões que levam ao formulário ---------- */
  $$(".js-to-form").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    const form = $("#lpForm");
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => $("#lp-nome").focus({ preventScroll: true }), 500);
  }));

  /* ---------- Barra fixa no celular: aparece depois do formulário ---------- */
  const bar = $(".lp-bar");
  const formCard = $(".lp-form-card");
  if (bar && formCard && "IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => {
      bar.classList.toggle("is-visible", !en.isIntersecting && en.boundingClientRect.top < 0);
    }).observe(formCard);
  }

  /* ---------- FAQ ---------- */
  $$(".acc__btn").forEach((btn) => btn.addEventListener("click", () => {
    const item = btn.closest(".acc");
    const open = !item.classList.contains("is-open");
    $$(".acc").forEach((a) => { a.classList.remove("is-open"); $(".acc__btn", a).setAttribute("aria-expanded", "false"); });
    if (open) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
  }));

  /* ---------- Formulário ---------- */
  const form = $("#lpForm");
  if (!form) return;
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
  const phone = $("#lp-whats");
  phone.addEventListener("input", () => { phone.value = maskPhone(phone.value); });

  function validate(el) {
    const v = el.type === "checkbox" ? el.checked : el.value.trim();
    let msg = "";
    switch (el.name) {
      case "nome":
        if (!v) msg = "Informe seu nome completo.";
        else if (!/\S+\s+\S+/.test(v)) msg = "Informe nome e sobrenome.";
        break;
      case "whatsapp": {
        const d = digits(el.value);
        if (!d) msg = "Informe seu WhatsApp com DDD.";
        else if (d.length < 10 || +d.slice(0, 2) < 11) msg = "Número inválido. Use o formato (00) 9 0000-0000.";
        else if (d.length === 11 && d[2] !== "9") msg = "Celulares devem começar com 9 após o DDD.";
        break;
      }
      case "email":
        if (!v) msg = "Informe seu e-mail.";
        else if (!EMAIL_RE.test(v)) msg = "Informe um e-mail válido (ex.: nome@email.com).";
        break;
      case "escolaridade":
        if (!v) msg = "Selecione uma opção.";
        break;
      case "experiencia":
        if (!v) msg = "Selecione seu tempo de experiência.";
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

  const inputs = $$("input[name]:not([type=hidden]):not(.hp), select[name]", form);
  inputs.forEach((el) => {
    const ev = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "blur";
    el.addEventListener(ev, () => validate(el));
    el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) validate(el); });
  });

  let started = false;
  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    gtagSafe("event", "form_start", { course: LP.course });
  });

  function waMessage(d) {
    return [
      `Olá! Tenho interesse no *${LP.course}* por Competência.`,
      ``,
      `*Nome:* ${d.nome}`,
      `*Ensino Médio:* ${d.escolaridade}`,
      `*Experiência na área:* ${d.experiencia}`
    ].join("\n");
  }

  async function send(payload) {
    const fs = LP.formSettings || {};
    if (fs.provider === "formsubmit") {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(LP.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: `Novo lead (${LP.course}) — Instituto Infoco`, _template: "table", _captcha: "false" })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error(json.message || "Falha no envio");
      return;
    }
    if (fs.provider === "custom" && fs.customEndpoint) {
      const res = await fetch(fs.customEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Falha no envio");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    $$(".form-alert", form).forEach((a) => a.remove());
    if (form._honey && form._honey.value) return;
    const results = inputs.map(validate);
    if (results.includes(false)) { inputs[results.indexOf(false)].focus(); return; }

    const fd = new FormData(form);
    const data = {
      curso: LP.course,
      nome: fd.get("nome").trim(),
      whatsapp: fd.get("whatsapp").trim(),
      email: fd.get("email").trim(),
      escolaridade: fd.get("escolaridade"),
      experiencia: fd.get("experiencia"),
      consentimento: "Sim",
      origem: "LP " + LP.course,
      pagina: location.origin + location.pathname,
      data_envio: new Date().toLocaleString("pt-BR"),
      ...tracking
    };

    const btn = $("button[type=submit]", form);
    btn.classList.add("is-loading"); btn.disabled = true;
    let ok = true;
    try { await send(data); } catch (err) { ok = false; console.warn("[Instituto Infoco] Envio:", err); }
    btn.classList.remove("is-loading"); btn.disabled = false;

    if (!ok) {
      const alert = document.createElement("p");
      alert.className = "form-alert";
      alert.setAttribute("role", "alert");
      alert.innerHTML = `Não foi possível enviar agora. <a href="${waLink(waMessage(data))}" target="_blank" rel="noopener" style="text-decoration:underline">Envie sua solicitação pelo WhatsApp</a>.`;
      btn.before(alert);
      return;
    }

    try {
      sessionStorage.setItem("infoco_lead", JSON.stringify({ curso: LP.course, wa: waMessage(data), t: Date.now() }));
    } catch (err) { /* ignore */ }
    location.href = LP.thankYouUrl;
  });
})();
