import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import './Dificuldade.css';

export const Dificuldade = () => {
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState('');
  const navigate = useNavigate();

  const handleClick = (nivel: string) => {
    setDificuldadeSelecionada(nivel);
    navigate(`/jogo/${nivel}`);
  };

  return (
    <div className="dificuldade-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>Voltar</button>
      <Card
        title="Mandu'a"
        subtitle="Escolha a dificuldade do jogo"
        buttons={[
          {
            text: 'Fácil (16 cartas)',
            color: 'green',
            onClick: () => handleClick('facil')
          },
          {
            text: 'Médio (24 cartas)',
            color: 'blue',
            onClick: () => handleClick('medio')
          },
          {
            text: 'Difícil (30 cartas)',
            color: 'brown',
            onClick: () => handleClick('dificil')
          }
        ]}
      />
    </div>
  );
};