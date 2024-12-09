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
  const [modalEditListOpen, setModalEditListOpen] = useState(false); 
  const [novoTitulo, setNovoTitulo] = useState("");
  const [questoes, setQuestoes] = useState([]);
  const [menuAberto, setMenuAberto] = useState(null); 
  const [listaParaEditar, setListaParaEditar] = useState(null); 
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    
    const professorId = localStorage.getItem("usuarioId");


    if (!professorId) {
      console.error("Nenhum ID de professor encontrado no localStorage!");
      return;
    }

    console.log("ID do professor logado:", professorId);


    const fetchListas = async () => {
      try {
        const response = await axios.get(
          `https://bancodequestoes-production.up.railway.app/listas/professor/${professorId}`
        );
        setListas(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar as listas:",
          error.response || error.message || error
        );
      }
    };


    fetchListas();
  }, []);
  const handleOpenAddListModal = () => {
    setNovoTitulo(""); 
    setModalAddListOpen(true);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };


  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);


    const apiUrl =
      "https://bancodequestoes-production.up.railway.app/serviceIA/processar-pdf";


    axios
      .post(apiUrl, formData)
      .then((response) => {
        setQuestoes(response.data.questoes || []);
        setModalListasOpen(true);
      })
      .catch((error) => {
        console.error(
          "Erro ao processar o PDF:",
          error.response || error.message || error
        );
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
      console.error(
        "Erro ao salvar questões na lista:",
        error.response || error.message || error
      );
    }
  };


  const handleAddList = async () => {
    try {
      const professorId = localStorage.getItem("usuarioId");
 
      if (!professorId) {
        console.error("Nenhum ID de professor encontrado no localStorage!");
        return;
      }
 
      const response = await axios.post(
        `https://bancodequestoes-production.up.railway.app/listas?titulo=${novoTitulo}&professorId=${professorId}`
      );
 
      setListas((prevListas) => [...prevListas, response.data]);
      setNovoTitulo("");
      setModalAddListOpen(false);
      setMensagemSucesso(true);
 
      setTimeout(() => setMensagemSucesso(false), 5000);
    } catch (error) {
      console.error(
        "Erro ao adicionar lista:",
        error.response?.data || error.message || error
      );
    }
  };
 


  const handleDeletarLista = async (listaId) => {
    try {
      await axios.delete(
        `https://bancodequestoes-production.up.railway.app/listas/${listaId}`
      );
      setListas((prevListas) =>
        prevListas.filter((lista) => lista.id !== listaId)
      );
    } catch (error) {
      console.error(
        `Erro ao deletar lista com ID ${listaId}:`,
        error.response || error.message || error
      );
    }
  };


  const handleEditarLista = (lista) => {
    setListaParaEditar(lista);
    setNovoTitulo(lista.titulo); 
    setModalEditListOpen(true);
  };


  const handleConfirmarEdicao = async () => {
    try {
      const response = await axios.put(
        `https://bancodequestoes-production.up.railway.app/listas/${listaParaEditar.id}?novoTitulo=${encodeURIComponent(novoTitulo)}`
      );
      setListas((prevListas) =>
        prevListas.map((lista) =>
          lista.id === listaParaEditar.id ? { ...lista, titulo: response.data.titulo } : lista
        )
      );
      setModalEditListOpen(false);
      setMensagemSucesso(true);
      setTimeout(() => setMensagemSucesso(false), 5000);
    } catch (error) {
      console.error(
        `Erro ao editar lista com ID ${listaParaEditar.id}:`,
        error.response || error.message || error
      );
    }
  };


  const toggleMenu = (id) => {
    setMenuAberto(menuAberto === id ? null : id);
  };


  const handleCloseModal = () => {
    setModalListasOpen(false);
    setModalAddListOpen(false);
    setModalEditListOpen(false);
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
        <button className="adicionar-lista-button" onClick={handleOpenAddListModal}>
          Adicionar Nova Lista
        </button>
        <div className="questoes-container">
          <h2>Listas Disponíveis</h2>
          {listas.map((lista) => (
            <div key={lista.id} className="questao-card">
              <div className="ellipsis-icon" onClick={() => toggleMenu(lista.id)}>
                <FaEllipsisV />
                {menuAberto === lista.id && (
                  <div className="menu-dropdown">
                    <button
                      onClick={() => handleEditarLista(lista)} 
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        handleDeletarLista(lista.id);
                        toggleMenu(null);
                      }}
                    >
                      Deletar
                    </button>
                  </div>
                )}
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
              <button className="modal-button cancelar" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      {modalEditListOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Lista</h2>
            <input
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              placeholder="Novo Título da Lista"
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="modal-button salvar" onClick={handleConfirmarEdicao}>
                Confirmar
              </button>
              <button className="modal-button cancelar" onClick={handleCloseModal}>
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