import React, { useState, useEffect } from 'react';

const ConfigProfessorComponent = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  
  const mockProfessorData = {
    nome: "Carlos Souza",
    email: "carlos.souza@exemplo.com",
    senha: "******",
    disciplina: "Matemática"
  };

  // Função para buscar dados do professor (simulando API)
  const fetchProfessorData = () => {
    setLoading(true);  

    // Simulação de chamada de API com um setTimeout
    setTimeout(() => {
      try {
        // Simulando resposta bem-sucedida da API
        setNome(mockProfessorData.nome);
        setEmail(mockProfessorData.email);
        setSenha(mockProfessorData.senha);
        setDisciplina(mockProfessorData.disciplina);

        setLoading(false);  // Dados carregados, altera o estado de carregamento
      } catch (err) {
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    }, 1000);  // Atraso de 1 segundo para simular tempo de carregamento
  };

  useEffect(() => {
    fetchProfessorData();  // Chama a função para "buscar" os dados assim que o componente for montado
  }, []);

  if (loading) {
    return <div>Carregando...</div>;  
  }

  if (error) {
    return <div>Erro: {error}</div>;  
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Configuração de Professor</h1>

      
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
        <label>Disciplina:</label>
        <input
          type="text"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        />
      </div>

      <hr />

      <button
        onClick={() => alert("Configurações de professor salvas com sucesso!")}
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

export default ConfigProfessorComponent;
