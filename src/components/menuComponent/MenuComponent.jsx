import React from "react";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  BookFilled,
  InfoCircleOutlined,
  LoginOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const MenuComponent = ({ toggleMenu }) => {
  
  const items = [
    {key: "home",icon: <HomeOutlined />,label: <Link to="/home">Home</Link>,},
    {key: "questoes", icon: <BookOutlined />, label: <Link to="/questoes">Questões</Link>,},
    {key: "minhasQuestoes", icon: <BookFilled />, label: <Link to="/minhasQuestoes">Minhas Listas</Link>,},
    {key: "sobre", icon: <InfoCircleOutlined />, label: <Link to="/sobre">Sobre</Link>,},
    {key: "cadastros", icon: <LoginOutlined />, label: <Link to="/cadastros">Cadastros</Link>,},
    {key: "config", icon: <SettingOutlined />, label: <Link to="/config">Configurações</Link>,},
    {key: "formulario", icon: <SettingOutlined />, label: <Link to="/formulario">Formulario</Link> } //apenas pra vcs ficarem vizualizando a pag de forms se quiser
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 64,
          backgroundColor: "#001529",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Button
          onClick={toggleMenu}
          style={{
            backgroundColor: "#1890ff",
            border: "none",
            color: "white",
            fontSize: "16px",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <MenuOutlined />
        </Button>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        style={{ borderRight: 0 }}
      />
    </div>
  );
};

export default MenuComponent;


//Até resolver como ficará essa tela de simulados(resolver problemas de fluxos - simples)

//{
 // key: "simulados",
 // icon: <FilterOutlined />,
//  label: <Link to="/simulados">Simulados</Link>,
//}