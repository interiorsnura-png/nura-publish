document.documentElement.classList.add('js-ready');
const hero = document.querySelector('.hero');
const heroAurora = document.querySelector('.hero-aurora');
const heroImage = document.querySelector('.hero-image');
if (hero && heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches) {
  let frame = 0;
  let pointer = null;
  let bounds = hero.getBoundingClientRect();
  const update = () => {
    frame = 0;
    if (!pointer) return;
    const x = (pointer.clientX - bounds.left) / bounds.width - 0.5;
    const y = (pointer.clientY - bounds.top) / bounds.height - 0.5;
    heroImage.style.transform = `scale(1.035) translate(${x * -10}px, ${y * -8}px)`;
    if (heroAurora) heroAurora.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
  };
  hero.addEventListener('pointermove', (event) => {
    pointer = event;
    if (!frame) frame = requestAnimationFrame(update);
  });
  window.addEventListener('resize', () => { bounds = hero.getBoundingClientRect(); }, {passive: true});
  hero.addEventListener('pointerleave', () => {
    heroImage.style.transform = '';
    if (heroAurora) heroAurora.style.transform = '';
  });
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const firstMenuLink = navigation?.querySelector('a');

function setMenuLabel(isOpen) {
  const label = menuButton?.querySelector('span');
  if (label) label.textContent = isOpen ? 'Close' : 'Menu';
}

function closeMenu({ restoreFocus = false } = {}) {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  setMenuLabel(false);
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton?.focus();
}

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  setMenuLabel(isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  if (isOpen) firstMenuLink?.focus();
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('is-open')) closeMenu({ restoreFocus: true });
});
document.addEventListener('click', (event) => {
  if (navigation?.classList.contains('is-open') && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu({ restoreFocus: true });
});

const enquiryForm = document.querySelector('[data-enquiry-form]');
const queryParams = new URLSearchParams(window.location.search);
['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
  const value = queryParams.get(key);
  const field = enquiryForm?.elements.namedItem(key);
  if (value && field) field.value = value;
});
enquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = enquiryForm.querySelector('.form-status');
  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    status.textContent = 'Please complete the required fields.';
    return;
  }
  const button = enquiryForm.querySelector('[type="submit"]');
  if (button.disabled) return;
  button.disabled = true;
  const data = window.nuraEnquiry.prepare(enquiryForm,Object.fromEntries(new FormData(enquiryForm)));
  const endpoint = enquiryForm.dataset.endpoint;
  status.textContent = 'Sending your enquiry…';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error('Enquiry request failed');
    enquiryForm.reset();
      window.nuraEnquiry.complete(enquiryForm,result,{form_location:'home',enquiry_type:'consultation'});
    status.textContent = 'Thank you. We’ll be in touch shortly.';
  } catch (error) {
    status.textContent = 'We could not send your enquiry. Please email studio@nura-interiors.com.';
  } finally {
    button.disabled = false;
  }
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
