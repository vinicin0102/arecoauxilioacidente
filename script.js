// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
function revealElements() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('active');
  });
}
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Animated counters
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    if (el.dataset.animated) return;
    const top = el.getBoundingClientRect().top;
    if (top > window.innerHeight) return;
    el.dataset.animated = 'true';
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = prefix + Math.floor(current).toLocaleString('pt-BR') + suffix;
    }, 16);
  });
}
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// Form submission
const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${name}, telefone ${phone}. Gostaria de verificar meu direito ao Auxílio-Acidente.`
    );
    window.open(`https://wa.me/5511995076662?text=${msg}`, '_blank');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Phone mask
const phoneInput = document.querySelector('[name="phone"]');
if (phoneInput) {
  phoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });
}
