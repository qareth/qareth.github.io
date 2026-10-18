# Crónica de Qareth · guía de puesta en marcha

Web de seguimiento de la aventura *Qareth: El despertar de las Grandes Casas*.
Cada respuesta del formulario **¡Registra tus retos!** enciende una conexión del mapa,
concede la insignia del enclave y suma 300 puntos. En la web solo aparece el **nick**:
los correos se quedan en tu hoja de cálculo.

Para verla ya en modo demostración, abre `index.html` con doble clic.

---

## Paso 1 · Vincular el formulario a una hoja de cálculo

1. Abre el formulario en modo edición → pestaña **Respuestas**.
2. Pulsa **Vincular con Hojas de cálculo** → *Crear una hoja de cálculo nueva*.

## Paso 2 · Pegar el código en la hoja

1. En la hoja de cálculo: **Extensiones → Apps Script**.
2. Borra lo que aparezca y pega todo el contenido de `apps-script/Codigo.gs`.
3. Guarda (icono del disquete).
4. En el desplegable de funciones elige **probar** y pulsa **Ejecutar**.
   Google pedirá permisos la primera vez: *Revisar permisos → tu cuenta → Configuración avanzada → Ir al proyecto → Permitir*.
   En el registro de ejecución verás los nicks y retos que leerá la web.

## Paso 3 · Publicarlo como aplicación web

1. Botón **Implementar → Nueva implementación**.
2. Tipo (rueda dentada): **Aplicación web**.
3. *Ejecutar como*: **Yo**. *Quién tiene acceso*: **Cualquier usuario**.
4. **Implementar** y copia la URL que termina en `/exec`.

> Si más adelante cambias el código: *Implementar → Gestionar implementaciones → editar (lápiz) → Versión: nueva → Implementar*. La URL no cambia.

## Paso 4 · Conectar la web

Abre `js/config.js` con el Bloc de notas y pega la URL entre las comillas de `API_URL`:

```js
API_URL: "https://script.google.com/macros/s/XXXXXXXX/exec",
```

Ahí también puedes añadir el enlace de **Zoom**, el del **ticket de salida**,
y un enlace propio para cada enclave (`enlace`).

## Paso 5 · Publicar la web

La opción más sencilla y gratuita es **Netlify Drop**:

1. Entra en <https://app.netlify.com/drop> (crea una cuenta gratuita si lo pide).
2. Arrastra la carpeta `cronica-qareth` entera a la página.
3. Te dará una dirección del tipo `https://nombre.netlify.app`. Puedes cambiar el nombre en *Site configuration*.

Para actualizar la web después, vuelve a arrastrar la carpeta en *Deploys*.

---

## Uso en clase

- Los mediadores entran en la web, escriben **su nick igual que en el formulario** y ven su ficha. La web lo recuerda en su navegador.
- Enlace directo a una ficha: `https://tu-web.netlify.app/?nick=SuNick`.
- Los datos se refrescan cada minuto como máximo.
- Si alguien cambia de nick, cuenta el del último registro. Si alguien registra el mismo reto dos veces, cuenta una vez.

### Anular un registro

En la hoja de respuestas añade una columna con el título **Validado** y escribe **NO**
en la fila que no deba contar. Desaparece de la web en un minuto.

### Qué se puede cambiar en `js/config.js`

| Qué | Dónde |
|---|---|
| Puntos por reto | `PUNTOS_POR_RETO` |
| Texto de introducción | `PROLOGO` |
| Nombres y frases de los rangos | `RANGOS` |
| Encargo y huella de cada enclave | `RETOS` → `mision`, `huella` |
| Posición de cada enclave en el mapa | `RETOS` → `x`, `y` (en %) |

### Clasificación

Una única clasificación general por puntos (300 por reto). A igualdad de puntos,
va delante quien completó antes su último reto.
