import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserLogin from '../pages/UserLogin.jsx'
import Header from '../pages/subpages/Header.jsx'
import Dashboard from '../pages/subpages/Dashboard.jsx'
import AdminDashboard from '../pages/subpages/AdminDashboard.jsx'
import ShowUser from '../pages/subpages/subdashboard/user_side/ShowUsers.jsx'
import AddUser from '../pages/subpages/subdashboard/user_side/AddUser.jsx'
import UpdateUser from '../pages/subpages/subdashboard/user_side/UpdateUser.jsx'
import DeleteUser from '../pages/subpages/subdashboard/user_side/DeleteUser.jsx'
import Settings from '../pages/subpages/subdashboard/Settings.jsx'
import FeedBack from '../pages/subpages/subdashboard/FeedBack.jsx'
import ShowUsersForm from '../pages/subpages/subdashboard/user_side/ShowUsersForm.jsx'
import ShowUsersTable from '../pages/subpages/subdashboard/user_side/ShowUsersTable.jsx'
import AddItem from '../pages/subpages/subdashboard/item_side/AddItem.jsx'
import ShowItem from '../pages/subpages/subdashboard/item_side/ShowItem.jsx'
import UpdateItem from '../pages/subpages/subdashboard/item_side/UpdateItem.jsx'
import './App.css'

export default function App() {
  const savedMode = localStorage.getItem('darkMode');
  const [isDarkMode, setIsDarkMode] = useState(savedMode === 'true');
  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    return localStorage.getItem('isAuthenticated') === 'true'; 
  });

  const [role, setRole] = useState(()=>{
    return localStorage.getItem('role');
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
      <Router>
        <Routes>
          <Route path='/login' element={<UserLogin setIsAuthenticated={setIsAuthenticated} setRole={setRole}/>}/>

          {isAuthenticated ? (  
            <>
              {role === 'admin' && (
              <Route path='/admin_dashboard' element={<><Header/> <AdminDashboard/></>}>
                <Route index element={<ShowUsersForm/>} />
                <Route path='add_user' element={<AddUser/>}/>

                <Route path='show_users' element={<ShowUser/>}>
                  <Route index element={<ShowUsersForm/>}/>
                  <Route path='show_users_form' element={<ShowUsersForm/>}/>
                  <Route path='show_users_table' element={<ShowUsersTable/>}/>
                </Route>

                <Route path='update_user' element={<UpdateUser/>}/>
                <Route path='delete_user' element={<DeleteUser/>}/>
                <Route path='settings' element={<Settings onToggleMode={toggleMode} isDarkMode={isDarkMode}/>}/>
                <Route path='feedback' element={<FeedBack/>}/>
              
                <Route path='*' element={<><Header/> <Navigate to='/admin_dashboard'/></>}/>
              </Route>
              )}
              
              {role === 'user' && (
                <Route path='/dashboard' element={<><Header/><Dashboard/></>}>
                  <Route index element={<ShowItem/>}/>
                  <Route path='add_item' element={<AddItem/>}/>

                  <Route path='show_item'/>

                  <Route path='update_item' element={<UpdateItem/>}/>
                  <Route path='settings' element={<Settings onToggleMode={toggleMode} isDarkMode={isDarkMode}/>}/>
                  <Route path='feedback' element={<FeedBack/>}/>

                  <Route path='*' element={<><Header/> <Navigate to='/dashboard'/></>}/>
                </Route>
              )}
            </>
            ) : (
              <Route path='*' element={<Navigate to='/login'/>}/>
          )}
        </Routes>
      </Router>
    </>
  )
}