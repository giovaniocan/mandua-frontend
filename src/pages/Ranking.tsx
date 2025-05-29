import React from 'react';
import './Ranking.css';
import { useNavigate } from 'react-router-dom'; // IMPORTANTE

type Player = {
  name: string;
  score: number;
  time: string;
};

export const Ranking: React.FC = () => {
  const navigate = useNavigate(); // HOOK de navegação

  const players: Player[] = [
    { name: 'FULANO 1', score: 888888, time: '01:30:04' },
    { name: 'FULANO 2', score: 777777, time: '01:30:04' },
    { name: 'FULANO 3', score: 555555, time: '01:30:04' },
    { name: 'FULANO 4', score: 222222, time: '01:30:04' },
    { name: 'FULANO 5', score: 111111, time: '01:30:04' },
    { name: 'FULANO 6', score: 0, time: '01:30:04' },
  ];

  const handleBack = () => {
    navigate(-1); // Volta uma página no histórico
  };

  return (
    <div className="ranking-wrapper">
      <button className="back-button" onClick={handleBack}>Voltar</button>

      <div className="ranking-container">
        <h1 className="ranking-title">Ranking</h1>

        <div className="ranking-table">
          <div className="ranking-header">
            <span>Nome</span>
            <span>Score</span>
          </div>

          {players.map((player, index) => (
            <div className="ranking-row" key={index}>
              <div className="player-name">{player.name}</div>
              <div className="player-score">
                PONTOS: {player.score.toString().padStart(7, '0')} &nbsp;&nbsp;
                TEMPO: {player.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
