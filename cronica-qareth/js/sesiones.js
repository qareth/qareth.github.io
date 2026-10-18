// =====================================================================
//  SESIONES · presentación por pestañas (Presentación y Semanas 1–15).
//  Se pasa con las flechas ← → del teclado. Usa js/diapos.js.
// =====================================================================

// Cada Genially es el del docente del alumno (si tiene copia) o el de Ascen (ver ACCESO.genially).
const PRESENTACION_G = ACCESO.genially("Presentación", GENIALLY_PRESENTACION);

const PESTANAS = [
  // La presentación es el Genially, a pantalla completa.
  { id: "presentacion", nombre: "Presentación", g: PRESENTACION_G, diapos: [
    () => diapoGenially(PRESENTACION_G.url, "Presentación de la asignatura", "img/mapa.jpg", "acuerdo"),
  ] },
  // Cada semana muestra su Genially (GENIALLY_SEMANA); mientras no lo tenga, la diapositiva de la semana.
  // Cada semana aparece el lunes de esa semana (inicio, en programacion.js).
  ...SEMANAS.filter((s) => abierto(s.inicio)).map((s) => {
    const g = ACCESO.genially("Semana " + s.n, GENIALLY_SEMANA[s.n]);
    return { id: "semana-" + s.n, nombre: "Semana " + s.n, g, diapos: [
      g.url
        ? () => diapoGenially(g.url, `Genially de la semana ${s.n}`,
          s.tema ? `img/enclaves/enclave${s.tema}.jpg` : "img/mapa.jpg", s.tema)
        : () => diapoSemana(s),
    ] };
  }),
];

// Todas las diapositivas en orden: la primera de cada pestaña usa su id (#semana-3),
// las siguientes añaden el número (#presentacion-2).
const PASOS = PESTANAS.flatMap((p) =>
  p.diapos.map((pintar, i) => ({ hash: i ? `${p.id}-${i + 1}` : p.id, pestana: p, i, pintar })));

function pintarPestanas(actual) {
  $("#pestanas").innerHTML = PESTANAS.map((p) =>
    `<button type="button" data-id="${p.id}" aria-current="${p.id === actual}">${esc(p.nombre)}</button>`).join("");
  centrarPestana();
}

// Centra la pestaña activa en la barra (también cuando terminan de cargar las fuentes).
function centrarPestana() {
  const barra = $("#pestanas");
  const activa = barra.querySelector('[aria-current="true"]');
  if (activa) barra.scrollLeft = activa.offsetLeft - (barra.clientWidth - activa.offsetWidth) / 2;
}
if (document.fonts) document.fonts.ready.then(centrarPestana);

function mostrar(hash) {
  const paso = PASOS.find((x) => x.hash === hash) || PASOS[0];
  const p = paso.pestana;
  const puntos = p.diapos.length > 1
    ? `<div class="puntos-diapo" aria-label="Diapositiva ${paso.i + 1} de ${p.diapos.length}">` +
      p.diapos.map((_, i) => `<a href="#${i ? `${p.id}-${i + 1}` : p.id}" class="${i === paso.i ? "on" : ""}" aria-label="Diapositiva ${i + 1}"></a>`).join("") +
      `<span>← → para avanzar</span></div>`
    : "";
  pintarDiapo(paso.pintar(), puntos);
  window.scrollTo(0, 0);
  pintarPestanas(p.id);
  if (location.hash.slice(1) !== paso.hash) history.replaceState(null, "", "#" + paso.hash);
  document.title = `${p.nombre} · Qareth`;
  ACCESO.rotular(p.nombre, p.g);
}

function mover(delta) {
  const i = PASOS.findIndex((x) => x.hash === location.hash.slice(1));
  const j = Math.min(PASOS.length - 1, Math.max(0, (i < 0 ? 0 : i) + delta));
  mostrar(PASOS[j].hash);
}

// La ventana del reto (botón sobre el Genially de cada semana) está en js/retos.js.

$("#pestanas").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-id]");
  if (b) mostrar(b.dataset.id);
});
document.addEventListener("keydown", (ev) => {
  if (ev.target.closest("input, textarea")) return;
  if (ev.key === "ArrowRight") mover(1);
  if (ev.key === "ArrowLeft") mover(-1);
});
window.addEventListener("hashchange", () => mostrar(location.hash.slice(1)));

mostrar(location.hash.slice(1));
