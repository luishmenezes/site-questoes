import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/dashboard')
            .then(response => setData(response.data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    if (!data) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="dashboard-container">
            <h1 style={{ textAlign: 'center', color: '#011C40' }}>Dados de usuários</h1>
            <div className="dashboard-card-container">
                <div className="dashboard-card">
                    <h2>Usuários Ativos</h2>
                    <p>{data.usuariosAtivos}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Alunos Ativos</h2>
                    <p>{data.Alunos}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Professores Ativos</h2>
                    <p>{data.Professores}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
