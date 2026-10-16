export function moteCount(width) {
  if (!Number.isFinite(width) || width < 480) return 0;
  return Math.min(12, Math.max(0, Math.floor((width - 480) / 80) + 1));
}

export function shouldAnimate(prefersReduced) {
  return !prefersReduced;
}

export function stagger(index, stepMs) {
  const safeIndex = Number.isFinite(index) ? Math.max(0, index) : 0;
  const safeStep = Number.isFinite(stepMs) ? Math.max(0, stepMs) : 0;
  return `${safeIndex * safeStep}ms`;
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  const hero = document.querySelector('#hero');
  const moteLayer = document.querySelector('#motes');
  const entrance = [
    document.querySelector('.hero__eyebrow'),
    document.querySelector('#hero-title'),
    document.querySelector('.hero__subhead'),
    document.querySelector('.hero__cta'),
  ];
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (hero && moteLayer) {
    const motes = [
      ['8%', '3px', '#ff7a3d', '6.1s', '0s', '22px'],
      ['16%', '2px', '#ffd9a0', '7.4s', '1.1s', '-17px'],
      ['27%', '3px', '#ff9b55', '6.8s', '2.7s', '19px'],
      ['38%', '2px', '#ffd9a0', '8s', '.6s', '-24px'],
      ['48%', '4px', '#ff7a3d', '7.1s', '3.1s', '15px'],
      ['58%', '2px', '#ffbc72', '6.5s', '1.8s', '-20px'],
      ['69%', '3px', '#ff7a3d', '7.7s', '.3s', '23px'],
      ['81%', '2px', '#ffd9a0', '6.3s', '2.3s', '-14px'],
      ['91%', '3px', '#ff9955', '8.2s', '4s', '18px'],
      ['34%', '2px', '#ff7a3d', '7.3s', '4.8s', '-19px'],
      ['74%', '4px', '#ffd9a0', '6.9s', '5.2s', '21px'],
      ['53%', '2px', '#ff9955', '8.4s', '3.7s', '-16px'],
    ];

    let inView = false;
    let visible = document.visibilityState !== 'hidden';
    let animated = shouldAnimate(motionQuery.matches);
    entrance.forEach((element, index) => {
      if (element) element.style.animationDelay = stagger(index, 120);
    });

    function syncMotion() {
      const active = animated && visible && inView;
      hero.classList.toggle('is-paused', !active);
      hero.classList.toggle('is-animating', active);
    }

    function setMotionPreference(event) {
      animated = shouldAnimate(event.matches);
      if (animated) {
        const count = moteCount(window.innerWidth);
        motes.slice(0, count).forEach((mote, index) => {
          const [x, size, tone, duration, delay, sway] = mote;
          const element = document.createElement('span');
          element.className = 'mote';
          element.setAttribute('aria-hidden', 'true');
          element.style.setProperty('--x', x);
          element.style.setProperty('--size', size);
          element.style.setProperty('--tone', tone);
          element.style.setProperty('--duration', duration);
          element.style.setProperty('--delay', `${parseFloat(delay) + index * 0.12}s`);
          element.style.setProperty('--sway', sway);
          moteLayer.append(element);
        });
      } else {
        moteLayer.replaceChildren();
      }
      syncMotion();
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncMotion();
    });
    observer.observe(hero);
    document.addEventListener('visibilitychange', () => {
      visible = document.visibilityState !== 'hidden';
      syncMotion();
    });
    motionQuery.addEventListener('change', setMotionPreference);
    setMotionPreference(motionQuery);
  }
}
