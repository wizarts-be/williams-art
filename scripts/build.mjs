// Statische build van de Williams-site (NL). Draai: node scripts/build.mjs
// Bron: data/works.json + de teksten hieronder. Output: dist/
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const OUT = root + 'dist/';
// Basispad: '/' lokaal, '/williams-art/' op GitHub Pages (BASE=/williams-art/ node scripts/build.mjs)
const BASE = process.env.BASE || '/';
const works = JSON.parse(fs.readFileSync(root + 'data/works.json', 'utf8'));
// Volgorde: nieuw eerst, dan recent naar oud, werken zonder jaar achteraan
works.sort((a, b) => (b.isNew - a.isNew) || ((+b.year || 0) - (+a.year || 0)));
const by = Object.fromEntries(works.map(w => [w.slug, w]));

/* ---------- Feiten per werk (enkel uit de oude site) ---------- */
const SPECS = {
  'mystique-sphere': { h: 250, rows: [['Diameter', '250 cm'], ['Materiaal', 'Cortenstaal'], ['Gewicht', '750 kg']] },
  'me-myself-and-i': { h: 230, rows: [['Afmetingen', '230 × 190 × 20 cm']] },
  'illusion-pente': { h: 120, rows: [['Diameter', '± 120 cm'], ['Gewicht', '± 40 kg'], ['Vorm', 'Dodecaëder']] },
  'boeddha': { h: 150, rows: [['Afmetingen', '150 × 230 × 40 cm'], ['Materiaal', 'Staal, met de hand uitgesneden'], ['Licht', 'Verwerkt achter het staal']] },
  'layered-sphere': { h: 160, rows: [['Materiaal', 'Massief cortenstaal'], ['Diameter', '70, 100 of 160 cm'], ['Oplage', '9 genummerde exemplaren per maat']] },
  'mystique-men': { h: 250, rows: [['Hoogte', '60 cm op sokkel, of 250 cm'], ['Brons', 'Kleine versie van 30 of 60 cm']] },
  'ring-of-hope': { h: 400, rows: [['Materiaal', 'Cortenstaal'], ['Diameter', '2, 3 of 4 m'], ['Oplage', '8 genummerde exemplaren per maat'], ['In voorbereiding', 'Een versie van 8 m']] },
  'welding-sphere': { h: 160, rows: [['Materiaal', 'Cortenstaal'], ['Diameter', '160 cm'], ['Oplage', '9 genummerde exemplaren'], ['Beschikbaar', 'Nr. 8/9 en 9/9']] },
  'showerlady': { h: 120, rows: [['Afmetingen', '120 × 80 × 10 cm'], ['Materiaal', 'Cortenstaal']] },
  'desire-perceptible': { h: 250, rows: [['Afmetingen', '250 × 150 × 60 cm'], ['Materiaal', 'Indaten-staal']] },
  'division': { h: 400, rows: [['Hoogte', '400 cm'], ['Diameter', '400 cm'], ['Materiaal', 'Staal van ArcelorMittal']] },
  'through-your-eyes': { h: 310, rows: [['Afmetingen', '310 × 210 × 260 cm'], ['Onderscheiding', 'Zilveren medaille, RHS Hampton Court Palace'], ['Te zien', 'RHS Garden Wisley, Londen']] },
  'fantasy-flame-pillars': { h: 400, rows: [['Opdrachtgever', 'Tomorrowland, Boom'], ['Aantal', '12 pilaren'], ['Afmetingen', '400 cm hoog, ± 80 cm breed'], ['Voet', '250 kg, opgegoten met beton'], ['Boog', '± 200 kg per stuk']] },
  'proud': { h: 900, rows: [['Hoogte', '9 m in Knokke-Heist, 3 m in Beervelde'], ['Gewicht', '3,5 ton en 160 kg'], ['Brons', 'Kleine versie, 60 × 36 × 10 cm']] },
};

const CATS = {
  'cortenstaal-tuinkunst': { t: 'Cortenstalen beelden', short: 'Cortenstaal' },
  'abstracte-beelden-tuin': { t: 'Abstracte tuinbeelden', short: 'Abstract' },
  'grote-tuinbeelden': { t: 'Grote tuinbeelden', short: 'Groot' },
};

/* ---------- Helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const IMG = '/assets/img/';
const srcset = i => `${IMG}${i.src}-900.webp 900w, ${IMG}${i.src}-1800.webp 1800w`;
const ar = i => i && i.w && i.h ? `${i.w}/${i.h}` : '4/5';
function pic(i, alt, sizes = '(max-width: 800px) 90vw, 40vw', cls = '', eager = false) {
  if (!i) return '';
  return `<img class="${cls}" src="${IMG}${i.src}-900.webp" srcset="${srcset(i)}" sizes="${sizes}" width="${i.w}" height="${i.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
const page = i => `/assets/img/paginas/${i}`;
const workUrl = w => `/portfolio/${w.slug}/`;
const metaLine = w => [w.year, w.material && w.material.split(',')[0].replace(' (ArcelorMittal)', '')].filter(Boolean).join(', ');

const I = (name, extra = '') => `<i class="ph-light ph-${name} ${extra}" aria-hidden="true"></i>`;
const ICON = { arrow: I('arrow-right'), back: I('arrow-left'), close: I('x'), down: I('caret-down'), ig: I('instagram-logo') };
const CONTACT_LABEL = 'Neem contact op';

/* ---------- Layout: header zoals de schets, footer ---------- */
const NAV = [['/agenda/', 'Agenda', 'agenda'], ['/over-william/', 'Over William', 'over'], ['/opdrachten/', 'Opdrachten', 'opdrachten'], ['/contact/', 'Contact', 'contact']];

function shell({ title, desc, body, active = '', bodyClass = '' }) {
  const sub = [['/werk/', `Alle werken`, works.length, by['ring-of-hope'].cover], ...Object.entries(CATS).map(([k, c]) => [`/${k}/`, c.t, works.filter(w => w.categories.includes(k)).length, by[{ 'cortenstaal-tuinkunst': 'welding-sphere', 'abstracte-beelden-tuin': 'equilibre', 'grote-tuinbeelden': 'proud' }[k]].cover])];
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#fcfcfb">
<link rel="icon" href="/assets/brand/favicon.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Tenor+Sans&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css">
<link rel="stylesheet" href="/assets/css/site.css">${bodyClass === 'is-mf' ? '\n<link rel="stylesheet" href="/assets/css/midfi.css">\n<meta name="robots" content="noindex">' : ''}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Naar de inhoud</a>
<header class="hd">
  <div class="hd-l">
    <button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Menu"><i></i><i></i><i></i></button>
    <nav class="nav" id="nav" aria-label="Hoofdmenu">
      <button class="nav-werk" aria-expanded="false" aria-controls="sub">Werk</button>
      ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}
      <a href="https://www.instagram.com/williams.art.design/" target="_blank" rel="noopener">Instagram</a>
      <div class="lang"><button class="lang-b" aria-expanded="false" aria-label="Taal kiezen"><span class="lang-cur">NL</span> ${ICON.down}</button><ul><li><a aria-current="true" data-short="NL">Nederlands</a></li><li><a data-short="FR">Français</a></li><li><a data-short="EN">English</a></li><li><a data-short="DE">Deutsch</a></li></ul></div>
    </nav>
  </div>
  <div class="hd-r">
    <a href="/" class="mark-sm" aria-label="Williams, naar de startpagina">williams</a>
  </div>
</header>
<div class="sub" id="sub" hidden>
  ${sub.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
</div>
<main id="main">
${body}
</main>
${footer()}
<div class="lb" hidden role="dialog" aria-modal="true" aria-label="Beeld"><button class="lb-x" aria-label="Sluiten">${ICON.close}</button><button class="lb-p" aria-label="Vorige">${ICON.back}</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-n" aria-label="Volgende">${ICON.arrow}</button></div>
<aside class="nl" hidden aria-labelledby="nl-t">
  <img src="${IMG}werken/sphere/making-of-01-900.webp" alt="" loading="lazy">
  <div class="nl-b">
    <button class="nl-x" aria-label="Sluiten">${ICON.close}</button>
    <h2 id="nl-t">Nieuw werk zie je hier eerst</h2>
    <p>Een paar keer per jaar: nieuwe beelden, exposities en een blik in het atelier.</p>
    <form class="nl-f"><label class="vh" for="nl-e">E-mailadres</label><input id="nl-e" type="email" required placeholder="naam@domein.be" autocomplete="email"><button>Inschrijven</button></form>
    <p class="nl-ok" hidden>Bedankt, je staat op de lijst.</p>
  </div>
</aside>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="/assets/js/site.js"></script>
</body>
</html>`;
}

function footer() {
  const ig = ['ring-of-hope', 'mystique-men', 'endless-sphere', 'welding-sphere', 'omhelzing', 'koesteren'].map((s, i) => {
    const w = by[s]; const im = w.gallery[1] || w.cover;
    return `<a href="https://www.instagram.com/williams.art.design/" target="_blank" rel="noopener" class="ig-i">${pic(im, `${w.title} op Instagram`, '16vw')}</a>`;
  }).join('');
  return `<footer class="ft">
  <div class="ft-ig">
    <a class="ft-igh" href="https://www.instagram.com/williams.art.design/" target="_blank" rel="noopener">${ICON.ig} @williams.art.design</a>
    <div class="ig-row">${ig}</div>
  </div>
  <div class="ft-main">
    <div class="ft-c">
      <a class="ft-big" href="mailto:roobrouck.william@gmail.com">roobrouck.william@gmail.com</a>
      <a class="ft-big" href="tel:+32497535158">0497 53 51 58</a>
    </div>
    <div class="ft-a">
      <p>Atelier Williams<br>Veldstraat 9<br>9270 Laarne</p>
      <a class="link" href="https://maps.google.com/?q=Veldstraat+9+9270+Laarne" target="_blank" rel="noopener">Route ${ICON.arrow}</a>
    </div>
    <nav class="ft-n" aria-label="Footer">
      <a href="/werk/">Werk</a>${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}
      ${Object.entries(CATS).map(([k, c]) => `<a href="/${k}/" class="mute">${c.t}</a>`).join('')}
    </nav>
    <form class="ft-nl nl-f2">
      <label for="ft-e">Nieuwsbrief: nieuw werk en exposities, een paar keer per jaar.</label>
      <div><input id="ft-e" type="email" required placeholder="naam@domein.be" autocomplete="email"><button>Inschrijven</button></div>
      <p class="nl-ok" hidden>Bedankt, je staat op de lijst.</p>
    </form>
  </div>
  <div class="ft-word" aria-hidden="true">williams</div>
  <div class="ft-base"><span>The Love story of art &amp; craft</span><span>BE 0771 792 178</span><span><a href="/privacy-policy/">Privacy</a>  <a href="/cookie-policy/">Cookies</a></span><span><a href="https://wizarts.be" target="_blank" rel="noopener">Website door Wizarts</a></span></div>
</footer>`;
}

/* ---------- Bouwstenen ---------- */
const dimOf = w => { const r = SPECS[w.slug] && SPECS[w.slug].rows.find(([k]) => /Afmeting|Hoogte|Diameter/.test(k)); return r ? r[1] : ''; };
function tile(w, opts = {}) {
  const i = opts.img || w.cover;
  return `<a class="tile" href="${workUrl(w)}" style="--ar:${ar(i)}">
    <span class="tile-img">${pic(i, w.title, opts.sizes || '(max-width: 800px) 70vw, 28vw')}</span>
    <span class="cap"><span class="cap-t">${esc(w.title)}</span><span class="cap-m">${esc(metaLine(w))}</span></span>
  </a>`;
}
function ruler(h, label) {
  const ticks = Array.from({ length: 11 }, (_, i) => `<i style="bottom:${i * 10}%"><b>${i ? i + ' m' : ''}</b></i>`).join('');
  return `<div class="ruler" style="--h:${h / 10}%" aria-label="${esc(label)}"><div class="ruler-scale">${ticks}</div><div class="ruler-fill"><span>${esc(label)}</span></div><div class="ruler-man" style="--m:18%"></div></div>`;
}

/* ---------- Home ---------- */
const STRIP = ['ring-of-hope', 'endless-sphere', 'omhelzing', 'through-your-eyes', 'the-sun', 'i-c', 'proud', 'coloured-marbles', 'welding-sphere', 'equilibre', 'over-the-edge', 'mystique-men'];
function strip(slugs) {
  const heights = [74, 56, 88, 62, 80, 50, 70, 92, 60];
  const aligns = ['start', 'end', 'center', 'start', 'end', 'center'];
  const tiles = slugs.map((s, k) => `<div class="st-cell" style="--sh:${heights[k % heights.length]}%;align-self:${aligns[k % aligns.length]}">${tile(by[s], { sizes: '(max-width: 800px) 60vw, 26vw' })}</div>`).join('');
  return `<section class="strip" aria-label="Werken in beweging"><div class="st-track">${tiles}${tiles.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ')}</div></section>`;
}
const SCALE = [
  ['proud', 900, '9 m', 'Proud', 'Gemaakt voor de triënnale van Knokke-Heist. De stad kocht het werk voor de rotonde aan de Heistlaan: negen meter hoog, drie en een halve ton cortenstaal.'],
  ['division', 400, '4 m', 'Division', 'Drie broers, drie profielen in staal van ArcelorMittal. Ze groeien uit elkaar en blijven verbonden in één punt: hun geboorte.'],
  ['fantasy-flame-pillars', 400, '4 m', 'Fantasy Flame Pillars', 'Tomorrowland vroeg in 2012 een decor dat met vuur kon samengaan. Het festival bestelde er twaalf en zet ze elk jaar opnieuw op.'],
  ['through-your-eyes', 310, '3,10 m', 'Through your eyes', 'Zilveren medaille op de RHS Hampton Court Palace Garden Festival in 2019. Vandaag staat het in RHS Garden Wisley bij Londen.'],
];

function home() {
  const scale = SCALE.map(([s, h, lab, t, txt]) => {
    const w = by[s]; const im = s === 'through-your-eyes' ? w.gallery[0] : (s === 'fantasy-flame-pillars' ? w.gallery[1] || w.cover : w.cover);
    return `<article class="sc-item" data-h="${h}" data-label="${lab}">
      <a class="sc-img" href="${workUrl(w)}">${pic(im, t, '(max-width: 800px) 90vw, 44vw')}</a>
      <div class="sc-txt"><h3><a href="${workUrl(w)}">${t}</a></h3><p>${txt}</p><p class="sc-dim">${esc(SPECS[s].rows[0][1])}</p></div>
    </article>`;
  }).join('');
  const scatter = [['mystique-sphere', 'c2 s4'], ['abscence', 'c7 s3 dn'], ['female-wave', 'c10 s3'], ['yoni', 'c1 s3 dn2'], ['subtige-men', 'c5 s4'], ['showerlady', 'c10 s2 dn']]
    .map(([s, cls], k) => `<div class="sct ${cls}" data-speed="${[0.15, 0.4, 0.25, 0.35, 0.1, 0.45][k]}">${tile(by[s], { sizes: '(max-width: 800px) 80vw, 30vw' })}</div>`).join('');
  const steps = [
    ['Uitsnijden', 'Zware stalen platen, op maat gesneden naar de schets.', 'making-of-01'],
    ['Walsen en plooien', 'Het staal krijgt zijn ronding en zijn hoeken.', 'making-of-02'],
    ['Lassen', 'Deel per deel, naadloos aan elkaar gelast.', 'making-of-03'],
    ['Roesten', 'Het beeld verlaat het atelier grijs. Buiten kleurt het roestbruin.', 'making-of-05'],
  ];
  const proc = steps.map(([t, txt, f]) => `<li class="pr-step"><figure>${pic({ src: `werken/proud/${f}`, w: 1200, h: 900 }, `Proud in het atelier: ${t.toLowerCase()}`, '(max-width: 800px) 90vw, 36vw')}</figure><div><h3>${t}</h3><p>${txt}</p></div></li>`).join('');
  const moments = [['2022', 'Venetië', 'Biënnale Artbox Expo'], ['2021', 'Zürich', 'Artbox Expo'], ['2019', 'Londen', 'Zilver op RHS Hampton Court'], ['2018', 'Knokke-Heist', 'Proud, triënnale']]
    .map(([y, p, t]) => `<li><span class="mo-y">${y}</span><span class="mo-p">${p}</span><span class="mo-t">${t}</span></li>`).join('');

  const body = `
<section class="hero">
  <h1 class="hero-mark" aria-label="williams"><span class="hm-word">${'williams'.split('').map(c => `<span>${c}</span>`).join('')}</span></h1>
</section>
${strip(STRIP)}
<section class="scale" aria-labelledby="sc-t">
  <div class="sc-head"><h2 id="sc-t">Op ware grootte</h2><p>Een beeld van negen meter zie je niet op een scherm. Vier werken, met hun echte maten.</p></div>
  <div class="sc-list">${scale}</div>
</section>
<section class="scatter" aria-label="Uit de collectie">${scatter}</section>
<section class="process" aria-labelledby="pr-t">
  <div class="pr-sticky">
    <h2 id="pr-t">Van schets tot laatste laspunt</h2>
    <p>William doet alles zelf, in zijn atelier in Laarne. Zo ontstond Proud.</p>
    <ol class="pr-nav" aria-hidden="true">${steps.map(([t]) => `<li>${t}</li>`).join('')}</ol>
  </div>
  <ol class="pr-steps">${proc}</ol>
</section>
<section class="where" aria-labelledby="wh-t">
  <h2 id="wh-t">Waar het werk stond</h2>
  <div class="wh-grid">
    <figure class="wh-vid"><video src="/assets/video/fujirebio.mp4" poster="/assets/video/fujirebio-poster.jpg" muted loop playsinline preload="none" data-autoplay></video><figcaption><b>Fujirebio, Zwijnaarde</b> Een monumentaal werk voor de bedrijfssite, 2024</figcaption></figure>
    <figure class="wh-a">${pic({ src: 'paginas/will4', w: 1200, h: 1600 }, 'Werk van William op de kunstenroute Kwa-art', '30vw')}<figcaption><b>Kwa-art, Kwaremont</b> Expositie en kunstenroute, 2024</figcaption></figure>
    <figure class="wh-b">${pic({ src: 'paginas/will1', w: 1200, h: 1600 }, 'Wintertentoonstelling in de Winterbar', '24vw')}<figcaption><b>Winterbar</b> Wintertentoonstelling, 2024</figcaption></figure>
  </div>
  <ol class="moments">${moments}</ol>
  <a class="link" href="/agenda/">Volledige agenda ${ICON.arrow}</a>
</section>`;
  return shell({ title: 'Williams · beelden van William Roobrouck', desc: 'Beelden in cortenstaal, staal, brons, licht en vuur van William Roobrouck, gemaakt in zijn atelier in Laarne. Werk uit de collectie of op maat.', body, bodyClass: 'is-home' });
}

/* ---------- MIDFI: structuurschetsen van de andere pagina's ----------
   Grijze vlakken, weinig tekst, elke pagina een eigen compositie. Geen lijsten met lijntjes. */
const mfBox = (label, ratio = '4/3', cls = '') => `<div class="mf-box ${cls}" style="aspect-ratio:${ratio}"><span>${esc(label)}</span></div>`;
const mfPage = (title, body, active) => shell({ title: `${title} · Williams (structuurschets)`, desc: `Structuurschets van de pagina ${title}.`, body: `<div class="mf">${body}</div><p class="mf-tag">Structuurschets</p>`, active, bodyClass: 'is-mf' });
const mfWork = (w, cls = '') => `<a class="mf-w ${cls}" href="${workUrl(w)}">${mfBox(w.title, `${w.cover.w}/${w.cover.h}`)}<span class="mf-cap"><b>${esc(w.title)}</b>${esc(w.year || '')}</span></a>`;
// Ritme voor verspreide werken: begin-kolom en breedte op 12 kolommen
const SCAT = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];

function mfWerk() {
  return mfPage('Werk', `
  <header class="mf-head"><h1>Werk</h1><p class="mf-filter"><b>Alle</b> <span>Cortenstaal</span> <span>Abstract</span> <span>Groot</span></p></header>
  <div class="mf-scatter">${works.map((w, i) => mfWork(w, SCAT[i % SCAT.length])).join('')}</div>`, 'werk');
}

function mfWerkpagina(w, i) {
  const next = works[(i + 1) % works.length];
  const spec = SPECS[w.slug];
  const facts = [...(spec ? spec.rows.slice(0, 2).map(r => r[1]) : []), 'Prijs op aanvraag'];
  return mfPage(w.title, `
  <section class="mf-wp">
    <div class="mf-wp-img">${mfBox('Hoofdbeeld', `${w.cover.w}/${w.cover.h}`)}</div>
    <div class="mf-wp-info">
      <a class="mf-back" href="/werk/">Alle werken</a>
      <h1>${esc(w.title)}</h1>
      <p class="mf-meta">${esc([w.year, w.material && w.material.split(',')[0]].filter(Boolean).join(', ') || 'Uniek werk')}</p>
      <p class="mf-facts">${facts.map(esc).join('<br>')}</p>
      <a class="mf-btn" href="/contact/">Interesse in dit werk?</a>
    </div>
  </section>
  <p class="mf-story">${w.story.length ? 'Het verhaal van het werk, in een paar zinnen.' : 'Een paar zinnen over het werk.'}</p>
  <section class="mf-gal">
    ${mfBox('Beeld', '16/9', 'g-full')}
    ${mfBox('Beeld', '4/5', 'g-l')}
    ${mfBox('Detail', '1/1', 'g-r')}
    ${mfBox('Beeld', '3/2', 'g-c')}
  </section>
  ${w.makingOf.length ? `<section class="mf-strip"><h2>In het atelier</h2><div>${Array.from({ length: Math.min(5, w.makingOf.length + 1) }, () => mfBox('Atelier', '3/4')).join('')}</div></section>` : ''}
  <a class="mf-next" href="${workUrl(next)}"><span>Volgend werk</span><b>${esc(next.title)}</b>${mfBox('', `${next.cover.w}/${next.cover.h}`)}</a>`, 'werk');
}

const CAT_LINE = { 'cortenstaal-tuinkunst': 'Warm, roestbruin en onderhoudsvrij. Cortenstaal leeft mee met de seizoenen.', 'abstracte-beelden-tuin': 'Vorm, lijn en licht in plaats van een herkenbare figuur.', 'grote-tuinbeelden': 'Werk dat je van ver ziet en van dichtbij overrompelt.' };
function mfCategorie(key) {
  const c = CATS[key], list = works.filter(w => w.categories.includes(key));
  return mfPage(c.t, `
  <section class="mf-cat">
    <div class="mf-cat-t"><a class="mf-back" href="/werk/">Alle werken</a><h1>${esc(c.t)}</h1><p class="mf-lead">${CAT_LINE[key]}</p></div>
    <div class="mf-cat-img">${mfBox('Sfeerbeeld van een werk in een tuin', '4/5')}</div>
  </section>
  <div class="mf-scatter">${list.map((w, i) => mfWork(w, SCAT[(i + 2) % SCAT.length])).join('')}</div>
  <details class="mf-more"><summary>Lees meer over ${c.short === 'Groot' ? 'grote tuinbeelden' : c.short === 'Abstract' ? 'abstracte tuinbeelden' : 'cortenstaal'}</summary><p>De bestaande tekst van de oude site, voor Google. Klapt open voor wie meer wil lezen.</p></details>
  <a class="mf-btn" href="/contact/">Neem contact op</a>`, key);
}

function mfOpdrachten() {
  const cases = [['Een stad', 'Proud, 9 m hoog, voor Knokke-Heist.', 'proud', '3/4', 'c-1'], ['Een festival', 'Twaalf vuurpilaren voor Tomorrowland.', 'fantasy-flame-pillars', '4/3', 'c-2'], ['Een bedrijf', 'Een monumentaal werk voor Fujirebio.', null, '16/9', 'c-3']];
  return mfPage('Opdrachten', `
  <section class="mf-op-hero">${mfBox('Groot beeld van een werk op zijn plek', '21/9')}<div><h1>Opdrachten</h1><p class="mf-lead">Een beeld dat precies past bij de plek.</p></div></section>
  <section class="mf-cases">${cases.map(([t, s, slug, r, cls]) => `<${slug ? `a href="${workUrl(by[slug])}"` : 'div'} class="mf-case ${cls}">${mfBox(t, r)}<h2>${t}</h2><p>${s}</p></${slug ? 'a' : 'div'}>`).join('')}</section>
  <section class="mf-how"><h2>Zo werkt het</h2><div><p><b>Kennismaking</b>Op de plek zelf.</p><p><b>Ontwerp</b>Schets en voorstel.</p><p><b>Plaatsing</b>Gemaakt, geleverd, verankerd.</p></div></section>
  <a class="mf-btn" href="/contact/">Neem contact op</a>`, 'opdrachten');
}

function mfOver() {
  return mfPage('Over William', `
  <section class="mf-ov">${mfBox('Video van William', '16/9')}<h1>William Roobrouck</h1></section>
  <p class="mf-quote">Van de eerste schets tot het laatste laspunt doet hij alles zelf.</p>
  <section class="mf-moments">
    <figure class="m-1">${mfBox('Atelier van zijn grootvader', '4/5')}<figcaption><b>De Panne</b>Waar hij leerde lassen.</figcaption></figure>
    <figure class="m-2">${mfBox('Atelier in Laarne', '3/2')}<figcaption><b>Laarne</b>Sinds 2008.</figcaption></figure>
    <figure class="m-3">${mfBox('William vandaag', '1/1')}<figcaption><b>Nu</b>Werk tot negen meter hoog.</figcaption></figure>
  </section>`, 'over');
}

function mfAgenda() {
  return mfPage('Agenda', `
  <h1 class="mf-h1">Agenda</h1>
  <section class="mf-next-ev">${mfBox('Foto van de plek', '4/3')}<div><p class="mf-label">Binnenkort</p><h2>Naam van de expositie</h2><p>Datum en plaats</p><a class="mf-btn" href="#">Route</a></div></section>
  <section class="mf-year"><p class="mf-yn">2024</p><p class="mf-ev">Monumentaal werk voor Fujirebio in Zwijnaarde. Tentoonstelling in Laarne. Kunstenroute Kwa-art in Kwaremont.</p>${mfBox('Foto uit 2024', '3/4')}</section>
  <p class="mf-years-old">Eerder <span>2022</span><span>2021</span><span>2020</span><span>2019</span><span>2018</span><span>2012</span></p>`, 'agenda');
}

function mfContact() {
  return mfPage('Contact', `
  <section class="mf-ct">
    <div><h1>Contact</h1><p class="mf-big">roobrouck.william@gmail.com</p><p class="mf-big">0497 53 51 58</p><p class="mf-meta">Veldstraat 9, 9270 Laarne</p></div>
    <form class="mf-form"><span>Naam</span><span>E-mail</span><span class="tall">Bericht</span><a class="mf-btn">Verstuur</a></form>
  </section>
  ${mfBox('Foto van het atelier', '21/9')}`, 'contact');
}

/* ---------- Schrijven ---------- */
const KNOWN = /^\/(werk|portfolio\/[^/"]+|opdrachten|over-william|agenda|contact|cortenstaal-tuinkunst|abstracte-beelden-tuin|grote-tuinbeelden)\/$/;
function write(rel, html) {
  if (/[\u2014\u2013]/.test(html)) console.warn('Let op: em/en-dash in', rel || 'home');
  const f = path.join(OUT, rel, 'index.html');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  // Links naar pagina's die (nog) niet bestaan gaan naar home
  html = html.replace(/href="(\/(?!assets\/)[^"#]*)"/g, (m, u) => (u === '/' || KNOWN.test(u)) ? m : 'href="/"');
  html = html.replace(/(href|src|poster|data-full|data-img)="\//g, `$1="${BASE}`).split(', /assets/').join(`, ${BASE}assets/`);
  fs.writeFileSync(f, html);
}
fs.rmSync(OUT, { recursive: true, force: true });
write('', home());
write('werk', mfWerk());
works.forEach((w, i) => write(`portfolio/${w.slug}`, mfWerkpagina(w, i)));
Object.keys(CATS).forEach(k => write(k, mfCategorie(k)));
write('opdrachten', mfOpdrachten());
write('over-william', mfOver());
write('agenda', mfAgenda());
write('contact', mfContact());
for (const d of ['assets/css', 'assets/js', 'assets/img', 'assets/video', 'assets/brand']) {
  fs.mkdirSync(path.dirname(OUT + d), { recursive: true });
  fs.symlinkSync(root + d, OUT + d);
}
console.log('Gebouwd:', fs.readdirSync(OUT).join(', '));
