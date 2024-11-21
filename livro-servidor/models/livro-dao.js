const Livro = require("./livro-schema");

const obterLivros = async () => {
  try {
    return await Livro.find();
  } catch (error) {
    throw new Error("Erro ao obter livros: " + error.message);
  }
};

const incluir = async (livro) => {
  try {
    const novoLivro = new Livro({
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    });

    console.log('Livro a ser incluído:', novoLivro);
    
    await novoLivro.save();
    return novoLivro; 
  } catch (error) {
    throw new Error("Erro ao incluir livro: " + error.message);
  }
};


const excluir = async (codigo) => {
  try {
    console.log("Código recebido para exclusão:", codigo);
    await Livro.deleteOne({ _id: codigo });
  } catch (error) {
    throw new Error("Erro ao excluir livro: " + error.message);
  }
};


module.exports = {
  obterLivros,
  incluir,
  excluir,
};