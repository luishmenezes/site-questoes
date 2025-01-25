import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuestoesLista.css";

const QuestoesLista = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
  const userId = localStorage.getItem("EstudanteId");
  const navigate = useNavigate(); // hook para navegação

  console.log("Usuário logado com ID:", userId);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/listas/${id}/questoes`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar questões");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleRegisterToList = async () => {
    try {
      await axios.post(
        `http://localhost:8080/listas/${id}/estudantes?estudanteId=${userId}`
      );
      alert("Estudante registrado na lista com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar estudante na lista.");
    }
  };
  
  const saveAnswer = async (questionId, isCorrect) => {
    try {
      await axios.post(
        "http://localhost:8080/enviaresposta",
        {
          questaoId: questionId,
          estudanteId: userId,
          resposta: isCorrect,
        }
      );
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    }
  };

  const handleVerifyAnswers = () => {
    const newResults = {};
    questions.forEach((question) => {
      const selectedIndex = selectedAnswers[question.id];
      const isCorrect = selectedIndex === question.gabarito;
      newResults[question.id] = isCorrect;

      saveAnswer(question.id, isCorrect);
    });
    setResults(newResults);
  };

  const handleSelectAnswer = (questionId, selectedIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedIndex,
    }));
  };

  const handleGoToDashboard = () => {
    navigate(`/DashboardLista/${id}`);
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-message">
            Carregando as melhores questões para você...
          </p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>{error}</h2>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1>Questões da Lista</h1>
           
          </div>
          <div className="questions-container">
            {questions.map((question) => (
              <div className="question-card" key={question.id}>
                <div className="header">{question.cabecalho}</div>
                <div className="body">
                  <p className="enunciado">{question.enunciado}</p>
                  <ul className="alternativas">
                    {question.alternativas.map((alternativa, index) => (
                      <li
                        key={index}
                        className={`alternativa ${
                          results[question.id] !== undefined
                            ? index === question.gabarito
                              ? "correct"
                              : index === selectedAnswers[question.id]
                              ? "incorrect"
                              : ""
                            : selectedAnswers[question.id] === index
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleSelectAnswer(question.id, index)
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {alternativa}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="verify-button" onClick={handleVerifyAnswers}>
              Verificar Respostas
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {}
            <button className="redirect-button" onClick={handleGoToDashboard}>
            Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestoesLista;
