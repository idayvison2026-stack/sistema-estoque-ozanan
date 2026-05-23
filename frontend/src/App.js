import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [aba, setAba] = useState('produtos');

  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);

  const [produtoEditando, setProdutoEditando] = useState(null);
  const [fornecedorEditando, setFornecedorEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [validade, setValidade] = useState('');

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [contatoPrincipal, setContatoPrincipal] = useState('');

  const [produtoId, setProdutoId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');

  useEffect(() => {

    buscarProdutos();
    buscarFornecedores();
    buscarAssociacoes();

  }, []);

  async function buscarProdutos() {

    const resposta = await axios.get(
      'https://sistema-estoque-ozanan.onrender.com/produtos'
    );

    setProdutos(resposta.data);

  }

  async function buscarFornecedores() {

    const resposta = await axios.get(
      'https://sistema-estoque-ozanan.onrender.com/fornecedores'
    );

    setFornecedores(resposta.data);

  }

  async function buscarAssociacoes() {

    const resposta = await axios.get(
      'https://sistema-estoque-ozanan.onrender.com/associacoes'
    );

    setAssociacoes(resposta.data);

  }

  async function salvarProduto() {

    if (
      !nome ||
      !descricao ||
      !categoria
    ) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    const dados = {
      nome,
      descricao,
      codigo_barras: codigoBarras,
      quantidade,
      categoria,
      validade
    };

    if (produtoEditando) {

      await axios.put(
        `https://sistema-estoque-ozanan.onrender.com/produtos/${produtoEditando}`,
        dados
      );

      alert('Produto atualizado com sucesso!');

      setProdutoEditando(null);

    } else {

      await axios.post(
        'https://sistema-estoque-ozanan.onrender.com/produtos',
        dados
      );

      alert('Produto cadastrado com sucesso!');

    }

    limparProduto();

    buscarProdutos();

  }

  function limparProduto() {

    setNome('');
    setDescricao('');
    setCodigoBarras('');
    setQuantidade('');
    setCategoria('');
    setValidade('');

  }

  function editarProduto(produto) {

    setProdutoEditando(produto.id);

    setNome(produto.nome);
    setDescricao(produto.descricao);
    setCodigoBarras(produto.codigo_barras);
    setQuantidade(produto.quantidade);
    setCategoria(produto.categoria);

  }

  async function excluirProduto(id) {

    if (!window.confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    await axios.delete(
      `https://sistema-estoque-ozanan.onrender.com/produtos/${id}`
    );

    alert('Produto excluído com sucesso!');

    buscarProdutos();

  }

  async function salvarFornecedor() {

    if (
      !nomeEmpresa ||
      !cnpj ||
      !endereco ||
      !telefone ||
      !email ||
      !contatoPrincipal
    ) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const dados = {
      nome_empresa: nomeEmpresa,
      cnpj,
      endereco,
      telefone,
      email,
      contato_principal: contatoPrincipal
    };

    if (fornecedorEditando) {

      await axios.put(
        `https://sistema-estoque-ozanan.onrender.com/fornecedores/${fornecedorEditando}`,
        dados
      );

      alert('Fornecedor atualizado com sucesso!');

      setFornecedorEditando(null);

    } else {

      await axios.post(
        'https://sistema-estoque-ozanan.onrender.com/fornecedores',
        dados
      );

      alert('Fornecedor cadastrado com sucesso!');

    }

    limparFornecedor();

    buscarFornecedores();

  }

  function limparFornecedor() {

    setNomeEmpresa('');
    setCnpj('');
    setEndereco('');
    setTelefone('');
    setEmail('');
    setContatoPrincipal('');

  }

  function editarFornecedor(fornecedor) {

    setFornecedorEditando(fornecedor.id);

    setNomeEmpresa(fornecedor.nome_empresa);
    setCnpj(fornecedor.cnpj);
    setEndereco(fornecedor.endereco);
    setTelefone(fornecedor.telefone);
    setEmail(fornecedor.email);
    setContatoPrincipal(fornecedor.contato_principal);

  }

  async function excluirFornecedor(id) {

    if (!window.confirm('Deseja realmente excluir este fornecedor?')) {
      return;
    }

    await axios.delete(
      `https://sistema-estoque-ozanan.onrender.com/fornecedores/${id}`
    );

    alert('Fornecedor excluído com sucesso!');

    buscarFornecedores();

  }

  async function associarFornecedor() {

    if (!produtoId || !fornecedorId) {
      alert('Selecione produto e fornecedor');
      return;
    }

    try {

      await axios.post(
        'https://sistema-estoque-ozanan.onrender.com/associacoes',
        {
          produto_id: produtoId,
          fornecedor_id: fornecedorId
        }
      );

      alert('Fornecedor associado com sucesso ao produto!');

      buscarAssociacoes();

    } catch {

      alert('Fornecedor já está associado a este produto!');

    }

  }

  async function removerAssociacao(id) {

    await axios.delete(
      `https://sistema-estoque-ozanan.onrender.com/associacoes/${id}`
    );

    alert('Fornecedor desassociado com sucesso!');

    buscarAssociacoes();

  }

  const produtoSelecionado = produtos.find(
    (produto) => produto.id === produtoId
  );

  return (
    <div style={{ padding: '20px' }}>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          background: '#f4f9ff',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}
      >

        <img
          src="/logo-ozanan.png"
          alt="Logo Ozanan"
          style={{
            width: '160px',
            height: 'auto'
          }}
        />

        <div>

          <h1
            style={{
              color: '#0077c8',
              margin: 0
            }}
          >
            Sistema de Estoque
          </h1>

          <h2
            style={{
              color: '#00a859',
              margin: 0
            }}
          >
            Ozanan Gráfica
          </h2>

        </div>

      </div>

      <button onClick={() => setAba('produtos')}>
        Produtos
      </button>

      <button onClick={() => setAba('fornecedores')}>
        Fornecedores
      </button>

      <button onClick={() => setAba('associacoes')}>
        Associações
      </button>

      <hr />

      {aba === 'produtos' && (
        <>

          <h2>
            {produtoEditando
              ? 'Editar Produto'
              : 'Cadastro de Produto'}
          </h2>

          <input
            placeholder="Insira o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <br /><br />

          <textarea
            placeholder="Descreva brevemente o produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Insira o código de barras"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
          />

          <br /><br />

          <input
            type="number"
            placeholder="Quantidade disponível"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <br /><br />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >

            <option value="">
              Selecione a categoria
            </option>

            <option value="Papéis">
              Papéis
            </option>

            <option value="Tintas">
              Tintas
            </option>

            <option value="Lonas">
              Lonas
            </option>

            <option value="Adesivos">
              Adesivos
            </option>

            <option value="Acabamento">
              Acabamento
            </option>

            <option value="Comunicação Visual">
              Comunicação Visual
            </option>

            <option value="Equipamentos">
              Equipamentos
            </option>

            <option value="Outro">
              Outro
            </option>

          </select>

          <br /><br />

          <input
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
          />

          <br /><br />

          <button onClick={salvarProduto}>
            {produtoEditando
              ? 'Atualizar Produto'
              : 'Cadastrar Produto'}
          </button>

          <hr />

          <h2>Produtos</h2>

          {produtos.map((produto) => (

            <div
              key={produto.id}
              style={{
                border: '1px solid gray',
                padding: '10px',
                marginBottom: '10px'
              }}
            >

              <h3>{produto.nome}</h3>

              <p>{produto.descricao}</p>

              <p>
                Código de Barras:
                {' '}
                {produto.codigo_barras}
              </p>

              <p>
                Categoria:
                {' '}
                {produto.categoria}
              </p>

              <p>
                Quantidade:
                {' '}
                {produto.quantidade}
              </p>

              <button
                onClick={() => editarProduto(produto)}
              >
                Editar
              </button>

              {' '}

              <button
                onClick={() =>
                  excluirProduto(produto.id)
                }
              >
                Excluir
              </button>

            </div>

          ))}

        </>
      )}

      {aba === 'fornecedores' && (
        <>

          <h2>
            {fornecedorEditando
              ? 'Editar Fornecedor'
              : 'Cadastro de Fornecedor'}
          </h2>

          <input
            placeholder="Insira o nome da empresa"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Insira o endereço completo da empresa"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="(00) 0000-0000"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="exemplo@fornecedor.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Nome do contato principal"
            value={contatoPrincipal}
            onChange={(e) =>
              setContatoPrincipal(e.target.value)
            }
          />

          <br /><br />

          <button onClick={salvarFornecedor}>
            {fornecedorEditando
              ? 'Atualizar Fornecedor'
              : 'Cadastrar Fornecedor'}
          </button>

          <hr />

          <h2>Fornecedores</h2>

          {fornecedores.map((fornecedor) => (

            <div
              key={fornecedor.id}
              style={{
                border: '1px solid gray',
                padding: '10px',
                marginBottom: '10px'
              }}
            >

              <h3>{fornecedor.nome_empresa}</h3>

              <p>CNPJ: {fornecedor.cnpj}</p>

              <p>Telefone: {fornecedor.telefone}</p>

              <p>E-mail: {fornecedor.email}</p>

              <p>
                Contato:
                {' '}
                {fornecedor.contato_principal}
              </p>

              <button
                onClick={() =>
                  editarFornecedor(fornecedor)
                }
              >
                Editar
              </button>

              {' '}

              <button
                onClick={() =>
                  excluirFornecedor(fornecedor.id)
                }
              >
                Excluir
              </button>

            </div>

          ))}

        </>
      )}

      {aba === 'associacoes' && (
        <>

          <h2>
            Associação de Fornecedor a Produto
          </h2>

          <select
            value={produtoId}
            onChange={(e) =>
              setProdutoId(e.target.value)
            }
          >

            <option value="">
              Selecione um produto
            </option>

            {produtos.map((produto) => (

              <option
                key={produto.id}
                value={produto.id}
              >
                {produto.nome}
              </option>

            ))}

          </select>

          <br /><br />

          {produtoSelecionado && (
            <div>

              <h3>Detalhes do Produto</h3>

              <p>
                Nome:
                {' '}
                {produtoSelecionado.nome}
              </p>

              <p>
                Código:
                {' '}
                {produtoSelecionado.codigo_barras}
              </p>

              <p>
                Descrição:
                {' '}
                {produtoSelecionado.descricao}
              </p>

            </div>
          )}

          <br />

          <select
            value={fornecedorId}
            onChange={(e) =>
              setFornecedorId(e.target.value)
            }
          >

            <option value="">
              Selecione um fornecedor
            </option>

            {fornecedores.map((fornecedor) => (

              <option
                key={fornecedor.id}
                value={fornecedor.id}
              >
                {fornecedor.nome_empresa}
              </option>

            ))}

          </select>

          <br /><br />

          <button onClick={associarFornecedor}>
            Associar Fornecedor
          </button>

          <hr />

          <h2>Fornecedores Associados</h2>

          {associacoes.map((associacao) => (

            <div
              key={associacao.id}
              style={{
                border: '1px solid gray',
                padding: '10px',
                marginBottom: '10px'
              }}
            >

              <h3>{associacao.produto}</h3>

              <p>
                Fornecedor:
                {' '}
                {associacao.fornecedor}
              </p>

              <button
                onClick={() =>
                  removerAssociacao(associacao.id)
                }
              >
                Desassociar Fornecedor
              </button>

            </div>

          ))}

        </>
      )}

    </div>
  );

}

export default App;