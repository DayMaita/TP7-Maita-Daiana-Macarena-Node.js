const { conectarBaseDatos, cerrarBaseDatos } = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reserva");

async function main() {
  let codigoSalida = 0;

  try {
    await conectarBaseDatos();
    const reservas = await Reserva.find();

    if (reservas.length === 0) {
      console.log("No hay reservas guardadas.");
    } else {
      reservas.forEach((reserva, indice) => {
        console.log(`\nReserva ${indice + 1}`);
        console.log(`_id: ${reserva._id.toString()}`);
        console.log(`Estudiante: ${reserva.estudiante}`);
        console.log(`Email: ${reserva.email}`);
        console.log(`Sala: ${reserva.sala}`);
        console.log(`Fecha: ${reserva.fecha}`);
        console.log(`Turno: ${reserva.turno}`);
        console.log(`Personas: ${reserva.personas}`);
      });
    }

    console.log(`\nCantidad recuperada: ${reservas.length}`);
  } catch (error) {
    codigoSalida = 1;
    console.error(`No se pudieron consultar las reservas (${error.name || "Error"}).`);
    if (error.name === "ConfiguracionError") console.error(error.message);
    else console.error("Revisá la configuración, DNS, IP permitida y credenciales de Atlas.");
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
