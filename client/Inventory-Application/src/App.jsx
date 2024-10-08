import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { UserProvider } from '../reusing_Context/UserContext.jsx'
import UserLogin from '../pages/UserLogin.jsx'
import Header from '../pages/subpages/Header.jsx'
import Dashboard from '../pages/subpages/Dashboard.jsx'
import ShowUser from '../pages/subpages/subdashboard/ShowUsers.jsx'
import AddUser from '../pages/subpages/subdashboard/AddUser.jsx'
import UpdateUser from '../pages/subpages/subdashboard/UpdateUser.jsx'
import DeleteUser from '../pages/subpages/subdashboard/DeleteUser.jsx'
import Settings from '../pages/subpages/subdashboard/Settings.jsx'
import './App.css'

export default function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(()=>{
    return localStorage.getItem('isAuthenticated') === 'true'; 
  });

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<UserLogin setIsAuthenticated={setIsAuthenticated}/>}/>

            {isAuthenticated ? (
              <>
                <Route path='/dashboard' element={<><Header/> <Dashboard/></>}>
                  <Route index element={<ShowUser/>} />
                  <Route path='add_user' element={<AddUser/>}/>
                  <Route path='show_users' element={<ShowUser/>}/>
                  <Route path='update_user' element={<UpdateUser/>}/>
                  <Route path='delete_user' element={<DeleteUser/>}/>
                  <Route path='settings' element={<Settings/>}/>
                </Route>

                <Route path='*' element={<><Header/> <Navigate to='/dashboard'/></>}/>
              </>
              ) : (
                <Route path='*' element={<Navigate to='/login'/>}/>
              )
            }
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}