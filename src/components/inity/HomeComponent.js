import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const ProfileCard = ({ name, job, description, imgSrc }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  
  const toggleDescription = (e) => {
    e.stopPropagation();  // Impede o clique de selecionar o card ao clicar em "Read More"
    setIsExpanded(!isExpanded);
  };
  
  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };
  
  return (
    <div
      className={`profile-card ${isSelected ? "selected" : ""}`}
      onClick={toggleSelection}
    >
      <img src={imgSrc} alt={`${name} profile`} className="profile-img" />
      <h2>{name}</h2>
      <h4>{job}</h4>
      <p>
        {isExpanded ? description : `${description.substring(0, 50)}...`}{" "}
        <button onClick={toggleDescription} className="read-more">
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
};

const HomeComponent = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulando uma resposta mockada de 3 professores
  useEffect(() => {
    const mockProfessores = [
      {
        nome: 'David Pontes',
        materia1: 'Matemática',
        descricao: 'Professor experiente em Matemática com mais de 10 anos de atuação.',
        imagem: 'https://www.w3schools.com/w3images/avatar2.png',
      },
      {
        nome: 'Luis Henrique',
        materia1: 'Português',
        descricao: 'Especialista em Língua Portuguesa e Literatura Brasileira.',
        imagem: 'https://www.w3schools.com/w3images/avatar1.png',
      },
      {
        nome: 'Maria Silva',
        materia1: 'História',
        descricao: 'Professora apaixonada por História e Ciências Sociais.',
        imagem: 'https://www.w3schools.com/w3images/avatar5.png',
      }
    ];

    // Usando mockProfessores ao invés de fazer a requisição para a API
    setProfessores(mockProfessores);
    setLoading(false);
  }, []);

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="contentin">
          <div className="text-section">
            <h1>Educa+</h1>
            <p>
              Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae
              legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos
              cu eum an brute copiosae hendrerit.
            </p>
          </div>
          <div className="card">
            <h2>Social Education</h2>
            <p>Lorem ipsum dolor sit amet et delectus</p>
            <button>Button</button>
          </div>
        </div>
      </div>

      <div className="toggle-switch">
        <span>Sample Text</span>
        <div className="switch">
          <div className="toggle"></div>
        </div>
      </div>

      <h1>Perfis</h1>
      <div className="profile-container">
        {loading ? (
          <p>Carregando professores...</p>
        ) : (
          professores.map((professor, index) => (
            <ProfileCard
              key={index}
              name={professor.nome}
              job={professor.materia1}
              description={professor.descricao || "Descrição não disponível."}
              imgSrc={professor.imagem || "https://static.vecteezy.com/ti/vetor-gratis/p1/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
