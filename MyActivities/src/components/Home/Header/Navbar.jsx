import {useNavigate} from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate();
    const handleMyActivityButton = () => {
        navigate('/myactivities');
    }
    const handleHomeButton = () => {
        navigate('/');
    }
    return (<div className = "navbar">
        <button className = "homebutton" onClick={()=>{handleHomeButton()}}>
            Home
        </button>
        <button className="activities-page-button" onClick={()=>{handleMyActivityButton()}}>
            My Activity List
        </button>
        <div className="search-container"><input id="searchbar" className="searchbar" type="text" placeholder="Search" />
            <label className="search-icon" htmlFor="searchbar"><i className="fa fa-search"></i></label>
        </div>

        
        <button className="notificationsbutton">Notifications</button>
    </div>)
}
export default Navbar;

