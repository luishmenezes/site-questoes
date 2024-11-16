import React from 'react'
import ResponsiveAppBar from '../header/Header';

const SimuladosComponent = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <ResponsiveAppBar/>
        <h1>Crie seus simulados</h1>
        <p>Aqui você pode fazer um conjunto de questão que formará o seu simulado!</p>
    </div>
    
  )
}

export default SimuladosComponent;