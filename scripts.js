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

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initReveal();
});

window.addEventListener('pageshow', () => {
  initReveal();
});

window.addEventListener('load', () => {
  initReveal();
});
