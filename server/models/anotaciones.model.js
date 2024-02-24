const mongoose = require("mongoose");

const AnotacionesSchema = new mongoose.Schema(
  {
    maquina: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Maquina",
      required: true,
    },
    entrada: {
      type: Number,
      required: true,
    },
    salida: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Anotaciones = mongoose.model("Anotaciones", AnotacionesSchema);
module.exports = Anotaciones;
