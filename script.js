const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const header = document.querySelector("[data-header]");
const contactForm = document.querySelector("[data-contact-form]");
const trustItems = document.querySelectorAll(".trust-item");
const langButtons = document.querySelectorAll("[data-lang-switch]");
const originalTranslationHtml = new WeakMap();
const originalLeadingText = new WeakMap();
const originalAttributes = new WeakMap();

document.querySelectorAll(".detail-proof article, .detail-steps li, .detail-check li").forEach((item) => {
  item.classList.add("live-card");
  item.setAttribute("tabindex", "0");
});

const interactiveCards = document.querySelectorAll(".live-card, .ops-item");

const pageTitles = {
  "index.html": {
    es: "Sistema Radiant | Control de calidad para propiedades",
    en: "Radiant System | Property quality control"
  },
  "viviendas-vacacionales.html": {
    es: "Viviendas vacacionales | Radiant Clean",
    en: "Holiday homes | Radiant Clean"
  },
  "post-obra.html": {
    es: "Limpieza post-obra | Radiant Clean",
    en: "Post-construction cleaning | Radiant Clean"
  },
  "venta-alquiler.html": {
    es: "Puesta a punto para venta y alquiler | Radiant Clean",
    en: "Sale and rental preparation | Radiant Clean"
  },
  "formacion.html": {
    es: "Radiant Academy | Formación profesional",
    en: "Radiant Academy | Professional training"
  },
  "como-trabajo.html": {
    es: "Sistema Radiant | Radiant Clean",
    en: "Radiant System | Radiant Clean"
  },
  "aviso-legal.html": {
    es: "Aviso legal | Radiant Clean",
    en: "Legal notice | Radiant Clean"
  },
  "privacidad.html": {
    es: "Política de privacidad | Radiant Clean",
    en: "Privacy policy | Radiant Clean"
  },
  "cookies.html": {
    es: "Política de cookies | Radiant Clean",
    en: "Cookies policy | Radiant Clean"
  }
};

const commonTranslations = [
  [".skip-link", "Saltar al contenido", "Skip to content"],
  [".nav-toggle .sr-only", "Abrir menú", "Open menu"],
  [".main-nav a:nth-child(1)", "Servicios", "Services"],
  [".main-nav a:nth-child(2)", "Viviendas", "Homes"],
  [".main-nav a:nth-child(3)", "Post-obra", "Post-build"],
  [".main-nav a:nth-child(4)", "Venta/alquiler", "Sale/rental"],
  [".main-nav a:nth-child(5)", "Sistema Radiant", "Radiant System"],
  [".main-nav a:nth-child(6)", "Formación", "Training"],
  [".main-nav a:nth-child(7)", "Testimonios", "Testimonials"],
  [".main-nav a:nth-child(8)", "FAQ", "FAQ"],
  [".main-nav a:nth-child(9)", "Contacto", "Contact"],
  [".header-cta", "Pedir propuesta", "Request quote"],
  [".service-switcher a:nth-child(1)", "Viviendas vacacionales", "Holiday homes"],
  [".service-switcher a:nth-child(2)", "Post-obra", "Post-construction"],
  [".service-switcher a:nth-child(3)", "Venta y alquiler", "Sale and rental"],
  [".site-footer span:first-child", "Radiant Clean · Sistema profesional de calidad", "Radiant Clean · Professional quality system"],
  [".site-footer span:last-child", "Limpieza, control operativo y formación · Costa del Sol", "Cleaning, operational control and training · Costa del Sol"]
];

const indexTranslations = [
  [".hero .eyebrow", "Hola, soy Georgina · Radiant Clean", "Hi, I'm Georgina · Radiant Clean"],
  [".hero h1", "Cuido tu propiedad como si fuese mía.", "I take care of your property as if it were mine."],
  [".hero-copy", "Acompaño a propietarios, gestores y equipos para que cada vivienda llegue impecable a la entrada, conserve su encanto temporada tras temporada y se sienta atendida con calma y criterio.", "I support owners, managers and teams so every home arrives spotless, keeps its charm season after season, and feels looked after with calm and care."],
  [".hero .btn-primary", "Hablar con Georgina", "Talk to Georgina"],
  [".hero .btn-secondary", "Ver dossier", "View dossier"],
  [".hero-tags a:nth-child(1)", "Viviendas vacacionales", "Holiday homes"],
  [".hero-tags a:nth-child(2)", "Post-obra", "Post-construction"],
  [".hero-tags a:nth-child(3)", "Venta y alquiler", "Sale and rental"],
  [".hero-tags a:nth-child(4)", "Formación a equipos", "Team training"],
  [".hero-trust-pill", "Fuengirola · Costa del Sol", "Fuengirola · Costa del Sol"],
  [".hero-signature small", "Fundadora · Limpieza profesional", "Founder · Professional cleaning"],
  [".trust-item:nth-child(1) strong", "Viviendas vacacionales", "Holiday homes"],
  [".trust-item:nth-child(1) small", "Preparadas para cada entrada", "Prepared for every arrival"],
  [".trust-item:nth-child(2) strong", "Complejos turísticos", "Tourist complexes"],
  [".trust-item:nth-child(2) small", "Orden en alta rotación", "Order during high turnover"],
  [".trust-item:nth-child(3) strong", "Limpieza post-obra", "Post-construction cleaning"],
  [".trust-item:nth-child(3) small", "Acabados listos para estrenar", "Finishes ready to use"],
  [".trust-item:nth-child(4) strong", "Puesta a punto", "Property preparation"],
  [".trust-item:nth-child(4) small", "Venta y alquiler con presencia", "Sale and rental with presence"],
  [".trust-item:nth-child(5) strong", "Supervisión profesional", "Professional supervision"],
  [".trust-item:nth-child(5) small", "Control directo de Georgina", "Direct control by Georgina"],
  [".trust-item:nth-child(6) strong", "Costa del Sol", "Costa del Sol"],
  [".trust-item:nth-child(6) small", "Fuengirola, Málaga y alrededores", "Fuengirola, Malaga and nearby areas"],
  [".promise .section-kicker", "Cuidado y excelencia en cada espacio", "Care and excellence in every space"],
  [".promise h2", "Cuando alguien de confianza se ocupa, la propiedad respira distinto.", "When someone trustworthy takes care of it, the property feels different."],
  [".promise-copy p:nth-child(1)", "Acompaño a propietarios, gestores e inmobiliarias que quieren viviendas cuidadas, entregas puntuales y la tranquilidad de saber que todo va a estar listo antes de cada llegada.", "I support owners, managers and agencies who want cared-for homes, punctual handovers and the peace of mind of knowing everything will be ready before every arrival."],
  [".promise-copy p:nth-child(2)", "No me limito a limpiar lo visible: miro la vivienda con calma, detecto pequeños detalles y dejo cada espacio transmitiendo orden, cuidado y confianza.", "I do not just clean what is visible: I look at the home calmly, spot small details and leave every space communicating order, care and trust."],
  [".metrics .metric:nth-child(1) strong", "Planificación", "Planning"],
  [".metrics .metric:nth-child(1) p", "Calendarios claros y trabajo preparado antes de que empiece la presión.", "Clear calendars and prepared work before the pressure begins."],
  [".metrics .metric:nth-child(1) .live-extra", "Rotación, horarios y prioridades coordinadas desde el inicio.", "Turnover, timings and priorities coordinated from the start."],
  [".metrics .metric:nth-child(2) strong", "Control", "Control"],
  [".metrics .metric:nth-child(2) p", "Revisión de puntos críticos para mantener el nivel en cada propiedad.", "Critical-point reviews to maintain the level in every property."],
  [".metrics .metric:nth-child(2) .live-extra", "Superficies, textiles, cocina, baño y presentación final revisados.", "Surfaces, textiles, kitchen, bathroom and final presentation reviewed."],
  [".metrics .metric:nth-child(3) strong", "Equipo", "Team"],
  [".metrics .metric:nth-child(3) p", "Personal cualificado trabajando bajo supervisión directa de Georgina.", "Qualified staff working under Georgina's direct supervision."],
  [".metrics .metric:nth-child(3) .live-extra", "Un equipo alineado con un estándar claro y constante.", "A team aligned with a clear and consistent standard."],
  [".metrics .metric:nth-child(4) strong", "Entrega", "Handover"],
  [".metrics .metric:nth-child(4) p", "Espacios listos para huéspedes, visitas, venta o alquiler.", "Spaces ready for guests, viewings, sale or rental."],
  [".metrics .metric:nth-child(4) .live-extra", "La vivienda queda lista para entrar, enseñar o fotografiar.", "The property is ready to enter, show or photograph."],
  [".portrait-note > span", "Dirección personal", "Personal direction"],
  [".founder .section-kicker", "Quién está detrás", "Who is behind it"],
  [".founder h2", "Soy Georgina. Trabajo cerca, con criterio y mucho cariño por los detalles.", "I'm Georgina. I work closely, with judgement and real care for the details."],
  [".founder-copy > p:nth-of-type(2)", "Llevo años cuidando viviendas vacacionales y propiedades que necesitan estar siempre listas. Mi forma de trabajar se basa en la responsabilidad, la organización y la atención al detalle, y en estar yo presente cuando hace falta.", "I have spent years caring for holiday homes and properties that need to be always ready. My way of working is built on responsibility, organisation, attention to detail, and being there myself when it matters."],
  [".founder-copy > p:nth-of-type(3)", "Superviso cada proceso de cerca y mantengo un estándar claro: que la persona que llega a la vivienda — propietario, huésped o quien venga a verla — sienta desde el primer paso que hay alguien detrás cuidándola.", "I supervise every process closely and keep a clear standard: that whoever walks into the home — owner, guest or visitor — feels from the very first step that someone is looking after it."],
  [".founder-note", "La idea es sencilla: que puedas dejarme las llaves con confianza y saber que estoy mirando la vivienda con cabeza, calma y atención de verdad.", "The idea is simple: you hand me the keys with confidence and know I'm looking after the home with judgement, calm and real attention."],
  [".founder-marks span:nth-child(1)", "+16 años de experiencia", "+16 years of experience"],
  [".founder-marks span:nth-child(2)", "Málaga y alrededores", "Malaga and nearby areas"],
  [".founder-marks span:nth-child(3)", "Equipo formado por mí", "Team trained by me"],
  [".services .section-kicker", "Servicios", "Services"],
  [".services .section-heading h2", "Servicios pensados para que cada propiedad se sienta cuidada desde el primer vistazo.", "Services designed so every property feels cared for at first glance."],
  [".service-grid .service-card:nth-child(1) h3", "Limpieza y mantenimiento de viviendas vacacionales", "Cleaning and maintenance for holiday homes"],
  [".service-grid .service-card:nth-child(1) p", "Limpieza visible, revisión de detalles y conservación del espacio a lo largo del tiempo. Cada entrada queda preparada para huéspedes y propietarios.", "Visible cleaning, detail checks and long-term care for the space. Every arrival is prepared for guests and owners."],
  [".service-grid .service-card:nth-child(1) .service-link", "Ver servicio", "View service"],
  [".service-grid .service-card:nth-child(2) h3", "Complejos de apartamentos turísticos", "Tourist apartment complexes"],
  [".service-grid .service-card:nth-child(2) p", "Organización para altos volúmenes de trabajo, entregas puntuales y resultados homogéneos.", "Organisation for high volumes of work, punctual handovers and consistent results."],
  [".service-grid .service-card:nth-child(2) .service-link", "Organizar complejo", "Plan a complex"],
  [".service-grid .service-card:nth-child(3) h3", "Limpieza post-obra", "Post-construction cleaning"],
  [".service-grid .service-card:nth-child(3) p", "Análisis previo, cuidado de materiales y limpieza final para dejar el inmueble listo.", "Initial assessment, material care and final cleaning to leave the property ready."],
  [".service-grid .service-card:nth-child(3) .service-link", "Ver servicio", "View service"],
  [".service-grid .service-card:nth-child(4) h3", "Puesta a punto para venta o alquiler", "Preparation for sale or rental"],
  [".service-grid .service-card:nth-child(4) p", "Limpieza profunda y revisión completa para mejorar la primera impresión en visitas.", "Deep cleaning and complete review to improve the first impression during viewings."],
  [".service-grid .service-card:nth-child(4) .service-link", "Ver servicio", "View service"],
  [".service-compare .section-kicker", "Comparativa clara", "Clear comparison"],
  [".service-compare h2", "Qué incluye cada servicio y cuándo encaja mejor.", "What each service includes and when it fits best."],
  [".compare-heading p", "No todas las propiedades necesitan lo mismo. Esta vista rápida ayuda a elegir el tipo de intervención y evita presupuestos confusos.", "Not every property needs the same thing. This quick view helps choose the right kind of work and avoids confusing quotes."],
  [".compare-table thead th:nth-child(1)", "Servicio", "Service"],
  [".compare-table thead th:nth-child(2)", "Ideal para", "Best for"],
  [".compare-table thead th:nth-child(3)", "Incluye", "Includes"],
  [".compare-table thead th:nth-child(4)", "Prioridad", "Priority"],
  [".compare-table tbody tr:nth-child(1) th", "Viviendas vacacionales", "Holiday homes"],
  [".compare-table tbody tr:nth-child(1) td:nth-child(2)", "Entradas, salidas y mantenimiento recurrente.", "Arrivals, departures and recurring maintenance."],
  [".compare-table tbody tr:nth-child(1) td:nth-child(3)", "Limpieza, textiles, cocina, baños, terraza y revisión final.", "Cleaning, textiles, kitchen, bathrooms, terrace and final review."],
  [".compare-table tbody tr:nth-child(1) .compare-pill", "Rotación", "Turnover"],
  [".compare-table tbody tr:nth-child(2) th", "Complejos turísticos", "Tourist complexes"],
  [".compare-table tbody tr:nth-child(2) td:nth-child(2)", "Varias unidades con entregas coordinadas.", "Several units with coordinated handovers."],
  [".compare-table tbody tr:nth-child(2) td:nth-child(3)", "Equipo, calendarios, checklist común y control de incidencias.", "Team, calendars, shared checklist and issue control."],
  [".compare-table tbody tr:nth-child(2) .compare-pill", "Orden", "Order"],
  [".compare-table tbody tr:nth-child(3) th", "Post-obra", "Post-construction"],
  [".compare-table tbody tr:nth-child(3) td:nth-child(2)", "Reformas, polvo fino y vivienda antes de estrenar.", "Renovations, fine dust and homes before first use."],
  [".compare-table tbody tr:nth-child(3) td:nth-child(3)", "Análisis previo, limpieza por fases, cristales, acabados y detalle.", "Initial assessment, phased cleaning, glass, finishes and details."],
  [".compare-table tbody tr:nth-child(3) .compare-pill", "Precisión", "Precision"],
  [".compare-table tbody tr:nth-child(4) th", "Venta o alquiler", "Sale or rental"],
  [".compare-table tbody tr:nth-child(4) td:nth-child(2)", "Fotos, visitas, entrega de llaves o cambio de inquilino.", "Photos, viewings, key handover or tenant change."],
  [".compare-table tbody tr:nth-child(4) td:nth-child(3)", "Puesta a punto, primera impresión, orden visual y puntos sensibles.", "Preparation, first impression, visual order and sensitive points."],
  [".compare-table tbody tr:nth-child(4) .compare-pill", "Presencia", "Presence"],
  [".operations .section-kicker", "La forma de trabajar", "How we work"],
  [".operations h2", "Lo pequeño también importa cuando quieres que alguien se sienta bien al entrar.", "Small details matter when you want someone to feel good the moment they walk in."],
  [".operations-copy > p:nth-of-type(2)", "Cajones, superficies, baños, cocina, textiles, terraza, acabados y pequeños signos de desgaste. El servicio está pensado para que el inmueble se mantenga bonito, funcional y rentable.", "Drawers, surfaces, bathrooms, kitchen, textiles, terrace, finishes and small signs of wear. The service is designed to keep the property beautiful, functional and profitable."],
  [".operations .text-link", "Quiero organizar mis propiedades", "I want to organise my properties"],
  [".board-header span", "Checklist operativo", "Operational checklist"],
  [".board-header strong", "Antes de entregar", "Before handover"],
  [".operations-board li:nth-child(1) strong", "Revisión de estancia completa", "Full room review"],
  [".operations-board li:nth-child(1) em", "Dormitorios, salón, zonas de paso y exteriores.", "Bedrooms, living room, passage areas and exteriors."],
  [".operations-board li:nth-child(2) strong", "Cuidado de superficies y acabados", "Care for surfaces and finishes"],
  [".operations-board li:nth-child(2) em", "Atención a materiales, marcas y pequeños signos de uso.", "Attention to materials, marks and small signs of use."],
  [".operations-board li:nth-child(3) strong", "Control de cocina, baño y textiles", "Kitchen, bathroom and textile checks"],
  [".operations-board li:nth-child(3) em", "Puntos que influyen directamente en la confianza del huésped.", "Areas that directly influence guest trust."],
  [".operations-board li:nth-child(4) strong", "Detección de incidencias visibles", "Visible issue detection"],
  [".operations-board li:nth-child(4) em", "Comunicación temprana para evitar sorpresas de última hora.", "Early communication to avoid last-minute surprises."],
  [".operations-board li:nth-child(5) strong", "Presentación final para huéspedes o visitas", "Final presentation for guests or viewings"],
  [".operations-board li:nth-child(5) em", "Orden visual antes de entregar, enseñar o fotografiar.", "Visual order before handing over, showing or photographing."],
  [".method .section-kicker", "Paso a paso", "Step by step"],
  [".method h2", "Un proceso claro, pero con trato humano de principio a fin.", "A clear process, with a human touch from start to finish."],
  [".method-list li:nth-child(1) > strong", "Revisión inicial", "Initial review"],
  [".method-list li:nth-child(1) > span:not(.method-icon)", "Estado del inmueble, objetivos del propietario y nivel de rotación.", "Property condition, owner goals and turnover level."],
  [".method-list li:nth-child(1) > .live-extra", "Se define el punto de partida para trabajar sin improvisación.", "The starting point is defined so the work is not improvised."],
  [".method-list li:nth-child(2) > strong", "Plan de limpieza", "Cleaning plan"],
  [".method-list li:nth-child(2) > span:not(.method-icon)", "Prioridades, tiempos, equipo asignado y puntos críticos de control.", "Priorities, timing, assigned team and critical control points."],
  [".method-list li:nth-child(2) > .live-extra", "Cada tarea se ordena según el uso real de la propiedad.", "Every task is ordered around the property's real use."],
  [".method-list li:nth-child(3) > strong", "Ejecución profesional", "Professional execution"],
  [".method-list li:nth-child(3) > span:not(.method-icon)", "Trabajo ordenado, cuidado de superficies y atención a acabados.", "Orderly work, surface care and attention to finishes."],
  [".method-list li:nth-child(3) > .live-extra", "La limpieza avanza con criterio, no solo con rapidez.", "Cleaning moves with judgement, not only speed."],
  [".method-list li:nth-child(4) > strong", "Supervisión directa", "Direct supervision"],
  [".method-list li:nth-child(4) > span:not(.method-icon)", "Georgina mantiene el estándar y revisa que cada espacio quede listo.", "Georgina maintains the standard and checks that every space is ready."],
  [".method-list li:nth-child(4) > .live-extra", "La calidad se controla antes de dar el servicio por cerrado.", "Quality is checked before the service is closed."],
  [".method-list li:nth-child(5) > strong", "Entrega impecable", "Impeccable handover"],
  [".method-list li:nth-child(5) > span:not(.method-icon)", "Vivienda preparada para huéspedes, visitas, venta o alquiler.", "Property prepared for guests, viewings, sale or rental."],
  [".method-list li:nth-child(5) > .live-extra", "El resultado final transmite cuidado desde el primer vistazo.", "The final result communicates care at first glance."],
  [".results .section-kicker", "Qué aporta Radiant Clean", "What Radiant Clean brings"],
  [".results h2", "Más tranquilidad para quien delega. Más cuidado para quien llega.", "More peace of mind for those who delegate. More care for those who arrive."],
  [".results-top > p", "El estándar no está solo en lo que se ve a primera vista. Está en abrir cajones, revisar detalles, detectar incidencias y mantener una vivienda siempre preparada.", "The standard is not only in what is visible at first glance. It is in opening drawers, checking details, spotting issues and keeping a home always prepared."],
  [".benefits-grid .benefit:nth-child(1) h3", "Propietarios", "Owners"],
  [".benefits-grid .benefit:nth-child(1) p", "Delegan con confianza y reducen la carga de la operativa diaria.", "They delegate with confidence and reduce the weight of daily operations."],
  [".benefits-grid .benefit:nth-child(1) .live-extra", "Menos seguimiento diario, más tranquilidad.", "Less daily follow-up, more peace of mind."],
  [".benefits-grid .benefit:nth-child(2) h3", "Gestores", "Managers"],
  [".benefits-grid .benefit:nth-child(2) p", "Ganan orden, tiempos claros y un estándar que se mantiene.", "They gain order, clear timing and a standard that is maintained."],
  [".benefits-grid .benefit:nth-child(2) .live-extra", "Más control cuando hay varias viviendas en movimiento.", "More control when several homes are moving at once."],
  [".benefits-grid .benefit:nth-child(3) h3", "Huéspedes", "Guests"],
  [".benefits-grid .benefit:nth-child(3) p", "Encuentran espacios cuidados que elevan la experiencia desde la llegada.", "They find cared-for spaces that elevate the experience from arrival."],
  [".benefits-grid .benefit:nth-child(3) .live-extra", "Una entrada limpia cambia la percepción de toda la estancia.", "A clean arrival changes the perception of the whole stay."],
  [".benefits-grid .benefit:nth-child(4) h3", "Inmobiliarias", "Real estate agencies"],
  [".benefits-grid .benefit:nth-child(4) p", "Presentan viviendas con más presencia, orden y confianza visual.", "They present homes with more presence, order and visual trust."],
  [".benefits-grid .benefit:nth-child(4) .live-extra", "Mejor primera impresión en fotos, visitas y entregas.", "A better first impression in photos, viewings and handovers."],
  [".stats .stat-card:nth-child(1) span", "años cuidando viviendas en la Costa del Sol", "years caring for homes on the Costa del Sol"],
  [".stats .stat-card:nth-child(2) span", "entregas impecables coordinadas en temporada", "impeccable handovers coordinated each season"],
  [".stats .stat-card:nth-child(3) span", "valoración media en las viviendas que acompaño", "average rating in the homes I look after"],
  [".stats .stat-card:nth-child(4) span", "supervisado en persona por Georgina", "supervised in person by Georgina"],
  [".case-studies .section-kicker", "Casos reales", "Real cases"],
  [".case-studies h2", "Antes de entregar, la vivienda tiene que contar una historia de cuidado.", "Before handover, the home has to tell a story of care."],
  [".case-heading p", "He dado más protagonismo visual al resultado: estancias preparadas para fotos, visitas, huéspedes o propietarios, con el checklist aplicado antes de cerrar el servicio.", "I have given the result more visual focus: rooms prepared for photos, viewings, guests or owners, with the checklist applied before closing the service."],
  [".case-photo-before figcaption", "Antes de revisar", "Before review"],
  [".case-photo-after figcaption", "Listo para recibir", "Ready to welcome"],
  [".case-tag", "Caso 01 · Vivienda vacacional", "Case 01 · Holiday home"],
  [".case-copy h3", "De limpieza correcta a vivienda preparada para entrar.", "From correct cleaning to a home ready to enter."],
  [".case-copy p", "La diferencia no está solo en que algo esté limpio. Está en la luz, el orden, los textiles, los olores, los puntos de contacto y esa sensación de que alguien lo ha mirado todo antes de entregar.", "The difference is not only that something is clean. It is in the light, order, textiles, scent, touchpoints and that feeling that someone checked everything before handover."],
  [".case-copy li:nth-child(1)", "Revisión de cocina, baños y textiles.", "Kitchen, bathroom and textile review."],
  [".case-copy li:nth-child(2)", "Orden visual para fotos y primera llegada.", "Visual order for photos and first arrival."],
  [".case-copy li:nth-child(3)", "Incidencias visibles comunicadas antes de cerrar.", "Visible issues communicated before closing."],
  [".case-card:nth-child(1) span", "Vacacional", "Holiday"],
  [".case-card:nth-child(1) strong", "Terrazas listas para recibir", "Terraces ready to welcome"],
  [".case-card:nth-child(1) p", "Exterior limpio, mobiliario colocado y sensación de llegada cuidada.", "Clean outdoor space, placed furniture and a cared-for arrival feeling."],
  [".case-card:nth-child(2) span", "Textiles", "Textiles"],
  [".case-card:nth-child(2) strong", "Dormitorios con presencia", "Bedrooms with presence"],
  [".case-card:nth-child(2) p", "Cama, luz y orden pensados para que el descanso entre por los ojos.", "Bed, light and order designed so rest is visible at first glance."],
  [".case-card:nth-child(3) span", "Post-obra", "Post-construction"],
  [".case-card:nth-child(3) strong", "Acabados sin polvo fino", "Finishes without fine dust"],
  [".case-card:nth-child(3) p", "Superficies, esquinas y detalles revisados antes de estrenar.", "Surfaces, corners and details reviewed before first use."],
  [".beforeafter .section-kicker", "Antes / después", "Before / after"],
  [".beforeafter h2", "Misma vivienda, dos formas de prepararla.", "Same home, two ways of preparing it."],
  [".ba-heading p", "A la izquierda, lo que se entrega \"por inercia\": sin mirada, sin criterio. A la derecha, una vivienda preparada con el método Radiant. Mueve el divisor para ver el contraste.", "On the left, what is delivered \"out of habit\": no real eye, no criterion. On the right, a home prepared with the Radiant method. Drag the divider to see the contrast."],
  [".ba-label-before", "Antes", "Before"],
  [".ba-label-after", "Después", "After"],
  [".ba-note", "Foto real de uno de los apartamentos que cuido. Pasa el comparador a izquierda o derecha para ver el contraste.", "Real photo of one of the apartments I care for. Drag the slider left or right to see the contrast."],
  [".testimonials .section-kicker", "Confianza real", "Real trust"],
  [".testimonials h2", "Personas que ya me han dejado las llaves.", "People who have already handed me the keys."],
  [".testimonials-heading p", "Pequeñas frases de propietarios, gestores y equipos con los que trabajo. Lo más importante para mí es que se note la tranquilidad cuando hablan de la vivienda.", "Short words from owners, managers and teams I work with. What matters most to me is the calm you can hear when they talk about the home."],
  [".testimonial:nth-child(1) blockquote", "“La diferencia con Georgina es que de verdad mira la casa. Llegan los huéspedes y la vivienda transmite cuidado desde la puerta. Para mí es invaluable.”", "“The difference with Georgina is that she truly looks at the home. Guests walk in and feel the care from the door. For me it is invaluable.”"],
  [".testimonial:nth-child(1) figcaption strong", "María", "María"],
  [".testimonial:nth-child(1) figcaption span", "Propietaria · Apartamento turístico en Fuengirola", "Owner · Holiday apartment in Fuengirola"],
  [".testimonial:nth-child(2) blockquote", "“Tenemos varios apartamentos en alta rotación y desde que coordinamos con ella las entregas no fallan. Nos ha ordenado el equipo y las valoraciones lo notan.”", "“We have several high-turnover apartments and since we coordinate with her the handovers never fail. She has organised our team and the reviews show it.”"],
  [".testimonial:nth-child(2) figcaption strong", "Daniel", "Daniel"],
  [".testimonial:nth-child(2) figcaption span", "Gestor · Complejo turístico Costa del Sol", "Manager · Holiday complex Costa del Sol"],
  [".testimonial:nth-child(3) blockquote", "“La formación con Georgina nos cambió el chip. Trabajamos con checklist y briefing y ya no repito instrucciones cada semana. Mi equipo lo agradece.”", "“Georgina's training changed our mindset. We work with checklists and briefings and I no longer repeat instructions every week. My team is grateful.”"],
  [".testimonial:nth-child(3) figcaption strong", "Lucía", "Lucía"],
  [".testimonial:nth-child(3) figcaption span", "Empresa de limpieza · Málaga", "Cleaning company · Malaga"],
  [".faq .section-kicker", "Preguntas frecuentes", "Frequently asked"],
  [".faq h2", "Lo que casi todo el mundo me pregunta antes de empezar.", "What almost everyone asks me before starting."],
  [".faq-intro > p:not(.section-kicker)", "Si tienes una duda concreta que no aparece aquí, escríbeme directamente. Prefiero responderte yo a darte una respuesta automática.", "If you have a specific question that isn't here, write to me directly. I would rather answer you myself than give you an automated reply."],
  [".faq-intro .text-link", "Escribir a Georgina por WhatsApp", "Message Georgina on WhatsApp"],
  [".faq-item:nth-child(1) summary span:first-child", "¿En qué zonas trabajas?", "Where do you work?"],
  [".faq-item:nth-child(1) .faq-body", "Estoy en Fuengirola y cubro toda la Costa del Sol y alrededores: Málaga, Mijas, Benalmádena, Marbella y municipios cercanos. Si tu propiedad está fuera, escríbeme y lo valoramos.", "I'm based in Fuengirola and cover the whole Costa del Sol and surroundings: Malaga, Mijas, Benalmádena, Marbella and nearby towns. If your property is outside, write to me and we'll see."],
  [".faq-item:nth-child(2) summary span:first-child", "¿Trabajas sola o con equipo?", "Do you work alone or with a team?"],
  [".faq-item:nth-child(2) .faq-body", "Cuento con un equipo formado por mí. Yo organizo, superviso y reviso. Cada miembro trabaja con el mismo checklist, así que el estándar no depende de quién entre a la vivienda.", "I have a team I trained myself. I organise, supervise and review. Every member works from the same checklist, so the standard does not depend on who walks into the home."],
  [".faq-item:nth-child(3) summary span:first-child", "¿Cómo se contrata el servicio recurrente?", "How do I book the recurring service?"],
  [".faq-item:nth-child(3) .faq-body", "Lo más sencillo es que me escribas por WhatsApp con los datos básicos (zona, tipo de propiedad, rotación). Visitamos la vivienda, ajustamos prioridades y te paso una propuesta clara antes de empezar.", "The easiest way is to message me on WhatsApp with the basics (area, property type, turnover). We visit the home, agree priorities and I send you a clear proposal before starting."],
  [".faq-item:nth-child(4) summary span:first-child", "¿La formación es online o presencial?", "Is the training online or in person?"],
  [".faq-item:nth-child(4) .faq-body", "Presencial, en una vivienda real. Es la única manera de enseñar a mirar de verdad. Después del primer bloque te dejo plantillas y te acompaño en remoto durante las primeras semanas.", "In person, in a real home. It is the only way to really teach how to look. After the first block I leave you templates and support you remotely during the first weeks."],
  [".faq-item:nth-child(5) summary span:first-child", "¿Atiendes urgencias o entregas de última hora?", "Do you handle urgent or last-minute handovers?"],
  [".faq-item:nth-child(5) .faq-body", "Sí, dentro de mi disponibilidad. Si trabajamos de forma recurrente, las urgencias entran dentro del calendario. Para nuevos contactos hago lo posible si encaja en el día.", "Yes, within my availability. If we already work together, urgent work fits into the calendar. For new contacts I do my best if it fits the day."],
  [".training .section-kicker", "Formación Radiant", "Radiant Training"],
  [".training-copy .script-mark", "para equipos y empresas", "for teams and companies"],
  [".training h2", "Enseño la forma de trabajar que en este sector nadie te enseña.", "I teach the way of working that nobody in this sector teaches you."],
  [".training-copy > p:nth-of-type(2)", "El gran problema de la limpieza profesional no son las manos: es la falta de formación. Equipos sin checklist, sin briefing, sin criterio para revisar lo importante.", "The big problem in professional cleaning is not the hands: it is the lack of training. Teams with no checklist, no briefing, no judgement to review what matters."],
  [".training-highlights article:nth-child(1) strong", "In situ", "On site"],
  [".training-highlights article:nth-child(1) span", "En vivienda real, con casos reales.", "In a real home, with real cases."],
  [".training-highlights article:nth-child(2) strong", "Plantillas", "Templates"],
  [".training-highlights article:nth-child(2) span", "Checklists y briefings listos para usar.", "Ready-to-use checklists and briefings."],
  [".training-highlights article:nth-child(3) strong", "Seguimiento", "Follow-up"],
  [".training-highlights article:nth-child(3) span", "Acompañamiento durante las primeras semanas.", "Support during the first weeks."],
  [".training-copy > p:nth-of-type(3)", "Después de años montando sistemas propios, formo a empresas de limpieza, equipos internos de gestores y a quien quiere arrancar su proyecto con cabeza. Te enseño mi metodología, te dejo plantillas reales y te acompaño hasta que el equipo entrega solo, sin que tengas que estar encima.", "After years building my own systems, I train cleaning companies, in-house manager teams and anyone who wants to start their project the right way. I share my methodology, give you real templates and stay close until the team delivers on its own."],
  [".training-bullets li:nth-child(1)", "Para empresas que quieren elevar su estándar.", "For companies that want to raise their standard."],
  [".training-bullets li:nth-child(2)", "Para gestores que necesitan ordenar a su equipo de limpieza.", "For managers who need to organise their cleaning team."],
  [".training-bullets li:nth-child(3)", "Para quien quiere arrancar su propio negocio del sector.", "For people who want to start their own business in the sector."],
  [".training-actions .btn-primary", "Ver formación completa", "See full training"],
  [".training-actions .text-link", "Hablar por WhatsApp", "Message on WhatsApp"],
  [".training-board-head span", "Mi método", "My method"],
  [".training-board-head strong", "Sistema Radiant", "Radiant System"],
  [".training-steps li:nth-child(1) strong", "Briefing inicial", "Initial briefing"],
  [".training-steps li:nth-child(1) span", "Conozco el equipo, las viviendas y el nivel real desde el que partimos.", "I meet the team, the homes and the real starting level."],
  [".training-steps li:nth-child(2) strong", "Checklists por tipo de servicio", "Checklists by service type"],
  [".training-steps li:nth-child(2) span", "Plantillas claras para entrada, post-obra, puesta a punto y rotación alta.", "Clear templates for arrivals, post-build, sale prep and high-turnover work."],
  [".training-steps li:nth-child(3) strong", "Formación práctica in situ", "Hands-on on-site training"],
  [".training-steps li:nth-child(3) span", "Trabajamos juntas en una vivienda real: cómo mirar, qué revisar, en qué orden.", "We work together in a real home: how to look, what to check, in what order."],
  [".training-steps li:nth-child(4) strong", "Sistema de supervisión", "Supervision system"],
  [".training-steps li:nth-child(4) span", "Cómo controlar la calidad sin tener que repetir el trabajo después.", "How to control quality without having to redo the work afterwards."],
  [".training-steps li:nth-child(5) strong", "Acompañamiento posterior", "Ongoing support"],
  [".training-steps li:nth-child(5) span", "Sigo cerca durante las primeras semanas para que el sistema se quede contigo.", "I stay close for the first weeks so the system truly sticks."],
  [".training-deliverables span", "Entregables", "Deliverables"],
  [".training-deliverables strong", "Checklist, briefing, protocolo de revisión y ficha de incidencias.", "Checklist, briefing, review protocol and issue sheet."],
  [".training-quote cite", "— Georgina Cuesta", "— Georgina Cuesta"],
  [".reels .section-kicker", "Reels Radiant Clean", "Radiant Clean Reels"],
  [".reels-heading h2", "Una forma más visual de entender el cuidado real de una propiedad.", "A more visual way to understand real property care."],
  [".reels-heading > p", "Selección de contenidos donde Georgina explica qué hay detrás de una vivienda bien mantenida: coordinación, revisión y detalles que elevan la experiencia antes de cada llegada.", "Selected videos where Georgina explains what sits behind a well-maintained home: coordination, checks and details that elevate the experience before every arrival."],
  [".reel-card:nth-child(1) .reel-copy span", "Gestión integral", "Full management"],
  [".reel-card:nth-child(1) h3", "Gestionar una propiedad no es solo alquilar.", "Managing a property is not just renting it out."],
  [".reel-card:nth-child(1) p", "Coordinar, revisar y garantizar que todo esté al nivel esperado define la experiencia antes de cada llegada.", "Coordinating, checking and ensuring everything is at the expected level defines the experience before every arrival."],
  [".reel-card:nth-child(2) .reel-copy span", "Detalles que cuentan", "Details that count"],
  [".reel-card:nth-child(2) h3", "No todo es visible a simple vista.", "Not everything is visible at first glance."],
  [".reel-card:nth-child(2) p", "Los detalles que muchos no revisan son los que realmente marcan la diferencia en el nivel de una propiedad.", "The details many people do not check are what truly make the difference in a property's level."],
  [".reel-card:nth-child(3) .reel-copy span", "Confianza para propietarios", "Confidence for owners"],
  [".reel-card:nth-child(3) h3", "No es solo limpieza. Es tranquilidad.", "It is not only cleaning. It is peace of mind."],
  [".reel-card:nth-child(3) p", "Mantenimiento, control constante y pequeños detalles separan una propiedad que se alquila de una que ofrece experiencia.", "Maintenance, constant control and small details separate a property that is simply rented from one that offers an experience."],
  [".gallery figure:nth-child(1) figcaption", "Terrazas listas para recibir", "Terraces ready to welcome"],
  [".gallery figure:nth-child(2) figcaption", "Cocinas cuidadas al detalle", "Kitchens cared for in detail"],
  [".gallery figure:nth-child(3) figcaption", "Dormitorios con presencia impecable", "Bedrooms with impeccable presence"],
  [".gallery figure:nth-child(4) figcaption", "Salones ordenados y acogedores", "Living rooms that feel ordered and welcoming"],
  [".contact .section-kicker", "Hablamos", "Let's talk"],
  [".contact h2", "Cuéntame qué necesitas y lo miramos con calma.", "Tell me what you need and we'll look at it calmly."],
  [".contact-copy > p:not(.section-kicker):not(.contact-script)", "Escríbeme contándome qué tipo de propiedad tienes, la zona y cómo está organizada hoy. Cada propiedad es distinta, así que prefiero preparar una propuesta pensada para lo que tú necesitas.", "Write to me about the property you have, the area and how it is run today. Every property is different, so I prefer to prepare a proposal tailored to what you really need."],
  [".contact-script", "— Georgina", "— Georgina"],
  [".contact address span", "Costa del Sol · Fuengirola y alrededores", "Costa del Sol · Fuengirola and nearby areas"],
  [".social-links a:nth-child(1)", "Instagram", "Instagram"],
  [".social-links a:nth-child(2)", "Dossier", "Dossier"],
  [".contact-form select option:nth-child(1)", "Seleccionar", "Select"],
  [".contact-form select option:nth-child(2)", "Vivienda vacacional", "Holiday home"],
  [".contact-form select option:nth-child(3)", "Complejo de apartamentos", "Apartment complex"],
  [".contact-form select option:nth-child(4)", "Post-obra", "Post-construction"],
  [".contact-form select option:nth-child(5)", "Venta o alquiler", "Sale or rental"],
  [".contact-form button", "Enviar por WhatsApp", "Send via WhatsApp"]
];

const formacionTranslations = [
  [".detail-back", "Volver al inicio", "Back to home"],
  [".detail-hero .eyebrow", "Radiant Clean · Formación profesional", "Radiant Clean · Professional training"],
  [".detail-hero h1", "Enseño a mirar. Y a montar el sistema para que el equipo no falle.", "I teach how to look. And how to build the system so the team never lets you down."],
  [".detail-hero p:not(.eyebrow)", "El gran problema de la limpieza profesional no son las manos: es la falta de formación. En este programa comparto mi metodología completa — briefings, checklists, supervisión y acompañamiento — para que tu equipo entregue siempre con el mismo nivel.", "The big problem in professional cleaning is not the hands: it is the lack of training. In this programme I share my full methodology — briefings, checklists, supervision and support — so your team always delivers at the same level."],
  [".detail-hero .btn-primary", "Reservar una llamada", "Book a call"],
  [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
  [".detail-hero-card span", "Para quién", "Who it's for"],
  [".detail-hero-card strong", "Empresas, gestores y profesionales que quieren un estándar real y un equipo que lo mantenga.", "Companies, managers and professionals who want a real standard and a team that keeps it."],
  [".audience-card:nth-child(1) .audience-tag", "Empresas", "Companies"],
  [".audience-card:nth-child(1) h3", "Para empresas de limpieza", "For cleaning companies"],
  [".audience-card:nth-child(1) p", "Subir el listón del servicio, unificar criterio entre equipos y diferenciarte en un sector donde casi nadie forma a su gente.", "Raise the bar of the service, unify criteria across teams and stand out in a sector where almost nobody trains their people."],
  [".audience-card:nth-child(2) .audience-tag", "Gestores", "Managers"],
  [".audience-card:nth-child(2) h3", "Para gestores y property managers", "For managers and property managers"],
  [".audience-card:nth-child(2) p", "Organizar a tu equipo de limpieza con briefing, checklist y supervisión propia, sin tener que repetir instrucciones cada semana.", "Organise your cleaning team with briefings, checklists and your own supervision, without repeating instructions every week."],
  [".audience-card:nth-child(3) .audience-tag", "Profesionales", "Professionals"],
  [".audience-card:nth-child(3) h3", "Para quien arranca su proyecto", "For those starting their own project"],
  [".audience-card:nth-child(3) p", "Montar un negocio del sector con cabeza, plantillas reales y la metodología que tarda años en aprenderse trabajando.", "Build a business in the sector the smart way, with real templates and the methodology that takes years to learn on the job."],
  [".formacion-program .section-kicker", "Programa formativo", "Training programme"],
  [".program-eyebrow", "Presencial · vivienda real · tu equipo", "In person · real home · your team"],
  [".formacion-presence-card h2", "La formación se aprende mirando una vivienda real.", "Training is learned by looking at a real home."],
  [".formacion-program-lead", "Trabajo contigo y con tu equipo en una vivienda real: vemos estancias, materiales, orden, briefing y revisión final sin teoría vacía.", "I work with you and your team in a real home: rooms, materials, order, briefing and final review, without empty theory."],
  [".formacion-flow article:nth-child(1) strong", "Entramos", "We step in"],
  [".formacion-flow article:nth-child(1) small", "Diagnóstico real del punto de partida.", "A real diagnosis of the starting point."],
  [".formacion-flow article:nth-child(2) strong", "Practicamos", "We practise"],
  [".formacion-flow article:nth-child(2) small", "Checklist aplicado estancia por estancia.", "Checklist applied room by room."],
  [".formacion-flow article:nth-child(3) strong", "Ordenamos", "We organise"],
  [".formacion-flow article:nth-child(3) small", "Material listo para repetir el sistema.", "Material ready to repeat the system."],
  [".formacion-meta div:nth-child(1) strong", "Modalidad", "Format"],
  [".formacion-meta div:nth-child(1) span", "Presencial in situ + acompañamiento remoto", "On-site + remote follow-up"],
  [".formacion-meta div:nth-child(2) strong", "Duración", "Duration"],
  [".formacion-meta div:nth-child(2) span", "Programa modular ajustado a tu equipo", "Modular programme tailored to your team"],
  [".formacion-meta div:nth-child(3) strong", "Material", "Material"],
  [".formacion-meta div:nth-child(3) span", "Plantillas, checklists y guion de briefing", "Templates, checklists and briefing scripts"],
  [".formacion-meta div:nth-child(4) strong", "Zona", "Area"],
  [".formacion-meta div:nth-child(4) span", "Costa del Sol · consultar otras zonas", "Costa del Sol · ask about other areas"],
  [".program-panel-heading > span", "Cinco bloques", "Five blocks"],
  [".program-panel-heading h3", "Una forma de mirar que se queda contigo.", "One way of looking that stays with you."],
  [".program-panel-heading p", "Del diagnóstico al seguimiento, cada módulo convierte el criterio de Georgina en una rutina clara para tu equipo.", "From diagnosis to follow-up, each module turns Georgina's judgement into a clear routine for your team."],
  [".formacion-modules li:nth-child(1) strong", "Briefing inicial y diagnóstico", "Initial briefing and diagnosis"],
  [".formacion-modules li:nth-child(1) p", "Conocer el equipo, las viviendas, el nivel real y los puntos donde se está perdiendo calidad.", "Meeting the team, the homes, the real level and the points where quality is slipping."],
  [".formacion-modules li:nth-child(2) strong", "Checklists por tipo de servicio", "Checklists by service type"],
  [".formacion-modules li:nth-child(2) p", "Plantillas concretas para entrada vacacional, post-obra, puesta a punto y temporadas de alta rotación.", "Concrete templates for holiday arrivals, post-construction, sale prep and high-turnover seasons."],
  [".formacion-modules li:nth-child(3) strong", "Formación práctica en vivienda real", "Hands-on training in a real home"],
  [".formacion-modules li:nth-child(3) p", "Cómo mirar una estancia, qué revisar, en qué orden y cómo tratar materiales y acabados.", "How to look at a room, what to check, in what order and how to treat materials and finishes."],
  [".formacion-modules li:nth-child(4) strong", "Sistema de supervisión y control", "Supervision and control system"],
  [".formacion-modules li:nth-child(4) p", "Cómo controlar la calidad sin tener que repetir el trabajo después y sin estar encima del equipo.", "How to control quality without redoing the work and without standing over the team."],
  [".formacion-modules li:nth-child(5) strong", "Acompañamiento posterior", "Ongoing support"],
  [".formacion-modules li:nth-child(5) p", "Sigo cerca durante las primeras semanas para que el sistema se quede contigo y empiece a rodar solo.", "I stay close during the first weeks so the system truly sticks and starts running on its own."],
  [".formacion-method .section-kicker", "Mi metodología", "My methodology"],
  [".formacion-method h2", "Lo difícil no es limpiar. Es enseñar a mirar.", "The hard part is not cleaning. It is teaching how to look."],
  [".formacion-method-copy p:nth-of-type(2)", "He construido este sistema a base de años en propiedades reales: lo que funciona, lo que no, y los detalles que un equipo aprende cuando alguien se sienta a explicarlo con calma.", "I built this system over years in real properties: what works, what doesn't, and the details a team learns when someone sits down to explain it calmly."],
  [".formacion-method-copy p:nth-of-type(3)", "Te lo paso ordenado. Cada módulo tiene su plantilla, su checklist y su guion de briefing. Tu trabajo después es supervisar, no improvisar.", "I hand it over in order. Every module has its template, its checklist and its briefing script. Your job after is to supervise, not improvise."],
  [".formacion-method-copy .text-link", "Quiero conocer la metodología en una llamada", "I want to hear about the methodology on a call"],
  [".formacion-quote blockquote", "“La formación con Georgina nos cambió el chip. Antes corregíamos a diario, ahora el equipo entrega con criterio y yo recupero tiempo para hacer crecer el negocio.”", "“Georgina's training changed our mindset. We used to correct every day; now the team delivers with judgement and I get my time back to grow the business.”"],
  [".formacion-quote figcaption strong", "Lucía", "Lucía"],
  [".formacion-quote figcaption span", "Empresa de limpieza · Málaga", "Cleaning company · Malaga"],
  [".formacion-faq .section-kicker", "Antes de empezar", "Before we start"],
  [".formacion-faq h2", "Lo que la gente me suele preguntar.", "What people usually ask me."],
  [".formacion-faq .faq-intro > p:not(.section-kicker)", "Si tu duda no aparece aquí, escríbeme directamente. Prefiero contestarte yo a darte una respuesta automática.", "If your question is not here, write to me directly. I prefer to answer you myself rather than give an automated reply."],
  [".formacion-faq .faq-intro .text-link", "Escribirme por WhatsApp", "Message me on WhatsApp"],
  [".formacion-faq .faq-item:nth-child(1) summary span:first-child", "¿La formación es 1 a 1 o para equipos completos?", "Is the training 1-to-1 or for full teams?"],
  [".formacion-faq .faq-item:nth-child(1) .faq-body", "Ambas opciones. Trabajo tanto con profesionales individuales que quieren montar su servicio como con equipos completos de empresas y gestoras. El programa se ajusta al tamaño y al punto de partida.", "Both. I work with individual professionals who want to launch their service and with full teams from companies and management firms. The programme adapts to size and starting point."],
  [".formacion-faq .faq-item:nth-child(2) summary span:first-child", "¿Qué incluye el material entregable?", "What does the deliverable material include?"],
  [".formacion-faq .faq-item:nth-child(2) .faq-body", "Plantillas de checklist por tipo de servicio, guion de briefing, protocolo de revisión, ficha de incidencias y la guía de supervisión. Todo en formato editable para que lo adaptes a tu marca.", "Checklist templates by service type, briefing script, review protocol, incident sheet and the supervision guide. All editable so you can adapt it to your brand."],
  [".formacion-faq .faq-item:nth-child(3) summary span:first-child", "¿Hay acompañamiento después de la formación?", "Is there support after the training?"],
  [".formacion-faq .faq-item:nth-child(3) .faq-body", "Sí. Las primeras semanas son las que más dudas generan, así que te acompaño a distancia para resolver casos reales y ajustar plantillas según lo que te vayas encontrando.", "Yes. The first weeks raise the most doubts, so I support you remotely to solve real cases and adjust templates as you go."],
  [".formacion-faq .faq-item:nth-child(4) summary span:first-child", "¿Se puede contratar fuera de la Costa del Sol?", "Can I book it outside the Costa del Sol?"],
  [".formacion-faq .faq-item:nth-child(4) .faq-body", "Sí, lo valoramos caso a caso. He impartido formación en otras zonas; lo que cambia es la organización del desplazamiento y de las viviendas reales para las prácticas. Escríbeme y lo vemos.", "Yes, we look at it case by case. I have trained teams in other areas; what changes is travel and arranging the real homes for the practice. Write to me and we'll see."],
  [".formacion-faq .faq-item:nth-child(5) summary span:first-child", "¿Cuánto cuesta?", "How much does it cost?"],
  [".formacion-faq .faq-item:nth-child(5) .faq-body", "Depende del tamaño del equipo y del alcance del programa. No tengo precio cerrado porque cada caso es distinto; tras una llamada de 20 minutos te paso una propuesta clara y sin compromiso.", "It depends on team size and programme scope. I don't have a closed price because every case is different; after a 20-minute call I send you a clear proposal with no commitment."],
  [".detail-cta h2", "Si tu equipo no tiene un sistema, lo construimos juntas.", "If your team has no system, we'll build it together."],
  [".detail-cta .btn", "Reservar llamada con Georgina", "Book a call with Georgina"]
];

const comoTrabajoTranslations = [
  [".detail-back", "Volver al inicio", "Back to home"],
  [".work-hero .eyebrow", "Sistema Radiant", "Radiant System"],
  [".work-hero h1", "Trabajo con método, mirada y supervisión directa.", "I work with method, attention and direct supervision."],
  [".work-hero-copy > p:not(.eyebrow)", "No se trata solo de limpiar. Se trata de entender la propiedad, preparar cada intervención, revisar lo que suele pasar desapercibido y entregar un espacio que transmita orden desde el primer paso.", "It is not just about cleaning. It is about understanding the property, preparing every intervention, checking what often goes unnoticed and handing over a space that feels ordered from the first step."],
  [".work-hero .btn-primary", "Ver el proceso", "View the process"],
  [".work-hero .btn-secondary", "Ver dossier", "View dossier"],
  [".work-hero .detail-highlights span:nth-child(1)", "Diagnóstico previo", "Initial diagnosis"],
  [".work-hero .detail-highlights span:nth-child(2)", "Checklist operativo", "Operational checklist"],
  [".work-hero .detail-highlights span:nth-child(3)", "Equipo coordinado", "Coordinated team"],
  [".work-hero .detail-highlights span:nth-child(4)", "Entrega supervisada", "Supervised handover"],
  [".work-panel-label", "Estándar Radiant", "Radiant standard"],
  [".work-hero-panel strong", "Antes de dar una vivienda por lista, tiene que pasar por mirada, orden y control.", "Before a home is marked ready, it has to pass through attention, order and control."],
  [".work-hero-panel li:nth-child(1)", "Estado general revisado.", "General condition checked."],
  [".work-hero-panel li:nth-child(2)", "Puntos críticos controlados.", "Critical points controlled."],
  [".work-hero-panel li:nth-child(3)", "Presentación final cuidada.", "Final presentation cared for."],
  [".work-principle:nth-child(1) h2", "Mirar antes de actuar.", "Look before acting."],
  [".work-principle:nth-child(1) p", "Primero entiendo el inmueble, su uso, su rotación y sus puntos delicados. Así cada tarea tiene sentido.", "First I understand the property, its use, turnover and delicate points. That way every task has a purpose."],
  [".work-principle:nth-child(2) h2", "Ordenar antes de correr.", "Organise before rushing."],
  [".work-principle:nth-child(2) p", "Un buen resultado depende del orden de trabajo: prioridades claras, equipo alineado y tiempos realistas.", "A good result depends on work order: clear priorities, an aligned team and realistic timing."],
  [".work-principle:nth-child(3) h2", "Supervisar antes de entregar.", "Supervise before handover."],
  [".work-principle:nth-child(3) p", "El último vistazo marca la diferencia: cocina, baño, textiles, acabados, olor, luz y sensación al entrar.", "The final look makes the difference: kitchen, bathroom, textiles, finishes, scent, light and the feeling when entering."],
  [".work-system .section-kicker", "Checklist operativo", "Operational checklist"],
  [".work-system h2", "Lo que no se revisa, se acaba notando.", "What is not checked eventually shows."],
  [".work-system-copy p", "Por eso trabajo con una lista clara de control. No para hacer el servicio frío, sino para que el cuidado no dependa de la prisa, de la memoria o del día que haya tenido el equipo.", "That is why I work with a clear control list. Not to make the service cold, but so care does not depend on hurry, memory or the kind of day the team has had."],
  [".work-system .text-link", "Quiero organizar mis propiedades", "I want to organise my properties"],
  [".work-checksheet .board-header span", "Antes de entregar", "Before handover"],
  [".work-checksheet .board-header strong", "Checklist vivo", "Living checklist"],
  [".work-checksheet li:nth-child(1) strong", "Revisión de estancia completa", "Full room review"],
  [".work-checksheet li:nth-child(1) em", "Dormitorios, salón, zonas de paso y exteriores.", "Bedrooms, living room, passage areas and exteriors."],
  [".work-checksheet li:nth-child(2) strong", "Cuidado de superficies y acabados", "Care for surfaces and finishes"],
  [".work-checksheet li:nth-child(2) em", "Materiales, marcas, polvo fino y signos de uso.", "Materials, marks, fine dust and signs of use."],
  [".work-checksheet li:nth-child(3) strong", "Control de cocina, baño y textiles", "Kitchen, bathroom and textile checks"],
  [".work-checksheet li:nth-child(3) em", "Los puntos que más influyen en la confianza.", "The points that most influence trust."],
  [".work-checksheet li:nth-child(4) strong", "Detección de incidencias visibles", "Visible issue detection"],
  [".work-checksheet li:nth-child(4) em", "Avisos tempranos para evitar sorpresas.", "Early notices to avoid surprises."],
  [".work-checksheet li:nth-child(5) strong", "Presentación final", "Final presentation"],
  [".work-checksheet li:nth-child(5) em", "Orden visual antes de huésped, visita, foto o entrega.", "Visual order before guest, viewing, photo or handover."],
  [".work-process .section-kicker", "Paso a paso", "Step by step"],
  [".work-process h2", "Un proceso claro, con trato humano de principio a fin.", "A clear process with a human touch from beginning to end."],
  [".work-supervision .section-kicker", "Supervisión directa", "Direct supervision"],
  [".work-supervision h2", "El método funciona porque hay alguien mirando de verdad.", "The method works because someone is truly paying attention."],
  [".work-supervision-copy p", "Mi forma de trabajar no consiste en mandar un equipo y desaparecer. Estoy cerca del proceso, reviso criterios, ajusto lo necesario y mantengo una comunicación clara para que sepas cómo está tu propiedad.", "My way of working is not sending a team and disappearing. I stay close to the process, review criteria, adjust what is needed and keep communication clear so you know how your property is doing."],
  [".work-supervision li:nth-child(1)", "Comunicación directa y cercana.", "Direct and close communication."],
  [".work-supervision li:nth-child(2)", "Equipo formado con un estándar común.", "Team trained with a shared standard."],
  [".work-supervision li:nth-child(3)", "Control final antes de cerrar el servicio.", "Final control before closing the service."],
  [".detail-related-heading h2", "El método se adapta al tipo de propiedad.", "The method adapts to each type of property."],
  [".detail-related-heading p", "Cada servicio tiene una prioridad distinta, pero el estándar Radiant se mantiene.", "Each service has a different priority, but the Radiant standard remains."],
  [".detail-cta h2", "Si quieres delegar sin perder control, empecemos por ordenar el sistema.", "If you want to delegate without losing control, let's start by organising the system."],
  [".detail-cta .btn", "Hablar con Georgina", "Talk to Georgina"]
];

const servicePageTranslations = {
  "viviendas-vacacionales.html": [
    [".detail-back", "Volver a servicios", "Back to services"],
    [".detail-hero .eyebrow", "Radiant Clean · Servicio especializado", "Radiant Clean · Specialist service"],
    [".detail-hero h1", "Tu vivienda vacacional, siempre lista para la próxima entrada.", "Your holiday home, always ready for the next arrival."],
    [".detail-hero p:not(.eyebrow)", "Coordino la limpieza, la revisión y el mantenimiento continuo de viviendas turísticas para que cada huésped llegue a un espacio cuidado, ordenado y con el mismo nivel temporada tras temporada.", "I coordinate the cleaning, checks and ongoing maintenance of holiday homes so every guest arrives at a cared-for, tidy space with the same standard season after season."],
    [".detail-hero .btn-primary", "Hablar con Georgina", "Talk to Georgina"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Que cada huésped entre y note que la vivienda está atendida con cariño.", "That every guest walks in and feels the home is being cared for."],
    [".detail-highlights span:nth-child(1)", "Costa del Sol", "Costa del Sol"],
    [".detail-highlights span:nth-child(2)", "Supervisión directa", "Direct supervision"],
    [".detail-highlights span:nth-child(3)", "Equipo formado por mí", "Team trained by me"],
    [".detail-highlights span:nth-child(4)", "Disponibilidad recurrente", "Recurring availability"],
    [".detail-includes .section-kicker", "Qué incluye el servicio", "What the service includes"],
    [".detail-includes h2", "Todo lo que entra dentro de una entrega Radiant.", "Everything that goes into a Radiant handover."],
    [".detail-includes-copy p", "Te dejo el detalle de lo que reviso en cada entrada para que sepas exactamente qué esperar. No hay sorpresas y no hay \"por hoy lo dejamos así\".", "I lay out what I check on every handover so you know exactly what to expect. No surprises and no \"that'll do for today\"."],
    [".detail-includes-copy .text-link", "Quiero una propuesta a medida", "I want a tailored proposal"],
    [".detail-related-heading h2", "También te puede interesar", "You may also like"],
    [".detail-related-heading p", "Si gestionas varias viviendas o estás levantando un proyecto, puedes ampliar el servicio.", "If you manage several homes or are starting a project, the service can grow with you."],
    [".detail-proof article:nth-child(1) strong", "Entrada impecable", "Impeccable arrival"],
    [".detail-proof article:nth-child(1) p", "Camas hechas, cocina y baño revisados, textiles preparados y zonas comunes ordenadas antes de cada llegada.", "Beds made, kitchen and bathroom checked, textiles ready and shared areas tidied before every arrival."],
    [".detail-proof article:nth-child(2) strong", "Conservación real", "Real upkeep"],
    [".detail-proof article:nth-child(2) p", "Cuidado de materiales, detección temprana de incidencias y atención a los detalles que evitan deterioros.", "Care for materials, early detection of issues and attention to details that prevent wear."],
    [".detail-proof article:nth-child(3) strong", "Estándar constante", "Consistent standard"],
    [".detail-proof article:nth-child(3) p", "La vivienda mantiene el mismo nivel incluso en semanas de alta rotación, festivos o cambios rápidos.", "The home keeps the same level even during high-turnover weeks, holidays or fast turnovers."],
    [".detail-copy .section-kicker", "Para propietarios y gestores", "For owners and managers"],
    [".detail-copy h2", "Delegar la limpieza sin perder el control del estado de la vivienda.", "Delegate the cleaning without losing track of how the home is doing."],
    [".detail-copy p:nth-of-type(2)", "No solo entrego una vivienda limpia: te aviso si algo se está estropeando, si un textil necesita relevo, si un huésped ha dejado una incidencia. La idea es que el inmueble dure más y se vea mejor cuanto más tiempo trabajemos juntas.", "I don't just hand over a clean home: I let you know if something is wearing out, if a textile needs replacing, or if a guest left an issue. The idea is that the property lasts longer and looks better the longer we work together."],
    [".detail-copy p:nth-of-type(3)", "Si gestionas varias propiedades, organizo todo el calendario contigo y aseguro que cada entrada llegue en su hora, sin sustos de última hora.", "If you manage several properties, I organise the whole calendar with you and make sure every handover lands on time, no last-minute surprises."],
    [".detail-steps li:nth-child(1) strong", "Planificación de entradas", "Arrival planning"],
    [".detail-steps li:nth-child(1) span", "Organización según calendario, rotación y prioridades de cada vivienda.", "Organisation by calendar, turnover and each home's priorities."],
    [".detail-steps li:nth-child(2) strong", "Limpieza completa", "Complete cleaning"],
    [".detail-steps li:nth-child(2) span", "Trabajo ordenado en estancias, cocina, baño, textiles y exterior.", "Orderly work in rooms, kitchen, bathroom, textiles and outdoor areas."],
    [".detail-steps li:nth-child(3) strong", "Revisión final", "Final review"],
    [".detail-steps li:nth-child(3) span", "Control de presentación antes de entregar la vivienda.", "Presentation check before handing over the home."],
    [".detail-check .section-kicker", "Checklist Radiant", "Radiant checklist"],
    [".detail-check h2", "Los detalles que elevan la valoración.", "The details that raise the rating."],
    [".detail-check li:nth-child(1)", "Presentación cuidada de dormitorios y zonas de descanso.", "Careful presentation of bedrooms and rest areas."],
    [".detail-check li:nth-child(2)", "Cocina limpia, ordenada y lista para usar nada más entrar.", "Kitchen clean, ordered and ready to use from the moment you walk in."],
    [".detail-check li:nth-child(3)", "Baños revisados con atención a superficies, juntas y acabados.", "Bathrooms checked with attention to surfaces, joints and finishes."],
    [".detail-check li:nth-child(4)", "Terrazas y espacios exteriores preparados para disfrutar.", "Terraces and outdoor spaces ready to enjoy."],
    [".detail-check li:nth-child(5)", "Aviso temprano de cualquier incidencia para actuar a tiempo.", "Early heads-up on any issue so you can act on time."],
    [".detail-cta h2", "Convierte cada entrada en una experiencia cuidada.", "Turn every arrival into a cared-for experience."],
    [".detail-cta .btn", "Hablar con Georgina por WhatsApp", "Talk to Georgina on WhatsApp"]
  ],
  "post-obra.html": [
    [".detail-back", "Volver a servicios", "Back to services"],
    [".detail-hero .eyebrow", "Radiant Clean · Servicio especializado", "Radiant Clean · Specialist service"],
    [".detail-hero h1", "Después de la obra, hago que el espacio vuelva a respirar.", "After the works, I let the space breathe again."],
    [".detail-hero p:not(.eyebrow)", "Una limpieza post-obra bien hecha no es cuestión de fuerza: es método. Analizo primero, protejo materiales delicados y retiro polvo, restos y marcas hasta que la vivienda esté lista para enseñar, vender, alquilar o estrenar.", "Real post-construction cleaning isn't about brute force: it's about method. I analyse first, protect delicate materials and remove dust, residue and marks until the home is ready to show, sell, rent or move into."],
    [".detail-hero .btn-primary", "Pedir presupuesto", "Request a quote"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Retirar todo lo que dejó la obra cuidando lo que acaba de estrenarse.", "Remove everything the works left behind while caring for what has just been finished."],
    [".detail-highlights span:nth-child(1)", "Viviendas y promociones", "Homes and developments"],
    [".detail-highlights span:nth-child(2)", "Trabajo por fases", "Phased work"],
    [".detail-highlights span:nth-child(3)", "Protección de acabados", "Finish protection"],
    [".detail-highlights span:nth-child(4)", "Entrega lista para estrenar", "Ready-to-use handover"],
    [".detail-includes .section-kicker", "Qué incluye el servicio", "What the service includes"],
    [".detail-includes h2", "Todo lo que se hace para dejarlo listo.", "Everything done to get it ready."],
    [".detail-includes-copy p", "No es solo \"barrer y fregar\". Es una intervención por fases pensada para que el acabado de la obra se aprecie de verdad cuando entras por la puerta.", "It's not just \"sweep and mop\". It's a phased intervention so the quality of the works is really visible the moment you walk in."],
    [".detail-includes-copy .text-link", "Quiero un presupuesto cerrado", "I want a fixed quote"],
    [".detail-related-heading h2", "También te puede interesar", "You may also like"],
    [".detail-related-heading p", "Una vez la obra está limpia, hay vida después. Estos servicios encajan después de una post-obra.", "Once the build is clean, life moves on. These services fit right after a post-construction clean."],
    [".detail-proof article:nth-child(1) strong", "Análisis previo", "Initial assessment"],
    [".detail-proof article:nth-child(1) p", "Tipo de obra, materiales delicados, puntos críticos y orden de intervención antes de empezar.", "Type of works, delicate materials, critical points and order of intervention before starting."],
    [".detail-proof article:nth-child(2) strong", "Limpieza por fases", "Phased cleaning"],
    [".detail-proof article:nth-child(2) p", "Trabajo escalonado de mayor a menor: retirada de gruesos, polvo fino, cristales y acabados.", "Step-by-step work from biggest to smallest: bulk removal, fine dust, glass and finishes."],
    [".detail-proof article:nth-child(3) strong", "Entrega lista", "Ready handover"],
    [".detail-proof article:nth-child(3) p", "Espacio preparado para enseñar, fotografiar, vender, alquilar o utilizar al día siguiente.", "Space ready to show, photograph, sell, rent or use the very next day."],
    [".detail-copy .section-kicker", "Para constructoras, reformistas y propietarios", "For builders, refurbishers and owners"],
    [".detail-copy h2", "La última fase de la obra también se nota al entrar.", "The final stage of the build is also felt when you walk in."],
    [".detail-copy p:nth-of-type(2)", "La calidad percibida de una reforma se juega en los días posteriores a la entrega. Cristales con cemento, polvo en los rodapiés, marcas en grifos o juntas mal limpiadas hacen parecer que la obra no se cerró bien, aunque esté perfectamente acabada.", "How a renovation is perceived plays out in the days after handover. Glass with cement, dust on skirtings, marks on taps or poorly cleaned joints make it look like the works weren't properly closed, even if they're perfectly finished."],
    [".detail-copy p:nth-of-type(3)", "Trabajo en coordinación con el equipo de obra para entrar en el momento adecuado y dejar el inmueble como debería verse el día de la entrega.", "I coordinate with the build team to step in at the right moment and leave the property looking the way it should on handover day."],
    [".detail-steps li:nth-child(1) strong", "Evaluación del inmueble", "Property assessment"],
    [".detail-steps li:nth-child(1) span", "Estado, polvo, residuos, cristales, suelos y superficies.", "Condition, dust, residue, glass, floors and surfaces."],
    [".detail-steps li:nth-child(2) strong", "Plan de intervención", "Intervention plan"],
    [".detail-steps li:nth-child(2) span", "Priorización de zonas y protección de materiales sensibles.", "Area prioritisation and protection of sensitive materials."],
    [".detail-steps li:nth-child(3) strong", "Revisión de acabados", "Finish review"],
    [".detail-steps li:nth-child(3) span", "Control final para entregar el espacio preparado.", "Final check to hand over the prepared space."],
    [".detail-check .section-kicker", "Checklist Radiant", "Radiant checklist"],
    [".detail-check h2", "De obra terminada a espacio presentable.", "From finished works to a presentable space."],
    [".detail-check li:nth-child(1)", "Retirada de polvo fino en superficies, rincones y zonas altas.", "Fine dust removal on surfaces, corners and high areas."],
    [".detail-check li:nth-child(2)", "Atención a suelos, ventanas, marcos y acabados delicados.", "Attention to floors, windows, frames and delicate finishes."],
    [".detail-check li:nth-child(3)", "Revisión a fondo de baños, cocina y zonas de paso.", "Deep check of bathrooms, kitchen and passage areas."],
    [".detail-check li:nth-child(4)", "Limpieza final orientada a uso, venta, alquiler o estreno.", "Final clean aimed at use, sale, rental or moving in."],
    [".detail-check li:nth-child(5)", "Trabajo planificado para reducir tiempos sin perder calidad.", "Planned work to reduce time without losing quality."],
    [".detail-cta h2", "Deja el inmueble listo para enseñar con seguridad.", "Leave the property ready to show with confidence."],
    [".detail-cta .btn", "Hablar con Georgina por WhatsApp", "Talk to Georgina on WhatsApp"]
  ],
  "venta-alquiler.html": [
    [".detail-back", "Volver a servicios", "Back to services"],
    [".detail-hero .eyebrow", "Radiant Clean · Servicio especializado", "Radiant Clean · Specialist service"],
    [".detail-hero h1", "Una vivienda preparada se vende y alquila antes.", "A prepared home sells and rents faster."],
    [".detail-hero p:not(.eyebrow)", "Preparo la vivienda para que entre por los ojos desde la primera foto y desde la primera visita. Limpieza profunda, orden visual y revisión completa para que cuando alguien la vea, la sienta cuidada antes incluso de fijarse en los detalles.", "I prepare the home so it draws people in from the very first photo and the very first viewing. Deep cleaning, visual order and a full review so anyone who sees it feels it's cared for, even before noticing the details."],
    [".detail-hero .btn-primary", "Pedir presupuesto", "Request a quote"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Que la vivienda se vea cuidada, luminosa y fácil de imaginar como hogar.", "That the home feels cared for, bright and easy to picture as a home."],
    [".detail-highlights span:nth-child(1)", "Antes de fotografías", "Before photography"],
    [".detail-highlights span:nth-child(2)", "Antes de visitas", "Before viewings"],
    [".detail-highlights span:nth-child(3)", "Entrega a inquilino", "Tenant handover"],
    [".detail-highlights span:nth-child(4)", "Inmobiliarias y propietarios", "Agencies and owners"],
    [".detail-includes .section-kicker", "Qué incluye el servicio", "What the service includes"],
    [".detail-includes h2", "Lo que se prepara para que entre por los ojos.", "What I prepare so it pulls people in."],
    [".detail-includes-copy p", "No es una limpieza más: es una preparación pensada para ser vista. Cada decisión tiene un porqué visual: que la cocina parezca espaciosa, que el baño parezca nuevo, que el salón invite a quedarse.", "It's not just another clean: it's a preparation designed to be seen. Every choice has a visual reason: making the kitchen feel spacious, the bathroom feel new, the living room invite you in."],
    [".detail-includes-copy .text-link", "Pedir propuesta para tu vivienda", "Request a proposal for your home"],
    [".detail-related-heading h2", "También te puede interesar", "You may also like"],
    [".detail-related-heading p", "Si gestionas varias propiedades o vienes de una reforma, hay más servicios que pueden encajar.", "If you manage several properties or are coming out of a renovation, there are more services that may fit."],
    [".detail-proof article:nth-child(1) strong", "Primera impresión", "First impression"],
    [".detail-proof article:nth-child(1) p", "Espacios limpios, ordenados y visualmente preparados para fotos y visitas.", "Clean, ordered spaces visually prepared for photos and viewings."],
    [".detail-proof article:nth-child(2) strong", "Limpieza profunda", "Deep cleaning"],
    [".detail-proof article:nth-child(2) p", "Trabajo detallado en estancias, cocina, baños, textiles y superficies sensibles.", "Detailed work in rooms, kitchen, bathrooms, textiles and sensitive surfaces."],
    [".detail-proof article:nth-child(3) strong", "Agilidad comercial", "Commercial agility"],
    [".detail-proof article:nth-child(3) p", "Una vivienda preparada acorta plazos: se enseña antes, gusta antes y se decide antes.", "A prepared home shortens timelines: it shows sooner, appeals sooner and gets a decision sooner."],
    [".detail-copy .section-kicker", "Para inmobiliarias y propietarios", "For agencies and owners"],
    [".detail-copy h2", "Una vivienda cuidada se entiende mejor, se visita mejor y se recuerda mejor.", "A cared-for home is understood better, visited better and remembered better."],
    [".detail-copy p:nth-of-type(2)", "La mayoría de visitas se deciden en los primeros 30 segundos. En esos 30 segundos importa más cómo se siente el espacio que su tamaño o sus prestaciones. Por eso preparar la vivienda no es un lujo: es comercial.", "Most viewings are decided in the first 30 seconds. In those 30 seconds, how the space feels matters more than its size or features. That's why preparing the home isn't a luxury: it's commercial."],
    [".detail-copy p:nth-of-type(3)", "Trabajo con propietarios particulares y con inmobiliarias que quieren entregar fotos y visitas con la mejor versión posible de cada inmueble.", "I work with private owners and agencies who want to deliver photos and viewings with the best possible version of each property."],
    [".detail-steps li:nth-child(1) strong", "Revisión completa", "Complete review"],
    [".detail-steps li:nth-child(1) span", "Estado general, puntos visibles y detalles que afectan a la visita.", "General condition, visible points and details that affect the viewing."],
    [".detail-steps li:nth-child(2) strong", "Puesta a punto", "Preparation"],
    [".detail-steps li:nth-child(2) span", "Limpieza profunda orientada a presentación y confianza visual.", "Deep cleaning focused on presentation and visual trust."],
    [".detail-steps li:nth-child(3) strong", "Entrega final", "Final handover"],
    [".detail-steps li:nth-child(3) span", "Vivienda lista para enseñar, fotografiar o alquilar.", "Property ready to show, photograph or rent."],
    [".detail-check .section-kicker", "Checklist Radiant", "Radiant checklist"],
    [".detail-check h2", "Orden visual para decidir más rápido.", "Visual order for faster decisions."],
    [".detail-check li:nth-child(1)", "Limpieza profunda de estancias principales.", "Deep cleaning of main rooms."],
    [".detail-check li:nth-child(2)", "Revisión de cocina, baños y zonas de paso.", "Review of kitchen, bathrooms and passage areas."],
    [".detail-check li:nth-child(3)", "Presentación de salón, dormitorios y terraza.", "Presentation of living room, bedrooms and terrace."],
    [".detail-check li:nth-child(4)", "Cuidado de superficies, acabados y detalles finales.", "Care for surfaces, finishes and final details."],
    [".detail-check li:nth-child(5)", "Preparación específica para fotos profesionales, visitas o entrega.", "Targeted preparation for professional photos, viewings or handover."],
    [".detail-cta h2", "Haz que la vivienda entre por los ojos desde la primera visita.", "Make the home stand out from the very first viewing."],
    [".detail-cta .btn", "Hablar con Georgina por WhatsApp", "Talk to Georgina on WhatsApp"]
  ]
};

const pageTranslations = {
  "index.html": indexTranslations,
  "formacion.html": formacionTranslations,
  "como-trabajo.html": comoTrabajoTranslations,
  ...servicePageTranslations
};

const corporateCommonTranslations = [
  [".main-nav a:nth-child(5)", "Sistema Radiant", "Radiant System"],
  [".site-footer span:first-child", "Radiant Clean · Sistema profesional de calidad", "Radiant Clean · Professional quality system"],
  [".site-footer span:nth-child(2)", "Limpieza, control operativo y formación · Costa del Sol", "Cleaning, operational control and training · Costa del Sol"]
];

const corporatePageTranslations = {
  "index.html": [
    [".hero .eyebrow", "Sistema Radiant · Criterio, control y formación", "Radiant System · Expertise, control and training"],
    [".hero h1", "Te enseño qué mirar.", "I show you what to look for."],
    [".hero-copy", "Porque la diferencia entre una vivienda limpia y una vivienda preparada para recibir huéspedes está en los detalles que casi nadie revisa.", "Because the difference between a clean property and one truly ready to welcome guests lies in the details almost nobody checks."],
    [".hero .btn-primary", "Conocer el sistema", "Explore the system"],
    [".hero .btn-secondary", "Solicitar una valoración", "Request an assessment"],
    [".hero-property-label", "Vivienda preparada · Costa del Sol", "Guest-ready property · Costa del Sol"],
    [".hero-property-note > span", "La mirada Radiant", "The Radiant eye"],
    [".hero-property-note strong", "6 fases. 8 áreas. Un estándar.", "6 phases. 8 areas. One standard."],
    [".hero-property-note small", "Ver cómo se controla →", "See how it is controlled →"],
    [".trust-item:nth-child(5) small", "Estándares y puntos de control", "Standards and control points"],
    [".promise .section-kicker", "La tranquilidad de saber que todo está bajo control", "The peace of mind of knowing everything is under control"],
    [".promise h2", "La calidad no debe depender de una persona. Debe depender de un sistema.", "Quality should not depend on one person. It should depend on a system."],
    [".promise-copy p:nth-child(1)", "Radiant Clean combina ejecución profesional, procedimientos claros y verificación para que cada propiedad mantenga el nivel acordado, incluso cuando cambian los equipos o aumenta la operación.", "Radiant Clean combines professional execution, clear procedures and verification so every property maintains the agreed standard, even as teams change or operations grow."],
    [".promise-copy p:nth-child(2)", "El objetivo no es únicamente que una vivienda esté limpia. Es proteger su imagen, anticipar incidencias y asegurar una experiencia consistente para propietarios, huéspedes y visitantes.", "The goal is not merely a clean property. It is to protect its image, anticipate issues and ensure a consistent experience for owners, guests and visitors."],
    [".metrics .metric:nth-child(3) p", "Profesionales formados para aplicar un mismo estándar de trabajo y calidad.", "Professionals trained to apply the same working and quality standard."],
    [".founder .section-kicker", "El origen del sistema", "The origin of the system"],
    [".founder h2", "Dieciséis años observando lo que otros no suelen mirar.", "Sixteen years noticing what others often miss."],
    [".founder-copy > p:nth-of-type(2)", "Tras más de 16 años trabajando en el sector hotelero y de alojamientos turísticos, detecté un problema recurrente: muchas viviendas parecían limpias, pero seguían generando incidencias, malas reseñas o falta de control.", "After more than 16 years in hotels and holiday accommodation, I identified a recurring problem: many properties looked clean but still generated incidents, poor reviews or a lack of control."],
    [".founder-copy > p:nth-of-type(3)", "Con el tiempo desarrollé una metodología basada en supervisión, formación, control de calidad y estandarización de procesos. Así nació el Sistema Radiant: un método diseñado para que la calidad no dependa de una sola persona.", "Over time I developed a method based on supervision, training, quality control and process standardisation. This is how the Radiant System began: a method designed so quality does not depend on one person."],
    [".founder-note", "La experiencia es el origen. El sistema es la forma de convertirla en un estándar que puede aplicarse, enseñarse y crecer.", "Experience is the origin. The system turns it into a standard that can be applied, taught and scaled."],
    [".founder-marks span:nth-child(3)", "Metodología propia", "Proprietary methodology"],
    [".services .section-heading h2", "Servicios profesionales ejecutados bajo un mismo estándar de calidad.", "Professional services delivered under one shared quality standard."],
    [".stats .stat-card:nth-child(1) span", "años de experiencia aplicada en propiedades reales", "years of experience applied in real properties"],
    [".stats .stat-card:nth-child(2) span", "fases conectadas para controlar cada operación", "connected phases to control every operation"],
    [".stats .stat-card:nth-child(3) span", "áreas que forman el Sistema Radiant", "areas forming the Radiant System"],
    [".stats .stat-card:nth-child(4) span", "estándar compartido por todo el equipo", "shared standard across the whole team"],
    [".case-heading p", "Resultados visibles en propiedades preparadas para fotos, visitas, huéspedes o propietarios, con los puntos de control verificados antes de cerrar el servicio.", "Visible results in properties prepared for photos, viewings, guests or owners, with control points verified before the service is closed."],
    [".testimonials h2", "Clientes que ya confían en el estándar Radiant.", "Clients who already trust the Radiant standard."],
    [".testimonials-heading p", "Experiencias de propietarios, gestores y equipos que han ganado tranquilidad, orden y resultados consistentes.", "Experiences from owners, managers and teams who have gained peace of mind, order and consistent results."],
    [".testimonial:nth-child(1) blockquote", "“La diferencia está en el control. Llegan los huéspedes y la vivienda transmite cuidado desde la puerta. Para nosotros es una tranquilidad enorme.”", "“The difference is in the control. Guests arrive and the property feels cared for from the door. It gives us enormous peace of mind.”"],
    [".testimonial:nth-child(2) blockquote", "“Tenemos varios apartamentos en alta rotación y, desde que aplicamos una coordinación clara, las entregas mantienen el nivel. Las valoraciones lo notan.”", "“We have several high-turnover apartments and, since introducing clear coordination, handovers maintain the standard. The reviews show it.”"],
    [".testimonial:nth-child(3) blockquote", "“La formación Radiant nos cambió la forma de trabajar. El equipo comparte criterios y ya no tenemos que repetir las mismas instrucciones cada semana.”", "“Radiant training changed the way we work. The team shares the same criteria and we no longer repeat the same instructions every week.”"],
    [".faq h2", "Lo que conviene saber antes de empezar.", "What you should know before getting started."],
    [".faq-intro > p:not(.section-kicker)", "Si necesitas valorar una propiedad, implantar procesos o formar a un equipo, Radiant Clean estudiará el punto de partida y propondrá la modalidad adecuada.", "Whether you need a property assessment, process implementation or team training, Radiant Clean will review the starting point and recommend the right option."],
    [".faq-intro .text-link", "Consultar por WhatsApp", "Ask us on WhatsApp"],
    [".faq-item:nth-child(1) summary span:first-child", "¿En qué zonas trabaja Radiant Clean?", "Where does Radiant Clean operate?"],
    [".faq-item:nth-child(1) .faq-body", "Radiant Clean opera desde Fuengirola y cubre la Costa del Sol y alrededores. Para otras zonas se estudia cada proyecto.", "Radiant Clean operates from Fuengirola and covers the Costa del Sol and surrounding areas. Projects in other locations are assessed individually."],
    [".faq-item:nth-child(2) summary span:first-child", "¿La calidad depende de quién realice el servicio?", "Does quality depend on who performs the service?"],
    [".faq-item:nth-child(2) .faq-body", "No. El equipo trabaja con procedimientos, criterios y controles compartidos para mantener el estándar independientemente de la persona asignada.", "No. The team works with shared procedures, criteria and controls to maintain the standard regardless of who is assigned."],
    [".faq-item:nth-child(3) .faq-body", "El proceso comienza con los datos básicos de la propiedad. Después se realiza una valoración y se prepara una propuesta ajustada.", "The process begins with the property's key details. An assessment is then completed and a tailored proposal prepared."],
    [".faq-item:nth-child(4) .faq-body", "La formación principal es presencial y se realiza en una vivienda real. Se complementa con materiales profesionales y acompañamiento remoto.", "The main training is in person and takes place in a real property. It is complemented by professional materials and remote support."],
    [".faq-item:nth-child(5) .faq-body", "Las urgencias se valoran según disponibilidad y planificación. En servicios recurrentes se integran en la coordinación operativa siempre que sea posible.", "Urgent requests are assessed according to availability and planning. For recurring services they are integrated into operational coordination whenever possible."],
    [".training h2", "Radiant Academy convierte la experiencia en criterio compartido.", "Radiant Academy turns experience into shared professional judgement."],
    [".training-board-head span", "Metodología profesional", "Professional methodology"],
    [".training-steps li:nth-child(1) span", "Analizamos el equipo, las viviendas y el punto de partida de la operación.", "We assess the team, properties and operational starting point."],
    [".training-steps li:nth-child(3) span", "El sistema se aplica en una vivienda real con acompañamiento profesional.", "The system is applied in a real property with professional guidance."],
    [".training-steps li:nth-child(5) span", "El equipo recibe seguimiento durante las primeras semanas de implantación.", "The team receives follow-up support during the first weeks of implementation."],
    [".sensory-quality .section-kicker", "Calidad percibida", "Perceived quality"],
    [".sensory-copy h2", "La calidad no solo se ve. También se percibe.", "Quality is not only seen. It is also felt."],
    [".sensory-copy > p:nth-of-type(2)", "Los controles Radiant incluyen limpieza visual, presentación, orden, control del olor y sensación de frescura al entrar en la vivienda.", "Radiant checks include visual cleanliness, presentation, order, odour control and a feeling of freshness when entering the property."],
    [".sensory-copy > p:nth-of-type(3)", "La primera impresión del huésped comienza en los primeros segundos. Antes de observar cada detalle, ya ha percibido si el espacio transmite cuidado.", "A guest's first impression begins in the first few seconds. Before noticing every detail, they have already sensed whether the space feels cared for."],
    [".sensory-odor > span", "Control del olor", "Odour control"],
    [".sensory-odor > strong", "Una vivienda puede verse impecable y no sentirse preparada.", "A property can look immaculate and still not feel guest-ready."],
    [".sensory-odor > p", "Revisamos olores persistentes, humedad, textiles, baños y espacios cerrados. La frescura debe percibirse al entrar, sin perfumes que oculten una incidencia.", "We check for persistent odours, damp, textiles, bathrooms and enclosed spaces. Freshness should be noticeable on entry, without fragrances masking an issue."],
    [".sensory-signal:nth-of-type(2) strong", "Ver", "See"],
    [".sensory-signal:nth-of-type(2) small", "Acabados, orden y presentación.", "Finishes, order and presentation."],
    [".sensory-signal:nth-of-type(3) strong", "Percibir", "Feel"],
    [".sensory-signal:nth-of-type(3) small", "Frescura, armonía y sensación de bienvenida.", "Freshness, harmony and a welcoming feeling."],
    [".sensory-signal-odor strong", "Oler", "Smell"],
    [".sensory-signal-odor small", "Ausencia de olores persistentes o humedad.", "No persistent odours or damp."],
    [".quality-review h2", "Lo que revisamos antes de dar una vivienda por preparada.", "What we check before declaring a property guest-ready."],
    [".quality-review-quote", "La diferencia entre una vivienda limpia y una vivienda preparada está en los detalles.", "The difference between a clean property and a guest-ready property is in the details."],
    [".radiant-stock-home h2", "Todo lo necesario, antes de cada entrada.", "Everything needed, before every arrival."],
    [".radiant-stock-copy > p:nth-of-type(2)", "Gestionamos textiles, amenities, consumibles y material operativo para garantizar que cada vivienda disponga de todo lo necesario antes de recibir al huésped.", "We manage linen, amenities, consumables and operational supplies so every property has everything it needs before welcoming guests."],
    [".radiant-stock-copy > p:nth-of-type(3)", "Controlamos incidencias, necesidades de reposición y seguimiento de inventario para evitar imprevistos y mejorar la organización.", "We track issues, restocking needs and inventory to prevent surprises and improve organisation."],
    [".contact .section-kicker", "Valoración inicial", "Initial assessment"],
    [".contact h2", "¿Quieres saber qué está frenando la calidad de tus propiedades?", "Would you like to know what is holding back the quality of your properties?"],
    [".contact-copy > p:not(.section-kicker):not(.contact-script)", "Analizamos tu situación actual y te mostramos los puntos que más influyen en la experiencia del huésped, la operativa diaria y el control de calidad.", "We assess your current situation and show you the points that most affect the guest experience, daily operations and quality control."],
    [".contact-form button", "Solicitar valoración", "Request an assessment"],
    [".contact-script", "— Equipo Radiant Clean", "— Radiant Clean team"]
  ],
  "formacion.html": [
    [".detail-hero .eyebrow", "Radiant Academy · Formación profesional", "Radiant Academy · Professional training"],
    [".detail-hero h1", "Un equipo preparado mantiene el estándar sin improvisar.", "A prepared team maintains the standard without improvising."],
    [".detail-hero p:not(.eyebrow)", "Radiant Academy transforma experiencia real en procesos de trabajo comprensibles y aplicables para organizar equipos, controlar la calidad y conseguir resultados consistentes.", "Radiant Academy turns real experience into clear, practical working processes that organise teams, control quality and deliver consistent results."],
    [".formacion-presence-card h2", "El Sistema Radiant se aprende aplicándolo en una vivienda real.", "The Radiant System is learned by applying it in a real property."],
    [".formacion-program-lead", "La formación combina demostración, práctica y supervisión en un entorno real para trasladar el estándar a la operación diaria.", "Training combines demonstration, practice and supervision in a real setting so the standard can be applied to daily operations."],
    [".program-panel-heading p", "Del diagnóstico al seguimiento, cada bloque convierte los principios del Sistema Radiant en una rutina clara para el equipo.", "From diagnosis to follow-up, every block turns the Radiant System principles into a clear team routine."],
    [".formacion-modules li:nth-child(5) p", "El seguimiento inicial ayuda a resolver dudas, consolidar criterios y adaptar la implantación.", "Initial follow-up helps resolve questions, consolidate criteria and adapt the implementation."],
    [".formacion-method .section-kicker", "Metodología Radiant", "Radiant methodology"],
    [".formacion-method h2", "La formación convierte el conocimiento en un sistema sostenible.", "Training turns knowledge into a sustainable system."],
    [".formacion-method-copy p:nth-of-type(2)", "El Sistema Radiant nace de más de una década de experiencia en propiedades reales, coordinación de equipos y control de calidad.", "The Radiant System grew from more than a decade of experience in real properties, team coordination and quality control."],
    [".formacion-method-copy p:nth-of-type(3)", "El programa se adapta al punto de partida de cada profesional o empresa para dejar una estructura que pueda aplicarse, supervisarse y mejorar.", "The programme adapts to each professional or company's starting point, leaving a structure that can be applied, supervised and improved."],
    [".formacion-quote blockquote", "“La formación Radiant nos cambió la forma de trabajar. Antes corregíamos a diario; ahora el equipo comparte criterios y recuperamos tiempo para hacer crecer el negocio.”", "“Radiant training changed the way we work. We used to correct daily; now the team shares the same criteria and we have regained time to grow the business.”"],
    [".formacion-faq h2", "Lo que conviene saber antes de formarse.", "What you should know before training."],
    [".formacion-faq .faq-intro > p:not(.section-kicker)", "Radiant Academy estudia el tamaño del equipo, el tipo de operación y el nivel de partida para adaptar el programa.", "Radiant Academy reviews the team size, type of operation and starting level to tailor the programme."],
    [".formacion-faq .faq-intro .text-link", "Consultar por WhatsApp", "Ask us on WhatsApp"],
    [".formacion-faq .faq-item:nth-child(1) .faq-body", "Ambas opciones. El programa se adapta tanto a profesionales individuales como a equipos completos de empresas y gestoras.", "Both. The programme adapts to individual professionals as well as complete company and management teams."],
    [".formacion-faq .faq-item:nth-child(3) .faq-body", "Sí. El acompañamiento inicial permite resolver casos reales, consolidar criterios y ajustar la implantación.", "Yes. Initial support helps resolve real cases, consolidate criteria and adjust the implementation."],
    [".formacion-faq .faq-item:nth-child(4) .faq-body", "Sí, se valora cada proyecto según el desplazamiento, el equipo y la disponibilidad de una vivienda real para las prácticas.", "Yes. Each project is assessed according to travel, team size and the availability of a real property for practice."],
    [".formacion-faq .faq-item:nth-child(5) .faq-body", "Depende del tamaño del equipo y del alcance. Tras una primera conversación, Radiant Clean prepara una propuesta clara y sin compromiso.", "It depends on team size and scope. After an initial conversation, Radiant Clean prepares a clear proposal with no commitment."],
    [".detail-cta h2", "Convierte la experiencia de tu equipo en un estándar que pueda mantenerse.", "Turn your team's experience into a standard that can be maintained."],
    [".detail-cta .btn", "Solicitar información", "Request information"]
  ],
  "como-trabajo.html": [
    [".work-hero .eyebrow", "Metodología propia de Radiant Clean", "Radiant Clean proprietary methodology"],
    [".work-hero h1", "La calidad no depende de una persona. Depende de un sistema.", "Quality does not depend on one person. It depends on a system."],
    [".work-hero-copy > p:not(.eyebrow)", "El Sistema Radiant organiza la limpieza, el control operativo y la gestión de calidad para conseguir resultados consistentes, medibles y replicables.", "The Radiant System organises cleaning, operational control and quality management to achieve consistent, measurable and repeatable results."],
    [".work-hero .detail-highlights span:nth-child(1)", "Procesos definidos", "Defined processes"],
    [".work-hero .detail-highlights span:nth-child(2)", "Control verificable", "Verifiable control"],
    [".work-hero .detail-highlights span:nth-child(3)", "Equipos alineados", "Aligned teams"],
    [".work-hero .detail-highlights span:nth-child(4)", "Mejora continua", "Continuous improvement"],
    [".work-panel-label", "Promesa Radiant", "Radiant promise"],
    [".work-hero-panel strong", "La misma excelencia, independientemente de quién realice el servicio.", "The same excellence, regardless of who performs the service."],
    [".work-hero-panel li:nth-child(1)", "Estándares claros para cada propiedad.", "Clear standards for every property."],
    [".work-hero-panel li:nth-child(2)", "Responsabilidades y controles definidos.", "Defined responsibilities and controls."],
    [".work-hero-panel li:nth-child(3)", "Resultados que pueden verificarse.", "Results that can be verified."],
    [".work-principle:nth-child(1) h2", "Definir el estándar.", "Define the standard."],
    [".work-principle:nth-child(1) p", "Cada propiedad necesita criterios claros de presentación, higiene, orden y experiencia antes de comenzar.", "Every property needs clear presentation, hygiene, order and experience criteria before work begins."],
    [".work-principle:nth-child(2) h2", "Organizar la operación.", "Organise the operation."],
    [".work-principle:nth-child(2) p", "Tareas, prioridades, tiempos y responsabilidades se integran en un procedimiento comprensible para todo el equipo.", "Tasks, priorities, timings and responsibilities are integrated into a procedure the whole team can understand."],
    [".work-principle:nth-child(3) h2", "Verificar y mejorar.", "Verify and improve."],
    [".work-principle:nth-child(3) p", "Los puntos críticos se controlan, las incidencias se registran y el proceso evoluciona con cada resultado.", "Critical points are checked, issues are recorded and the process evolves with each result."],
    [".radiant-pillars .section-kicker", "Ocho áreas conectadas", "Eight connected areas"],
    [".radiant-pillars-heading h2", "Mucho más que limpieza: una estructura completa de calidad.", "Much more than cleaning: a complete quality structure."],
    [".radiant-pillars-heading > p:last-child", "El sistema reúne las áreas necesarias para ordenar una operación, formar al equipo, controlar el resultado y proteger cada propiedad a largo plazo.", "The system brings together the areas needed to organise operations, train teams, control results and protect each property over time."],
    [".radiant-pillar:nth-child(1) p", "Define la experiencia, la presentación y el estándar que debe transmitir cada propiedad.", "Defines the experience, presentation and standard every property should convey."],
    [".radiant-pillar:nth-child(2) p", "Convierte las prioridades de cada inmueble en procedimientos operativos claros.", "Turns each property's priorities into clear operational procedures."],
    [".radiant-pillar:nth-child(3) p", "Forma profesionales y equipos para trabajar bajo un mismo criterio de calidad.", "Trains professionals and teams to work under one shared quality criterion."],
    [".radiant-pillar:nth-child(4) p", "Incorpora verificaciones, seguimiento y trazabilidad para supervisar cada servicio.", "Adds checks, follow-up and traceability to supervise every service."],
    [".radiant-pillar:nth-child(5) p", "Integra prevención y conservación para reducir deterioros y costes futuros.", "Integrates prevention and care to reduce deterioration and future costs."],
    [".radiant-pillar:nth-child(6) p", "Organiza inventario, reposiciones y consumibles antes de cada llegada.", "Organises inventory, replacements and consumables before every arrival."],
    [".radiant-pillar:nth-child(7) p", "Evalúa resultados y detecta oportunidades de mejora de forma periódica.", "Evaluates results and identifies improvement opportunities periodically."],
    [".radiant-pillar:nth-child(8) p", "Desarrolla herramientas para conectar equipos, incidencias y documentación operativa.", "Develops tools to connect teams, issues and operational documentation."],
    [".work-process .section-kicker", "Cómo se implanta", "How it is implemented"],
    [".work-process h2", "Seis fases para convertir un estándar en una operación controlable.", "Six phases to turn a standard into a controllable operation."],
    [".work-process-list li:nth-child(1) strong", "Análisis de la propiedad", "Property analysis"],
    [".work-process-list li:nth-child(1) > span:not(.method-icon)", "Evaluamos la vivienda, sus necesidades, inventario y puntos críticos.", "We assess the property, its needs, inventory and critical points."],
    [".work-process-list li:nth-child(2) strong", "Organización operativa", "Operational organisation"],
    [".work-process-list li:nth-child(2) > span:not(.method-icon)", "Definimos procedimientos, materiales, tiempos y estándares.", "We define procedures, materials, timings and standards."],
    [".work-process-list li:nth-child(3) strong", "Formación práctica", "Practical training"],
    [".work-process-list li:nth-child(3) > span:not(.method-icon)", "Mostramos exactamente cómo debe realizarse cada tarea.", "We demonstrate exactly how each task should be carried out."],
    [".work-process-list li:nth-child(4) strong", "Checklist especializada", "Specialist checklist"],
    [".work-process-list li:nth-child(4) > span:not(.method-icon)", "Cada estancia tiene controles específicos y verificables.", "Every room has specific, verifiable checks."],
    [".work-process-list li:nth-child(5) strong", "Supervisión y auditoría", "Supervision and audit"],
    [".work-process-list li:nth-child(5) > span:not(.method-icon)", "Revisamos resultados y detectamos incidencias antes de la llegada del huésped.", "We review results and identify issues before the guest arrives."],
    [".work-process-list li:nth-child(6) strong", "Mejora continua", "Continuous improvement"],
    [".work-process-list li:nth-child(6) > span:not(.method-icon)", "Analizamos errores repetitivos y optimizamos constantemente el proceso.", "We analyse recurring errors and continuously optimise the process."],
    [".work-perception .section-kicker", "Un control que usa todos los sentidos", "Checks that engage every sense"],
    [".work-perception h2", "Una vivienda preparada se reconoce al entrar.", "You recognise a guest-ready property the moment you enter."],
    [".work-perception-copy > p:not(.section-kicker)", "La calidad no se limita a una superficie sin polvo. La presentación, el orden, el control del olor y la sensación de frescura forman parte de la primera impresión y se incorporan al protocolo de revisión.", "Quality is not limited to a dust-free surface. Presentation, order, odour control and a sense of freshness shape the first impression and are built into the review protocol."],
    [".work-perception-points li:nth-child(1)", "Ausencia de olores persistentes o humedad.", "No persistent odours or damp."],
    [".work-perception-points li:nth-child(2)", "Atención a textiles, baños y espacios cerrados.", "Attention to textiles, bathrooms and enclosed spaces."],
    [".work-perception-points li:nth-child(3)", "Frescura real, sin perfumes que oculten incidencias.", "Real freshness, without fragrances masking issues."],
    [".work-perception blockquote", "La limpieza se ejecuta. La experiencia se prepara.", "Cleaning is carried out. The experience is prepared."],
    [".work-stock h2", "El inventario también forma parte de la experiencia.", "Inventory is also part of the experience."],
    [".work-stock-copy > p:not(.section-kicker)", "Gestionamos textiles, amenities, consumibles y material operativo para garantizar que cada vivienda disponga de todo lo necesario antes de cada entrada.", "We manage linen, amenities, consumables and operational supplies so every property has everything it needs before each arrival."],
    [".work-route .section-kicker", "El sistema de un vistazo", "The system at a glance"],
    [".work-route-heading h2", "Cada área responde a una pregunta antes de entregar la vivienda.", "Every area answers a question before the property is handed over."],
    [".work-route-grid a:nth-child(1) span", "Fases del método", "Method phases"],
    [".work-route-grid a:nth-child(1) small", "Cómo se implanta", "How it is implemented"],
    [".work-route-grid a:nth-child(2) span", "Controles clave", "Key checks"],
    [".work-route-grid a:nth-child(2) small", "Qué se revisa", "What is checked"],
    [".work-route-grid a:nth-child(3) span", "Áreas de stock", "Stock areas"],
    [".work-route-grid a:nth-child(3) small", "Qué debe estar disponible", "What must be available"],
    [".work-route-grid a:nth-child(4) span", "Áreas conectadas", "Connected areas"],
    [".work-route-grid a:nth-child(4) small", "Cómo crece el sistema", "How the system scales"],
    [".work-process h2", "Seis fases. Un recorrido claro de principio a fin.", "Six phases. A clear journey from start to finish."],
    [".work-process .method-heading > p:last-child", "El Sistema Radiant convierte la experiencia en una secuencia que el equipo puede comprender, aplicar y verificar. Cada fase deja un resultado concreto antes de avanzar a la siguiente.", "The Radiant System turns experience into a sequence the team can understand, apply and verify. Each phase delivers a concrete result before moving to the next."],
    [".work-process-image figcaption span", "Del análisis a la entrega", "From analysis to handover"],
    [".work-process-image figcaption strong", "Nada se deja a la memoria.", "Nothing is left to memory."],
    [".work-process-list li:nth-child(1) .phase-label", "Fase 1", "Phase 1"],
    [".work-process-list li:nth-child(2) .phase-label", "Fase 2", "Phase 2"],
    [".work-process-list li:nth-child(3) .phase-label", "Fase 3", "Phase 3"],
    [".work-process-list li:nth-child(4) .phase-label", "Fase 4", "Phase 4"],
    [".work-process-list li:nth-child(5) .phase-label", "Fase 5", "Phase 5"],
    [".work-process-list li:nth-child(6) .phase-label", "Fase 6", "Phase 6"],
    [".work-process-list li:nth-child(1) .phase-result", "Resultado Diagnóstico y mapa de puntos críticos.", "Result: diagnosis and critical-point map."],
    [".work-process-list li:nth-child(2) .phase-result", "Resultado Protocolo operativo claro y compartido.", "Result: a clear, shared operational protocol."],
    [".work-process-list li:nth-child(3) .phase-result", "Resultado Equipo alineado en una vivienda real.", "Result: a team aligned in a real property."],
    [".work-process-list li:nth-child(4) .phase-result", "Resultado Control verificable estancia por estancia.", "Result: verifiable room-by-room control."],
    [".work-process-list li:nth-child(5) .phase-result", "Resultado Incidencias detectadas antes de la entrada.", "Result: issues identified before arrival."],
    [".work-process-list li:nth-child(6) .phase-result", "Resultado Un sistema más sólido con cada servicio.", "Result: a stronger system with every service."],
    [".work-process-close", "La excelencia deja de depender de quién realiza el trabajo y pasa a depender del sistema que lo respalda.", "Excellence stops depending on who performs the work and starts depending on the system behind it."],
    [".work-quality .section-kicker", "Radiant Control · Calidad verificable", "Radiant Control · Verifiable quality"],
    [".work-quality-heading h2", "Lo que revisamos antes de decir “está preparada”.", "What we check before saying ‘it is guest-ready’."],
    [".work-quality-heading > p", "Una vivienda puede parecer limpia y seguir escondiendo fallos que afectan al huésped, a la reputación de la propiedad y a la operativa diaria. El control convierte esos detalles en puntos concretos y verificables.", "A property can look clean while still hiding faults that affect guests, reputation and daily operations. Control turns those details into concrete, verifiable points."],
    [".work-quality-media-main figcaption span", "Detalle real", "Real detail"],
    [".work-quality-media-main figcaption strong", "Mirar donde casi nadie mira.", "Looking where almost nobody looks."],
    [".work-quality-media figure:nth-child(2) figcaption", "Superficies y reflejos", "Surfaces and reflections"],
    [".work-quality-media figure:nth-child(3) figcaption", "Presentación final", "Final presentation"],
    [".work-quality-list li:nth-child(1) strong", "Estado general de la vivienda", "Overall property condition"],
    [".work-quality-list li:nth-child(1) small", "Higiene, orden y presentación en todas las estancias.", "Hygiene, order and presentation in every room."],
    [".work-quality-list li:nth-child(2) strong", "Presentación de camas", "Bed presentation"],
    [".work-quality-list li:nth-child(2) small", "Textiles, simetría y sensación visual de descanso.", "Textiles, symmetry and a visual sense of rest."],
    [".work-quality-list li:nth-child(3) strong", "Brillo de griferías", "Tapware shine"],
    [".work-quality-list li:nth-child(3) small", "Marcas, cal y acabados que revelan el nivel real.", "Marks, limescale and finishes that reveal the real standard."],
    [".work-quality-list li:nth-child(4) strong", "Olor y sensación de frescura", "Odour and feeling of freshness"],
    [".work-quality-list li:nth-child(4) small", "Humedad, olores persistentes y espacios cerrados.", "Damp, persistent odours and enclosed spaces."],
    [".work-quality-list li:nth-child(5) strong", "Reposición de amenities", "Amenities replenishment"],
    [".work-quality-list li:nth-child(5) small", "Básicos completos y colocados antes de la llegada.", "Essentials complete and in place before arrival."],
    [".work-quality-list li:nth-child(6) strong", "Inventario básico", "Basic inventory"],
    [".work-quality-list li:nth-child(6) small", "Lo necesario está disponible y en condiciones de uso.", "Everything needed is available and fit for use."],
    [".work-quality-list li:nth-child(7) strong", "Elementos dañados o faltantes", "Damaged or missing items"],
    [".work-quality-list li:nth-child(7) small", "Incidencias registradas y comunicadas a tiempo.", "Issues recorded and communicated in time."],
    [".work-quality-list li:nth-child(8) strong", "Detalles que afectan al huésped", "Details that affect the guest"],
    [".work-quality-list li:nth-child(8) small", "Todo aquello que puede romper la primera impresión.", "Anything that can undermine the first impression."],
    [".work-quality-senses-copy > span", "El factor invisible", "The invisible factor"],
    [".work-quality-senses h3", "La calidad no solo se ve. También se percibe.", "Quality is not only seen. It is also felt."],
    [".work-quality-senses-copy > p", "La primera impresión comienza en los primeros segundos. Por eso el control incluye presentación, orden y olor: la vivienda debe transmitir frescura real al entrar, sin perfumes que oculten humedad o una incidencia.", "The first impression begins in the first few seconds. That is why control includes presentation, order and odour: the property should feel genuinely fresh on entry, without fragrance masking damp or an issue."],
    [".work-quality-senses li:nth-child(1) strong", "Ver", "See"],
    [".work-quality-senses li:nth-child(1) small", "Acabados, orden y presentación.", "Finishes, order and presentation."],
    [".work-quality-senses li:nth-child(2) strong", "Percibir", "Feel"],
    [".work-quality-senses li:nth-child(2) small", "Armonía y sensación de bienvenida.", "Harmony and a welcoming feeling."],
    [".work-quality-senses li:nth-child(3) strong", "Oler", "Smell"],
    [".work-quality-senses li:nth-child(3) small", "Ausencia de olores persistentes o humedad.", "No persistent odours or damp."],
    [".work-quality-senses figcaption", "Una vivienda preparada se reconoce al entrar.", "You recognise a guest-ready property the moment you enter."],
    [".work-quality-close", "La diferencia entre una vivienda limpia y una vivienda preparada está en los detalles.", "The difference between a clean property and a guest-ready property is in the details."],
    [".work-stock .section-kicker", "Radiant Stock · Control operativo", "Radiant Stock · Operational control"],
    [".work-stock-heading h2", "Todo lo necesario, antes de cada entrada.", "Everything needed, before every arrival."],
    [".work-stock-heading > p:last-child", "El stock no es una tarea secundaria. Es la garantía de que la operación puede cerrarse sin compras urgentes, faltantes ni sorpresas para el huésped.", "Stock is not a secondary task. It ensures the operation can close without urgent purchases, missing items or surprises for the guest."],
    [".work-stock-visual-label span", "Antes de abrir la puerta", "Before opening the door"],
    [".work-stock-visual-label strong", "Todo revisado. Todo disponible.", "Everything checked. Everything available."],
    [".work-stock-copy > p:nth-of-type(1)", "Gestionamos textiles, amenities, consumibles y material operativo para garantizar que cada vivienda disponga de todo lo necesario antes de recibir al huésped.", "We manage textiles, amenities, consumables and operational supplies so every property has everything it needs before welcoming the guest."],
    [".work-stock-copy > p:nth-of-type(2)", "Controlamos incidencias, necesidades de reposición y seguimiento de inventario para evitar imprevistos y mejorar la organización.", "We track issues, replenishment needs and inventory to prevent surprises and improve organisation."],
    [".work-stock-board-head span", "Ficha operativa", "Operational record"],
    [".work-stock-board-head strong", "Control previo a la llegada", "Pre-arrival control"],
    [".work-stock-board > div:nth-child(2) > span", "Textiles", "Textiles"],
    [".work-stock-board > div:nth-child(2) small", "Disponibilidad · rotación · estado", "Availability · rotation · condition"],
    [".work-stock-board > div:nth-child(2) > strong", "Verificar", "Verify"],
    [".work-stock-board > div:nth-child(3) > span", "Amenities", "Amenities"],
    [".work-stock-board > div:nth-child(3) small", "Unidades · presentación · reposición", "Units · presentation · replenishment"],
    [".work-stock-board > div:nth-child(3) > strong", "Reponer", "Replenish"],
    [".work-stock-board > div:nth-child(4) > span", "Consumibles", "Consumables"],
    [".work-stock-board > div:nth-child(4) small", "Mínimos · uso · previsión", "Minimums · usage · forecast"],
    [".work-stock-board > div:nth-child(4) > strong", "Controlar", "Control"],
    [".work-stock-board > div:nth-child(5) > span", "Material operativo", "Operational supplies"],
    [".work-stock-board > div:nth-child(5) small", "Faltantes · daños · incidencias", "Missing · damaged · issues"],
    [".work-stock-board > div:nth-child(5) > strong", "Registrar", "Record"],
    [".work-stock-cycle li:nth-child(1) strong", "Inventariar", "Inventory"],
    [".work-stock-cycle li:nth-child(1) p", "Definir qué necesita cada propiedad y en qué cantidad.", "Define what each property needs and in what quantity."],
    [".work-stock-cycle li:nth-child(2) strong", "Registrar", "Record"],
    [".work-stock-cycle li:nth-child(2) p", "Anotar consumos, faltantes, daños y necesidades reales.", "Record usage, missing items, damage and real needs."],
    [".work-stock-cycle li:nth-child(3) strong", "Reponer", "Replenish"],
    [".work-stock-cycle li:nth-child(3) p", "Anticipar compras y reposiciones antes de que falte algo.", "Anticipate purchases and replenishment before anything runs out."],
    [".work-stock-cycle li:nth-child(4) strong", "Verificar", "Verify"],
    [".work-stock-cycle li:nth-child(4) p", "Confirmar que todo está disponible antes de cada entrada.", "Confirm everything is available before every arrival."],
    [".work-stock-result span", "Resultado operativo", "Operational result"],
    [".work-stock-result strong", "Menos urgencias. Más orden. Una llegada sin imprevistos.", "Fewer emergencies. More order. An arrival without surprises."],
    ["#ecosistema-radiant .section-kicker", "El ecosistema Radiant", "The Radiant ecosystem"],
    ["#ecosistema-radiant h2", "Ocho áreas conectadas para que la calidad pueda crecer.", "Eight connected areas that allow quality to scale."],
    ["#ecosistema-radiant .radiant-pillars-heading > p:last-child", "Las seis fases ordenan la implantación. Estas ocho áreas sostienen la operación, forman al equipo, controlan el resultado y protegen cada propiedad a largo plazo.", "The six phases organise implementation. These eight areas support operations, train the team, control the result and protect each property over time."],
    [".work-supervision .section-kicker", "Un sistema diseñado para crecer", "A system designed to grow"],
    [".work-supervision h2", "Más propiedades y más equipo, sin perder el estándar.", "More properties and a larger team, without losing the standard."],
    [".work-supervision-copy p", "Radiant Clean implanta una estructura operativa que permite supervisar el servicio sin estar presente en cada intervención.", "Radiant Clean implements an operational structure that makes it possible to supervise the service without being present at every intervention."],
    [".work-supervision li:nth-child(1)", "Protocolos y responsabilidades definidos.", "Defined protocols and responsibilities."],
    [".work-supervision li:nth-child(2)", "Seguimiento de resultados e incidencias.", "Tracking of results and issues."],
    [".work-supervision li:nth-child(3)", "Formación y optimización continuas.", "Continuous training and optimisation."],
    [".detail-related-heading h2", "Tres maneras de trabajar con Radiant Clean.", "Three ways to work with Radiant Clean."],
    [".detail-related-heading p", "El sistema puede ejecutarse, implantarse o enseñarse según las necesidades de cada cliente.", "The system can be delivered, implemented or taught according to each client's needs."],
    [".related-card:nth-child(1) .related-tag", "Servicio profesional", "Professional service"],
    [".related-card:nth-child(1) strong", "Nos ocupamos de la operación", "We manage the operation"],
    [".related-card:nth-child(1) p", "Limpieza, puesta a punto, control y entrega de propiedades bajo el estándar Radiant.", "Cleaning, preparation, control and property handover under the Radiant standard."],
    [".related-card:nth-child(2) .related-tag", "Implantación", "Implementation"],
    [".related-card:nth-child(2) strong", "Ordenamos tu sistema", "We organise your system"],
    [".related-card:nth-child(2) p", "Protocolos, controles y seguimiento para propietarios, gestores y empresas.", "Protocols, controls and follow-up for owners, managers and companies."],
    [".related-card:nth-child(3) .related-tag", "Radiant Academy", "Radiant Academy"],
    [".related-card:nth-child(3) strong", "Formamos a tu equipo", "We train your team"],
    [".related-card:nth-child(3) p", "Programa práctico para aplicar un mismo estándar y desarrollar autonomía operativa.", "Practical training to apply one standard and build operational autonomy."],
    [".detail-cta h2", "¿Quieres saber qué está frenando la calidad de tus propiedades?", "Would you like to know what is holding back the quality of your properties?"],
    [".detail-cta .btn", "Solicitar una valoración", "Request an assessment"]
  ],
  "viviendas-vacacionales.html": [
    [".detail-hero p:not(.eyebrow)", "Radiant Clean coordina la limpieza, la revisión y el mantenimiento para mantener el mismo nivel temporada tras temporada.", "Radiant Clean coordinates cleaning, checks and maintenance to maintain the same standard season after season."],
    [".detail-hero .btn-primary", "Solicitar valoración", "Request an assessment"],
    [".detail-highlights span:nth-child(3)", "Equipo bajo un estándar común", "Team working to one standard"],
    [".detail-copy p:nth-of-type(2)", "El servicio no termina con la limpieza: también permite detectar deterioros, reposiciones e incidencias antes de la siguiente entrada.", "The service does not end with cleaning: it also identifies deterioration, replacements and issues before the next arrival."],
    [".detail-copy p:nth-of-type(3)", "Radiant Clean coordina calendarios, prioridades y puntos de control para que cada entrega llegue a tiempo y con un estándar homogéneo.", "Radiant Clean coordinates calendars, priorities and control points so every handover is on time and consistent."],
    [".detail-includes-copy p", "Cada entrada sigue un alcance claro y puntos de control definidos para que el propietario o gestor sepa qué esperar.", "Every arrival follows a clear scope and defined control points so the owner or manager knows what to expect."],
    [".detail-testimonial blockquote", "“Desde que trabajamos con Radiant Clean no tenemos que mirar el móvil entre entrada y entrada. Los huéspedes y las valoraciones lo notan.”", "“Since working with Radiant Clean, we no longer need to check our phones between arrivals. Guests and reviews notice the difference.”"],
    [".detail-faq .section-kicker", "Antes de empezar", "Before getting started"],
    [".detail-faq h2", "Dudas frecuentes de propietarios.", "Frequently asked questions from owners."],
    [".detail-faq .faq-intro > p:not(.section-kicker)", "Radiant Clean revisará contigo la propiedad, la rotación y las prioridades.", "Radiant Clean will review the property, turnover and priorities with you."],
    [".detail-faq .faq-intro .text-link", "Consultar por WhatsApp", "Ask us on WhatsApp"],
    [".detail-faq .faq-item:nth-child(1) summary span:first-child", "¿Cómo se gestionan las llaves y los accesos?", "How are keys and access managed?"],
    [".detail-faq .faq-item:nth-child(1) .faq-body", "El servicio puede coordinarse mediante cajas de seguridad, cerraduras inteligentes o entrega directa.", "The service can be coordinated through lockboxes, smart locks or direct key handover."],
    [".detail-faq .faq-item:nth-child(2) summary span:first-child", "¿Gestionáis consumibles y lencería?", "Do you manage consumables and linen?"],
    [".detail-faq .faq-item:nth-child(2) .faq-body", "La reposición de básicos y la rotación de textiles pueden integrarse en el servicio o con el proveedor habitual.", "Basic supplies and textile rotation can be integrated into the service or coordinated with the usual provider."],
    [".detail-faq .faq-item:nth-child(3) summary span:first-child", "¿Atendéis cambios de huésped el mismo día?", "Do you handle same-day guest turnovers?"],
    [".detail-faq .faq-item:nth-child(3) .faq-body", "Sí. Las salidas y entradas del mismo día se integran en la planificación antes del check-in.", "Yes. Same-day departures and arrivals are integrated into the plan before check-in."],
    [".detail-faq .faq-item:nth-child(4) summary span:first-child", "¿Qué ocurre si existe una incidencia?", "What happens if there is an issue?"],
    [".detail-faq .faq-item:nth-child(4) .faq-body", "La incidencia se comunica y documenta para que el propietario o gestor pueda actuar.", "The issue is communicated and documented so the owner or manager can act."],
    [".related-card:nth-child(1) .related-tag", "Servicio", "Service"],
    [".related-card:nth-child(1) strong", "Limpieza post-obra", "Post-construction cleaning"],
    [".related-card:nth-child(1) p", "Para reformas y proyectos que necesitan una vivienda preparada para estrenar.", "For renovations and projects that need a property ready for first use."],
    [".related-card:nth-child(2) .related-tag", "Servicio", "Service"],
    [".related-card:nth-child(2) strong", "Puesta a punto para venta o alquiler", "Sale or rental preparation"],
    [".related-card:nth-child(2) p", "Limpieza profunda y orden visual para visitas y fotografías.", "Deep cleaning and visual order for viewings and photography."],
    [".related-card:nth-child(3) .related-tag", "Formación", "Training"],
    [".related-card:nth-child(3) strong", "Formación para tu equipo", "Training for your team"],
    [".related-card:nth-child(3) p", "Radiant Academy forma equipos para aplicar un estándar común y verificable.", "Radiant Academy trains teams to apply a shared, verifiable standard."],
    [".detail-cta .btn", "Solicitar una propuesta", "Request a proposal"]
  ],
  "post-obra.html": [
    [".detail-hero h1", "Después de la obra, el espacio vuelve a respirar.", "After the works, the space can breathe again."],
    [".detail-hero p:not(.eyebrow)", "Una limpieza post-obra profesional es método: Radiant Clean analiza, protege materiales y retira polvo, restos y marcas hasta dejar el inmueble listo.", "Professional post-construction cleaning is about method: Radiant Clean assesses, protects materials and removes dust, residue and marks until the property is ready."],
    [".detail-copy p:nth-of-type(3)", "Radiant Clean se coordina con el equipo de obra para intervenir en el momento adecuado y preparar el inmueble para su entrega.", "Radiant Clean coordinates with the construction team to intervene at the right time and prepare the property for handover."],
    [".detail-includes-copy p", "La intervención se organiza por fases para que el acabado de la obra pueda apreciarse desde la entrega.", "The intervention is organised in phases so the quality of the finished work can be seen from handover."],
    [".detail-testimonial blockquote", "“El resultado fue excelente. La vivienda parecía recién estrenada y todo quedó preparado para la entrega.”", "“The result was excellent. The property looked brand new and everything was ready for handover.”"],
    [".detail-faq .section-kicker", "Antes de empezar", "Before getting started"],
    [".detail-faq h2", "Lo que conviene saber sobre una limpieza post-obra.", "What to know about post-construction cleaning."],
    [".detail-faq .faq-intro > p:not(.section-kicker)", "Los materiales, el estado y el plazo se valoran antes de diseñar la intervención.", "Materials, condition and timing are assessed before the intervention is designed."],
    [".detail-faq .faq-intro .text-link", "Consultar por WhatsApp", "Ask us on WhatsApp"],
    [".detail-faq .faq-item:nth-child(1) summary span:first-child", "¿Cuánto tiempo lleva una limpieza post-obra?", "How long does post-construction cleaning take?"],
    [".detail-faq .faq-item:nth-child(1) .faq-body", "Depende de la superficie, los materiales y el tipo de obra. La valoración define un plazo claro.", "It depends on size, materials and type of work. The assessment defines a clear timeframe."],
    [".detail-faq .faq-item:nth-child(2) summary span:first-child", "¿Trabajáis sobre suelos delicados?", "Do you work on delicate flooring?"],
    [".detail-faq .faq-item:nth-child(2) .faq-body", "Sí. Los productos y las técnicas se adaptan al material y se coordinan con el reformista cuando es necesario.", "Yes. Products and techniques are adapted to the material and coordinated with the contractor when necessary."],
    [".detail-faq .faq-item:nth-child(3) summary span:first-child", "¿Podéis intervenir durante la obra?", "Can you work during the construction phase?"],
    [".detail-faq .faq-item:nth-child(3) .faq-body", "Sí. Los proyectos grandes pueden incluir una limpieza intermedia y otra final coordinadas con la obra.", "Yes. Large projects can include an intermediate clean and a final clean coordinated with the works."],
    [".detail-faq .faq-item:nth-child(4) summary span:first-child", "¿Cómo se presupuesta el servicio?", "How is the service quoted?"],
    [".detail-faq .faq-item:nth-child(4) .faq-body", "El presupuesto se prepara tras la valoración, con alcance y fases definidos antes de empezar.", "The quote is prepared after assessment, with scope and phases defined before work begins."],
    [".related-card:nth-child(1) p", "Puesta a punto para fotografías, visitas y primeras impresiones.", "Preparation for photography, viewings and first impressions."],
    [".related-card:nth-child(2) p", "Operación recurrente para mantener el estándar en cada entrada.", "Recurring operations to maintain the standard at every arrival."],
    [".related-card:nth-child(3) p", "Radiant Academy forma al equipo para aplicar un proceso post-obra consistente.", "Radiant Academy trains the team to apply a consistent post-construction process."],
    [".detail-cta .btn", "Solicitar valoración", "Request an assessment"]
  ],
  "venta-alquiler.html": [
    [".detail-hero p:not(.eyebrow)", "Radiant Clean prepara cada vivienda para que transmita cuidado desde la primera foto y la primera visita, combinando limpieza profunda, orden visual y revisión completa.", "Radiant Clean prepares each property to convey care from the first photo and viewing, combining deep cleaning, visual order and a complete review."],
    [".detail-copy p:nth-of-type(3)", "El servicio está dirigido a propietarios e inmobiliarias que necesitan presentar cada inmueble en su mejor versión.", "The service is designed for owners and agencies that need to present every property at its best."],
    [".detail-includes-copy p", "La preparación combina limpieza y presentación para que cada estancia transmita amplitud, cuidado y confianza visual.", "Preparation combines cleaning and presentation so every room conveys space, care and visual confidence."],
    [".detail-testimonial blockquote", "“Cuando Radiant Clean prepara una vivienda antes de las fotos, se nota en las visitas y en la percepción del inmueble.”", "“When Radiant Clean prepares a property before photography, it shows in the viewings and in how the property is perceived.”"],
    [".detail-faq .section-kicker", "Antes de empezar", "Before getting started"],
    [".detail-faq h2", "Lo que conviene saber antes de una puesta a punto.", "What to know before property preparation."],
    [".detail-faq .faq-intro > p:not(.section-kicker)", "La fecha de fotografías, visitas o entrega se integra en la planificación desde el inicio.", "Photography, viewing or handover dates are integrated into the plan from the start."],
    [".detail-faq .faq-intro .text-link", "Consultar por WhatsApp", "Ask us on WhatsApp"],
    [".detail-faq .faq-item:nth-child(1) summary span:first-child", "¿En cuánto tiempo puede estar lista?", "How quickly can the property be ready?"],
    [".detail-faq .faq-item:nth-child(1) .faq-body", "El plazo depende del tamaño y el estado. Las fechas cerradas se incorporan a la planificación inicial.", "Timing depends on size and condition. Fixed dates are incorporated into the initial plan."],
    [".detail-faq .faq-item:nth-child(2) summary span:first-child", "¿Trabajáis con inmobiliarias?", "Do you work with real estate agencies?"],
    [".detail-faq .faq-item:nth-child(2) .faq-body", "Sí. Se pueden coordinar varias propiedades mediante un calendario y condiciones acordadas.", "Yes. Multiple properties can be coordinated through an agreed calendar and terms."],
    [".detail-faq .faq-item:nth-child(3) summary span:first-child", "¿Gestionáis la retirada de enseres?", "Do you manage item removal?"],
    [".detail-faq .faq-item:nth-child(3) .faq-body", "Puede coordinarse dentro de un proyecto conjunto de vaciado, limpieza y revisión.", "It can be coordinated within a combined removal, cleaning and review project."],
    [".detail-faq .faq-item:nth-child(4) summary span:first-child", "¿Debe estar presente el propietario?", "Does the owner need to be present?"],
    [".detail-faq .faq-item:nth-child(4) .faq-body", "No. El acceso y la entrega pueden coordinarse sin necesidad de cuadrar agendas.", "No. Access and handover can be coordinated without matching schedules."],
    [".related-card:nth-child(1) p", "Limpieza por fases para inmuebles recién reformados.", "Phased cleaning for newly renovated properties."],
    [".related-card:nth-child(2) p", "Operación recurrente para mantener el nivel temporada tras temporada.", "Recurring operations to maintain the standard season after season."],
    [".related-card:nth-child(3) p", "Radiant Academy forma equipos con un criterio de presentación compartido.", "Radiant Academy trains teams with shared presentation criteria."],
    [".detail-cta .btn", "Solicitar una propuesta", "Request a proposal"]
  ]
};

const leadingTextTranslations = [
  [".contact-form label:nth-child(1)", "Nombre", "Name"],
  [".contact-form label:nth-child(2)", "Tipo de propiedad", "Property type"],
  [".contact-form label:nth-child(3)", "Zona", "Area"],
  [".contact-form label:nth-child(4)", "Mensaje", "Message"],
  [".training-quote", "Lo difícil de este oficio no es limpiar: es enseñar a mirar. Cuando un equipo aprende a mirar, ya no necesitas estar tú detrás cada día.", "The hard part of this job isn't cleaning: it's teaching how to look. Once a team learns how to look, you no longer need to stand behind them every day."]
];

const attributeTranslations = [
  [".language-switcher", "aria-label", "Idioma", "Language"],
  [".compare-table tbody td:nth-child(2)", "data-label", "Ideal para", "Best for"],
  [".compare-table tbody td:nth-child(3)", "data-label", "Incluye", "Includes"],
  [".compare-table tbody td:nth-child(4)", "data-label", "Prioridad", "Priority"],
  [".contact-form input[name='area']", "placeholder", "Fuengirola, Málaga, Costa del Sol", "Fuengirola, Malaga, Costa del Sol"],
  [".contact-form textarea[name='message']", "placeholder", "Necesito limpieza y mantenimiento para...", "I need cleaning and maintenance for..."]
];

function currentPageKey() {
  const page = window.location.pathname.split("/").pop();
  return page && page.endsWith(".html") ? page : "index.html";
}

function translateText(selector, es, en, lang) {
  document.querySelectorAll(selector).forEach((element) => {
    if (!originalTranslationHtml.has(element)) originalTranslationHtml.set(element, element.innerHTML);
    if (lang === "en") {
      element.textContent = en;
    } else {
      element.innerHTML = originalTranslationHtml.get(element);
    }
  });
}

function translateAttribute(selector, attr, es, en, lang) {
  document.querySelectorAll(selector).forEach((element) => {
    if (!originalAttributes.has(element)) originalAttributes.set(element, new Map());
    const attributes = originalAttributes.get(element);
    if (!attributes.has(attr)) attributes.set(attr, element.getAttribute(attr));
    element.setAttribute(attr, lang === "en" ? en : attributes.get(attr) || "");
  });
}

function translateLeadingText(selector, es, en, lang) {
  document.querySelectorAll(selector).forEach((element) => {
    const textNode = Array.from(element.childNodes).find((node) => {
      return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
    });

    if (!textNode) return;

    if (!originalLeadingText.has(textNode)) originalLeadingText.set(textNode, textNode.textContent);
    if (lang !== "en") {
      textNode.textContent = originalLeadingText.get(textNode);
      return;
    }

    const match = textNode.textContent.match(/^(\s*).*?(\s*)$/s);
    const leading = match ? match[1] : "";
    const trailing = match ? match[2] : "";
    textNode.textContent = `${leading}${en}${trailing}`;
  });
}

function getStoredLanguage() {
  try {
    return localStorage.getItem("radiant-language");
  } catch (error) {
    return null;
  }
}

function storeLanguage(lang) {
  try {
    localStorage.setItem("radiant-language", lang);
  } catch (error) {
    // Storage can be unavailable in private browsing or local preview contexts.
  }
}

function wrapGeorgina(root) {
  if (!root) return;
  const skip = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION"]);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentNode;
      if (!parent || skip.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest && parent.closest(".name-georgina")) return NodeFilter.FILTER_REJECT;
      if (!/\bGeorgina\b/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  let current;
  while ((current = walker.nextNode())) nodes.push(current);

  nodes.forEach((textNode) => {
    const parts = textNode.nodeValue.split(/(\bGeorgina\b)/g);
    if (parts.length <= 1) return;
    const frag = document.createDocumentFragment();
    parts.forEach((part) => {
      if (part === "Georgina") {
        const span = document.createElement("span");
        span.className = "name-georgina";
        span.textContent = "Georgina";
        frag.appendChild(span);
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    });
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

function applyLanguage(language) {
  const lang = language === "en" ? "en" : "es";
  const pageKey = currentPageKey();

  document.documentElement.lang = lang;
  document.title = pageTitles[pageKey] ? pageTitles[pageKey][lang] : pageTitles["index.html"][lang];

  langButtons.forEach((button) => {
    const isActive = button.dataset.langSwitch === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  commonTranslations.forEach(([selector, es, en]) => translateText(selector, es, en, lang));
  (pageTranslations[pageKey] || []).forEach(([selector, es, en]) => translateText(selector, es, en, lang));
  corporateCommonTranslations.forEach(([selector, es, en]) => translateText(selector, es, en, lang));
  (corporatePageTranslations[pageKey] || []).forEach(([selector, es, en]) => translateText(selector, es, en, lang));
  leadingTextTranslations.forEach(([selector, es, en]) => translateLeadingText(selector, es, en, lang));
  attributeTranslations.forEach(([selector, attr, es, en]) => translateAttribute(selector, attr, es, en, lang));

  wrapGeorgina(document.body);

  storeLanguage(lang);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch));
});

applyLanguage(getStoredLanguage() || "es");

(function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.type = "button";
  btn.setAttribute("aria-label", "Volver arriba");
  btn.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(btn);

  const onScroll = () => {
    btn.classList.toggle("is-visible", window.scrollY > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  onScroll();
})();

(function initCookieBanner() {
  const STORAGE_KEY = "radiant-cookies-v1";
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    // Local storage may not be available; default to showing banner once per session.
  }
  if (stored === "accepted" || stored === "rejected") return;

  const isEnglish = document.documentElement.lang === "en";

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", isEnglish ? "Cookie notice" : "Aviso de cookies");

  const labelStrong = isEnglish ? "Cookies" : "Cookies";
  const labelText = isEnglish
    ? 'This site uses essential cookies to work properly. You can read our <a href="cookies.html">cookies policy</a> and <a href="privacidad.html">privacy policy</a>.'
    : 'Esta web utiliza cookies técnicas necesarias para funcionar. Puedes consultar la <a href="cookies.html">política de cookies</a> y la <a href="privacidad.html">política de privacidad</a>.';
  const acceptLabel = isEnglish ? "Accept" : "Aceptar";
  const rejectLabel = isEnglish ? "Reject" : "Rechazar";

  banner.innerHTML =
    '<div class="cookie-banner-inner">' +
    '<div class="cookie-banner-text">' +
    '<strong>' + labelStrong + '</strong>' +
    '<p>' + labelText + '</p>' +
    '</div>' +
    '<div class="cookie-banner-actions">' +
    '<button class="btn btn-primary" type="button" data-cookie-accept>' + acceptLabel + '</button>' +
    '<button class="btn btn-ghost" type="button" data-cookie-reject>' + rejectLabel + '</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(banner);

  const close = (decision) => {
    try {
      localStorage.setItem(STORAGE_KEY, decision);
    } catch (error) {
      // Ignore storage failures.
    }
    banner.classList.remove("is-visible");
    banner.classList.add("is-leaving");
    window.setTimeout(() => banner.remove(), 320);
  };

  banner.querySelector("[data-cookie-accept]").addEventListener("click", () => close("accepted"));
  banner.querySelector("[data-cookie-reject]").addEventListener("click", () => close("rejected"));

  window.requestAnimationFrame(() => banner.classList.add("is-visible"));
})();

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const property = String(formData.get("property") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const isEnglish = document.documentElement.lang === "en";

    const text = [
      isEnglish ? `Hello, my name is ${name}.` : `Hola, soy ${name}.`,
      property ? (isEnglish ? `Property type: ${property}.` : `Tipo de propiedad: ${property}.`) : "",
      area ? (isEnglish ? `Area: ${area}.` : `Zona: ${area}.`) : "",
      message ? (isEnglish ? `Message: ${message}` : `Mensaje: ${message}`) : isEnglish ? "I would like to receive information about Radiant Clean." : "Quiero recibir información sobre Radiant Clean."
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/34640932249?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  });
}

const statNums = document.querySelectorAll(".stat-num[data-count]");
if (statNums.length && "IntersectionObserver" in window) {
  const animateStat = (el) => {
    const target = Number(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach((el) => statObserver.observe(el));
}

const baStage = document.querySelector("[data-ba]");
if (baStage) {
  const handle = baStage.querySelector(".ba-handle");
  const setPosition = (percent) => {
    const clamped = Math.max(0, Math.min(100, percent));
    baStage.style.setProperty("--ba-pos", `${clamped}%`);
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  };

  const updateFromEvent = (clientX) => {
    const rect = baStage.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(percent);
  };

  let dragging = false;
  const startDrag = (event) => {
    dragging = true;
    baStage.classList.add("is-dragging");
    const point = event.touches ? event.touches[0] : event;
    updateFromEvent(point.clientX);
    event.preventDefault();
  };
  const moveDrag = (event) => {
    if (!dragging) return;
    const point = event.touches ? event.touches[0] : event;
    updateFromEvent(point.clientX);
  };
  const endDrag = () => {
    dragging = false;
    baStage.classList.remove("is-dragging");
  };

  baStage.addEventListener("mousedown", startDrag);
  baStage.addEventListener("touchstart", startDrag, { passive: false });
  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("touchmove", moveDrag, { passive: true });
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);

  handle.addEventListener("keydown", (event) => {
    const current = Number(handle.getAttribute("aria-valuenow")) || 50;
    if (event.key === "ArrowLeft") {
      setPosition(current - 4);
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      setPosition(current + 4);
      event.preventDefault();
    } else if (event.key === "Home") {
      setPosition(0);
      event.preventDefault();
    } else if (event.key === "End") {
      setPosition(100);
      event.preventDefault();
    }
  });
}

trustItems.forEach((item) => {
  item.addEventListener("click", () => {
    const service = item.getAttribute("data-service");

    trustItems.forEach((entry) => entry.classList.remove("is-active"));
    item.classList.add("is-active");

    document.querySelectorAll(".service-card.is-spotlight").forEach((card) => {
      card.classList.remove("is-spotlight");
    });

    const relatedCard = service ? document.querySelector(`[data-service-card="${service}"]`) : null;
    if (relatedCard) {
      relatedCard.classList.add("is-spotlight");
      window.setTimeout(() => relatedCard.classList.remove("is-spotlight"), 2200);
    }

    window.setTimeout(() => item.classList.remove("is-active"), 2200);
  });
});

function activateInteractiveCard(card) {
  const group = card.closest(".metrics, .operations-board, .work-checksheet, .method-list, .benefits-grid, .case-grid, .detail-proof, .detail-steps, .detail-check");
  if (group) {
    group.querySelectorAll(".is-active").forEach((entry) => {
      if (entry !== card) entry.classList.remove("is-active");
    });
  }

  card.classList.toggle("is-active");
}

interactiveCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) return;
    activateInteractiveCard(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateInteractiveCard(card);
  });
});
