import React from 'react';
import { Card, Space, Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate(); 

  const [nome, setNome] = useState('');  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('')

  const handleEnviar = async () => {
    const data = {
      nome: nome.toString(), 
      email: email.toString(),
      senha: senha.toString(),
      dataNascimento: dataNascimento.toString(),
    };

    try {
      const response = await axios.post('http://localhost:8080/usuarios/cadastro', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log('Cadastrado com sucesso');
        console.log(data);
        navigate("/home");
      } else {
        console.error('Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  const onFinish = () => {
    handleEnviar();  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Space style={{ textAlign: 'center' }} direction="vertical" size={16}>
        <Card
          headStyle={{
            borderBottom: "2px solid black",
            textAlign: "center",
          }}
          style={{
            width: 400,
            textAlign: "center",
            border: "2px solid black",
            padding: "20px",
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Usuário"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Por favor, preencha o campo!',
                },
              ]}
            >
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Item>

            {/*
                        <Form.Item
              label="Instituição"
              name="institution"
              rules={[
                {
                  message: 'Por favor, preencha o campo!',
                },
              ]}
            >
              <Input
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </Form.Item>*/}
            

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Por favor, preencha o campo!',
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
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor, preencha o campo!',
                },
              ]}
            >
              <Input.Password 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Data Nascimento"
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Por favor, preencha o campo!',
                },
              ]}
            >
              <Input 
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Checkbox
                style={{ position: 'relative', right: '-60px' }}
              >
                Aceito as políticas de privacidade
              </Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              style={{ textAlign: 'center' }}
            >
              <Button onClick={handleEnviar} type="primary" htmlType="submit">
                Cadastre-se
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default App;