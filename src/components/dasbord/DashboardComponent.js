import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line as ChartLine } from "chart.js";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Registrar componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const [professorId, setProfessorId] = useState("");
  const [listaId, setListaId] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setError("");
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/professor/${professorId}/lista/${listaId}`
      );
      setDashboardData(response.data);
    } catch (err) {
      setError("Erro ao buscar dados do dashboard. Verifique os IDs fornecidos.");
      setDashboardData(null);
    }
  };

  const generateLineChartData = () => {
    if (!dashboardData) return null;

    const labels = dashboardData.questoes.map((questao) => `Questão ${questao.id}`);
    const dataAcertos = dashboardData.questoes.map(
      (questao) =>
        questao.respostas.filter((resposta) => resposta.respostaCorreta).length
    );
    const dataErros = dashboardData.questoes.map(
      (questao) =>
        questao.respostas.filter((resposta) => !resposta.respostaCorreta).length
    );

    return {
      labels,
      datasets: [
        {
          label: "Acertos",
          data: dataAcertos,
          borderColor: "green",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Erros",
          data: dataErros,
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const generateRanking = () => {
    if (!dashboardData) return [];

    const estudantes = {};

    dashboardData.questoes.forEach((questao) => {
      questao.respostas.forEach((resposta) => {
        if (!estudantes[resposta.estudante]) {
          estudantes[resposta.estudante] = { acertos: 0, erros: 0 };
        }
        if (resposta.respostaCorreta) {
          estudantes[resposta.estudante].acertos++;
        } else {
          estudantes[resposta.estudante].erros++;
        }
      });
    });

    return Object.entries(estudantes)
      .map(([nome, stats]) => ({
        nome,
        acertos: stats.acertos,
        erros: stats.erros,
      }))
      .sort((a, b) => b.acertos - a.acertos);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>Dashboard</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <label style={{ marginRight: "10px" }}>
            ID do Professor:
            <input
              type="text"
              value={professorId}
              onChange={(e) => setProfessorId(e.target.value)}
              placeholder="Digite o ID do professor"
              style={{
                marginLeft: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </label>
        </div>

        <div>
          <label style={{ marginRight: "10px" }}>
            ID da Lista:
            <input
              type="text"
              value={listaId}
              onChange={(e) => setListaId(e.target.value)}
              placeholder="Digite o ID da lista"
              style={{
                marginLeft: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </label>
        </div>

        <button
          onClick={fetchDashboardData}
          style={{
            backgroundColor: "#4A90E2",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar Dashboard
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

      {dashboardData ? (
        <div>
          <h2 style={{ color: "#4A90E2" }}>Informações do Dashboard</h2>
          <p><strong>Título da Lista:</strong> {dashboardData.tituloLista}</p>
          <p><strong>Nome do Professor:</strong> {dashboardData.nomeProfessor}</p>

          <div style={{ margin: "20px 0" }}>
            <h3 style={{ color: "#4A90E2" }}>Gráfico de Desempenho</h3>
            <Line data={generateLineChartData()} />
          </div>

          <div style={{ margin: "20px 0" }}>
            <h3 style={{ color: "#4A90E2" }}>Ranking dos Estudantes</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Estudante</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Acertos</th>
                  <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Erros</th>
                </tr>
              </thead>
              <tbody>
                {generateRanking().map((estudante, index) => (
                  <tr key={index}>
                    <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                      {estudante.nome}
                    </td>
                    <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                      {estudante.acertos}
                    </td>
                    <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                      {estudante.erros}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Insira os IDs para visualizar o dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
