const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema(
  {
    Ingresos: {
      type: Number,
      required: true,
    },
    Gastos: {
      type: Number,
      required: true,
      default: 0,
    },
    fecha: {
      type: Date,
      required: true,
    },
    notas: {
      type: String,
      // required: true,
    },
    maquinas: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Balance = new mongoose.model("Balance", BalanceSchema);
module.exports = Balance;
