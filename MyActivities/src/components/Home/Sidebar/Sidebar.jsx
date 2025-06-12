// Sidebar.jsx
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, navigate }) {
    const handleNav = (path) => {
        navigate(path);
        toggleSidebar();
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {/* Close button */}
            <div className="close-btn" onClick={toggleSidebar}>
                &#9747;
            </div>

            <h2 className="sidebar-title">Menu</h2>
            <ul className="menu-list">
                <li onClick={() => handleNav('/')}>Home</li>
                <li onClick={() => handleNav('/myactivities')}>My Activities</li>
                <li onClick={() => handleNav('/news')}>News</li>
                <li>Games Corner</li>
                <li>Movies</li>
            </ul>
        </div>
    );
}

export default Sidebar;
