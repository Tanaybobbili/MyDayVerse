import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { setItem, getItem } from '../../utils/localStorage.js';
import 'react-calendar/dist/Calendar.css';
import './Calendarpage.css';

function Calendarpage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [activities, setActivities] = useState(getItem('activities') || []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const addActivity = () => {
    if (message.trim() === '' || time.trim() === '') return;

    const newActivity = {
      date: selectedDate.toDateString(),
      time,
      detail: message
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    setItem('activities', updatedActivities);

    // Add a notification if within 1 hour
    const activityDateTime = new Date(`${newActivity.date} ${newActivity.time}`);
    const now = new Date();
    const oneHour = 60 * 60 * 1000;

    if (activityDateTime - now > 0 && activityDateTime - now <= oneHour) {
      const updatedNotifications = getItem('notifications') || [];
      const newNotification = {
        message: `Only 1 hour left for: ${newActivity.detail}`,
        time: newActivity.time
      };
      const exists = updatedNotifications.some(
        (n) => n.message === newNotification.message && n.time === newNotification.time
      );
      if (!exists) {
        setItem('notifications', [...updatedNotifications, newNotification]);
      }
    }

    setMessage('');
    setTime('');
  };

  return (
    <div className="page-container">
      <div className="calendar-section">
        <h2>Select Date</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className="activity-section">
        <h2>Set Activity</h2>
        <p><strong>Selected Date:</strong> {selectedDate.toDateString()}</p>
        <p><strong><big>Time</big></strong></p>
        <label>Format (HH:MM):</label>
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="time-input"
        />

        <label><strong>Message:</strong></label>
        <textarea
          onChange={handleMessageChange}
          placeholder="Enter the message to be delivered"
          value={message}
          className="activity-input"
        />

        <button className="activity-button" onClick={addActivity}>
          Set an Activity
        </button>

        {activities.length > 0 && (
          <div className="activity-list">
            <h3>Scheduled Activities</h3>
            <ul>
              {activities.map((activity, index) => {
                const [h, m] = activity.time.split(':');
                const hour = parseInt(h);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const formattedHour = hour % 12 || 12;

                return (
                  <li key={index}>
                    <strong>{activity.date}</strong> at <em>{formattedHour}:{m} {ampm}</em>: {activity.detail}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendarpage;
