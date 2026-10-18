// =====================================================================
//  QARETH · entrada con el código de la asignatura
//  Todas las páginas piden el código (celda B1 de la pestaña «Acceso»
//  de la hoja). Una vez comprobado, se recuerda en este navegador hasta
//  pulsar «Salir» o hasta que se cambie el código en la hoja.
// =====================================================================

const ACCESO = (() => {
  const CLAVE = "qareth-codigo";
  const CLAVE_DOCENTES = "qareth-codigo-docentes";
  // Modo demostración (mediadores inventados): ?demo=1 o ?demo=docentes (además, elegir docente).
  // Solo para el profesorado: pide el código de docentes (celda B2 de la pestaña «Acceso»), que el
  // alumnado no tiene. Se mantiene al cambiar de página mientras la pestaña siga abierta;
  // ?demo=salir vuelve a la web real. La página demo.html es la guía y siempre es demostración.
  let modoDemo = null, codigoDocentes = null;
  try {
    const pedido = new URLSearchParams(location.search).get("demo");
    if (pedido === "salir") sessionStorage.removeItem("qareth-demo");
    else if (pedido !== null) sessionStorage.setItem("qareth-demo", pedido === "docentes" ? "docentes" : "1");
    else if (window.QARETH_DEMO_PAGE && !sessionStorage.getItem("qareth-demo")) sessionStorage.setItem("qareth-demo", "1");
    modoDemo = sessionStorage.getItem("qareth-demo");
    codigoDocentes = localStorage.getItem(CLAVE_DOCENTES);
  } catch { /* sin almacenamiento */ }
  const pideCodigoDocentes = !!modoDemo && !!CONFIG.API_URL && !codigoDocentes;
  const demoDocentes = modoDemo === "docentes" && !!codigoDocentes;
  const demo = !CONFIG.API_URL || (!!modoDemo && !!codigoDocentes);
  // En la demostración, lo que se recuerda (nombre de mediador, docente) va aparte de la web real.
  const sufijo = demo ? "-demo" : "";
  const leer = () => { try { return localStorage.getItem(CLAVE); } catch { return null; } };
  const guardar = (c) => {
    try {
      if (c) localStorage.setItem(CLAVE, c);
      else { localStorage.removeItem(CLAVE); localStorage.removeItem("qareth-datos"); }
    } catch { /* sin almacenamiento */ }
  };

  const codigo = demo ? "demo" : pideCodigoDocentes ? null : leer();
  if (!codigo) document.documentElement.classList.add("puerta-abierta");
  // Llamada a la hoja; si Google está saturado (muchos alumnos a la vez), se reintenta.
  async function llamar(params) {
    const url = CONFIG.API_URL + "?" + new URLSearchParams(params);
    for (let intento = 1; ; intento++) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error("HTTP " + r.status);
        return await r.json();
      } catch (e) {
        if (intento >= 4) throw e;
        await new Promise((ok) => setTimeout(ok, intento * 1500 + Math.random() * 1500));
      }
    }
  }

  function pintarPuerta() {
    const p = document.createElement("div");
    p.className = "puerta";
    p.innerHTML = `
      <div class="panel puerta-caja">
        <div class="etiqueta">El despertar de las Grandes Casas</div>
        <h1>Qareth</h1>
        <form id="puertaCodigo">
          <p>${pideCodigoDocentes ? "Demostración para docentes: escribe el código de docentes." : "Escribe el código de la asignatura que te ha dado tu docente."}</p>
          <input id="codigo" autocomplete="off" required aria-label="Código">
          <button class="boton" type="submit">Entrar</button>
        </form>
        <p id="puertaEstado" class="puerta-estado" hidden></p>
      </div>`;
    document.body.prepend(p);
    p.querySelector("#codigo").focus();
    p.querySelector("#puertaCodigo").addEventListener("submit", (ev) => {
      ev.preventDefault();
      entrar(p.querySelector("#codigo").value.trim());
    });
  }

  function estado(texto, error = false) {
    const e = document.getElementById("puertaEstado");
    e.hidden = !texto;
    e.textContent = texto || "";
    e.classList.toggle("error", error);
  }

  async function entrar(intento) {
    estado("Comprobando…");
    let r;
    try {
      r = await llamar(pideCodigoDocentes ? { demo: intento } : { codigo: intento });
    } catch {
      estado("No se ha podido conectar. Inténtalo de nuevo en unos minutos.", true);
      return;
    }
    if (r.ok && pideCodigoDocentes) {
      try { localStorage.setItem(CLAVE_DOCENTES, intento); } catch { /* sin almacenamiento */ }
      location.reload();
    } else if (r.ok) {
      guardar(intento);
      try { localStorage.setItem("qareth-datos", JSON.stringify(r)); } catch { /* sin almacenamiento */ }
      location.reload();
    } else if (r.motivo === "codigo") {
      estado("Ese código no es correcto.", true);
    } else {
      estado("Ha habido un problema. Inténtalo de nuevo en unos minutos.", true);
    }
  }

  function salir() {
    guardar(null);
    location.reload();
  }

  // -------------------------------------------------------------------
  //  Genially de cada docente.
  //  La lista de docentes y los enlaces de sus copias vienen de la pestaña
  //  «Docentes» de la hoja (se usa la última copia guardada y se refresca
  //  por detrás). El alumno elige su docente una vez; cada página pide su
  //  Genially con genially("Panel" | "Presentación" | "Semana N" | "Actividad N",
  //  el de Ascen) y recibe la copia de su docente o, si no la hay, el de Ascen.
  // -------------------------------------------------------------------
  const guardados = () => { try { return JSON.parse(localStorage.getItem("qareth-datos")) || {}; } catch { return {}; } };
  const DOCENTES = demo ? (demoDocentes ? CONFIG.DEMO_DOCENTES : []) : (codigo && guardados().docentes) || [];
  const leerDocente = () => { try { return localStorage.getItem("qareth-docente" + sufijo); } catch { return null; } };
  const miDocente = () => DOCENTES.find((d) => d.nombre === leerDocente()) || null;
  let usaGenially = false;

  // Si en la hoja han cambiado los enlaces (o los docentes), se guarda lo nuevo y se recarga la página.
  async function refrescarDocentes() {
    let r;
    try { r = await llamar({ codigo }); } catch { return; }
    if (!r.ok) { if (r.motivo === "codigo") salir(); return; }
    const antes = JSON.stringify(guardados().docentes || []);
    try { localStorage.setItem("qareth-datos", JSON.stringify(r)); } catch { return; }
    if (JSON.stringify(r.docentes || []) !== antes) location.reload();
  }

  function genially(columna, porDefecto) {
    usaGenially = true;
    const d = miDocente();
    const propio = d && d.enlaces[columna];
    return { url: propio || porDefecto, propia: !!propio, de: propio ? d.nombre : "Ascen Robles" };
  }

  // Cartelito de la demostración: qué Genially se está viendo y de quién es.
  function rotular(columna, g) {
    if (!demoDocentes || !g.url) return;
    let r = document.getElementById("rotuloDemo");
    if (!r) { r = document.createElement("div"); r.id = "rotuloDemo"; r.className = "rotulo-demo"; document.body.append(r); }
    r.innerHTML = `${columna}: ${g.propia ? `<b>copia de ${g.de}</b>` : `versión de Ascen Robles`}`;
  }

  function pintarEleccion() {
    const p = document.createElement("div");
    p.className = "puerta";
    p.innerHTML = `
      <div class="panel puerta-caja">
        <div class="etiqueta">El despertar de las Grandes Casas</div>
        <h1>Qareth</h1>
        <p>¿Quién es tu docente?</p>
        <div class="elige-docente">${DOCENTES.map((d) => `<button class="boton sec" type="button">${d.nombre}</button>`).join("")}</div>
      </div>`;
    document.body.prepend(p);
    p.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      try { localStorage.setItem("qareth-docente" + sufijo, b.textContent); } catch { /* sin almacenamiento */ }
      location.reload();
    }));
  }

  function pintarGrupo() {
    const d = miDocente();
    const barra = document.querySelector(".barra");
    if (!d || !barra) return;
    const g = document.createElement("div");
    g.className = "grupo-barra";
    g.textContent = `Grupo de ${d.nombre}`;
    barra.append(g);
  }

  // Sin botón para cambiar de docente: quien se equivoque entra con …/?cambiar-docente (lo da su docente).
  if (new URLSearchParams(location.search).has("cambiar-docente")) {
    try { localStorage.removeItem("qareth-docente" + sufijo); } catch { /* sin almacenamiento */ }
  }

  const preguntarDocente = () => codigo && DOCENTES.length && !miDocente() && !window.QARETH_SIN_DOCENTE;
  if (preguntarDocente()) document.documentElement.classList.add("puerta-abierta");

  // Marca de la demostración en la barra de arriba, con la salida a la web real.
  function pintarMarcaDemo() {
    const barra = document.querySelector(".barra");
    if (!barra) return;
    const m = document.createElement("div");
    m.className = "marca-demo";
    m.innerHTML = `Demostración · <a href="demo.html">guía</a> · <a href="?demo=salir">salir</a>`;
    barra.append(m);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (demo && CONFIG.API_URL) pintarMarcaDemo();
    if (codigo && DOCENTES.length) {
      if (preguntarDocente()) pintarEleccion();
      else pintarGrupo();
    }
    // En Mapa, Sesiones y Actividades se comprueba por detrás si hay enlaces nuevos en la hoja
    // (en Inicio, Insignias y Clasificación ya lo hace la propia página al pedir la clasificación).
    if (codigo && !demo && usaGenially) refrescarDocentes();
    if (codigo) return;
    pintarPuerta();
    // Enlace directo con el código dentro (…/?codigo=XXXX): se comprueba sin tener que escribirlo.
    const params = new URLSearchParams(location.search);
    const delEnlace = pideCodigoDocentes ? null : params.get("codigo");
    if (delEnlace) {
      params.delete("codigo");
      history.replaceState(null, "", location.pathname + (params.size ? "?" + params : "") + location.hash);
      document.getElementById("codigo").value = delEnlace;
      entrar(delEnlace.trim());
    }
  });

  return { codigo: () => codigo, demo, llamar, salir, genially, rotular };
})();
