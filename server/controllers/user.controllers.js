const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const secretKey = process.env.JWT_SECRET_KEY;

module.exports.getUser = async (req, res) => {
  try {
    findUser = await User.find().sort({ name: 1 }); //ordena alfabeticamente
    res.status(200);
    res.json(findUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    findUserId = await User.findById(req.params.id);
    res.status(200);
    res.json(findUserId);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.CreateUser = async (req, res) => {
  try {
    const crearUser = await User.create(req.body);
    res.status(201); //201 significa creado
    res.json(crearUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.UpdateUser = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true } //runvalidators lo que hace es que vuelve a revalidar
    );
    res.status(201); //201 significa creado
    res.json(updateUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.DeleteUser = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({
      _id: req.params.id,
    });
    res.status(200);
    res.json(deleteUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

//Metodos Login
//Aca haremos la parte de login
module.exports.Login = async (req, res) => {
  //Pasos del Logeo

  try {
    //Buscar Usuario
    const usuario = await User.findOne({ email: req.body.email });
    //Si no existe paro y retorno resultado
    if (usuario === null) {
      res.status(404);
      res.json({
        errors: {
          email: {
            message: "usuario no encontrado",
          },
        },
      });
      return;
    }
    //Si existe revisamos contraseñas
    const validatePassword = await bcrypt.compare(
      req.body.password,
      usuario.password
    );

    //Si contraseña no existe paro y retorno resultado
    if (!validatePassword) {
      res.status(401);
      res.json({
        errors: {
          password: {
            message: "Contraseña incorrecta",
          },
        },
      });
      return;
    }
    //Si contra OK generar jwt y cookie
    const newJWT = jwt.sign({ _id: usuario._id }, secretKey, {
      expiresIn: "50 minutes",
    });
    res.cookie("userToken", newJWT, {
      httpOnly: true,
    });
    res.status(200);
    res.json({ message: "Loged OK" });
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};

//Fin parte del login

module.exports.cookie = async (req, res) => {
  try {
    res.cookie("mycookie", secretKey, { httpOnly: true });
    res.json({ message: "ok" });
  } catch (error) {
    res.json(error);
  }
};

//Para cerrar la sesion y borrar cookies
module.exports.logOut = async (req, res) => {
  try {
    res.clearCookie("userToken"); // Eliminar la cookie de sesión
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
