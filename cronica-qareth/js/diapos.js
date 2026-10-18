// =====================================================================
//  DIAPOSITIVAS · contenido de Sesiones, Actividades y Talleres
//  (sale de programacion.js y config.js)
// =====================================================================

const $ = (sel) => document.querySelector(sel);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const enclave = (n) => CONFIG.RETOS[n - 1];

function htmlClase([n, min, tipo, texto]) {
  return `
    <div class="clase${tipo ? " problema" : ""}">
      <div class="etiqueta">Clase ${n} · ${min} min${tipo ? " · " + tipo : ""}</div>
      <p>${esc(texto)}</p>
    </div>`;
}

// La pestaña Presentación tiene varias diapositivas: portada, un bloque por diapositiva y evaluación.
const TEMAS_DE_BLOQUE = { 1: [1, 2], 2: [3, 4, 5, 6, 7], 3: [8] };

function semanasDeTema(t) {
  const ss = SEMANAS.filter((s) => s.tema === t).map((s) => s.n);
  if (ss.length === 1) return `Semana ${ss[0]}`;
  return `Semanas ${ss.slice(0, -1).join(", ")} y ${ss[ss.length - 1]}`;
}

const PRESENTACION = [
  () => ({
    fondo: "img/mapa.jpg",
    html: `
      <div class="etiqueta">Presentación de la asignatura</div>
      <h1>Creación de Contenidos Educativos con Inteligencia Artificial</h1>
      <h2>Qareth: El despertar de las Grandes Casas</h2>
      <p class="sub-grande">Quince semanas, <b>ocho temas</b> —los ocho enclaves de Qareth— en <b>tres bloques</b>.</p>
      <p class="lema" style="max-width:70ch">${esc(CONFIG.PROLOGO)}</p>`,
  }),
  ...BLOQUES.map((b) => () => ({
    fondo: "img/mapa.jpg",
    html: `
      <div class="etiqueta">La asignatura · bloque ${b.n} de ${BLOQUES.length}</div>
      <h1 class="h1-bloque">${esc(b.titulo)}</h1>
      <p class="sub-grande">${b.aprender.map(esc).join(" ")}</p>
      <div class="temas n${TEMAS_DE_BLOQUE[b.n].length}">
        ${TEMAS_DE_BLOQUE[b.n].map((t) => `
          <article class="tema">
            <img src="img/enclaves/enclave${t}.jpg" alt="">
            <div>
              <p class="tema-k">Tema ${t} · ${esc(enclave(t).territorio)}</p>
              <h3>${esc(TEMAS[t].titulo)}</h3>
              <p class="tema-c">${semanasDeTema(t)}</p>
            </div>
          </article>`).join("")}
      </div>`,
  })),
  () => ({
    fondo: "img/mapa.jpg",
    html: `
      <div class="etiqueta">La asignatura · evaluación</div>
      <h1 class="h1-bloque">Lo que se evalúa</h1>
      <div class="bloques">
        <div class="bloque">
          <div class="etiqueta">Evaluación continua</div>
          <p style="margin:.3rem 0 0">Actividades (10 puntos).</p>
          <p style="margin:.3rem 0 0">Asistencia a tres sesiones en directo a lo largo del cuatrimestre (0,5 puntos cada una).</p>
        </div>
        ${ACTIVIDADES.map((a) => `
        <div class="bloque">
          <div class="etiqueta">Actividad ${a.n} · ${esc(a.puntos)}</div>
          <p style="margin:.3rem 0 0">Se presenta en la semana ${a.presentacion} y se entrega en la semana ${a.entrega}.</p>
        </div>`).join("")}
        <div class="bloque">
          <div class="etiqueta">Semana 16</div>
          <p style="margin:.3rem 0 0">Semana de exámenes.</p>
        </div>
      </div>`,
  }),
];

function diapoSemana(s) {
  const bloque = BLOQUES[s.bloque - 1];
  const entregas = ACTIVIDADES.filter((a) => a.entrega === s.n);
  const avisos = entregas.map((a) => `
    <div class="clase aviso"><div class="etiqueta">Entrega</div><p>Actividad ${a.n} (${esc(a.puntos)})</p></div>`).join("");

  if (!s.tema) {
    return {
      fondo: "img/mapa.jpg",
      html: `
        <div class="etiqueta">Semana ${s.n} · Bloque ${bloque.n}</div>
        <h1>${esc(s.titulo)}</h1>
        <h2>Antes de la semana de exámenes</h2>
        <h3>Clases en directo</h3>
        <div class="clases">${s.clases.map(htmlClase).join("")}${avisos}</div>`,
    };
  }

  const t = TEMAS[s.tema];
  const r = enclave(s.tema);
  const apartados = s.apartados || t.apartados;
  return {
    fondo: `img/enclaves/enclave${s.tema}.jpg`,
    html: `
      <div class="diapo-grid">
        <div>
          <div class="etiqueta">Semana ${s.n} · Bloque ${bloque.n} · Tema ${s.tema}</div>
          <h1>${esc(r.territorio)}</h1>
          <h2>Tema ${s.tema}. ${esc(t.titulo)}${s.continuacion ? " (continuación)" : ""}</h2>
          <ul class="apartados">${apartados.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
          <h3>Clases en directo</h3>
          <div class="clases">${s.clases.map(htmlClase).join("")}${avisos}</div>
        </div>
        <aside class="lateral">
          <img src="img/insignias/reto${s.tema}.png" alt="Insignia ${esc(r.insignia)}">
          <div class="etiqueta">Reto ${s.tema} · ${esc(r.insignia)}</div>
          <blockquote class="cita">${esc(r.descripcion)}</blockquote>
          ${CONFIG.ENLACES.registro ? `<a class="boton" href="${esc(CONFIG.ENLACES.registro)}" target="_blank" rel="noopener">Registrar reto</a>` : ""}
        </aside>
      </div>`,
  };
}

function diapoGenially(url, titulo, fondo, reto = null) {
  // Ocupa todo el espacio entre la barra de arriba y las pestañas de abajo.
  // Si la semana es de un tema, encima lleva un botón que abre la ficha de su reto.
  // reto = "acuerdo" en la Presentación (el Consejo de las Grandes Casas): botón del Acuerdo de Confidencialidad.
  const r = typeof reto === "number" && enclave(reto);
  const boton = reto === "acuerdo"
    ? `<button type="button" class="boton reto-flotante" data-acuerdo>
        <span class="retos-sello" aria-hidden="true">✦</span>Acuerdo de Confidencialidad</button>`
    : r ? `<button type="button" class="boton reto-flotante" data-reto="${reto}">
        <img src="img/insignias/reto${reto}.png" alt="">Reto ${reto} · ${esc(r.insignia)}</button>` : "";
  return {
    fondo,
    completo: true,
    html: `<iframe class="genially-completo" src="${esc(url)}" title="${esc(titulo)}" allowfullscreen allow="fullscreen"></iframe>` + boton,
  };
}

function diapoActividades() {
  return {
    fondo: "img/mapa.jpg",
    html: `
      <div class="etiqueta">Evaluación continua · 10 puntos</div>
      <h1>Actividades</h1>
      <div class="bloques">
        ${ACTIVIDADES.map((a) => `
          <div class="bloque">
            <div class="etiqueta">${esc(a.puntos)}</div>
            <h3>Actividad ${a.n}</h3>
            <table class="tabla-act">
              <tr><th>Presentación</th><td>Semana ${a.presentacion} · Clase ${a.clase}</td></tr>
              <tr><th>Entrega</th><td>Semana ${a.entrega}</td></tr>
            </table>
          </div>`).join("")}
      </div>`,
  };
}

function diapoTalleres() {
  const talleres = SEMANAS.flatMap((s) => s.clases
    .filter((c) => /taller/i.test(c[3]))
    .map((c) => ({ s, c })));
  return {
    fondo: "img/enclaves/enclave4.jpg",
    html: `
      <div class="etiqueta">Clases en directo de 120 minutos</div>
      <h1>Talleres prácticos virtuales</h1>
      <div class="bloques">
        ${talleres.map(({ s, c }) => `
          <div class="bloque">
            <div class="etiqueta">Semana ${s.n} · Clase ${c[0]} · ${c[1]} min</div>
            <h3>${esc(c[3])}</h3>
            <div class="enclaves">Tema ${s.tema} · ${esc(enclave(s.tema).territorio)}</div>
          </div>`).join("")}
      </div>`,
  };
}

// Pinta una diapositiva en el escenario de la página.
function pintarDiapo(d, extra = "") {
  const escenario = $("#escenario");
  escenario.style.backgroundImage = `url('${d.fondo}')`;
  escenario.classList.toggle("completo", !!d.completo);
  escenario.innerHTML = `<div class="diapo${d.completo ? " completa" : ""}">${d.html}${extra}</div>`;
}
