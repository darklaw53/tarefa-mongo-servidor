import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head'; 
import { Menu } from '../componentes/Menu';
import { ControleLivro } from '../classes/controle/ControleLivro'; 
import LinhaLivro from '../componentes/LinhaLivro';
import { Livro } from '../classes/modelo/Livro';

const LivroLista: NextPage = () => {
    const controleLivros = new ControleLivro(); 
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        controleLivros.obterLivros().then(dados => {
            setLivros(dados);
            setCarregado(true);
        });
    }, []);

    const excluir = (codigo: string): Promise<void> => {
        return controleLivros.excluir(codigo).then(() => {
            setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
            setCarregado(false); 
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
                <meta name="description" content="Exibição de livros cadastrados" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Menu />
            <main>
                <h1>Catálogo de Livros</h1>
                {carregado ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: 'black', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px' }}>Título</th>
                                <th style={{ padding: '10px' }}>Resumo</th>
                                <th style={{ padding: '10px' }}>Editora</th>
                                <th style={{ padding: '10px' }}>Autores</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro, index) => (
                                <LinhaLivro 
                                    key={index} 
                                    livro={livro} 
                                    excluir={excluir} 
                                    index={index} 
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando livros...</p>
                )}
            </main>
        </div>
    );
};

export default LivroLista;