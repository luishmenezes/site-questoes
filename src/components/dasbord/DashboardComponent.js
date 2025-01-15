import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./Dashboard.css";

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
  const [listaId, setListaId] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setError("");
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/lista/${listaId}`
      );
      setDashboardData(response.data);
    } catch (err) {
      setError("Erro ao buscar dados do dashboard. Verifique o ID fornecido.");
      setDashboardData(null);
    }
  };

  const generateLineChartData = () => {
    if (!dashboardData) return null;

    const labels = dashboardData.questoes.map((questao) => `Q${questao.id}`);
    const dataAcertos = dashboardData.questoes.map(
      (questao) => questao.respostas.filter((r) => r.respostaDada).length
    );
    const dataErros = dashboardData.questoes.map(
      (questao) => questao.respostas.filter((r) => !r.respostaDada).length
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
        const estudanteId = resposta.estudante;
        if (!estudantes[estudanteId]) {
          estudantes[estudanteId] = { nome: `${estudanteId}`, acertos: 0, erros: 0 };
        }
        if (resposta.respostaDada) {
          estudantes[estudanteId].acertos++;
        } else {
          estudantes[estudanteId].erros++;
        }
      });
    });

    return Object.values(estudantes).sort((a, b) => b.acertos - a.acertos);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="input-container">
        <label>
          ID da Lista:
          <input
            type="text"
            value={listaId}
            onChange={(e) => setListaId(e.target.value)}
            placeholder="Digite o ID da lista"
          />
        </label>
        <button className="button-fetch" onClick={fetchDashboardData}>
          Buscar Dashboard
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {dashboardData ? (
        <div>
          <h2 className="dashboard-title">{dashboardData.tituloLista}</h2>
          <p><strong>Professor:</strong> {dashboardData.professor}</p>

          <div className="chart-container">
            <h3>Gráfico de Desempenho</h3>
            <Line data={generateLineChartData()} />
          </div>

          <div className="ranking-container">
            <h3>Ranking dos Estudantes</h3>
            <table className="table-ranking">
              <thead>
                <tr>
                  <th>Estudante</th>
                  <th>Acertos</th>
                  <th>Erros</th>
                </tr>
              </thead>
              <tbody>
                {generateRanking().map((estudante, index) => (
                  <tr key={index}>
                    <td>{estudante.nome}</td>
                    <td>{estudante.acertos}</td>
                    <td>{estudante.erros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="error-message">Insira o ID para visualizar o dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
