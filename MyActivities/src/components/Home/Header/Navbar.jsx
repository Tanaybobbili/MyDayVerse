import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { getItem, setItem } from '../../../utils/localStorage.js';
import { Bell } from 'lucide-react';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(getItem('notifications') || []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest('.sidebar') &&
        !event.target.closest('.hamburger')
      ) {
        closeSidebar();
      }

      if (
        isPopupOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.closest('.notificationsbutton')
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, isPopupOpen]);

  const clearAll = () => {
    setNotifications([]);
    setItem('notifications', []);
  };

  const clearOne = (index) => {
    const updated = notifications.filter((_, i) => i !== index);
    setNotifications(updated);
    setItem('notifications', updated);
  };

  const getStatusClass = (note) => {
    if (!note.time) return 'active';
    const [h, m] = note.time.split(':').map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    return now > target ? 'expired' : 'active';
  };

  const handleDelete = (index, note) => {
    const isActive = getStatusClass(note) === 'active';
    if (isActive) {
      const confirmDelete = window.confirm('This activity has not expired. Still want to remove it?');
      if (!confirmDelete) return;
    }
    clearOne(index);
  };

  return (
    <>
      <div className="navbar">
        {!isSidebarOpen && (
          <div className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </div>
        )}

        <button className="homebutton" onClick={() => navigate('/')}>Home</button>
        <button className="calendar-button" onClick={() => navigate('/mycalendar')}>Calendar</button>
        <button className="activities-page-button" onClick={() => navigate('/myactivities')}>Activities</button>
        <button className="gamesbutton" onClick={() => navigate('/games')}>Games</button>
        <button className="moviesbutton" onClick={() => navigate('/movies')}>Movies</button>
        <button className="newsbutton" onClick={() => navigate('/news')}>News</button>

        <div className="notification-container">
          <button
            className={`notificationsbutton ${notifications.length > 0 ? 'pulse' : ''}`}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            <Bell size={20} />
            <span className="notification-text">Notifications</span>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
        </div>

        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {isPopupOpen && (
        <div className="notification-popup" ref={popupRef}>
          <div className="notification-header">
            <strong>Notifications</strong>
            <button className="clear-all" onClick={clearAll}>Clear All</button>
          </div>
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((note, index) => {
                const statusClass = getStatusClass(note);
                return (
                  <div key={index} className={`notification-item ${statusClass}`}>
                    <span>
                      <strong>{note.message}</strong><br />
                      <small>Time: {note.time || 'N/A'}</small>
                    </span>
                    <button onClick={() => handleDelete(index, note)}>X</button>
                  </div>
                );
              })
            ) : (
              <p className="no-notify">No notifications</p>
            )}
          </div>
        </div>
      )}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} navigate={navigate} />
    </>
  );
}

export default Navbar;
