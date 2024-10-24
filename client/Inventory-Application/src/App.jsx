import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { UserProvider } from '../reusing_Context/UserContext.jsx'
import UserLogin from '../pages/UserLogin.jsx'
import Header from '../pages/subpages/Header.jsx'
import Dashboard from '../pages/subpages/Dashboard.jsx'
import AdminDashboard from '../pages/subpages/AdminDashboard.jsx'
import ShowUser from '../pages/subpages/subdashboard/ShowUsers.jsx'
import ShowInfo from '../pages/subpages/subdashboard/ShowInfo.jsx'
import AddUser from '../pages/subpages/subdashboard/AddUser.jsx'
import UpdateUser from '../pages/subpages/subdashboard/UpdateUser.jsx'
import DeleteUser from '../pages/subpages/subdashboard/DeleteUser.jsx'
import Settings from '../pages/subpages/subdashboard/Settings.jsx'
import FeedBack from '../pages/subpages/subdashboard/FeedBack.jsx'
import './App.css'

export default function App() {
  const savedMode = localStorage.getItem('darkMode');
  const [isDarkMode, setIsDarkMode] = useState(savedMode === 'true');
  const [role, setRole] = useState(()=>{
    return localStorage.getItem('role');
  });

  const[isAuthenticated, setIsAuthenticated] = useState(()=>{
    return localStorage.getItem('isAuthenticated') === 'true'; 
  });

  useEffect(()=>{
    document.body.style.backgroundColor = isDarkMode ? 'rgb(205, 208, 212)' : 'Black';
    document.body.style.transition = '1s ease';

    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode])

  const toggleMode = ()=> {
    setIsDarkMode(prevMode => !prevMode);
  } 

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<UserLogin setIsAuthenticated={setIsAuthenticated} setRole={setRole}/>}/>

            {isAuthenticated ? (
              <>
                <Route path='/dashboard' element={<><Header/> <Dashboard/></>}>
                  <Route index element={<ShowUser/>} />
                  <Route path='add_user' element={<AddUser/>}/>
                  <Route path='show_users' element={<ShowUser/>}/>
                  <Route path='update_user' element={<UpdateUser/>}/>
                  <Route path='delete_user' element={<DeleteUser/>}/>
                  <Route path='settings' element={<Settings onToggleMode={toggleMode} isDarkMode={isDarkMode}/>}/>
                  <Route path='feedback' element={<FeedBack/>}/>
                
                  <Route path='*' element={<><Header/> <Navigate to='/dashboard'/></>}/>
                </Route>

                {role === 'admin' && (
                  <Route path='/admin_dashboard' element={<><Header/> <AdminDashboard/></>}>
                    <Route index element={<ShowInfo/>} />
                    <Route path='show_info' element={<ShowInfo/>} /> 
                    <Route path='settings' element={<Settings onToggleMode={toggleMode} isDarkMode={isDarkMode}/>}/>
                    <Route path='feedback' element={<FeedBack/>}/>

                    <Route path='*' element={<><Header/> <Navigate to='/admin_dashboard'/></>} />
                  </Route>
                )}
              </>
              ) : (
                <Route path='*' element={<Navigate to='/login'/>}/>
            )}
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}