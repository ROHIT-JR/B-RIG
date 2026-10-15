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
    { date: 'OCT 13', title: 'Page goes live', at: new Date('2026-10-13T04:30:00Z') },
    { date: 'NOV 14', title: 'Registration opens', at: REGISTRATION_OPEN },
    { date: 'NOV 30', title: 'Idea submissions close', at: new Date('2026-11-30T18:29:00Z') },
    { date: 'EARLY DEC', title: 'Teams confirmed', at: new Date('2026-12-05T06:30:00Z') },
    { date: 'DEC 19', title: 'Hacking begins', at: HACK_START },
    { date: 'DEC 20', title: 'Demos and results', at: new Date('2026-12-20T06:30:00Z') }
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
    if (meta) meta.setAttribute('content', t === 'light' ? '#E3F0EF' : '#04121b');
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
      var done = !!(t.at && now >= t.at.getTime());
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

    var sel = '.section-head, .tile, .stat, .feature, .band, .pending-card, .sponsor-slot, .tl, .chips, .countdown, .micro, .chain-link';
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
          if (el.classList.contains('section-head')) scrambleHead(el);
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
    /* The timeline follows the calendar, not the scroll position: the line
       is filled up to today's place between the two nearest dates, and a step
       is lit once its date has passed. Recomputed on resize and every minute. */
    function placeTimeline() {
      if (!fill) return;
      var horizontal = wide && wide.matches, now = Date.now();
      var size = horizontal ? tl.offsetWidth : tl.offsetHeight;
      var pts = steps.map(function (li) { return horizontal ? li.offsetLeft : li.offsetTop + 6; });
      var p = 0;
      TIMELINE.forEach(function (t, i) {
        var at = t.at.getTime();
        steps[i].classList.toggle('lit', now >= at);
        if (now >= at) p = pts[i];
        else if (i > 0 && now > TIMELINE[i - 1].at.getTime()) {
          var a0 = TIMELINE[i - 1].at.getTime();
          p = pts[i - 1] + (pts[i] - pts[i - 1]) * ((now - a0) / (at - a0));
        }
      });
      fill.style.setProperty('--p', Math.min(1, p / Math.max(1, size)).toFixed(4));
    }
    placeTimeline();
    addEventListener('resize', placeTimeline);
    setInterval(placeTimeline, 60000);
    var viz = $('.chainviz .lchain') || $('.chainviz svg');
    var wide = window.matchMedia && matchMedia('(min-width: 900px)');
    var ticking = false;

    function update() {
      ticking = false;
      var y = Math.max(0, window.pageYOffset || 0);                       // clamp iOS rubber-banding
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      barI.style.transform = 'scaleX(' + Math.min(1, y / max).toFixed(4) + ')';

      if (viz && wide && wide.matches) {
        viz.style.transform = 'translate3d(0,' + Math.min(40, y * 0.06).toFixed(1) + 'px,0)';   // gentle, capped
      } else if (viz) { viz.style.transform = ''; }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  }

  /* ---------- blockchain motion ---------- */

  var paused = false;
  try { paused = localStorage.getItem('brig-motion') === 'paused'; } catch (e) {}
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // compact SHA-256 (sync, so mining a few hundred nonces is instant)
  var SK = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
  function sha(str) {
    var b = new TextEncoder().encode(str), l = b.length, pad = new Uint8Array(((l + 9 + 63) >> 6) << 6);
    pad.set(b); pad[l] = 0x80;
    var dv = new DataView(pad.buffer);
    dv.setUint32(pad.length - 4, (l * 8) >>> 0);
    var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19], w = new Array(64);
    for (var o = 0; o < pad.length; o += 64) {
      var i;
      for (i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (i = 16; i < 64; i++) {
        var a0 = rotr(w[i-15],7) ^ rotr(w[i-15],18) ^ (w[i-15] >>> 3), a1 = rotr(w[i-2],17) ^ rotr(w[i-2],19) ^ (w[i-2] >>> 10);
        w[i] = (w[i-16] + a0 + w[i-7] + a1) | 0;
      }
      var A=h[0],B=h[1],C=h[2],D=h[3],E=h[4],F=h[5],G=h[6],H=h[7];
      for (i = 0; i < 64; i++) {
        var t1 = (H + (rotr(E,6) ^ rotr(E,11) ^ rotr(E,25)) + ((E & F) ^ (~E & G)) + SK[i] + w[i]) | 0;
        var t2 = ((rotr(A,2) ^ rotr(A,13) ^ rotr(A,22)) + ((A & B) ^ (A & C) ^ (B & C))) | 0;
        H=G; G=F; F=E; E=(D + t1) | 0; D=C; C=B; B=A; A=(t1 + t2) | 0;
      }
      h[0]=(h[0]+A)|0; h[1]=(h[1]+B)|0; h[2]=(h[2]+C)|0; h[3]=(h[3]+D)|0; h[4]=(h[4]+E)|0; h[5]=(h[5]+F)|0; h[6]=(h[6]+G)|0; h[7]=(h[7]+H)|0;
    }
    return h.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  }

  var DIFF = '00';                                   // leading zeros a valid block needs
  function mineBlock(n, prev, data) {
    for (var nonce = 0; nonce < 100000; nonce++) {
      var hx = sha(prev + '|' + n + '|' + data + '|' + nonce);
      if (hx.indexOf(DIFF) === 0) return { n: n, prev: prev, data: data, nonce: nonce, hash: hx };
    }
    return { n: n, prev: prev, data: data, nonce: 0, hash: sha(prev + '|' + n + '|' + data + '|0') };
  }
  function short(hx) { return '0x' + hx.slice(0, 6) + '\u2026' + hx.slice(-4); }
  function validAgainst(b, prevHash) {
    return b.prev === prevHash && b.hash === sha(b.prev + '|' + b.n + '|' + b.data + '|' + b.nonce) && b.hash.indexOf(DIFF) === 0;
  }

  /* shared visibility gate: widget runs only while on-screen, tab visible, not paused */
  function gate(el, onChange) {
    var vis = true, state = { run: false };
    function eval_() {
      var run = vis && !document.hidden && !paused && !rm;
      if (run !== state.run) { state.run = run; onChange(run); }
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { vis = es[es.length - 1].isIntersecting; eval_(); }, { threshold: 0.05 }).observe(el);
    }
    document.addEventListener('visibilitychange', eval_);
    addEventListener('brig-motion', eval_);
    eval_();
    return state;
  }

  function buildChain() {
    var host = $('.chainviz');
    if (!host || rm) return;                       // keep the static graphic for reduced motion

    var chain = [], tampered = -1, timer = null, busy = false, mining = false;
    var genesisPrev = '0'.repeat(64);
    function push() {
      var prev = chain.length ? chain[chain.length - 1].hash : genesisPrev;
      var n = chain.length ? chain[chain.length - 1].n + 1 : 0;
      var b = mineBlock(n, prev, 'tx batch ' + n);
      chain.push(b); return b;
    }
    for (var i = 0; i < 4; i++) push();

    host.removeAttribute('aria-hidden');
    host.innerHTML =
      '<div class="lchain" role="group" aria-label="Animated blockchain demo: each block stores the hash of the one before it">' +
        '<div class="lc-view"><div class="lc-track" id="lcTrack"></div></div>' +
        '<div class="lc-ctl"><span class="lc-status" id="lcStatus" aria-live="polite">chain valid</span>' +
        '<button type="button" class="lc-btn" id="lcBtn">Tamper with a block</button></div>' +
      '</div>';
    var track = $('#lcTrack'), status = $('#lcStatus'), btn = $('#lcBtn');

    function el(b, fresh) {
      var d = document.createElement('div');
      d.className = 'lc-block' + (fresh ? ' new' : '');
      d.setAttribute('data-n', b.n);
      d.innerHTML = '<b>BLOCK #' + String(b.n).padStart(3, '0') + '<em>VALID</em></b>' +
        '<span class="h">prev ' + short(b.prev) + '</span>' +
        '<span class="h">hash <span class="z">' + b.hash.slice(0, 2) + '</span>' + b.hash.slice(2, 6) + '\u2026' + b.hash.slice(-4) + '</span>';
      return d;
    }
    function render() {
      track.innerHTML = '';
      chain.slice(-4).forEach(function (b) { track.appendChild(el(b, false)); });
    }
    render();

    function appendBlock() {
      if (busy || tampered > -1 || mining) return;
      mining = true;
      var nextN = chain[chain.length - 1].n + 1, nonce = 0, t0 = Date.now();
      var tk = setInterval(function () {
        nonce += 37 + ((Math.random() * 400) | 0);
        status.textContent = 'mining block #' + String(nextN).padStart(3, '0') + ' \u00b7 nonce ' + nonce.toLocaleString('en-IN');
        if (Date.now() - t0 > 800) {
          clearInterval(tk);
          status.textContent = 'chain valid';
          mining = false;
          doAppend();
        }
      }, 60);
    }

    function doAppend() {
      if (busy || tampered > -1) return;
      busy = true;
      var b = push(), node = el(b, true);
      dispatchEvent(new CustomEvent('brig-block', { detail: { n: b.n, hash: b.hash } }));
      track.appendChild(node);
      var step = node.getBoundingClientRect().height + parseFloat(getComputedStyle(track).rowGap || 24);
      track.style.transform = 'translate3d(0,' + (-step) + 'px,0)';
      setTimeout(function () {
        track.style.transition = 'none';
        track.style.transform = 'none';
        if (track.firstChild) track.removeChild(track.firstChild);
        node.classList.remove('new');
        void track.offsetHeight;
        track.style.transition = '';
        if (chain.length > 40) chain.splice(0, chain.length - 8);
        busy = false;
      }, 700);
    }

    function tamper() {
      var vis = chain.slice(-4), idx = chain.length - 3;       // second visible block
      tampered = idx;
      chain[idx] = Object.assign({}, chain[idx], { data: chain[idx].data + ' (edited)' });
      var nodes = $$('.lc-block', track);
      status.textContent = 'tampered \u2014 verifying\u2026'; status.classList.add('bad');
      var okPrev = chain[idx - 1] ? chain[idx - 1].hash : genesisPrev;
      var visStart = chain.length - 4, k = 0;
      nodes.forEach(function (node, j) {
        var bi = visStart + j;
        if (bi < idx) return;
        setTimeout(function () {
          node.classList.add('bad');
          node.querySelector('em').textContent = 'INVALID';
          var hs = node.querySelectorAll('.h')[1];
          if (bi === idx) hs.innerHTML = 'hash <span class="z">\u2260</span> recomputed';
        }, 120 * k++);
      });
      setTimeout(function () { status.textContent = 'chain broken at block #' + String(chain[idx].n).padStart(3, '0'); }, 120 * k + 100);
      btn.textContent = 'Re-mine and repair';
    }
    function repair() {
      var idx = tampered, visStart = chain.length - 4;
      // re-mine the edited block and everything after it, so the chain is valid again
      for (var i = idx; i < chain.length; i++) {
        var prev = i === 0 ? genesisPrev : chain[i - 1].hash;
        chain[i] = mineBlock(chain[i].n, prev, 'tx batch ' + chain[i].n);
      }
      var nodes = $$('.lc-block', track), k = 0;
      nodes.forEach(function (node, j) {
        var bi = visStart + j;
        if (bi < idx) return;
        setTimeout(function () {
          var b = chain[bi];
          var nn = el(b, false);
          node.className = nn.className; node.innerHTML = nn.innerHTML;
        }, 120 * k++);
      });
      setTimeout(function () { status.textContent = 'chain valid'; status.classList.remove('bad'); tampered = -1; }, 120 * k + 100);
      btn.textContent = 'Tamper with a block';
    }
    btn.addEventListener('click', function () { if (tampered > -1) repair(); else tamper(); });

    var g = gate(host, function (run) {
      clearInterval(timer);
      if (run) timer = setInterval(appendBlock, 4500);
    });
  }

  /* chain-link connectors drawn between page sections */
  function chainLinks() {
    var main = $('main.wrap');
    if (!main) return;
    var secs = $$('main.wrap > .section');
    secs.forEach(function (sec, i) {
      if (i === 0) return;
      var d = document.createElement('div');
      d.className = 'chain-link'; d.setAttribute('aria-hidden', 'true');
      d.innerHTML = '<i></i>';
      main.insertBefore(d, sec);
    });
  }

  /* hex-alphabet scramble-to-resolve, once per heading */
  var HEX = '0123456789abcdef';
  function scrambleHead(head) {
    var h = head.querySelector('h2');
    if (!h || h.getAttribute('data-sc') || rm || paused) return;
    h.setAttribute('data-sc', '1');
    var text = h.textContent, n = text.length;
    h.innerHTML = '<span class="sc-wrap"><span class="sc-real hide">' + text + '</span><span class="sc-fx" aria-hidden="true"></span></span>';
    var real = h.querySelector('.sc-real'), fx = h.querySelector('.sc-fx'), i = 0;
    var tm = setInterval(function () {
      var out = text.slice(0, i);
      for (var j = i; j < n; j++) out += text[j] === ' ' ? ' ' : HEX[(Math.random() * 16) | 0];
      fx.textContent = out;
      if (i++ >= n) {
        clearInterval(tm);
        real.classList.remove('hide');
        fx.remove();
      }
    }, 32);
  }

  /* mempool -> block grid in the closing band */
  function buildMempool() {
    var band = $('.band');
    if (!band || rm) return;
    var grid = document.createElement('div');
    grid.className = 'mempool'; grid.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 32; i++) grid.appendChild(document.createElement('i'));
    var cap = document.createElement('div');
    cap.className = 'mp-cap'; cap.setAttribute('aria-hidden', 'true');
    band.insertBefore(cap, band.firstChild);
    band.insertBefore(grid, band.firstChild);
    var cells = $$('i', grid), blockNo = 1, count = 0, timer = null, hold = 0;
    cap.textContent = 'mempool \u00b7 0 / 32 transactions';
    function tick() {
      if (hold > 0) {
        if (--hold === 0) {
          cells.forEach(function (c) { c.classList.remove('on'); });
          grid.classList.remove('sealed'); count = 0; blockNo++;
        }
        return;
      }
      var add = 2 + ((Math.random() * 2) | 0);
      for (var k = 0; k < add && count < 32; k++) cells[count++].classList.add('on');
      cap.textContent = 'mempool \u00b7 ' + count + ' / 32 transactions';
      if (count >= 32) {
        grid.classList.add('sealed');
        cap.textContent = 'block #' + String(blockNo).padStart(3, '0') + ' sealed';
        hold = 7;
      }
    }
    gate(band, function (run) { clearInterval(timer); if (run) timer = setInterval(tick, 220); });
  }


  /* live block-height chip in the header */
  function heightChip() {
    var host = $('.topbar-end');
    if (!host || rm) return;
    var c = document.createElement('span');
    c.className = 'height-chip'; c.setAttribute('aria-hidden', 'true');
    var h = 0;
    function draw() { c.innerHTML = 'height <b>' + String(h).padStart(6, '0') + '</b>'; }
    h = 120000 + ((Math.random() * 800) | 0);
    draw();
    host.insertBefore(c, host.firstChild);
    addEventListener('brig-block', function () { h++; draw(); });
  }

  /* scrolling strip of recent block hashes */
  function buildTicker() {
    var hero = $('main.wrap > .hero');
    if (!hero || rm) return;
    var items = '', i, hx;
    for (i = 0; i < 16; i++) {
      hx = sha('ticker|' + i);
      items += '<span class="tk-item"><b>0x' + hx.slice(0, 6) + '\u2026' + hx.slice(-4) + '</b> \u2192 block ' + (120000 + i) + ' \u00b7 ' + (20 + ((parseInt(hx.slice(0, 2), 16) % 180))) + ' tx</span>';
    }
    var tk = document.createElement('div');
    tk.className = 'ticker'; tk.setAttribute('aria-hidden', 'true');
    tk.innerHTML = '<div class="tk-track">' + items + items + '</div>';
    hero.parentNode.insertBefore(tk, hero.nextSibling);
    gate(tk, function (run) { tk.classList.toggle('run', run); });
  }

  /* cursor spotlight position for tiles (fine pointers only) */
  function spotlight() {
    if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var raf = 0, tx = null, ev = null;
    document.addEventListener('pointermove', function (e) {
      ev = e;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var tile = ev.target.closest && ev.target.closest('.tile');
        if (!tile) return;
        var r = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        tile.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    }, { passive: true });
  }

  /* a tiny deterministic identicon from each track's hash */
  function identicons() {
    $$('#verts .tile').forEach(function (tile) {
      var name = (tile.querySelector('h3') || {}).textContent || 'x';
      var hx = sha('identicon|' + name), bits = '', i;
      for (i = 0; i < 8; i++) bits += ('0000' + parseInt(hx[i], 16).toString(2)).slice(-4);
      var cells = '', k = 0, x, y, on;
      for (y = 0; y < 5; y++) {
        for (x = 0; x < 3; x++) {
          on = bits[k++ % bits.length] === '1';
          if (!on) continue;
          cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1" rx=".15"/>';
          if (x < 2) cells += '<rect x="' + (4 - x) + '" y="' + y + '" width="1" height="1" rx=".15"/>';
        }
      }
      var svg = document.createElement('span');
      svg.innerHTML = '<svg class="ident" viewBox="0 0 5 5" fill="currentColor" aria-hidden="true">' + cells + '</svg>';
      tile.appendChild(svg.firstChild);
    });
  }

  /* validator network drawn behind the closing band */
  function buildNetwork() {
    var band = $('.band');
    if (!band || rm || !window.HTMLCanvasElement) return;
    var cv = document.createElement('canvas');
    cv.className = 'net-cv'; cv.setAttribute('aria-hidden', 'true');
    band.insertBefore(cv, band.firstChild);
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = 1;
    var nodes = [], edges = [], packets = [];
    var pal = { accent: '#2cc4b3', pop: '#ff5a3c', line: '#18414f' };
    function readPalette() {
      var cs = getComputedStyle(root);
      pal.accent = cs.getPropertyValue('--accent').trim() || pal.accent;
      pal.pop = cs.getPropertyValue('--pop').trim() || pal.pop;
      pal.line = cs.getPropertyValue('--line').trim() || pal.line;
    }
    function layout() {
      var r = band.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(12, Math.min(30, Math.round(W * H / 15000)));
      nodes = []; edges = []; packets = [];
      for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, p: 0 });
      var maxD = Math.min(170, Math.max(110, W / 6));
      for (var a = 0; a < n; a++) for (var b = a + 1; b < n; b++) {
        var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
        if (dx * dx + dy * dy < maxD * maxD) edges.push([a, b]);
      }
      for (var k = 0; k < Math.min(7, edges.length); k++) spawn();
    }
    function spawn() {
      if (!edges.length) return;
      var e = edges[(Math.random() * edges.length) | 0], fwd = Math.random() < .5;
      packets.push({ a: fwd ? e[0] : e[1], b: fwd ? e[1] : e[0], t: Math.random(), v: .006 + Math.random() * .008 });
    }
    function step() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1; ctx.globalAlpha = .35; ctx.strokeStyle = pal.line;
      ctx.beginPath();
      edges.forEach(function (e) { ctx.moveTo(nodes[e[0]].x, nodes[e[0]].y); ctx.lineTo(nodes[e[1]].x, nodes[e[1]].y); });
      ctx.stroke();
      ctx.globalAlpha = 1;
      packets.forEach(function (p, i) {
        p.t += p.v;
        var A = nodes[p.a], B = nodes[p.b];
        if (p.t >= 1) {
          B.p = 1;                                              // node pulses when a packet lands
          // continue along a random neighbouring edge, else respawn
          var opts = edges.filter(function (e) { return e[0] === p.b || e[1] === p.b; });
          if (opts.length) { var e = opts[(Math.random() * opts.length) | 0]; p.a = p.b; p.b = e[0] === p.b ? e[1] : e[0]; p.t = 0; }
          else { packets.splice(i, 1); spawn(); }
          return;
        }
        ctx.fillStyle = pal.pop;
        ctx.beginPath(); ctx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 2.4, 0, 6.2832); ctx.fill();
      });
      nodes.forEach(function (n) {
        ctx.fillStyle = pal.accent; ctx.globalAlpha = .9;
        ctx.beginPath(); ctx.arc(n.x, n.y, 2.6, 0, 6.2832); ctx.fill();
        if (n.p > 0.02) {
          ctx.globalAlpha = n.p * .6; ctx.strokeStyle = pal.accent;
          ctx.beginPath(); ctx.arc(n.x, n.y, 3 + (1 - n.p) * 14, 0, 6.2832); ctx.stroke();
          n.p *= .93;
        }
      });
      ctx.globalAlpha = 1;
    }
    var raf = 0, last = 0;
    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return;                              // ~30 fps
      last = now; step();
    }
    readPalette(); layout();
    step();                                                     // one static frame for paused/off-screen
    new MutationObserver(function () { readPalette(); step(); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    var rt = 0;
    addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { layout(); step(); }, 200); });
    gate(band, function (run) {
      cancelAnimationFrame(raf);
      if (run) raf = requestAnimationFrame(loop);
    });
  }


  /* hero title: per-letter rise + hex-noise resolve, then a single shine */
  function heroTitle() {
    var h = $('.hero h1');
    if (!h || rm || paused) return;
    var original = h.innerHTML, full = h.textContent.replace(/\s+/g, ' ').trim();
    var idx = 0, chars = [];

    function words(text, wrap, grad) {
      var parts = text.split(/(\s+)/);
      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { wrap.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span'); w.className = 'w' + (grad ? ' g' : '');
        for (var k = 0; k < part.length; k++) {
          var c = document.createElement('span');
          c.className = 'c'; c.textContent = part[k];
          c.style.setProperty('--i', idx++);
          c.setAttribute('data-f', HEXA[(Math.random() * 16) | 0]);
          w.appendChild(c); chars.push(c);
        }
        wrap.appendChild(w);
      });
    }
    var frag = document.createDocumentFragment();
    Array.prototype.forEach.call(h.childNodes, function (n) {
      if (n.nodeType === 3) words(n.textContent, frag, false);
      else if (n.nodeName === 'BR') frag.appendChild(document.createElement('br'));
      else if (n.nodeType === 1) words(n.textContent, frag, n.classList.contains('grad-text'));
    });
    h.setAttribute('aria-label', full);
    h.innerHTML = '';
    h.appendChild(frag);
    Array.prototype.forEach.call(h.children, function (el) { el.setAttribute('aria-hidden', 'true'); });
    h.classList.add('t-fx');

    var t0 = Date.now(), total = 80 + idx * 30 + 420 + 700;
    var tm = setInterval(function () {
      var now = Date.now() - t0;
      chars.forEach(function (c, i) {
        if (c.classList.contains('r')) return;
        var start = 80 + i * 30, done = start + 420;
        if (now >= done) c.classList.add('r');
        else if (now >= start) c.setAttribute('data-f', HEXA[(Math.random() * 16) | 0]);
      });
      if (now >= total) {
        clearInterval(tm);
        h.innerHTML = original;
        h.classList.remove('t-fx');
        h.removeAttribute('aria-label');
        var g = h.querySelector('.grad-text');
        if (g) { g.classList.add('shine'); setTimeout(function () { g.classList.remove('shine'); }, 1900); }
      }
    }, 45);
  }
  var HEXA = '0123456789abcdef';

  /* a real pause control for the ambient loops (WCAG 2.2.2) */
  function motionToggle() {
    var host = $('.flinks');
    if (!host || rm) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'motion-toggle';
    function label() { b.textContent = paused ? 'Resume motion' : 'Pause motion'; b.setAttribute('aria-pressed', paused ? 'true' : 'false'); }
    label();
    b.addEventListener('click', function () {
      paused = !paused;
      try { localStorage.setItem('brig-motion', paused ? 'paused' : 'on'); } catch (e) {}
      label();
      dispatchEvent(new Event('brig-motion'));
    });
    host.appendChild(b);
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
  heroTitle();
  chainLinks();
  buildChain();
  heightChip();
  buildTicker();
  identicons();
  spotlight();
  buildMempool();
  buildNetwork();
  motionToggle();
  scrollReveal();
  if (!reduce) scrubbed();
})();
