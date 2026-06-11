// ===== Nawigacja mobilna =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  });

  // zamknij menu po kliknięciu w link
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== Animowane liczniki w hero =====
// W HTML stoją docelowe wartości (działa bez JS); skrypt zeruje je przed
// pierwszym malowaniem i odlicza w górę, gdy pas statystyk wjedzie w viewport.
const statsBar = document.querySelector('.hero__stats');
const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
const reduceMotion = motionMq.matches;

if (statsBar && 'IntersectionObserver' in window && !reduceMotion) {
  const counters = statsBar.querySelectorAll('strong[data-target]');
  const DURATION = 1600;
  const STAGGER = 180;
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  // odmiana "lat" w trakcie odliczania: 1 rok, 2-4 lata, 5+ lat
  const yearsSuffix = (n) => {
    if (n === 1) return ' rok';
    const d = n % 10;
    const h = n % 100;
    return d >= 2 && d <= 4 && (h < 12 || h > 14) ? ' lata' : ' lat';
  };

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    let start;
    const frame = (now) => {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      const value = Math.round(easeOutExpo(progress) * target);
      const suffix = el.dataset.suffix === ' lat' ? yearsSuffix(value) : (el.dataset.suffix || '');
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  counters.forEach((el) => { el.textContent = '0' + (el.dataset.suffix || ''); });

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      // tuż po załadowaniu strony liczniki czekają, aż rama pasa skończy się kreślić;
      // przy późniejszym doscrollowaniu startują bez zwłoki
      const holdFirst = performance.now() < 3000 ? 650 : 0;
      counters.forEach((el, i) => setTimeout(() => animate(el), holdFirst + i * STAGGER));
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

// ===== Parallax wersów H1 za kursorem (desktop, tylko gdy hero na ekranie) =====
const heroContent = document.querySelector('.hero__content');
const heroSection = document.querySelector('.hero');
const pointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');

if (heroContent && heroSection && pointerMq.matches && 'IntersectionObserver' in window) {
  let mx = 0;
  let raf = null;
  const apply = () => {
    raf = null;
    heroContent.style.setProperty('--mx', mx.toFixed(4)); // jeden zapis stylu na klatkę
  };
  const onMove = (e) => {
    mx = e.clientX / window.innerWidth - 0.5;
    if (raf === null) raf = requestAnimationFrame(apply);
  };

  let bound = false;
  const bind = () => {
    if (!bound) { window.addEventListener('pointermove', onMove, { passive: true }); bound = true; }
  };
  const unbind = () => {
    if (bound) { window.removeEventListener('pointermove', onMove); bound = false; }
    heroContent.style.setProperty('--mx', '0');
  };

  // nasłuch działa wyłącznie, gdy hero jest w viewporcie
  const heroIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !motionMq.matches) bind(); else unbind();
    });
  });
  heroIo.observe(heroSection);

  // użytkownik może włączyć reduced-motion w trakcie sesji — gasimy parallax od razu
  if (motionMq.addEventListener) {
    motionMq.addEventListener('change', () => { if (motionMq.matches) unbind(); });
  }
}

// ===== Rok w stopce =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
