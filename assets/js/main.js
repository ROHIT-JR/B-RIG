(function () {
  'use strict';

  /* ------------------------------------------------------------------
     EDIT THESE. Everything else is generated.
     ------------------------------------------------------------------ */

  // The sign-up / registration form. Every [data-form] link points here.
  var FORM_URL = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=o835AF4H5USqC6ujrdZTn9yJqd4nikpDkVUzoL1Fjy1UNjFDWkNEUUM5QTVWSVRKTFpPUVgzWFdFNi4u';

  // Dates (UTC). Before REGISTRATION_OPEN the CTA reads "Get notified";
  // after it, it flips to "Register now" on its own.
  var REGISTRATION_OPEN = new Date('2026-11-14T04:30:00Z');
  var HACK_START = new Date('2026-12-19T06:30:00Z');

  // SHA-256 commitments for the problem statements. Leave empty until the
  // real statements are hashed; the track cards show "sealed" meanwhile.
  var COMMITMENTS = { forensics: '', osint: '', dapps: '', nft: '', security: '', metaverse: '' };

  /* ------------------------------------------------------------------ */

  var ICONS = 'assets/img/icons.svg';
  var icon = function (id, cls) {
    return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="' + ICONS + '#' + id + '"/></svg>';
  };

  var TRACKS = [
    { key: 'forensics', icon: 'forensics', name: 'Forensics', desc: 'Follow the money on-chain.' },
    { key: 'osint', icon: 'osint', name: 'OSINT', desc: 'Attribution and provenance.' },
    { key: 'dapps', icon: 'dapps', name: 'DApps', desc: 'Apps that solve something real.' },
    { key: 'nft', icon: 'nft', name: 'NFTs', desc: 'Tokens that do actual work.' },
    { key: 'security', icon: 'security', name: 'Security', desc: 'Break it, then fix it.' },
    { key: 'metaverse', icon: 'metaverse', name: 'Metaverse', desc: 'Identity and ownership.' }
  ];

  var TIMELINE = [
    { date: 'OCT 13', title: 'Page goes live', done: true },
    { date: 'NOV 14', title: 'Registration opens', at: REGISTRATION_OPEN },
    { date: 'NOV 30', title: 'Idea submissions close' },
    { date: 'EARLY DEC', title: 'Teams confirmed' },
    { date: 'DEC 19', title: 'Hacking begins', at: HACK_START },
    { date: 'DEC 20', title: 'Demos and results' }
  ];

  var PENDING = [
    { title: 'Entry fee', when: 'by 14 November' },
    { title: 'Prize pool', when: 'announced soon' }
  ];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- theme toggle (initial value is set by the inline <head> script) ---------- */

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'light' ? '#ffffff' : '#04121b');
    var btn = $('#theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function wireTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    var btn = $('#theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('brig-theme', next); } catch (e) {}
    });
  }

  /* ---------- rendering ---------- */

  function renderTracks() {
    var ul = $('#verts');
    if (!ul) return;
    var html = TRACKS.map(function (t) {
      var h = COMMITMENTS[t.key];
      var tag = h ? '0x' + h.slice(0, 4) + '…' : 'sealed';
      return '<li class="tile reveal"><span class="tag">' + icon('lock') + tag + '</span>' +
        '<span class="tile-ic">' + icon(t.icon) + '</span>' +
        '<h3>' + t.name + '</h3><p>' + t.desc + '</p></li>';
    }).join('');
    html += '<li class="tile open reveal"><span class="tag">open</span>' +
      '<span class="tile-ic">' + icon('open') + '</span>' +
      '<h3>Your own idea</h3><p>Original and buildable in a day.</p></li>';
    ul.innerHTML = html;
  }

  function renderTimeline() {
    var ol = $('#timeline');
    if (!ol) return;
    var now = Date.now();
    var nextMarked = false;
    ol.innerHTML = TIMELINE.map(function (t) {
      var done = t.done || (t.at && now > t.at.getTime());
      var cls = 'tl' + (done ? ' done' : '');
      if (!done && !nextMarked) { cls += ' next'; nextMarked = true; }
      return '<li class="' + cls + '"><span class="tl-date">' + t.date + '</span>' +
        '<div class="tl-title">' + t.title + '</div></li>';
    }).join('');
  }

  function renderPending() {
    var w = $('#pcards');
    if (!w) return;
    w.innerHTML = PENDING.map(function (p) {
      return '<div class="pending-card reveal">' +
        '<h3>' + p.title + '</h3><span class="pd">' + p.when + '</span></div>';
    }).join('');
  }

  /* ---------- CTA wiring ---------- */

  function wireCta() {
    var open = Date.now() >= REGISTRATION_OPEN.getTime();
    $$('[data-form]').forEach(function (a) {
      a.setAttribute('href', FORM_URL || 'https://www.instagram.com/brig.amrita');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
    $$('[data-cta-label]').forEach(function (el) {
      el.textContent = open ? 'Register now' : 'Get notified';
    });
    $$('[data-cta-when]').forEach(function (el) {
      el.innerHTML = open
        ? '<b>Registration is open</b>19–20 Dec · Amrita'
        : '<b>Opens 14 Nov</b>19–20 Dec · Amrita';
    });
  }

  /* ---------- countdown ---------- */

  function countdown() {
    var now = Date.now();
    var target = now < REGISTRATION_OPEN.getTime() ? REGISTRATION_OPEN : HACK_START;
    var label = target === REGISTRATION_OPEN ? 'Registration opens in' : 'Hacking begins in';
    $$('[data-cd-label]').forEach(function (el) { el.textContent = label; });

    var s = Math.floor(Math.max(0, target.getTime() - now) / 1000);
    var parts = {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60
    };
    Object.keys(parts).forEach(function (k) {
      $$('[data-c="' + k + '"]').forEach(function (el) {
        el.textContent = String(parts[k]).padStart(2, '0');
      });
    });
  }

  /* ---------- page fingerprint (a real SHA-256 of the page text) ---------- */

  function fingerprint() {
    var slot = $('[data-hash]');
    if (!slot || !window.crypto || !crypto.subtle) return;
    var text = (document.querySelector('main') || document.body).textContent.replace(/\s+/g, ' ').trim();
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
      slot.textContent = '0x' + hex.slice(0, 8) + '…' + hex.slice(-6);
      slot.setAttribute('title', '0x' + hex);
    }).catch(function () {});
  }

  /* ---------- scroll reveal ---------- */

  function scrollReveal() {
    var targets = $$('.reveal, .tile, .stat, .band, .feature');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('in'); });
      return;
    }
    targets.forEach(function (t) { t.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('in'); }, i * 40);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- boot ---------- */

  wireTheme();
  renderTracks();
  renderTimeline();
  renderPending();
  wireCta();
  countdown();
  setInterval(countdown, 1000);
  fingerprint();
  scrollReveal();
})();
