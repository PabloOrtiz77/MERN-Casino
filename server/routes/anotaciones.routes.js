const express = require("express");

const router = express.Router();

const AnotacionesControllers = require("../controllers/anotaciones.controller");
const { authenticate } = require("../config/jwt.config");

//rutas basicas del CRUD
router.post("", AnotacionesControllers.CreateAnotaciones);
router.get("", authenticate, AnotacionesControllers.getAnotaciones);
router.get("/:id", authenticate, AnotacionesControllers.getAnotacionesId);
router.put("/:id", authenticate, AnotacionesControllers.UpdateAnotaciones);
router.delete("/:id", authenticate, AnotacionesControllers.DeleteAnotaciones);

module.exports = router;
