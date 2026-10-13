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
    var viz = $('.chainviz .lchain') || $('.chainviz svg');
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

    var chain = [], tampered = -1, timer = null, busy = false;
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
      if (busy || tampered > -1) return;
      busy = true;
      var b = push(), node = el(b, true);
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
  chainLinks();
  buildChain();
  buildMempool();
  motionToggle();
  scrollReveal();
  if (!reduce) scrubbed();
})();
