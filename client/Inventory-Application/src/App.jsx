import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserLogin from '../pages/userLogin'
import Header from '../pages/subpages/Header.jsx'
import Dashboard from '../pages/subpages/Dashboard.jsx'
import './App.css'

export default function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(()=>{
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<UserLogin setIsAuthenticated={setIsAuthenticated}/>}/>

          {isAuthenticated ? (
            <>
              <Route path='/dashboard' element={<><Header/> <Dashboard/></>}/>
              <Route path='*' element={<><Header/> <Navigate to='/dashboard'/></>}/>
            </>
            ) : (
              <Route path='*' element={<Navigate to='/login'/>}/>
            )
          }
        </Routes>
      </Router>
    </>
  )
}