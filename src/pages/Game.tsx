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
        subtitle=""
        buttons={[
          {
            text: 'Fácil',
            color: 'green',
            onClick: () => handleClick('facil')
          },
          {
            text: 'Médio',
            color: 'blue',
            onClick: () => handleClick('medio')
          },
          {
            text: 'Difícil',
            color: 'brown',
            onClick: () => handleClick('dificil')
          }
        ]}
      />
    </div>
  );
};