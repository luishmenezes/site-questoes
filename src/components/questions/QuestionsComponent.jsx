import React from 'react'
import ResponsiveAppBar from '../header/Header';


const QuestionsComponent = () => {
  return (
    <div style={{textAlign : 'center'}}>
      <ResponsiveAppBar/>
        <h1>Praticar questões</h1>
        <p>Pesquise, favorite e faça as questões da sua escolha</p>
    </div>
  )
}

export default QuestionsComponent;