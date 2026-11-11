(function () {
  var KEY = 'lang';
  var COMMON = {
    'Menu': 'Meni',
    'Main page': 'Početna',
    'Projects': 'Projekti',
    'About me': 'O meni',
    'Professional': 'Profesionalno',
    'Personal': 'Lično',
    'Contact': 'Kontakt',
    'Back to projects': 'Nazad na projekte',
    'Back to main page': 'Nazad na početnu'
  };

  document.querySelectorAll('.menu summary, .panel a, .back').forEach(function (el) {
    var t = el.textContent.trim();
    if (!el.hasAttribute('data-bs') && COMMON[t]) el.setAttribute('data-bs', COMMON[t]);
  });

  if (!document.querySelector('.lang-switch')) {
    var sw = document.createElement('div');
    sw.className = 'lang-switch';
    sw.setAttribute('role', 'group');
    sw.setAttribute('aria-label', 'Language');
    sw.innerHTML =
      '<button type="button" class="lang-opt" data-lang="en" aria-pressed="true">EN</button>' +
      '<button type="button" class="lang-opt" data-lang="bs" aria-pressed="false">BS</button>';

    var header = document.querySelector('header.bar') ||
                 document.querySelector('.bar') ||
                 document.querySelector('header') ||
                 document.querySelector('nav');

    if (header) {
      var menu = header.querySelector('.menu, details');
      if (menu && menu.parentNode === header) {
        header.insertBefore(sw, menu);
      } else {
        header.appendChild(sw);
      }
    } else {
      sw.style.position = 'fixed';
      sw.style.top = '14px';
      sw.style.right = '14px';
      sw.style.zIndex = '1000';
      sw.style.background = 'rgba(255,255,255,.85)';
      document.body.appendChild(sw);
    }
  }

  var opts = document.querySelectorAll('.lang-opt');
  var els = document.querySelectorAll('[data-bs]');

  els.forEach(function (el) {
    el.setAttribute('data-en', el.innerHTML);
  });

  function apply(lang) {
    els.forEach(function (el) {
      el.innerHTML = lang === 'bs' ? el.getAttribute('data-bs') : el.getAttribute('data-en');
    });
    document.documentElement.lang = lang;
    opts.forEach(function (o) {
      o.setAttribute('aria-pressed', o.dataset.lang === lang ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  apply(saved);

  opts.forEach(function (o) {
    o.addEventListener('click', function () { apply(o.dataset.lang); });
  });
})();