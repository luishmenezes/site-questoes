import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Navegacao = () => {
  const navigate = useNavigate();

  const irParaCadastro = () => {
    navigate('/cadastros');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={irParaCadastro}>
        Ir para Cadastro
      </Button>
    </div>
  );
};

export default Navegacao;
