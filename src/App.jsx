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
        <form onSubmit={entra}>
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

  //Envie o usuario para a parte de trabalho
  return (
    <Painel
      usuario={usuario}
      sair={() => {
        //Sair apagar o acesso e a mensagem, sem fechar o navegador
        setUsuario(null);
        setToken('');
        setErro('');
      }}
    />
  );
}

// PARTE 2: lista, busca, cadastro e ações nos chamados.
function Painel({ usuario, sair }) {

  const [tela, setTela] = useState('lista');// Qual parte do painel está aberta?
  const [lista, setLista] = useState([]);// A lista começa sem registros e será preenchida pelo serviço.
  const [ocupado, setOcupado] = useState(false);// Enquanto uma ação roda, ocupado vale true.
  const [erro, setErro] = useState('');
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
      {/*O nome vem do usuaio que entrou, não de txto fixo */}
      <p>
        Olá, {usuario ?.nome}
        <button onClick={sair}>Sair</button>
      </p>
      <p>Boas-vindas, {usuario?.nome}</p>
      {/* Estes botões mudam apenas a tela aberta. */}
      <nav>
        <button onClick={() => setTela('lista')}>Chamados</button>
        <button onClick={() => setTela('novo')}>
          Novo chamado
          </button>
      </nav>
      <p>Tela: {tela}</p>

      {/* @ERRO */}
      {/* @FORMULARIO */}
      {/* @BUSCA_CAMPO */}
      {/* @LISTA */}
    </main>
  );
}
