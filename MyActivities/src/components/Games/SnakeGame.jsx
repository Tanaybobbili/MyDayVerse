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
    if (isPaused || isGameOver || (direction.x === 0 && direction.y === 0)) {
      ctx.fillStyle = '#f1f1f1';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      if (snake.length > 0) {
        ctx.fillStyle = '#31ff13';
        ctx.fillRect(snake[0].x * scale, snake[0].y * scale, scale, scale);

        ctx.fillStyle = '#1c4b52';
        snake.slice(1).forEach(segment => {
          ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        });

        ctx.fillStyle = '#ff0000';
        ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
      }

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

      ctx.fillStyle = '#f1f1f1';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      ctx.fillStyle = '#31ff13';
      ctx.fillRect(newSnake[0].x * scale, newSnake[0].y * scale, scale, scale);

      ctx.fillStyle = '#1c4b52';
      newSnake.slice(1).forEach(segment => {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      });

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, food, isPaused, score, highScore, isGameOver]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.tabIndex = 0;
      canvasRef.current.focus();
    }
  }, []);

  const handlePauseResume = () => setIsPaused(!isPaused);

  const handleNewGame = () => {
    initSnakeAndFood();
  };

  const handleResetHighScore = () => {
    setItem('highScore', 0);
    setHighScore(0);
  };

  return (
    <div className="snake-container">
      <div className="score-board">
        <span>Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="game-canvas"
      />
      {isGameOver && <div className="game-over">Game Over</div>}
      <div className="controls">
        <button onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={handleResetHighScore}>Reset High Score</button>
      </div>
    </div>
  );
}

export default SnakeGame;
