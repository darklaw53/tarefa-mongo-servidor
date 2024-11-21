var mongoose = require("mongoose");

var editoraSchema = new mongoose.Schema({
  codEditora: Number,
  nome: String,
});

module.exports = mongoose.model("Editora", editoraSchema);
