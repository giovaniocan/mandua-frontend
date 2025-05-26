import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import './Idioma.css';

export const Idioma = () => {
  const [idiomaSelecionado, setIdiomaSelecionado] = useState('');
  const navigate = useNavigate();

  const handleIdiomaClick = (idioma: string) => {
    setIdiomaSelecionado(idioma);
    navigate(`/idioma/${idioma}`);
  };

  return (
    <div className="idioma-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>Voltar</button>
      <Card
        title="Mandu'a"
        subtitle="Selecione o idioma que deseja utilizar no jogo"
        buttons={[
          {
            text: 'Português',
            color: 'green',
            onClick: () => handleIdiomaClick('portugues')
          },
          {
            text: 'Guarani',
            color: 'blue',
            onClick: () => handleIdiomaClick('guarani')
          }
        ]}
      />
    </div>
  );
};
