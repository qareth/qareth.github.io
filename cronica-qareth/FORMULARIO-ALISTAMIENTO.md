# Formulario «¡Registra tus retos!» · cómo lo lee la hoja

El formulario (montado por Ascen, 12-oct-2026) tiene:

- **¿Qué reto quieres registrar?** (desplegable) con «Acuerdo de Confidencialidad» y «Reto 1 … Reto 8».
  Cada opción lleva a su propia sección.
- **Sección «Acuerdo de Confidencialidad»** (El pacto del mediador): docente que imparte la clase,
  nombre, apellido, nombre de mediador en Qareth (seudónimo) y enlace al avatar (opcional).
- **Una sección por reto**: «¿Has …?» (Sí / No) y «Comparte aquí el enlace a tu recurso».

El código `apps-script/Codigo.gs` reconoce las columnas por el texto de cada pregunta:

| Columna | Se reconoce porque el título contiene |
|---|---|
| Correo | «correo» |
| Tipo de registro | «qué reto» |
| Docente | «imparte tu clase» |
| Seudónimo | «mediador en Qareth» |
| Nombre | «nombre» (y no «mediador») |
| Apellidos | «apellido» |
| Avatar | «avatar» |
| Confirmación del reto | empieza por «¿Has» |
| Evidencia | «enlace a tu recurso» |

Si cambias el título de alguna de estas preguntas, mantén esas palabras.

## Ajustes pendientes en el formulario

1. **¿Qué reto quieres registrar?** → marcarla como **obligatoria**.
2. Al final de la sección **Acuerdo de Confidencialidad** → «Después de la sección»: **Enviar formulario**.
3. Al final de la sección **Reto 1** → «Después de la sección»: **Enviar formulario**.
4. (Recomendado) En la sección del acuerdo, una casilla obligatoria **«¡Acepto la misión!»**.
5. (Recomendado) **Nombre** y **Apellido** obligatorios: los docentes los necesitan para las recompensas.

## En la hoja de cálculo

1. **Extensiones → Apps Script**: sustituye el código por el nuevo `apps-script/Codigo.gs`,
   guarda y vuelve a publicar (*Implementar → Gestionar implementaciones → editar → Versión: nueva*).
2. Recarga la hoja: aparece el menú **Qareth**.
   - **Preparar pestaña de docentes**: crea la pestaña «Docentes». Columna A: el nombre de cada docente
     igual que en el formulario (Ascen Robles, Alicia Moreno). Columna B (opcional): su correo de Google.
   - **Actualizar listados de docentes**: crea para cada docente su hoja privada con sus alumnos
     (seudónimo, nombre, apellidos, correo, avatar, puntos y, por cada reto, la fecha y el enlace a la evidencia).
   - **Activar actualización automática**: los listados se actualizan solos con cada envío.
