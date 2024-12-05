import React, { useState } from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CadastroAluno.module.css"; 

const Cadastro = () => {
  
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [dataNascimento, setNascimento] = useState("")

  const handleEnviar = async () => {
    const data = {
      nome: nome.toString(),
      email: email.toString(),
      senha: senha.toString(),
      dataNascimento: dataNascimento.toString(),
      instituicao: instituicao.toString(),
    };

    try {
      const response = await axios.post(
        "https://bancodequestoes-production.up.railway.app/estudantes/cadastro",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Cadastrado com sucesso");
        navigate("/home");
      } else {
        console.error("Erro ao cadastrar");
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  };

  const onFinish = () => {
    handleEnviar();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div className="form-container">
        <Card
          style={{ width: "120%", maxWidth: "800px", margin: "0 auto" }}
          className="card-cadastro"
        >
          <h2 style={{ color: "white" }} className="cadastro-titulo">
            Cadastre-se
          </h2>
          <div className="form-content">
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              style={{ marginTop: "20px", flex: 1, paddingRight: "290px" }}
            >
              <Form.Item
                label="Nome"
                name="nome"
                rules={[
                  { required: true, message: "Por favor, insira seu nome!" },
                ]}
              >
                <Input value={nome} onChange={(e) => setNome(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Por favor, insira um e-mail válido!",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="senha"
                rules={[
                  { required: true, message: "Por favor, insira sua senha!" },
                ]}
              >
                <Input.Password
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Nascimento"
                name="dataNascimento"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira sua data de nascimento!",
                  },
                ]}
              >
                <Input
                type="date"
                  value={dataNascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                />
              </Form.Item>
              
              <Form.Item
                label="Instituição"
                name="instituicao"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira sua instituição!",
                  },
                ]}
              >
                <Input
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  onClick={handleEnviar}
                  type="primary"
                  htmlType="submit"
                  className="button-enviar"
                  style={{
                    position: "relative",
                    right: "-308px",
                    top: "-120px",
                  }}
                >
                  Confirmar
                </Button>
              </Form.Item>
            </Form>
          </div>
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
            src="cadAluno.jpg"
            alt="Cadastro"
            className="cadastro-image"
            style={{
              width: "225px",
              height: "225px",
              objectFit: "cover",
              borderRadius: "48px",
              position: "relative",
              top: "-450px",
              left: "212px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
