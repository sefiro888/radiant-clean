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
  },
  "formacion.html": {
    es: "Formación profesional de limpieza | Radiant Clean",
    en: "Professional cleaning training | Radiant Clean"
  }
};

const commonTranslations = [
  [".skip-link", "Saltar al contenido", "Skip to content"],
  [".nav-toggle .sr-only", "Abrir menú", "Open menu"],
  [".main-nav a:nth-child(1)", "Servicios", "Services"],
  [".main-nav a:nth-child(2)", "Viviendas", "Homes"],
  [".main-nav a:nth-child(3)", "Post-obra", "Post-build"],
  [".main-nav a:nth-child(4)", "Venta/alquiler", "Sale/rental"],
  [".main-nav a:nth-child(5)", "Cómo trabajo", "How I work"],
  [".main-nav a:nth-child(6)", "Formación", "Training"],
  [".main-nav a:nth-child(7)", "Testimonios", "Testimonials"],
  [".main-nav a:nth-child(8)", "FAQ", "FAQ"],
  [".main-nav a:nth-child(9)", "Contacto", "Contact"],
  [".header-cta", "Pedir propuesta", "Request quote"],
  [".service-switcher a:nth-child(1)", "Viviendas vacacionales", "Holiday homes"],
  [".service-switcher a:nth-child(2)", "Post-obra", "Post-construction"],
  [".service-switcher a:nth-child(3)", "Venta y alquiler", "Sale and rental"],
  [".site-footer span:first-child", "Radiant Clean · Georgina Cuesta", "Radiant Clean · Georgina Cuesta"],
  [".site-footer span:last-child", "Limpieza profesional en Málaga y Costa del Sol", "Professional cleaning in Malaga and Costa del Sol"]
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
  [".portrait-note span", "Dirección personal", "Personal direction"],
  [".founder .section-kicker", "Quién está detrás", "Who is behind it"],
  [".founder h2", "Soy Georgina. Trabajo cerca, con criterio y mucho cariño por los detalles.", "I'm Georgina. I work closely, with judgement and real care for the details."],
  [".founder-copy > p:nth-of-type(2)", "Llevo años cuidando viviendas vacacionales y propiedades que necesitan estar siempre listas. Mi forma de trabajar se basa en la responsabilidad, la organización y la atención al detalle, y en estar yo presente cuando hace falta.", "I have spent years caring for holiday homes and properties that need to be always ready. My way of working is built on responsibility, organisation, attention to detail, and being there myself when it matters."],
  [".founder-copy > p:nth-of-type(3)", "Superviso cada proceso de cerca y mantengo un estándar claro: que la persona que llega a la vivienda — propietario, huésped o quien venga a verla — sienta desde el primer paso que hay alguien detrás cuidándola.", "I supervise every process closely and keep a clear standard: that whoever walks into the home — owner, guest or visitor — feels from the very first step that someone is looking after it."],
  [".founder-note", "La idea es sencilla: que puedas dejarme las llaves con confianza y saber que estoy mirando la vivienda con criterio, calma y cariño por los detalles.", "The idea is simple: you hand me the keys with confidence and know I'm looking after the home with judgement, calm and care for the details."],
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
  [".faq-intro p", "Si tienes una duda concreta que no aparece aquí, escríbeme directamente. Prefiero responderte yo a darte una respuesta automática.", "If you have a specific question that isn't here, write to me directly. I would rather answer you myself than give you an automated reply."],
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
  [".training-copy > p:nth-of-type(1)", "El gran problema de la limpieza profesional no son las manos: es la falta de formación. Equipos sin checklist, sin briefing, sin criterio para revisar lo importante.", "The big problem in professional cleaning is not the hands: it is the lack of training. Teams with no checklist, no briefing, no judgement to review what matters."],
  [".training-copy > p:nth-of-type(2)", "Después de años montando sistemas propios, formo a empresas de limpieza, equipos internos de gestores y a quien quiere arrancar su proyecto con cabeza. Te enseño mi metodología, te dejo plantillas reales y te acompaño hasta que el equipo entrega solo, sin que tengas que estar encima.", "After years building my own systems, I train cleaning companies, in-house manager teams and anyone who wants to start their project the right way. I share my methodology, give you real templates and stay close until the team delivers on its own."],
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
  [".formacion-program h2", "Cinco bloques, una forma de mirar que se queda contigo.", "Five blocks, one way of looking that stays with you."],
  [".formacion-program-copy p", "La formación es presencial, en una vivienda real, con tu equipo. Trabajamos juntas en cada módulo y te llevas todo el material en plantillas listas para usar. Después del primer bloque te acompaño a distancia durante las primeras semanas.", "Training is in person, in a real home, with your team. We work together on each module and you take away all the material as ready-to-use templates. After the first block I support you remotely during the first weeks."],
  [".formacion-meta div:nth-child(1) strong", "Modalidad", "Format"],
  [".formacion-meta div:nth-child(1) span", "Presencial in situ + acompañamiento remoto", "On-site + remote follow-up"],
  [".formacion-meta div:nth-child(2) strong", "Duración", "Duration"],
  [".formacion-meta div:nth-child(2) span", "Programa modular ajustado a tu equipo", "Modular programme tailored to your team"],
  [".formacion-meta div:nth-child(3) strong", "Material", "Material"],
  [".formacion-meta div:nth-child(3) span", "Plantillas, checklists y guion de briefing", "Templates, checklists and briefing scripts"],
  [".formacion-meta div:nth-child(4) strong", "Zona", "Area"],
  [".formacion-meta div:nth-child(4) span", "Costa del Sol · consultar otras zonas", "Costa del Sol · ask about other areas"],
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
  [".formacion-method-copy p:nth-of-type(1)", "He construido este sistema a base de años en propiedades reales: lo que funciona, lo que no, y los detalles que un equipo aprende cuando alguien se sienta a explicarlo con calma.", "I built this system over years in real properties: what works, what doesn't, and the details a team learns when someone sits down to explain it calmly."],
  [".formacion-method-copy p:nth-of-type(2)", "Te lo paso ordenado. Cada módulo tiene su plantilla, su checklist y su guion de briefing. Tu trabajo después es supervisar, no improvisar.", "I hand it over in order. Every module has its template, its checklist and its briefing script. Your job after is to supervise, not improvise."],
  [".formacion-method-copy .text-link", "Quiero conocer la metodología en una llamada", "I want to hear about the methodology on a call"],
  [".formacion-quote blockquote", "“La formación con Georgina nos cambió el chip. Antes corregíamos a diario, ahora el equipo entrega con criterio y yo recupero tiempo para hacer crecer el negocio.”", "“Georgina's training changed our mindset. We used to correct every day; now the team delivers with judgement and I get my time back to grow the business.”"],
  [".formacion-quote figcaption strong", "Lucía", "Lucía"],
  [".formacion-quote figcaption span", "Empresa de limpieza · Málaga", "Cleaning company · Malaga"],
  [".formacion-faq .section-kicker", "Antes de empezar", "Before we start"],
  [".formacion-faq h2", "Lo que la gente me suele preguntar.", "What people usually ask me."],
  [".formacion-faq .faq-intro p", "Si tu duda no aparece aquí, escríbeme directamente. Prefiero contestarte yo a darte una respuesta automática.", "If your question is not here, write to me directly. I prefer to answer you myself rather than give an automated reply."],
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
    [".detail-copy p:nth-of-type(1)", "No solo entrego una vivienda limpia: te aviso si algo se está estropeando, si un textil necesita relevo, si un huésped ha dejado una incidencia. La idea es que el inmueble dure más y se vea mejor cuanto más tiempo trabajemos juntas.", "I don't just hand over a clean home: I let you know if something is wearing out, if a textile needs replacing, or if a guest left an issue. The idea is that the property lasts longer and looks better the longer we work together."],
    [".detail-copy p:nth-of-type(2)", "Si gestionas varias propiedades, organizo todo el calendario contigo y aseguro que cada entrada llegue en su hora, sin sustos de última hora.", "If you manage several properties, I organise the whole calendar with you and make sure every handover lands on time, no last-minute surprises."],
    [".detail-steps li:nth-child(1) strong", "Planificación de entradas", "Arrival planning"],
    [".detail-steps li:nth-child(1) span", "Organización según calendario, rotación y prioridades de cada vivienda.", "Organisation by calendar, turnover and each home's priorities."],
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
    [".detail-copy p:nth-of-type(1)", "La calidad percibida de una reforma se juega en los días posteriores a la entrega. Cristales con cemento, polvo en los rodapiés, marcas en grifos o juntas mal limpiadas hacen parecer que la obra no se cerró bien, aunque esté perfectamente acabada.", "How a renovation is perceived plays out in the days after handover. Glass with cement, dust on skirtings, marks on taps or poorly cleaned joints make it look like the works weren't properly closed, even if they're perfectly finished."],
    [".detail-copy p:nth-of-type(2)", "Trabajo en coordinación con el equipo de obra para entrar en el momento adecuado y dejar el inmueble como debería verse el día de la entrega.", "I coordinate with the build team to step in at the right moment and leave the property looking the way it should on handover day."],
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
    [".detail-hero h1", "Prepara la vivienda para que apetezca quedarse.", "Prepare the home so people want to stay."],
    [".detail-hero p:not(.eyebrow)", "Limpieza profunda, orden visual y revisión completa para que una vivienda transmita cuidado, confianza y calidez desde la primera visita.", "Deep cleaning, visual order and complete review so a home communicates care, trust and warmth from the first viewing."],
    [".detail-hero .btn-primary", "Solicitar este servicio", "Request this service"],
    [".detail-hero .btn-secondary", "Ver dossier", "View dossier"],
    [".detail-hero-card span", "Objetivo", "Goal"],
    [".detail-hero-card strong", "Que la vivienda se vea cuidada, luminosa y fácil de imaginar como hogar.", "Make the home feel cared for, bright and easy to imagine as a home."],
    [".detail-proof article:nth-child(1) strong", "Primera impresión", "First impression"],
    [".detail-proof article:nth-child(1) p", "Espacios limpios, ordenados y visualmente preparados para visitas.", "Clean, ordered spaces visually prepared for viewings."],
    [".detail-proof article:nth-child(2) strong", "Limpieza profunda", "Deep cleaning"],
    [".detail-proof article:nth-child(2) p", "Trabajo detallado en estancias, baños, cocina, textiles y superficies.", "Detailed work in rooms, bathrooms, kitchen, textiles and surfaces."],
    [".detail-proof article:nth-child(3) strong", "Agilidad comercial", "Commercial agility"],
    [".detail-proof article:nth-child(3) p", "Una vivienda preparada facilita visitas, fotos, alquileres y ventas.", "A prepared home makes viewings, photos, rentals and sales easier."],
    [".detail-copy .section-kicker", "Para inmobiliarias y propietarios", "For real estate agencies and owners"],
    [".detail-copy h2", "Una vivienda cuidada se recuerda mejor porque se siente mejor.", "A cared-for home is remembered better because it feels better."],
    [".detail-copy p:not(.section-kicker)", "Radiant Clean prepara cada espacio para que transmita orden y calma desde el primer momento. Es una puesta a punto pensada para fotos, visitas o entrada de nuevos inquilinos.", "Radiant Clean prepares each space so it communicates order and calm from the first moment. It is a preparation service designed for photos, viewings or new tenants arriving."],
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
  "formacion.html": formacionTranslations,
  ...servicePageTranslations
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
