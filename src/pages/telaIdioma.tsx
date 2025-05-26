import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import './Dificuldade.css';

export const telaIdioma = () => {
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState('');
  const navigate = useNavigate();

  const handleClick = (nivel: string) => {
    setDificuldadeSelecionada(nivel);
    navigate(`/idioma/${nivel}`);
  };

  return (
    <div className="idioma-container">
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