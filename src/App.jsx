import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import MasterScreen from './pages/MasterScreen'

function App() {
  
  return (
    <div>
      <Routes>
      
        <Route path='/signin' element={<Auth/>}/>
        <Route path='/' element={<Dashboard/>}/>
        
      </Routes>
    </div>
  )
}

export default App
