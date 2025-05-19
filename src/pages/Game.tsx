// JOAO-18/05
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './Game.css';

export const Game = () => {
  const navigate = useNavigate();

  // CRIAÇÃO DOS ARRAYS PARA TABULEIRO E RANKING 
  // O tabuleiro é um array de 24 elementos, todos com o valor '?'
  // O ranking é um array de 10 elementos, todos com o mesmo valor
  // Depois precisamos alterar pra receber os dados do backend
  const cards = Array(24).fill('?');
  const ranking = Array(10).fill({ name: 'Gustavo Ferreira', score: 15000 });


  return (
    <div className="game-container">
      {/* Botão de voltar */}
      <button className="back-button" onClick={() => navigate('/home')}>
        Voltar
      </button>
      
      <Button
        text="Voltar"
        className="back-button"
        color="yellow"
        onClick={() => navigate('/home')}
      />

      {/* Tabuleiro*/}
      <div className="game-content">
        <Card className="game-board-container">
          <div className="game-board">
            {cards.map((conteudo, index) => (
              <div key={index} className="game-card">
                {conteudo}
              </div>
            ))}
          </div>
        </Card>
        
        {/* Ranking */}
        <Card className="game-ranking-container">
          <h2 className="ranking-title">Ranking</h2>
          <div className="ranking-list">
            <div className="ranking-header">
              <span>Nome</span>
              <span>Pontos</span>
            </div>
            {ranking.map((player, index) => (
              <div key={index} className="ranking-item">
                <span>{player.name}</span>
                <span>{player.score}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Informações de Tentativas e Pontuação */}
      <div className="game-info">
        <span>Tentativas: 49</span>
        <span>Pontuação: 500</span>
      </div>
    </div>
  );
};