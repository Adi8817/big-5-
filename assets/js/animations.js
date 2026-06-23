// ============================================================
// BIG 5 AFRICA SAFARI — animations.js
// Scroll-triggered reveal using IntersectionObserver
// ============================================================
(function () {
  'use strict';

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });

  } else {
    // Fallback for older browsers
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = reveals.length - 1; i >= 0; i--) {
        var r = reveals[i].getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) {
          reveals[i].classList.add('in');
          reveals.splice(i, 1);
        }
      }
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check();
    // Failsafe: ensure visibility after 1.6s regardless
    setTimeout(function () {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }, 1600);
  }

}());
