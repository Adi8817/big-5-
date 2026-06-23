// ============================================================
// BIG 5 AFRICA SAFARI — slider.js
// Package page image carousel with thumbnails and auto-advance
// ============================================================
(function () {
  'use strict';

  var sliderMain = document.getElementById('sliderMain');
  if (!sliderMain) return;

  var slides = Array.prototype.slice.call(sliderMain.querySelectorAll('.slide'));
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('#thumbsRow .thumb'));
  var counter = document.getElementById('slideCounter');
  var prevBtn = document.getElementById('sliderPrev');
  var nextBtn = document.getElementById('sliderNext');
  var current = 0;
  var autoTimer;

  function goTo(n) {
    if (!slides[current]) return;
    slides[current].classList.remove('active');
    if (thumbs[current]) thumbs[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (thumbs[current]) {
      thumbs[current].classList.add('active');
    }
    if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
  }

  function startAuto() {
    autoTimer = setInterval(function () { goTo(current + 1); }, 4800);
  }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

  thumbs.forEach(function (th) {
    th.addEventListener('click', function () {
      goTo(parseInt(th.dataset.index, 10) || 0);
      resetAuto();
    });
  });

  startAuto();

}());
