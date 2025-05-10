// pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Card
        title="Mandu'a"
        subtitle="Jogo da Memória Bilíngue"
        buttons={[
          { 
            text: 'Jogar', 
            color: 'green',
            onClick: () => navigate('/jogo')
          },
          { 
            text: 'Ranking', 
            color: 'blue',
            onClick: () => navigate('/ranking')
          },
          { 
            text: 'Instruções', 
            color: 'yellow',
            onClick: () => alert('Instruções do jogo')
          },
          { 
            text: 'Linguagem', 
            color: 'brown',
            onClick: () => alert('Mudar linguagem')
          }
        ]}
      />
    </div>
  );
};