import React,{useState} from 'react'

const ConfigComponent = () => {
  const [materias, setMaterias] = useState([""]); 

  
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

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Configuração de conta</h1>
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
        Confirmar
      </button>
    </div>
  );
};

export default ConfigComponent;