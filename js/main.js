/* ===== Curanova — Shared JavaScript ===== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ---- Hamburger menu ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ---- Active nav link ----
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === '#hero')) return;
    if (href && path.includes(href.replace('.html', ''))) {
      a.classList.add('active');
    }
  });
})();

// ---- Scroll animations (IntersectionObserver) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ---- Interest chips (request-demo) ----
document.querySelectorAll('.interest-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('selected');
  });
});

// ---- Request demo form ----
const demoForm = document.getElementById('demo-form');
if (demoForm) {
  demoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const farmSize = this.querySelector('[name="farm-size"]').value;
    if (!farmSize) {
      alert('Please select your farm size.');
      return;
    }
    const btn = this.querySelector('[type="submit"]');
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('form-wrap').style.display = 'none';
      document.getElementById('success-wrap').style.display = 'block';
    }, 1200);
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Counter animation for stats ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const isDecimal = String(target).includes('.');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));
