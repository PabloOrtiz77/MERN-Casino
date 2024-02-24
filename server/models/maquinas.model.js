const mongoose = require("mongoose");

const MaquinaSchema = new mongoose.Schema(
  {
    nombreMaquina: {
      type: String,
      required: true,
    },
    capacidad: {
      type: Number,
      required: true,
      enum: [100, 50, 10],
    },
  },
  { timestamps: true, versionKey: false }
);

const Maquina = new mongoose.model("Maquina", MaquinaSchema);
module.exports = Maquina;
