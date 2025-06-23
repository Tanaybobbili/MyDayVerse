import Home from './components/pages/Homepage.jsx';
import MyActivities from './components/pages/MyActivities.jsx'
import Newspage from './components/pages/Newspage.jsx';
import {Routes,Route} from 'react-router-dom';
import MyCalendar from './components/pages/MyCalendar.jsx'
import Moviespage from './components/pages/Moviespage.jsx';
import Gamespage from './components/pages/Gamespage.jsx';
function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/myactivities' element={<MyActivities />} />
      <Route path='/news' element={<Newspage />}/>
      <Route path='/mycalendar' element={<MyCalendar />} />
      <Route path='/movies' element={<Moviespage />} />
      <Route path='/games' element= {<Gamespage />} />
    </Routes>
  </>)
}
export default App;