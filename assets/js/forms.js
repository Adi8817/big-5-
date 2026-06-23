// ============================================================
// BIG 5 AFRICA SAFARI — forms.js
// Country dropdown, dial-code CC picker, form validation
// ============================================================
(function () {
  'use strict';

  // ---- Country & dial-code data ----
  var COUNTRIES = [
    ['Canada','CA','+1','🇨🇦'],['United States','US','+1','🇺🇸'],['United Kingdom','GB','+44','🇬🇧'],
    ['Australia','AU','+61','🇦🇺'],['Germany','DE','+49','🇩🇪'],['France','FR','+33','🇫🇷'],
    ['Spain','ES','+34','🇪🇸'],['Italy','IT','+39','🇮🇹'],['Netherlands','NL','+31','🇳🇱'],
    ['Belgium','BE','+32','🇧🇪'],['Switzerland','CH','+41','🇨🇭'],['Austria','AT','+43','🇦🇹'],
    ['Ireland','IE','+353','🇮🇪'],['Sweden','SE','+46','🇸🇪'],['Norway','NO','+47','🇳🇴'],
    ['Denmark','DK','+45','🇩🇰'],['Finland','FI','+358','🇫🇮'],['Portugal','PT','+351','🇵🇹'],
    ['Poland','PL','+48','🇵🇱'],['Czechia','CZ','+420','🇨🇿'],['Greece','GR','+30','🇬🇷'],
    ['United Arab Emirates','AE','+971','🇦🇪'],['Saudi Arabia','SA','+966','🇸🇦'],['Qatar','QA','+974','🇶🇦'],
    ['India','IN','+91','🇮🇳'],['Pakistan','PK','+92','🇵🇰'],['China','CN','+86','🇨🇳'],
    ['Japan','JP','+81','🇯🇵'],['South Korea','KR','+82','🇰🇷'],['Singapore','SG','+65','🇸🇬'],
    ['Malaysia','MY','+60','🇲🇾'],['Indonesia','ID','+62','🇮🇩'],['Thailand','TH','+66','🇹🇭'],
    ['Philippines','PH','+63','🇵🇭'],['New Zealand','NZ','+64','🇳🇿'],['South Africa','ZA','+27','🇿🇦'],
    ['Kenya','KE','+254','🇰🇪'],['Tanzania','TZ','+255','🇹🇿'],['Uganda','UG','+256','🇺🇬'],
    ['Rwanda','RW','+250','🇷🇼'],['Nigeria','NG','+234','🇳🇬'],['Egypt','EG','+20','🇪🇬'],
    ['Morocco','MA','+212','🇲🇦'],['Brazil','BR','+55','🇧🇷'],['Argentina','AR','+54','🇦🇷'],
    ['Mexico','MX','+52','🇲🇽'],['Israel','IL','+972','🇮🇱'],['Turkey','TR','+90','🇹🇷'],
    ['Russia','RU','+7','🇷🇺']
  ];

  // ---- Populate "Your Country" select ----
  var countrySel = document.getElementById('f-country');
  if (countrySel) {
    var sorted = COUNTRIES.slice().sort(function (a, b) { return a[0].localeCompare(b[0]); });
    sorted.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c[0];
      o.textContent = c[3] + '  ' + c[0];
      countrySel.appendChild(o);
    });
  }

  // ---- Country-code popup ----
  var cc       = document.getElementById('cc');
  var ccBtn    = document.getElementById('ccBtn');
  var ccPop    = document.getElementById('ccPop');
  var ccList   = document.getElementById('ccList');
  var ccSearch = document.getElementById('ccSearch');
  var ccFlag   = document.getElementById('ccFlag');
  var ccDial   = document.getElementById('ccDial');

  function renderCC(filter) {
    if (!ccList) return;
    var q = (filter || '').trim().toLowerCase();
    var list = COUNTRIES.filter(function (c) {
      return !q || c[0].toLowerCase().indexOf(q) > -1 || c[2].indexOf(q) > -1;
    });
    if (!list.length) {
      ccList.innerHTML = '<div class="cc-empty">No match</div>';
      return;
    }
    ccList.innerHTML = list.map(function (c) {
      return '<button type="button" class="cc-item" data-dial="' + c[2] + '" data-flag="' + c[3] + '">' +
        '<span class="flag">' + c[3] + '</span>' +
        '<span class="nm">' + c[0] + '</span>' +
        '<span class="dial">' + c[2] + '</span>' +
        '</button>';
    }).join('');
  }

  function openCC() {
    if (!cc) return;
    cc.classList.add('open');
    if (ccBtn) ccBtn.setAttribute('aria-expanded', 'true');
    renderCC('');
    if (ccSearch) { ccSearch.value = ''; setTimeout(function () { ccSearch.focus(); }, 30); }
  }
  function closeCC() {
    if (!cc) return;
    cc.classList.remove('open');
    if (ccBtn) ccBtn.setAttribute('aria-expanded', 'false');
  }

  if (ccBtn) {
    ccBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      cc.classList.contains('open') ? closeCC() : openCC();
    });
  }
  if (ccSearch) ccSearch.addEventListener('input', function () { renderCC(ccSearch.value); });
  if (ccList) {
    ccList.addEventListener('click', function (e) {
      var item = e.target.closest('.cc-item');
      if (!item) return;
      if (ccFlag) ccFlag.textContent = item.dataset.flag;
      if (ccDial) ccDial.textContent = item.dataset.dial;
      closeCC();
      var phoneInput = document.getElementById('f-phone');
      if (phoneInput) phoneInput.focus();
    });
  }
  if (cc) {
    document.addEventListener('click', function (e) { if (!cc.contains(e.target)) closeCC(); });
  }

  // ---- Generic form validation ----
  function wireForm(formId, successId) {
    var form    = document.getElementById(formId);
    var success = document.getElementById(successId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var f  = el.closest('.field');
        var ok = el.value && el.value.trim() !== '';
        if (el.type === 'email') ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
        if (f) f.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        var bad = form.querySelector('.invalid input, .invalid select');
        if (bad) bad.focus();
        return;
      }
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        var f = el.closest('.field');
        if (f) f.classList.remove('invalid');
      });
    });
  }

  wireForm('inquiryForm', 'formSuccess');
  wireForm('contactForm', 'formSuccess');

  // ---- Package page sidebar form ----
  var sidebarForm = document.getElementById('sidebarForm');
  var sbSuccess   = document.getElementById('sbSuccess');
  if (sidebarForm) {
    sidebarForm.addEventListener('submit', function (e) {
      e.preventDefault();
      sidebarForm.querySelectorAll('input, select').forEach(function (f) { f.style.display = 'none'; });
      sidebarForm.querySelectorAll('button[type="submit"]').forEach(function (b) { b.style.display = 'none'; });
      var note = sidebarForm.querySelector('.form-note-sm');
      if (note) note.style.display = 'none';
      var waBtn = sidebarForm.parentElement && sidebarForm.parentElement.querySelector('.btn-wa');
      if (waBtn) waBtn.style.display = 'none';
      if (sbSuccess) sbSuccess.style.display = 'block';
      var heads = sidebarForm.parentElement
        ? sidebarForm.parentElement.querySelectorAll('.sdb-form-head, .sdb-form-sub')
        : [];
      heads.forEach(function (el) { el.style.display = 'none'; });
    });
  }

}());
