import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import './QuestoesLista.css'; 

const QuestoesLista = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://bancodequestoes-production.up.railway.app/listas/${id}/questoes`);
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar questões");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-message">Carregando as melhores questões para você...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>{error}</h2>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
                      <li key={index} className="alternativa">
                        {alternativa}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestoesLista;
