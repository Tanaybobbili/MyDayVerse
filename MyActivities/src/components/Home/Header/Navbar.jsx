import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { getItem, setItem } from '../../../utils/localStorage.js';
import { Bell } from 'lucide-react';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState(getItem('notifications') || []);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const popupRef = useRef();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    // Auto update clock every second to refresh notification status
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Handle click outside to close sidebar and popup
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
        const now = currentTime;
        const target = new Date();
        target.setHours(h, m, 0, 0);
        return now > target ? 'expired' : 'active';
    };

    const handleDelete = (index, note) => {
        const isActive = getStatusClass(note) === 'active';
        if (isActive) {
            const confirmDelete = window.confirm('The activity time has not yet completed. Are you sure you want to remove it?');
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
                <button className="activities-page-button" onClick={() => navigate('/myactivities')}>My Activity List</button>

                <div className="search-container">
                    <input id="searchbar" className="searchbar" type="text" placeholder="Search" />
                    <label className="search-icon" htmlFor="searchbar">
                        <i className="fa fa-search"></i>
                    </label>
                </div>

                <button className="tobedecided">Yet not know</button>

                <div className="notification-container">
                    <button className="notificationsbutton" onClick={() => setIsPopupOpen(!isPopupOpen)}>
                        <Bell size={20} />
                        <span className="notification-text">Notifications</span>
                        {notifications.length > 0 && (
                            <span className="notification-badge">{notifications.length}</span>
                        )}
                    </button>
                </div>
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
