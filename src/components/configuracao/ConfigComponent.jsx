
import React from 'react'
import { Link} from 'react-router-dom'; 


const ConfigComponent = () => {
  return (
    <div 
    style={{
      textAlign: "center",
      marginTop: "100px"
    }}>
      <h1> Página de configuração </h1>
    <Link to="/configAluno"><button>config aluno</button></Link>,
    <Link to = "/configProfessor"><button>config professor</button></Link>,
    <Link to = "/configEscola"><button>config escola</button></Link>
    </div>
  );
};

export default ConfigComponent;