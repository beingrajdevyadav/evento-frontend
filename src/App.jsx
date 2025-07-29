
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EventDetails from './pages/EventDetails'
import PageNotFound from './pages/PageNotFound'


function App() {


  return (
    <>
      <h1>Evento</h1>

      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/login' element={<Login/> } />
        <Route path='/register' element={<Register/> } />
        <Route path='/event/:id' element={<EventDetails/> } />
        <Route path='/dashboard' element={<Dashboard/> } />
        <Route path='*' element={<PageNotFound/> } />
      </Routes>
    </>
  )
}

export default App
