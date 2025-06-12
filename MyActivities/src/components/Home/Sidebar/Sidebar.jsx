import './Sidebar.css';
import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleMyActivityButton = () => {
        navigate('/myactivities');
        toggleSidebar();
    }
    const handleHomeButton = () => {
        navigate('/');
        toggleSidebar();
    }
    const handleNewsButton = () => {
        navigate('/news');
        togglesSidebar();
    }

    return (
        <div className="sidebar-container">
            {/* Hamburger */}
            {!isOpen && (
                <div className="hamburger" onClick={toggleSidebar}>
                    &#9776;
                </div>
            )}

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Close Cross Mark */}
                <div className="close-btn" onClick={toggleSidebar}>
                    &#9747;
                </div>

                <h2 className="sidebar-title">Menu</h2>
                <ul className="menu-list">
                    <li onClick={handleHomeButton}>Home</li>
                    <li onClick={handleMyActivityButton}>My Activities</li>
                    <li onClick={handleNewsButton}>News</li>
                    <li>Games Corner</li>
                    <li>Movies</li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;