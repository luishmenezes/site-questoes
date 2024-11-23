import React from "react";
import { Card, Col, Row } from "antd";
import "./Sobre.css";

const SobreComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "#0066cc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        padding: "0",
        margin: "0",
      }}
    >
      <div style={{
        position: 'relative',
        top: '-55px'
      }} className="titleDes">
        <h1>Sobre a Educa+</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "18px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <Row gutter={[144, 16]} justify="center" style={{ width: "100%", padding: "0",position:'relative  ', top: "-55px" }}>
        <Col xs={24} sm={8}>
          <Card title="Nossa Missão" bordered={false} className="card-custom">
            <p>
              <b>
                <i>Compromisso:</i>
              </b>{" "}
              Educação de qualidade e acessível. <br />
              <b>
                <i>Inovação:</i>
              </b>{" "}
              Uso de tecnologia para aprimorar o ensino. <br />
              <b>
                <i>Inclusão:</i>
              </b>{" "}
              Um ambiente acolhedor e democrático. <br />
              <b>
                <i>Excelência:</i>
              </b>{" "}
              Ensino com professores qualificados. <br />
              <b>
                <i>Transparência:</i>
              </b>{" "}
              Relação de confiança com os alunos. <br />
            </p>
            <a href="/home" className="read-more">
              Ler mais
            </a>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Nossa Visão" bordered={false} className="card-custom">
            <p>
              Ser a plataforma de referência no Brasil em preparação para o ENEM
              e concursos, <br />
              reconhecida por democratizar o acesso ao ensino de qualidade e
              capacitar os alunos <br />a atingirem seus objetivos acadêmicos e
              profissionais.
            </p>
            <a href="/home" className="read-more">
              Ler mais
            </a>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Nossos Valores" bordered={false} className="card-custom">
            <p>
              Nossa missão é oferecer um ambiente de aprendizado completo e
              acessível, <br />
              combinando tecnologia, metodologia de ensino eficiente e o suporte
              de professores especializados e qualificados. <br />
            </p>
            <a href="/home" className="read-more">
              Ler mais
            </a>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SobreComponent;
