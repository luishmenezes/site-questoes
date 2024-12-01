import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import HomeComponent from './components/inity/HomeComponent';
import SobreComponent from './components/sobre/SobreComponent';
import SimuladosComponent from './components/simulados/SimuladosComponent';
import ConfigComponent from './components/configuracao/ConfigComponent';
import MinhasQuestoesComponent from './components/minhasQuestoes/MinhasQuestoesComponent';
import CadastrosComponent from './components/ocupacao/OcupacaoComponent';
import CadastroAlunoComponent from './components/cadastros/aluno/CadastroAlunoComponent';
import CadastroProfessorComponent from './components/cadastros/professor/CadastroProfessorComponent';
import LoginComponent from './components/login/LoginComponent';
import RedefenirSenhaComponent from './components/redefenirsenha/RedefenirSenhaComponent';
import Intro from './components/intropage/IntroPageComponent';
import LayoutComponent from './components/layout/LayoutComponent';
import Listas from './components/Listas/Listas';
import QuestoesLista from './components/Questoes/QuestoesLista';
import Form from './components/formulario/FormularioList';
import ConfigAlunoComponent from './components/configuracao/ConfigAlunoComponent';
import ConfigEscolaComponent from './components/configuracao/ConfigEscolaComponent';
import ConfigProfessorComponent from './components/configuracao/ConfigProfessorComponent';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<LayoutComponent><HomeComponent /></LayoutComponent>} />
      <Route path="/sobre" element={<LayoutComponent><SobreComponent /></LayoutComponent>} />
      <Route path="/config" element={<LayoutComponent><ConfigComponent /></LayoutComponent>} />
      <Route path="/questoes" element={<LayoutComponent><MinhasQuestoesComponent /></LayoutComponent>} />
      <Route path="/minhasQuestoes" element={<LayoutComponent><SimuladosComponent /></LayoutComponent>} />
      <Route path="/cadastros" element={<CadastrosComponent />} />
      <Route path="/formaluno" element={<CadastroAlunoComponent />} />
      <Route path="/formprofessor" element={<LayoutComponent><CadastroProfessorComponent /></LayoutComponent>} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/redefenir" element={<RedefenirSenhaComponent />} />
      <Route path="/listas" element={<Listas />} />
      <Route path="/questoes/:id" element={<QuestoesLista />} />
      <Route path="/formulario" element={<Form />} />
      <Route path="/configAluno" element={<ConfigAlunoComponent />} />
      <Route path="/configEscola" element={<ConfigEscolaComponent />} />
      <Route path="/configProfessor" element={<ConfigProfessorComponent />} />
    </Routes>
  );
};

export default RouterConfig;
