const dns = require("node:dns");
const mongoose = require("mongoose");
const { obtenerMongoDBUri } = require("./entorno");

// Ajuste solicitado por la consigna para la resolución DNS de Node.js.
// Si la red bloquea estos resolutores, consultar al docente antes de cambiarlos.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function conectarBaseDatos() {
  const uri = obtenerMongoDBUri();

  if (!uri || !uri.startsWith("mongodb+srv://")) {
    const error = new Error("Configuración inválida: MONGODB_URI falta o no usa mongodb+srv://");
    error.name = "ConfiguracionError";
    throw error;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    return mongoose.connection;
  } catch (error) {
    // No imprimir la URI: contiene credenciales privadas.
    console.error("No se pudo conectar con MongoDB.");
    console.error(`Tipo de error: ${error.name || "Error"}`);
    if (error.code) console.error(`Código: ${error.code}`);

    const cause = error.cause || error;
    if (cause.code) console.error(`Código de resolución/conexión: ${cause.code}`);
    if (cause.syscall) console.error(`Operación: ${cause.syscall}`);
    if (cause.hostname) console.error(`Host afectado: ${cause.hostname}`);
    throw error;
  }
}

async function cerrarBaseDatos() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = { conectarBaseDatos, cerrarBaseDatos };
