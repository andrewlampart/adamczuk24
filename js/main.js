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
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      counters.forEach((el, i) => setTimeout(() => animate(el), i * STAGGER));
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

// ===== Rok w stopce =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
