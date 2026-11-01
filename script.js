(function () {
  var d = document;
  d.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. things fade and float in as you scroll */
  var sel = '.card, .blk, .tl li, .interests li, .contact, .lede, .tabs, h2, .marquee, .facts li';
  var els = d.querySelectorAll(sel);
  els.forEach(function (el) {
    el.classList.add('reveal');
    var idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty('--i', Math.min(idx, 6));
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* 2. stickers and photos drift with the mouse, plus a sparkle trail */
  var touch = window.matchMedia('(pointer: coarse)').matches;
  if (!reduce && !touch) {
    var movers = d.querySelectorAll('[data-depth]');
    d.addEventListener('mousemove', function (e) {
      var x = e.clientX / window.innerWidth - 0.5;
      var y = e.clientY / window.innerHeight - 0.5;
      movers.forEach(function (m) {
        var k = +m.dataset.depth;
        m.style.translate = (x * k) + 'px ' + (y * k) + 'px';
      });
    });

    var last = 0, marks = ['✦', '✧', '♡', '✿'];
    d.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - last < 70) return;
      last = now;
      var s = d.createElement('span');
      s.className = 'spark';
      s.textContent = marks[Math.floor(Math.random() * marks.length)];
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      d.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 900);
    });
  }
})();