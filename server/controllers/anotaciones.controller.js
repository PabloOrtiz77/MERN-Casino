const Anotaciones = require("../models/anotaciones.model");

module.exports.getAnotaciones = async (req, res) => {
  try {
    findAnotaciones = await Anotaciones.find().sort({ name: 1 }); //ordena alfabeticamente
    res.status(200);
    res.json(findAnotaciones);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
module.exports.getAnotacionesId = async (req, res) => {
  try {
    findAnotacionesId = await Anotaciones.findOne({ maquina: req.params.id });
    res.status(200);
    res.json(findAnotacionesId);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.CreateAnotaciones = async (req, res) => {
  try {
    const crearAnotaciones = await Anotaciones.create(req.body);
    res.status(201); //201 significa creado
    res.json(crearAnotaciones);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.UpdateAnotaciones = async (req, res) => {
  try {
    const updateAnotaciones = await Anotaciones.findOneAndUpdate(
      { maquina: req.params.id },
      req.body,
      { new: true, runValidators: true } //runvalidators lo que hace es que vuelve a revalidar
    );
    res.status(201); //201 significa creado
    res.json(updateAnotaciones);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.DeleteAnotaciones = async (req, res) => {
  try {
    const deleteAnotaciones = await Anotaciones.deleteOne({
      _id: req.params.id,
    });
    res.status(200);
    res.json(deleteAnotaciones);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

//
