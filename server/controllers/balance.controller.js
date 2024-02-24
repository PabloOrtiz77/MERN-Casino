const Balance = require("../models/balance.model");

module.exports.getBalance = async (req, res) => {
  try {
    findBalance = await Balance.find().sort({ name: 1 }); //ordena alfabeticamente
    res.status(200);
    res.json(findBalance);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
module.exports.getBalanceId = async (req, res) => {
  try {
    findBalanceId = await Balance.findById(req.params.id);
    res.status(200);
    res.json(findBalanceId);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.CreateBalance = async (req, res) => {
  try {
    const crearBalance = await Balance.create(req.body);
    res.status(201); //201 significa creado
    res.json(crearBalance);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.UpdateBalance = async (req, res) => {
  try {
    const updateBalance = await Balance.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true } //runvalidators lo que hace es que vuelve a revalidar
    );
    res.status(201); //201 significa creado
    res.json(updateBalance);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.DeleteBalance = async (req, res) => {
  try {
    const deleteBalance = await Balance.deleteOne({
      _id: req.params.id,
    });
    res.status(200);
    res.json(deleteBalance);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

//
