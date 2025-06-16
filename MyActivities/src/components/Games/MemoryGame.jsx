import { useEffect, useState } from 'react';
import './MemoryGame.css';

const generateCards = () => {
  const emojis = ['🍎', '🍌', '🍇', '🍒', '🍍', '🥝'];
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
  const [cards, setCards] = useState(generateCards);
  const [flippedIndices, setFlippedIndices] = useState([]);

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
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  const handleClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedIndices((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
  };

  return (
    <div className="memory-container">
      <h2>Memory Match</h2>
      <div className="memory-grid">
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
      <button className="memory-restart" onClick={resetGame}>Restart</button>
    </div>
  );
}

export default MemoryGame;
