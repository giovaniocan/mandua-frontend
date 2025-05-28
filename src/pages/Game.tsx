// JOAO-18/05
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
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

  // LÓGICA DA DIFICULDADE
  // Determina número de cartas com base na dificuldade, definindo o "DIFICIL" como padrão
  let numeroCartas = 30; 
  let colunas = 6;      
  
  if (nivel === 'facil') {
    numeroCartas = 16;
    colunas = 4;        
  } else if (nivel === 'medio') {
    numeroCartas = 24;
    colunas = 6;        
  }
  

  // Inicializando as cartas
  useEffect(() => {
    inicializarCartas();
  }, [nivel]);
  
  const inicializarCartas = () => {
    // MUDAR PARA O COMPONENTE QUANDO PRONTO
    const conteudos = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🥥', 
                       '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨'];
                       
    const conteudosNivel = conteudos.slice(0, numeroCartas / 2);  // Traz a quantidade certa de cartas pelo nivel
    let todosPares = [...conteudosNivel, ...conteudosNivel];      // Duplica as cartas no tabuleiro
    todosPares = todosPares.sort(() => Math.random() - 0.5);      // Embaralha as cartas

    //DEPOIS ALTERADO PARA O COMPONENTE QUANDO PRONTO
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

  // Função para virar carta
  const virarCarta = (id: number) => {
    // Se já tem 2 cartas viradas ou a carta já está virada/encontrada, não faz nada
    if (cartasViradas.length === 2 || cartas[id].virada || cartas[id].encontrada) {
      return;
    }

    const novasCartas = [...cartas];                   // Virar a carta clicada
    novasCartas[id].virada = true;                     // Marca a carta como virada
    setCartas(novasCartas);                            // Atualiza o estado das cartas
    const novasCartasViradas = [...cartasViradas, id]; // Adiciona ao array de cartas viradas
    setCartasViradas(novasCartasViradas);
    
    
    if (novasCartasViradas.length === 2) {             // Se já tem 2 cartas viradas, verificar se são iguais
      setTentativas(prev => prev + 1);                 // Aumenta contador de tentativas
      setTimeout(() => {                               // Verifica se as cartas são iguais
        verificarPar(novasCartasViradas);
      }, 1000);                                        // Timing de 1s para virar as cartas
    }
  };

  // Verificar se as duas cartas viradas são um par
  const verificarPar = (ids: number[]) => {              
    const [id1, id2] = ids;
    const novasCartas = [...cartas];
    
    
    if (novasCartas[id1].conteudo === novasCartas[id2].conteudo) { // Se as cartas têm o mesmo conteúdo
      novasCartas[id1].encontrada = true;                          // Marcar como encontradas
      novasCartas[id2].encontrada = true;
      setPontuacao(prev => prev + 50);                             // Aumenta pontos por acerto
      
      const todasEncontradas = novasCartas.every(carta => carta.encontrada); // Verificar se o jogo acabou
      if (todasEncontradas) {
        setJogoCompleto(true);
      }


    } else {                                                                 // Não são iguais, virar de volta
      novasCartas[id1].virada = false;
      novasCartas[id2].virada = false;
      setPontuacao(prev => Math.max(0, prev - 25));                          // Diminui pontos por erro
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