
// ── MOBILE NAV HAMBURGER
function toggleMobileNav() {
  const nav = document.getElementById('nav-links');
  const btn = document.getElementById('nav-hamburger');
  if (!nav || !btn) return;

  const isOpen = nav.classList.toggle('mobile-open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('mobile-nav-open', isOpen);
}

// Close mobile nav when a link is clicked
document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    const nav = document.getElementById('nav-links');
    const btn = document.getElementById('nav-hamburger');
    if (nav) nav.classList.remove('mobile-open');
    if (btn) {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('mobile-nav-open');
  });
});

// ── SWIPE SUPPORT FOR SLIDESHOWS
function addSwipeSupport(slideshowId) {
  const el = document.getElementById(slideshowId);
  if (!el) return;
  let startX = 0;
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      // Find the controls wrapper and click prev/next
      const controls = el.nextElementSibling;
      if (!controls) return;
      const btns = controls.querySelectorAll('.slideshow-btn');
      if (diff > 0 && btns[1]) btns[1].click(); // swipe left = next
      else if (btns[0]) btns[0].click();          // swipe right = prev
    }
  }, { passive: true });
}

// Init swipe on all slideshows
['giftcards-slideshow','stream-video-slideshow','stream-img-slideshow',
 'newyear-slideshow','bestseller-pn-slideshow','bestseller-insta-slideshow',
 'cinemaisback-slideshow','redlorry-festival-slideshow','redlorry-merch-slideshow'
].forEach(addSwipeSupport);

// ── TOUCH DEVICE — hide googly eyes cursor, restore cursor, add tap googly eyes
if ('ontouchstart' in window) {
  const eyes = document.getElementById('cursor-eyes');
  if (eyes) eyes.style.display = 'none';
  document.body.style.cursor = 'auto';

  // Floating googly eyes on tap
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      display: flex;
      gap: 4px;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      animation: tapEyeFloat 1.2s ease-out forwards;
    `;

    for (let i = 0; i < 2; i++) {
      const eye = document.createElement('div');
      eye.style.cssText = `
        width: 20px; height: 20px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid #222;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        position: relative;
      `;
      const pupil = document.createElement('div');
      // Random pupil direction
      const angle = Math.random() * Math.PI * 2;
      const px = Math.cos(angle) * 4;
      const py = Math.sin(angle) * 4;
      pupil.style.cssText = `
        width: 8px; height: 8px;
        background: #111;
        border-radius: 50%;
        position: absolute;
        transform: translate(${px}px, ${py}px);
      `;
      eye.appendChild(pupil);
      container.appendChild(eye);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1200);
  }, { passive: true });
}

// ── THEME TOGGLE (Cinematic / Chaotic)
const CINEMATIC_CSS = 'style.css?v=10';
const CHAOTIC_CSS   = 'style-experiment.css?v=18';

function toggleTheme() {
  const sheet = document.getElementById('theme-stylesheet');
  const label = document.getElementById('theme-label');
  const isChaotic = document.body.classList.contains('chaotic');

  if (isChaotic) {
    // Switch to Cinematic
    sheet.href = CINEMATIC_CSS;
    document.body.classList.remove('chaotic');
    label.textContent = 'Cinematic';
    localStorage.setItem('theme', 'cinematic');
  } else {
    // Switch to Chaotic
    sheet.href = CHAOTIC_CSS;
    document.body.classList.add('chaotic');
    label.textContent = 'Chaotic';
    localStorage.setItem('theme', 'chaotic');
  }
}

// Apply saved theme on load
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'chaotic') {
    const sheet = document.getElementById('theme-stylesheet');
    const label = document.getElementById('theme-label');
    if (sheet) sheet.href = CHAOTIC_CSS;
    if (label) label.textContent = 'Chaotic';
    document.body.classList.add('chaotic');
  }
})();

// ── RABBIT HOLE
// Add more links here as needed (space kept for 5–6 more)
const rabbitHoleLinks = [
  'https://x.com/thevirdas/status/1729878363375116525?s=20',
  'https://www.instagram.com/p/Cq4yWxjIb1E/?img_index=1',
  'https://www.facebook.com/BookMyShowIN/videos/rasputin-x-k3g-amitabh-bachchan/927087774789187/',
  'https://www.behance.net/gallery/96714527/Reynolds-Pencil-Design-Concepts',
  'https://x.com/bookmyshow/status/1523189495847288832?s=20',
  'https://x.com/bookmyshow/status/1337283713063735296?s=20',
  'https://sickoleave.bookmyshow.com/',
  'https://www.instagram.com/p/CPlJxQOhYwr/',
  'https://www.instagram.com/p/Ca615QSgVLU/',
  'https://www.instagram.com/p/CbO_fPoKjGD/',
  'https://in.bookmyshow.com/throwback/2023/',
  'https://www.instagram.com/p/C8Y3omcNg-t/?img_index=4',
  'https://drive.google.com/file/d/10aaJuZ1-vPw4plvixivZGQGuSvk_UsV4/view?usp=sharing',
  'https://drive.google.com/file/d/15sdhh1iKAmshU7kDAmMDFSJGwncfiedq/view?usp=sharing',
  'https://docs.google.com/document/d/1zLN57u89YiiX_Poccb1liSQVvLI7TBPd/edit?usp=sharing&ouid=112757610663631530846&rtpof=true&sd=true',
  'https://drive.google.com/file/d/1j8TRC8lThbjJA7jzu4T92B8xnin4o4vK/view?usp=sharing',
  'https://drive.google.com/file/d/1hcMpGSrz8VMZyS3AEoo9XHekJDwYpcEd/view?usp=sharing',
  'https://drive.google.com/drive/u/0/folders/1xbPJ-nCMn0J7bcfm42CH-OaMD5cBiagl',
  // — future links go here —
  // '',
  // '',
];

function goRabbitHole() {
  const url = rabbitHoleLinks[Math.floor(Math.random() * rabbitHoleLinks.length)];
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ── GOOGLY EYES CURSOR
const eyes = document.getElementById('cursor-eyes');
const pupilLeft = document.getElementById('pupil-left');
const pupilRight = document.getElementById('pupil-right');
const thought = document.getElementById('cursor-thought');
let mouseX = 0, mouseY = 0;
let prevX = 0, prevY = 0;

const thoughts = [
  "Yes, but weirder, human",
  "Wait, hear me out!",
  "More feeling, less explaining",
  "The brief is wrong",
  "What would Komal do?",
  "Why am I married to this idea?",
  "Brain, you are doing that thing again!",
  "Blank page is a good problem to have",
  "This brief is my playground",
  "Ugh, too many metaphors",
  "That's insight-adjacent",
  "Would I care if I saw this?",
  "This is either brilliant or stupid",
  "No, no, no – Yes",
  "Too polished, not Komal",
  "I need a push gift for pushing this",
  "Scavenge that right brain",
  "This is almost something",
  "Is that an A24 movie reference?",
  "Is the process trusting me?",
  "Gut: Yeahhhhh! Brain: Noooo",
];

let currentThought = '';

function movePupil(pupil, eyeEl, mx, my) {
  const rect = eyeEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = mx - cx;
  const dy = my - cy;
  const angle = Math.atan2(dy, dx);
  const maxDist = 5;
  const px = Math.cos(angle) * maxDist;
  const py = Math.sin(angle) * maxDist;
  pupil.style.transform = `translate(${px}px, ${py}px)`;
}

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  eyes.style.left = mouseX + 'px';
  eyes.style.top = mouseY + 'px';
  thought.style.left = mouseX + 'px';
  thought.style.top = mouseY + 'px';

  movePupil(pupilLeft, document.getElementById('eye-left'), mouseX, mouseY);
  movePupil(pupilRight, document.getElementById('eye-right'), mouseX, mouseY);

  prevX = mouseX;
  prevY = mouseY;
});

function setRandomThought() {
  let t;
  do { t = thoughts[Math.floor(Math.random() * thoughts.length)]; }
  while (t === currentThought && thoughts.length > 1);
  currentThought = t;
  thought.textContent = t;
}

document.querySelectorAll('a, button, .project-tile, .filter-btn, .messy-toggle, .nav-logo').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
    setRandomThought();
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering');
  });
});

// ── TIME-BASED GREETING
function setGreeting() {
  const h = new Date().getHours();
  const banner = document.getElementById('greeting-banner');
  let msg = '';
  if (h >= 5 && h < 12) msg = "\u2600\uFE0F Good morning. You caught me before the ideas start talking to each other.";
  else if (h >= 12 && h < 17) msg = "\uD83C\uDF24\uFE0F Good afternoon. I\u2019m probably mid-sentence on something right now.";
  else if (h >= 17 && h < 21) msg = "\uD83C\uDF06 Good evening. Peak creativity hours. You\u2019re just in time.";
  else msg = "\uD83C\uDF19 You\u2019re here at 2AM too? Welcome. This is when the good ideas happen.";

  banner.textContent = msg;
  banner.classList.add('show');
  setTimeout(() => banner.classList.remove('show'), 5000);
}
setTimeout(setGreeting, 800);

// ── PAGE ROUTING
function setActiveNav(name) {
  const navMap = {
    gallery: 'gallery', extra: 'extra', about: 'about',
    bestseller: 'gallery', santa: 'gallery', bytescripts: 'gallery',
    stream: 'gallery', giftcards: 'gallery', redlorry: 'gallery',
  };
  const current = navMap[name] || 'gallery';
  // Check if mobile nav is in use (hamburger visible = mobile mode)
  const hamburger = document.getElementById('nav-hamburger');
  const isMobile = hamburger && window.getComputedStyle(hamburger).display !== 'none';

  document.querySelectorAll('.nav-links li[data-page]').forEach(li => {
    if (isMobile) {
      li.style.display = '';  // show all links in mobile menu
    } else {
      li.style.display = (li.dataset.page === current) ? 'none' : '';
    }
  });
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(name === 'gallery' ? 'gallery-page' :
    name === 'about' ? 'about-page' :
    name === 'extra' ? 'extra-page' : name + '-page');
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    setTimeout(() => { initReveal(); initSlideshowsOnPage(); }, 100);
  }
  setActiveNav(name);
  return false;
}

function showProject(name) {
  showPage(name);
  return false;
}

// ── SCROLL REVEAL
function initReveal() {
  const els = document.querySelectorAll('.page.active .reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
  // Immediately trigger visible ones
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
}

// ── MESSY THINKING TOGGLE
function toggleMessy(id) {
  const track = document.getElementById('toggle-' + id);
  const content = document.getElementById('messy-' + id);
  track.classList.toggle('on');
  content.classList.toggle('show');
}

// ── FILTER
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-tile').forEach(tile => {
      if (filter === 'all' || (tile.dataset.category && tile.dataset.category.includes(filter))) {
        tile.style.opacity = '1';
        tile.style.pointerEvents = 'auto';
        tile.style.transform = '';
      } else {
        tile.style.opacity = '0.25';
        tile.style.pointerEvents = 'none';
      }
    });
  });
});

// ── COPY CHANGE based on time of day (tile micro-copy)
const timeGreetings = document.querySelectorAll('[data-time-copy]');
// Easter egg: title changes on 5s hover
document.querySelectorAll('.gallery-title').forEach(el => {
  let hoverTimer;
  el.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = 0;
      setTimeout(() => {
        el.innerHTML = 'The <em style="color:var(--moss)">brain.</em><br>The work.<br>The proof.';
        el.style.opacity = 1;
      }, 300);
    }, 4000);
  });
  el.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
});

// ── TILE VIDEO HOVER AUTOPLAY
document.querySelectorAll('.project-tile').forEach(tile => {
  const vid = tile.querySelector('.tile-bg-video');
  if (!vid) return;
  tile.addEventListener('mouseenter', () => vid.play().catch(() => {}));
  tile.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
});

// ── AUTO SLIDESHOWS
function initAutoSlideshow(slideshowId, dotsId, intervalMs) {
  const slideshow = document.getElementById(slideshowId);
  const dotsContainer = document.getElementById(dotsId);
  if (!slideshow || !dotsContainer) return;

  const track = slideshow.querySelector('.auto-slideshow-track');
  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  let current = 0;
  let timer;

  // Build dots + prev/next controls
  const controlsWrapper = document.createElement('div');
  controlsWrapper.className = 'auto-slideshow-controls';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'slideshow-btn';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'slideshow-btn';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';

  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsContainer.appendChild(dot);
  });

  controlsWrapper.appendChild(prevBtn);
  controlsWrapper.appendChild(dotsContainer);
  controlsWrapper.appendChild(nextBtn);

  // Insert controls after the slideshow overflow container
  slideshow.parentNode.insertBefore(controlsWrapper, slideshow.nextSibling);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('span').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), intervalMs || 5000);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  // Pause on hover
  slideshow.addEventListener('mouseenter', () => clearInterval(timer));
  slideshow.addEventListener('mouseleave', resetTimer);

  resetTimer();
}

// Init all slideshows when page becomes active
const slideshowConfigs = [
  { id: 'giftcards-slideshow', dots: 'giftcards-dots', interval: 5000 },
  { id: 'stream-video-slideshow', dots: 'stream-video-dots', interval: 6000 },
  { id: 'stream-img-slideshow', dots: 'stream-img-dots', interval: 5000 },
  { id: 'newyear-slideshow', dots: 'newyear-dots', interval: 5000 },
  { id: 'bestseller-pn-slideshow', dots: 'bestseller-pn-dots', interval: 4000 },
  { id: 'bestseller-insta-slideshow', dots: 'bestseller-insta-dots', interval: 4000 },
  { id: 'cinemaisback-slideshow', dots: 'cinemaisback-dots', interval: 5000 },
  { id: 'redlorry-festival-slideshow', dots: 'redlorry-festival-dots', interval: 5000 },
  { id: 'redlorry-merch-slideshow', dots: 'redlorry-merch-dots', interval: 4000 },
];

const _initializedSlideshows = new Set();

function initSlideshowsOnPage() {
  slideshowConfigs.forEach(cfg => {
    if (!_initializedSlideshows.has(cfg.id)) {
      initAutoSlideshow(cfg.id, cfg.dots, cfg.interval);
      _initializedSlideshows.add(cfg.id);
    }
  });
}

// ── INIT
initReveal();
initSlideshowsOnPage();
setActiveNav('gallery');
window.addEventListener('scroll', initReveal, { passive: true });
window.addEventListener('resize', () => setActiveNav('gallery'), { passive: true });
