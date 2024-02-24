const express = require("express");

const router = express.Router();

const UserControllers = require("../controllers/user.controllers");
const { authenticate } = require("../config/jwt.config");

router.get("/cookie", authenticate, UserControllers.cookie);

//Rutas de sesion
router.post("/session", UserControllers.Login);
router.delete("/session", UserControllers.logOut);

//rutas basicas del CRUD
router.post("", UserControllers.CreateUser);
router.get("", authenticate, UserControllers.getUser);
router.get("/:id", authenticate, UserControllers.getUserById);
router.put("/:id", authenticate, UserControllers.UpdateUser);
router.delete("/:id", authenticate, UserControllers.DeleteUser);

module.exports = router;
