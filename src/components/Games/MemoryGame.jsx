import { useEffect, useState } from 'react';
import { getItem, setItem } from '../../utils/localStorage';
import './MemoryGame.css';

const generateCards = () => {
  const emojis = ['🍎','🍌','🍇','🍒','🍍','🥝','🍉','🍑','🍊','🍓'];
  return [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
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
    typeof initialBest === 'number'
      ? initialBest
      : Number.MAX_SAFE_INTEGER
  );

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev =>
          prev.map((c, i) =>
            (i === first || i === second) ? { ...c, matched: true } : c
          )
        );
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map((c, i) =>
              (i === first || i === second) ? { ...c, flipped: false } : c
            )
          );
          setFlippedIndices([]);
        }, 500);
      }
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (cards.every(c => c.matched)) {
      if (score < bestScore) {
        setItem('memoryGameBestScore', score);
        setBestScore(score);
      }
    }
  }, [cards, score, bestScore]);

  const handleClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched)
      return;
    setCards(prev =>
      prev.map((c, i) =>
        i === index ? { ...c, flipped: true } : c
      )
    );
    setFlippedIndices(prev => [...prev, index]);
    setScore(prev => prev + 1);
  };

  const resetGame = () => {
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
        <span>Best: {bestScore === Number.MAX_SAFE_INTEGER ? '-' : bestScore}</span>
      </div>
      <div className="memory-grid">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
            onClick={() => handleClick(i)}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={resetGame}>Restart</button>
        <button onClick={resetGame}>New Game</button>
        <button onClick={resetHighScore}>Reset Best</button>
      </div>
    </div>
  );
}

export default MemoryGame;
