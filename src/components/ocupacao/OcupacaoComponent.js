import React from "react";
import { Card, Space, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center", position: 'relative', top:'-80px' }}>
        Escolha o tipo de conta abaixo
      </h1>

      <Space direction="horizontal" size={32}>
        <Card
          headStyle={{
            borderBottom: "2px solid black",
            textAlign: "center",
          }}
          style={{
            width: 300,
            textAlign: "center",
            border: "2px solid black",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <h3>Sou Aluno</h3>
            <hr />
          </div>
          <p>Estou aqui pra aprender</p>
          <p>e poder ajudar os que precisam!</p>
          <br />
          <Button type="primary" onClick={() => navigate("/formaluno")}>
            Aluno
          </Button>
        </Card>

        <Card
          headStyle={{
            borderBottom: "2px solid black",
            textAlign: "center",
          }}
          style={{
            width: 300,
            textAlign: "center",
            border: "2px solid black",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <h3>Sou Professor</h3>
            <hr />
          </div>
          <p>Estou aqui para ensinar</p>
          <p>e ajudar os alunos a aprenderem!</p>
          <br />
          <Button type="primary" onClick={() => navigate("/formprofessor")}>
            Docente
          </Button>
        </Card>
      </Space>
    </div>
  );
};

export default Home;
