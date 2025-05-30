// JOAO-18/05
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { useLanguage } from '../languageContext';
import './Game.css';

interface CartaJogo {
  id: number;
  conteudo: string;
  virada: boolean;
  encontrada: boolean;
}

export const Game = () => {
  const { nivel } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [cartas, setCartas] = useState<CartaJogo[]>([]);
  const [cartasViradas, setCartasViradas] = useState<number[]>([]);
  const [tentativas, setTentativas] = useState<number>(0);
  const [pontuacao, setPontuacao] = useState<number>(1000);
  const [jogoCompleto, setJogoCompleto] = useState<boolean>(false);

  const ranking = Array(10).fill({ name: 'Jogador', score: 1000 });

  let numeroCartas = 30;
  let colunas = 6;

  if (nivel === 'facil') {
    numeroCartas = 16;
    colunas = 4;
  } else if (nivel === 'medio') {
    numeroCartas = 24;
    colunas = 6;
  }

  useEffect(() => {
    inicializarCartas();
  }, [nivel]);

  const inicializarCartas = () => {
    const conteudos = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🥥',
                       '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨'];

    const conteudosNivel = conteudos.slice(0, numeroCartas / 2);
    let todosPares = [...conteudosNivel, ...conteudosNivel];
    todosPares = todosPares.sort(() => Math.random() - 0.5);

    const novasCartas: CartaJogo[] = todosPares.map((conteudo, index) => ({
      id: index,
      conteudo,
      virada: false,
      encontrada: false
    }));

    setCartas(novasCartas);
    setCartasViradas([]);
    setTentativas(0);
    setPontuacao(1000);
    setJogoCompleto(false);
  };

  const virarCarta = (id: number) => {
    if (cartasViradas.length === 2 || cartas[id].virada || cartas[id].encontrada) {
      return;
    }

    const novasCartas = [...cartas];
    novasCartas[id].virada = true;
    setCartas(novasCartas);
    const novasCartasViradas = [...cartasViradas, id];
    setCartasViradas(novasCartasViradas);

    if (novasCartasViradas.length === 2) {
      setTentativas(prev => prev + 1);
      setTimeout(() => {
        verificarPar(novasCartasViradas);
      }, 1000);
    }
  };

  const verificarPar = (ids: number[]) => {
    const [id1, id2] = ids;
    const novasCartas = [...cartas];

    if (novasCartas[id1].conteudo === novasCartas[id2].conteudo) {
      novasCartas[id1].encontrada = true;
      novasCartas[id2].encontrada = true;
      setPontuacao(prev => prev + 50);

      const todasEncontradas = novasCartas.every(carta => carta.encontrada);
      if (todasEncontradas) {
        setJogoCompleto(true);
      }
    } else {
      novasCartas[id1].virada = false;
      novasCartas[id2].virada = false;
      setPontuacao(prev => Math.max(0, prev - 25));
    }

    setCartas(novasCartas);
    setCartasViradas([]);
  };

  return (
    <div className="game-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>
        {t("difficulty", "back")}
      </button>

      <div className="game-content">
        <Card className="game-board-container">
          <div className="game-board" style={{ 
            gridTemplateColumns: `repeat(${colunas}, 1fr)` 
          }}>
            {cartas.map((carta) => (
              <div 
                key={carta.id} 
                className={`game-card ${carta.virada ? 'virada' : ''} ${carta.encontrada ? 'encontrada' : ''}`}
                onClick={() => virarCarta(carta.id)}
              >
                {carta.virada || carta.encontrada ? carta.conteudo : '?'}
              </div>
            ))}
          </div>
        </Card>

        <Card className="game-ranking-container">
          <h1 className="ranking-title">Ranking</h1>
          <div className="ranking-header">
            <div className="ranking-header-nome">{t("ranking", "name")}</div>
            <div className="ranking-header-pontos">{t("ranking", "points")}</div>
          </div>
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

      <div className="game-info">
        <Card className="tentativas">
          {t("game", "try")}: {tentativas}
        </Card>
        <Card className="pontuacao">
          {t("game", "score")}: {pontuacao}
        </Card>
      </div>
    </div>
  );
};

