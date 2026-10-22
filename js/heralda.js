// =====================================================================
//  QARETH · «Pregunta a la Heralda»: dudas del alumnado SIN IA.
//  Respuestas ya escritas (HERALDA_FAQ); al escribir, se elige la que más
//  se parece por palabras clave. Lo que no sabe → «consúltalo con tu docente».
//  Se añade solo a la página con <script src="js/heralda.js"></script>.
// =====================================================================

const HERALDA_FAQ = [
  // Las 6 primeras salen como botones al abrir.
  { id: "registrar", boton: "¿Cómo registro un reto?",
    claves: ["registro", "registrar", "registra", "subo", "subir", "entrego", "entregar", "envio", "enviar", "formulario", "evidencia"],
    r: () => `Pulsa «¡Registra tus retos!» (en Insignias o en la ventana del reto), elige el reto y, cuando ya lo hayas realizado, contesta «Sí» y pega el enlace a tu evidencia, ya que tienes que aportarla para que el reto cuente. Para cada reto, envía una respuesta nueva con «Enviar otra respuesta».<br><br><b>Usa siempre el mismo correo con el que firmaste el Acuerdo.</b> Es así como Qareth reconoce que el reto es tuyo: si lo envías con otro correo, no se suma a tu ficha ni a la clasificación.${CONFIG.ENLACES.registro ? ` <a href="${CONFIG.ENLACES.registro}" target="_blank" rel="noopener">Abrir el formulario</a>` : ""}` },
  { id: "acuerdo", boton: "¿Qué es el Acuerdo de Confidencialidad?",
    claves: ["acuerdo", "confidencialidad", "pacto", "alistar", "apuntarme", "empezar", "primero", "inscribirme", "alta"],
    r: () => `Es tu compromiso para entrar en la aventura. Con él aceptas que se recojan algunos datos, como tu correo, solo para registrar tu participación y seguir tus retos, y que tu nombre de mediador/a aparezca en la clasificación y las insignias. Tus datos se usan únicamente con fines académicos. Participar es voluntario.<br><br>Para firmarlo, en el formulario eliges «Acuerdo de Confidencialidad» y rellenas tu docente, tu nombre, tus apellidos, tu nombre de mediador/a y, si quieres, tu avatar. <a href="${CONFIG.ACUERDO.enlace}" target="_blank" rel="noopener">Firmar el Acuerdo</a>` },
  { id: "obligatorio", boton: "¿Son obligatorios los retos?",
    claves: ["obligatorio", "obligatorios", "voluntario", "voluntarios", "nota", "calificacion", "evalua", "evaluacion", "cuenta", "puntua", "aprobar"],
    r: () => "No. Los retos son voluntarios y sirven como entrenamiento. Las Actividades 1, 2 y 3 son las evaluables oficiales y las hace todo el alumnado. Aunque no participes en Qareth, puedes sacar la máxima nota." },
  { id: "clasificacion", boton: "¿Por qué no salgo en la Clasificación?",
    claves: ["clasificacion", "ranking", "salgo", "aparezco", "aparece", "tabla", "puesto", "encuentro"],
    r: () => "Solo aparece quien tiene al menos un reto registrado. Firmar el Acuerdo de Confidencialidad no da puntos de experiencia ni insignia. Recuerda utilizar siempre el mismo correo. Escribe tu nombre de mediador/a exactamente igual que en el formulario. Los datos tardan unos minutos en actualizarse." },
  { id: "abre", boton: "¿Cuándo se abre cada enclave?",
    claves: ["cuando", "abre", "abren", "enclave", "enclaves", "orden", "cierra", "plazo", "fecha"],
    r: () => "Cada enclave se abre la semana en que empieza su tema, cuando se explica en clase. Hasta entonces no puedes hacer su reto: si lo registras antes, no cuenta. Una vez abierto, ya no se cierra." },
  { id: "puntos", boton: "¿Cuántos puntos vale cada reto?",
    claves: ["puntos", "vale", "valen", "cuantos", "experiencia", "xp"],
    r: () => `${CONFIG.PUNTOS_POR_RETO} puntos de experiencia cada uno, 8 retos en total.` },

  { id: "antes", claves: ["antes", "abierto", "abrirse", "adelantado", "cuenta"],
    r: () => "Si lo registraste antes de que se abriera el enclave, no cuenta. Vuelve a registrarlo cuando el enclave esté abierto." },
  { id: "corregir", claves: ["corregir", "modificar", "equivocado", "error", "cambiar", "mal"],
    r: () => "Sí, con «Modificar respuesta». Pero para un reto nuevo, usa «Enviar otra respuesta»." },
  { id: "cuenta", claves: ["cuenta", "google", "correo", "gmail"],
    r: () => "Siempre la misma: la del Acuerdo y la de todos los retos." },
  { id: "avatar", claves: ["avatar", "imagen", "foto", "postimages", "inicial"],
    r: () => `Sube tu imagen a <a href="https://postimages.org" target="_blank" rel="noopener">postimages.org</a> y pega el enlace directo, el que empieza por <code>https://i.postimg.cc/</code>. Si no pones avatar, aparece la inicial de tu nombre.` },
  { id: "privacidad", claves: ["nombre", "real", "privacidad", "datos", "ve", "ven", "seudonimo", "alias"],
    r: () => "Solo tu docente ve tu nombre real. En la web únicamente aparece tu nombre de mediador/a." },
  { id: "codigo", claves: ["codigo", "entrar", "acceder", "acceso", "contrasena"],
    r: () => "Es el código que te da tu docente para entrar en la web. Si entras con el enlace que te han dado, ya lo lleva dentro." },
  { id: "sesiones", claves: ["sesiones", "sesion", "semana", "semanas", "actividades", "actividad", "genially", "material", "materiales"],
    r: () => "En «Sesiones» hay una pestaña por semana, que aparece su lunes. En «Actividades», cada una aparece el lunes de la semana en que se presenta." },
  { id: "doble", claves: ["dos", "veces", "repetido", "duplicado", "otra"],
    r: () => "Si registras el mismo reto dos veces, cuenta solo una vez." },
  { id: "esfera", claves: ["esfera", "armilar", "conexion", "conexiones", "historia", "final", "desenlace", "insignia", "insignias"],
    r: () => "Cada reto superado activa una de las conexiones de la Gran Esfera Armilar y te da la insignia del enclave. Cuando se completan las ocho, se revela el desenlace de la historia." },
  { id: "examen", claves: ["examen", "prueba", "final", "preguntas", "tipo", "modelo"],
    r: () => "Sobre el examen, consúltalo con tu docente." },
  { id: "fechas", claves: ["entrega", "entregas", "fecha", "fechas", "plazo", "cuando", "dia"],
    r: () => "Sobre las fechas de entregas y del examen, consúltalo con tu docente." },
];

(() => {
  const NO_SE = "Esa pregunta escapa a lo que guarda el Consejo. Consúltala con tu docente.";
  const VACIAS = new Set(("a al algo ante asi como con cual de del donde el en es esa ese eso esta este esto ha hay he hola la las le lo los " +
    "me mi mis mas no o para pero por porque puedo puede que quien se ser si sin su sus te tengo tiene tu tus un una y yo").split(" "));
  const limpia = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zñ0-9 ]/g, " ");
  const palabras = (t) => limpia(t).split(/\s+/).filter((w) => w.length > 1 && !VACIAS.has(w));

  // Cada clave que coincide suma; los textos del botón también cuentan un poco.
  function buscar(texto) {
    const ws = palabras(texto);
    return HERALDA_FAQ.map((f) => {
      const claves = f.claves.map(limpia);
      const extra = palabras(f.boton || "");
      let p = 0;
      for (const w of ws) {
        if (claves.some((c) => c === w || (w.length > 4 && c.startsWith(w.slice(0, 5))))) p += 2;
        else if (extra.includes(w)) p += 1;
      }
      return { f, p };
    }).filter((x) => x.p >= 2).sort((a, b) => b.p - a.p);
  }

  const css = `
  .heralda-flotante { position: fixed; right: 1rem; bottom: 1rem; z-index: 35; display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; }
  .heralda-boton { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-family: var(--titulos); font-size: 0.9rem;
    color: var(--oro-claro); background: rgba(20, 14, 8, 0.97); border: 1px solid var(--oro); border-radius: 999px;
    padding: 0.35rem 1rem 0.35rem 0.35rem; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6); }
  .heralda-sello { flex: 0 0 34px; height: 34px; border-radius: 50%; display: grid; place-items: center;
    border: 1px solid var(--oro); color: var(--oro-claro); background: #3a2a12; font-size: 1.1rem; }
  .heralda-panel { width: min(380px, calc(100vw - 2rem)); max-height: min(560px, 75vh); display: flex; flex-direction: column;
    background: rgba(20, 14, 8, 0.98); border: 1px solid var(--oro); border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7); overflow: hidden; }
  .heralda-panel[hidden] { display: none; }
  .heralda-cab { display: flex; gap: 0.7rem; align-items: center; padding: 0.8rem 1rem; border-bottom: 1px solid var(--linea); }
  .heralda-cab .heralda-sello { flex-basis: 44px; height: 44px; font-size: 1.4rem; }
  .heralda-cab h3 { margin: 0; font-family: var(--titulos); color: var(--oro-claro); font-size: 1.05rem; }
  .heralda-cab p { margin: 0.1rem 0 0; color: var(--tenue); font-size: 0.85rem; line-height: 1.3; }
  .heralda-cab button { margin-left: auto; align-self: flex-start; background: none; border: 0; color: var(--tenue); font-size: 1.3rem; cursor: pointer; }
  .heralda-chat { flex: 1; overflow-y: auto; padding: 0.8rem; display: grid; gap: 0.6rem; align-content: start; }
  .heralda-msg { padding: 0.6rem 0.8rem; border-radius: 10px; line-height: 1.4; font-size: 0.98rem; }
  .heralda-msg.ella { background: rgba(216, 168, 78, 0.08); border: 1px solid var(--linea); color: var(--texto); }
  .heralda-msg.ella .quien { font-family: var(--titulos); font-size: 0.7rem; letter-spacing: 0.12em; color: var(--oro); display: block; margin-bottom: 0.2rem; }
  .heralda-msg.yo { justify-self: end; background: var(--oro); color: #1b1209; max-width: 85%; }
  .heralda-msg a { color: var(--oro-claro); }
  .heralda-msg.pendiente { background: #fff3a0; color: #1b1209; border-color: #e0c000; }
  .heralda-msg.pendiente .quien, .heralda-msg.pendiente a { color: #6b4e00; }
  .heralda-opciones { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem; }
  .heralda-opciones button { cursor: pointer; font: inherit; font-size: 0.88rem; text-align: left; color: var(--oro-claro);
    background: transparent; border: 1px solid var(--oro); border-radius: 999px; padding: 0.3rem 0.8rem; }
  .heralda-opciones button:hover { background: rgba(216, 168, 78, 0.15); }
  .heralda-form { display: flex; gap: 0.5rem; padding: 0.7rem; border-top: 1px solid var(--linea); }
  .heralda-form input { flex: 1; min-width: 0; font: inherit; color: var(--texto); background: rgba(0, 0, 0, 0.35);
    border: 1px solid var(--linea); border-radius: 8px; padding: 0.45rem 0.7rem; }
  .heralda-form input:focus { outline: none; border-color: var(--oro); }
  .heralda-form button { cursor: pointer; font-family: var(--titulos); font-size: 0.85rem; color: #1b1209; background: var(--oro);
    border: 0; border-radius: 8px; padding: 0 0.9rem; }
  .heralda-pie { margin: 0; padding: 0 0.8rem 0.7rem; color: var(--tenue); font-size: 0.8rem; }`;

  function montar() {
    const estilo = document.createElement("style");
    estilo.textContent = css;
    document.head.append(estilo);

    const caja = document.createElement("div");
    caja.className = "heralda-flotante";
    caja.innerHTML = `
      <div class="heralda-panel" id="heraldaPanel" hidden role="dialog" aria-label="Pregunta a la Heralda">
        <div class="heralda-cab">
          <span class="heralda-sello" aria-hidden="true">✦</span>
          <div><h3>La Heralda responde</h3></div>
          <button type="button" id="heraldaCerrar" aria-label="Cerrar">×</button>
        </div>
        <div class="heralda-chat" id="heraldaChat" aria-live="polite"></div>
        <form class="heralda-form" id="heraldaForm">
          <input id="heraldaTexto" maxlength="300" placeholder="Escribe tu duda, Mediador/a…" autocomplete="off">
          <button type="submit">Preguntar</button>
        </form>
        <p class="heralda-pie">La Heralda solo conoce el funcionamiento de Qareth y de la web.</p>
      </div>
      <button type="button" class="heralda-boton" id="heraldaBoton" aria-expanded="false">
        <span class="heralda-sello" aria-hidden="true">✦</span>Pregunta a la Heralda</button>`;
    document.body.append(caja);

    // Encima del botón «Retos» (y de su lista, si está abierta), del botón del reto de la sesión
    // o de las pestañas de abajo. Cambian al abrir la lista o de pestaña: se recoloca cada vez.
    function colocar() {
      const encima = document.querySelector(".retos-flotante") || document.querySelector(".reto-flotante");
      const pestanas = document.querySelector(".pestanas-sesion");
      if (encima) caja.style.bottom = (window.innerHeight - encima.getBoundingClientRect().top + 8) + "px";
      else if (pestanas) caja.style.bottom = (pestanas.offsetHeight + 12) + "px";
    }
    colocar();
    new MutationObserver(colocar).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    addEventListener("resize", colocar);

    const $ = (id) => document.getElementById(id);
    const chat = $("heraldaChat");

    function decir(html, opciones = [], pendiente = false) {
      const m = document.createElement("div");
      m.className = "heralda-msg ella" + (pendiente ? " pendiente" : "");
      m.innerHTML = `<span class="quien">LA HERALDA${pendiente ? " · ❓ TEXTO PENDIENTE" : ""}</span>${html}` +
        (opciones.length ? `<div class="heralda-opciones">${opciones.map((f) =>
          `<button type="button" data-heralda="${f.id}">${f.boton || preguntaDe(f)}</button>`).join("")}</div>` : "");
      chat.append(m);
      chat.scrollTop = chat.scrollHeight;
    }
    function yo(texto) {
      const m = document.createElement("div");
      m.className = "heralda-msg yo";
      m.textContent = texto;
      chat.append(m);
    }
    const preguntaDe = (f) => ({ antes: "Lo registré antes de que se abriera", corregir: "¿Puedo corregir un envío?",
      cuenta: "¿Qué cuenta de Google uso?", avatar: "¿Cómo pongo mi avatar?", privacidad: "¿Quién ve mi nombre real?",
      codigo: "¿Qué es el código de la asignatura?", sesiones: "¿Dónde están las sesiones y actividades?",
      doble: "¿Y si registro un reto dos veces?", esfera: "¿Qué es la Gran Esfera Armilar?",
      examen: "¿Cómo es el examen?", fechas: "Fechas de entregas y examen" }[f.id] || f.id);
    const responder = (f) => decir(f.r(), [], f.pendiente);

    function saludar() {
      chat.innerHTML = "";
      decir("Saludos, Mediador/a. Soy la Heralda de Qareth. ¿En qué puedo orientarte?", HERALDA_FAQ.filter((f) => f.boton));
    }

    $("heraldaBoton").addEventListener("click", () => {
      const panel = $("heraldaPanel");
      panel.hidden = !panel.hidden;
      $("heraldaBoton").setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) { if (!chat.children.length) saludar(); $("heraldaTexto").focus(); }
    });
    $("heraldaCerrar").addEventListener("click", () => $("heraldaBoton").click());
    chat.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-heralda]");
      if (!b) return;
      yo(b.textContent);
      responder(HERALDA_FAQ.find((f) => f.id === b.dataset.heralda));
    });
    $("heraldaForm").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const texto = $("heraldaTexto").value.trim();
      if (!texto) return;
      $("heraldaTexto").value = "";
      yo(texto);
      const hallados = buscar(texto);
      if (!hallados.length) return decir(NO_SE);
      // Una clara ganadora → la responde; si hay empate, ofrece elegir.
      const cerca = hallados.filter((x) => x.p >= hallados[0].p - 1).slice(0, 3);
      if (cerca.length === 1) responder(cerca[0].f);
      else decir("¿Te refieres a alguna de estas?", cerca.map((x) => x.f));
    });
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", montar) : montar();
})();
