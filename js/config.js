// =====================================================================
//  CONFIGURACIÓN DE LA CRÓNICA DE QARETH
//  Todo lo que puedes cambiar sin tocar el resto del código está aquí.
// =====================================================================

const CONFIG = {
  // URL de la aplicación web de Google Apps Script (termina en /exec).
  // Mientras esté vacía, la web funciona en MODO DEMO con mediadores inventados.
  API_URL: "https://script.google.com/macros/s/AKfycbzTjPfDXgV9SMhB_ESTB41iYGFi1jOatv_yByjzvK8h2WFYMy0xh1QrUbErsFmMB1Ki/exec",

  // Panel de control (Genially) que ocupa la pestaña Mapa.
  GENIALLY_MAPA: "https://view.genially.com/6acd2c219ffe85fa445546c8",

  // Solo para la demostración «un juego de Genially por docente» (?demo=docentes).
  // Los enlaces de Alicia y Adriana son de ejemplo (en realidad apuntan a los de Ascen).
  DEMO_DOCENTES: [
    { nombre: "Ascen Robles", enlaces: {} },
    { nombre: "Alicia Moreno", enlaces: {
      "Panel": "https://view.genially.com/6acd2c219ffe85fa445546c8",
      "Semana 1": "https://view.genially.com/6a6503eab32553b0625cfd64" } },
    { nombre: "Adriana Segura", enlaces: {
      "Panel": "https://view.genially.com/6acd2c219ffe85fa445546c8" } },
  ],

  // Puntos que vale cada reto superado.
  PUNTOS_POR_RETO: 300,

  // Acuerdo de Confidencialidad («El pacto del mediador»): texto del formulario y enlace
  // al formulario con la opción «Acuerdo de Confidencialidad» ya elegida.
  ACUERDO: {
    texto: [
      "Antes de responder a la llamada, el Consejo de las Grandes Casas te informa de que este formulario recogerá algunos datos personales, como tu correo electrónico, con el único fin de registrar tu participación y realizar el seguimiento de los retos y misiones del proyecto educativo Qareth.",
      "Al completar el formulario, como participante mayor de edad, aceptas que tu seudónimo pueda aparecer en las clasificaciones, insignias y otros materiales relacionados con el desarrollo de la aventura. Los datos personales facilitados se utilizarán exclusivamente con fines académicos y docentes.",
      "Tu participación es completamente voluntaria. Si decides no responder a la llamada del Consejo, podrás alcanzar igualmente la máxima calificación de la asignatura.",
    ],
    enlace: "https://docs.google.com/forms/d/1_QgD9tH6F2-cyIJlcHl9Vila79fbH2DQYrd6_GSmVyQ/viewform?usp=pp_url&entry.1520301220=Acuerdo+de+Confidencialidad",
  },

  ENLACES: {
    // Formulario "¡Registra tus retos!" (botón dentro de cada enclave y en Sesiones)
    registro: "https://docs.google.com/forms/d/1_QgD9tH6F2-cyIJlcHl9Vila79fbH2DQYrd6_GSmVyQ/viewform",
    zoom: "",          // Enlace a la sesión de Zoom (si se pone, aparece arriba a la derecha)
  },

  PROLOGO:
    "La Heralda de Qareth ha convocado a las Grandes Casas. Como Mediadora o Mediador de Qareth, " +
    "recorrerás los ocho enclaves, revisarás lo que Ithera ha construido en cada uno y activarás, " +
    "una a una, las conexiones de la Gran Esfera Armilar.",

  // Estado de la red según las conexiones activadas (retos superados).
  RANGOS: [
    { min: 0, nombre: "Ante el arco", lema: "La Gran Esfera Armilar aún espera tu primera conexión." },
    { min: 1, nombre: "Primera huella", lema: "En algún lugar de Qareth, una primera línea ha quedado encendida." },
    { min: 3, nombre: "Red naciente", lema: "La red no guarda una única respuesta: guarda decisiones humanas." },
    { min: 5, nombre: "Red extendida", lema: "Las conexiones registran decisiones con intención." },
    { min: 7, nombre: "Ante el Juicio de Eidra", lema: "Queda un último enclave. Allí tendrás que decidir qué es justo." },
    { min: 8, nombre: "Red completa", lema: "La Gran Esfera Armilar se ha abierto. Tu huella ya forma parte de Qareth." },
  ],

  // Los 8 enclaves. x / y = posición en el mapa (en %).
  // mision = encargo que recibe el participante; huella = texto que se desbloquea al superarlo.
  // enlace (opcional) = página del Genially o material del tema.
  RETOS: [
    {
      n: 1, abre: "2026-10-12", territorio: "El mapa de las necesidades", insignia: "Cartógrafo de Qareth",
      fuerza: "Sabiduría", fuerza2: null, x: 24.5, y: 24, enlace: "sesiones.html#semana-1",
      descripcion: "Diseña una micro experiencia de aprendizaje educativa en la que la IA ayude al alumnado a comprender mejor un concepto que presenta dificultad.",
      mision: "Ithera ha trazado un mismo camino para todos. Te corresponde corregirlo: diseña una experiencia en la que la IA ayude a adaptar el aprendizaje a las necesidades del alumnado, sin sustituir las decisiones del docente.",
      huella: "Uno de sus anillos se iluminó y una línea dorada, fina como un hilo, salió de él y se perdió hacia la red de Qareth. Era la primera conexión activada.",
    },
    {
      n: 2, abre: "2026-10-26", territorio: "El Consejo de los Aprendices", insignia: "Arquitecto del Aprendizaje",
      fuerza: "Sabiduría", fuerza2: null, x: 50, y: 16, enlace: "",
      descripcion: "Diseña una actividad de aprendizaje colaborativo en la que la inteligencia artificial apoye, pero el alumnado siga investigando, decidiendo y creando.",
      mision: "Aquí Ithera lo está haciendo todo. Cambia las reglas: crea una actividad en la que el alumnado tenga que participar, colaborar y decidir por sí mismo.",
      huella: "Una segunda conexión dorada se extendió hacia la red de Qareth: no como una respuesta definitiva, sino como la huella de una decisión compartida.",
    },
    {
      n: 3, abre: "2026-11-02", territorio: "El Mercado de los Oráculos", insignia: "Intérprete de los Oráculos",
      fuerza: "Poder", fuerza2: "Equilibrio", x: 73, y: 21, enlace: "",
      descripcion: "Diseña un flujo de trabajo para una actividad educativa en el que selecciones las herramientas de IA más adecuadas para cada fase.",
      mision: "Todos los oráculos aseguran tener la mejor respuesta. Decide cuál utilizarías en cada momento de una tarea educativa y explica qué puede aportar cada uno.",
      huella: "La tercera conexión de Qareth se encendió y avanzó desde el mercado hacia la red. Parecía recordar que confiar bien no significa confiarlo todo al mismo lugar.",
    },
    {
      n: 4, abre: "2026-11-16", territorio: "La forja de los contenidos", insignia: "Guardián de la Forja",
      fuerza: "Equilibrio", fuerza2: "Sabiduría", x: 85, y: 45, enlace: "",
      descripcion: "Crea un recurso educativo visual con ayuda de la IA, eligiendo el formato que mejor responda a su propósito de aprendizaje.",
      mision: "La forja puede producir materiales en segundos, pero no todo lo que crea está listo para enseñar. Crea un recurso educativo con ayuda de la IA y mejóralo hasta que pueda utilizarse con el alumnado.",
      huella: "Lo que quedaba registrado no era la rapidez con la que se había creado la pieza, sino la decisión de no entregarla antes de revisarla.",
    },
    {
      n: 5, abre: "2026-11-30", territorio: "Las visiones de Qareth", insignia: "Forjador de Visiones",
      fuerza: "Sabiduría", fuerza2: "Poder", x: 73.5, y: 68, enlace: "",
      descripcion: "Crea un vídeo educativo con ayuda de la IA, eligiendo el formato que mejor responda a la necesidad de aprendizaje.",
      mision: "Ithera puede convertir casi cualquier idea en una visión. Diseña un vídeo educativo con ayuda de la IA, pensando primero qué quieres que aprenda el alumnado y para qué vas a utilizarlo.",
      huella: "Una quinta conexión se extendió hacia la red: una visión solo tiene sentido cuando su forma responde a lo que debe provocar en quien la recibe.",
    },
    {
      n: 6, abre: "2026-12-07", territorio: "Los senderos cambiantes", insignia: "Trazador de Senderos",
      fuerza: "Poder", fuerza2: "Sabiduría", x: 50, y: 81, enlace: "",
      descripcion: "Crea mediante vibe coding un objeto de aprendizaje interactivo que combine contenido, actividad y retroalimentación.",
      mision: "Algunos caminos parecen interactivos, pero solo permiten avanzar en una dirección. Crea un recurso en el que el alumnado tenga que actuar, tomar decisiones y recibir ayuda o feedback durante el proceso.",
      huella: "La sexta conexión no guardaba el camino recorrido, sino el hecho de que tus decisiones habían cambiado realmente lo que ocurría dentro de él.",
    },
    {
      n: 7, abre: "2027-01-11", territorio: "La cámara de las realidades", insignia: "Constructor de Realidades",
      fuerza: "Sabiduría", fuerza2: "Equilibrio", x: 26, y: 64, enlace: "",
      descripcion: "Crea un NPC educativo con IA que tenga una personalidad definida, cumpla un rol educativo y favorezca el aprendizaje a través del diálogo.",
      mision: "Aquí pueden recrearse situaciones difíciles de practicar en el aula. Diseña una experiencia en la que sea posible probar, decidir y equivocarse sin consecuencias reales.",
      huella: "Por primera vez, la conexión no registra una certeza. Registra el espacio que dejaste para que alguien pudiera pensar antes de recibir una solución.",
    },
    {
      n: 8, abre: "2027-01-25", territorio: "El juicio de Eidra", insignia: "Guardián del Equilibrio",
      fuerza: "Equilibrio", fuerza2: "Sabiduría", x: 16, y: 42.5, enlace: "",
      descripcion: "Crea con apoyo de la IA una prueba de evaluación de 10 ítems, combinando distintos tipos de preguntas y alineándolos con los objetivos de aprendizaje.",
      mision: "Ithera ha emitido un juicio que nadie ha revisado. Crea o revisa un instrumento de evaluación generado con IA y comprueba que sus criterios sean claros, justos y puedan ser supervisados por el docente.",
      huella: "La octava línea ocupa el único lugar que quedaba vacío. La red queda completa. Y la Gran Esfera Armilar se abre.",
    },
  ],

  // Centro del mapa: el Consejo de las Grandes Casas / Gran Esfera Armilar.
  CENTRO: { x: 50, y: 45 },
};

// ---------------------------------------------------------------------
//  Calendario: cada enclave (abre) y cada semana (inicio, en programacion.js)
//  se ven a partir de su fecha. Para ver cómo quedará la web otro día, añade
//  a la dirección ?hoy=2026-11-20 (se mantiene al cambiar de página; ?hoy= sin
//  fecha vuelve a hoy).
// ---------------------------------------------------------------------
const HOY = (() => {
  let fecha = null;
  try {
    const p = new URLSearchParams(location.search);
    if (p.has("hoy")) p.get("hoy") ? sessionStorage.setItem("qareth-hoy", p.get("hoy")) : sessionStorage.removeItem("qareth-hoy");
    fecha = sessionStorage.getItem("qareth-hoy");
  } catch { /* sin almacenamiento */ }
  const d = fecha ? new Date(fecha + "T12:00:00") : new Date();
  return isNaN(d) ? new Date() : d;
})();
const abierto = (fecha) => !fecha || new Date(fecha + "T00:00:00") <= HOY;
