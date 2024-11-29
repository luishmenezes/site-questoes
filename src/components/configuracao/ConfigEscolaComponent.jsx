import React, { useState, useEffect } from 'react';

const ConfigEscolaComponent = () => {
  const [materias, setMaterias] = useState([""]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tema, setTema] = useState("Claro");
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  
  const mockUserData = {
    nome: "João da Silva",
    email: "joao.silva@exemplo.com",
    senha: "******",
    tema: "Escuro",
    materias: ["Matemática", "Português", "Física"],
  };

  // Função para buscar dados do usuário (simulando API)
  const fetchUserData = () => {
    setLoading(true);  // Inicia o carregamento

    // Simulação de chamada de API com um setTimeout
    setTimeout(() => {
      try {
        // Simulando resposta bem-sucedida da API
        setNome(mockUserData.nome);
        setEmail(mockUserData.email);
        setSenha(mockUserData.senha);
        
        setMaterias(mockUserData.materias);

        setLoading(false);  // Dados carregados, altera o estado de carregamento
      } catch (err) {
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    }, 1000);  // Atraso de 1 segundo para simular tempo de carregamento
  };

  useEffect(() => {
    fetchUserData();  // Chama a função para "buscar" os dados assim que o componente for montado
  }, []);

  
  const handleInputChange = (index, value) => {
    const novasMaterias = [...materias];
    novasMaterias[index] = value;
    setMaterias(novasMaterias);
  };

  const adicionarCampo = () => {
    setMaterias([...materias, ""]);
  };

  const confirmarMaterias = () => {
    console.log("Matérias confirmadas:", materias);
    alert("Matérias confirmadas: " + materias.join(", "));
  };

  const salvarConfiguracoes = () => {
    console.log("Configurações salvas:", { nome, email, senha, tema, materias });
    alert("Configurações salvas com sucesso!");
  };

  if (loading) {
    return <div>Carregando...</div>;  
  }

  if (error) {
    return <div>Erro: {error}</div>;  
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Configuração de Conta</h1>

      
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

      

      <h2>Configuração de Matérias</h2>
      {materias.map((materia, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder={`Matéria ${index + 1}`}
            value={materia}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{ padding: "8px", width: "80%" }}
          />
        </div>
      ))}
      <button
        onClick={adicionarCampo}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Adicionar Campo
      </button>
      <button
        onClick={confirmarMaterias}
        style={{
          padding: "10px 20px",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Confirmar Matérias
      </button>

      <hr />

      <button
        onClick={salvarConfiguracoes}
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

export default ConfigEscolaComponent;
