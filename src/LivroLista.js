import React, { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = ({ livro, excluir }) => {
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  const handleExcluir = () => {
    excluir(livro.codigo);
  };

  return (
    <tr>
      <td>{livro.titulo} <br/><button class="btn btn-danger" onClick={handleExcluir}>Excluir</button></td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const obterLivros = async () => {
      const livrosObtidos = controleLivro.obterLivros();
      setLivros(livrosObtidos);
      setCarregado(true);
    };

    if (!carregado) {
      obterLivros();
    }
  }, [carregado]);

  const handleExcluir = (codigoLivro) => {
    controleLivro.excluir(codigoLivro);
    setCarregado(false);
  };

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} excluir={handleExcluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
