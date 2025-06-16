import './Games.css';
import { useState } from 'react';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';
import MemoryGame from './MemoryGame';

function Games() {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        return <SnakeGame />;
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'memory':
        return <MemoryGame />;
      default:
        return null;
    }
  };

  return (
    <div className="games-container">
      <div className="game-selection">
        <button onClick={() => setSelectedGame('snake')}>Snake Game</button>
        <button onClick={() => setSelectedGame('tic-tac-toe')}>Tic Tac Toe</button>
        <button onClick={() => setSelectedGame('memory')}>Memory Match</button>
      </div>

      {selectedGame && (
        <div className="game-screen">
          <div className="game-play">
            {renderGame()}
          </div>
          <div className="game-commands">
            <p><strong>Controls:</strong></p>
            {selectedGame === 'snake' && <p>Use Arrow Keys to move the snake.</p>}
            {selectedGame === 'tic-tac-toe' && <p>Click on a cell to mark X or O.</p>}
            {selectedGame === 'memory' && <p>Click on cards to flip and match pairs.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
