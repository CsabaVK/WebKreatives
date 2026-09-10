/* ─── WebKreatives — Region, currency and the language it implies ─────────────
 * Loaded before site-nav.js, because the nav asks this module which language
 * to open in.
 *
 * Detection is done entirely on the device: the IANA timezone the browser
 * already reports, with the browser's own language as a second opinion. No
 * request goes to a geo-IP service, so no visitor IP is handed to a third
 * party and nothing here needs consent — it reads a setting the browser
 * already volunteers and stores a preference.
 *
 *   United States  -> prices in USD, English
 *   Netherlands    -> prices in EUR, Dutch
 *   anywhere else  -> prices in EUR, English
 *
 * A visitor's own choice always wins over detection and is remembered.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var CKEY = 'wk-currency';
  var RKEY = 'wk-region';

  /* ── Where is this person? ──────────────────────────────────────────── */

  /* The mainland zones plus the ones people actually run their machines on.
     A miss here is not a failure: an unrecognised zone reads as "somewhere
     else", which lands on the EUR/English default, and the currency switcher
     in the nav is always there to correct it. */
  var US_ZONES = [
    'America/New_York', 'America/Detroit', 'America/Chicago', 'America/Denver',
    'America/Los_Angeles', 'America/Phoenix', 'America/Anchorage', 'America/Boise',
    'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat',
    'America/Nome', 'America/Adak', 'America/Menominee', 'Pacific/Honolulu'
  ];

  function zone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; }
    catch (e) { return ''; }
  }

  function regionFromZone() {
    var z = zone();
    if (!z) return '';
    if (z === 'Europe/Amsterdam') return 'NL';
    if (US_ZONES.indexOf(z) > -1) return 'US';
    /* the grouped zones (America/Indiana/Knox, America/North_Dakota/Beulah)
       and the deprecated US/ aliases */
    if (/^America\/(Indiana|Kentucky|North_Dakota)\//.test(z)) return 'US';
    if (/^US\//.test(z)) return 'US';
    return '';
  }

  function regionFromLanguage() {
    var langs = [];
    if (navigator.languages && navigator.languages.length) langs = [].slice.call(navigator.languages);
    else if (navigator.language) langs = [navigator.language];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).toLowerCase();
      if (l === 'nl' || l.indexOf('nl-') === 0) return 'NL';
      if (l === 'en-us' || l.indexOf('en-us') === 0) return 'US';
    }
    return '';
  }

  /* The timezone says where the machine is; the language says what its owner
     reads. For placing someone the machine wins outright — and a timezone we
     recognise as neither American nor Dutch is an answer in itself, not a
     reason to go asking the language. Without that distinction an American
     working in Berlin was quoted in dollars, and a Dutch speaker in Toronto
     was filed as a Dutch lead. The language is consulted only when there is
     no timezone to read at all. */
  var region = zone() ? regionFromZone() : regionFromLanguage();
  /* Kept in storage as well as on wkLocale. Nothing reads it back yet — it is
     here so the detected market is available to whatever wants it later
     without re-deriving it. It is declared in the privacy policy and named on
     the consent banner like every other key. */
  try { localStorage.setItem(RKEY, region || 'XX'); } catch (e) {}

  /* ── Currency ───────────────────────────────────────────────────────── */

  function detectedCurrency() { return region === 'US' ? 'usd' : 'eur'; }

  function stored() {
    try {
      var v = localStorage.getItem(CKEY);
      return (v === 'usd' || v === 'eur') ? v : '';
    } catch (e) { return ''; }
  }

  var currency = stored() || detectedCurrency();

  /* Prices are authored, not converted. Every price on the site carries both
     numbers as attributes, so the USD ladder is a set of deliberate round
     figures rather than whatever today's rate multiplies out to. */
  function paint(root) {
    (root || document).querySelectorAll('[data-price]').forEach(function (el) {
      var v = el.getAttribute('data-' + currency);
      if (v != null) el.innerHTML = v;
    });
  }

  function apply(c, remember) {
    currency = (c === 'usd') ? 'usd' : 'eur';
    if (remember) { try { localStorage.setItem(CKEY, currency); } catch (e) {} }
    document.documentElement.setAttribute('data-currency', currency);
    paint();
    document.dispatchEvent(new CustomEvent('wk:currencychange', {
      detail: { currency: currency, region: region }
    }));
  }

  /* ── What the rest of the site talks to ─────────────────────────────── */
  window.wkLocale = {
    region: region,
    /* the language the visitor's location and browser together imply */
    suggestedLanguage: function () {
      return (region === 'NL' || regionFromLanguage() === 'NL') ? 'nl' : 'en';
    },
    currency: function () { return currency; },
    set: function (c) { apply(c, true); },
    /* for anything that renders prices after this module has run */
    refresh: function (root) { paint(root); }
  };

  document.documentElement.setAttribute('data-currency', currency);
  document.documentElement.setAttribute('data-region', region || 'XX');

  /* A language switch rewrites innerHTML on every [data-nl]/[data-en]
     element, which throws away any price span living inside one. Repaint
     after it, or half the prices revert to whatever was authored in the
     attribute. */
  document.addEventListener('wk:languagechange', function () { paint(); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { paint(); });
  } else {
    paint();
  }
})();
