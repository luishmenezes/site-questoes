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
import LoginEstudanteComponent from './components/login/LoginEstudanteComponent';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<LayoutComponent><HomeComponent /></LayoutComponent>} />
      <Route path="/sobre" element={<LayoutComponent><SobreComponent /></LayoutComponent>} />
      <Route path="/config" element={<LayoutComponent><ConfigComponent /></LayoutComponent>} />
      <Route path="/questoes" element={<LayoutComponent><MinhasQuestoesComponent /></LayoutComponent>} />
      <Route path="/minhasQuestoes" element={<LayoutComponent><SimuladosComponent /></LayoutComponent>} />
      <Route path="/cadastros" element={<LayoutComponent><CadastrosComponent /></LayoutComponent>} />
      <Route path="/formaluno" element={<LayoutComponent><CadastroAlunoComponent /></LayoutComponent>} />
      <Route path="/formprofessor" element={<LayoutComponent><CadastroProfessorComponent /></LayoutComponent>} />
      <Route path="/login" element={<LayoutComponent><LoginComponent /></LayoutComponent>} />
      <Route path="/redefenir" element={<RedefenirSenhaComponent />} />
      <Route path="/listas" element={<LayoutComponent><Listas /></LayoutComponent>} />
      <Route path="/questoes/:id" element={<LayoutComponent><QuestoesLista /></LayoutComponent>} />
      <Route path="/formulario" element={<LayoutComponent><Form /></LayoutComponent>} />
      <Route path="/configAluno" element={<LayoutComponent><ConfigAlunoComponent /></LayoutComponent>} />
      <Route path="/configEscola" element={<LayoutComponent><ConfigEscolaComponent /></LayoutComponent>} />
      <Route path="/configProfessor" element={<LayoutComponent><ConfigProfessorComponent /></LayoutComponent>} />
      <Route path="/loginEstudante" element={<LayoutComponent><LoginEstudanteComponent /></LayoutComponent>}/>
    </Routes>
  );
};

export default RouterConfig;
