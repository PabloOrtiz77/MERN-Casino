const express = require("express");

const router = express.Router();

const MaquinasControllers = require("../controllers/maquina.controller");
const { authenticate } = require("../config/jwt.config");

//rutas basicas del CRUD
router.post("", MaquinasControllers.CreateMaquinas);
router.get("", authenticate, MaquinasControllers.getMaquinas);
router.get("/:id", authenticate, MaquinasControllers.getMaquinasId);
router.put("/:id", authenticate, MaquinasControllers.UpdateMaquina);
router.delete("/:id", authenticate, MaquinasControllers.DeleteMaquina);

module.exports = router;
