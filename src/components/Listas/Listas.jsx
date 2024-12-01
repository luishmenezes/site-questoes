import React from "react";
import ListaItem from "./ListaItem";

const Listas = ({ listas, acessarLista }) => {
  return (
    <div className="listas-container">
      <h1>Minhas Listas</h1>
      {listas.length === 0 ? (
        <p>Não há listas disponíveis.</p>
      ) : (
        <ul>
          {listas.map((lista) => (
            <ListaItem key={lista.id} lista={lista} acessarLista={acessarLista} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listas;
