(function () {
  'use strict';

  var HACK_START = new Date('2026-12-19T06:30:00Z');

  var el = document.getElementById('ec-days');
  if (el) {
    var ms = HACK_START.getTime() - Date.now();
    var days = Math.max(0, Math.ceil(ms / 86400000));
    el.textContent = days;
    var wrap = document.getElementById('ec-count');
    if (wrap) wrap.setAttribute('aria-label', days + ' days until BlockCatalyst 2026');
  }

  if (!('IntersectionObserver' in window)) return;

  var targets = Array.prototype.slice.call(
    document.querySelectorAll('.hsection, .eventcard, .area')
  );
  targets.forEach(function (t) { t.classList.add('reveal'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('in'); }, i * 50);
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  targets.forEach(function (t) { io.observe(t); });
})();
