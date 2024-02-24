const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/Casino";
mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log("Error en la DB " + error));
