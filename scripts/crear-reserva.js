const { conectarBaseDatos, cerrarBaseDatos } = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reserva");

async function main() {
  let codigoSalida = 0;

  try {
    await conectarBaseDatos();

    const datosReserva = {
      estudiante: "Estudiante de prueba",
      email: "estudiante.prueba@example.com",
      sala: "Sala Norte",
      fecha: "2026-10-20",
      turno: "Mañana",
      personas: 3,
    };

    const reserva = new Reserva(datosReserva);
    await reserva.save();

    // El éxito se anuncia únicamente después de que save() termina correctamente.
    console.log("Reserva guardada correctamente.");
    console.log(`_id: ${reserva._id.toString()}`);
    console.log(`Estudiante: ${reserva.estudiante}`);
    console.log(`Sala: ${reserva.sala}`);
    console.log(`Fecha: ${reserva.fecha}`);
    console.log(`Turno: ${reserva.turno}`);
    console.log(`Personas: ${reserva.personas}`);
  } catch (error) {
    codigoSalida = 1;
    console.error(`No se pudo guardar la reserva (${error.name || "Error"}).`);

    if (error.name === "ValidationError") {
      for (const [campo, detalle] of Object.entries(error.errors)) {
        console.error(`- ${campo}: ${detalle.message}`);
      }
    } else if (error.name === "CastError") {
      console.error(`Campo a revisar: ${error.path}. Valor no convertible al tipo esperado.`);
    } else if (error.name === "ConfiguracionError") {
      console.error(error.message);
    } else {
      console.error("Revisá la conexión, el acceso a Atlas y la configuración privada.");
    }
  } finally {
    try {
      await cerrarBaseDatos();
    } catch {
      codigoSalida = 1;
      console.error("No se pudo cerrar correctamente la conexión.");
    }
  }

  process.exitCode = codigoSalida;
}

main();
