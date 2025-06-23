import Home from './components/pages/Homepage.jsx';
import MyActivities from './components/pages/MyActivities.jsx'
import {Routes,Route} from 'react-router-dom';
import MyCalendar from './components/pages/MyCalendar.jsx'
import Gamespage from './components/pages/Gamespage.jsx';
function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/myactivities' element={<MyActivities />} />
      <Route path='/mycalendar' element={<MyCalendar />} />
      <Route path='/games' element= {<Gamespage />} />
    </Routes>
  </>)
}
export default App;