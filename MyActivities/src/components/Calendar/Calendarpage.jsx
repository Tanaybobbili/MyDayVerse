import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendarpage.css';

function Calendarpage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [activities, setActivities] = useState([]);

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
    setActivities([...activities, newActivity]);
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
        <label>Format (HH:MM AM/PM):</label>
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
                const [h, m] = activity.time.split(":");
                const hour = parseInt(h);
                const ampm = hour >= 12 ? "PM" : "AM";
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
