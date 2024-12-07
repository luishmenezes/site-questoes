import React, { useRef, useState, useEffect } from "react";
import "./SimuladosComponent.css";
import documentoImg from "../assets/documents.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";  


const MinhasQuestoesComponent = () => {
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [listas, setListas] = useState([]);
  const [modalListasOpen, setModalListasOpen] = useState(false);
  const [modalAddListOpen, setModalAddListOpen] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [questoes, setQuestoes] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchListas = async () => {
      try {
        const response = await axios.get("https://bancodequestoes-production.up.railway.app/listas/professor/1");
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
    const formData = new FormData();
    formData.append("file", file);


    const apiUrl = "https://bancodequestoes-production.up.railway.app/serviceIA/processar-pdf";


    axios
      .post(apiUrl, formData)
      .then((response) => {
        setQuestoes(response.data.questoes || []);
        setModalListasOpen(true);
      })
      .catch((error) => {
        console.error("Erro ao processar o PDF:", error.response || error.message || error);
      });
  };


  const handleEnviarParaLista = async (listaId) => {
    try {
      const apiUrl = `https://bancodequestoes-production.up.railway.app/listas/salvar-questoes-do-pdf/${listaId}`;
      await axios.post(apiUrl, { listaId, questoes });
      setMensagemSucesso(true);
      setTimeout(() => setMensagemSucesso(false), 5000);
      setModalListasOpen(false);
    } catch (error) {
      console.error("Erro ao salvar questões na lista:", error.response || error.message || error);
    }
  };


  const handleAddList = async () => {
    try {
      const response = await axios.post(`https://bancodequestoes-production.up.railway.app/listas?titulo=${novoTitulo}&professorId=1`);
      setListas((prevListas) => [...prevListas, response.data]);
      setNovoTitulo("");
      setModalAddListOpen(false);
      setMensagemSucesso(true);
      setTimeout(() => setMensagemSucesso(false), 5000);
    } catch (error) {
      console.error("Erro ao adicionar lista:", error.response || error.message || error);
    }
  };


  const handleCloseModal = () => {
    setModalListasOpen(false);
    setModalAddListOpen(false);
  };


  return (
    <div>
      <div className="containerr">
        {mensagemSucesso && (
          <div className="alert-mensagem">Questões adicionadas com sucesso!</div>
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
          <button className="scanner-button" onClick={() => fileInputRef.current.click()}>
            Scannerar Documento
          </button>
        </div>
        <button className="adicionar-lista-button" onClick={() => setModalAddListOpen(true)}>
          Adicionar Nova Lista
        </button>
        <div className="questoes-container">
          <h2>Listas Disponíveis</h2>
          {listas.map((lista) => (
            <div key={lista.id} className="questao-card">
              <div className="ellipsis-icon">
                <FaEllipsisV />
                <div className="options">
                  <button onClick={() => console.log("Editar Lista")}>Editar</button>
                  <button onClick={() => console.log("Deletar Lista")}>Deletar</button>
                </div>
              </div>
              <p className="lista-de">{lista.titulo || "Lista sem título"}</p>
              <div className="perfil">
                <img src={documentoImg} alt="Lista Icon" className="foto" />
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


      {modalListasOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Selecione a Lista</h2>
            <div className="questoes-container">
              {listas.length > 0 ? (
                listas.map((lista) => (
                  <div key={lista.id} className="questao-card">
                    <p className="lista-de">{lista.titulo || "Lista sem título"}</p>
                    <button
                      className="acessar-button"
                      onClick={() => handleEnviarParaLista(lista.id)}
                    >
                      Enviar para esta Lista
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-message">Nenhuma lista disponível.</p>
              )}
            </div>
            <div className="modal-actions">
              <button className="modal-button cancelar" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      {modalAddListOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Nova Lista</h2>
            <input
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              placeholder="Título da Lista"
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="modal-button salvar" onClick={handleAddList}>
                Salvar
              </button>
              <button
                className="modal-button cancelar"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default MinhasQuestoesComponent;