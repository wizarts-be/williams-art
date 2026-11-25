/* Williams · interactie. Werkt ook zonder GSAP; beweging is een laag erbovenop.
   Geen scroll-listeners op window: ScrollTrigger en IntersectionObserver doen het werk. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const hasG = !!(window.gsap && window.ScrollTrigger) && !reduce;
  const body = document.body;
  if (hasG) document.documentElement.classList.add('js');
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} } };

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis && hasG) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Scrollsnelheid (voor de fotostrook) ---------- */
  let velocity = 0;
  if (hasG) ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => { velocity = self.getVelocity(); } });

  /* Klein woordmerk verschijnt zodra het grote uit beeld is (zoals in de schets) */
  const heroMark = $('.hero-mark');
  if (heroMark) new IntersectionObserver(([e]) => body.classList.toggle('show-mark', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(heroMark);

  /* ---------- Menu uit de schets: hamburger klapt de links open, Werk opent het submenu ---------- */
  const burger = $('.burger'), sub = $('#sub'), werkBtn = $('.nav-werk'), lang = $('.lang');
  const closeMenus = () => {
    body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false');
    sub.hidden = true; werkBtn.setAttribute('aria-expanded', 'false');
    lang.classList.remove('open'); lenis && lenis.start();
  };
  burger.addEventListener('click', () => {
    const open = !body.classList.contains('menu-open');
    closeMenus();
    if (open) { body.classList.add('menu-open'); burger.setAttribute('aria-expanded', 'true'); if (innerWidth <= 900) lenis && lenis.stop(); }
  });
  werkBtn.addEventListener('click', () => {
    const open = sub.hidden; sub.hidden = !open; werkBtn.setAttribute('aria-expanded', open);
    lenis && (open ? lenis.stop() : (innerWidth > 900 && lenis.start()));
  });
  sub.addEventListener('click', e => { if (e.target.tagName === 'A') closeMenus(); });
  $('.lang-b').addEventListener('click', e => { e.stopPropagation(); const o = lang.classList.toggle('open'); $('.lang-b').setAttribute('aria-expanded', o); });
  $$('.lang li a').forEach(el => el.addEventListener('click', () => { $('.lang-cur').textContent = el.dataset.short; $$('.lang li a').forEach(o => o.toggleAttribute('aria-current', o === el)); lang.classList.toggle('open', false); }));
  document.addEventListener('click', e => { if (!lang.contains(e.target)) lang.classList.toggle('open', false); });

  /* ---------- Intro: het woordmerk bouwt op ---------- */
  const letters = $$('.hm-word span');
  if (letters.length && hasG) {
    const first = !store.get('intro'); store.set('intro', 1);
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(letters, { yPercent: 105, duration: first ? 1.5 : 1, stagger: first ? .07 : .03, delay: first ? .2 : 0 })
      .from('.strip .st-cell', { y: 60, opacity: 0, duration: 1.4, stagger: .05 }, '-=1.1');
  }

  /* ---------- Fotostrook: drijft, reageert op scrollsnelheid, pauze onder de muis ---------- */
  $$('.strip').forEach(strip => {
    const track = $('.st-track', strip);
    let x = 0, half = 0, hover = false, visible = false, speed = 0;
    const measure = () => { half = track.scrollWidth / 2; };
    measure(); new ResizeObserver(measure).observe(track);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(strip);
    strip.addEventListener('mouseenter', () => hover = true);
    strip.addEventListener('mouseleave', () => hover = false);
    if (reduce) return;
    const tick = () => {
      if (visible && half) {
        const target = (hover ? 0 : 0.45) + velocity / 500;
        speed += (target - speed) * 0.08;
        x -= speed;
        if (x <= -half) x += half; if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
      velocity *= 0.92;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  /* ---------- Op ware grootte: de maatlat volgt het werk in beeld ---------- */
  const scItems = $$('.sc-item'), fill = $('.sc-ruler .ruler-fill');
  if (scItems.length && fill) {
    const lab = $('span', fill);
    fill.style.setProperty('--h', '0%');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      fill.style.setProperty('--h', (e.target.dataset.h / 10) + '%'); lab.textContent = e.target.dataset.label;
    }), { rootMargin: '-45% 0px -45% 0px' });
    scItems.forEach(it => io.observe(it));
  }

  /* ---------- Proces: de stap in beeld licht op ---------- */
  const prNav = $$('.pr-nav li');
  if (prNav.length) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const i = $$('.pr-step').indexOf(e.target); prNav.forEach((li, k) => li.classList.toggle('is-on', k === i));
    }), { rootMargin: '-45% 0px -45% 0px' });
    $$('.pr-step').forEach(s => io.observe(s));
    prNav[0].classList.add('is-on');
  }

  /* ---------- Reveals en parallax: enkel waar het de volgorde vertelt ---------- */
  if (hasG) {
    $$('.sc-item, .pr-step, .moments li, .wp-body > *, .rel-g .tile, .tl li, .cs-steps li, .ow-row li').forEach(el => {
      el.classList.add('rv');
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }) });
    });
    $$('.sct, .gw, .ct-cell, .rf-i, .wh-grid figure').forEach(el => {
      gsap.fromTo(el, { clipPath: 'inset(12% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    $$('.sct').forEach(el => gsap.to(el, { yPercent: -(parseFloat(el.dataset.speed) || .2) * 40, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));
    $$('.sc-img img, .wp-cover img').forEach(img => gsap.fromTo(img, { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }));
    $$('.ph h1, .wi-head h1, .wp-head h1').forEach(h => {
      const words = h.textContent.trim().split(/\s+/);
      h.innerHTML = words.map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em"><span style="display:inline-block">${w}</span></span>`).join(' ');
      gsap.from($$('span > span', h), { yPercent: 108, duration: 1.2, ease: 'expo.out', stagger: .07, delay: .05 });
    });
    const fw = $('.ft-word');
    if (fw) gsap.fromTo(fw, { yPercent: 30 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.ft', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }

  /* ---------- Werk: filter en weergave ---------- */
  const wall = $('.wall'), lineup = $('.lineup');
  if (wall) {
    let filter = 'alle';
    const apply = () => { $$('[data-cats]').forEach(el => el.classList.toggle('is-out', filter !== 'alle' && !el.dataset.cats.split(' ').includes(filter))); hasG && ScrollTrigger.refresh(); };
    $$('[data-filter]').forEach(b => b.addEventListener('click', () => {
      filter = b.dataset.filter; $$('[data-filter]').forEach(o => o.setAttribute('aria-pressed', o === b)); apply();
      if (hasG) gsap.fromTo('.wa:not(.is-out), .os:not(.is-out)', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7, stagger: .02, ease: 'expo.out' });
    }));
    const setView = v => {
      $$('[data-view]').forEach(o => o.setAttribute('aria-pressed', o.dataset.view === v));
      wall.hidden = v !== 'wand'; lineup.hidden = v !== 'schaal'; store.set('view', v);
      if (v === 'schaal' && hasG) gsap.fromTo('.os .os-img', { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 1.2, stagger: .03, ease: 'expo.out' });
      hasG && ScrollTrigger.refresh();
    };
    $$('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
    if (store.get('view') === 'schaal') setView('schaal');
  }
  // Slepen in horizontale rijen
  $$('.lu-track, .mk-row').forEach(r => {
    let down = false, sx = 0, sl = 0, moved = false;
    r.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = r.scrollLeft; r.classList.add('drag'); r.style.scrollSnapType = 'none'; });
    r.addEventListener('pointermove', e => { if (!down) return; const d = e.clientX - sx; if (Math.abs(d) > 4) moved = true; r.scrollLeft = sl - d; });
    const up = () => { if (!down) return; down = false; r.classList.remove('drag'); r.style.scrollSnapType = ''; };
    r.addEventListener('pointerup', up); r.addEventListener('pointerleave', up);
    r.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
  });

  /* ---------- Tabbladen (opdrachten, agenda) ---------- */
  $$('[role=tablist]').forEach(list => {
    const tabs = $$('[role=tab]', list);
    const select = t => {
      tabs.forEach(o => { const on = o === t; o.setAttribute('aria-selected', on); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
      const pan = document.getElementById(t.getAttribute('aria-controls'));
      if (hasG) gsap.fromTo(pan.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, stagger: .06, ease: 'expo.out' });
    };
    tabs.forEach((t, i) => {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return; e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); select(n);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $('.lb');
  let set = [], idx = 0, lastFocus = null;
  const show = i => {
    idx = (i + set.length) % set.length;
    const b = set[idx], img = $('img', lb);
    img.src = b.dataset.full; img.alt = b.dataset.cap; $('figcaption', lb).textContent = b.dataset.cap;
    hasG && gsap.fromTo(img, { opacity: 0, scale: .98 }, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out' });
  };
  $$('.zoom').forEach(b => b.addEventListener('click', () => { set = $$('.zoom'); lastFocus = b; lb.hidden = false; lenis && lenis.stop(); show(set.indexOf(b)); $('.lb-x').focus(); }));
  const closeLb = () => { lb.hidden = true; lenis && lenis.start(); lastFocus && lastFocus.focus(); };
  $('.lb-x').addEventListener('click', closeLb);
  $('.lb-p').addEventListener('click', () => show(idx - 1));
  $('.lb-n').addEventListener('click', () => show(idx + 1));
  addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenus();
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* ---------- Video speelt enkel in beeld ---------- */
  $$('video[data-autoplay]').forEach(v => new IntersectionObserver(([e]) => { if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause(); }, { threshold: .3 }).observe(v));

  /* ---------- Formulieren (enkel frontend) ---------- */
  $$('.ask').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    $$('.ask-opt, .fld, .btn', f).forEach(el => el.hidden = true); $('.ask-ok', f).hidden = false;
  }));
  const cf = $('.cf');
  if (cf) {
    const q = new URLSearchParams(location.search).get('onderwerp');
    if (q) { const r = $(`input[name=o][value="${q}"]`, cf); if (r) r.checked = true; }
    cf.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      $$('input[required]', cf).forEach(i => {
        const bad = !i.checkValidity(); const err = i.parentElement.querySelector('.err');
        if (err) err.hidden = !bad; i.setAttribute('aria-invalid', bad); if (bad) ok = false;
      });
      if (!ok) { $('[aria-invalid=true]', cf)?.focus(); return; }
      $$(':scope > *:not(.cf-ok)', cf).forEach(el => el.hidden = true); $('.cf-ok', cf).hidden = false;
    });
  }
  const nlDone = form => { form.querySelector('div, input')?.setAttribute('hidden', ''); form.parentElement.querySelector('.nl-ok').hidden = false; store.set('nl', 1); };
  const ftNl = $('.ft-nl');
  ftNl && ftNl.addEventListener('submit', e => { e.preventDefault(); $('div', ftNl).hidden = true; $('.nl-ok', ftNl).hidden = false; store.set('nl', 1); });

  /* ---------- Nieuwsbrief-pop-up (ontwerp): verschijnt na de helft van de homepage ---------- */
  const nl = $('.nl');
  const openNl = () => { if (!nl.hidden || store.get('nl')) return; nl.hidden = false; nl.classList.add('is-in'); };
  $('.nl-x').addEventListener('click', () => { nl.hidden = true; store.set('nl', 1); });
  $('.nl-f').addEventListener('submit', e => { e.preventDefault(); e.target.hidden = true; $('.nl-ok', nl).hidden = false; store.set('nl', 1); setTimeout(() => nl.hidden = true, 2600); });
  const trigger = $('.process') || $('.gal') || $('.ft');
  if (trigger && !store.get('nl')) new IntersectionObserver(([e], o) => { if (e.isIntersecting) { setTimeout(openNl, 1200); o.disconnect(); } }).observe(trigger);

  if (hasG) addEventListener('load', () => ScrollTrigger.refresh());
})();
