// ============================================================
// BIG 5 AFRICA SAFARI — navigation.js
// Sticky nav, mobile drawer, language dropdown, active link highlight
// ============================================================
(function () {
  'use strict';

  // ---- Sticky nav scroll class ----
  var nav = document.getElementById('nav');
  if (nav) {
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile drawer ----
  var drawer = document.getElementById('drawer');
  var hamburger = document.getElementById('hamburger');
  var drawerClose = document.getElementById('drawerClose');
  var drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (!drawer || !hamburger) return;
    drawer.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer || !hamburger) return;
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  // ---- Language dropdown (visual only) ----
  var lang = document.getElementById('lang');
  var langBtn = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  var langLabel = document.getElementById('langLabel');
  if (langBtn && lang) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = lang.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (langMenu) {
      langMenu.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          langMenu.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          if (langLabel) langLabel.textContent = b.dataset.lang;
          lang.classList.remove('open');
          langBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
    document.addEventListener('click', function (e) {
      if (lang && !lang.contains(e.target)) lang.classList.remove('open');
    });
  }

  // ---- Active nav link on scroll (homepage anchor navigation) ----
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  if (navLinks.length) {
    var sections = navLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    function highlight() {
      var pos = window.scrollY + 150;
      var current = sections[0];
      sections.forEach(function (s) { if (s && s.offsetTop <= pos) current = s; });
      navLinks.forEach(function (a) {
        a.classList.toggle('active', !!(current && '#' + current.id === a.getAttribute('href')));
      });
    }
    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
  }

}());

if (window.innerWidth <= 991) {

  document.querySelectorAll('.submenu-toggle').forEach(btn => {

    btn.addEventListener('click', function(e) {

      e.preventDefault();
      e.stopPropagation();

      const parent = this.closest('.has-dropdown');

      parent.classList.toggle('active');

    });

  });

}