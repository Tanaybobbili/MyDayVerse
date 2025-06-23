import './Activities.css';
import { getItem, setItem } from '../../utils/localStorage.js';
import { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState(getItem('activities') || []);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  // Live clock
  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Live expiration and notification updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const oneHour = 60 * 60 * 1000;
      const storedActivities = getItem('activities') || [];
      let updatedNotifications = getItem('notifications') || [];

      const filtered = storedActivities.filter((activity) => {
        const activityDateTime = new Date(`${activity.date} ${activity.time}`);
        const timeDiff = activityDateTime - now;

        // Add notification if within 1 hour
        if (timeDiff > 0 && timeDiff <= oneHour) {
          const message = `Only 1 hour left for: ${activity.detail}`;
          const exists = updatedNotifications.some(
            (n) => n.message === message && n.time === activity.time
          );
          if (!exists) {
            updatedNotifications.push({
              message,
              time: activity.time
            });
          }
        }

        return activityDateTime > now; // Keep only future events
      });

      // Update state and storage only if changed
      if (filtered.length !== activities.length) {
        setActivities(filtered);
        setItem('activities', filtered);
      }

      setItem('notifications', updatedNotifications);
    }, 1000);

    return () => clearInterval(interval);
  }, [activities]);

  const handleReset = () => {
    setItem('activities', []);
    setActivities([]);
    console.log('Activities reset');
  };

  const handleDelete = (indexToDelete) => {
    const updated = activities.filter((_, index) => index !== indexToDelete);
    setActivities(updated);
    setItem('activities', updated);
  };

  const filteredActivities = activities.filter((activity) =>
    activity.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.detail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="activities-main">
      <div className="activities-container">
        <h1>My Activities</h1>

        <div className="live-clock">
          <p>{currentTime.toLocaleTimeString()}</p>
        </div>

        <input
          type="text"
          className="activities-search"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="reset-button" onClick={handleReset}>Reset All</button>

        {filteredActivities.length > 0 ? (
          <div className="activities-list">
            {filteredActivities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-info">
                  <p><strong>Date:</strong> {activity.date}</p>
                  <p><strong>Time:</strong> {activity.time}</p>
                  <p><strong>Detail:</strong> {activity.detail}</p>
                </div>
                <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-activities">No activities found.</p>
        )}
      </div>
    </main>
  );
}

export default Activities;
