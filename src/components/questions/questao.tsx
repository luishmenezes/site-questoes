import React from "react";

interface QuestaoProps {
  cabecalho: string;
  enunciado: string;
  alternativas: string[];
}

export const Questao: React.FC<QuestaoProps> = ({
  cabecalho,
  enunciado,
  alternativas,
}) => {
  return (
    <div>
      <h2>{cabecalho}</h2>
      <p>{enunciado}</p>
      <ul>
        {alternativas.map((alt, index) => (
          <li key={index}>{alt}</li>
        ))}
      </ul>
    </div>
  );
};
