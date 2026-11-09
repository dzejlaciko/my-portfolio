(function () {
  var KEY = 'lang';
  var btn = document.getElementById('langBtn');
  var els = document.querySelectorAll('[data-bs]');

  els.forEach(function (el) {
    el.setAttribute('data-en', el.innerHTML);
  });

  function apply(lang) {
    els.forEach(function (el) {
      el.innerHTML = lang === 'bs' ? el.getAttribute('data-bs') : el.getAttribute('data-en');
    });
    document.documentElement.lang = lang;
    if (btn) btn.textContent = lang === 'bs' ? 'EN' : 'BS';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  apply(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      apply(document.documentElement.lang === 'bs' ? 'en' : 'bs');
    });
  }
})();