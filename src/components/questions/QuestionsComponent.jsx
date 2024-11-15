import React, { useState, useEffect } from "react";
import './QuestionsComponent.css';

const QuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/questao/questoes");
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar questões");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
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
  );
};

export default QuestionsComponent;
