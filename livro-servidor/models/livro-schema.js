const mongoose = require("mongoose");
require("./conexao");

const LivroSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    codEditora: { type: String, required: true },
    titulo: { type: String, required: true },
    resumo: { type: String, required: true },
    autores: { type: [String], required: true },
  },
  {
    collection: "livros",
    versionKey: false,
  }
);

const Livro = mongoose.model("Livro", LivroSchema);

module.exports = Livro;