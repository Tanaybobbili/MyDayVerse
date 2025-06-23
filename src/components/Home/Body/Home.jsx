import './Home.css';
import { useEffect, useState } from 'react';
import { getItem } from '../../../utils/localStorage';

function Home() {
  const [time, setTime] = useState(new Date());
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedActivities = getItem('activities') || [];
    setActivities(storedActivities);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="top-clock-widget">
        <p className="clock-time">{time.toLocaleTimeString()}</p>
      </div>

      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-widgets">
        <div className="glass widget blue scale-in delay-1">
          <h3>Pages Available</h3>
          <ul>
            <li>📝 My Activities</li>
            <li>📆 Calendar</li>
            <li>🔔 Notifications</li>
          </ul>
        </div>

        <div className="glass widget green scale-in delay-2">
          <h3>Available Games</h3>
          <ul>
            <li>🐍 Snake</li>
            <li>❌⭕ Tic Tac Toe</li>
            <li>🧠 Memory Match</li>
          </ul>
        </div>

        <div className="glass widget purple scale-in delay-3">
          <h3>How to Create Activity</h3>
          <ol>
            <li>Go to 📆 <strong>Calendar</strong></li>
            <li>Select date and time</li>
            <li>Enter activity title</li>
            <li>Click <strong>Set an Activity</strong></li>
          </ol>
        </div>

        <div className="glass widget red scale-in delay-4">
          <h3>Total Activities</h3>
          <div className="activity-ring">
            <div className="ring-center">{activities.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
