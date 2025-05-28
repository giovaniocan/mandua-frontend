import React, { useState } from 'react';
import { Button } from "../components/Button";
import './ModelScore.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ModelScore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dificuldade, tempo, jogadas, pontuacao } = location.state || {};

  const [nome, setNome] = useState('');
  const [salvo, setSalvo] = useState(false);

  const gameStats = {
    difficulty: dificuldade,
    time: tempo,
    moves: jogadas,
    score: pontuacao,
  };

  const buttons: { text: string; color: "green" | "blue" | "brown"; onClick: () => void }[] = [
    {
      text: 'Jogar novamente',
      color: 'green',
      onClick: () => navigate(`/jogo`),
    },
    {
      text: 'Ver classificação',
      color: 'blue',
      onClick: () => navigate('/ranking'),
    },
    {
      text: 'Tela Inicial',
      color: 'brown',
      onClick: () => navigate('/home'),
    },
  ];

  return (
    <div
      className="modelscore-bg-center"
      style={{ backgroundImage: "url('/lovable-uploads/76d5c043-cef5-4051-882a-53e08a24e6a5.png')" }}
    >
      <div className="modelscore-card">
        <h1 className="modelscore-title">Parabéns!!</h1>
        <div className="modelscore-info">
          <div>
            <span className="modelscore-label">Dificuldade:</span>
            <span className="modelscore-value">{gameStats.difficulty}</span>
          </div>
          <div>
            <span className="modelscore-label">Tempo:</span>
            <span className="modelscore-value">{gameStats.time}</span>
          </div>
          <div>
            <span className="modelscore-label">Jogadas:</span>
            <span className="modelscore-value">{gameStats.moves}</span>
          </div>
          <hr className="modelscore-divider" />
          <div>
            <span className="modelscore-label modelscore-score-label">Pontuação:</span>
            <span className="modelscore-value modelscore-score-value">{gameStats.score}</span>
          </div>
        </div>
        <div className="modelscore-save">
          <span className="modelscore-save-label">Salvar sua pontuação</span>
          <div className="modelscore-save-row">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="modelscore-input"
              disabled={salvo}
            />
            <button
              onClick={() => {
                if (nome.trim()) {
                  setSalvo(true);
                  console.log("Salvo:", nome, gameStats.score);
                }
              }}
              className="modelscore-save-btn"
              disabled={salvo || !nome.trim()}
            >
              Salvar
            </button>
          </div>
          {salvo && <span className="modelscore-saved-msg">Pontuação salva!</span>}
        </div>
        <div className="modelscore-buttons">
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              color={btn.color}
              onClick={btn.onClick}
              text={btn.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelScore;