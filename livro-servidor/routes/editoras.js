var express = require("express");
var router = express.Router();
var Editora = require("../models/editora");

router.get("/", async function (req, res, next) {
  try {
    const editoras = await Editora.find();
    res.json(editoras);
  } catch (err) {
    next(err);
  }
});

router.get("/:codEditora", async function (req, res, next) {
  try {
    const editora = await Editora.findOne({
      codEditora: req.params.codEditora,
    });
    if (editora) {
      res.json({ nome: editora.nome });
    } else {
      res.status(404).json({ message: "Editora não encontrada" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;