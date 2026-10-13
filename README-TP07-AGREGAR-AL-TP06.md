# TP 07 - Persistencia inicial de reservas de salas

## Importante
Este kit agrega el laboratorio MongoDB al TP 06. Copiá estos archivos dentro de una **copia** del TP 06 llamada `tp-07-salas-mongodb`. No reemplaces la aplicación Express, sus rutas, controladores, vistas ni servicio en memoria.

Si ya existe `.gitignore`, fusioná las entradas necesarias en vez de borrar reglas previas. Si ya existe `src/configuracion.js`, trasladá su configuración HTTP a `src/config/entorno.js` y actualizá sus importaciones antes de eliminar el archivo viejo.

## Requisitos
- Node.js con soporte para `--env-file` (Node 20.6 o posterior recomendado).
- MongoDB Atlas Free (M0), base `reservas_salas_u7`.
- Usuario de base de datos con permisos de lectura y escritura.
- IP de tu conexión agregada en Network Access de Atlas.
- Mongoose instalado en el proyecto.

## Instalación
Desde la raíz del proyecto:

```bash
npm install mongoose
```

Copiá `.env.example` como `.env` y reemplazá `USUARIO`, `CLAVE` y `HOST` por la URI que ofrece Atlas para Node.js. Conservá las opciones de la URI. No compartas ni subas `.env`.

En Windows CMD podés copiar la plantilla con:

```bat
copy .env.example .env
```

Editá `.env` con Visual Studio Code. Si la contraseña contiene caracteres reservados de URL, codificalos según las indicaciones de Atlas.

## Comandos
```bash
node --env-file=.env scripts/comprobar-conexion.js
node --env-file=.env scripts/crear-reserva.js
node --env-file=.env scripts/listar-reservas.js
```

Cada ejecución de `crear-reserva.js` intenta guardar una nueva reserva ficticia. Ejecutarlo dos veces puede crear dos documentos diferentes aunque sus campos sean iguales. No se borran documentos automáticamente.

## Persistencia y ObjectId
Mongoose utiliza la colección explícita `reservas` y MongoDB asigna un `_id` ObjectId. Ver un `_id` en un objeto construido en memoria no demuestra una escritura: la confirmación de este programa aparece después de que `save()` finaliza correctamente. La consulta desde otro proceso y la coincidencia del mismo `_id` demuestran la persistencia.

## Modelo y límites
- `estudiante`: texto obligatorio, recortado y no vacío.
- `email`: texto obligatorio, recortado y con `@`.
- `sala`: `Sala Norte`, `Sala Sur` o `Sala Multimedia`.
- `fecha`: texto obligatorio no vacío.
- `turno`: `Mañana`, `Tarde` o `Noche`.
- `personas`: número obligatorio, entero entre 1 y 6.

Estas validaciones no verifican que el email sea completamente válido, que la fecha exista en el calendario o sea futura, ni impiden turnos superpuestos, cupos compartidos o reservas repetidas.

## Atlas y DNS
En Atlas, creá un clúster Free (M0), un usuario de base de datos con lectura/escritura y una regla de Network Access para tu IP. En Connect elegí la opción de conexión para aplicación/Node.js y colocá la URI privada en `.env`, con la base `reservas_salas_u7`.

`src/config/base-datos.js` configura los resolutores DNS `8.8.8.8` y `1.1.1.1` antes de conectar, tal como pide el enunciado. Esto afecta la resolución DNS usada por Node.js; no cambia la autenticación ni la lista de IP permitidas. Si la red bloquea esos resolutores o el docente indicó otros, documentá el ajuste autorizado y la evidencia real. No publiques la URI ni mensajes que incluyan credenciales.

## Evidencia reproducible
Completá esta sección con tus resultados reales; no inventes cantidades ni identificadores.

| Prueba | Cantidad antes | Cantidad después | Resultado observado / `_id` |
|---|---:|---:|---|
| Listado inicial | | | |
| Crear reserva válida | | | |
| Listado en proceso nuevo | | | |
| Segunda consulta | | | |
| Estudiante vacío | | | |
| Email sin `@` | | | |
| Sala o turno inválido | | | |
| Fecha vacía | | | |
| Personas 0, 7 y 2.5 | | | |
| Personas con texto | | | |
| URI vacía | | | |
| Contraseña incorrecta temporal | | | |

Procedimiento: listar y anotar cantidad; crear y copiar el `_id`; esperar que el proceso termine; listar en un proceso nuevo y comprobar el mismo `_id` y un incremento de uno; volver a listar y comprobar que la cantidad no cambió. Tomá también una captura de Atlas Data Explorer mostrando `reservas_salas_u7`, la colección `reservas` y el documento con ese mismo `_id`, sin mostrar credenciales.

Para pruebas inválidas, modificá un solo campo de `datosReserva` por vez y restauralo al terminar. Confirmá que la cantidad no cambia. Para probar URI ausente, dejá temporalmente `MONGODB_URI` vacía en `.env`; para autenticación, usá temporalmente una contraseña incorrecta y restaurá luego la URI válida. No cambies la contraseña en Atlas.

## Calidad y sitio web
Fusioná los scripts del `package.json` con los existentes del TP 06; no elimines scripts anteriores. La consigna requiere que `format` ejecute `prettier --write src scripts`, que `check` ejecute `prettier --check src scripts` y `eslint src scripts`. Actualizá `eslint.config.js` para incluir `src/**/*.js` y `scripts/**/*.js`, conservando las reglas existentes.

Ejecutá `npm run format` y `npm run check`. Después `npm start` y comprobá inicio, `/estado`, listado, envío válido (redirección y creación en memoria), envío inválido (400), CSS y 404. Anotá resultados reales.

Las rutas HTTP continúan utilizando el servicio en memoria del TP 06. Este TP no migra los controladores ni conecta las reservas del laboratorio con las vistas; esa integración queda para la unidad 8.

## Seguridad y entrega
- Versioná `.env.example`, no `.env`.
- No publiques contraseñas, URI privada ni datos personales.
- Conservá `package-lock.json`.
- No subas `node_modules`.
- Entregá la URL del repositorio individual de GitHub.
