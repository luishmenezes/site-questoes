import React, { useState } from "react";
import { Card, Space, Button, Form, Input, DatePicker, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";


import "./CadastroProfessorComponent.css";


const CadastroProfessorComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const onFinish = async (values) => {
    setLoading(true);
    setError(null);


    const formattedDataNascimento = values.dataNascimento
      ? moment(values.dataNascimento).format("YYYY-MM-DD")
      : "";


    const payload = {
      ...values,
      dataNascimento: formattedDataNascimento,
      role: "PROFESSOR",
    };


    try {
      const response = await axios.post(
        "https://bancodequestoes-production.up.railway.app/professor/registrar",
        payload
      );


      if (response.status === 200) {
        // Salva os dados no localStorage
        const { nome, email } = values;
        const { token, id } = response.data; // Ajuste conforme a resposta do back-end


        // Armazenando os dados no localStorage
        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        localStorage.setItem("usuarioId", id); // Salvando o ID do professor


        message.success("Cadastro realizado com sucesso!");
        navigate("/home");
      } else {
        setError("Erro no cadastro. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      setError("Erro ao realizar a requisição. Tente novamente mais tarde.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div>
      <div className="cadastro-container">
        {error && <div className="error-message">{error}</div>}
        <Space className="cadastro-space" direction="vertical" size={16}>
          <Card style={{ top: '-35px' }} className="cadastro-card">
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
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "" }]}
              >
                <Input className="cadastro-input" />
              </Form.Item>


              <Form.Item
                label="Matéria 1"
                name="materia1"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "" }]}
              >
                <Input className="cadastro-input" />
              </Form.Item>


              <Form.Item
                label="Matéria 2"
                name="materia2"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "" }]}
              >
                <Input className="cadastro-input" />
              </Form.Item>


              <Form.Item
                label="Instituição"
                name="instituicao"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "" }]}
              >
                <Input className="cadastro-input" />
              </Form.Item>


              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, type: "email", message: "" }]}
              >
                <Input className="cadastro-input" />
              </Form.Item>


              <Form.Item
                label="Senha"
                name="senha"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "" }]}
              >
                <Input.Password className="cadastro-input" />
              </Form.Item>


              <Form.Item
                label="Data de Nascimento"
                name="dataNascimento"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "" }]}
              >
                <DatePicker
                  className="cadastro-input"
                  style={{ width: "100%" }}
                />
              </Form.Item>


              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  style={{ position: 'relative', top: '5px' }}
                  className="buttonC"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Cadastre-se
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div
            className="image-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <img
              src="image 6.png"
              alt="Cadastro"
              className="cadastro-image"
              style={{
                width: "225px",
                height: "225px",
                objectFit: "cover",
                position: "relative",
                top: "-480px",
                left: "162px",
              }}
            />
          </div>
        </Space>
      </div>
    </div>
  );
};


export default CadastroProfessorComponent;