import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, navigate }) {
  const handleNav = (path) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="close-btn" onClick={toggleSidebar}>
        &#x2715;
      </div>

      <h2 className="sidebar-title">Menu</h2>
      <ul className="menu-list">
        <li onClick={() => handleNav('/')}>🏠 Home</li>
        <li onClick={() => handleNav('/myactivities')}>🗂 My Activities</li>
        <li onClick={() => handleNav('/mycalendar')}>📅 Calendar</li>
        <li onClick={() => handleNav('/games')}>🎮 Games</li>
      </ul>
    </div>
  );
}

export default Sidebar;
