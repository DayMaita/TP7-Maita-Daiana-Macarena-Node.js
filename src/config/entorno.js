const obtenerPuerto = () => Number(process.env.PORT) || 3000;

const obtenerEntorno = () => process.env.NODE_ENV || "development";

const obtenerMongoDBUri = () => process.env.MONGODB_URI?.trim();

module.exports = {
  obtenerPuerto,
  obtenerEntorno,
  obtenerMongoDBUri,
};
