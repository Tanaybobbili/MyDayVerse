import './Activities.css';
import { getItem, setItem } from '../../utils/localStorage.js';
import { useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState(getItem('activities') || []);

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

  return (
    <main className="activities-main">
      <div className="activities-container">
        <h1>My Activities</h1>
        <button className="reset-button" onClick={handleReset}>Reset All</button>

        {activities.length > 0 ? (
          <div className="activities-list">
            {activities.map((activity, index) => (
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
          <p className="no-activities">No activities available</p>
        )}
      </div>
    </main>
  );
}

export default Activities;
