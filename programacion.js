// =====================================================================
//  PROGRAMACIÓN SEMANAL (según el PGA2)
//  tema = número de tema / enclave del mapa (null en la semana de repaso)
// =====================================================================

const BLOQUES = [
  {
    n: 1, titulo: "Diseño instruccional y metodologías activas con IA", semanas: "Semanas 1–2",
    aprender: [
      "Analizar cómo la IA puede apoyar el diseño instruccional y la planificación educativa.",
      "Diseñar secuencias didácticas con metodologías activas asistidas por inteligencia artificial.",
    ],
  },
  {
    n: 2, titulo: "Creación de recursos educativos multimedia e interactivos con IA", semanas: "Semanas 3–12",
    aprender: [
      "Utilizar herramientas y plataformas de IA para la creación de contenidos educativos.",
      "Diseñar recursos multimedia, audiovisuales interactivos e inmersivos con apoyo de inteligencia artificial.",
    ],
  },
  {
    n: 3, titulo: "Evaluación educativa automatizada con IA", semanas: "Semanas 13–15",
    aprender: [
      "Aplicar herramientas de IA para automatizar procesos de evaluación educativa.",
      "Diseñar instrumentos de evaluación y retroalimentación asistidos por inteligencia artificial.",
    ],
  },
];

const TEMAS = {
  1: {
    titulo: "Optimización de entornos de aprendizaje y diseño instruccional con inteligencia artificial",
    apartados: ["1.1. Introducción y objetivos", "1.2. Inteligencia artificial y optimización de entornos de aprendizaje", "1.3. Aplicación de la inteligencia artificial al diseño instruccional"],
  },
  2: {
    titulo: "Diseño de secuencias didácticas con metodologías activas asistidas por inteligencia artificial",
    apartados: ["2.1. Introducción y objetivos", "2.2. Aprendizaje basado en proyectos y problemas con apoyo de la inteligencia artificial", "2.3. Aprendizaje colaborativo y co-creación mediados por IA", "2.4. Aplicaciones de inteligencia artificial en el diseño de secuencias didácticas"],
  },
  3: {
    titulo: "Plataformas y modelos de IA aplicados a la educación",
    apartados: ["3.1. Introducción y objetivos", "3.2. Plataformas de inteligencia artificial en la educación", "3.2.1. Google y el ecosistema Google Workspace con IA", "3.2.2. Microsoft: Copilot 365 y entornos educativos", "3.2.3. OpenAI y el uso de ChatGPT en el diseño instruccional", "3.2.4. Claude: modelo de lenguaje con enfoque ético y educativo", "3.2.5. Perplexity: IA conversacional con búsqueda referenciada"],
  },
  4: {
    titulo: "Creación de contenidos multimedia con inteligencia artificial",
    apartados: ["4.1. Introducción y objetivos", "4.2. Creación de contenido textual con IA", "4.3. Creación de contenido visual con IA: imagen, infografías, presentaciones", "4.4. Creación de contenidos de audio con inteligencia artificial"],
  },
  5: {
    titulo: "El vídeo como recurso educativo generado con inteligencia artificial",
    apartados: ["5.1. Introducción y objetivos", "5.2. El vídeo como recurso educativo", "5.3. Diseño de un vídeo educativo creado con inteligencia artificial", "5.4. Herramientas de IA para la creación de vídeos educativos"],
  },
  6: {
    titulo: "Diseño de objetos de aprendizaje interactivos",
    apartados: ["6.1. Introducción y objetivos", "6.2. Principios del diseño instruccional aplicados a objetos de aprendizaje interactivos con IA", "6.3. Proceso de diseño de objetos de aprendizaje interactivos con inteligencia artificial", "6.4. Uso de la IA en la creación y adaptación de objetos de aprendizaje"],
  },
  7: {
    titulo: "Realidad aumentada y simulaciones con IA",
    apartados: ["7.1. Introducción y objetivos", "7.2. Integración de IA en experiencias aumentadas", "7.3. Agentes impulsados por IA para entornos de realidad virtual", "7.4. Simulaciones educativas inteligentes para el desarrollo de competencias"],
  },
  8: {
    titulo: "Evaluación educativa automatizada con inteligencia artificial",
    apartados: ["8.1. Introducción y objetivos", "8.2. Generación automática de instrumentos de evaluación", "8.3. Retroalimentación inteligente asistida por IA", "8.4. Ética, equidad y transparencia en la aplicación de IA en la evaluación"],
  },
};

// clases: [número, minutos, tipo, texto]
const SEMANAS = [
  { n: 1, inicio: "2026-10-12", bloque: 1, tema: 1, clases: [[1, 60, "", "Presentación de la asignatura"], [2, 60, "Problema", "¿Qué papel debe asumir el docente ante la incorporación de herramientas de inteligencia artificial en el proceso de enseñanza-aprendizaje?"]] },
  { n: 2, inicio: "2026-10-26", bloque: 1, tema: 2, clases: [[3, 60, "Problema", "¿Cómo integrar herramientas de inteligencia artificial en actividades de aula manteniendo un aprendizaje activo y participativo?"]] },
  { n: 3, inicio: "2026-11-02", bloque: 2, tema: 3, clases: [[4, 60, "Problema", "¿Qué criterios debe tener en cuenta un docente para seleccionar una herramienta de IA adecuada para su contexto educativo?"], [5, 120, "", "Taller práctico virtual"]] },
  { n: 4, inicio: "2026-11-09", bloque: 2, tema: 3, continuacion: true, clases: [[6, 60, "Problema", "¿Qué aspectos debemos revisar antes de utilizar contenidos educativos generados con inteligencia artificial en el aula?"], [7, 60, "", "Presentación de la Actividad 1"]] },
  { n: 5, inicio: "2026-11-16", bloque: 2, tema: 4, clases: [[8, 60, "Problema", "¿Cómo puede ayudarnos la IA en la creación y organización de materiales educativos?"]] },
  { n: 6, inicio: "2026-11-23", bloque: 2, tema: 4, continuacion: true, apartados: ["4.1. Introducción y objetivos", "4.2. Creación de contenido textual con IA", "4.3. Creación de contenido visual con IA: imagen, infografías, presentaciones"], clases: [[9, 60, "Problema", "¿Qué elementos debe tener un recurso educativo creado con IA para resultar claro, útil y motivador?"]] },
  { n: 7, inicio: "2026-11-30", bloque: 2, tema: 5, clases: [[10, 60, "Problema", "¿Cómo diseñar vídeos educativos apoyados por IA que favorezcan la comprensión de los contenidos?"], [11, 60, "", "Presentación de la Actividad 2"]] },
  { n: 8, inicio: "2026-12-07", bloque: 2, tema: 6, apartados: ["6.1. Introducción y objetivos", "6.2. Principios del diseño instruccional aplicados a objetos de aprendizaje interactivos con IA"], clases: [[12, 60, "Problema", "¿Cómo crear recursos interactivos con IA adaptados a diferentes ritmos y necesidades de aprendizaje?"]] },
  { n: 9, inicio: "2026-12-14", bloque: 2, tema: 6, continuacion: true, clases: [[13, 60, "Problema", "¿Qué aspectos deben revisarse antes de incorporar un objeto de aprendizaje generado con IA a una propuesta didáctica?"]] },
  { n: 10, inicio: "2027-01-04", bloque: 2, tema: 6, continuacion: true, clases: [[14, 60, "Problema", "¿Cómo integrar interactividad, accesibilidad y objetivos didácticos en un recurso creado con inteligencia artificial?"], [15, 120, "", "Taller práctico virtual"]] },
  { n: 11, inicio: "2027-01-11", bloque: 2, tema: 7, clases: [[16, 60, "Problema", "¿Qué posibilidades educativas ofrecen la realidad aumentada y las simulaciones apoyadas por IA?"], [17, 60, "", "Presentación de la Actividad 3"]] },
  { n: 12, inicio: "2027-01-18", bloque: 2, tema: 7, continuacion: true, clases: [[18, 60, "Problema", "¿Cómo incorporar asistentes virtuales y simulaciones inteligentes en experiencias de aprendizaje significativas?"], [19, 60, "", "Explicación del modelo de examen"]] },
  { n: 13, inicio: "2027-01-25", bloque: 3, tema: 8, clases: [[20, 60, "Problema", "¿Cómo puede la inteligencia artificial contribuir a una evaluación más personalizada y adaptada a las necesidades del alumnado?"]] },
  { n: 14, inicio: "2027-02-01", bloque: 3, tema: 8, continuacion: true, clases: [[21, 60, "Problema", "¿Qué límites éticos deben considerarse al utilizar inteligencia artificial en la evaluación educativa?"], [22, 120, "", "Taller práctico virtual"]] },
  { n: 15, inicio: "2027-02-08", bloque: 3, tema: null, titulo: "Semana de repaso", clases: [[23, 60, "", "Sesión de repaso"]] },
];

// Genially embebidos.
// La presentación de la asignatura ocupa la pestaña Presentación.
const GENIALLY_PRESENTACION = "https://view.genially.com/6aca651579b283199f78ee66";
// El de cada semana ocupa su pestaña (mientras falte, se ve la diapositiva de la semana). Ejemplo:
//   3: "https://view.genially.com/xxxxxxxx",
const GENIALLY_SEMANA = {
  1: "https://view.genially.com/6a6503eab32553b0625cfd64",
  2: "https://view.genially.com/6a8f0f554405b72ddafd85eb",
};

// Genially de cada actividad (pestañas de la página Actividades). Ejemplo:
//   2: "https://view.genially.com/xxxxxxxx",
const GENIALLY_ACTIVIDAD = {
  1: "https://view.genially.com/6ac7634530ed4e7225fa906a",
};

const ACTIVIDADES = [
  { n: 1, puntos: "4 puntos", presentacion: 4, clase: 7, entrega: 6 },
  { n: 2, puntos: "4,5 puntos", presentacion: 7, clase: 11, entrega: 9 },
  { n: 3, puntos: "5 puntos", presentacion: 11, clase: 17, entrega: 13 },
];
