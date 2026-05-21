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
  // The text is managed by the i18n system via data-i18n="footer.copy".
  // Just prepend the © year prefix as a text node before the first child.
  const yearNode = document.createTextNode(`© ${year} · `);
  copy.insertBefore(yearNode, copy.firstChild);
})();


/* ────────── TOOLTIPS TÁCTILES EN MÓVIL ────────── */
(function initTooltipTouch() {
  const pills = document.querySelectorAll('.skill-pill[data-tooltip]');
  let activePill = null;

  pills.forEach(pill => {
    pill.addEventListener('touchstart', (e) => {
      if (window.matchMedia('(hover: hover)').matches) return;
      e.preventDefault();
      if (activePill && activePill !== pill) {
        activePill.classList.remove('tooltip-visible');
      }
      pill.classList.toggle('tooltip-visible');
      activePill = pill.classList.contains('tooltip-visible') ? pill : null;
    }, { passive: false });
  });

  document.addEventListener('touchstart', (e) => {
    if (activePill && !activePill.contains(e.target)) {
      activePill.classList.remove('tooltip-visible');
      activePill = null;
    }
  }, { passive: true });
})();


/* ────────── MODAL DE PROYECTOS ────────── */
(function initProjectModals() {

  const PROJECTS = {
    diageo: {
      es: {
        title: 'Economía Circular — Diageo',
        date: 'Ene. 2025 – May. 2025',
        location: 'Jalisco, México',
        slides: [
          { label: 'Propuesta de revalorización de vidrio', icon: '🌱', img: 'DIAGEO-IMG1.png' },
          { label: 'Análisis de cadena de valor', icon: '🔄', img: 'DIAGEO-IMG2.png' },
          { label: 'Modelo de economía circular', icon: '📊', img: 'DIAGEO-IMG3.png' },
        ],
        description: 'Proyecto para la revalorización de residuos de vidrio generados en la industria tequilera, en el marco de las metas de sustentabilidad corporativa de Diageo. Se analizó el ciclo de vida del vidrio, se identificaron puntos de mejora en la cadena de valor y se diseñó un modelo de economía circular aplicado al contexto de producción de bebidas en Jalisco.',
        participation: [
          'Diagnóstico del flujo de residuos de vidrio en la planta.',
          'Diseño del modelo de revalorización y propuesta de alternativas de reutilización.',
          'Elaboración de la presentación ejecutiva para stakeholders de Diageo.',
          'Cálculo de indicadores de impacto ambiental y potencial de reducción de emisiones.',
        ],
        tools: ['Análisis de ciclo de vida', 'Excel', 'PowerPoint', 'Investigación de campo'],
        badges: ['Sustentabilidad', 'Economía Circular', 'Industria Tequilera', 'Diageo'],
      },
      en: {
        title: 'Circular Economy — Diageo',
        date: 'Jan. 2025 – May 2025',
        location: 'Jalisco, Mexico',
        slides: [
          { label: 'Glass waste recovery proposal', icon: '🌱', img: 'DIAGEO-IMG1.png' },
          { label: 'Value chain analysis', icon: '🔄', img: 'DIAGEO-IMG2-EN.png' },
          { label: 'Circular economy model design', icon: '📊', img: 'DIAGEO-IMG3-EN.png' },
        ],
        description: "Project focused on recovering glass waste generated in the tequila industry, within the scope of Diageo\u2019s corporate sustainability goals. The glass life cycle was analysed, improvement points in the value chain were identified, and a circular economy model was designed for the beverage production context in Jalisco.",
        participation: [
          'Assessment of glass waste flow throughout the plant.',
          'Design of the recovery model and proposal of reuse alternatives.',
          'Preparation of the executive presentation for Diageo stakeholders.',
          'Calculation of environmental impact indicators and emission-reduction potential.',
        ],
        tools: ['Life cycle assessment', 'Excel', 'PowerPoint', 'Field research'],
        badges: ['Sustainability', 'Circular Economy', 'Tequila Industry', 'Diageo'],
      },
    },
    clj: {
      es: {
        title: 'Aeródromo Multimodal — CLJ',
        date: 'Ene. 2024 – Jun. 2024',
        location: 'Jalisco, México',
        slides: [
          { label: 'Diseño de aeropista e infraestructura', icon: '✈️' },
          { label: 'Integración de conectividad ferroviaria', icon: '🚂' },
          { label: 'Propuesta logística multimodal', icon: '🗺️' },
        ],
        description: 'Diseño de una propuesta de infraestructura logística para el Centro Logístico de Jalisco (CLJ), integrando una aeropista de uso privado con conexiones ferroviarias y carreteras. El objetivo fue crear un hub de conectividad multimodal que potenciara la cadena logística de la región y redujera tiempos de trasiego de mercancías.',
        participation: [
          'Participación en el diseño de la geometría y capacidad de la aeropista.',
          'Elaboración de planos de distribución de infraestructura y accesos.',
          'Análisis de normativas de aviación civil aplicables al proyecto.',
          'Redacción del informe técnico final.',
        ],
        tools: ['AutoCAD', 'CivilCAD', 'Excel', 'Normativa SCT', 'BIM'],
        badges: ['Infraestructura', 'Logística', 'Diseño multimodal', 'Aviación Civil'],
      },
      en: {
        title: 'Multimodal Airstrip — CLJ',
        date: 'Jan. 2024 – Jun. 2024',
        location: 'Jalisco, Mexico',
        slides: [
          { label: 'Airstrip and infrastructure design', icon: '✈️' },
          { label: 'Railway connectivity integration', icon: '🚂' },
          { label: 'Multimodal logistics proposal', icon: '🗺️' },
        ],
        description: 'Design of a logistics infrastructure proposal for the Jalisco Logistics Center (CLJ), integrating a private-use airstrip with railway and road connections. The goal was to create a multimodal connectivity hub that would strengthen the regional logistics chain and reduce cargo transit times.',
        participation: [
          'Participation in the geometry and capacity design of the airstrip.',
          'Production of infrastructure layout and access drawings.',
          'Analysis of applicable civil aviation regulations.',
          'Writing of the final technical report.',
        ],
        tools: ['AutoCAD', 'CivilCAD', 'Excel', 'SCT Standards', 'BIM'],
        badges: ['Infrastructure', 'Logistics', 'Multimodal design', 'Civil Aviation'],
      },
    },
    conagua: {
      es: {
        title: 'Red de Abastecimiento — CONAGUA',
        date: 'Ago. 2023 – Dic. 2023',
        location: 'Guadalajara, Jalisco',
        slides: [
          { label: 'Diseño de red hidráulica', icon: '💧' },
          { label: 'Modelado en EPANET', icon: '💻' },
          { label: 'Red de alcantarillado', icon: '🗺️' },
        ],
        description: 'Proyecto aplicado al caso real de la comunidad de Mezquitic, Jalisco. Se diseñó una red de abastecimiento de agua potable y un sistema de alcantarillado sanitario, con base en criterios técnicos de cobertura, presión, velocidades de flujo y proyección de demanda poblacional.',
        participation: [
          'Diseño de la red de distribución de agua potable con criterios normativos.',
          'Modelado de la red hidráulica en EPANET y verificación de presiones y velocidades.',
          'Diseño del sistema de alcantarillado sanitario y pluvial.',
          'Elaboración de memorias de cálculo y planos en AutoCAD.',
        ],
        tools: ['EPANET', 'AutoCAD', 'Excel', 'CivilCAD', 'Normas NOM'],
        badges: ['Hidráulica', 'EPANET', 'Infraestructura', 'Agua Potable'],
      },
      en: {
        title: 'Water Supply Network — CONAGUA',
        date: 'Aug. 2023 – Dec. 2023',
        location: 'Guadalajara, Jalisco',
        slides: [
          { label: 'Hydraulic network design', icon: '💧' },
          { label: 'EPANET hydraulic modelling', icon: '💻' },
          { label: 'Sewage network design', icon: '🗺️' },
        ],
        description: 'Project applied to the real case of the Mezquitic community in Jalisco. A potable water distribution network and a sanitary sewage system were designed based on technical criteria for coverage, pressure, flow velocities, and population demand projection.',
        participation: [
          'Design of the water distribution network following regulatory standards.',
          'Hydraulic network modelling in EPANET and verification of pressures and velocities.',
          'Design of the sanitary and storm sewage system.',
          'Preparation of calculation reports and AutoCAD drawings.',
        ],
        tools: ['EPANET', 'AutoCAD', 'Excel', 'CivilCAD', 'NOM Standards'],
        badges: ['Hydraulics', 'EPANET', 'Infrastructure', 'Potable Water'],
      },
    },
    'excel-autocad': {
      es: {
        title: 'Automatización de datos topográficos en AutoCAD mediante Excel',
        date: '2025 – 2026',
        location: 'Guadalajara, Jalisco',
        slides: [
          { label: 'Estructuración y nomenclatura de datos topográficos', icon: '📐' },
          { label: 'Preparación de coordenadas para AutoCAD', icon: '📊' },
          { label: 'Estandarización del flujo de trabajo técnico', icon: '⚙️' },
        ],
        description: 'Este proyecto consistió en automatizar parte del flujo de trabajo entre Excel y AutoCAD para el procesamiento de datos topográficos y de líneas relacionadas con estudios de georradar. La solución permitió ordenar datos, generar nomenclaturas, estructurar tablas y preparar información utilizable dentro del entorno CAD, disminuyendo errores operativos y acelerando tareas repetitivas que antes se realizaban manualmente.',
        participation: [
          'Diseño de la lógica de automatización en Excel para transformar datos de entrada en una estructura técnicamente útil.',
          'Estandarización del nombrado de líneas y preparación de coordenadas para AutoCAD.',
          'Generación de tablas estructuradas que facilitan la inserción y representación de elementos en el entorno CAD.',
          'Reducción de errores operativos mediante validaciones y nomenclaturas consistentes.',
        ],
        tools: ['Excel', 'AutoCAD', 'GPR-SLICE', 'Fórmulas avanzadas', 'Datos técnicos'],
        badges: ['Topografía', 'AutoCAD', 'Excel', 'Automatización', 'Datos técnicos'],
      },
      en: {
        title: 'Topographic Data Automation — Excel to AutoCAD',
        date: '2025 – 2026',
        location: 'Guadalajara, Jalisco',
        slides: [
          { label: 'Topographic data structuring and naming', icon: '📐' },
          { label: 'Coordinate preparation for AutoCAD', icon: '📊' },
          { label: 'Technical workflow standardisation', icon: '⚙️' },
        ],
        description: 'This project consisted of automating part of the workflow between Excel and AutoCAD for the processing of topographic and GPR line data. The solution enabled data ordering, nomenclature generation, table structuring, and preparation of CAD-ready information, reducing operational errors and accelerating repetitive tasks previously done manually.',
        participation: [
          'Designed the Excel automation logic to transform raw input data into a technically useful structure.',
          'Standardised line naming and prepared coordinate data for AutoCAD.',
          'Generated structured tables to streamline element insertion and representation in the CAD environment.',
          'Reduced operational errors through consistent validations and naming conventions.',
        ],
        tools: ['Excel', 'AutoCAD', 'GPR-SLICE', 'Advanced formulas', 'Technical data'],
        badges: ['Surveying', 'AutoCAD', 'Excel', 'Automation', 'Technical data'],
      },
    },
    'gpr-autohotkey': {
      es: {
        title: 'Automatización operativa GPR-SLICE con AutoHotkey',
        date: '2025 – 2026',
        location: 'Guadalajara, Jalisco',
        slides: [
          { label: 'Captura secuencial automática de radargramas', icon: '📡' },
          { label: 'Control de ventanas emergentes y campos de entrada', icon: '🖥️' },
          { label: 'Estandarización del proceso de exportación', icon: '⚡' },
        ],
        description: 'Este proyecto se enfocó en automatizar acciones repetitivas dentro del software GPR-SLICE mediante AutoHotkey, incluyendo la captura secuencial de radargramas, el control de campos de entrada, el manejo de ventanas emergentes y la estandarización del proceso de exportación. La automatización permitió reducir la intervención manual, ahorrar tiempo y hacer más eficiente el procesamiento operativo de información de georradar.',
        participation: [
          'Definición de la lógica del flujo operativo y mapeo de acciones a automatizar dentro de GPR-SLICE.',
          'Ajuste de coordenadas de interacción con la interfaz y configuración de secuencias automáticas.',
          'Optimización del nombrado, generación y cierre de radargramas durante la rutina automatizada.',
          'Adaptación del comportamiento del script según las necesidades reales del proceso en campo.',
        ],
        tools: ['AutoHotkey', 'GPR-SLICE', 'RADAN7', 'Georradar', 'Scripting'],
        badges: ['Georradar', 'GPR-SLICE', 'AutoHotkey', 'Automatización', 'Radargramas'],
      },
      en: {
        title: 'GPR-SLICE Operational Automation with AutoHotkey',
        date: '2025 – 2026',
        location: 'Guadalajara, Jalisco',
        slides: [
          { label: 'Automated sequential radargram capture', icon: '📡' },
          { label: 'Pop-up window and input field control', icon: '🖥️' },
          { label: 'Export process standardisation', icon: '⚡' },
        ],
        description: 'This project focused on automating repetitive actions within GPR-SLICE using AutoHotkey, including sequential radargram capture, input field control, pop-up window handling, and export process standardisation. The automation reduced manual intervention, saved time, and made GPR data processing operationally more efficient.',
        participation: [
          'Defined the operational workflow logic and mapped actions to automate within GPR-SLICE.',
          'Adjusted interface interaction coordinates and configured automated sequences.',
          'Optimised radargram naming, generation, and closing during the automated routine.',
          'Adapted the script behaviour to match real-world process requirements in the field.',
        ],
        tools: ['AutoHotkey', 'GPR-SLICE', 'RADAN7', 'Ground Penetrating Radar', 'Scripting'],
        badges: ['GPR', 'GPR-SLICE', 'AutoHotkey', 'Automation', 'Radargrams'],
      },
    },
  };

  const overlay  = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  const elDate   = document.getElementById('modalDate');
  const elLoc    = document.getElementById('modalLocation');
  const elTitle  = document.getElementById('modalTitle');
  const elDesc   = document.getElementById('modalDescription');
  const elPart   = document.getElementById('modalParticipation');
  const elTools  = document.getElementById('modalTools');
  const elBadges = document.getElementById('modalBadges');
  const track    = document.getElementById('modalTrack');
  const dotsWrap = document.getElementById('galleryDots');
  const prevBtn  = document.getElementById('galleryPrev');
  const nextBtn  = document.getElementById('galleryNext');

  if (!overlay) return;

  let currentSlide = 0;
  let totalSlides  = 0;

  function goToSlide(idx) {
    currentSlide = (idx + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsWrap.querySelectorAll('.modal__gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function buildGallery(slides) {
    totalSlides  = slides.length;
    currentSlide = 0;

    track.innerHTML = slides.map(s => `
      <div class="modal__gallery-slide">
        <span style="font-size:2.8rem;display:block;margin-bottom:0.6rem;line-height:1">${s.icon}</span>
        <span>${s.label}</span>
      </div>
    `).join('');

    dotsWrap.innerHTML = slides.map((_, i) =>
      `<button class="modal__gallery-dot${i === 0 ? ' active' : ''}" aria-label="Imagen ${i + 1}"></button>`
    ).join('');

    dotsWrap.querySelectorAll('.modal__gallery-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    const showNav = totalSlides > 1;
    prevBtn.style.display = showNav ? 'flex' : 'none';
    nextBtn.style.display = showNav ? 'flex' : 'none';
    dotsWrap.style.display = showNav ? 'flex' : 'none';

    track.style.transform = 'translateX(0)';
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Swipe en móvil
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
  }, { passive: true });

  function openModal(projectKey) {
    const project = PROJECTS[projectKey];
    if (!project) return;
    // Read active language from the DOM (avoids cross-IIFE scope issues)
    const activeLangBtn = document.querySelector('.lang-btn--active');
    const activeLang = activeLangBtn ? activeLangBtn.dataset.lang : 'es';
    const data = project[activeLang] || project.es;

    elDate.textContent  = data.date;
    elLoc.textContent   = data.location;
    elTitle.textContent = data.title;
    elDesc.textContent  = data.description;

    elPart.innerHTML   = data.participation.map(item => `<li>${item}</li>`).join('');
    elTools.innerHTML  = data.tools.map(t => `<span class="modal__tool-tag">${t}</span>`).join('');
    elBadges.innerHTML = data.badges.map(b => `<span class="modal__badge">${b}</span>`).join('');

    buildGallery(data.slides);

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    function trigger() { openModal(card.dataset.project); }
    card.addEventListener('click', trigger);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });

})();



/* ══════════════════════════════════════════════════════════════════
   SISTEMA I18N — BILINGÜE ES / EN
   Estrategia: data-i18n en nodos de texto hoja solamente.
   applyLang() solo toca el nodo de texto, nunca innerHTML/textContent
   de contenedores con hijos.
   ══════════════════════════════════════════════════════════════════ */
(function initI18n() {

  /* ─────────────────────────────────────────
     DICCIONARIO COMPLETO
  ───────────────────────────────────────── */
  const T = {
    es: {
      /* Nav */
      'nav.about':      'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.projects':   'Proyectos',
      'nav.skills':     'Habilidades',
      'nav.education':  'Educación',
      'nav.languages':  'Idiomas',
      'nav.contact':    'Contacto',

      /* Hero */
      'hero.label':      'Ingeniero Civil · Guadalajara, México',
      'hero.title':      'Topografía · BIM · Ingeniería Civil',
      'hero.bio':        'Egresado del Tecnológico de Monterrey con experiencia en topografía de precisión, detección de instalaciones subterráneas y metodología BIM. Enfocado en integrar tecnología e ingeniería para generar soluciones técnicas con impacto real.',
      'hero.cta':        'Ver proyectos',
      'hero.downloadCV': 'Descargar CV',
      'hero.emailBtn':   'Contactar por correo',
      'hero.scroll':     'Desplázate',

      /* Sobre mí */
      'about.tag':      'Perfil',
      'about.title':    'Sobre mí',
      'about.stat1val': '+1.5 años',
      'about.stat1lbl': 'Experiencia profesional',
      'about.stat2lbl': 'Proyectos destacados',
      'about.stat3lbl': 'Herramientas técnicas',
      'about.stat4lbl': 'Guadalajara, Jalisco',

      /* Experiencia */
      'exp.tag':   'Trayectoria',
      'exp.title': 'Experiencia profesional',
      'exp.role1': 'Gerente de Topografía e Ingeniero en Operaciones',
      'exp.role2': 'Ingeniero en Operaciones',
      'exp.role3': 'Ingeniero Junior',
      'exp.date1': 'Ene. 2026 – Presente · Guadalajara, Jalisco',
      'exp.date2': 'Oct. 2025 – Ene. 2026 · Guadalajara, Jalisco',
      'exp.date3': 'Feb. 2025 – Jun. 2025 · Zapopan, Jalisco',

      /* Proyectos */
      'proj.tag':   'Portafolio',
      'proj.title': 'Proyectos destacados',
      'proj.cta':   'Ver más',
      'proj.excel.date':  '2025 – 2026',
      'proj.excel.title': 'Automatización de datos topográficos en AutoCAD mediante Excel',
      'proj.excel.location': 'Guadalajara, Jalisco',
      'proj.excel.desc':  'Desarrollé una solución en Excel para estructurar datos topográficos y generar información lista para su uso en AutoCAD, reduciendo tiempos de trabajo manual y mejorando la consistencia del proceso.',
      'proj.gpr.date':    '2025 – 2026',
      'proj.gpr.title':   'Automatización GPR-SLICE con AutoHotkey',
      'proj.gpr.location': 'Guadalajara, Jalisco',
      'proj.gpr.desc':    'Implementé scripts en AutoHotkey para automatizar tareas repetitivas dentro de GPR-SLICE, agilizando la generación de radargramas y mejorando la eficiencia operativa del flujo de trabajo.',


      /* Sobre mí — párrafos (innerHTML) */
      'about.p1': 'Soy Ingeniero Civil egresado del <strong>Tecnológico de Monterrey, Campus Guadalajara</strong>, con experiencia en topografía, geofísica aplicada y documentación técnica para proyectos de infraestructura y construcción.',
      'about.p2': 'Combino bases sólidas de ingeniería con herramientas digitales como BIM, automatización de procesos e IA aplicada. Me interesa trabajar en entornos donde la <strong>precisión técnica, la innovación y la mejora continua</strong> sean parte central del trabajo.',

      /* Experiencia — bullets */
      'exp.li1a': 'Creé y consolidé el departamento de topografía, definiendo procesos y estándares de trabajo desde cero.',
      'exp.li1b': 'Desarrollé estudios topográficos y elaboré planos georreferenciados para proyectos de detección de instalaciones subterráneas.',
      'exp.li1c': 'Implementé automatizaciones con macros que redujeron significativamente los tiempos de procesamiento y el margen de error.',
      'exp.li2a': 'Ejecuté estudios de Georradar (GPR) en proyectos a lo largo de la República Mexicana.',
      'exp.li2b': 'Procesé e interpreté radargramas para la detección de instalaciones subterráneas y evaluación de condiciones del terreno.',
      'exp.li2c': 'Apoyé la toma de decisiones en obra a partir del análisis de condiciones del subsuelo.',
      'exp.li3a': 'Contribuí al diseño estructural de una nave industrial, desarrollando análisis y especificaciones técnicas.',
      'exp.li3b': 'Elaboré planos técnicos y documentación MEP bajo metodología BIM.',

      /* Tags comunes */
      'tag.topography':    'Topografía',
      'tag.automation':    'Automatización',
      'tag.infrastructure':'Infraestructura',
      'tag.logistics':     'Logística',
      'tag.multimodal':    'Diseño multimodal',
      'tag.sustainability':'Sustentabilidad',
      'tag.circularEconomy':'Economía Circular',
      'tag.tequilaInd':   'Industria Tequilera',
      'tag.hydraulics':   'Hidráulica',
      'tag.georadar':     'Georradar',

      /* Proyectos — tarjetas Diageo/CLJ/CONAGUA */
      'proj.diageo.date':     'Ene. 2025 – May. 2025',
      'proj.diageo.location': 'Jalisco, México',
      'proj.diageo.title':    'Economía Circular — Diageo',
      'proj.diageo.desc':     'Desarrollé una propuesta de revalorización de vidrio dentro de la industria tequilera para reducir el impacto ambiental y apoyar metas de sustentabilidad empresarial de Diageo.',
      'proj.clj.date':        'Ene. 2024 – Jun. 2024',
      'proj.clj.location':    'Jalisco, México',
      'proj.clj.title':       'Aeródromo Multimodal — CLJ',
      'proj.clj.desc':        'Participé en el diseño de una propuesta de infraestructura logística que integra aeropista y conexiones ferroviarias para mejorar la conectividad del Centro Logístico de Jalisco.',
      'proj.conagua.date':    'Ago. 2023 – Dic. 2023',
      'proj.conagua.location':'Guadalajara, Jalisco',
      'proj.conagua.title':   'Red de Abastecimiento — CONAGUA',
      'proj.conagua.desc':    'Diseñé una red de abastecimiento de agua y alcantarillado para la comunidad de Mezquitic, Jalisco, aplicando criterios técnicos de cobertura y funcionalidad.',

      /* Habilidades — grupos */
      'skills.grp.cad':    'CAD & Diseño',
      'skills.grp.geo':    'Geomática & Topografía',
      'skills.grp.gpr':    'Georradar (GPR)',
      'skills.grp.data':   'Datos & Automatización',
      'skills.grp.struct': 'Estructuras & Hidráulica',

      /* Educación — adicionales */
      'edu.inst1':      'Tecnológico de Monterrey, Campus Guadalajara',
      'edu.date1':      'Ago. 2021 – Jun. 2025',
      'edu.inst2':      'Universidad de Castilla-La Mancha, Ciudad Real, España',
      'edu.date2':      'Ago. 2024 – Ene. 2025',
      'edu.lang1':      'Español',
      'edu.lang2':      'Inglés',
      'edu.cert1':      'Introducción a la Era Digital y Big Data',
      'edu.cert2':      'Fundamentos de Análisis de Datos con Power BI',
      'edu.certIssuer': 'Tecnológico de Monterrey · 2025',

      /* Contacto */
      'contact.location': 'Guadalajara, Jalisco / León, Guanajuato',

      /* Footer */
      'footer.name': 'Mariano Franco Hurtado · Ingeniero Civil',

      /* Habilidades */
      'skills.tag':          'Competencias',
      'skills.title':        'Habilidades',
      'skills.technical':    'Técnicas',
      'skills.professional': 'Profesionales',
      'skills.soft1': 'Liderazgo y gestión de equipos',
      'skills.soft2': 'Resolución de problemas complejos',
      'skills.soft3': 'Comunicación técnica efectiva',
      'skills.soft4': 'Pensamiento crítico y analítico',
      'skills.soft5': 'Adaptabilidad e innovación',
      'skills.soft6': 'Atención al detalle',

      /* Educación */
      'edu.tag':        'Formación',
      'edu.title':      'Educación, idiomas y certificaciones',
      'edu.colEdu':     'Educación',
      'edu.degree1':    'Licenciatura en Ingeniería Civil',
      'edu.degree2':    'Programa de Intercambio Internacional',
      'edu.colLang':    'Idiomas',
      'edu.langNative': 'Nativo',
      'edu.langB2':     'Intermedio Alto · IELTS B2',
      'edu.colCerts':   'Certificaciones',

      /* Contacto */
      'contact.tag':     'Contacto',
      'contact.title':   'Hablemos',
      'contact.lead':    '¿Tienes un proyecto en mente o quieres conocer más sobre mi experiencia? Estoy disponible para oportunidades profesionales y colaboraciones técnicas.',
      'contact.email':   'Correo electrónico',
      'contact.phone':   'Teléfono',
      'contact.wa':      'WhatsApp',
      'contact.waValue': 'Escríbeme directamente',
      'contact.li':      'LinkedIn',

      /* Modal */
      'modal.desc':  'Descripción',
      'modal.part':  'Mi participación',
      'modal.tools': 'Herramientas y metodologías',
      'modal.cats':  'Categorías',

      /* Footer / CV */
      'footer.copy': 'Topografía · BIM · Geofísica Aplicada · Guadalajara, México',
      'cv.file':     'CV_pdf_ES.pdf',
    },

    en: {
      /* Nav */
      'nav.about':      'About',
      'nav.experience': 'Experience',
      'nav.projects':   'Projects',
      'nav.skills':     'Skills',
      'nav.education':  'Education',
      'nav.languages':  'Languages',
      'nav.contact':    'Contact',

      /* Hero */
      'hero.label':      'Civil Engineer · Guadalajara, Mexico',
      'hero.title':      'Surveying · BIM · Civil Engineering',
      'hero.bio':        'Civil Engineering graduate from Tecnológico de Monterrey with experience in precision surveying, underground utility detection, and BIM methodology. Focused on integrating technology and engineering to deliver technical solutions with real-world impact.',
      'hero.cta':        'View projects',
      'hero.downloadCV': 'Download Resume',
      'hero.emailBtn':   'Contact by email',
      'hero.scroll':     'Scroll down',

      /* About */
      'about.tag':      'Profile',
      'about.title':    'About me',
      'about.stat1val': '+1.5 years',
      'about.stat1lbl': 'Professional experience',
      'about.stat2lbl': 'Featured projects',
      'about.stat3lbl': 'Technical tools',
      'about.stat4lbl': 'Guadalajara, Jalisco',

      /* Experience */
      'exp.tag':   'Career',
      'exp.title': 'Professional experience',
      'exp.role1': 'Surveying Manager & Operations Engineer',
      'exp.role2': 'Operations Engineer',
      'exp.role3': 'Junior Engineer',
      'exp.date1': 'Jan. 2026 – Present · Guadalajara, Jalisco',
      'exp.date2': 'Oct. 2025 – Jan. 2026 · Guadalajara, Jalisco',
      'exp.date3': 'Feb. 2025 – Jun. 2025 · Zapopan, Jalisco',

      /* Projects */
      'proj.tag':   'Portfolio',
      'proj.title': 'Featured projects',
      'proj.cta':   'Learn more',
      'proj.excel.date':  '2025 – 2026',
      'proj.excel.title': 'Topographic Data Automation — Excel to AutoCAD',
      'proj.excel.location': 'Guadalajara, Jalisco',
      'proj.excel.desc':  'I developed an Excel-based solution to structure topographic datasets and generate CAD-ready information, reducing manual workload and improving process consistency.',
      'proj.gpr.date':    '2025 – 2026',
      'proj.gpr.title':   'GPR-SLICE Workflow Automation with AutoHotkey',
      'proj.gpr.location': 'Guadalajara, Jalisco',
      'proj.gpr.desc':    'I implemented AutoHotkey scripts to automate repetitive tasks within GPR-SLICE, streamlining radargram generation and improving the operational efficiency of the workflow.',


      /* Sobre mí — párrafos (innerHTML) */
      'about.p1': 'I am a Civil Engineer graduated from <strong>Tecnológico de Monterrey, Campus Guadalajara</strong>, with experience in surveying, applied geophysics, and technical documentation for infrastructure and construction projects.',
      'about.p2': 'I combine solid engineering fundamentals with digital tools such as BIM, process automation, and applied AI. I am driven to work in environments where <strong>technical precision, innovation, and continuous improvement</strong> are central to the work.',

      /* Experiencia — bullets */
      'exp.li1a': 'Created and consolidated the surveying department, defining workflows and standards from scratch.',
      'exp.li1b': 'Carried out topographic surveys and produced georeferenced drawings for underground utility detection projects.',
      'exp.li1c': 'Implemented macro-based automations that significantly reduced processing time and error margin.',
      'exp.li2a': 'Performed Ground Penetrating Radar (GPR) surveys on projects across Mexico.',
      'exp.li2b': 'Processed and interpreted radargrams for underground utility detection and subsurface condition assessment.',
      'exp.li2c': 'Supported on-site decision-making based on subsurface condition analysis.',
      'exp.li3a': 'Contributed to the structural design of an industrial warehouse, developing analyses and technical specifications.',
      'exp.li3b': 'Produced technical drawings and MEP documentation under BIM methodology.',

      /* Tags comunes */
      'tag.topography':    'Surveying',
      'tag.automation':    'Automation',
      'tag.infrastructure':'Infrastructure',
      'tag.logistics':     'Logistics',
      'tag.multimodal':    'Multimodal design',
      'tag.sustainability':'Sustainability',
      'tag.circularEconomy':'Circular Economy',
      'tag.tequilaInd':   'Tequila Industry',
      'tag.hydraulics':   'Hydraulics',
      'tag.georadar':     'Ground Penetrating Radar',

      /* Proyectos — tarjetas Diageo/CLJ/CONAGUA */
      'proj.diageo.date':     'Jan. 2025 – May 2025',
      'proj.diageo.location': 'Jalisco, Mexico',
      'proj.diageo.title':    'Circular Economy — Diageo',
      'proj.diageo.desc':     "I developed a glass waste recovery proposal within the tequila industry to reduce environmental impact and support Diageo\u2019s corporate sustainability goals.",
      'proj.clj.date':        'Jan. 2024 – Jun. 2024',
      'proj.clj.location':    'Jalisco, Mexico',
      'proj.clj.title':       'Multimodal Airstrip — CLJ',
      'proj.clj.desc':        'I participated in the design of a logistics infrastructure proposal integrating a private airstrip and railway connections to improve connectivity at the Jalisco Logistics Center.',
      'proj.conagua.date':    'Aug. 2023 – Dec. 2023',
      'proj.conagua.location':'Guadalajara, Jalisco',
      'proj.conagua.title':   'Water Supply Network — CONAGUA',
      'proj.conagua.desc':    'I designed a water supply and sewage network for the community of Mezquitic, Jalisco, applying technical coverage and functionality criteria.',

      /* Habilidades — grupos */
      'skills.grp.cad':    'CAD & Design',
      'skills.grp.geo':    'Geomatics & Surveying',
      'skills.grp.gpr':    'Ground Penetrating Radar',
      'skills.grp.data':   'Data & Automation',
      'skills.grp.struct': 'Structures & Hydraulics',

      /* Educación — adicionales */
      'edu.inst1':      'Tecnológico de Monterrey, Campus Guadalajara',
      'edu.date1':      'Aug. 2021 – Jun. 2025',
      'edu.inst2':      'University of Castilla-La Mancha, Ciudad Real, Spain',
      'edu.date2':      'Aug. 2024 – Jan. 2025',
      'edu.lang1':      'Spanish',
      'edu.lang2':      'English',
      'edu.cert1':      'Introduction to the Digital Era and Big Data',
      'edu.cert2':      'Fundamentals of Data Analysis with Power BI',
      'edu.certIssuer': 'Tecnológico de Monterrey · 2025',

      /* Contacto */
      'contact.location': 'Guadalajara, Jalisco / León, Guanajuato',

      /* Footer */
      'footer.name': 'Mariano Franco Hurtado · Civil Engineer',

      /* Skills */
      'skills.tag':          'Competencies',
      'skills.title':        'Skills',
      'skills.technical':    'Technical',
      'skills.professional': 'Professional',
      'skills.soft1': 'Leadership & team management',
      'skills.soft2': 'Complex problem solving',
      'skills.soft3': 'Effective technical communication',
      'skills.soft4': 'Critical & analytical thinking',
      'skills.soft5': 'Adaptability & innovation',
      'skills.soft6': 'Attention to detail',

      /* Education */
      'edu.tag':        'Background',
      'edu.title':      'Education, languages & certifications',
      'edu.colEdu':     'Education',
      'edu.degree1':    'Bachelor of Civil Engineering',
      'edu.degree2':    'International Exchange Program',
      'edu.colLang':    'Languages',
      'edu.langNative': 'Native',
      'edu.langB2':     'Upper Intermediate · IELTS B2',
      'edu.colCerts':   'Certifications',

      /* Contact */
      'contact.tag':     'Contact',
      'contact.title':   "Let's talk",
      'contact.lead':    'Have a project in mind or want to learn more about my experience? I am available for professional opportunities and technical collaborations.',
      'contact.email':   'Email',
      'contact.phone':   'Phone',
      'contact.wa':      'WhatsApp',
      'contact.waValue': 'Message me directly',
      'contact.li':      'LinkedIn',

      /* Modal */
      'modal.desc':  'Description',
      'modal.part':  'My contribution',
      'modal.tools': 'Tools & methodologies',
      'modal.cats':  'Categories',

      /* Footer / CV */
      'footer.copy': 'Surveying · BIM · Applied Geophysics · Guadalajara, Mexico',
      'cv.file':     'CV_pdf_EN.pdf',
    },
  };

  /* ─────────────────────────────────────────
     ESTADO
  ───────────────────────────────────────── */
  let currentLang = localStorage.getItem('portfolio-lang') || 'es';

  /* ─────────────────────────────────────────
     APPLY LANG
     Usa innerText solo en elementos que son
     "hoja" (sin hijos relevantes) o que tienen
     data-i18n en un <span> interno dedicado.
  ───────────────────────────────────────── */
  function applyLang(lang) {
    const dict = T[lang];
    if (!dict) return;

    // data-i18n-html: elementos donde la traducción incluye etiquetas HTML (e.g. <strong>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = dict[key];
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val === undefined) return;

      // Si el elemento tiene hijos de tipo elemento (tags), no tocar
      // — significa que el data-i18n está en un contenedor grande.
      // En ese caso buscamos su primer nodo de texto directo y lo reemplazamos.
      const hasElementChildren = [...el.childNodes].some(n => n.nodeType === 1);

      if (hasElementChildren) {
        // Buscar nodo de texto directo y reemplazarlo
        for (const node of el.childNodes) {
          if (node.nodeType === 3 && node.textContent.trim() !== '') {
            node.textContent = val;
            return;
          }
        }
        // Si no hay nodo texto directo visible, prepend uno
        el.insertBefore(document.createTextNode(val), el.firstChild);
      } else {
        el.textContent = val;
      }
    });

    /* Tooltips bilingüe: intercambiar data-tooltip según idioma */
    document.querySelectorAll('[data-tooltip-en]').forEach(el => {
      const esText = el.getAttribute('data-tooltip-es') || el.getAttribute('data-tooltip');
      const enText = el.getAttribute('data-tooltip-en');
      if (!el.hasAttribute('data-tooltip-es')) {
        // Primera vez: guardar el texto ES original
        el.setAttribute('data-tooltip-es', el.getAttribute('data-tooltip'));
      }
      el.setAttribute('data-tooltip', lang === 'en' ? enText : el.getAttribute('data-tooltip-es'));
    });

    /* CV: href + texto del span interno */
    const cvBtn = document.getElementById('cvDownloadBtn');
    if (cvBtn) {
      const cvFile = dict['cv.file'] || 'CV_pdf_ES.pdf';
      cvBtn.setAttribute('href', cvFile);
      cvBtn.setAttribute('download', cvFile);
      // El span con data-i18n="hero.downloadCV" ya se maneja arriba
    }

    /* lang en <html> */
    document.documentElement.setAttribute('lang', lang);

    /* Selector: estado activo */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    /* Título */
    document.title = lang === 'en'
      ? 'Mariano Franco Hurtado — Civil Engineer'
      : 'Mariano Franco Hurtado — Ingeniero Civil';

    localStorage.setItem('portfolio-lang', lang);
    currentLang = lang;
  }

  /* ─────────────────────────────────────────
     BOTONES DEL SELECTOR
  ───────────────────────────────────────── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== currentLang) {
        applyLang(btn.dataset.lang);
      }
    });
  });

  /* ─────────────────────────────────────────
     INICIALIZAR AL CARGAR
  ───────────────────────────────────────── */
  applyLang(currentLang);

})();
