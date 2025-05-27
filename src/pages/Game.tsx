// JOAO-18/05
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import './Game.css';

// Interface para as cartas do jogo
interface CartaJogo {
  id: number;
  conteudo: string;
  virada: boolean;
  encontrada: boolean;
}

export const Game = () => {
  const { nivel } = useParams();
  const navigate = useNavigate();
  
  // Estados para controlar o jogo
  const [cartas, setCartas] = useState<CartaJogo[]>([]);
  const [cartasViradas, setCartasViradas] = useState<number[]>([]);
  const [tentativas, setTentativas] = useState<number>(0);
  const [pontuacao, setPontuacao] = useState<number>(1000);
  const [jogoCompleto, setJogoCompleto] = useState<boolean>(false);
  
  // Dados de exemplo para o ranking
  const ranking = Array(10).fill({ name: 'Jogador', score: 1000 });

  // Determinar número de cartas com base na dificuldade
  let numeroCartas = 30; // Padrão para difícil
  let colunas = 6;      // Padrão de colunas
  
  if (nivel === 'facil') {
    numeroCartas = 16;
    colunas = 4;        // 4x4 grid
  } else if (nivel === 'medio') {
    numeroCartas = 24;
    colunas = 6;        // 6x4 grid
  }
  
  // Inicializar as cartas quando o componente carregar
  useEffect(() => {
    inicializarCartas();
  }, [nivel]);
  
  // Função para inicializar o jogo com cartas embaralhadas
  const inicializarCartas = () => {
    // Criar array de conteúdos (pares)
    const conteudos = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🥥', 
                       '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨'];
                       
    // Pegar apenas a quantidade necessária para o nível
    const conteudosNivel = conteudos.slice(0, numeroCartas / 2);
    
    // Duplicar para criar pares
    let todosPares = [...conteudosNivel, ...conteudosNivel];
    
    // Embaralhar as cartas
    todosPares = todosPares.sort(() => Math.random() - 0.5);
    
    // Criar o array de cartas
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

  // Função para virar uma carta
  const virarCarta = (id: number) => {
    // Se já tem 2 cartas viradas ou a carta já está virada/encontrada, não faz nada
    if (cartasViradas.length === 2 || cartas[id].virada || cartas[id].encontrada) {
      return;
    }

    // Virar a carta clicada
    const novasCartas = [...cartas];
    novasCartas[id].virada = true;
    setCartas(novasCartas);
    
    // Adicionar ao array de cartas viradas
    const novasCartasViradas = [...cartasViradas, id];
    setCartasViradas(novasCartasViradas);
    
    // Se já tem 2 cartas viradas, verificar se são iguais
    if (novasCartasViradas.length === 2) {
      // Aumentar contador de tentativas
      setTentativas(prev => prev + 1);
      
      // Verificar se as cartas são iguais
      setTimeout(() => {
        verificarPar(novasCartasViradas);
      }, 1000); // Aguarda 1s para o usuário ver as cartas
    }
  };

  // Verificar se as duas cartas viradas são um par
  const verificarPar = (ids: number[]) => {
    const [id1, id2] = ids;
    const novasCartas = [...cartas];
    
    // Se as cartas têm o mesmo conteúdo
    if (novasCartas[id1].conteudo === novasCartas[id2].conteudo) {
      // Marcar como encontradas
      novasCartas[id1].encontrada = true;
      novasCartas[id2].encontrada = true;
      setPontuacao(prev => prev + 50); // Aumenta pontos por acerto
      
      // Verificar se o jogo acabou
      const todasEncontradas = novasCartas.every(carta => carta.encontrada);
      if (todasEncontradas) {
        setJogoCompleto(true);
        // Aqui você poderia salvar o recorde, mostrar mensagem, etc.
      }
    } else {
      // Não são iguais, virar de volta
      novasCartas[id1].virada = false;
      novasCartas[id2].virada = false;
      setPontuacao(prev => Math.max(0, prev - 25)); // Diminui pontos por erro
    }
    
    setCartas(novasCartas);
    setCartasViradas([]);
  };
  
  // Renderização do componente
  return (
    <div className="game-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>Voltar</button>
      
      <div className="game-content">
        {/* Tabuleiro */}
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
        
        {/* Ranking - mantido como está */}
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
        <Card className="tentativas">Tentativas: {tentativas}</Card>
        <Card className="pontuacao">Pontuação: {pontuacao}</Card>
      </div>
    </div>
  );
};