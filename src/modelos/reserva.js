const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema(
  {
    estudiante: {
      type: String,
      required: [true, "El estudiante es obligatorio"],
      trim: true,
      validate: {
        validator: (valor) => valor.length > 0,
        message: "El estudiante no puede quedar vacío",
      },
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      trim: true,
      match: [/@/, "El email debe contener @"],
    },
    sala: {
      type: String,
      required: [true, "La sala es obligatoria"],
      enum: {
        values: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
        message: "La sala debe ser Sala Norte, Sala Sur o Sala Multimedia",
      },
    },
    fecha: {
      type: String,
      required: [true, "La fecha es obligatoria"],
      trim: true,
      validate: {
        validator: (valor) => valor.length > 0,
        message: "La fecha no puede quedar vacía",
      },
    },
    turno: {
      type: String,
      required: [true, "El turno es obligatorio"],
      enum: {
        values: ["Mañana", "Tarde", "Noche"],
        message: "El turno debe ser Mañana, Tarde o Noche",
      },
    },
    personas: {
      type: Number,
      required: [true, "La cantidad de personas es obligatoria"],
      min: [1, "Debe haber al menos 1 persona"],
      max: [6, "No se permiten más de 6 personas"],
      validate: {
        validator: Number.isInteger,
        message: "La cantidad de personas debe ser un número entero",
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Reserva", reservaSchema, "reservas");
