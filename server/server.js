require("dotenv").config(); //para tener acceso a mis variables de entorno
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //este es para poder trabajar con react
require("./config/conexion");

const app = express();
const port = 8000;

//midlewares
app.use(cookieParser()); //Permite hacer las lecturas de las cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Routes
//Ruta Usuarios
const userRutes = require("./routes/user.routes");
app.use("/api/user", userRutes);

//Ruta Maquinas
const maquinasRutes = require("./routes/maquinas.routes");
app.use("/api/maquinas", maquinasRutes);

//Ruta Anotaciones
const anotacionesRutes = require("./routes/anotaciones.routes");
app.use("/api/anotaciones", anotacionesRutes);

//Ruta Balance
const balanceRutes = require("./routes/balance.routes");
app.use("/api/balance", balanceRutes);

app.listen(port, () => console.log(`server run on port ${port}`));
