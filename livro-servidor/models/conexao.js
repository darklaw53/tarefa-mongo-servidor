const mongoose = require("mongoose");

const banco = mongoose.connect("mongodb://localhost:27017/livraria", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

banco
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

module.exports = banco;
