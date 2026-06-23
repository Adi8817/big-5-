// ============================================================
// BIG 5 AFRICA SAFARI — main.js
// WA float, FAQ accordion, itinerary accordion, map tabs,
// testimonial slider, tour favs, image fallback
// ============================================================
(function () {
  'use strict';

  // ---- WhatsApp float ----
  var waFloat  = document.getElementById('waFloat');
  var waBubble = document.getElementById('waBubble');
  var waClose  = document.getElementById('waClose');
  if (waBubble && waFloat) waBubble.addEventListener('click', function () { waFloat.classList.toggle('open'); });
  if (waClose  && waFloat) waClose.addEventListener('click', function ()  { waFloat.classList.remove('open'); });

  // ---- FAQ accordion (contact page) ----
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.faq-item');
      var body   = item.querySelector('.faq-body');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-body').style.maxHeight = '0';
        o.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 24 + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Itinerary day accordion (package page) ----
  document.querySelectorAll('.day-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.day-item');
      var body   = item.querySelector('.day-body');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.day-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.day-body').style.maxHeight = '0';
        o.querySelector('.day-btn').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 32 + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Open first day item on load (after layout is ready)
  requestAnimationFrame(function () {
    var first = document.querySelector('.day-item.open');
    if (first) {
      var b = first.querySelector('.day-body');
      if (b) b.style.maxHeight = b.scrollHeight + 32 + 'px';
    }
  });

  // ---- Map tabs (contact page) ----
  var OFFICES = {
    toronto:  { src: 'https://maps.google.com/maps?q=Toronto,Ontario,Canada&output=embed&z=12',   title: '🇨🇦 Toronto HQ — Canada',           addr: 'Toronto, Ontario, Canada · M4X 1G3',          phone: '+1 437 217 2330',                   hours: 'Mon–Fri: 8 AM–4 PM EST · Sat: 8 AM–12 PM EST' },
    nairobi:  { src: 'https://maps.google.com/maps?q=Nairobi,Kenya&output=embed&z=12',            title: '🇰🇪 Nairobi — Kenya Field Office',    addr: 'Nairobi, Kenya',                              phone: '+255 781 800 878 (WhatsApp)',        hours: 'Open daily · 24/7 WhatsApp support' },
    arusha:   { src: 'https://maps.google.com/maps?q=Arusha,Tanzania&output=embed&z=12',          title: '🇹🇿 Arusha — Tanzania Field Office',  addr: 'Arusha, Tanzania (Kilimanjaro Gateway)',      phone: '+255 781 800 878 (WhatsApp)',        hours: 'Open daily · 24/7 WhatsApp support' },
    zanzibar: { src: 'https://maps.google.com/maps?q=Zanzibar,Tanzania&output=embed&z=11',        title: '🏝️ Zanzibar — Coastal Operations',    addr: 'Stone Town, Zanzibar, Tanzania',              phone: '+255 781 800 878 (WhatsApp)',        hours: 'Open daily · 24/7 WhatsApp support' }
  };

  var mapFrame = document.getElementById('mapFrame');
  var mapTitle = document.getElementById('mapTitle');
  var mapAddr  = document.getElementById('mapAddr');
  var mapPhone = document.getElementById('mapPhone');
  var mapHours = document.getElementById('mapHours');
  var mapTabs  = document.getElementById('mapTabs');

  if (mapTabs) {
    mapTabs.addEventListener('click', function (e) {
      var btn  = e.target.closest('.map-tab');
      if (!btn) return;
      var info = OFFICES[btn.dataset.office];
      if (!info) return;
      document.querySelectorAll('.map-tab').forEach(function (t) { t.classList.remove('active'); });
      btn.classList.add('active');
      if (mapFrame) mapFrame.src = info.src;
      if (mapTitle) mapTitle.textContent = info.title;
      if (mapAddr)  mapAddr.querySelector('span').innerHTML  = '<strong>Address</strong>' + info.addr;
      if (mapPhone) mapPhone.querySelector('span').innerHTML = '<strong>Phone</strong>'   + info.phone;
      if (mapHours) mapHours.querySelector('span').innerHTML = '<strong>Hours</strong>'   + info.hours;
    });
  }

  // ---- Tour card wishlist toggle ----
  document.querySelectorAll('.tour-fav').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.classList.toggle('on');
    });
  });

  // ---- Testimonials slider (homepage) ----
  var track    = document.getElementById('testiTrack');
  var prevBtn  = document.getElementById('testiPrev');
  var nextBtn  = document.getElementById('testiNext');
  var dotsWrap = document.getElementById('testiDots');

  if (track && prevBtn && nextBtn && dotsWrap) {
    var cards = track.querySelectorAll('.testi-card');
    var total = cards.length;
    var index = 0;
    var autoTimer = null;

    function perView() {
      if (window.innerWidth <= 760) return 1;
      if (window.innerWidth <= 960) return 2;
      return 3;
    }
    function maxIndex() { return Math.max(0, total - perView()); }

    function buildDots() {
      dotsWrap.innerHTML = '';
      var mx = maxIndex();
      for (var i = 0; i <= mx; i++) {
        var d = document.createElement('button');
        d.className = 'testi-dot' + (i === index ? ' active' : '');
        d.setAttribute('aria-label', 'Go to review group ' + (i + 1));
        (function (n) { d.addEventListener('click', function () { go(n); }); })(i);
        dotsWrap.appendChild(d);
      }
    }

    function update() {
      var card = track.querySelector('.testi-card');
      if (!card) return;
      var style = window.getComputedStyle(card);
      var step  = card.offsetWidth + parseFloat(style.marginRight || 0);
      track.style.transform = 'translateX(' + (-index * step) + 'px)';
      dotsWrap.querySelectorAll('.testi-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    }

    function go(n) {
      var mx = maxIndex();
      index = n < 0 ? mx : (n > mx ? 0 : n);
      update();
      restartAuto();
    }

    function restartAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { go(index + 1); }, 5500);
    }

    prevBtn.addEventListener('click', function () { go(index - 1); });
    nextBtn.addEventListener('click', function () { go(index + 1); });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (index > maxIndex()) index = maxIndex();
        buildDots();
        update();
      }, 150);
    });

    buildDots();
    update();
    restartAuto();
  }

  // ---- Image fallback (.ph img — homepage photo tiles) ----
  document.querySelectorAll('.ph img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) img.setAttribute('data-failed', '1');
    img.addEventListener('error', function () { img.setAttribute('data-failed', '1'); });
  });

}());
