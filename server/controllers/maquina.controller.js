const Maquina = require("../models/maquinas.model");

module.exports.getMaquinas = async (req, res) => {
  try {
    findMaquinas = await Maquina.find().sort({ name: 1 }); //ordena alfabeticamente
    res.status(200);
    res.json(findMaquinas);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
module.exports.getMaquinasId = async (req, res) => {
  try {
    findMaquinasId = await Maquina.findById(req.params.id);
    res.status(200);
    res.json(findMaquinasId);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.CreateMaquinas = async (req, res) => {
  try {
    const crearMaquina = await Maquina.create(req.body);
    res.status(201); //201 significa creado
    res.json(crearMaquina);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.UpdateMaquina = async (req, res) => {
  try {
    const updateMaquina = await Maquina.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true } //runvalidators lo que hace es que vuelve a revalidar
    );
    res.status(201); //201 significa creado
    res.json(updateMaquina);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.DeleteMaquina = async (req, res) => {
  try {
    const updateMaquina = await Maquina.deleteOne({
      _id: req.params.id,
    });
    res.status(200);
    res.json(updateMaquina);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

//
