import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import './Dashboard.css';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/dashboard')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados da API');
                }
                return response.json();
            })
            .then((data) => {
                setDashboardData(data);
            })
            .catch((error) => {
                console.error('Erro ao carregar os dados:', error);
                setError('Não foi possível carregar os dados do dashboard.');
            });
    }, []);

    const totalProfessores = dashboardData?.totalProfessores || 0;
    const totalEscolas = dashboardData?.totalEscolas || 0;
    const totalQuestoes = dashboardData?.totalQuestoes || 0;

    const mediaQuestoesPorEscola = totalEscolas ? Math.round(totalQuestoes / totalEscolas) : 0;

    const escolas = dashboardData?.professoresPorInstituicao || {};
    const comparacaoEscolas = Object.entries(escolas).map(([instituicao, count]) => ({
        name: instituicao,
        professores: count,
    }));

    const distribuicaoQuestoes = Object.entries(escolas).map(([instituicao, count]) => ({
        name: instituicao,
        value: mediaQuestoesPorEscola,
    }));

    const professoresPorMateria = dashboardData?.contarProfessoresPorMaterias || {};
    const professoresPorMateria2 = dashboardData?.contarProfessoresPorMaterias2 || {};

    const professoresPorMateriaData = Object.entries(professoresPorMateria).map(([materia, count]) => ({
        name: materia,
        value: count,
    }));

    const professoresPorMateria2Data = Object.entries(professoresPorMateria2).map(([materia, count]) => ({
        name: materia,
        value: count,
    }));

    const dadosCombinados = [...professoresPorMateriaData, ...professoresPorMateria2Data];

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {dashboardData ? (
                <div>
                    <div className="dashboard-data">
                        <div className="data-card">
                            <h3>Total de Questões</h3>
                            <p>{totalQuestoes}</p>
                        </div>
                        <div className="data-card">
                            <h3>Total de Professores</h3>
                            <p>{totalProfessores}</p>
                        </div>
                        <div className="data-card">
                            <h3>Total de Escolas</h3>
                            <p>{totalEscolas}</p>
                        </div>
                    </div>

                    <div className="graph-container">
                        <div className="chart pie-chart-container">
                            <h3>Distribuição de Questões por Escola (Média)</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={distribuicaoQuestoes}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                    >
                                        {distribuicaoQuestoes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#0088FE' : '#FFBB28'} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ payload }) => {
                                            if (payload && payload.length) {
                                                return (
                                                    <div className="custom-tooltip">
                                                        <p>{`Escola: ${payload[0].payload.name}, Média de Questões: ${payload[0].payload.value}`}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart bar-chart-container">
                            <h3>Comparação de Professores por Escola</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={comparacaoEscolas}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="professores" fill="#0088FE" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart pie-chart-container">
                            <h3>Quantidade de Professores por Matéria</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={dadosCombinados}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                    >
                                        {dadosCombinados.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index < professoresPorMateriaData.length ? '#4278ff' : '#4e00c4'} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ payload }) => {
                                            if (payload && payload.length) {
                                                return (
                                                    <div className="custom-tooltip">
                                                        <p>{`Matéria: ${payload[0].payload.name}, Quantidade de Professores: ${payload[0].payload.value}`}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
}

export default Dashboard;
