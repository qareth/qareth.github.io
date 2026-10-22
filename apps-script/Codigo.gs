/**
 * QARETH · conexión con la hoja de respuestas del formulario
 *
 * Pega este código en Extensiones > Apps Script de la HOJA DE CÁLCULO
 * vinculada al formulario "¡Registra tus retos!" y publícalo como
 * aplicación web (ver LEEME.md).
 *
 * El formulario tiene dos tipos de envío (pregunta «¿Qué reto quieres registrar?»):
 *   · Acuerdo de Confidencialidad («El pacto del mediador»): docente, nombre,
 *     apellidos, nombre de mediador (seudónimo) y enlace al avatar (opcional).
 *     Se hace una vez; si se repite, cuenta el más reciente (sirve para corregir datos).
 *   · Reto 1 … Reto 8: suma el reto a quien lo envía (se identifica por el correo),
 *     salvo que haya respondido «No» en «¿Has …?» o que lo registre antes de que
 *     se abra (APERTURA_RETOS). Se guarda el enlace a la evidencia.
 *
 * Para ver la web hay que escribir el código de la asignatura (pestaña «Acceso»).
 * A la web solo llegan alias, docente, avatar y fechas de los retos de quien
 * se ha alistado. Nombres y correos NUNCA salen de aquí: los docentes los
 * ven en su propio listado privado (ver «Listados de docentes» más abajo).
 *
 * Validación opcional: si añades en la hoja de respuestas una columna
 * llamada "Validado" y escribes "NO" en una fila, ese registro no cuenta.
 */

const CACHE_SEGUNDOS = 60;
const PUNTOS_POR_RETO = 300;
const HOJA_DOCENTES = 'Docentes';
const HOJA_ACCESO = 'Acceso';
// Día en que se abre cada reto (las mismas fechas que RETOS[].abre en js/config.js).
// Un reto registrado antes de esa fecha no cuenta; una vez abierto, no se cierra.
const APERTURA_RETOS = {
  1: '2026-10-12', 2: '2026-10-26', 3: '2026-11-02', 4: '2026-11-16',
  5: '2026-11-30', 6: '2026-12-07', 7: '2027-01-11', 8: '2027-01-25',
};

// ---------------------------------------------------------------------
//  Web
//  Solo responde a quien manda el código de la asignatura que está en la
//  celda B1 de la pestaña «Acceso». Si se cambia el código, quien entró
//  con el anterior tendrá que escribir el nuevo.
// ---------------------------------------------------------------------

function doGet(e) {
  const p = (e && e.parameter) || {};
  let respuesta;
  try {
    const codigo = leerCodigo_();
    if (p.demo !== undefined) {
      // Código de docentes (celda B2 de «Acceso»): solo abre la demostración, que no lleva datos reales.
      const deDocentes = leerCodigo_('B2');
      respuesta = deDocentes && normaliza_(p.demo) === normaliza_(deDocentes) ? { ok: true } : { ok: false, motivo: 'codigo' };
    }
    else if (!codigo || normaliza_(p.codigo || '') !== normaliza_(codigo)) respuesta = { ok: false, motivo: 'codigo' };
    else respuesta = datosPublicos_();
  } catch (err) {
    console.error(err);
    respuesta = { ok: false, motivo: 'error' };
  }
  return ContentService.createTextOutput(JSON.stringify(respuesta)).setMimeType(ContentService.MimeType.JSON);
}

function datosPublicos_() {
  const cache = CacheService.getScriptCache();
  const json = cache.get('qareth');
  if (json) return JSON.parse(json);
  const mediadores = leerMediadores_().map(m => ({
    alias: m.alias, docente: m.docente, avatar: m.avatar, retos: m.retos,
  }));
  const datos = { ok: true, actualizado: new Date().toISOString(), mediadores: mediadores, docentes: leerDocentesWeb_() };
  cache.put('qareth', JSON.stringify(datos), CACHE_SEGUNDOS);
  return datos;
}

// Columnas de la pestaña «Docentes» con los enlaces de las copias de Genially de cada docente
// (a partir de la D). Si una casilla está vacía, sus alumnos ven el Genially de Ascen.
const COLUMNAS_GENIALLY = ['Panel', 'Presentación']
  .concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => 'Semana ' + n))
  .concat([1, 2, 3].map(n => 'Actividad ' + n));

/** [{nombre, enlaces: {"Panel": url, "Semana 1": url, …}}] de cada docente de la pestaña «Docentes». */
function leerDocentesWeb_() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_DOCENTES);
  if (!hoja || hoja.getLastRow() < 2) return [];
  const valores = hoja.getDataRange().getValues();
  const cab = valores.shift().map(h => String(h).trim());
  return valores
    .filter(f => String(f[0]).trim())
    .map(f => {
      const enlaces = {};
      cab.forEach((h, i) => {
        const url = String(f[i]).trim();
        if (COLUMNAS_GENIALLY.indexOf(h) >= 0 && /^https:\/\/\S+$/.test(url)) enlaces[h] = url;
      });
      return { nombre: String(f[0]).trim(), enlaces: enlaces };
    });
}

const normaliza_ = (t) => String(t).trim().toLowerCase();

/** B1 = código de la asignatura (alumnado); B2 = código de docentes (solo la demostración). */
function leerCodigo_(celda) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_ACCESO);
  return hoja ? String(hoja.getRange(celda || 'B1').getValue()).trim() : '';
}

// ---------------------------------------------------------------------
//  Lectura de respuestas
// ---------------------------------------------------------------------

/** Devuelve un mediador por correo alistado: {correo, nombre, apellidos, alias, docente, avatar, retos, alistado}. */
function leerMediadores_() {
  const hoja = buscarHojaRespuestas_();
  const valores = hoja.getDataRange().getValues();
  const cab = valores.shift().map(h => String(h).toLowerCase());
  const busca = (prueba) => cab.findIndex(prueba);
  const tiene = (...claves) => (h) => claves.some(c => h.includes(c));

  // Las columnas se reconocen por el texto de cada pregunta del formulario.
  const col = {
    fecha: 0,
    correo: busca(tiene('correo', 'email')),
    registro: busca(tiene('qué reto', 'que reto')),
    nick: busca(h => h.trim() === 'nick'),
    docente: busca(tiene('imparte tu clase', 'docente')),
    alias: busca(tiene('mediador en qareth', 'seudónimo', 'alias')),
    nombre: busca(h => h.includes('nombre') && !h.includes('mediador')),
    apellidos: busca(tiene('apellido')),
    avatar: busca(tiene('avatar')),
    validado: busca(h => h.trim() === 'validado'),
  };
  // En cada sección de reto: «¿Has …?» (Sí/No) y «Comparte aquí el enlace a tu recurso».
  const colsConfirma = cab.map((h, i) => (/^¿\s*has/.test(h.trim()) ? i : -1)).filter(i => i >= 0);
  const colsEnlace = cab.map((h, i) => (h.includes('enlace a tu recurso') ? i : -1)).filter(i => i >= 0);
  if (col.correo < 0 || col.registro < 0) {
    throw new Error('No encuentro las columnas de correo o de registro en la hoja "' + hoja.getName() + '".');
  }

  const tz = Session.getScriptTimeZone();
  const texto = (fila, c) => (c >= 0 ? String(fila[c]).trim() : '');
  const filas = valores
    .filter(f => f[col.fecha] instanceof Date)
    .sort((a, b) => a[col.fecha] - b[col.fecha]);

  const porCorreo = {};
  filas.forEach(fila => {
    const correo = texto(fila, col.correo).toLowerCase();
    const registro = texto(fila, col.registro);
    if (!correo || !registro) return;
    if (col.validado >= 0 && /^\s*no\s*$/i.test(texto(fila, col.validado))) return;

    const p = porCorreo[correo] || (porCorreo[correo] = { correo: correo, retos: {}, evidencias: {}, alistado: false });

    if (/acuerdo|confidencial|pacto|alist/i.test(registro)) {
      // «El pacto del mediador» (alistamiento): el más reciente es el que vale.
      p.alistado = true;
      if (!p.fechaAcuerdo) p.fechaAcuerdo = Utilities.formatDate(fila[col.fecha], tz, 'yyyy-MM-dd');
      p.docente = texto(fila, col.docente);
      p.nombre = texto(fila, col.nombre);
      p.apellidos = texto(fila, col.apellidos);
      p.alias = texto(fila, col.alias);
      // Enlace directo a la imagen que crea cada alumno (por ejemplo, en postimages.org).
      const av = texto(fila, col.avatar);
      p.avatar = /^https:\/\/\S+$/i.test(av) ? av : null;
      return;
    }

    const m = registro.match(/reto\s*(\d)/i);
    if (!m) return;
    const n = Number(m[1]);
    if (n < 1 || n > 8) return;
    // Si en «¿Has …?» ha respondido «No», ese envío no cuenta.
    if (colsConfirma.some(c => /^\s*no\s*$/i.test(texto(fila, c)))) return;
    const fecha = Utilities.formatDate(fila[col.fecha], tz, 'yyyy-MM-dd');
    if (fecha < APERTURA_RETOS[n]) return;        // registrado antes de abrirse: no cuenta
    if (!p.retos[n]) p.retos[n] = fecha;          // si se repite un reto, cuenta la primera vez
    const enlace = colsEnlace.map(c => texto(fila, c)).find(Boolean);
    if (enlace) p.evidencias[n] = enlace;         // el enlace más reciente es el que se guarda
    if (!p.nickAntiguo) p.nickAntiguo = texto(fila, col.nick);
  });

  // Solo cuentan quienes se han alistado (con alias y docente).
  const lista = Object.keys(porCorreo).map(c => porCorreo[c]).filter(p => p.alistado && p.alias && p.docente);

  // Dos personas con el mismo alias: se diferencian con un número.
  const usados = {};
  lista.forEach(p => {
    const clave = p.alias.toLowerCase();
    usados[clave] = (usados[clave] || 0) + 1;
    if (usados[clave] > 1) p.alias = p.alias + ' (' + usados[clave] + ')';
    p.puntos = Object.keys(p.retos).length * PUNTOS_POR_RETO;
  });
  return lista;
}

function buscarHojaRespuestas_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = libro.getSheets();
  // La pestaña enlazada ahora al formulario (si se re-enlaza, Google crea otra nueva).
  return hojas.find(h => h.getFormUrl())
    || hojas.find(h => /respuestas|responses/i.test(h.getName())) || hojas[0];
}

// ---------------------------------------------------------------------
//  Listados de docentes
//  En la pestaña «Docentes» de esta hoja: columna A = el nombre del docente
//  EXACTAMENTE como aparece en el formulario; columna B = su correo de Google.
//  Cada docente recibe una hoja propia, compartida solo con él/ella, con sus
//  alumnos. Se actualiza sola con cada envío del formulario.
// ---------------------------------------------------------------------

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Qareth')
    .addItem('Preparar acceso a la web', 'prepararAcceso')
    .addItem('Preparar pestaña de docentes', 'prepararDocentes')
    .addItem('Actualizar listados de docentes', 'actualizarListados')
    .addItem('Activar actualización automática', 'activarAutomatico')
    .addToUi();
}

function prepararAcceso() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA_ACCESO);
  if (!hoja) hoja = libro.insertSheet(HOJA_ACCESO);
  if (!hoja.getRange('A1').getValue()) {
    hoja.getRange('A1').setValue('Código de la asignatura').setFontWeight('bold');
    hoja.setColumnWidth(1, 220).setColumnWidth(2, 260);
  }
  libro.setActiveSheet(hoja);
  hoja.getRange('B1').activate();
}

function prepararDocentes() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA_DOCENTES);
  if (!hoja) hoja = libro.insertSheet(HOJA_DOCENTES);
  if (!hoja.getRange('A1').getValue()) {
    hoja.getRange('A1:C1').setValues([['Docente (igual que en el formulario)', 'Correo de Google', 'Listado (se rellena solo)']])
      .setFontWeight('bold');
    hoja.setColumnWidths(1, 3, 320);
  }
  // A partir de la columna D: los enlaces de las copias de Genially de cada docente.
  // Se añaden si faltan, sin tocar lo que ya haya escrito.
  if (!hoja.getRange('D1').getValue()) {
    hoja.getRange(1, 4, 1, COLUMNAS_GENIALLY.length).setValues([COLUMNAS_GENIALLY]).setFontWeight('bold');
    hoja.setColumnWidths(4, COLUMNAS_GENIALLY.length, 260);
    hoja.setFrozenRows(1);
    hoja.setFrozenColumns(1);
  }
  libro.setActiveSheet(hoja);
}

function actualizarListados() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaDoc = libro.getSheetByName(HOJA_DOCENTES);
  if (!hojaDoc) throw new Error('Falta la pestaña "' + HOJA_DOCENTES + '". Usa el menú Qareth > Preparar pestaña de docentes.');

  const mediadores = leerMediadores_();
  const props = PropertiesService.getScriptProperties();
  const filas = hojaDoc.getDataRange().getValues().slice(1);

  filas.forEach((f, i) => {
    const docente = String(f[0]).trim();
    const correo = String(f[1]).trim();
    if (!docente) return;

    // Una hoja por docente; se recuerda su id para no crear duplicados.
    const clave = 'listado:' + docente.toLowerCase();
    let ss = null;
    const id = props.getProperty(clave);
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
    if (!ss) {
      ss = SpreadsheetApp.create('Qareth · Mediadores de ' + docente);
      props.setProperty(clave, ss.getId());
    }
    if (correo) {
      const yaLector = ss.getViewers().concat(ss.getEditors()).some(u => u.getEmail().toLowerCase() === correo.toLowerCase());
      if (!yaLector) ss.addViewer(correo);
    }
    hojaDoc.getRange(i + 2, 3).setValue(ss.getUrl());

    const suyos = mediadores
      .filter(m => m.docente.toLowerCase() === docente.toLowerCase())
      .sort((a, b) => b.puntos - a.puntos || a.alias.localeCompare(b.alias));
    // Una columna por reto: la fecha y, si lo compartió, el enlace a su evidencia.
    const cabecera = ['Seudónimo', 'Nombre', 'Apellidos', 'Correo', 'Acuerdo', 'Avatar', 'Puntos']
      .concat([1, 2, 3, 4, 5, 6, 7, 8].map(n => 'Reto ' + n));
    const datos = [cabecera].concat(suyos.map(m => [m.alias, m.nombre, m.apellidos, m.correo, m.fechaAcuerdo, m.avatar || '', m.puntos]
      .concat([1, 2, 3, 4, 5, 6, 7, 8].map(n => m.retos[n] ? (m.retos[n] + (m.evidencias[n] ? '  ' + m.evidencias[n] : '')) : ''))));

    const hoja = ss.getSheets()[0];
    hoja.clear();
    hoja.getRange(1, 1, datos.length, datos[0].length).setValues(datos);
    hoja.getRange(1, 1, 1, datos[0].length).setFontWeight('bold');
    hoja.setFrozenRows(1);
  });
}

/** Ejecútalo una vez: actualiza los listados cada vez que llega una respuesta del formulario. */
function activarAutomatico() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'actualizarListados')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('actualizarListados').forSpreadsheet(libro).onFormSubmit().create();
}

/** Ejecútalo desde el editor para comprobar qué verá la web. */
function probar() {
  CacheService.getScriptCache().remove('qareth');
  Logger.log('Código de la asignatura: ' + (leerCodigo_() || '(falta: menú Qareth > Preparar acceso a la web)'));
  Logger.log(JSON.stringify(datosPublicos_(), null, 2));
}

/** Muestra cada columna de la hoja de respuestas con lo que hay en las dos últimas filas. */
function diagnostico() {
  const hoja = buscarHojaRespuestas_();
  const v = hoja.getDataRange().getValues();
  const ultimas = v.slice(-2);
  Logger.log('Hoja: ' + hoja.getName() + ' · filas: ' + v.length);
  v[0].forEach((h, i) => Logger.log(i + ' | ' + String(h).replace(/\s+/g, ' ').slice(0, 50) + ' | '
    + ultimas.map(f => String(f[i]).slice(0, 40)).join(' | ')));
}
