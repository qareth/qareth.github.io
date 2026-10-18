// =====================================================================
//  QARETH · ventana del reto (Sesiones y Mapa)
//  La misma ficha que se abre al pulsar un enclave: insignia, descripción,
//  misión de Ithera, estado (si el alumno ya escribió su nombre de mediador)
//  y el botón para registrarlo. En el Mapa, además, el botón «Retos» con
//  los retos ya abiertos según su fecha.
//  Necesita en la página: <dialog id="ventana"> con #cerrar y #ventanaCuerpo.
// =====================================================================

const abrirReto = (() => {
  const el = (id) => document.getElementById(id);
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // El mediador que escribió su nombre en la web (si lo hizo), con la última copia de los datos.
  function yo() {
    try {
      const nick = (localStorage.getItem("qareth-nick") || "").toLowerCase();
      const datos = JSON.parse(localStorage.getItem("qareth-datos"));
      return nick && datos ? datos.mediadores.find((x) => x.alias.toLowerCase() === nick) || null : null;
    } catch { return null; }
  }

  function abrir(n) {
    const r = CONFIG.RETOS[n - 1];
    const m = yo();
    const lograda = m && m.retos[n];
    const fecha = lograda && new Date(lograda + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long" });
    el("ventanaCuerpo").innerHTML = `
      <div class="v-cabecera" style="background-image:url('img/enclaves/enclave${n}.jpg')">
        <img src="img/insignias/reto${n}.png" alt="Insignia ${esc(r.insignia)}" class="${m && !lograda ? "bloqueada" : ""}">
      </div>
      <div class="v-cuerpo">
        <div class="etiqueta">Reto ${n} · Insignia: ${esc(r.insignia)}</div>
        <h3>${esc(r.territorio)}</h3>
        <p>${esc(r.descripcion)}</p>
        <blockquote class="cita">${esc(r.mision)}</blockquote>
        ${m ? (lograda
          ? `<div class="huella"><div class="etiqueta">Conexión activada el ${fecha}</div>${esc(r.huella)}</div>`
          : `<div class="huella bloqueada">El nodo armilar de este enclave aún espera. Supera el reto para activar su conexión.</div>`) : ""}
        <div class="v-acciones">${!lograda && CONFIG.ENLACES.registro
          ? `<a class="boton" href="${esc(CONFIG.ENLACES.registro)}" target="_blank" rel="noopener">Registrar este reto</a>` : ""}</div>
      </div>`;
    if (!el("ventana").open) el("ventana").showModal();
  }

  // Acuerdo de Confidencialidad («El pacto del mediador»): el paso previo para participar.
  function abrirAcuerdo() {
    const a = CONFIG.ACUERDO;
    const firmado = !!yo();   // si aparece en la clasificación, ya lo ha firmado
    el("ventanaCuerpo").innerHTML = `
      <div class="v-cabecera" style="background-image:url('img/portada.jpg')"></div>
      <div class="v-cuerpo">
        <div class="etiqueta">Información importante · El pacto del mediador</div>
        <h3>Acuerdo de Confidencialidad</h3>
        ${a.texto.map((p) => `<p>${esc(p)}</p>`).join("")}
        ${firmado ? `<div class="huella"><div class="etiqueta">Ya lo has firmado</div>Ya formas parte de la aventura: puedes registrar tus retos.</div>` : ""}
        <div class="v-acciones">${firmado ? "" : `<a class="boton" href="${esc(a.enlace)}" target="_blank" rel="noopener">Firmar el Acuerdo</a>`}</div>
      </div>`;
    if (!el("ventana").open) el("ventana").showModal();
  }

  // Botón «Retos» (pestaña Mapa): el Acuerdo y los retos ya abiertos, cada uno con su ventana.
  function botonRetos() {
    const abiertos = CONFIG.RETOS.filter((r) => abierto(r.abre));
    const caja = document.createElement("div");
    caja.className = "retos-flotante";
    caja.innerHTML = `
      <div class="retos-lista" id="retosLista" hidden>
        <button type="button" class="retos-item" data-acuerdo>
          <span class="retos-sello" aria-hidden="true">✦</span><span><b>Acuerdo de Confidencialidad</b> · Consejo de las Grandes Casas</span>
        </button>
        ${abiertos.map((r) => `
          <button type="button" class="retos-item" data-reto="${r.n}">
            <img src="img/insignias/reto${r.n}.png" alt=""><span><b>Reto ${r.n}</b> · ${esc(r.territorio)}</span>
          </button>`).join("")}
      </div>
      <button type="button" class="boton retos-boton" id="retosBoton" aria-expanded="false">
        <img src="img/insignias/reto${abiertos.length ? abiertos[abiertos.length - 1].n : 1}.png" alt="">Retos</button>`;
    document.body.append(caja);
    const lista = el("retosLista"), boton = el("retosBoton");
    boton.addEventListener("click", () => {
      lista.hidden = !lista.hidden;
      boton.setAttribute("aria-expanded", String(!lista.hidden));
    });
  }

  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-reto]");
    if (b) abrir(Number(b.dataset.reto));
    if (ev.target.closest("[data-acuerdo]")) abrirAcuerdo();
  });
  document.addEventListener("DOMContentLoaded", () => {
    el("cerrar").addEventListener("click", () => el("ventana").close());
    el("ventana").addEventListener("click", (ev) => { if (ev.target === ev.currentTarget) ev.currentTarget.close(); });
    if (document.body.dataset.botonRetos !== undefined) botonRetos();
  });

  return abrir;
})();
