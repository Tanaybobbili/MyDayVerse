import { useEffect, useRef, useState } from 'react';
import { getItem, setItem } from '../../utils/localStorage';
import './SnakeGame.css';

const canvasSize = 400;
const scale = 20;
const rows = canvasSize / scale;
const cols = canvasSize / scale;

function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [prevDirection, setPrevDirection] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getItem('highScore') || 0);
  const [isGameOver, setIsGameOver] = useState(false);

  const initSnakeAndFood = () => {
    const startX = Math.floor(Math.random() * cols);
    const startY = Math.floor(Math.random() * rows);
    setSnake([{ x: startX, y: startY }]);
    setFood({
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    });
    setDirection({ x: 0, y: 0 });
    setPrevDirection({ x: 0, y: 0 });
    setScore(0);
    setIsPaused(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    initSnakeAndFood();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }
      if (isPaused || isGameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (prevDirection.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (prevDirection.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (prevDirection.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (prevDirection.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevDirection, isPaused, isGameOver]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

    const bgColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5';
    const headColor = theme === 'dark' ? '#32ff7e' : '#008000';
    const bodyColor = theme === 'dark' ? '#158a6c' : '#004d00';
    const foodColor = theme === 'dark' ? '#ff4b4b' : '#ff0000';

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      if (snake.length > 0) {
        ctx.fillStyle = headColor;
        ctx.fillRect(snake[0].x * scale, snake[0].y * scale, scale, scale);

        ctx.fillStyle = bodyColor;
        snake.slice(1).forEach(segment => {
          ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        });

        ctx.fillStyle = foodColor;
        ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
      }
    };

    if (isPaused || isGameOver || (direction.x === 0 && direction.y === 0)) {
      draw();
      return;
    }

    const interval = setInterval(() => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      if (
        head.x < 0 || head.y < 0 ||
        head.x >= cols || head.y >= rows ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setIsGameOver(true);
        return;
      }

      newSnake.unshift(head);
      setPrevDirection(direction);

      if (head.x === food.x && head.y === food.y) {
        const newFood = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
        setFood(newFood);
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          setItem('highScore', newScore);
        }
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      draw();
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, food, isPaused, score, highScore, isGameOver]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.tabIndex = 0;
      canvasRef.current.focus();
    }
  }, []);

  return (
    <div className="snake-container">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="game-canvas"
      />
      <div className="side-panel">
        <div className="score-board">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
        <div className="controls">
          <button onClick={() => setIsPaused(p => !p)}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={initSnakeAndFood}>New Game</button>
          <button onClick={() => { setHighScore(0); setItem('highScore', 0); }}>
            Reset High Score
          </button>
        </div>
      </div>
      {isGameOver && <div className="game-over">Game Over</div>}
    </div>
  );
}

export default SnakeGame;
