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

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/home" element={<LayoutComponent><HomeComponent /></LayoutComponent>} />
      <Route path="/" element={<Intro />} />
      <Route path="/sobre" element={<SobreComponent />} />
      <Route path="/simulados" element={<SimuladosComponent />} />
      <Route path="/config" element={<LayoutComponent><ConfigComponent /></LayoutComponent>} />
      <Route path="/cadastros" element={<CadastrosComponent />} />
      <Route path="/formaluno" element={<CadastroAlunoComponent />} />
      <Route path="/formprofessor" element={<LayoutComponent><CadastroProfessorComponent /></LayoutComponent>} />
      <Route path="/minhasQuestoes" element={<SimuladosComponent />} />
      <Route path="/questoes" element={<MinhasQuestoesComponent />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/redefenir" element={<RedefenirSenhaComponent />} />
      <Route path="/listas" element={<Listas />} />
      <Route path="/questoes/:id" element={<QuestoesLista />} />      </Routes>
  );
};

export default RouterConfig;
