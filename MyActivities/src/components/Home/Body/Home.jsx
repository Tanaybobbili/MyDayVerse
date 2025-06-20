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

      <h2 className="dashboard-title">Your Daily Dashboard</h2>

      <div className="dashboard-widgets">
        <div className="widget stats-widget">
          <h3>Quick Stats</h3>
          <p><strong>Total Activities:</strong> {activities.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
