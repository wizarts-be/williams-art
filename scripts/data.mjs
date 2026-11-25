// Bouwt data/works.json uit data/content.json (de crawl van de oude site).
// Eenmalig draaien; daarna is works.json de bron die je met de hand aanvult.
import fs from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const content = JSON.parse(fs.readFileSync(root + 'data/content.json', 'utf8'));
const manifest = JSON.parse(fs.readFileSync(root + 'data/manifest.json', 'utf8'));
const dims = Object.fromEntries(manifest.map(m => [m.file, [m.w, m.h]]));

const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const TITLE_FIX = {
  'Divison': 'Division', 'Endless Sphere – NEW!': 'Endless Sphere', 'I – C – NEW!': 'I-C',
  'Sphere': 'Welding Sphere', 'Modele Female': 'Modèle Female',
  'Tomorrowland fantasy flame pillars': 'Fantasy Flame Pillars',
};

const img = file => {
  if (!file) return null;
  const base = file.replace(/\.[a-z0-9]+$/i, '');
  const [w, h] = dims[file] || [4, 5];
  return { src: base, w, h };
};

const isSpec = l => /^(afmeting|materiaal|gewicht|hoogte|diameter)/i.test(l) || /^Artikel /.test(l);

const works = content.works.map(w => {
  const title = TITLE_FIX[w.title] || w.title;
  const story = w.text.filter(l => !isSpec(l) && !/^Coming in/i.test(l));
  const specLines = w.text.filter(l => /^(afmeting|materiaal|gewicht|hoogte|diameter)/i.test(l));
  const all = w.text.join(' ').toLowerCase();
  let material = null;
  if (/indaten/.test(all)) material = 'Indaten-staal (ArcelorMittal)';
  else if (/cortenstaal/.test(all) && /brons/.test(all)) material = 'Cortenstaal, ook in brons';
  else if (/cortenstaal|corten/.test(all)) material = 'Cortenstaal';
  else if (/staal/.test(all)) material = 'Staal';
  return {
    slug: slugify(title),
    oldUrl: w.url.replace('https://williams-art-design.com', ''),
    title,
    isNew: /NEW/.test(w.title),
    comingSoon: w.text.some(l => /^Coming in 2025/i.test(l)),
    year: w.jaar[0] || null,
    locations: w.locaties.filter(Boolean),
    material,
    specLines,
    story,
    links: w.links.map(u => u.replace(/&amp;/g, '&').split('?utm')[0]),
    cover: img(w.files.featured),
    gallery: (w.files.gallery.length ? w.files.gallery : w.files.making_of).map(img),
    makingOf: w.files.gallery.length ? w.files.making_of.map(img) : [],
    translations: w.translations,
  };
});

// Indeling van de designer (nog te bevestigen door William)
const CATS = {
  'cortenstaal-tuinkunst': ['ring-of-hope', 'endless-sphere', 'layered-sphere', 'welding-sphere', 'twister', 'over-the-edge', 'omhelzing', 'through-your-eyes'],
  'abstracte-beelden-tuin': ['equilibre', 'illusion-pente', 'division', 'twister', 'coloured-marbles', 'deep-in-the-blue', 'layered-sphere', 'mystique-sphere'],
  'grote-tuinbeelden': ['through-your-eyes', 'omhelzing', 'ring-of-hope', 'proud', 'hangjongeren', 'fantasy-flame-pillars', 'mystique-men', 'me-myself-and-i'],
};
for (const w of works) w.categories = Object.keys(CATS).filter(k => CATS[k].includes(w.slug));

const missing = Object.values(CATS).flat().filter(s => !works.find(w => w.slug === s));
if (missing.length) console.warn('Onbekende slugs in categorieën:', missing);

fs.writeFileSync(root + 'data/works.json', JSON.stringify(works, null, 1));
console.log(works.length, 'werken', works.map(w => w.slug).join(' '));
