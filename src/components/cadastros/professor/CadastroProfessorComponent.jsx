import React, { useState } from 'react';
import { Card, Space, Button, Form, Input, DatePicker, message, Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

import './CadastroProfessorComponent.css';
import ResponsiveAppBar from "../../header/Header"; 

const CadastroProfessorComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);

    const formattedDataNascimento = values.dataNascimento
      ? moment(values.dataNascimento).format('YYYY-MM-DD')
      : '';

    const payload = {
      ...values,
      dataNascimento: formattedDataNascimento, 
      role: 'PROFESSOR', 
    };

    try {
      const response = await axios.post('http://localhost:8080/professor/registrar', payload);

      if (response.status === 200) {
        message.success('Cadastro realizado com sucesso!');
        navigate('/home'); 
      } else {
        setError('Erro no cadastro. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      setError('Erro ao realizar a requisição. Tente novamente mais tarde.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="cadastro-container">
        {error && <div className="error-message">{error}</div>}
        <Space className="cadastro-space" direction="vertical" size={16}>
          <Card className="cadastro-card">
            <Form
              name="cadastroProfessor"
              className="cadastro-form"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Nome"
                name="nome"
                rules={[{ required: true, message: 'Por favor, preencha o nome!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Matéria 1"
                name="materia1"
                rules={[{ required: true, message: 'Por favor, preencha a matéria 1!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Matéria 2"
                name="materia2"
                rules={[{ required: true, message: 'Por favor, preencha a matéria 2!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Instituição"
                name="instituicao"
                rules={[{ required: true, message: 'Por favor, preencha a instituição!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, type: 'email', message: 'Por favor, insira um email válido!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="senha"
                rules={[{ required: true, message: 'Por favor, preencha a senha!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Data de Nascimento"
                name="dataNascimento"
                rules={[{ required: true, message: 'Por favor, selecione uma data!' }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <Checkbox>Aceito as políticas de privacidade</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cadastre-se
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default CadastroProfessorComponent;
