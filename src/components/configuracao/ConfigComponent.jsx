
import React,{useState} from 'react'
import { Route, Routes , Link} from 'react-router-dom'; 


const ConfigComponent = () => {
  return (
    <div 
    style={{
      textAlign: "center",
      marginTop: "100px"
    }}>
    <Link to="/configAluno"><button>config aluno</button></Link>,
    <Link to = "/configProfessor"><button>config professor</button></Link>,
    <Link to = "/configEscola"><button>config escola</button></Link>
    </div>
  );
};

export default ConfigComponent;