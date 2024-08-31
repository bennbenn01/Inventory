import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserLogin from '../pages/userLogin'
import Dashboard from '../pages/subpages/Dashboard'
import './App.css'

export default function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false);

  //TODO: Restructure of reloading if it is already in the current page 
  //      but returning to the login page
  useEffect(()=>{
    const storedUsername = localStorage.getItem('username');
    if(storedUsername){
      setIsAuthenticated(true);
    }
  },[]);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<UserLogin setIsAuthenticated={setIsAuthenticated}/>}/>

          {isAuthenticated ? (
            <>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='*' element={<Navigate to='/dashboard'/>}/>
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