import { useEffect, useState } from 'react';
import { getItem, setItem } from '../../utils/localStorage';
import './MemoryGame.css';

const generateCards = () => {
  const emojis = ['🍎', '🍌', '🍇', '🍒', '🍍', '🥝', '🍉', '🍑', '🍊', '🍓'];
  const doubled = [...emojis, ...emojis];
  return doubled
    .sort(() => 0.5 - Math.random())
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));
};

function MemoryGame() {
  const initialBest = getItem('memoryGameBestScore');
  const [cards, setCards] = useState(generateCards);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    typeof initialBest === 'number' ? initialBest : Number.MAX_SAFE_INTEGER
  );

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first].emoji === cards[second].emoji) {
        const newCards = cards.map((card, idx) =>
          idx === first || idx === second ? { ...card, matched: true } : card
        );
        setCards(newCards);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          );
          setCards(newCards);
          setFlippedIndices([]);
        }, 500);
      }
    }
  }, [flippedIndices, cards]);

  // ✅ Check if all cards matched (game finished)
  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    if (allMatched && cards.length > 0) {
      if (score < bestScore) {
        setItem('memoryGameBestScore', score);
        setBestScore(score);
      }
    }
  }, [cards, score, bestScore]);

  const handleClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedIndices((prev) => [...prev, index]);
    setScore((prev) => prev + 1);
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setScore(0);
  };

  const newGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setScore(0);
  };

  const resetHighScore = () => {
    setItem('memoryGameBestScore', Number.MAX_SAFE_INTEGER);
    setBestScore(Number.MAX_SAFE_INTEGER);
  };

  return (
    <div className="memory-container">
      <h2>Memory Match</h2>
      <div className="scoreboard">
        <span>Score: {score}</span>
        <span>Best Score: {bestScore === Number.MAX_SAFE_INTEGER ? '-' : bestScore}</span>
      </div>
      <div className="memory-grid large">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </div>
        ))}
      </div>
      <div className="button-group">
        <button className="memory-restart" onClick={resetGame}>Restart</button>
        <button className="memory-restart" onClick={newGame}>New Game</button>
        <button className="memory-restart" onClick={resetHighScore}>Reset High Score</button>
      </div>
    </div>
  );
}

export default MemoryGame;
