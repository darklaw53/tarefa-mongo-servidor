import { Editora } from '../modelo/Editora';

const editoras: Array<Editora> = [
    { codEditora: "1", nome: "Alta Books" },
    { codEditora: "2", nome: "Bookman" },
    { codEditora: "3", nome: "Addison Wesley" },
    { codEditora: "4", nome: "Pearson" }
];

export class ControleEditora {
    getEditoras(): Array<Editora> {
        return editoras;
    }

    getNomeEditora(codEditora: string): string | undefined {
        const editora = editoras.find(e => e.codEditora === codEditora); 
        return editora ? editora.nome : undefined;  
    }
}