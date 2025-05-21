// JOAO-18/05
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './Game.css';

export const Game = () => {
  const navigate = useNavigate();

  // CRIAÇÃO DOS ARRAYS PARA TABULEIRO E RANKING 
  // Ajustando para 30 cartas (6 linhas x 5 colunas) como na imagem
  const cards = Array(30).fill('?');
  const ranking = Array(10).fill({ name: 'Gustavo Ferreira', score: 15000 });

  return (
    <div className="game-container">
      {/* Botão de voltar */}
      <button className="back-button" onClick={() => navigate('/home')}>
        Voltar
      </button>
      

      <div className="game-content">
        {/* Tabuleiro */}
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
          <h1 className="ranking-title">Ranking</h1>
          
          {/* Cabeçalho do ranking */}
          <div className="ranking-header">
            <div className="ranking-header-nome">NOME</div>
            <div className="ranking-header-pontos">PONTOS</div>
          </div>
          
          {/* Lista de ranking */}
          <div className="ranking-list">
            {ranking.map((player, index) => (
              <div key={index} className="ranking-item">
                <div className="ranking-item-nome">{player.name}</div>
                <div className="ranking-item-pontos">{player.score}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Informações de Tentativas e Pontuação */}
      <div className="game-info">
        <Card className="tentativas">Tentativa: 49</Card>
        <Card className="pontuacao">Pontuação: 500</Card>
      </div>
    </div>
  );
};