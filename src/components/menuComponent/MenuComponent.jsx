import { useState } from 'react';
import { 
    MenuOutlined, 
    HomeOutlined, 
    InfoCircleOutlined, 
    FilterOutlined, 
    BookOutlined, 
    SettingOutlined, 
    BookFilled, 
    LoginOutlined 
} from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export default function MenuComponent() {
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
            label: <Link to="/questoes">Questões</Link>,
        },
        {
            key: 'minhasQuestoes',
            icon: <BookFilled />,
            label: <Link to="/minhasQuestoes">Minhas Listas</Link>,
        },
        {
            key: 'simulados',
            icon: <FilterOutlined />,
            label: <Link to="/simulados">Simulados</Link>,
        },
        {
            key: 'sobre',
            icon: <InfoCircleOutlined />,
            label: <Link to="/sobre">Sobre</Link>,
        },
        {
            key: 'cadastros',
            icon: <LoginOutlined />,
            label: <Link to="/cadastros">Cadastros</Link>,
        },
        {
            key: 'config',
            icon: <SettingOutlined />,
            label: <Link to="/config">Configurações</Link>,
        },
        {
            key: 'formulario',
            icon: <SettingOutlined />,
            label: <Link to="/formulario">Formulario</Link>,
        },
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} width={256}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <Button type="primary" onClick={toggleCollapsed}>
                        <MenuOutlined />
                    </Button>
                </div>
                <Menu
                    defaultSelectedKeys={['home']}
                    mode="inline"
                    theme="dark"
                    items={items}
                />
            </Sider>
        </Layout>
    );
}
