/* ═══════════════════════════════════════════════════════════════════════════
   PORTFOLIO — MARIANO FRANCO HURTADO
   script.js — Carrusel horizontal de hojas, i18n, galerías de proyecto
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────────────────
   DATOS DE PROYECTOS (bilingüe) — igual origen de datos que la versión anterior
───────────────────────────────────────────────────────────────────────── */
const PROJECTS_ORDER = ['diageo', 'clj', 'conagua', 'excel-autocad', 'gpr-autohotkey'];

const PROJECTS = {
  diageo: {
    code: 'DIAGEO',
    icon: '🌱',
    es: {
      title: 'Economía Circular — Diageo',
      date: 'Ene. 2025 – May. 2025',
      location: 'Jalisco, México',
      slides: [
        { label: 'Propuesta de revalorización de vidrio', img: 'DIAGEO-IMG1.png' },
        { label: 'Análisis de cadena de valor', img: 'DIAGEO-IMG2.png' },
        { label: 'Modelo de economía circular', img: 'DIAGEO-IMG3.png' },
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
        { label: 'Glass waste recovery proposal', img: 'DIAGEO-IMG1-EN.png' },
        { label: 'Value chain analysis', img: 'DIAGEO-IMG2-EN.png' },
        { label: 'Circular economy model design', img: 'DIAGEO-IMG3-EN.png' },
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
    code: 'CLJ',
    icon: '✈️',
    es: {
      title: 'Aeródromo Multimodal — CLJ',
      date: 'Ene. 2024 – Jun. 2024',
      location: 'Jalisco, México',
      slides: [
        { label: 'Diseño de aeropista e infraestructura', img: 'CLJ-IMG1.png' },
        { label: 'Integración de conectividad ferroviaria', img: 'CLJ-IMG2.png' },
        { label: 'Propuesta logística multimodal', img: 'CLJ-IMG3.png' },
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
        { label: 'Airstrip and infrastructure design', img: 'CLJ-IMG1-EN.png' },
        { label: 'Railway connectivity integration', img: 'CLJ-IMG2-EN.png' },
        { label: 'Multimodal logistics proposal', img: 'CLJ-IMG3-EN.png' },
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
    code: 'CONAGUA',
    icon: '💧',
    es: {
      title: 'Red de Abastecimiento — CONAGUA',
      date: 'Ago. 2023 – Dic. 2023',
      location: 'Guadalajara, Jalisco',
      slides: [
        { label: 'Diseño de red hidráulica', img: 'CONAGUA-IMG1.png' },
        { label: 'Modelado en EPANET', img: 'CONAGUA-IMG2.png' },
        { label: 'Red de alcantarillado', img: 'CONAGUA-IMG3.png' },
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
        { label: 'Hydraulic network design', img: 'CONAGUA-IMG1-EN.png' },
        { label: 'EPANET hydraulic modelling', img: 'CONAGUA-IMG2-EN.png' },
        { label: 'Sewage network design', img: 'CONAGUA-IMG3-EN.png' },
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
    code: 'EXCEL→CAD',
    icon: '📐',
    es: {
      title: 'Automatización de datos topográficos en AutoCAD mediante Excel',
      date: '2025 – 2026',
      location: 'Guadalajara, Jalisco',
      slides: [
        { label: 'Estructuración y nomenclatura de datos topográficos', img: 'MACROCAD-IMG1.png' },
        { label: 'Preparación de coordenadas para AutoCAD', img: 'MACROCAD-IMG2.png' },
        { label: 'Estandarización del flujo de trabajo técnico', img: 'MACROCAD-IMG3.png' },
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
        { label: 'Topographic data structuring and naming', img: 'MACROCAD-IMG1-EN.png' },
        { label: 'Coordinate preparation for AutoCAD', img: 'MACROCAD-IMG2-EN.png' },
        { label: 'Technical workflow standardisation', img: 'MACROCAD-IMG3-EN.png' },
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
    code: 'GPR-AHK',
    icon: '📡',
    es: {
      title: 'Automatización operativa GPR-SLICE con AutoHotkey',
      date: '2025 – 2026',
      location: 'Guadalajara, Jalisco',
      slides: [
        { label: 'Captura secuencial automática de radargramas', img: 'MACROHOTKEY-IMG1.png' },
        { label: 'Control de ventanas emergentes y campos de entrada', img: 'MACROHOTKEY-IMG2.png' },
        { label: 'Estandarización del proceso de exportación', img: 'MACROHOTKEY-IMG3.png' },
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
        { label: 'Automated sequential radargram capture', img: 'MACROHOTKEY-IMG1-EN.png' },
        { label: 'Pop-up window and input field control', img: 'MACROHOTKEY-IMG2-EN.png' },
        { label: 'Export process standardisation', img: 'MACROHOTKEY-IMG3-EN.png' },
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

/* ─────────────────────────────────────────────────────────────────────────
   EVIDENCIA VISUAL POR EXPERIENCIA (galería compacta + lightbox)
   Nota: agrega las imágenes reales al repo con estos nombres exactos —
   mientras no existan, se muestra un ícono de reemplazo automáticamente.
───────────────────────────────────────────────────────────────────────── */
const EXPERIENCE_EVIDENCE = {
  exp1: [
    { img: 'EXP1-EVID1.jpg', caption_es: 'Levantamiento topográfico en campo', caption_en: 'Field topographic survey' },
    { img: 'EXP1-EVID2.jpg', caption_es: 'Plano georreferenciado', caption_en: 'Georeferenced drawing' },
    { img: 'EXP1-EVID3.jpg', caption_es: 'Equipo GNSS en sitio', caption_en: 'GNSS equipment on site' },
  ],
  exp2: [
    { img: 'EXP2-EVID1.jpg', caption_es: 'Estudio de Georradar (GPR)', caption_en: 'Ground Penetrating Radar survey' },
    { img: 'EXP2-EVID2.jpg', caption_es: 'Radargrama procesado', caption_en: 'Processed radargram' },
  ],
  exp3: [
    { img: 'EXP3-EVID1.jpg', caption_es: 'Modelo estructural BIM', caption_en: 'BIM structural model' },
    { img: 'EXP3-EVID2.jpg', caption_es: 'Plano técnico de nave industrial', caption_en: 'Industrial warehouse technical drawing' },
  ],
};

let lightboxState = { expId: null, index: 0 };

function renderExperienceEvidence() {
  document.querySelectorAll('.exp-evidence').forEach(container => {
    const expId = container.dataset.exp;
    const items = EXPERIENCE_EVIDENCE[expId];
    if (!items || !items.length) return;

    const labelSpan = document.createElement('span');
    labelSpan.className = 'exp-evidence__label';
    labelSpan.setAttribute('data-i18n', 'exp.evidenceLabel');
    labelSpan.textContent = T[currentLang]['exp.evidenceLabel'] || 'Evidencia';
    container.appendChild(labelSpan);

    items.slice(0, 4).forEach((item, i) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'exp-evidence__thumb';
      thumb.setAttribute('aria-label', item.caption_es);
      thumb.innerHTML = `
        <img src="${item.img}" alt="${item.caption_es}" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <span class="exp-evidence__thumb-fallback">🗎</span>
      `;
      thumb.addEventListener('click', () => openLightbox(expId, i));
      container.appendChild(thumb);
    });
  });
}

function openLightbox(expId, index) {
  const items = EXPERIENCE_EVIDENCE[expId];
  if (!items || !items.length) return;
  lightboxState = { expId, index: (index + items.length) % items.length };
  renderLightboxSlide();
  const lb = document.getElementById('lightbox');
  lb.setAttribute('data-open', 'true');
  lb.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.setAttribute('data-open', 'false');
  lb.setAttribute('aria-hidden', 'true');
}

function renderLightboxSlide() {
  const items = EXPERIENCE_EVIDENCE[lightboxState.expId];
  const item = items[lightboxState.index];
  const img = document.getElementById('lightboxImg');
  const fallback = document.getElementById('lightboxFallback');
  const caption = document.getElementById('lightboxCaption');
  const counter = document.getElementById('lightboxCounter');

  img.style.display = 'block';
  fallback.style.display = 'none';
  img.onerror = () => { img.style.display = 'none'; fallback.style.display = 'flex'; };
  img.src = item.img;
  img.alt = currentLang === 'en' ? item.caption_en : item.caption_es;

  caption.textContent = currentLang === 'en' ? item.caption_en : item.caption_es;
  counter.textContent = `${String(lightboxState.index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
}

function lightboxStep(delta) {
  const items = EXPERIENCE_EVIDENCE[lightboxState.expId];
  if (!items) return;
  lightboxState.index = (lightboxState.index + delta + items.length) % items.length;
  renderLightboxSlide();
}

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => lightboxStep(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => lightboxStep(1));
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (lb.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxStep(1);
    if (e.key === 'ArrowLeft') lightboxStep(-1);
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   DICCIONARIO I18N
───────────────────────────────────────────────────────────────────────── */
const T = {
  es: {
    'nav.home': 'Inicio', 'nav.about': 'Sobre mí', 'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos', 'nav.skills': 'Habilidades', 'nav.education': 'Educación', 'nav.contact': 'Contacto',

    'tb.project': 'Proyecto', 'tb.drawn': 'Elaboró', 'tb.scale': 'Escala', 'tb.sheet': 'Hoja', 'tb.rev': 'Rev.',

    'markpanel.title': 'Contacto directo', 'markpanel.home': 'Ir a la hoja 00',

    'hero.label': 'Ingeniero Civil · Guadalajara, México',
    'hero.title': 'Topografía · BIM · Ingeniería Civil',
    'hero.bio': 'Egresado del <strong>Tecnológico de Monterrey</strong> con experiencia en <strong>topografía</strong> de precisión, detección de instalaciones subterráneas y metodología <strong>BIM</strong>. Enfocado en integrar tecnología e ingeniería para generar soluciones técnicas con impacto real.',
    'hero.cta': 'Ver proyectos', 'hero.downloadCV': 'CV', 'hero.emailBtn': 'Contactar por correo',
    'hero.stamp': 'REV. 2026<br/>GDL · MX',

    'about.tag': 'Perfil', 'about.title': 'Sobre mí',
    'about.stat1val': '+2 años', 'about.stat1lbl': 'Experiencia profesional',
    'about.stat2lbl': 'Proyectos destacados', 'about.stat3lbl': 'Herramientas técnicas', 'about.stat4lbl': 'Guadalajara, Jalisco',
    'about.p1': 'Soy Ingeniero Civil egresado del <strong>Tecnológico de Monterrey, Campus Guadalajara</strong>, con experiencia en topografía, geofísica aplicada y documentación técnica para proyectos de infraestructura y construcción.',
    'about.p2': 'Combino bases sólidas de ingeniería con herramientas digitales como BIM, automatización de procesos e IA aplicada. Me interesa trabajar en entornos donde la <strong>precisión técnica, la innovación y la mejora continua</strong> sean parte central del trabajo.',

    'exp.tag': 'Trayectoria', 'exp.title': 'Experiencia profesional',
    'exp.role1': 'Gerente de Topografía e Ingeniero en Operaciones', 'exp.role2': 'Ingeniero en Operaciones', 'exp.role3': 'Ingeniero Junior',
    'exp.date1': 'Ene. 2026 – Presente · Guadalajara, Jalisco', 'exp.date2': 'Oct. 2025 – Ene. 2026 · Guadalajara, Jalisco', 'exp.date3': 'Feb. 2025 – Jun. 2025 · Zapopan, Jalisco',
    'exp.li1a': 'Creé y consolidé el departamento de topografía, definiendo procesos y estándares de trabajo desde cero.',
    'exp.li1b': 'Desarrollé estudios topográficos y elaboré planos georreferenciados para proyectos de detección de instalaciones subterráneas.',
    'exp.li1c': 'Implementé automatizaciones con macros que redujeron significativamente los tiempos de procesamiento y el margen de error.',
    'exp.li2a': 'Ejecuté estudios de Georradar (GPR) en proyectos a lo largo de la República Mexicana.',
    'exp.li2b': 'Procesé e interpreté radargramas para la detección de instalaciones subterráneas y evaluación de condiciones del terreno.',
    'exp.li2c': 'Apoyé la toma de decisiones en obra a partir del análisis de condiciones del subsuelo.',
    'exp.li3a': 'Contribuí al diseño estructural de una nave industrial, desarrollando análisis y especificaciones técnicas.',
    'exp.li3b': 'Elaboré planos técnicos y documentación MEP bajo metodología BIM.',
    'tag.topography': 'Topografía',
    'exp.evidenceLabel': 'Evidencia',
    'lightbox.missing': 'Imagen de evidencia pendiente de subir',

    'skills.tag': 'Competencias', 'skills.title': 'Habilidades',
    'skills.grp.cad': 'CAD & Diseño', 'skills.grp.geo': 'Geomática & Topografía', 'skills.grp.gpr': 'Georradar (GPR)',
    'skills.grp.data': 'Datos & Automatización', 'skills.grp.struct': 'Estructuras & Hidráulica',
    'skills.soft1': 'Liderazgo y gestión de equipos', 'skills.soft2': 'Resolución de problemas complejos',
    'skills.soft3': 'Comunicación técnica efectiva', 'skills.soft4': 'Pensamiento crítico y analítico',
    'skills.soft5': 'Adaptabilidad e innovación', 'skills.soft6': 'Atención al detalle',

    'edu.tag': 'Formación', 'edu.title': 'Educación, idiomas y certificaciones',
    'edu.colEdu': 'Educación', 'edu.degree1': 'Licenciatura en Ingeniería Civil', 'edu.inst1': 'Tecnológico de Monterrey, Campus Guadalajara', 'edu.date1': 'Ago. 2021 – Jun. 2025',
    'edu.degree2': 'Programa de Intercambio Internacional', 'edu.inst2': 'Universidad de Castilla-La Mancha, Ciudad Real, España', 'edu.date2': 'Ago. 2024 – Ene. 2025',
    'edu.colLang': 'Idiomas', 'edu.lang1': 'Español', 'edu.langNative': 'Nativo', 'edu.lang2': 'Inglés', 'edu.langB2': 'Intermedio Alto · IELTS B2',
    'edu.colCerts': 'Certificaciones', 'edu.cert1': 'Introducción a la Era Digital y Big Data', 'edu.cert2': 'Fundamentos de Análisis de Datos con Power BI', 'edu.certIssuer': 'Tecnológico de Monterrey · 2025',

    'contact.tag': 'Contacto', 'contact.title': 'Hablemos',
    'contact.lead': '¿Tienes un proyecto en mente o quieres conocer más sobre mi experiencia? Estoy disponible para oportunidades profesionales y colaboraciones técnicas.',
    'contact.email': 'Correo electrónico', 'contact.phone': 'Teléfono', 'contact.wa': 'WhatsApp', 'contact.waValue': 'Escríbeme directamente', 'contact.li': 'LinkedIn',
    'contact.location': 'Guadalajara, Jalisco / León, Guanajuato',

    'proj.desc.label': 'Descripción', 'proj.part.label': 'Mis logros en este proyecto', 'proj.tools.label': 'Herramientas y metodologías', 'proj.badges.label': 'Categorías',

    'footer.copy': 'Topografía · BIM · Geofísica Aplicada · Guadalajara, México',
    'cv.file': 'CV_pdf_ES.pdf',
  },
  en: {
    'nav.home': 'Home', 'nav.about': 'About', 'nav.experience': 'Experience',
    'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.education': 'Education', 'nav.contact': 'Contact',

    'tb.project': 'Project', 'tb.drawn': 'Drawn by', 'tb.scale': 'Scale', 'tb.sheet': 'Sheet', 'tb.rev': 'Rev.',

    'markpanel.title': 'Direct contact', 'markpanel.home': 'Go to sheet 00',

    'hero.label': 'Civil Engineer · Guadalajara, Mexico',
    'hero.title': 'Surveying · BIM · Civil Engineering',
    'hero.bio': 'Civil Engineering graduate from <strong>Tecnológico de Monterrey</strong> with experience in precision <strong>surveying</strong>, underground utility detection, and <strong>BIM</strong> methodology. Focused on integrating technology and engineering to deliver technical solutions with real-world impact.',
    'hero.cta': 'View projects', 'hero.downloadCV': 'Resume', 'hero.emailBtn': 'Contact by email',
    'hero.stamp': 'REV. 2026<br/>GDL · MX',

    'about.tag': 'Profile', 'about.title': 'About me',
    'about.stat1val': '+2 years', 'about.stat1lbl': 'Professional experience',
    'about.stat2lbl': 'Featured projects', 'about.stat3lbl': 'Technical tools', 'about.stat4lbl': 'Guadalajara, Jalisco',
    'about.p1': 'I am a Civil Engineer graduated from <strong>Tecnológico de Monterrey, Campus Guadalajara</strong>, with experience in surveying, applied geophysics, and technical documentation for infrastructure and construction projects.',
    'about.p2': 'I combine solid engineering fundamentals with digital tools such as BIM, process automation, and applied AI. I am driven to work in environments where <strong>technical precision, innovation, and continuous improvement</strong> are central to the work.',

    'exp.tag': 'Career', 'exp.title': 'Professional experience',
    'exp.role1': 'Surveying Manager & Operations Engineer', 'exp.role2': 'Operations Engineer', 'exp.role3': 'Junior Engineer',
    'exp.date1': 'Jan. 2026 – Present · Guadalajara, Jalisco', 'exp.date2': 'Oct. 2025 – Jan. 2026 · Guadalajara, Jalisco', 'exp.date3': 'Feb. 2025 – Jun. 2025 · Zapopan, Jalisco',
    'exp.li1a': 'Created and consolidated the surveying department, defining workflows and standards from scratch.',
    'exp.li1b': 'Carried out topographic surveys and produced georeferenced drawings for underground utility detection projects.',
    'exp.li1c': 'Implemented macro-based automations that significantly reduced processing time and error margin.',
    'exp.li2a': 'Performed Ground Penetrating Radar (GPR) surveys on projects across Mexico.',
    'exp.li2b': 'Processed and interpreted radargrams for underground utility detection and subsurface condition assessment.',
    'exp.li2c': 'Supported on-site decision-making based on subsurface condition analysis.',
    'exp.li3a': 'Contributed to the structural design of an industrial warehouse, developing analyses and technical specifications.',
    'exp.li3b': 'Produced technical drawings and MEP documentation under BIM methodology.',
    'tag.topography': 'Surveying',
    'exp.evidenceLabel': 'Evidence',
    'lightbox.missing': 'Evidence image pending upload',

    'skills.tag': 'Competencies', 'skills.title': 'Skills',
    'skills.grp.cad': 'CAD & Design', 'skills.grp.geo': 'Geomatics & Surveying', 'skills.grp.gpr': 'Ground Penetrating Radar',
    'skills.grp.data': 'Data & Automation', 'skills.grp.struct': 'Structures & Hydraulics',
    'skills.soft1': 'Leadership & team management', 'skills.soft2': 'Complex problem solving',
    'skills.soft3': 'Effective technical communication', 'skills.soft4': 'Critical & analytical thinking',
    'skills.soft5': 'Adaptability & innovation', 'skills.soft6': 'Attention to detail',

    'edu.tag': 'Background', 'edu.title': 'Education, languages & certifications',
    'edu.colEdu': 'Education', 'edu.degree1': 'Bachelor of Civil Engineering', 'edu.inst1': 'Tecnológico de Monterrey, Campus Guadalajara', 'edu.date1': 'Aug. 2021 – Jun. 2025',
    'edu.degree2': 'International Exchange Program', 'edu.inst2': 'University of Castilla-La Mancha, Ciudad Real, Spain', 'edu.date2': 'Aug. 2024 – Jan. 2025',
    'edu.colLang': 'Languages', 'edu.lang1': 'Spanish', 'edu.langNative': 'Native', 'edu.lang2': 'English', 'edu.langB2': 'Upper Intermediate · IELTS B2',
    'edu.colCerts': 'Certifications', 'edu.cert1': 'Introduction to the Digital Era and Big Data', 'edu.cert2': 'Fundamentals of Data Analysis with Power BI', 'edu.certIssuer': 'Tecnológico de Monterrey · 2025',

    'contact.tag': 'Contact', 'contact.title': "Let's talk",
    'contact.lead': 'Have a project in mind or want to learn more about my experience? I am available for professional opportunities and technical collaborations.',
    'contact.email': 'Email', 'contact.phone': 'Phone', 'contact.wa': 'WhatsApp', 'contact.waValue': 'Message me directly', 'contact.li': 'LinkedIn',
    'contact.location': 'Guadalajara, Jalisco / León, Guanajuato',

    'proj.desc.label': 'Description', 'proj.part.label': 'My achievements on this project', 'proj.tools.label': 'Tools & methodologies', 'proj.badges.label': 'Categories',

    'footer.copy': 'Surveying · BIM · Applied Geophysics · Guadalajara, Mexico',
    'cv.file': 'CV_pdf_EN.pdf',
  },
};

let currentLang = localStorage.getItem('portfolio-lang') || 'es';
const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

/* ─────────────────────────────────────────────────────────────────────────
   1. CONSTRUIR HOJAS DE PROYECTO
───────────────────────────────────────────────────────────────────────── */
function buildProjectSheets() {
  const placeholder = document.getElementById('projectSheets');
  if (!placeholder) return;

  const frag = document.createDocumentFragment();

  PROJECTS_ORDER.forEach((key, i) => {
    const sheetIndex = 3 + i; // hojas 03–07
    const project = PROJECTS[key];

    const section = document.createElement('section');
    section.className = 'sheet sheet--project';
    section.id = `hoja-0${sheetIndex}`;
    section.dataset.sheet = String(sheetIndex);
    section.dataset.project = key;
    section.dataset.label = project.code;

    section.innerHTML = `
      <span class="sheet__reg-bl" aria-hidden="true"></span><span class="sheet__reg-br" aria-hidden="true"></span>
      <span class="sheet__no">HOJA <b>0${sheetIndex}</b> / 10</span>
      <div class="sheet__body">
        <span class="sheet__kicker" data-i18n="nav.projects">Proyectos</span>

        <div class="proj__grid">
          <div class="proj__media">
            <div class="proj__gallery">
              <div class="proj__gallery-frame">
                <div class="proj__gallery-track proj-track"></div>
              </div>
              <div class="proj__gallery-bar">
                <span class="proj-slide-label"></span>
                <div class="proj__gallery-nav">
                  <div class="proj__gallery-dots proj-dots"></div>
                  <button class="proj-prev" aria-label="Imagen anterior"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg></button>
                  <button class="proj-next" aria-label="Imagen siguiente"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg></button>
                </div>
              </div>
            </div>
            <div class="proj__meta"><span class="proj-date"></span><span>·</span><span class="proj-location"></span></div>
          </div>

          <div class="proj__info">
            <h2 class="sheet__title proj-title" style="font-size:clamp(22px,2.2vw,30px);margin-top:0;"></h2>
            <div class="sheet__scroll" style="flex:1;min-height:0;margin-top:14px;">
              <p class="proj__desc proj-desc"></p>
              <p class="proj__block-label" data-i18n="proj.part.label">Mis logros en este proyecto</p>
              <ul class="proj__list proj-participation"></ul>
              <p class="proj__block-label" data-i18n="proj.tools.label">Herramientas y metodologías</p>
              <div class="proj__tags proj-tools"></div>
              <p class="proj__block-label" data-i18n="proj.badges.label">Categorías</p>
              <div class="proj__badges proj-badges"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="title-block">
        <div class="title-block__cell"><span class="title-block__label" data-i18n="tb.project">Proyecto</span><span class="title-block__value proj-code"></span></div>
        <div class="title-block__cell"><span class="title-block__label" data-i18n="tb.drawn">Elaboró</span><span class="title-block__value">M. Franco Hurtado</span></div>
        <div class="title-block__cell"><span class="title-block__label" data-i18n="tb.scale">Escala</span><span class="title-block__value">S/E</span></div>
        <div class="title-block__cell"><span class="title-block__label" data-i18n="tb.sheet">Hoja</span><span class="title-block__value">0${sheetIndex} / 10</span></div>
        <div class="title-block__cell"><span class="title-block__label" data-i18n="tb.rev">Rev.</span><span class="title-block__value title-block__value--rev tb-rev">ES</span></div>
      </div>
    `;

    section.querySelector('.proj-code').textContent = project.code;
    frag.appendChild(section);
  });

  placeholder.replaceWith(frag);
}

/* ─────────────────────────────────────────────────────────────────────────
   2. RENDERIZAR CONTENIDO DE PROYECTO SEGÚN IDIOMA
───────────────────────────────────────────────────────────────────────── */
const galleryState = {}; // { key: { current, total } }

function renderProjectContent(lang) {
  PROJECTS_ORDER.forEach(key => {
    const project = PROJECTS[key];
    const data = project[lang] || project.es;
    const section = document.querySelector(`.sheet--project[data-project="${key}"]`);
    if (!section) return;

    section.querySelector('.proj-title').textContent = data.title;
    section.querySelector('.proj-date').textContent = data.date;
    section.querySelector('.proj-location').textContent = data.location;
    section.querySelector('.proj-desc').textContent = data.description;
    section.querySelector('.proj-participation').innerHTML = data.participation.map(li => `<li>${li}</li>`).join('');
    section.querySelector('.proj-tools').innerHTML = data.tools.map(t => `<span class="tag">${t}</span>`).join('');
    section.querySelector('.proj-badges').innerHTML = data.badges.map(b => `<span class="tag">${b}</span>`).join('');

    const track = section.querySelector('.proj-track');
    track.innerHTML = data.slides.map(s => `
      <div class="proj__slide">
        <img src="${s.img}" alt="${s.label}" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="proj__slide-fallback">
          <span class="ic">${project.icon}</span>
          <span>${s.label}</span>
        </div>
      </div>
    `).join('');

    const dotsWrap = section.querySelector('.proj-dots');
    dotsWrap.innerHTML = data.slides.map((_, i) => `<span data-active="${i === 0}"></span>`).join('');

    galleryState[key] = { current: 0, total: data.slides.length, labels: data.slides.map(s => s.label) };
    updateGalleryLabel(key);
    track.style.transform = 'translateX(0)';
  });
}

function updateGalleryLabel(key) {
  const section = document.querySelector(`.sheet--project[data-project="${key}"]`);
  if (!section) return;
  const state = galleryState[key];
  const label = section.querySelector('.proj-slide-label');
  if (label) label.textContent = `${String(state.current + 1).padStart(2, '0')} / ${String(state.total).padStart(2, '0')}`;
}

function goToProjectSlide(key, idx) {
  const state = galleryState[key];
  if (!state) return;
  state.current = (idx + state.total) % state.total;
  const section = document.querySelector(`.sheet--project[data-project="${key}"]`);
  section.querySelector('.proj-track').style.transform = `translateX(-${state.current * 100}%)`;
  section.querySelectorAll('.proj-dots span').forEach((d, i) => d.setAttribute('data-active', i === state.current));
  updateGalleryLabel(key);
}

function initProjectGalleryControls() {
  document.querySelectorAll('.sheet--project').forEach(section => {
    const key = section.dataset.project;
    section.querySelector('.proj-prev').addEventListener('click', () => goToProjectSlide(key, galleryState[key].current - 1));
    section.querySelector('.proj-next').addEventListener('click', () => goToProjectSlide(key, galleryState[key].current + 1));
    section.querySelector('.proj-dots').addEventListener('click', (e) => {
      const dots = [...section.querySelectorAll('.proj-dots span')];
      const idx = dots.indexOf(e.target);
      if (idx > -1) goToProjectSlide(key, idx);
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   3. I18N
───────────────────────────────────────────────────────────────────────── */
function applyLang(lang) {
  const dict = T[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n-html')];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n')];
    if (val === undefined) return;
    const hasElementChildren = [...el.childNodes].some(n => n.nodeType === 1);
    if (hasElementChildren) {
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim() !== '') { node.textContent = val; return; }
      }
      el.insertBefore(document.createTextNode(val), el.firstChild);
    } else {
      el.textContent = val;
    }
  });

  // Tooltips bilingües nativos (title)
  document.querySelectorAll('[data-tooltip-en]').forEach(el => {
    if (!el.hasAttribute('data-tooltip-es')) el.setAttribute('data-tooltip-es', el.getAttribute('title') || '');
    el.setAttribute('title', lang === 'en' ? el.getAttribute('data-tooltip-en') : el.getAttribute('data-tooltip-es'));
  });

  const cvBtn = document.getElementById('cvDownloadBtn');
  if (cvBtn) {
    const cvFile = dict['cv.file'] || 'CV_pdf_ES.pdf';
    cvBtn.setAttribute('href', cvFile);
    cvBtn.setAttribute('download', cvFile);
  }

  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('lang-btn--active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  document.querySelectorAll('.tb-rev').forEach(el => { el.textContent = lang.toUpperCase(); });
  const tbRev = document.getElementById('tbRev');
  if (tbRev) tbRev.textContent = lang.toUpperCase();

  document.title = lang === 'en' ? 'Mariano Franco Hurtado — Civil Engineer' : 'Mariano Franco Hurtado — Ingeniero Civil';

  renderProjectContent(lang);
  buildRulerLabels();

  localStorage.setItem('portfolio-lang', lang);
  currentLang = lang;

  document.querySelectorAll('.exp-evidence__label').forEach(el => { el.textContent = dict['exp.evidenceLabel']; });
  if (document.getElementById('lightbox') && document.getElementById('lightbox').getAttribute('data-open') === 'true') {
    renderLightboxSlide();
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   4. NAVEGACIÓN HORIZONTAL — reglas, teclado, rueda, observer
───────────────────────────────────────────────────────────────────────── */
let sheetsEl, rulerTrack, rulerPrev, rulerNext, hdrIndex, hdrTotal, hdrLabel;
let activeIndex = 0;
let totalSheets = 0;

function buildRuler() {
  sheetsEl = document.getElementById('sheets');
  rulerTrack = document.getElementById('rulerTrack');
  rulerPrev = document.getElementById('rulerPrev');
  rulerNext = document.getElementById('rulerNext');
  hdrIndex = document.getElementById('hdrIndex');
  hdrTotal = document.getElementById('hdrTotal');
  hdrLabel = document.getElementById('hdrLabel');

  const sheets = [...sheetsEl.querySelectorAll('.sheet')];
  totalSheets = sheets.length;
  if (hdrTotal) hdrTotal.textContent = String(totalSheets - 1).padStart(2, '0');

  rulerTrack.innerHTML = sheets.map((s, i) => {
    return `<button class="ruler__tick" data-index="${i}" data-target="${s.id}">
      <span class="ruler__tick-no">${String(i).padStart(2, '0')}</span>
      <span class="ruler__tick-label"></span>
    </button>`;
  }).join('');

  rulerTrack.querySelectorAll('.ruler__tick').forEach(tick => {
    tick.addEventListener('click', () => jumpToSheet(parseInt(tick.dataset.index, 10)));
  });

  buildRulerLabels();
}

function buildRulerLabels() {
  const dict = T[currentLang];
  document.querySelectorAll('.sheet').forEach((s, i) => {
    const tick = rulerTrack ? rulerTrack.querySelector(`.ruler__tick[data-index="${i}"] .ruler__tick-label`) : null;
    let label = s.dataset.label || '';
    if (s.dataset.labelI18n && dict[s.dataset.labelI18n]) label = dict[s.dataset.labelI18n];
    else if (!label) label = s.dataset.labelFallback || '';
    if (tick) tick.textContent = label;
  });
}

function jumpToSheet(index) {
  const sheets = [...sheetsEl.querySelectorAll('.sheet')];
  const len = sheets.length;
  const wrapped = ((index % len) + len) % len; // loop circular: 10 -> 00, 00 -> 10
  const target = sheets[wrapped];
  if (!target) return;
  if (isDesktop()) {
    sheetsEl.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setActive(index) {
  activeIndex = index;
  const dict = T[currentLang];
  const sheets = [...sheetsEl.querySelectorAll('.sheet')];
  const s = sheets[index];
  if (!s) return;

  rulerTrack.querySelectorAll('.ruler__tick').forEach((t, i) => t.setAttribute('data-active', i === index ? 'true' : 'false'));

  const activeTick = rulerTrack.querySelector(`.ruler__tick[data-index="${index}"]`);
  if (activeTick) activeTick.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

  if (hdrIndex) hdrIndex.textContent = String(index).padStart(2, '0');
  if (hdrLabel) {
    let label = '';
    if (s.dataset.labelI18n && dict[s.dataset.labelI18n]) label = dict[s.dataset.labelI18n];
    else label = s.dataset.labelFallback || s.dataset.label || '';
    hdrLabel.textContent = label;
  }

  // Carrusel circular: los botones prev/next nunca se deshabilitan.
  rulerPrev.disabled = false;
  rulerNext.disabled = false;
}

function initObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
        const sheets = [...sheetsEl.querySelectorAll('.sheet')];
        const idx = sheets.indexOf(entry.target);
        if (idx > -1) setActive(idx);
      }
    });
  }, { root: isDesktop() ? sheetsEl : null, threshold: [0.55] });

  sheetsEl.querySelectorAll('.sheet').forEach(s => observer.observe(s));
}

function initWheelNav() {
  sheetsEl.addEventListener('wheel', (e) => {
    if (!isDesktop()) return;

    const scrollTarget = e.target.closest('.sheet__scroll');
    if (scrollTarget) {
      const atTop = scrollTarget.scrollTop <= 0;
      const atBottom = Math.ceil(scrollTarget.scrollTop + scrollTarget.clientHeight) >= scrollTarget.scrollHeight;
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return; // deja scroll vertical interno
    }

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 2) return;
    e.preventDefault();
    sheetsEl.scrollLeft += delta;
  }, { passive: false });
}

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (!isDesktop()) return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); jumpToSheet(activeIndex + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); jumpToSheet(activeIndex - 1); }
  });
}

function initPrevNextButtons() {
  rulerPrev.addEventListener('click', () => jumpToSheet(activeIndex - 1));
  rulerNext.addEventListener('click', () => jumpToSheet(activeIndex + 1));
}

function initJumpLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const sheets = [...sheetsEl.querySelectorAll('.sheet')];
      const idx = sheets.indexOf(target);
      if (idx > -1) jumpToSheet(idx);
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   4b. PANEL DE CONTACTO (botón "M" del header)
───────────────────────────────────────────────────────────────────────── */
function initMarkPanel() {
  const toggle = document.getElementById('markToggle');
  const panel = document.getElementById('markPanel');
  const homeBtn = document.getElementById('markHome');
  if (!toggle || !panel) return;

  function openPanel() {
    panel.setAttribute('data-open', 'true');
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    panel.setAttribute('data-open', 'false');
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function isOpen() { return panel.getAttribute('data-open') === 'true'; }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? closePanel() : openPanel();
  });

  document.addEventListener('click', (e) => {
    if (isOpen() && !panel.contains(e.target) && !toggle.contains(e.target)) closePanel();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closePanel();
  });

  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      closePanel();
      jumpToSheet(0);
    });
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   4c. BOCETOS DE FONDO — motivos variados de "memoria de cálculo" por hoja
───────────────────────────────────────────────────────────────────────── */
/* Motivos ESQUEMÁTICOS (mayor peso) — inspirados directamente en la hoja de
   referencia "BEAM B1": elevación, secciones, diagramas y detalles. */
const SKETCH_MOTIFS_DIAGRAM = [
  // 0 — Elevación de viga con carga distribuida + apoyos A/B
  `<text class="sk-text" x="0" y="10">BEAM B1</text>
   <line class="sk-line" x1="0" y1="70" x2="240" y2="70"/>
   <path class="sk-line" d="M0,70 L-14,96 L14,96 Z"/>
   <path class="sk-line" d="M240,70 L226,96 L254,96 Z"/>
   <g class="sk-dim"><line x1="16" y1="30" x2="16" y2="68"/><line x1="52" y1="30" x2="52" y2="68"/><line x1="88" y1="30" x2="88" y2="68"/><line x1="124" y1="30" x2="124" y2="68"/><line x1="160" y1="30" x2="160" y2="68"/><line x1="196" y1="30" x2="196" y2="68"/><line x1="224" y1="30" x2="224" y2="68"/></g>
   <line class="sk-line" x1="0" y1="30" x2="240" y2="30"/>
   <text class="sk-text-sm" x="74" y="24">w = 12.5 kN/m</text>
   <text class="sk-text-sm" x="-8" y="112">A</text><text class="sk-text-sm" x="244" y="112">B</text>
   <line class="sk-dim" x1="0" y1="128" x2="240" y2="128"/>
   <text class="sk-text-sm" x="92" y="148">6000</text>`,

  // 1 — Sección de viga (300 × 600) con armado
  `<text class="sk-text" x="0" y="10">SECTION 300×600</text>
   <rect class="sk-line" x="20" y="26" width="120" height="150"/>
   <circle class="sk-fill" cx="36" cy="44" r="3"/><circle class="sk-fill" cx="80" cy="44" r="3"/><circle class="sk-fill" cx="124" cy="44" r="3"/>
   <circle class="sk-fill" cx="36" cy="158" r="3.4"/><circle class="sk-fill" cx="80" cy="158" r="3.4"/><circle class="sk-fill" cx="124" cy="158" r="3.4"/>
   <rect class="sk-dim" x="28" y="34" width="104" height="132"/>
   <text class="sk-text-sm" x="146" y="48">2⌀16</text>
   <text class="sk-text-sm" x="146" y="100">⌀10@150</text>
   <text class="sk-text-sm" x="146" y="162">2⌀20</text>
   <line class="sk-dim" x1="20" y1="186" x2="140" y2="186"/>
   <text class="sk-text-sm" x="60" y="204">25 250 25</text>`,

  // 2 — Sección típica en T (bf / tf / h)
  `<text class="sk-text" x="0" y="10">TYPICAL SECTION</text>
   <path class="sk-line" d="M10,30 H190 V56 H128 V170 H72 V56 H10 Z"/>
   <circle class="sk-fill" cx="88" cy="70" r="2.6"/><circle class="sk-fill" cx="112" cy="70" r="2.6"/>
   <circle class="sk-fill" cx="88" cy="150" r="3"/><circle class="sk-fill" cx="112" cy="150" r="3"/>
   <line class="sk-dim" x1="10" y1="18" x2="190" y2="18"/>
   <text class="sk-text-sm" x="80" y="14">bf = 1200</text>
   <line class="sk-dim" x1="204" y1="30" x2="204" y2="170"/>
   <text class="sk-text-sm" x="208" y="102">h = 600</text>
   <text class="sk-text-sm" x="132" y="52">2⌀16</text>
   <text class="sk-text-sm" x="132" y="140">⌀10@150</text>`,

  // 3 — Diagrama de fuerza cortante
  `<text class="sk-text" x="0" y="10">SHEAR FORCE DIAGRAM</text>
   <line class="sk-dim" x1="0" y1="76" x2="240" y2="76"/>
   <path class="sk-line" d="M0,76 L0,32 L120,76 L120,120 L240,76"/>
   <text class="sk-text-sm" x="2" y="26">51.0</text>
   <text class="sk-text" x="40" y="60">+</text>
   <text class="sk-text" x="170" y="98">−</text>
   <text class="sk-text-sm" x="200" y="134">-51.0</text>`,

  // 4 — Diagrama de momento flector
  `<text class="sk-text" x="0" y="10">BENDING MOMENT DIAGRAM</text>
   <line class="sk-dim" x1="0" y1="100" x2="240" y2="100"/>
   <path class="sk-line" d="M0,100 Q120,44 240,100"/>
   <text class="sk-text-sm" x="106" y="46">76.5</text>
   <text class="sk-text" x="112" y="86">+</text>`,

  // 5 — Elevación longitudinal con armado corrido y estribos
  `<text class="sk-text" x="0" y="10">BEAM ELEVATION — REBAR</text>
   <rect class="sk-line" x="0" y="30" width="260" height="46"/>
   <g class="sk-dim"><line x1="18" y1="30" x2="18" y2="76"/><line x1="40" y1="30" x2="40" y2="76"/><line x1="62" y1="30" x2="62" y2="76"/><line x1="84" y1="30" x2="84" y2="76"/><line x1="106" y1="30" x2="106" y2="76"/><line x1="128" y1="30" x2="128" y2="76"/><line x1="150" y1="30" x2="150" y2="76"/><line x1="172" y1="30" x2="172" y2="76"/><line x1="194" y1="30" x2="194" y2="76"/><line x1="216" y1="30" x2="216" y2="76"/><line x1="238" y1="30" x2="238" y2="76"/></g>
   <text class="sk-text-sm" x="4" y="98">2⌀16 CONT.</text>
   <text class="sk-text-sm" x="100" y="98">⌀10@150</text>
   <text class="sk-text-sm" x="200" y="98">2⌀20</text>
   <line class="sk-dim" x1="0" y1="112" x2="260" y2="112"/>
   <text class="sk-text-sm" x="106" y="130">5500 · 6100</text>`,

  // 6 — Sección A-A: columna → zapata (empalme)
  `<text class="sk-text" x="0" y="10">SECTION A-A</text>
   <rect class="sk-line" x="70" y="18" width="40" height="90"/>
   <path class="sk-line" d="M40,108 L140,108 L120,150 L60,150 Z"/>
   <line class="sk-dim" x1="10" y1="150" x2="30" y2="150"/>
   <text class="sk-text-sm" x="4" y="140">FFL</text>
   <text class="sk-text-sm" x="6" y="60">COL. C1</text>
   <text class="sk-text-sm" x="6" y="76">300×300</text>
   <text class="sk-text-sm" x="118" y="60">8⌀16</text>
   <line class="sk-dim" x1="40" y1="168" x2="140" y2="168"/>
   <text class="sk-text-sm" x="70" y="186">1500 · 1800</text>`,

  // 7 — Planta de zapata
  `<text class="sk-text" x="0" y="10">FOOTING PLAN</text>
   <rect class="sk-line" x="10" y="26" width="180" height="130"/>
   <rect class="sk-dim" x="72" y="62" width="56" height="58"/>
   <line class="sk-dim" x1="0" y1="90" x2="10" y2="90"/><line class="sk-dim" x1="190" y1="90" x2="200" y2="90"/>
   <text class="sk-text-sm" x="0" y="86">A</text><text class="sk-text-sm" x="196" y="86">A</text>
   <line class="sk-dim" x1="10" y1="170" x2="190" y2="170"/>
   <text class="sk-text-sm" x="76" y="188">1800</text>`,

  // 8 — Sección de losa (T corta)
  `<text class="sk-text" x="0" y="10">SLAB SECTION</text>
   <path class="sk-line" d="M0,40 H190 V64 H120 V96 H70 V64 H0 Z"/>
   <line class="sk-dim" x1="6" y1="50" x2="184" y2="50"/>
   <line class="sk-dim" x1="76" y1="80" x2="114" y2="80"/>
   <text class="sk-text-sm" x="4" y="30">⌀8@200 (T)</text>
   <text class="sk-text-sm" x="66" y="116">⌀8@200 (B)</text>
   <line class="sk-dim" x1="202" y1="40" x2="202" y2="96"/>
   <text class="sk-text-sm" x="206" y="70">120</text>`,

  // 9 — Junta de construcción (superficie rugosa)
  `<text class="sk-text" x="0" y="10">CONSTRUCTION JOINT</text>
   <rect class="sk-line" x="10" y="26" width="70" height="110"/>
   <path class="sk-dim" d="M80,26 L92,40 L80,54 L92,68 L80,82 L92,96 L80,110 L92,124 L80,136"/>
   <text class="sk-text-sm" x="100" y="60">ROUGHEN</text>
   <text class="sk-text-sm" x="100" y="78">SURFACE</text>
   <line class="sk-dim" x1="10" y1="150" x2="80" y2="150"/>
   <text class="sk-text-sm" x="24" y="168">200</text>`,

  // 10 — Detalle de estribo (gancho 135°)
  `<text class="sk-text" x="0" y="10">STIRRUP DETAIL</text>
   <rect class="sk-line" x="16" y="26" width="130" height="88" rx="10"/>
   <text class="sk-text-sm" x="152" y="24">135° HOOK</text>
   <line class="sk-dim" x1="140" y1="34" x2="164" y2="20"/>
   <text class="sk-text-sm" x="6" y="132">10⌀</text>
   <line class="sk-dim" x1="16" y1="130" x2="146" y2="130"/>
   <text class="sk-text-sm" x="62" y="150">250</text>`,
];

/* Motivos de FÓRMULAS / NOTAS (peso bajo — solo ocasionales) */
const SKETCH_MOTIFS_NOTES = [
  `<text class="sk-text" x="0" y="10">FLEXURAL DESIGN</text>
   <text class="sk-text-sm" x="0" y="34">f'c = 25 MPa , fy = 500 MPa</text>
   <text class="sk-text-sm" x="0" y="56">As = 2⌀20 + 2⌀16</text>
   <line class="sk-dim" x1="0" y1="70" x2="180" y2="70"/>
   <text class="sk-text-sm" x="0" y="92">øMn &gt; Mu OK ✓</text>`,

  `<text class="sk-text" x="0" y="10">NOTES</text>
   <text class="sk-text-sm" x="0" y="32">1. ALL DIMENSIONS IN mm</text>
   <text class="sk-text-sm" x="0" y="52">2. DO NOT SCALE DRAWINGS</text>
   <text class="sk-text-sm" x="0" y="72">3. COVER = 25mm</text>`,
];

/* Generador determinístico pseudoaleatorio — mismo resultado en cada carga,
   pero distinto por hoja/instancia, para el efecto "libreta desordenada" */
function seededRand(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Pool ponderado: los esquemas aparecen ~4× más que las notas/fórmulas
const SKETCH_POOL = [
  ...SKETCH_MOTIFS_DIAGRAM, ...SKETCH_MOTIFS_DIAGRAM,
  ...SKETCH_MOTIFS_DIAGRAM, ...SKETCH_MOTIFS_DIAGRAM,
  ...SKETCH_MOTIFS_NOTES,
];

function buildSketchSVG(motifContent, uid) {
  const seed = (uid % 9) + 1;
  return `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
    <filter id="pfx-${uid}" x="-25%" y="-25%" width="150%" height="150%">
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="${seed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6"/>
    </filter>
    <g filter="url(#pfx-${uid})">${motifContent}</g>
  </svg>`;
}

/* Zonas seguras (evitan header, regla inferior y cajetín) donde puede caer un boceto.
   Dentro de cada zona la posición exacta se sortea con seededRand para el efecto libreta. */
const SKETCH_ZONES = [
  { side: 'top-right', top: [78, 140], right: [3, 11] },
  { side: 'top-left', top: [86, 150], left: [3, 11] },
  { side: 'mid-right', top: [210, 300], right: [2, 9] },
  { side: 'mid-left', top: [210, 300], left: [2, 9] },
  { side: 'bottom-right', bottom: [148, 210], right: [3, 13] },
  { side: 'bottom-left', bottom: [148, 210], left: [3, 13] },
  { side: 'far-right-mid', top: [340, 420], right: [1, 6] },
  { side: 'far-left-mid', top: [340, 420], left: [1, 6] },
];

function placeSketch(sheet, motifContent, uid, zoneIndex, salt) {
  const zone = SKETCH_ZONES[zoneIndex % SKETCH_ZONES.length];
  const r1 = seededRand(uid * 3.1 + salt);
  const r2 = seededRand(uid * 7.7 + salt + 1);
  const r3 = seededRand(uid * 5.3 + salt + 2);
  const r4 = seededRand(uid * 9.1 + salt + 3);

  const wrap = document.createElement('div');
  wrap.className = 'page-sketch sketch-art';
  wrap.setAttribute('aria-hidden', 'true');

  const width = Math.round(200 + r3 * 100); // 200–300px
  wrap.style.width = width + 'px';

  if (zone.top) wrap.style.top = Math.round(zone.top[0] + r1 * (zone.top[1] - zone.top[0])) + 'px';
  if (zone.bottom) wrap.style.bottom = Math.round(zone.bottom[0] + r1 * (zone.bottom[1] - zone.bottom[0])) + 'px';
  if (zone.left) wrap.style.left = (zone.left[0] + r2 * (zone.left[1] - zone.left[0])).toFixed(1) + '%';
  if (zone.right) wrap.style.right = (zone.right[0] + r2 * (zone.right[1] - zone.right[0])).toFixed(1) + '%';

  // Inclinación sutil tipo hoja de libreta — nunca una rotación completa
  const sign = r4 > 0.5 ? 1 : -1;
  const rotation = sign * (4 + r4 * 8); // ±4°..±12°
  wrap.style.transform = `rotate(${rotation.toFixed(1)}deg)`;

  wrap.innerHTML = buildSketchSVG(motifContent, uid);
  sheet.insertBefore(wrap, sheet.firstChild);
}

function injectPageSketches() {
  const sheets = [...document.querySelectorAll('.sheet')];
  let uid = 0;

  sheets.forEach((sheet, i) => {
    if (sheet.classList.contains('sheet--hero')) return; // la hoja 00 tiene su propio boceto dedicado

    // 2 o 3 bocetos por hoja, según semilla propia de cada hoja
    const countRoll = seededRand(i * 6.6 + 1);
    const count = countRoll > 0.5 ? 3 : 2;

    for (let k = 0; k < count; k++) {
      uid++;
      const poolRoll = seededRand(uid * 8.3 + i);
      const motifContent = SKETCH_POOL[Math.floor(poolRoll * SKETCH_POOL.length)];
      placeSketch(sheet, motifContent, uid, i + k * 3, k * 11);
    }
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   5. IDIOMAS — BOTONES
───────────────────────────────────────────────────────────────────────── */
function initLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== currentLang) applyLang(btn.dataset.lang);
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   6. BARRAS DE IDIOMA (educación) — animación al entrar en viewport
───────────────────────────────────────────────────────────────────────── */
function initLangBars() {
  const bars = document.querySelectorAll('.lang-row__bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('animated'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.4, root: isDesktop() ? sheetsEl : null });
  bars.forEach(b => observer.observe(b));
}

/* ─────────────────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildProjectSheets();
  initProjectGalleryControls();
  renderExperienceEvidence();
  initLightbox();
  buildRuler();
  injectPageSketches();
  initObserver();
  initWheelNav();
  initKeyboardNav();
  initPrevNextButtons();
  initJumpLinks();
  initLangButtons();
  initMarkPanel();
  applyLang(currentLang);
  initLangBars();
  setActive(0);
});
