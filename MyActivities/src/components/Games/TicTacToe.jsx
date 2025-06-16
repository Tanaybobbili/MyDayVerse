import { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const isTie = !winner && board.every(Boolean);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const renderStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isTie) return "It's a Tie!";
    return `Next Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="ttt-container">
      <h2>{renderStatus()}</h2>
      <div className="ttt-board">
        {board.map((value, idx) => (
          <div
            key={idx}
            className="ttt-cell"
            onClick={() => handleClick(idx)}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={restartGame} className="ttt-restart">Restart</button>
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8], 
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default TicTacToe;
