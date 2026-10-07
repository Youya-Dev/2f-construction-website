// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    toggle.focus();
  }
});

document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Quote form: validate on submit and on blur. Not yet connected to an inbox.
const form = document.getElementById('quote-form');
if (form) setUpQuoteForm(form);

function setUpQuoteForm(form) {
  const status = form.querySelector('.form-status');

  const checks = {
    name: (v) => v.trim().length > 0,
    phone: (v) => v.replace(/[^\d]/g, '').length >= 10,
    email: (v) => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    postcode: (v) => /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(v.trim()),
  };

  function validate(field) {
    const ok = checks[field.name](field.value);
    const error = document.getElementById(`${field.name}-error`);
    field.setAttribute('aria-invalid', String(!ok));
    if (ok) field.removeAttribute('aria-describedby');
    else field.setAttribute('aria-describedby', error.id);
    error.hidden = ok;
    return ok;
  }

  Object.keys(checks).forEach((name) => {
    form.elements[name].addEventListener('blur', (e) => {
      if (e.target.value !== '') validate(e.target);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = Object.keys(checks)
      .map((name) => form.elements[name])
      .filter((field) => !validate(field));

    if (invalid.length) {
      status.textContent = '';
      invalid[0].focus();
      return;
    }

    // TODO: send to Formspree, Netlify Forms or an email service once one is chosen.
    status.textContent = 'Preview only: this form isn’t connected to an inbox yet, so nothing was sent.';
    form.reset();
  });
}
