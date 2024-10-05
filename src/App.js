import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  FilterOutlined,
  BookOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeComponent from './components/inity/HomeComponent';
import SobreComponent from './components/sobre/SobreComponent';
import SimuladosComponent from './components/simulados/SimuladosComponent';
import QuestionsComponent from './components/questions/QuestionsComponent';
import ConfigComponent from './components/configuracao/ConfigComponent';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: 'questoes',
      icon: <BookOutlined />,
      label:  <Link to="/questoes">Questões</Link>,
      
    },
    {
      key: 'simulados',
      icon: <FilterOutlined />,
      label: <Link to="/simulados">Simulados</Link>
    },
    {
      key: 'sobre',
      icon: <InfoCircleOutlined />,
      label: <Link to="/sobre">Sobre</Link>,
    },
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: <Link to="/config">Configurações</Link>
    }
 
  ];

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            width: 256,
            backgroundColor: '#001529',
          }}
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              margin: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            defaultSelectedKeys={['home']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/sobre" element={<SobreComponent />} />
            <Route path="/simulados" element={<SimuladosComponent/>}/>
            <Route path="/questoes" element={<QuestionsComponent/>} />
            <Route path="/config" element={<ConfigComponent/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
