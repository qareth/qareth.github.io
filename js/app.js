// =====================================================================
//  CRÓNICA DE QARETH · lógica de la página
//  Lee los registros de la Gran Esfera (Google Apps Script) y pinta
//  ficha personal, mapa, insignias y clasificaciones.
// =====================================================================

const RETOS = CONFIG.RETOS;
const MAPA_ALTO = 56.28; // alto del viewBox del mapa (941 / 1672 * 100)
const CLAVE_NICK = ACCESO.demo ? "qareth-nick-demo" : "qareth-nick";   // la demostración recuerda su propio nombre

const estado = {
  mediadores: [],   // [{alias, retos:{n:fecha}, n, puntos, ultima}]
  yo: null,         // mediador seleccionado
  demo: false,
};

const $ = (sel) => document.querySelector(sel);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fechaLarga = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long" });
const insigniaSrc = (n) => `img/insignias/reto${n}.png`;
const mediadores = (k) => `${k} ${k === 1 ? "mediador" : "mediadores"}`;

// Copia local de los últimos datos recibidos, para pintar al instante mientras llegan los nuevos.
const CLAVE_DATOS = "qareth-datos";
function leerCopia() {
  try { return JSON.parse(localStorage.getItem(CLAVE_DATOS)); } catch { return null; }
}
function guardarCopia(datos) {
  try { localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos)); } catch { /* sin almacenamiento */ }
}

function leerPreferencia() {
  try { return localStorage.getItem(CLAVE_NICK); } catch { return null; }
}
function guardarPreferencia(nick) {
  try { nick ? localStorage.setItem(CLAVE_NICK, nick) : localStorage.removeItem(CLAVE_NICK); } catch { /* sin almacenamiento */ }
}

// ---------------------------------------------------------------------
//  Datos
// ---------------------------------------------------------------------

async function cargarDatos() {
  estado.demo = ACCESO.demo;
  if (estado.demo) return datosDemo();
  const datos = await ACCESO.llamar({ codigo: ACCESO.codigo() });
  // Si se ha cambiado el código en la hoja, se vuelve a pedir.
  if (!datos.ok && datos.motivo === "codigo") ACCESO.salir();
  if (!datos.ok) throw new Error(datos.motivo);
  return datos;
}

function prepararMediadores(lista) {
  return lista.map((m) => {
    const hechos = Object.keys(m.retos).map(Number).filter((n) => n >= 1 && n <= 8);
    const fechas = hechos.map((n) => m.retos[n]).sort();
    return {
      alias: m.alias,
      docente: m.docente || "",
      avatar: m.avatar || null,
      retos: m.retos,
      n: hechos.length,
      puntos: hechos.length * CONFIG.PUNTOS_POR_RETO,
      ultima: fechas[fechas.length - 1] || "9999",
    };
  });
}

function rango(n) {
  return CONFIG.RANGOS.filter((r) => n >= r.min).pop();
}

// Orden: más puntos primero; a igualdad, quien llegó antes.
function ordenar(lista) {
  return [...lista]
    .sort((a, b) => b.puntos - a.puntos || a.ultima.localeCompare(b.ultima) || a.alias.localeCompare(b.alias, "es"))
    .map((m) => ({ m, valor: m.puntos }));
}

// En la clasificación solo entra quien ha superado al menos un reto (con el Acuerdo solo, aún no).
const enRanking = () => estado.mediadores.filter((m) => m.n > 0);

// Igual que en la tabla: a igualdad de puntos, mismo puesto.
function posicionDe(m) {
  return enRanking().filter((x) => x.puntos > m.puntos).length + 1;
}

// Avatar que cada alumno crea y enlaza en el alistamiento; si no hay o no carga, la inicial del alias.
function htmlAvatar(m, clase = "") {
  const inicial = esc((m.alias.trim()[0] || "?").toUpperCase());
  const url = /^https:\/\/\S+$/i.test(m.avatar || "") ? m.avatar : "";
  const img = url ? `<img src="${esc(url)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : "";
  return `<span class="avatar ${clase}" aria-hidden="true"><b>${inicial}</b>${img}</span>`;
}


// ---------------------------------------------------------------------
//  Pintado
// ---------------------------------------------------------------------

function pintarEnlaces() {
  const e = CONFIG.ENLACES;
  // El registro de retos está dentro de cada enclave; arriba solo va Zoom cuando haya enlace.
  const botones = [
    e.zoom && `<a class="boton sec" href="${esc(e.zoom)}" target="_blank" rel="noopener">Zoom</a>`,
  ];
  $("#enlaces").innerHTML = botones.filter(Boolean).join("");
}

// Un enclave (y su insignia) se ve desde su fecha de apertura; antes, solo si ese mediador ya lo superó.
const visible = (r, m = estado.yo) => abierto(r.abre) || !!(m && m.retos[r.n]);

function htmlConexiones(m, mini = false) {
  return `<span class="conexiones${mini ? " mini" : ""}" aria-label="${m.n} de 8 conexiones">` +
    RETOS.map((r) => `<i class="${m.retos[r.n] ? "on" : ""}"></i>`).join("") + "</span>";
}

function htmlInsigniasMini(m, conNombre = false) {
  return `<div class="v-insignias${conNombre ? "" : " compactas"}">` + RETOS.map((r) => `
    <figure class="${m.retos[r.n] ? "" : "bloqueada"}" title="${esc(r.insignia)}">
      <img src="${insigniaSrc(r.n)}" alt="${esc(r.insignia)}${m.retos[r.n] ? "" : " (por conseguir)"}">
      ${conNombre ? `<figcaption>${esc(r.insignia)}</figcaption>` : ""}
    </figure>`).join("") + `</div>`;
}

// Ficha personal (se abre en una ventana desde el tablero de Clasificación).
function htmlFicha(m) {
  const rg = rango(m.n);
  const pendiente = RETOS.find((r) => !m.retos[r.n] && abierto(r.abre));
  return `
    <div class="ficha-grid">
      <div>
        <div class="ficha-cabeza">
          ${htmlAvatar(m, "grande")}
          <div>
            <div class="etiqueta">Mediador/a de Qareth</div>
            <div class="alias">${esc(m.alias)}</div>
          </div>
        </div>
        <div class="rango">${esc(rg.nombre)}</div>
        <p class="lema">${esc(rg.lema)}</p>
        ${htmlConexiones(m)}
        <div class="cifras">
          <div class="cifra"><b>${m.puntos.toLocaleString("es-ES")}</b><span>puntos</span></div>
          <div class="cifra"><b>${m.n}/8</b><span>conexiones</span></div>
          ${m.n ? `<div class="cifra"><b>${posicionDe(m)}º</b><span>de ${mediadores(enRanking().length)}</span></div>` : ""}
        </div>
      </div>
      <div>
        <div class="etiqueta">Tus insignias</div>
        ${htmlInsigniasMini(m)}
        <div class="siguiente">
          ${pendiente ? `
            <div class="etiqueta">Tu próximo enclave</div>
            <p><b>Reto ${pendiente.n} · ${esc(pendiente.territorio)}</b></p>
            <button class="boton" data-enclave="${pendiente.n}">Ver el encargo</button>`
          : m.n === 8 ? `<div class="etiqueta">Red completa</div><p>Has activado las ocho conexiones de la Gran Esfera Armilar.</p>` : ""}
        </div>
      </div>
    </div>`;
}

function abrirFicha() {
  if (!estado.yo) return;
  $("#ventanaCuerpo").innerHTML = `<div class="v-cuerpo v-ficha">${htmlFicha(estado.yo)}</div>`;
  $("#ventana").showModal();
}

// «¿Quién eres, Mediador/a?»: el buscador del alias o, si ya se ha elegido, quién eres y tu grupo.
function pintarQuien() {
  const caja = $("#quien");
  const m = estado.yo;

  if (!m) {
    caja.innerHTML = `
      <div class="acceso">
        <div class="etiqueta">¿Quién eres, Mediador/a?</div>
        <p>Escribe tu nombre de mediador para ver tu posición y tu ficha.</p>
        <form id="formNick">
          <input id="nick" placeholder="Tu nombre de mediador" autocomplete="off" required aria-label="Tu nombre de mediador">
          <button class="boton" type="submit">Ver</button>
        </form>
        <p id="nickError" class="error" hidden>No hay ningún mediador con ese nombre. Escríbelo igual que en el formulario.</p>
      </div>`;
    $("#formNick").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const txt = $("#nick").value.trim().toLowerCase();
      const elegido = estado.mediadores.find((x) => x.alias.toLowerCase() === txt);
      if (!elegido) { $("#nickError").hidden = false; return; }
      seleccionar(elegido);
    });
    return;
  }

  caja.innerHTML = `
    <div class="quien-yo">
      ${htmlAvatar(m, "grande")}
      <div class="quien-datos">
        <div class="etiqueta">${m.docente ? `Grupo de ${esc(m.docente)}` : "Mediador/a de Qareth"}</div>
        <div class="alias">${esc(m.alias)}</div>
        <div>${m.n ? `${m.puntos.toLocaleString("es-ES")} puntos · ${posicionDe(m)}º de ${mediadores(enRanking().length)}` : "Entrarás en la clasificación al superar tu primer reto."}</div>
      </div>
      <div class="quien-acciones">
        <button class="boton" data-ficha>Ver mi ficha</button>
        ${m.n ? `<button class="boton sec" data-mi-puesto>Ir a mi puesto</button>` : ""}
        <button class="boton sec" data-no-soy>No soy ${esc(m.alias)}</button>
      </div>
    </div>`;
  caja.querySelector("[data-no-soy]").addEventListener("click", () => seleccionar(null));
}
function pintarMapa() {
  const m = estado.yo;
  const c = CONFIG.CENTRO;
  const cy = (y) => (y / 100) * MAPA_ALTO;

  // El título y esta frase solo están en la pestaña Mapa; en el inicio, el mapa va tras el vídeo, sin texto.
  if ($("#mapaSub")) $("#mapaSub").textContent = m
    ? `Cada reto superado enciende una conexión entre su enclave y la Gran Esfera Armilar. Llevas ${m.n} de 8.`
    : "Pulsa un enclave para ver su encargo.";

  $("#mapaLineas").innerHTML = RETOS.filter((r) => visible(r)).map((r) => {
    // Solo se encienden las conexiones del mediador que consulta su ficha.
    const encendida = !!(m && m.retos[r.n]);
    return `<line class="linea-red ${encendida ? "encendida" : "apagada"}" x1="${r.x}" y1="${cy(r.y)}" x2="${c.x}" y2="${cy(c.y)}"
      stroke-width="${encendida ? 0.45 : 0.25}"/>`;
  }).join("") + `<circle class="esfera" cx="${c.x}" cy="${cy(c.y)}" r="2.2" stroke-width="0.25"/>`;

  $("#mapaMarcas").innerHTML = RETOS.filter((r) => visible(r)).map((r) => {
    const lograda = m && m.retos[r.n];
    const fondo = lograda ? `style="left:${r.x}%;top:${r.y}%;background-image:url('${insigniaSrc(r.n)}')"` : `style="left:${r.x}%;top:${r.y}%"`;
    return `
      <button class="marca-enclave${lograda ? " lograda" : ""}" ${fondo} data-enclave="${r.n}"
        aria-label="Reto ${r.n}: ${esc(r.territorio)}${lograda ? " (superado)" : ""}">${lograda ? "" : r.n}</button>
      <span class="nombre-enclave" style="left:${r.x}%;top:calc(${r.y}% + clamp(26px, 3.6vw, 42px))">${esc(r.territorio)}</span>`;
  }).join("");
}

function pintarInsignias() {
  const m = estado.yo;
  // Las ocho se ven siempre, para que se sepa lo que se puede conseguir
  // (la ventana de su enclave no se abre hasta su fecha).
  $("#listaInsignias").innerHTML = RETOS.map((r) => {
    const tiene = m ? !!m.retos[r.n] : true;
    // Cada mediador ve solo sus propias insignias; sin nick, solo se muestran las ocho.
    const pie = m ? (tiene ? `Obtenida el ${fechaLarga(m.retos[r.n])}` : "Por conseguir") : "";
    return `
      <button class="insignia${tiene ? "" : " bloqueada"}" data-enclave="${r.n}">
        <img src="${insigniaSrc(r.n)}" alt="" loading="lazy">
        <h3>${esc(r.insignia)}</h3>
        ${pie ? `<small>${pie}</small>` : ""}
      </button>`;
  }).join("");
}

// Tablero: un único ranking con todo el alumnado (todos los grupos): podio de los tres primeros y tabla.
// De cada mediador solo se ven el avatar, el alias, las conexiones y los puntos; la fila propia, resaltada.
function pintarRanking() {
  const ol = $("#ranking");
  const podio = $("#podio");
  const yo = estado.yo;
  if (!enRanking().length) { ol.innerHTML = `<li class="vacio">Todavía nadie ha superado un reto.</li>`; podio.innerHTML = ""; return; }

  let pos = 0, anterior = null;
  const filas = ordenar(enRanking()).map(({ m, valor }, i) => {
    if (valor !== anterior) { pos = i + 1; anterior = valor; }
    return { m, valor, pos };
  });

  // Podio: 2º · 1º · 3º (el primero en el centro y más alto).
  const top = filas.slice(0, 3);
  podio.innerHTML = [top[1], top[0], top[2]].filter(Boolean).map((f) => `
    <div class="podio-puesto p${f === top[0] ? 1 : f === top[1] ? 2 : 3}${f.m === yo ? " yo" : ""}"${f.m === yo ? " data-ficha" : ""}>
      <div class="podio-pos">${f.pos}º</div>
      ${htmlAvatar(f.m, "grande")}
      <div class="podio-alias">${esc(f.m.alias)}</div>
      <div class="podio-pts">${f.valor.toLocaleString("es-ES")} pts</div>
    </div>`).join("");

  ol.innerHTML = filas.map(({ m, valor, pos }) => `
    <li class="fila${m === yo ? " yo" : ""}"${m === yo ? ` data-ficha title="Ver mi ficha"` : ""}>
      <span class="pos">${pos}</span>
      <span class="nom">${htmlAvatar(m)}<span>${esc(m.alias)}${m === yo ? "<small>(tú)</small>" : ""}</span></span>
      <span class="conex">${m.n}/8</span>
      <span class="valor">${valor.toLocaleString("es-ES")} pts</span>
    </li>`).join("");
}
// Cada página (inicio, insignias, clasificación) tiene solo algunos bloques: se pinta lo que haya.
function pintarTodo() {
  if ($("#quien")) pintarQuien();
  if ($("#mapaLienzo")) pintarMapa();
  if ($("#listaInsignias")) pintarInsignias();
  if ($("#ranking")) pintarRanking();
}

// ---------------------------------------------------------------------
//  Ventanas
// ---------------------------------------------------------------------

function abrirEnclave(n) {
  const r = RETOS[n - 1];
  const m = estado.yo;
  if (!visible(r)) return;
  const lograda = m && m.retos[n];
  const acciones = [
    !lograda && CONFIG.ENLACES.registro && `<a class="boton" href="${esc(CONFIG.ENLACES.registro)}" target="_blank" rel="noopener">Registrar este reto</a>`,
    // Las páginas de la propia web (sesiones.html#semana-1) se abren aquí mismo; las de fuera, en otra pestaña.
    r.enlace && `<a class="boton sec" href="${esc(r.enlace)}"${/^https?:/.test(r.enlace) ? ` target="_blank" rel="noopener"` : ""}>Ir al enclave</a>`,
  ].filter(Boolean).join("");

  $("#ventanaCuerpo").innerHTML = `
    <div class="v-cabecera" style="background-image:url('img/enclaves/enclave${n}.jpg')">
      <img src="${insigniaSrc(n)}" alt="Insignia ${esc(r.insignia)}" class="${m && !lograda ? "bloqueada" : ""}">
    </div>
    <div class="v-cuerpo">
      <div class="etiqueta">Reto ${n} · Insignia: ${esc(r.insignia)}</div>
      <h3>${esc(r.territorio)}</h3>
      <p>${esc(r.descripcion)}</p>
      <blockquote class="cita">${esc(r.mision)}</blockquote>
      ${m ? (lograda
        ? `<div class="huella"><div class="etiqueta">Conexión activada el ${fechaLarga(m.retos[n])}</div>${esc(r.huella)}</div>`
        : `<div class="huella bloqueada">El nodo armilar de este enclave aún espera. Supera el reto para activar su conexión.</div>`) : ""}
      <div class="v-acciones">${acciones}</div>
    </div>`;
  $("#ventana").showModal();
}

// ---------------------------------------------------------------------
//  Interacción
// ---------------------------------------------------------------------

function seleccionar(m) {
  estado.yo = m;
  guardarPreferencia(m ? m.alias : null);
  pintarTodo();
  if (m) irAMiPuesto();   // con 200 mediadores, se baja hasta la fila propia
}

// Lleva la tabla hasta la fila de quien ha escrito su nombre y la hace destellar.
function irAMiPuesto() {
  const fila = document.querySelector("#ranking .fila.yo");
  if (!fila) return;
  fila.scrollIntoView({ behavior: "smooth", block: "center" });
  fila.classList.remove("destello");
  void fila.offsetWidth;
  fila.classList.add("destello");
}

document.addEventListener("click", (ev) => {
  const enclave = ev.target.closest("[data-enclave]");
  if (enclave) abrirEnclave(Number(enclave.dataset.enclave));
  if (ev.target.closest("[data-ficha]")) abrirFicha();
  if (ev.target.closest("[data-mi-puesto]")) irAMiPuesto();
});
$("#cerrar").addEventListener("click", () => $("#ventana").close());
$("#ventana").addEventListener("click", (ev) => { if (ev.target === ev.currentTarget) ev.currentTarget.close(); });

// ---------------------------------------------------------------------
//  Vídeo de entrada (página de inicio)
//  Solo el vídeo: se reproduce cuando aparece en pantalla, no se puede
//  saltar y al terminar se queda en su última imagen.
// ---------------------------------------------------------------------

function iniciarVideoEntrada() {
  const video = $("#videoEntrada");
  // Si el navegador no deja reproducirlo solo, se muestra su botón de «play»
  const reproducir = () => video.play().catch(() => { video.controls = true; });

  if (!("IntersectionObserver" in window)) { reproducir(); return; }
  const obs = new IntersectionObserver((entradas) => {
    if (entradas.some((e) => e.isIntersecting)) { obs.disconnect(); reproducir(); }
  }, { threshold: 0.9 });   // empieza cuando se ve casi entero, para no perderse el principio
  obs.observe(video);
}

// ---------------------------------------------------------------------
//  Arranque
// ---------------------------------------------------------------------

function aplicarDatos(datos) {
  estado.mediadores = prepararMediadores(datos.mediadores || []);
  const pedido = new URLSearchParams(location.search).get("nick") || leerPreferencia();
  estado.yo = pedido ? estado.mediadores.find((m) => m.alias.toLowerCase() === pedido.toLowerCase()) || null : null;
  pintarTodo();
}

async function iniciar() {
  pintarEnlaces();
  if ($("#prologo")) $("#prologo").textContent = CONFIG.PROLOGO;
  if ($("#videoEntrada")) iniciarVideoEntrada();
  if (!ACCESO.codigo()) return;   // aún no ha entrado: solo se ve la pantalla de entrada

  // Mientras llegan los datos nuevos, se enseña la última copia guardada (si la hay).
  const copia = !ACCESO.demo ? leerCopia() : null;
  if (copia) aplicarDatos(copia);

  try {
    const datos = await cargarDatos();
    if (!estado.demo) guardarCopia(datos);
    aplicarDatos(datos);

    if (estado.demo) {
      $("#avisoDemo").hidden = false;
      $("#demoAlterna").textContent = estado.yo ? "Ver como visitante" : "Ver como un mediador";
      $("#demoAlterna").addEventListener("click", (ev) => {
        ev.preventDefault();
        seleccionar(estado.yo ? null : estado.mediadores[0]);
        $("#demoAlterna").textContent = estado.yo ? "Ver como visitante" : "Ver como un mediador";
      });
    }
  } catch (e) {
    console.error(e);
    if (!copia && $("#quien")) {
      $("#quien").innerHTML = `<p class="error" style="text-align:center">No se ha podido consultar la Gran Esfera Armilar. Inténtalo de nuevo en unos minutos.</p>`;
    }
  }
}

// Datos inventados para ver la web antes de conectarla a la hoja.
function datosDemo() {
  const nicks = ["Brisa de Arena", "Lumen", "Cartógrafa Nómada", "Kael", "Vesper", "Orión del Sur", "Tinta Dorada",
    "Ammara", "Eco", "Sable", "Duna", "Nadir", "Iridia", "Faro", "Zaphira", "Brújula", "Atlas", "Mirra"];
  const docentes = ["Docente A", "Docente B"];
  let semilla = 7;
  const azar = () => (semilla = (semilla * 9301 + 49297) % 233280) / 233280;
  const inicio = new Date("2026-09-14T12:00:00");
  return {
    actualizado: new Date().toISOString(),
    mediadores: nicks.map((alias, i) => {
      const hechos = i === 0 ? 3 : Math.floor(azar() * 9);
      const retos = {};
      for (let n = 1; n <= hechos; n++) {
        const d = new Date(inicio);
        d.setDate(d.getDate() + (n - 1) * 7 + Math.floor(azar() * 6));
        retos[n] = d.toISOString().slice(0, 10);
      }
      return { alias, retos, docente: docentes[i % 2], avatar: null };
    }),
  };
}

iniciar();
