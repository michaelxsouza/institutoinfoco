/* =====================================================================
   INSTITUTO INFOCO — AVISO DE COOKIES (LGPD) + Google Consent Mode v2
   ---------------------------------------------------------------------
   Carregado no <head> de todas as páginas, ANTES do Google Ads/Analytics.
   • Até a pessoa escolher, os cookies de medição e anúncios ficam
     bloqueados (consent "denied"). O Google recebe só sinais anônimos.
   • "Aceitar" libera; "Recusar" mantém bloqueado. A escolha fica salva
     por 12 meses no navegador.
   • Qualquer link com  data-cookie-settings  reabre o aviso.
   ===================================================================== */
(function () {
  "use strict";
  var KEY = "infoco_consent";
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000;
  var script = document.currentScript;
  var base = script ? script.src.replace(/js\/consent\.js.*$/, "") : "/";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
  if (saved && (!saved.t || Date.now() - saved.t > MAX_AGE)) saved = null;

  function state(v) {
    return { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v };
  }
  var s0 = state(saved && saved.v === "granted" ? "granted" : "denied");
  s0.functionality_storage = "granted";
  s0.security_storage = "granted";
  s0.wait_for_update = 500;
  window.gtag("consent", "default", s0);
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", true);

  function save(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
    window.gtag("consent", "update", state(v));
    try { window.dispatchEvent(new CustomEvent("infoco:consent", { detail: v })); } catch (e) {}
  }

  window.InfocoConsent = {
    get: function () { return saved ? saved.v : null; },
    open: function () { show(); }
  };

  var el = null;
  function show() {
    if (el) { el.hidden = false; el.querySelector("button").focus(); return; }
    el = document.createElement("div");
    el.className = "cookie";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", "Aviso de cookies");
    el.innerHTML =
      '<div class="cookie__inner">' +
        '<p class="cookie__text"><strong>Nós usamos cookies</strong> para medir as visitas e melhorar nossos anúncios. ' +
        'Você pode aceitar ou recusar; os cookies necessários ao funcionamento do site continuam ativos. ' +
        '<a href="' + base + 'politica-de-privacidade/">Política de Privacidade</a></p>' +
        '<div class="cookie__actions">' +
          '<button type="button" class="btn btn--outline cookie__btn" data-v="denied">Recusar</button>' +
          '<button type="button" class="btn btn--primary cookie__btn" data-v="granted">Aceitar</button>' +
        '</div>' +
      '</div>';
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]");
      if (!b) return;
      saved = { v: b.getAttribute("data-v"), t: Date.now() };
      save(saved.v);
      el.hidden = true;
      document.documentElement.classList.remove("has-cookie");
    });
    document.body.appendChild(el);
    document.documentElement.classList.add("has-cookie");
  }

  function init() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-cookie-settings]");
      if (!a) return;
      e.preventDefault();
      show();
      document.documentElement.classList.add("has-cookie");
    });
    if (!saved) show();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
