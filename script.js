const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const header = document.querySelector("[data-header]");
const contactForm = document.querySelector("[data-contact-form]");
const trustItems = document.querySelectorAll(".trust-item");
const langButtons = document.querySelectorAll("[data-lang-switch]");

document.querySelectorAll(".detail-proof article, .detail-steps li, .detail-check li").forEach((item) => {
  item.classList.add("live-card");
  item.setAttribute("tabindex", "0");
});

const interactiveCards = document.querySelectorAll(".live-card, .ops-item");

const pageTitles = {
  "index.html": {
    es: "Radiant Clean | Limpieza profesional en Costa del Sol",
    en: "Radiant Clean | Professional cleaning in Costa del Sol"
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
  }
};

const commonTranslations = [
  [".skip-link", "Saltar al contenido", "Skip to content"],
  [".nav-toggle .sr-only", "Abrir menú", "Open menu"],
  [".main-nav a:nth-child(1)", "Servicios", "Services"],
  [".main-nav a:nth-child(2)", "Viviendas", "Homes"],
  [".main-nav a:nth-child(3)", "Post-obra", "Post-build"],
  [".main-nav a:nth-child(4)", "Venta/alquiler", "Sale/rental"],
  [".main-nav a:nth-child(5)", "Sistema", "System"],
  [".main-nav a:nth-child(6)", "Resultados", "Results"],
  [".main-nav a:nth-child(7)", "Reels", "Reels"],
  [".main-nav a:nth-child(8)", "Contacto", "Contact"],
  [".header-cta", "Pedir propuesta", "Request quote"],
  [".service-switcher a:nth-child(1)", "Viviendas vacacionales", "Holiday homes"],
  [".service-switcher a:nth-child(2)", "Post-obra", "Post-construction"],
  [".service-switcher a:nth-child(3)", "Venta y alquiler", "Sale and rental"],
  [".site-footer span:first-child", "Radiant Clean · Georgina Cuesta", "Radiant Clean · Georgina Cuesta"],
  [".site-footer span:last-child", "Limpieza profesional en Málaga y Costa del Sol", "Professional cleaning in Malaga and Costa del Sol"]
];

const indexTranslations = [
  [".hero .eyebrow", "Radiant Clean · Georgina Cuesta", "Radiant Clean · Georgina Cuesta"],
  [".hero h1", "Espacios listos para impresionar. Operativa bajo control.", "Spaces ready to impress. Operations under control."],
  [".hero-copy", "Limpieza, mantenimiento y supervisión profesional para viviendas vacacionales, complejos turísticos y propiedades que no pueden permitirse una mala primera impresión.", "Professional cleaning, maintenance and supervision for holiday homes, tourist complexes and properties that cannot afford a poor first impression."],
  [".hero .btn-primary", "Solicitar propuesta", "Request a proposal"],
  [".hero .btn-secondary", "Ver dossier", "View dossier"],
  [".hero-tags a:nth-child(1)", "Viviendas vacacionales", "Holiday homes"],
  [".hero-tags a:nth-child(2)", "Post-obra", "Post-construction"],
  [".hero-tags a:nth-child(3)", "Venta y alquiler", "Sale and rental"],
  [".showcase-caption span", "Radiant Standard", "Radiant Standard"],
  [".showcase-caption strong", "Listo antes de cada entrada", "Ready before every arrival"],
  [".showcase-card-top strong", "Supervisión directa", "Direct supervision"],
  [".showcase-card-top span", "Equipo formado, procesos claros y revisión final.", "Trained team, clear processes and final review."],
  [".showcase-card-bottom strong", "Fuengirola · Málaga", "Fuengirola · Malaga"],
  [".showcase-card-bottom span", "Costa del Sol y alrededores.", "Costa del Sol and nearby areas."],
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
  [".promise h2", "La limpieza deja de ser una preocupación cuando existe un sistema detrás.", "Cleaning stops being a concern when there is a system behind it."],
  [".promise-copy p:nth-child(1)", "Radiant Clean trabaja para propietarios, gestores e inmobiliarias que necesitan viviendas impecables, entregas puntuales y un estándar constante incluso en temporadas de alta rotación.", "Radiant Clean works for owners, managers and real estate agencies that need spotless homes, punctual handovers and a consistent standard even during high-turnover seasons."],
  [".promise-copy p:nth-child(2)", "No se trata solo de limpiar lo visible: se trata de conservar el inmueble, detectar detalles, cuidar materiales y hacer que cada entrada transmita orden, calidad y confianza.", "It is not only about cleaning what is visible: it is about preserving the property, spotting details, caring for materials and making every arrival feel ordered, high quality and trustworthy."],
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
  [".portrait-note span", "Dirección personal", "Personal direction"],
  [".founder .section-kicker", "Quién está detrás", "Who is behind it"],
  [".founder h2", "Una forma de trabajar cercana, exigente y orientada al detalle.", "A close, demanding and detail-led way of working."],
  [".founder-copy > p:nth-of-type(2)", "Georgina Cuesta dirige Radiant Clean con una idea clara: que el propietario pueda delegar con tranquilidad y que cada vivienda mantenga un estándar alto sin depender de improvisaciones.", "Georgina Cuesta leads Radiant Clean with a clear idea: owners should be able to delegate calmly while every property keeps a high standard without improvisation."],
  [".founder-copy > p:nth-of-type(3)", "La organización, la responsabilidad y la supervisión directa son la base de un servicio pensado para propiedades que necesitan estar siempre listas.", "Organisation, responsibility and direct supervision are the foundation of a service designed for properties that must always be ready."],
  [".founder-marks span:nth-child(1)", "+16 años de experiencia", "+16 years of experience"],
  [".founder-marks span:nth-child(2)", "Málaga y alrededores", "Malaga and nearby areas"],
  [".founder-marks span:nth-child(3)", "Equipo cualificado", "Qualified team"],
  [".services .section-kicker", "Servicios", "Services"],
  [".services .section-heading h2", "Cuatro líneas de servicio para propiedades que deben estar impecables.", "Four service lines for properties that need to be impeccable."],
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
  [".operations .section-kicker", "Sistema Radiant", "Radiant System"],
  [".operations h2", "Lo que se revisa cuando nadie mira es lo que marca la diferencia.", "What gets checked when nobody is watching is what makes the difference."],
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
  [".method .section-kicker", "Método de trabajo", "Work method"],
  [".method h2", "Del primer contacto a la entrega impecable.", "From first contact to impeccable handover."],
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
  [".results h2", "Más tranquilidad para quien gestiona. Mejor experiencia para quien entra.", "More peace of mind for managers. A better experience for those arriving."],
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
  [".contact .section-kicker", "Datos de contacto", "Contact details"],
  [".contact h2", "Organización y excelencia en las mejores manos.", "Organisation and excellence in the best hands."],
  [".contact-copy > p:not(.section-kicker)", "Cuéntale a Georgina qué tipo de propiedad gestionas, la zona y el volumen de trabajo. Preparará una propuesta ajustada a tus necesidades reales.", "Tell Georgina what type of property you manage, the area and the volume of work. She will prepare a proposal adapted to your real needs."],
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

const servicePageTranslations = {
  "viviendas-vacacionales.html": [
    [".detail-back", "Volver a servicios", "Back to services"],
    [".detail-hero .eyebrow", "Radiant Clean · Servicio especializado", "Radiant Clean · Specialist service"],
    [".detail-hero h1", "Viviendas vacacionales siempre listas para la próxima entrada.", "Holiday homes always ready for the next arrival."],
    [".detail-hero p:not(.eyebrow)", "Limpieza, revisión y mantenimiento continuo para propiedades turísticas que necesitan estar impecables, conservarse bien y generar una primera impresión excelente.", "Cleaning, checks and ongoing maintenance for tourist properties that need to be spotless, well preserved and ready to make an excellent first impression."],
    [".detail-hero .btn-primary", "Solicitar este servicio", "Request this service"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Que cada huésped entre en una vivienda cuidada, ordenada y preparada.", "Every guest enters a cared-for, ordered and prepared home."],
    [".detail-proof article:nth-child(1) strong", "Entrada impecable", "Impeccable arrival"],
    [".detail-proof article:nth-child(1) p", "Camas, cocina, baño, terraza y zonas comunes revisadas antes de recibir.", "Beds, kitchen, bathroom, terrace and shared areas checked before welcoming guests."],
    [".detail-proof article:nth-child(2) strong", "Mantenimiento real", "Real maintenance"],
    [".detail-proof article:nth-child(2) p", "Atención a detalles que ayudan a conservar materiales y evitar deterioros.", "Attention to details that help preserve materials and prevent wear."],
    [".detail-proof article:nth-child(3) strong", "Estándar constante", "Consistent standard"],
    [".detail-proof article:nth-child(3) p", "La vivienda mantiene el mismo nivel incluso en semanas de alta rotación.", "The home keeps the same level even during high-turnover weeks."],
    [".detail-copy .section-kicker", "Para propietarios y gestores", "For owners and managers"],
    [".detail-copy h2", "Delegar la limpieza sin perder el control del estado de la vivienda.", "Delegate cleaning without losing control of the property's condition."],
    [".detail-copy p:not(.section-kicker)", "Radiant Clean revisa la vivienda con criterio profesional: no solo lo visible, también esos puntos que afectan a la experiencia del huésped y a la conservación del inmueble.", "Radiant Clean checks each home with professional judgement: not only what is visible, but also the points that affect the guest experience and the property's preservation."],
    [".detail-steps li:nth-child(1) strong", "Planificación de entradas", "Arrival planning"],
    [".detail-steps li:nth-child(1) span", "Organización según calendario, rotación y prioridades.", "Organisation by calendar, turnover and priorities."],
    [".detail-steps li:nth-child(2) strong", "Limpieza completa", "Complete cleaning"],
    [".detail-steps li:nth-child(2) span", "Trabajo ordenado en estancias, cocina, baño, textiles y exterior.", "Orderly work in rooms, kitchen, bathroom, textiles and outdoor areas."],
    [".detail-steps li:nth-child(3) strong", "Revisión final", "Final review"],
    [".detail-steps li:nth-child(3) span", "Control de presentación antes de entregar la vivienda.", "Presentation check before handing over the home."],
    [".detail-check .section-kicker", "Checklist Radiant", "Radiant checklist"],
    [".detail-check h2", "Detalles que elevan la valoración.", "Details that raise the rating."],
    [".detail-check li:nth-child(1)", "Presentación de dormitorios y zonas de descanso.", "Presentation of bedrooms and rest areas."],
    [".detail-check li:nth-child(2)", "Cocina limpia, ordenada y lista para uso.", "Kitchen clean, ordered and ready to use."],
    [".detail-check li:nth-child(3)", "Baños revisados con atención a superficies y acabados.", "Bathrooms checked with attention to surfaces and finishes."],
    [".detail-check li:nth-child(4)", "Terrazas y espacios exteriores preparados.", "Terraces and outdoor spaces prepared."],
    [".detail-check li:nth-child(5)", "Aviso de incidencias visibles para actuar a tiempo.", "Visible issues reported so action can be taken in time."],
    [".detail-cta h2", "Convierte cada entrada en una experiencia cuidada.", "Turn every arrival into a cared-for experience."],
    [".detail-cta .btn", "Hablar por WhatsApp", "Talk on WhatsApp"]
  ],
  "post-obra.html": [
    [".detail-back", "Volver a servicios", "Back to services"],
    [".detail-hero .eyebrow", "Radiant Clean · Servicio especializado", "Radiant Clean · Specialist service"],
    [".detail-hero h1", "Limpieza post-obra con método, detalle y visión global.", "Post-construction cleaning with method, detail and global vision."],
    [".detail-hero p:not(.eyebrow)", "Un servicio pensado para dejar viviendas y proyectos preparados para su uso, venta o alquiler después de una obra, reforma o intervención.", "A service designed to leave homes and projects ready for use, sale or rental after construction, renovation or works."],
    [".detail-hero .btn-primary", "Solicitar este servicio", "Request this service"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Eliminar residuos de obra cuidando superficies, materiales y acabados finales.", "Remove construction residue while caring for surfaces, materials and final finishes."],
    [".detail-proof article:nth-child(1) strong", "Análisis previo", "Initial assessment"],
    [".detail-proof article:nth-child(1) p", "Tipo de obra, materiales, necesidades del proyecto y puntos delicados.", "Type of works, materials, project needs and delicate points."],
    [".detail-proof article:nth-child(2) strong", "Limpieza técnica", "Technical cleaning"],
    [".detail-proof article:nth-child(2) p", "Trabajo por fases para retirar polvo, restos y marcas sin comprometer acabados.", "Phased work to remove dust, residue and marks without compromising finishes."],
    [".detail-proof article:nth-child(3) strong", "Entrega lista", "Ready handover"],
    [".detail-proof article:nth-child(3) p", "Espacio preparado para enseñar, alquilar, vender o utilizar.", "Space prepared to show, rent, sell or use."],
    [".detail-copy .section-kicker", "Después de la obra", "After the works"],
    [".detail-copy h2", "El acabado final influye directamente en cómo se percibe el inmueble.", "The final finish directly influences how the property is perceived."],
    [".detail-copy p:not(.section-kicker)", "La limpieza post-obra exige orden, experiencia y atención. Radiant Clean trabaja con una revisión previa para entender el espacio y organizar una intervención eficaz.", "Post-construction cleaning requires order, experience and attention. Radiant Clean begins with a review to understand the space and organise an effective intervention."],
    [".detail-steps li:nth-child(1) strong", "Evaluación del inmueble", "Property assessment"],
    [".detail-steps li:nth-child(1) span", "Estado, polvo, residuos, cristales, suelos y superficies.", "Condition, dust, residue, glass, floors and surfaces."],
    [".detail-steps li:nth-child(2) strong", "Plan de intervención", "Intervention plan"],
    [".detail-steps li:nth-child(2) span", "Priorización de zonas y protección de materiales sensibles.", "Area prioritisation and protection of sensitive materials."],
    [".detail-steps li:nth-child(3) strong", "Revisión de acabados", "Finish review"],
    [".detail-steps li:nth-child(3) span", "Control final para entregar el espacio preparado.", "Final check to hand over the prepared space."],
    [".detail-check .section-kicker", "Checklist Radiant", "Radiant checklist"],
    [".detail-check h2", "De obra terminada a espacio presentable.", "From finished works to a presentable space."],
    [".detail-check li:nth-child(1)", "Retirada de polvo fino en superficies y rincones.", "Removal of fine dust on surfaces and corners."],
    [".detail-check li:nth-child(2)", "Atención a suelos, ventanas, marcos y acabados.", "Attention to floors, windows, frames and finishes."],
    [".detail-check li:nth-child(3)", "Revisión de baños, cocina y zonas de paso.", "Review of bathrooms, kitchen and passage areas."],
    [".detail-check li:nth-child(4)", "Limpieza final orientada a uso, venta o alquiler.", "Final cleaning focused on use, sale or rental."],
    [".detail-check li:nth-child(5)", "Trabajo planificado para reducir tiempos sin perder calidad.", "Planned work to reduce time without losing quality."],
    [".detail-cta h2", "Deja el inmueble listo para enseñar con seguridad.", "Leave the property ready to show with confidence."],
    [".detail-cta .btn", "Hablar por WhatsApp", "Talk on WhatsApp"]
  ],
  "venta-alquiler.html": [
    [".detail-back", "Volver a servicios", "Back to services"],
    [".detail-hero .eyebrow", "Radiant Clean · Servicio especializado", "Radiant Clean · Specialist service"],
    [".detail-hero h1", "Puesta a punto para vender o alquilar con mejor primera impresión.", "Preparation for sale or rental with a stronger first impression."],
    [".detail-hero p:not(.eyebrow)", "Limpieza profunda, orden visual y revisión completa para que una vivienda transmita cuidado, confianza y calidad desde la primera visita.", "Deep cleaning, visual order and complete review so a home communicates care, trust and quality from the first visit."],
    [".detail-hero .btn-primary", "Solicitar este servicio", "Request this service"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Que la vivienda se perciba cuidada, luminosa, ordenada y lista para decidir.", "Make the home feel cared for, bright, ordered and ready for a decision."],
    [".detail-proof article:nth-child(1) strong", "Primera impresión", "First impression"],
    [".detail-proof article:nth-child(1) p", "Espacios limpios, ordenados y visualmente preparados para visitas.", "Clean, ordered spaces visually prepared for viewings."],
    [".detail-proof article:nth-child(2) strong", "Limpieza profunda", "Deep cleaning"],
    [".detail-proof article:nth-child(2) p", "Trabajo detallado en estancias, baños, cocina, textiles y superficies.", "Detailed work in rooms, bathrooms, kitchen, textiles and surfaces."],
    [".detail-proof article:nth-child(3) strong", "Agilidad comercial", "Commercial agility"],
    [".detail-proof article:nth-child(3) p", "Una vivienda preparada facilita visitas, fotos, alquileres y ventas.", "A prepared home makes viewings, photos, rentals and sales easier."],
    [".detail-copy .section-kicker", "Para inmobiliarias y propietarios", "For real estate agencies and owners"],
    [".detail-copy h2", "Una vivienda cuidada se entiende mejor, se visita mejor y se recuerda mejor.", "A cared-for home is understood better, viewed better and remembered better."],
    [".detail-copy p:not(.section-kicker)", "Radiant Clean prepara cada espacio para que transmita orden desde el primer momento. El servicio está pensado para mejorar la presentación antes de fotos, visitas o entrada de nuevos inquilinos.", "Radiant Clean prepares each space so it communicates order from the first moment. The service is designed to improve presentation before photos, viewings or new tenants arriving."],
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
    [".detail-check li:nth-child(5)", "Preparación para visitas, fotos, venta o alquiler.", "Preparation for viewings, photos, sale or rental."],
    [".detail-cta h2", "Haz que la vivienda entre por los ojos desde la primera visita.", "Make the home stand out from the first viewing."],
    [".detail-cta .btn", "Hablar por WhatsApp", "Talk on WhatsApp"]
  ]
};

const pageTranslations = {
  "index.html": indexTranslations,
  ...servicePageTranslations
};

const leadingTextTranslations = [
  [".contact-form label:nth-child(1)", "Nombre", "Name"],
  [".contact-form label:nth-child(2)", "Tipo de propiedad", "Property type"],
  [".contact-form label:nth-child(3)", "Zona", "Area"],
  [".contact-form label:nth-child(4)", "Mensaje", "Message"]
];

const attributeTranslations = [
  [".language-switcher", "aria-label", "Idioma", "Language"],
  [".contact-form input[name='area']", "placeholder", "Fuengirola, Málaga, Costa del Sol", "Fuengirola, Malaga, Costa del Sol"],
  [".contact-form textarea[name='message']", "placeholder", "Necesito limpieza y mantenimiento para...", "I need cleaning and maintenance for..."]
];

function currentPageKey() {
  const page = window.location.pathname.split("/").pop();
  return page && page.endsWith(".html") ? page : "index.html";
}

function translateText(selector, es, en, lang) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = lang === "en" ? en : es;
  });
}

function translateAttribute(selector, attr, es, en, lang) {
  document.querySelectorAll(selector).forEach((element) => {
    element.setAttribute(attr, lang === "en" ? en : es);
  });
}

function translateLeadingText(selector, es, en, lang) {
  document.querySelectorAll(selector).forEach((element) => {
    const textNode = Array.from(element.childNodes).find((node) => {
      return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
    });

    if (!textNode) return;

    const match = textNode.textContent.match(/^(\s*).*?(\s*)$/s);
    const leading = match ? match[1] : "";
    const trailing = match ? match[2] : "";
    textNode.textContent = `${leading}${lang === "en" ? en : es}${trailing}`;
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
  leadingTextTranslations.forEach(([selector, es, en]) => translateLeadingText(selector, es, en, lang));
  attributeTranslations.forEach(([selector, attr, es, en]) => translateAttribute(selector, attr, es, en, lang));

  storeLanguage(lang);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch));
});

applyLanguage(getStoredLanguage() || "es");

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
      isEnglish ? `Hello Georgina, my name is ${name}.` : `Hola Georgina, soy ${name}.`,
      property ? (isEnglish ? `Property type: ${property}.` : `Tipo de propiedad: ${property}.`) : "",
      area ? (isEnglish ? `Area: ${area}.` : `Zona: ${area}.`) : "",
      message ? (isEnglish ? `Message: ${message}` : `Mensaje: ${message}`) : isEnglish ? "I would like to receive information about Radiant Clean." : "Quiero recibir información sobre Radiant Clean."
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/34640932249?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
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
  const group = card.closest(".metrics, .operations-board, .method-list, .benefits-grid, .detail-proof, .detail-steps, .detail-check");
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
