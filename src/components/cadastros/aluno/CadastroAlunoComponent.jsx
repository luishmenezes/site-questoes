import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./CadastroAluno.module.css";
import axios from "axios";

const Cadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [instituicao, setInstituicao] = useState("");

  const handleEnviar = async () => {
    if (!nome || !email || !senha || !dataNascimento || !instituicao) {
      message.error("Por favor, preencha todos os campos!");
      return;
    }

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
      localStorage.setItem("token", response);
      console.log("Cadastro realizado com sucesso -> ", response.data);
      message.success("Cadastro realizado com sucesso!!!");
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.error("Erro no back-end -> ", error.response.data);
      } else if (error.request) {
        console.error("erro servidor", error.request);
        message.error("Erro na rede. tente novamente");
      } else {
        console.error("erro ao configurar a req:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <Card
          style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
          className="card-cadastro"
        >
          <h2 style={{ color: "white", textAlign: "center" }} className="cadastro-titulo">
            Cadastre-se
          </h2>
          <div className="form-content">
            <Form
              name="cadastro"
              layout="vertical"
              style={{ marginTop: "20px", flex: 1 }}
            >
              <Form.Item
                label="Nome"
                rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
              >
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </Form.Item>

              <Form.Item
                label="E-mail"
                rules={[
                  { required: true, type: "email", message: "Por favor, insira um e-mail válido!" },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                />
              </Form.Item>

              <Form.Item
                label="Senha"
                rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
              >
                <Input.Password
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Sua senha"
                />
              </Form.Item>

              <Form.Item
                label="Data de Nascimento"
                rules={[{ required: true, message: "Por favor, insira sua data de nascimento!" }]}
              >
                <Input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Instituição"
                rules={[{ required: true, message: "Por favor, insira sua instituição!" }]}
              >
                <Input
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                  placeholder="Nome da instituição"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button" 
                  className="button-enviar"
                  onClick={handleEnviar} 
                  block 
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
            marginTop: "20px",
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
