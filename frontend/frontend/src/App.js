import './App.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import Header from './components/Header';

import Login from './pages/Login';
import Registration from "./pages/Registration";
import {logout} from "./api/auth";
import TasksList from './pages/TasksList';
import TaskChange from './pages/TaskChange';
import { createTask, updateTaskById} from './api/TasksService';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const handleAuthenticate = async () => {
    const storedUser = await JSON.parse(Cookies.get('user'));
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
    setUserId(storedUser.id);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    try{
      const accessToken = Cookies.get('accessToken');
      console.log(accessToken);
      if (accessToken) {
        handleAuthenticate();
      }
    }catch(error){
      console.error(error);
    }
  }, []);


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
      <Header isLoggedIn={isAuthenticated} logoutHandler={handleLogout}/>
        <Routes>
			    <Route path='/login' element={<Login handleAuthenticate={handleAuthenticate}/>} />
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/tasks" element={<TasksList isLoggedIn={isAuthenticated}/>} />
          <Route path="/tasks/add" element={<TaskChange handleAction={createTask}/>} />
          <Route path="/tasks/:id" element={<TaskChange handleAction={updateTaskById} />}/>
          <Route path="*" element={<Navigate to={'/login'} />} />
          <Route path='/' element={<Navigate to={'/login'} />} />
        </Routes>
    </>
  );
}

export default App;