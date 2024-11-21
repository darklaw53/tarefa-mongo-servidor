import { Livro } from '../modelo/Livro';
const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
    _id: string;
    codEditora: string;
    titulo: string;
    resumo: string;
    autores: Array<string>;
}

interface LivroMongoSend {
    codEditora: string;
    titulo: string;
    resumo: string;
    autores: Array<string>;
}

export class ControleLivro {
     public async obterLivros(): Promise<Livro[]> {

        try {
            const resposta = await fetch(baseURL);
            if (!resposta.ok) {
                throw new Error("Erro ao obter livros do servidor");
            }
            const livrosMongo: LivroMongo[] = await resposta.json(); 
            console.log("LIVROS", livrosMongo);

            return livrosMongo.map(livroMongo => new Livro(
                livroMongo._id,
                livroMongo.codEditora,
                livroMongo.titulo,
                livroMongo.resumo,
                livroMongo.autores
            ));
        } catch (erro) {
            console.error("Erro na obtenção dos livros:", erro);
            throw erro; 
        }
    }

    public async incluir(livro: Livro): Promise<boolean> {
        try {
            const livroMongo: LivroMongoSend = {
                codEditora: livro.codEditora,
                titulo: livro.titulo,
                resumo: livro.resumo,
                autores: livro.autores
            };
    
            console.log('Livro a ser incluído:', livroMongo);
    
            const resposta = await fetch(baseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(livroMongo)
            });
    
            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                console.error("Erro ao incluir livro, resposta do servidor:", erroTexto);
                throw new Error(`Erro ao incluir livro: ${erroTexto}`);
            }
    
            const resultado = await resposta.json();
            console.log("Resultado da inclusão:", resultado);
    
            return resultado.ok;
        } catch (erro) {
            console.error("Erro ao incluir livro:", erro);
            throw erro;
        }
    }

    public async excluir(codigo: string): Promise<boolean> {
        console.log(codigo);
        try {
            const resposta = await fetch(`${baseURL}/${codigo}`, {
                method: "DELETE" 
            });
            if (!resposta.ok) {
                throw new Error("Erro ao excluir o livro");
            }
            const resultado = await resposta.json();
            console.log("Resultado da exclusão:", resultado);
            return resultado.ok; 
        } catch (erro) {
            console.error("Erro ao excluir livro:", erro);
            throw erro; 
        }
    }
}