import React from "react";

const ListaItem = ({ lista, acessarLista }) => {
  return (
    <li className="lista-item">
      <span>{lista.titulo}</span>
      <button onClick={() => acessarLista(lista.id)}>Acessar</button>
    </li>
  );
};

export default ListaItem;
