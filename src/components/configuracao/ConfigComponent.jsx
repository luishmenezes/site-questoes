
import React,{ useState, useEffect} from 'react'
import { Link} from 'react-router-dom'; 


const ConfigComponent = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  
  const mockAlunoData = {
    nome: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    senha: "******",
    dataNascimento: "2000-05-15"
  };

  // Função para buscar dados do aluno (simulando API)
  const fetchAlunoData = () => {
    setLoading(true);  // Inicia o carregamento

    // Simulação de chamada de API com um setTimeout
    setTimeout(() => {
      try {
        // Simulando resposta bem-sucedida da API
        setNome(mockAlunoData.nome);
        setEmail(mockAlunoData.email);
        setSenha(mockAlunoData.senha);
        setDataNascimento(mockAlunoData.dataNascimento);

        setLoading(false);  // Dados carregados, altera o estado de carregamento
      } catch (err) {
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    }, 1000);  // Atraso de 1 segundo para simular tempo de carregamento
  };

  useEffect(() => {
    fetchAlunoData();  // Chama a função para "buscar" os dados assim que o componente for montado
  }, []);

 

  if (error) {
    return <div>Erro: {error}</div>;  
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Configuração de conta</h1>

      
      <div style={{ marginBottom: "10px" }}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          readOnly
          style={{
            padding: "8px",
            width: "100%",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
          }}
        />
      </div>

      
      <div style={{ marginBottom: "10px" }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          readOnly
          style={{
            padding: "8px",
            width: "100%",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
          }}
        />
      </div>

      
      <div style={{ marginBottom: "10px" }}>
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          readOnly
          style={{
            padding: "8px",
            width: "100%",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
          }}
        />
      </div>

     
      <div style={{ marginBottom: "10px" }}>
        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        />
      </div>

      <hr />

      <button
        onClick={() => alert("Configurações de aluno salvas com sucesso!")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF9800",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Salvar Configurações
      </button>
    </div>
  );
};


export default ConfigComponent;