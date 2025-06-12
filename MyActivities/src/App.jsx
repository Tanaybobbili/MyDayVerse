import Home from './components/pages/Home.jsx';
import MyActivities from './components/pages/MyActivities.jsx'
import Newspage from './components/pages/Newspage.jsx';
import {Routes,Route} from 'react-router-dom';
function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/myactivities' element={<MyActivities />} />
      <Route path='/news' element={<Newspage />}/>
    </Routes>
  </>)
}
export default App;