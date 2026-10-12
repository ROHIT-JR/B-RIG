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
    if (meta) meta.setAttribute('content', t === 'light' ? '#C6C4BE' : '#04121b');
    var btn = $('#theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function wireTheme() {
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
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

  /* ---------- scroll motion ---------- */

  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollReveal() {
    if (reduce || !('IntersectionObserver' in window)) return;   // content stays visible

    var sel = '.section-head, .tile, .stat, .feature, .band, .pending-card, .sponsor-slot, .tl, .chips, .countdown, .micro';
    var targets = $$(sel).filter(function (el) { return !el.closest('.hero'); });
    targets.forEach(function (el) {
      var card = el.classList.contains('tile') || el.classList.contains('stat') || el.classList.contains('pending-card');
      el.setAttribute('data-rv', card ? 'tile' : '');
    });
    root.classList.add('reveal-ready');

    var fired = false;
    var io = new IntersectionObserver(function (entries) {
      fired = true;
      var batch = 0;
      entries.forEach(function (e) {
        var el = e.target, r = e.boundingClientRect;
        if (e.isIntersecting) {
          // stagger siblings that arrive together, capped
          el.style.setProperty('--d', Math.min(batch++, 4) * 65 + 'ms');
          el.classList.add('in');
          if (el.classList.contains('stat')) countUp(el);
        } else if (r.top > window.innerHeight) {
          // scrolled back UP until it left through the bottom edge: re-arm so it
          // plays again when you come back down. Items that left through the
          // top stay revealed. The 10% bottom rootMargin is the hysteresis.
          el.style.setProperty('--d', '0ms');
          el.classList.remove('in');
        } else if (r.bottom < 0) {
          el.classList.add('in');                                  // already above the fold on load / anchor jump
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    targets.forEach(function (el) { io.observe(el); });

    // failsafe: if the observer never reports back, show everything
    setTimeout(function () { if (!fired) root.classList.add('reveal-all'); }, 2500);

    // keyboard focus must never land on something invisible
    document.addEventListener('focusin', function (e) {
      var rv = e.target.closest && e.target.closest('[data-rv]');
      if (rv) rv.classList.add('in');
    });
    addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      targets.forEach(function (el) { if (el.getBoundingClientRect().bottom < 0) el.classList.add('in'); });
    });
  }

  /* stats count up once, when first revealed */
  var counted = [];
  function countUp(card) {
    var b = card.querySelector('.num b');
    if (!b || reduce || counted.indexOf(b) > -1) return;
    var m = /^(~?)(\d+)$/.exec(b.textContent.trim());
    if (!m) return;
    counted.push(b);
    var prefix = m[1], end = parseInt(m[2], 10), t0 = performance.now(), dur = 1100;
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      b.textContent = prefix + Math.round(end * e);
      if (p < 1) requestAnimationFrame(tick); else b.textContent = prefix + end;
    })(t0);
  }

  /* scrubbed effects: progress bar, timeline fill + lit steps, hero parallax.
     Pure functions of scroll position, so scrolling back reverses them. */
  function scrubbed() {
    var bar = document.createElement('div');
    bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<i></i>';
    document.body.insertBefore(bar, document.body.firstChild);
    var barI = bar.firstChild;

    var tl = $('#timeline'), fill = null, steps = [];
    if (tl && tl.children.length) {
      fill = document.createElement('div'); fill.className = 'tl-fill'; fill.setAttribute('aria-hidden', 'true');
      tl.insertBefore(fill, tl.firstChild);
      steps = $$('.tl', tl);
    }
    var viz = $('.chainviz svg');
    var wide = window.matchMedia && matchMedia('(min-width: 900px)');
    var ticking = false;

    function update() {
      ticking = false;
      var y = Math.max(0, window.pageYOffset || 0);                       // clamp iOS rubber-banding
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      barI.style.transform = 'scaleX(' + Math.min(1, y / max).toFixed(4) + ')';

      if (fill) {
        var r = tl.getBoundingClientRect(), vh = window.innerHeight;
        var horizontal = wide && wide.matches;
        // the line fills as the timeline passes up through the viewport
        var p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (horizontal ? vh * 0.4 : Math.max(1, r.height))));
        fill.style.setProperty('--p', p.toFixed(3));
        steps.forEach(function (li, i) {
          var at = steps.length > 1 ? i / (steps.length - 1) : 0;
          li.classList.toggle('lit', p > 0 && p >= at - 0.02);
        });
      }

      if (viz && wide && wide.matches) {
        viz.style.transform = 'translate3d(0,' + Math.min(40, y * 0.06).toFixed(1) + 'px,0)';   // gentle, capped
      } else if (viz) { viz.style.transform = ''; }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
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
  if (!reduce) scrubbed();
})();
