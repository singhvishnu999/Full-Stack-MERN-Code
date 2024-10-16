import Home from './screen/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './screen/Login'
import Signup from './screen/Signup'
import Error from './screen/Error'
import './App.css'
import AddEvent from './screen/AddEvent'
function App() {
 
  return (
    <>  
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/event' element={<AddEvent />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/error' element={<Error/>} />
    </Routes>
    </>
  )
}

export default App