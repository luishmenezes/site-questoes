import React, { useRef, useState, useEffect } from "react";
import "./SimuladosComponent.css";
import documentoImg from "../assets/documents.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MinhasQuestoesComponent = () => {
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [listas, setListas] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/listas/professor/1");
        setListas(response.data);
      } catch (error) {
        console.error("Erro ao buscar as listas:", error.response || error.message || error);
      }
    };

    fetchListas();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    setMensagemSucesso(true);
    setTimeout(() => setMensagemSucesso(false), 5000);

    const formData = new FormData();
    formData.append("file", file);

    const apiUrl = "http://localhost:8080/serviceIA/processar-pdf";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        // Removendo a lógica que usa "questoes" se não for necessária
      })
      .catch((error) => {
        console.error("Erro ao processar o PDF:", error.response || error.message || error);
      });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="containerr">
        {mensagemSucesso && (
          <div className="alert-mensagem">Arquivo enviado com sucesso!</div>
        )}
        <div className="scanner">
          <img src={documentoImg} alt="Scanner Icon" className="scanner-icon" />
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <button className="scanner-button" onClick={triggerFileInput}>
            Scannerar Documento
          </button>
        </div>
        <div className="questoes-container">
          <h2>Listas Disponíveis</h2>
          {listas.map((lista, index) => (
            <div key={index} className="questao-card">
              <p className="lista-de">{lista.titulo || "Lista de"}</p>
              <div className="perfil">
                <img
                  src={documentoImg}
                  alt="Lista Icon"
                  className="foto"
                />
                <p className="nome">{lista.descricao || "Descrição da lista"}</p>
              </div>
              <button
                className="acessar-button"
                onClick={() => navigate(`/questoes/${lista.id}`)}
              >
                Acessar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinhasQuestoesComponent;
