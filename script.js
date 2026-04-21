/* ═══════════════════════════════════════════════════════════════════════════
   PORTFOLIO — MARIANO FRANCO HURTADO
   script.js — Interactividad, animaciones y comportamiento
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────── THEME TOGGLE ──────────── */
(function initTheme() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  // Detecta preferencia del sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);

  function updateIcon(theme) {
    if (!toggle) return;
    if (theme === 'dark') {
      // Mostrar ícono sol (para cambiar a claro)
      toggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>`;
      toggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      // Mostrar ícono luna (para cambiar a oscuro)
      toggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>`;
      toggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  updateIcon(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateIcon(currentTheme);
    });
  }
})();


/* ──────────── STICKY NAV — scroll behavior ──────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();


/* ──────────── MOBILE MENU ──────────── */
(function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en un link del menú
  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (isOpen && !toggle.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
})();


/* ──────────── SMOOTH SCROLL para links de navegación ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ──────────── INTERSECTION OBSERVER — reveal animations ──────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respeta prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeño stagger para elementos hermanos
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ──────────── BARRA DE IDIOMAS — animación de entrada ──────────── */
(function initLangBars() {
  const bars = document.querySelectorAll('.lang-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ──────────── ACTIVE NAV LINK — highlight según sección visible ──────────── */
(function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav__links .nav__link:not(.nav__link--cta)');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.color = 'var(--color-primary)';
            link.style.fontWeight = '600';
          } else {
            link.style.color = '';
            link.style.fontWeight = '';
          }
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: `-${document.getElementById('nav')?.offsetHeight || 68}px 0px -40% 0px`
  });

  sections.forEach(section => observer.observe(section));
})();


/* ──────────── BOTÓN WHATSAPP — reemplaza placeholder de número ──────────── */
// Actualiza los links de WhatsApp con el número real si lo tienes
// Para activar: reemplaza 'TU_NUMERO' con el número en formato internacional sin +
// Ejemplo: '5213312345678' para un número de Guadalajara
(function updateWhatsAppLinks() {
  const waNumber = '521XXXXXXXXXX'; // Reemplaza con tu número real
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach(link => {
    // Los links ya apuntan al número configurado en el HTML
    // Esta función puede usarse para actualizar dinámicamente si es necesario
  });
})();


/* ──────────── EFECTO PARALLAX SUTIL en el hero ──────────── */
(function initParallax() {
  const topo = document.querySelector('.hero__topo');
  if (!topo) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
    if (scrolled < heroHeight) {
      topo.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
})();


/* ──────────── COPYRIGHT AÑO DINÁMICO ──────────── */
(function updateYear() {
  const copy = document.querySelector('.footer__copy');
  if (!copy) return;
  const year = new Date().getFullYear();
  copy.textContent = `© ${year} · Ingeniero Civil · Guadalajara, México`;
})();
