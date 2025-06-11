import Home from './components/pages/Home.jsx';
import MyActivities from './components/pages/MyActivities.jsx'
import {Routes,Route} from 'react-router-dom';
function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/myactivities' element={<MyActivities />} />
    </Routes>
  </>)
}
export default App;