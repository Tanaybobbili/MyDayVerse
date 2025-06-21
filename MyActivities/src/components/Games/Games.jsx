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
        return (
          <div className="game-placeholder">
            <p>Select a game to play.</p>
          </div>
        );
    }
  };

  return (
    <div className="games-container">
      <h1>🎮 Choose Your Game</h1>
      <div className="game-selection">
        <button
          onClick={() => setSelectedGame('snake')}
          className={selectedGame === 'snake' ? 'active' : ''}
        >
          Snake Game
        </button>
        <button
          onClick={() => setSelectedGame('tic-tac-toe')}
          className={selectedGame === 'tic-tac-toe' ? 'active' : ''}
        >
          Tic Tac Toe
        </button>
        <button
          onClick={() => setSelectedGame('memory')}
          className={selectedGame === 'memory' ? 'active' : ''}
        >
          Memory Match
        </button>
      </div>

      <div className="game-screen">
        {renderGame()}
        {selectedGame && (
          <div className="game-commands">
            <p><strong>Controls:</strong></p>
            {selectedGame === 'snake' && <p>Use Arrow Keys to move. Space to pause/resume.</p>}
            {selectedGame === 'tic-tac-toe' && <p>Click a cell to place your mark.</p>}
            {selectedGame === 'memory' && <p>Flip cards to match identical pairs.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Games;
