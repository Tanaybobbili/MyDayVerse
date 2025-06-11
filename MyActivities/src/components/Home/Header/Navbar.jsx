function Navbar() {
    const handleMyActivityButton = () => {
            
    }
    return (<div className = "navbar">
        <button className = "homebutton">
            Home
        </button>
        <button className="activities-page-button" onClick={()=>{handleMyActivityButton}}>
            My Activity List
        </button>
        
        <input className="searchbar"type="text" placeholder="Search"/>
        <button className="notificationsbutton">Notifications</button>
    </div>)
}
export default Navbar;

