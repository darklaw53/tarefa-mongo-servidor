const express = require("express");
const router = express.Router();
const { obterLivros, incluir, excluir } = require("../models/livro-dao");
const Livro = require("../models/livro-schema");

router.get("/", async (req, res) => {
  try {
    const livros = await obterLivros();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter livros." });
  }
});

router.post("/", async (req, res) => {
  console.log("Dados recebidos:", req.body);
  try {
    const livro = req.body;

    if (!livro.titulo || !livro.resumo || !livro.autores || livro.autores.length === 0) {
      return res.status(400).json({ error: "Dados incompletos. Título, resumo e autores são obrigatórios." });
    }

    const novoLivro = new Livro(livro);

    await novoLivro.save();

    res.status(201).json(novoLivro);
  } catch (error) {
    console.error("Erro ao incluir livro:", error.message, error.stack);
    res.status(500).json({ error: "Erro ao incluir o livro.", message: error.message });
  }
});

router.delete("/:codigo", async (req, res) => {
  try {
    const codigo = req.params.codigo;
    await excluir(codigo);
    res.json({ message: "Livro excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o livro." });
  }
});

module.exports = router;