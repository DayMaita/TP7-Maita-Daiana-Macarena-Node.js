const { conectarBaseDatos, cerrarBaseDatos } = require("../src/config/base-datos");

async function main() {
  let codigoSalida = 0;
  try {
    await conectarBaseDatos();
    console.log("Conexión con MongoDB Atlas confirmada.");
  } catch (error) {
    codigoSalida = 1;
    if (error.name === "ConfiguracionError") {
      console.error(error.message);
    } else {
      console.error("La conexión no pudo completarse. Revisá el servidor, DNS, IP permitida y credenciales.");
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
