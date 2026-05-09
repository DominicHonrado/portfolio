function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('#nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('hidden');
    });
  }

  links.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.remove('text-slate-300');
      link.classList.add('text-white', 'font-semibold');
    }

    link.addEventListener('click', () => {
      if (navLinks && !navLinks.classList.contains('hidden') && window.innerWidth < 640) {
        navLinks.classList.add('hidden');
      }
    });
  });
}

function initReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) {
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
}

function updateStats() {
  // Update certifications count by fetching and parsing certifications.html
  fetch('certifications.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const certImages = doc.querySelectorAll('img[data-cert-image]');
      const count = certImages.length;
      const certElement = document.querySelector('.certifications-count');
      if (certElement) certElement.textContent = count;
    })
    .catch(err => console.error('Error fetching certifications:', err));

  // Update years coding
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  const yearsElement = document.querySelector('.years-coding');
  if (yearsElement) yearsElement.textContent = years;
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initReveal();
  updateStats();
});

window.addEventListener('pageshow', () => {
  initReveal();
});

window.addEventListener('load', () => {
  initReveal();
});
