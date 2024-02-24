const express = require("express");

const router = express.Router();

const BalanceControllers = require("../controllers/balance.controller");
const { authenticate } = require("../config/jwt.config");

//rutas basicas del CRUD
router.post("", BalanceControllers.CreateBalance);
router.get("", authenticate, BalanceControllers.getBalance);
router.get("/:id", authenticate, BalanceControllers.getBalanceId);
router.put("/:id", authenticate, BalanceControllers.UpdateBalance);
router.delete("/:id", authenticate, BalanceControllers.DeleteBalance);

module.exports = router;
