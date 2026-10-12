(function () {
  'use strict';

  /* ------------------------------------------------------------------
     EDIT THESE FOUR THINGS. Everything else is generated.
     ------------------------------------------------------------------ */

  // 1. Paste the Google Form link here (keep the quotes).
  var FORM_URL = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=o835AF4H5USqC6ujrdZTn9yJqd4nikpDkVUzoL1Fjy1UNjFDWkNEUUM5QTVWSVRKTFpPUVgzWFdFNi4u';

  // 2. Set to false once the site has been launched publicly, so that
  //    visitors skip the genesis gate and land straight on the chain.
  var SHOW_GATE = true;

  // 3. SHA-256 commitments for the problem statements.
  //    Leave the strings empty until you have hashed the real statements.
  //    Generate one with:  shasum -a 256 statement-forensics.txt
  var COMMITMENTS = {
    forensics: '',
    osint: '',
    dapps: '',
    nft: '',
    security: '',
    metaverse: ''
  };

  // 4. The date the commitments are published, shown while they are empty.
  var COMMIT_DATE = 'to be announced';

  /* ------------------------------------------------------------------ */

  var REGISTRATION_OPEN = new Date('2026-11-14T04:30:00Z');
  var HACK_START = new Date('2026-12-19T06:30:00Z');

  var VERTICALS = [
    { key: 'forensics', name: 'Crypto and blockchain forensics', desc: 'Follow the money. Trace transactions, read wallet behaviour, spot what does not add up.' },
    { key: 'osint', name: 'OSINT and blockchain', desc: 'Open-source intelligence pointed at on-chain data: provenance, attribution, investigation.' },
    { key: 'dapps', name: 'DApps', desc: 'Decentralised applications that solve something real, for people who are not crypto traders.' },
    { key: 'nft', name: 'NFTs', desc: 'Applications where the token actually does work. Artwork and whitepapers alone will not get far here.' },
    { key: 'security', name: 'Blockchain security', desc: 'Contract vulnerabilities, protocol risk, wallet security, access control. Break things, then fix them.' },
    { key: 'metaverse', name: 'Metaverse', desc: 'Identity, ownership and trust inside immersive environments, backed by a chain.' }
  ];

  var TIMELINE = [
    { date: 'OCT 13', title: 'This page goes live', desc: 'Dates and verticals announced. Genesis block mined.', done: true },
    { date: 'NOV 14', title: 'Registration opens', desc: 'All seven problem statements released, along with the fee and the full rulebook.' },
    { date: 'NOV 30', title: 'Idea submissions close', desc: 'Send us an abstract for the vertical you picked. This is what you will build.' },
    { date: 'EARLY DEC', title: 'We tell you if you are in', desc: 'Confirmed teams announced. Jury and mentors named around the same time.' },
    { date: 'DEC 19', title: 'The long day begins', desc: 'Orientation at 9 a.m., coffee, workspace allocation. Clock starts at noon.' },
    { date: 'DEC 20', title: 'Demos, then results', desc: 'Hands off keyboards at noon. Show us what survived the night.' }
  ];

  var PENDING = [
    { n: 'BLOCK #006', title: 'The fee', desc: 'Still being worked out with the institution. We will publish it the day registration opens, not before.', when: 'by 14 November' },
    { n: 'BLOCK #007', title: 'Prize money', desc: 'A substantial pool has been proposed and is awaiting approval. We would rather confirm it than advertise it.', when: 'announced soon' }
  ];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- the genesis gate ---------- */

  var body = document.body;
  var unlocked = SHOW_GATE === false ||
    localStorage.getItem('bc26-genesis') === '1' ||
    location.search.indexOf('live') > -1;

  body.setAttribute('data-state', unlocked ? 'live' : 'locked');

  var mine = $('#mine');
  if (mine) {
    mine.addEventListener('click', function () {
      localStorage.setItem('bc26-genesis', '1');
      body.setAttribute('data-state', 'live');
      window.scrollTo(0, 0);
      start();
    });
  }

  /* ---------- rendering ---------- */

  function renderVerticals() {
    var ul = $('#verts');
    if (!ul) return;
    var html = VERTICALS.map(function (v) {
      var h = COMMITMENTS[v.key];
      var right = h
        ? '<span class="vert-hash">' + h.slice(0, 6) + '&hellip;' + h.slice(-4) + '</span>'
        : '<span class="vert-hash">sealed</span>';
      return '<li class="vert"><span class="vert-name">' + v.name + '</span>' + right +
        '<p class="vert-desc">' + v.desc + '</p></li>';
    }).join('');

    html += '<li class="vert vert-open"><span class="vert-name">Student innovation</span>' +
      '<span class="vert-hash">open</span>' +
      '<p class="vert-desc">Bring your own problem. Just make it original, genuinely blockchain-shaped, and buildable in a day.</p></li>';

    ul.innerHTML = html;

    var committed = Object.keys(COMMITMENTS).some(function (k) { return COMMITMENTS[k]; });
    var tag = $('[data-commit-tag]');
    var note = $('[data-commit-note]');
    if (committed) {
      if (tag) { tag.textContent = 'COMMITTED'; tag.className = 'mono tag-ok'; }
    } else if (note) {
      note.innerHTML = 'Pick one. Six come with a problem statement from us, published on 14 November \u2014 ' +
        'and we will post a SHA-256 fingerprint of each one beforehand (' + COMMIT_DATE + ') so you can check ' +
        'we did not quietly rewrite them. The seventh is yours to define.';
    }
  }

  function renderTimeline() {
    var ol = $('#timeline');
    if (!ol) return;
    var now = Date.now();
    ol.innerHTML = TIMELINE.map(function (t) {
      var done = t.done || (t.at && now > t.at);
      return '<li class="tl' + (done ? ' done' : '') + '">' +
        '<span class="tl-date">' + t.date + '</span>' +
        '<div class="tl-title">' + t.title + '</div>' +
        '<p class="tl-desc">' + t.desc + '</p></li>';
    }).join('');
  }

  function renderPending() {
    var w = $('#pcards');
    if (!w) return;
    w.innerHTML = PENDING.map(function (p) {
      return '<div class="pcard"><span class="pn">' + p.n + '</span> <span class="ps">PENDING</span>' +
        '<h3>' + p.title + '</h3><p>' + p.desc + '</p>' +
        '<span class="pd">' + p.when + '</span></div>';
    }).join('');
  }

  function wireForm() {
    $$('[data-form]').forEach(function (a) {
      if (FORM_URL) {
        a.setAttribute('href', FORM_URL);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      } else {
        a.setAttribute('href', 'https://www.instagram.com/brig.amrita');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
    });
  }

  /* ---------- countdown ---------- */

  var timer = null;

  function countdown() {
    var now = Date.now();
    var target = now < REGISTRATION_OPEN.getTime() ? REGISTRATION_OPEN : HACK_START;
    var label = target === REGISTRATION_OPEN ? 'until registration opens' : 'until hacking begins';
    var t = $('#ctarget');
    if (t) t.textContent = label;

    var diff = Math.max(0, target.getTime() - now);
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400);
    var h = Math.floor((s % 86400) / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;

    var set = function (k, v) {
      var el = $('[data-c="' + k + '"]');
      if (el) el.textContent = String(v).padStart(2, '0');
    };
    set('d', d); set('h', h); set('m', m); set('s', sec);
  }

  /* ---------- real block hashes ---------- */

  function sha256(text) {
    if (!window.crypto || !crypto.subtle) return Promise.resolve(null);
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      .then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('');
      })
      .catch(function () { return null; });
  }

  function fallbackHash(text) {
    var a = 0x811c9dc5, out = '';
    for (var i = 0; i < text.length; i++) {
      a ^= text.charCodeAt(i);
      a = (a * 0x01000193) >>> 0;
    }
    for (var j = 0; j < 8; j++) {
      a = (a * 0x01000193 + j) >>> 0;
      out += a.toString(16).padStart(8, '0');
    }
    return out;
  }

  function chainHashes() {
    var blocks = $$('.block');
    var prev = '0'.repeat(64);
    var step = function (i) {
      if (i >= blocks.length) return;
      var slot = $('[data-hash]', blocks[i]);
      if (!slot) { step(i + 1); return; }
      var payload = prev + '|' + (blocks[i].id || i) + '|' +
        (blocks[i].textContent || '').replace(/\s+/g, ' ').trim();
      sha256(payload).then(function (hex) {
        var h = hex || fallbackHash(payload);
        prev = h;
        slot.textContent = '0x' + h.slice(0, 8) + '…' + h.slice(-6);
        slot.setAttribute('title', '0x' + h);
        step(i + 1);
      });
    };
    step(0);

    var stat = $('#chainstat');
    if (stat) stat.textContent = 'chain height ' + String(blocks.length - 1).padStart(3, '0') + ' · synced';
  }

  /* ---------- scroll reveal ---------- */

  function scrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = $$('.block, .pcard, .link');
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('in'); }, i * 50);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- boot ---------- */

  var started = false;

  function start() {
    if (started) return;
    started = true;
    renderVerticals();
    renderTimeline();
    renderPending();
    wireForm();
    countdown();
    timer = setInterval(countdown, 1000);
    chainHashes();
    scrollReveal();

    var ts = $('#genesis-ts');
    if (ts) {
      var saved = localStorage.getItem('bc26-ts');
      if (!saved) { saved = new Date().toISOString().slice(0, 16).replace('T', ' '); localStorage.setItem('bc26-ts', saved); }
      ts.textContent = saved + ' IST';
    }
  }

  if (unlocked) start();
})();
