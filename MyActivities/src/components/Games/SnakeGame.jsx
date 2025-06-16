import { useEffect, useRef, useState } from 'react';

const canvasSize = 400;
const scale = 20;
const rows = canvasSize / scale;
const cols = canvasSize / scale;

function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':    setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown':  setDirection({ x: 0, y: 1 });  break;
        case 'ArrowLeft':  setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': setDirection({ x: 1, y: 0 });  break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const interval = setInterval(() => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // Wall collision
      if (
        head.x < 0 || head.y < 0 ||
        head.x >= cols || head.y >= rows ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 0, y: 0 });
        return;
      }

      newSnake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);

      // Draw
      ctx.fillStyle = '#f1f1f1';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      ctx.fillStyle = '#4caf50';
      newSnake.forEach(segment => {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      });

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, food]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: '2px solid #555', background: '#fff' }}
      />
    </div>
  );
}

export default SnakeGame;
