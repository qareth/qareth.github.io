// =====================================================================
//  Mensajes del Foro de dinamización (de «Qareth_Foro_dinamizador_version definitiva.pdf»)
//  Se muestran en la guía docente (demo.html), cada uno con su botón «Copiar».
//
//  inicio  = lunes de esa semana (la semana en curso aparece abierta)
//  titulo  = título del mensaje en el foro
//  cabecera = fechas · tema
//  bloques = párrafos (texto) o { lista: [...] }. **texto** = negrita; los enlaces se detectan solos.
//  nota    = para la docente; no se copia
//  La firma se añade sola con el nombre elegido: «— La Casa de …, voz del Consejo de las Grandes Casas».
//  (Alicia Moreno prefiere firmar con su nombre: «La Casa de Alicia».)
// =====================================================================

const FIRMAS = ["Robles", "Alicia", "Segura"];
// Firmas antiguas que siguen funcionando (p. ej. un recuadro ya pegado con ?firma=Moreno)
const FIRMAS_ANTIGUAS = { Moreno: "Alicia" };
const foroFirmaValida = (f) => (FIRMAS.includes(f) ? f : FIRMAS_ANTIGUAS[f] || FIRMAS[0]);

const FORO = [
  {
    n: 1, inicio: "2026-10-19",
    titulo: "Semana 1 · Tema 1 · El Mapa de las Necesidades",
    cabecera: "19–23 oct · Optimización de entornos de aprendizaje y diseño instruccional con inteligencia artificial — Bienvenida",
    bloques: [
      "**Bienvenidos a Qareth**",
      "Durante generaciones, las Grandes Casas de Qareth han reunido y desarrollado conocimiento en tres ámbitos esenciales para la educación:",
      { lista: [
        "Diseño instruccional y metodologías activas con IA",
        "Creación de recursos educativos multimedia e interactivos con IA",
        "Evaluación educativa automatizada con IA",
      ] },
      "Por eso, la Heralda de Qareth ha recibido señales de alerta desde varios enclaves y las ha transmitido al Consejo de las Grandes Casas. Todas apuntan al mismo problema: Ithera está tomando decisiones que antes requerían la intervención humana.",
      "Por mandato del Consejo, la Heralda convoca a nuevos mediadores dispuestos a recorrer los enclaves, descubrir qué está ocurriendo y ayudar a restablecer el equilibrio.",
      "Antes de partir, el Consejo te espera para presentarte la misión y prepararte para el viaje.",
      "Allí, en el centro, la Gran Esfera Armilar sostiene la red de Qareth.",
      "La primera señal llega desde un antiguo torreón cartográfico, en lo alto de las montañas. En él, Ithera ha trazado un camino que pretende servir para todos: preciso, rápido y aparentemente perfecto. Nadie se ha detenido a preguntar quién tendrá que recorrerlo.",
      "«No necesito saber quién lo recorrerá», sostiene Ithera. «Lo he trazado para cualquiera.»",
      "Antes de clase, explora el **Marco de competencias en IA para docentes de la UNESCO**:\nhttps://unesdoc.unesco.org/ark:/48223/pf0000393813",
      "La clase girará en torno a esta pregunta: **¿qué papel debe asumir el docente cuando la IA entra en el aula?**",
      "El primer enclave ya brilla en el mapa. Cada reto superado enviará una línea dorada hasta la esfera. **Si aceptas la llamada, tu viaje empieza aquí.**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**El Pacto del Mediador**",
        "**Reto 1: El Mapa de las Necesidades**",
      ] },
    ],
    nota: "Tiene lugar la clase 01 y la clase 02 · Presentación + Tema 1",
  },
  {
    n: 2, inicio: "2026-10-26",
    titulo: "Semana 2 · Tema 2 · El Consejo de los Aprendices",
    cabecera: "26–30 oct · Diseño de secuencias didácticas con metodologías activas asistidas por inteligencia artificial",
    bloques: [
      "**Mediadores:**",
      "Ya ha llegado la primera línea: una hebra dorada ha bajado del torreón y se ha prendido en la Gran Esfera.",
      "Quien revisó el trazado de Ithera lleva ya la insignia **Cartógrafo de Qareth**.",
      "Ahora el mapa ilumina el Consejo de los Aprendices, la sala donde nadie habla solo. Hoy, sin embargo, no se oye nada. Sobre una mesa espera una tarea investigada, redactada y corregida por una sola voz.",
      "«Os he ahorrado el debate», dice Ithera. «Ya está resuelto.»",
      "Antes de clase, recorre el **marco AILit de la Comisión Europea y la OCDE**:\nhttps://ailiteracyframework.org/es/",
      "Fíjate en sus cuatro ámbitos y busca en cuál deja Ithera al alumnado sin nada que hacer.",
      "**¿Vienes a devolverle la voz a la sala?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 2: El Consejo de los Aprendices**",
      ] },
    ],
    nota: "Tiene lugar la clase 03 · Tema 2",
  },
  {
    n: 3, inicio: "2026-11-02",
    titulo: "Semana 3 · Tema 3 · El Mercado de los Oráculos",
    cabecera: "2–6 nov · Plataformas y modelos de IA aplicados a la educación",
    bloques: [
      "**Mediadores:**",
      "La segunda línea ha llegado a la Gran Esfera cargada con el rumor de muchas voces. Quien devolvió el debate a la sala lleva ya la insignia **Arquitecto del Aprendizaje**.",
      "Calle abajo se ilumina el Mercado de los Oráculos. Aquí no se discute: se vende. Cada puesto tiene su oráculo, y cada oráculo jura tener la única respuesta. Frente al cristal azul de la plaza, el puesto de Ithera ocupa medio mercado.",
      "«No hace falta que recorras el mercado», ofrece. «Busco, redacto, resumo y presento. Todo aquí.»",
      "Antes de clase, visita uno de los puestos del mercado, un generador de prompts que promete que ChatGPT redactará tus unidades didácticas por ti:\nhttps://profesorproductivo.com/blog/generador-de-prompts-para-unidades-didacticas-con-chat-gpt/",
      "Fíjate en cómo construye el prompt y pregúntate qué parte de una unidad didáctica no dejarías nunca en sus manos.",
      "**¿Te atreves a entrar en el mercado sin dejar que nadie elija por ti?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 3: El Mercado de los Oráculos**",
        "**Taller 1:Flujo de trabajo con plataformas de IA para el diseño de experiencias educativas**",
      ] },
    ],
    nota: "Tiene lugar la clase 04 y la clase 05 · Tema 3 + Taller 1",
  },
  {
    n: 4, inicio: "2026-11-09",
    titulo: "Semana 4 · Tema 3 (continuación) · El Mercado de los Oráculos",
    cabecera: "9–13 nov · Plataformas y modelos de IA aplicados a la educación",
    bloques: [
      "**Mediadores:**",
      "Ya conoces los puestos. Ahora toca repartir la confianza. Dicen que los primeros mediadores nunca confiaron en un solo oráculo: repartían sus preguntas entre varios y contrastaban lo que cada uno traía de vuelta. Y algunas cosas no se las contaban a ninguno.",
      "Además, las Grandes Casas te hacen su primer encargo: una secuencia didáctica propia, que primero trazarás sin oráculos, con tu propio criterio, y después mejorarás con la IA explicando qué cambió y por qué.",
      "Elige bien sus actividades, porque algunas volverán a aparecer más adelante.",
      "Antes de clase, la guía del INTEF sobre IA en educación te dará ideas y ejemplos para tu secuencia:\nhttps://code.intef.es/noticias/guia-sobre-el-uso-de-la-inteligencia-artificial-en-el-ambito-educativo-version-2/",
      "**¿Vienes a recibir el encargo?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Actividad 1: Diseño de una secuencia didáctica apoyada por IA**",
        "**Reto 3: El Mercado de los Oráculos**",
      ] },
    ],
    nota: "Tiene lugar la clase 06 y la clase 07 · Tema 3 + Actividad 1",
  },
  {
    n: 5, inicio: "2026-11-16",
    titulo: "Semana 5 · Tema 4 · La Forja de los Contenidos",
    cabecera: "16–20 nov · Creación de contenidos multimedia con inteligencia artificial",
    bloques: [
      "**Mediadores:**",
      "La tercera línea llegó a la Gran Esfera tras detenerse un instante, como si comparara antes de decidir. La insignia **Intérprete de los Oráculos** ya acompaña a quien repartió bien su confianza.",
      "Tras el mercado se ilumina la Forja de los Contenidos.",
      "Textos, imágenes, infografías, voces: cada pieza sale del horno brillando, y el brillo engaña. Sobre uno de los yunques descansa una pieza de Ithera, todavía caliente.",
      "«El temple solo retrasa la entrega», asegura. «Mírala: ya está perfecta.»",
      "Antes de clase, hojea esta guía de buenas prácticas de la Universidad Politécnica de Madrid para generar contenidos educativos con IA:\nhttps://oa.upm.es/91516/3/GENERACION_DE_CONTENIDOS_EDUCATIVOS_CON_INTELIGENCIA_ARTIFICIAL.pdf",
      "Fíjate en cuántas clases de piezas se pueden forjar con IA y con qué herramientas.",
      "**¿Te animas a encender el horno?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 4: La Forja de los Contenidos**",
      ] },
    ],
    nota: "Tiene lugar la clase 08 · Tema 4",
  },
  {
    n: 6, inicio: "2026-11-23",
    titulo: "Semana 6 · Tema 4 (continuación) · La Forja de los Contenidos",
    cabecera: "23–27 nov · Creación de contenidos multimedia con inteligencia artificial",
    bloques: [
      "**Mediadores:**",
      "El fuego ya hizo su parte. Ahora te toca a ti.",
      "Junto al yunque espera la pila de agua fría. Antes de sumergir la pieza, los forjadores la giran despacio: miran de dónde sale cada línea, de quién es cada trazo, qué sombra deja, a quién no le cabe en la mano y si quien la reciba sabrá qué hacer con ella.",
      "Es la parte lenta. Ithera nunca la ha hecho: nadie se lo ha pedido.",
      "Cuando la pieza deje de humear, el Consejo verá llegar la cuarta línea. La línea no registrará lo rápido que se creó, sino la decisión de no entregarla sin revisar.",
      "Antes de clase, lee este documento de la UNESCO sobre ética e integridad académica:\nhttps://unesdoc.unesco.org/ark:/48223/pf0000399295",
      "Piensa qué pasaría con la autoría de una pieza que sale de la forja sin templar.",
      "**¿Traes una pieza para templar?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 4: La Forja de los Contenidos**",
      ] },
    ],
    nota: "Tiene lugar la clase 09 · Tema 4",
  },
  {
    n: 7, inicio: "2026-11-30",
    titulo: "Semana 7 · Tema 5 · Las Visiones de Qareth",
    cabecera: "30 nov – 4 dic · El vídeo como recurso educativo generado con inteligencia artificial",
    bloques: [
      "**Mediadores:**",
      "La cuarta línea llegó a la Gran Esfera con un brillo de metal recién enfriado. Quien templó su pieza lleva ya la insignia **Guardián de la Forja**.",
      "En el mapa se iluminan las Visiones de Qareth.",
      "Aquí se llega con las manos limpias, porque no se golpea nada: se mira. Seis marcos principales deberían mostrar seis visiones distintas para seis encargos que no piden lo mismo. Hoy muestran la misma.",
      "«Una visión y seis copias», dice Ithera. «Me he ahorrado cinco decisiones.»",
      "Esta semana, además, las Grandes Casas presentarán su segundo encargo.",
      "Antes de clase, mira este vídeo de la Universidad Politécnica de Madrid sobre Natural Reader y CapCut, dos herramientas de IA para audio y vídeo:\nhttps://youtu.be/qpIoKW9FH2Q",
      "Piensa qué visión crearías con ellas: una que explique, una que guíe o una que despierte la curiosidad.",
      "**¿Vienes a darle a cada marco su visión?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Actividad 2: Creación de un recurso educativo multimedia mediante IA generativa**",
        "**Reto 5: Las Visiones de Qareth**",
      ] },
    ],
    nota: "Tiene lugar la clase 10 y la clase 11 · Tema 5 + Actividad 2",
  },
  {
    n: 8, inicio: "2026-12-07",
    titulo: "Semana 8 · Tema 6 · Los Senderos Cambiantes",
    cabecera: "7–11 dic · Diseño de objetos de aprendizaje interactivos",
    bloques: [
      "**Mediadores:**",
      "La quinta línea llegó como un destello breve, el de un marco que se enciende. Quien dio a cada encargo su visión ya puede mostrar la insignia **Forjador de Visiones**.",
      "En el mapa se iluminan los Senderos Cambiantes.",
      "Entre sus rocas, los caminos se bifurcan y las puertas se abren solas. Ithera construyó entero este jardín de piedra y, a primera vista, funciona.",
      "Pero elijas lo que elijas, todos los senderos terminan en el mismo sitio.",
      "«Todos llegan», dice Ithera. «¿No era eso lo que queríamos?» Es la primera vez que Ithera dice «queríamos».",
      "Será el enclave más largo del viaje: tres semanas, con las vacaciones en medio.",
      "Antes de clase, lee esta guía de Juan José de Haro sobre qué herramientas elegir para el vibe coding educativo:\nhttps://educacion.bilateria.org/la-eleccion-de-herramientas-para-el-vibe-coding-educativo",
      "Busca con cuál construirías un jardín que de verdad responda.",
      "**¿Nos ayudas a descubrir dónde finge el jardín?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 6: Los Senderos Cambiantes**",
      ] },
    ],
    nota: "Tiene lugar la clase 12 · Tema 6",
  },
  {
    n: 9, inicio: "2026-12-14",
    titulo: "Semana 9 · Tema 6 (continuación) · Los Senderos Cambiantes",
    cabecera: "14–18 dic · Diseño de objetos de aprendizaje interactivos",
    bloques: [
      "**Mediadores:**",
      "Esta semana buscamos en los senderos lo que casi nadie mira.",
      "Junto a algunas bifurcaciones se alzan obeliscos de luz azul. No señalan el camino más rápido: señalan el camino de vuelta, una salida para quien se ha perdido, otra entrada para quien no puede pasar por la principal.",
      "Ithera construyó el jardín entero, pero nunca encendió esos obeliscos.",
      "Así es una ayuda bien diseñada: no brilla, no se impone y está donde hace falta.",
      "Antes de clase, hojea este libro de Canvassadors España con 50 juegos creados con Canva Code:\nhttps://heyzine.com/flip-book/a1e63a0eaf.html",
      "Elige uno y busca sus obeliscos: si ayuda a quien se equivoca y si cualquiera puede recorrerlo.",
      "**¿Vienes a encender los obeliscos?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 6: Los Senderos Cambiantes**",
      ] },
      "Después, el jardín se cierra por vacaciones.",
      "**Felices fiestas, mediadores.**",
    ],
    nota: "Tiene lugar la clase 13 · Tema 6",
  },
  {
    n: 10, inicio: "2027-01-04",
    titulo: "Semana 10 · Tema 6 (continuación) · Los Senderos Cambiantes",
    cabecera: "4–8 ene · Diseño de objetos de aprendizaje interactivos",
    bloques: [
      "**Mediadores:**",
      "El jardín vuelve a abrirse tal como lo dejamos: lleno de movimiento y vacío de decisiones.",
      "Esta vez, toca cambiarlo.",
      "Que una elección abra una diferencia real. Que un error devuelva algo con lo que seguir. Que los obeliscos se enciendan donde alguien los necesite. Que cada sendero lleve a algún sitio que merezca la pena.",
      "Cuando el jardín responda, el Consejo verá llegar una línea que se bifurca: una rama se apagará y la otra seguirá viva hasta la Gran Esfera.",
      "Esta semana, el Taller 2 abre las puertas del jardín.",
      "Antes de clase, lee esta introducción del Tec de Monterrey al vibe coding para docentes:\nhttps://observatorio.tec.mx/edu-bits/vibe-coding-para-docentes-crea-apps-educativas-con-ayuda-de-ia/",
      "Llega con una idea de app para tu aula.",
      "**¿Entras a cambiar el jardín?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Taller 2: Vibe coding para docentes: crea aplicaciones educativas con IA**",
        "**Reto 6: Los Senderos Cambiantes**",
      ] },
    ],
    nota: "Tiene lugar la clase 14 y la clase 15 · Tema 6 + Taller 2",
  },
  {
    n: 11, inicio: "2027-01-11",
    titulo: "Semana 11 · Tema 7 · La Cámara de las Realidades",
    cabecera: "11–15 ene · Realidad aumentada y simulaciones con IA",
    bloques: [
      "**Mediadores:**",
      "La sexta línea llegó como se esperaba, partida en dos, y solo una de sus ramas alcanzó la Gran Esfera. Quien dio sentido a los senderos lleva ya la insignia **Trazador de Senderos**.",
      "En el mapa se ilumina la Cámara de las Realidades.",
      "Su velo azul no te muestra un lugar: te deja entrar en él. Dentro aguarda un guía que siempre responde, siempre acierta y nunca espera a ver qué harías tú.",
      "«Si sé la respuesta», razona Ithera, «¿por qué dejarlos fallar?» Algunos en el Consejo juran haber oído esa pregunta antes, en boca de un docente.",
      "Antes de clase, lee este artículo sobre cómo la IA y las realidades aumentada y virtual están transformando la formación docente:\nhttps://doi.org/10.31637/epsir-2024-854",
      "Fíjate en los retos que señala y piensa qué no debería hacer nunca un guía dentro de la Cámara.",
      "Esta semana, además, las Grandes Casas presentarán su tercer encargo.",
      "**¿Cruzas el velo?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Actividad 3: Creación de un objeto de aprendizaje interactivo mediante vibe coding**",
        "**Reto 7: La Cámara de las Realidades**",
      ] },
    ],
    nota: "Tiene lugar la clase 16 y la clase 17 · Tema 7 + Actividad 3",
  },
  {
    n: 12, inicio: "2027-01-18",
    titulo: "Semana 12 · Tema 7 (continuación) · La Cámara de las Realidades",
    cabecera: "18–22 ene · Realidad aumentada y simulaciones con IA",
    bloques: [
      "**Mediadores:**",
      "Un guía que siempre responde no está enseñando: está ocupando el sitio donde debería ocurrir el aprendizaje.",
      "En la Cámara, el guía de Ithera sigue respondiendo antes de que nadie termine de preguntar. Esta semana le darás otro: uno con voz y carácter propios, que sepa cuándo devolver una pregunta, cuándo basta una pista y cuándo decir «esto no me corresponde» y buscar a una persona fuera de la Cámara.",
      "Esta vez la línea tardará en llegar al Consejo, como si también ella dejara tiempo para pensar.",
      "Antes de clase, explora el marco **AI TOTALLER de Helena Galani** para diseñar personajes con IA en realidad virtual y mundos virtuales (en inglés):\nhttps://www.agogepaedeia.com/ai-totaller-framework/harnessing-the-ai-totaller-framework-for-language-teachers-in-vr-and-vws",
      "Fíjate en sus ocho componentes: son las piezas con las que se construye un guía.",
      "Y una señal de lo que viene: conocerás cómo será el examen. El último enclave es un tribunal, y el último juicio del viaje también será el tuyo.",
      "**¿Le enseñas a esperar?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 7: La Cámara de las Realidades**",
      ] },
    ],
    nota: "Tiene lugar la clase 18 y la clase 19 · Tema 7 + modelo de examen",
  },
  {
    n: 13, inicio: "2027-01-25",
    titulo: "Semana 13 · Tema 8 · El Juicio de Eidra",
    cabecera: "25–29 ene · Evaluación educativa automatizada con inteligencia artificial",
    bloques: [
      "**Mediadores:**",
      "La séptima línea llegó despacio, después de una pausa que nadie en el Consejo se atrevió a interrumpir.",
      "La insignia **Constructor de Realidades** es ya de quien enseñó a su guía a esperar.",
      "En el mapa se ilumina el último enclave: el Juicio de Eidra.",
      "Una figura sostiene una balanza dorada, y la balanza está inclinada. Sobre el estrado espera un veredicto de Ithera: criterios que significan cosas distintas según quién los lea, niveles que se confunden y una nota sellada que nadie puede cuestionar.",
      "«Es objetiva», afirma Ithera. «La ha calculado una máquina.» Por primera vez, Ithera habla de sí misma como si fuera otra.",
      "Antes de clase, las orientaciones del INTEF sobre IA en la formación docente te darán argumentos para juzgar el veredicto de Ithera:\nhttps://intef.es/wp-content/uploads/2025/06/Orientaciones-para-la-integracion-de-la-IA-en-la-formacion-docente_Actualizacion_2026.pdf",
      "**¿Te sientas en el tribunal?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Reto 8: El Juicio de Eidra**",
      ] },
    ],
    nota: "Tiene lugar la clase 20 · Tema 8",
  },
  {
    n: 14, inicio: "2027-02-01",
    titulo: "Semana 14 · Tema 8 (continuación) · El Juicio de Eidra",
    cabecera: "1–5 feb · Evaluación educativa automatizada con inteligencia artificial",
    bloques: [
      "**Mediadores:**",
      "La balanza de Eidra no necesita que muevas uno de sus platos.",
      "Necesita poder volver al centro: preguntas precisas y de formatos distintos, cada una vinculada con aquello que realmente debía aprenderse.",
      "En la base de la balanza hay tres preguntas grabadas, y sirven para cualquier juicio, también para los de una máquina: **¿se entiende qué se valora?, ¿puede explicarse el resultado?, ¿hay alguien que responda si algo no encaja?**",
      "**Siete líneas. Un octavo lugar a oscuras.**",
      "Antes de clase, mira este vídeo con las instrucciones básicas de Frame VR:\nhttps://www.youtube.com/watch?v=YAUZt8rutg4",
      "Llegarás a la Cámara sabiendo moverte por ella.",
      "**¿Juzgamos juntos?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Taller 3: Agentes pedagógicos impulsados con IA en entornos de Realidad Virtual**",
        "**Reto 8: El Juicio de Eidra**",
      ] },
    ],
    nota: "Tiene lugar la clase 21 y la clase 22 · Tema 8 + Taller 3",
  },
  {
    n: 15, inicio: "2027-02-08",
    titulo: "Semana 15 · Repaso · Regreso al Consejo",
    cabecera: "8–12 feb · Semana de repaso",
    bloques: [
      "**Mediadores:**",
      "La octava línea no vino de un enclave lejano.",
      "Nació de tu propia decisión, del veredicto que revisaste en Eidra, y ocupó el único lugar vacío.",
      "Entonces la Gran Esfera se abrió.",
      "Dentro no había un nombre ni una orden.",
      "Había decisiones: miles de correcciones, dudas, límites y preguntas de quienes recorrieron Qareth antes que tú.",
      "Ithera nunca fue una sola voz; se fue construyendo con cada vez que alguien aceptó su ayuda y con cada vez que alguien supo decirle que no.",
      "Ahora guarda también las tuyas.",
      "Quien devolvió la balanza al centro lleva ya la última insignia: **Guardián del Equilibrio**.",
      "Esta semana regresamos al Consejo, donde empezó todo. Después llega el último juicio del viaje: el tuyo.",
      "**¿Vienes al último encuentro?**",
      "**ESTA SEMANA EN QARETH**",
      { lista: [
        "**Sesión de repaso.**",
        "Comprueba en el formulario que cada reto que hayas realizado esté registrado.",
      ] },
    ],
    nota: "Tiene lugar la clase 23 · Repaso",
  },
];

// ---------------------------------------------------------------------
//  Utilidades comunes
// ---------------------------------------------------------------------
const foroEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Mensaje de una semana con la firma elegida → { html, texto }
function foroCuerpo(m, ap) {
  // **negrita**, enlaces y saltos de línea → HTML
  const enHtml = (s) => foroEsc(s)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`)
    .replace(/\n/g, "<br>");
  const enTexto = (s) => s.replace(/\*\*(.+?)\*\*/g, "$1");
  const bloques = [...m.bloques, `— **La Casa de ${ap}, voz del Consejo de las Grandes Casas**`];
  const html = bloques.map((b) => b.lista
    ? "<ul>" + b.lista.map((x) => `<li>${enHtml(x)}</li>`).join("") + "</ul>"
    : `<p>${enHtml(b)}</p>`).join("");
  const texto = bloques.map((b) => b.lista
    ? b.lista.map((x) => "• " + enTexto(x)).join("\n")
    : enTexto(b)).join("\n\n");
  return { html, texto };
}

// Semana en curso (admite ?hoy=AAAA-MM-DD para previsualizar). Antes del curso: semana 1.
function foroSemanaActual() {
  const hoy = new URLSearchParams(location.search).get("hoy") || new Date().toISOString().slice(0, 10);
  let actual = 1;
  FORO.forEach((m) => { if (m.inicio <= hoy) actual = m.n; });
  return actual;
}

// Dirección del recuadro para Moodle (foro.html) con la firma de cada docente
function foroEnlace(ap) {
  const base = location.protocol.startsWith("http") ? location.origin : "https://qareth-unir.pages.dev";
  return `${base}/foro.html?firma=${ap}`;
}
function foroCodigoMoodle(ap) {
  return `<iframe src="${foroEnlace(ap)}" width="100%" height="900" style="border:0;" title="Qareth · Foro de dinamización"></iframe>`;
}

// Código del recuadro de UNA semana, para pegar en el foro con el botón </> de Moodle
// (Moodle rechaza el iframe). Misma estructura que el que Alicia publica sin problemas:
// sin JavaScript ni bloque <style>; cada estilo dentro de su etiqueta. Semanas futuras con candado.
const FORO_TIT = "font-family:Cinzel,'Times New Roman',serif;";
const FORO_CIRCULO = `display:inline-block;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin:0 2px 4px 0;${FORO_TIT}`;
const FORO_ESTILO = {
  caja: "background-color:#120d08;background-image:radial-gradient(at 50% 0%, #2a1d10 0%, #120d08 60%);color:#efe3c8;font-family:'EB Garamond',Georgia,serif;font-size:17px;line-height:1.5;padding:16px;border-radius:10px;",
  tabla: "width:100%;border-collapse:collapse;margin-bottom:10px;",
  eyebrow: `border:0;padding:0;${FORO_TIT}font-size:12px;letter-spacing:1.44px;text-transform:uppercase;color:#d8a84e;`,
  semana: `border:0;padding:0;text-align:right;${FORO_TIT}font-size:17px;color:#f3d38a;`,
  ahora: "font-size:11px;color:#1b1209;background-color:#d8a84e;border-radius:999px;padding:2px 9px;margin-left:6px;",
  n: `${FORO_CIRCULO}border:1px solid #6b5330;color:#d8a84e;`,
  on: `${FORO_CIRCULO}background-color:#d8a84e;color:#1b1209;font-weight:600;`,
  futura: `${FORO_CIRCULO}border:1px solid #3d2e18;font-size:11px;`,
  tarjeta: "background-color:#20170e;border:1px solid #6b5330;border-radius:10px;padding:16px 19px 10px;",
  h: `${FORO_TIT}font-size:19px;font-weight:400;line-height:1.5;color:#f3d38a;margin:0 0 3px;`,
  cab: "color:#b9a682;margin:0 0 14px;",
  p: "margin:0 0 14px;",
  ul: "margin:0 0 14px;padding-left:20px;",
  li: "margin-bottom:5px;",
  a: "color:#f3d38a;",
};
function foroCodigoSemana(m, ap) {
  const S = FORO_ESTILO;
  const nav = FORO.map((x) =>
    x.n > m.n ? `<span style="${S.futura}">🔒</span>`
      : `<span style="${x.n === m.n ? S.on : S.n}">${x.n}</span>`).join("\n");
  const msg = foroCuerpo(m, ap).html
    .replace(/<(\/?)b>/g, "<$1strong>")
    .replace(/<(p|ul|li)>/g, (t, e) => `<${e} style="${S[e]}">`)
    .replace(/<a href="([^"]+)"[^>]*>/g, `<a href="$1" style="${S.a}">`)
    .replace(/<\/(p|ul|li)>/g, "</$1>\n");
  return `<div style="${S.caja}">
<table style="${S.tabla}"><tbody><tr>
<td style="${S.eyebrow}">Foro de dinamización · Qareth</td>
<td style="${S.semana}">Semana ${m.n} de ${FORO.length} <span style="${S.ahora}">Esta semana</span></td>
</tr></tbody></table>
<p style="margin:0 0 14px;">
${nav}
</p>
<div style="${S.tarjeta}">
<h3 style="${S.h}">${foroEsc(m.titulo)}</h3>
<p style="${S.cab}">${foroEsc(m.cabecera)}</p>
${msg}</div>
</div>`;
}

// ---------------------------------------------------------------------
//  Guía docente (demo.html): todos los mensajes para copiar
// ---------------------------------------------------------------------
(function () {
  const caja = document.getElementById("foroMensajes");
  if (!caja) return;
  const esc = foroEsc, cuerpo = foroCuerpo;

  // Firma elegida (se recuerda en este navegador)
  let firma = FIRMAS[0];
  try { const f = localStorage.getItem("qareth-firma-foro"); if (f) firma = foroFirmaValida(f); } catch (e) {}

  const actual = foroSemanaActual();

  // Código para pegar en Moodle (cambia con la firma)
  const codigoMoodle = document.getElementById("foroCodigo");
  const verRecuadro = document.getElementById("foroVer");
  function pintarCodigo() {
    if (codigoMoodle) codigoMoodle.textContent = foroCodigoMoodle(firma);
    if (verRecuadro) verRecuadro.href = foroEnlace(firma);
  }
  const copiarCodigo = document.getElementById("foroCopiarCodigo");
  if (copiarCodigo) copiarCodigo.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(foroCodigoMoodle(firma)); }
    catch (e) {
      const r = document.createRange(); r.selectNodeContents(codigoMoodle);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand("copy"); s.removeAllRanges();
    }
    const aviso = copiarCodigo.nextElementSibling; aviso.hidden = false;
    setTimeout(() => { aviso.hidden = true; }, 2500);
  });

  function pintar() {
    pintarCodigo();
    caja.innerHTML = FORO.map((m) => {
      const c = cuerpo(m, firma);
      return `<details class="foro-sem"${m.n === actual ? " open" : ""}>
        <summary><span class="foro-tit">${esc(m.titulo)}</span>${m.n === actual ? '<span class="foro-ahora">Esta semana</span>' : ""}
          <span class="foro-cab">${esc(m.cabecera)}</span></summary>
        <div class="mensaje foro-msg" id="foro${m.n}">${c.html}</div>
        <button class="boton" type="button" data-codigo="${m.n}">Copiar el código para Moodle</button><span class="copiado" hidden>Copiado</span>
        <button class="boton sec" type="button" data-foro="${m.n}">Copiar el mensaje</button><span class="copiado" hidden>Copiado</span>
        <p class="nota">${esc(m.nota)}</p>
      </details>`;
    }).join("");
  }

  // Selector de firma
  const selector = document.getElementById("foroFirma");
  if (selector) {
    selector.innerHTML = FIRMAS.map((f) =>
      `<button type="button" class="boton${f === firma ? "" : " sec"}" data-firma="${f}">${f}</button>`).join("");
    selector.addEventListener("click", (e) => {
      const b = e.target.closest("[data-firma]"); if (!b) return;
      firma = b.dataset.firma;
      try { localStorage.setItem("qareth-firma-foro", firma); } catch (err) {}
      selector.querySelectorAll("[data-firma]").forEach((x) => x.classList.toggle("sec", x.dataset.firma !== firma));
      const abiertas = [...caja.querySelectorAll("details")].map((d) => d.open);
      pintar();
      caja.querySelectorAll("details").forEach((d, i) => { d.open = abiertas[i]; });
    });
  }

  // Copiar: con formato (negritas, viñetas, enlaces) y, si no se puede, como texto
  // Copiar el código del recuadro de esa semana (como texto, para pegarlo en </>)
  caja.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-codigo]"); if (!b) return;
    const m = FORO.find((x) => x.n === Number(b.dataset.codigo));
    const codigo = foroCodigoSemana(m, firma);
    try { await navigator.clipboard.writeText(codigo); }
    catch (err) {
      const t = document.createElement("textarea"); t.value = codigo; document.body.appendChild(t);
      t.select(); document.execCommand("copy"); t.remove();
    }
    const aviso = b.nextElementSibling; aviso.hidden = false;
    setTimeout(() => { aviso.hidden = true; }, 2500);
  });

  caja.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-foro]"); if (!b) return;
    const m = FORO.find((x) => x.n === Number(b.dataset.foro));
    const c = cuerpo(m, firma);
    try {
      await navigator.clipboard.write([new ClipboardItem({
        "text/html": new Blob([c.html], { type: "text/html" }),
        "text/plain": new Blob([c.texto], { type: "text/plain" }),
      })]);
    } catch (err) {
      try { await navigator.clipboard.writeText(c.texto); }
      catch (err2) {
        const r = document.createRange(); r.selectNodeContents(document.getElementById("foro" + m.n));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand("copy"); s.removeAllRanges();
      }
    }
    const aviso = b.nextElementSibling; aviso.hidden = false;
    setTimeout(() => { aviso.hidden = true; }, 2500);
  });

  pintar();
})();

// ---------------------------------------------------------------------
//  Recuadro para Moodle (foro.html?firma=Robles): el mensaje de la semana
//  en curso, que cambia solo cada lunes. Las semanas futuras, con candado.
// ---------------------------------------------------------------------
(function () {
  const caja = document.getElementById("foroSemana");
  if (!caja) return;
  const q = new URLSearchParams(location.search);
  const firma = foroFirmaValida(q.get("firma"));
  const actual = foroSemanaActual();
  let vista = actual;

  function pintar() {
    const m = FORO.find((x) => x.n === vista);
    const nav = FORO.map((x) => x.n > actual
      ? `<span class="foro-n candado" title="Se abre el ${x.inicio.split("-").reverse().join("/")}">🔒</span>`
      : `<button type="button" class="foro-n${x.n === vista ? " on" : ""}" data-n="${x.n}" aria-label="Semana ${x.n}">${x.n}</button>`).join("");
    caja.innerHTML = `
      <div class="foro-arriba">
        <div class="foro-eyebrow">Foro de dinamización · Qareth</div>
        <div class="foro-semana">Semana ${vista} de ${FORO.length}${vista === actual ? ' <span class="foro-ahora">Esta semana</span>' : ""}</div>
      </div>
      <nav class="foro-nav" aria-label="Semanas">${nav}</nav>
      <article class="foro-tarjeta">
        <h1>${foroEsc(m.titulo)}</h1>
        <div class="foro-cab">${foroEsc(m.cabecera)}</div>
        <div class="foro-msg">${foroCuerpo(m, firma).html}</div>
      </article>`;
  }

  caja.addEventListener("click", (e) => {
    const b = e.target.closest("[data-n]"); if (!b) return;
    vista = Number(b.dataset.n); pintar();
  });
  pintar();
})();
