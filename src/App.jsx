// Este arquivo monta duas partes: acesso (App) e trabalho (Painel).
import { useEffect, useState } from 'react';
import { servico, perfis, MODO } from './api.js';

// PARTE 1: quem entra e quem sai.
export default function App() {
  const [token, setToken] = useState('');    // O texto digitado começa vazio.
  const [usuario, setUsuario] = useState(null); // null quer dizer: ninguém entrou ainda.
  const [erro, setErro] = useState('');   // A mensagem de erro começa vazia.

  function entra(e) {
    e.preventDefault();//Não deixe o formulario regarregar a pagina
    const perfil = Object.hasOwn(perfis, token.trim())
      ? perfis[token.trim()]
      : null;
    if (!perfil) {
      setErro('Identificação inválida');
      return; //Pare aqui: não pode entrar
    }
    setErro('');
    setUsuario({ ...perfil, token: token.trim() });//Guarde o perfil e o token para as proximas ações
  }
    // Sem usuário, mostre apenas o acesso.
    if (!usuario)
    return (
      <main className="pagina">
        <form onSubmit={entrar}>
          <h1>Acesso de estudo</h1>
          <p>Simulação: não use senha real.</p>
          <label>
            Identificação
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </label>
          {/* A mensagem só aparece quando erro tem texto. */}
          {erro && <p role="alert">{erro}</p>}
          <button>Entrar</button>
        </form>
      </main>
    );
   
  return <Painel usuario={null} sair={() => { }} />; // @APP_RETORNO
}

// PARTE 2: lista, busca, cadastro e ações nos chamados.
function Painel({ usuario, sair }) {
  // @PAINEL_ESTADOS
  // @CARREGAR
  // @BUSCA_ESTADO
  // @BUSCA_CALCULO
  // @FORM_ESTADO
  // @VALIDAR_FORM
  // @SALVAR
  // @EXCLUIR_ESTADO
  // @EXCLUIR
  // @MUDAR
  return (
    <main className="pagina">
      <h1>Minha Central de Chamados</h1>
      <p>Modo: {MODO}</p>
      {/* @USUARIO */}
      {/* @NAVEGACAO */}
      {/* @ERRO */}
      {/* @FORMULARIO */}
      {/* @BUSCA_CAMPO */}
      {/* @LISTA */}
    </main>
  );
}
