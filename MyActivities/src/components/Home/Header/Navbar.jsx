// Navbar.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    // Close sidebar on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isSidebarOpen &&
                !event.target.closest('.sidebar') &&
                !event.target.closest('.hamburger')
            ) {
                closeSidebar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <>
            <div className="navbar">
                {!isSidebarOpen && (
                    <div className="hamburger" onClick={toggleSidebar}>
                        &#9776;
                    </div>
                )}
                <button className="homebutton" onClick={() => navigate('/')}>
                    Home
                </button>
                <button className = "calendar-button">Calendar</button>
                <button className="activities-page-button" onClick={() => navigate('/myactivities')}>
                    My Activity List
                </button>
                <div className="search-container">
                    <input
                        id="searchbar"
                        className="searchbar"
                        type="text"
                        placeholder="Search"
                    />
                    <label className="search-icon" htmlFor="searchbar">
                        <i className="fa fa-search"></i>
                    </label>
                </div>
                <button className="tobedecided">Yet not know </button>
                <button className="notificationsbutton">Notifications</button>
            </div>

            {/* Render Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} navigate={navigate} />
        </>
    );
}

export default Navbar;
