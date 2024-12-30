import React from 'react'
import { useNavigate } from "react-router-dom";
import { HiUserCircle, HiLogout } from "react-icons/hi";

const Header = ({isLoggedIn, logoutHandler}) => {
  const navigate = useNavigate();
  const onProfileBtnClick = () => {
    navigate('/login');
  };
  const onTasksBtnClick = () => {
    navigate('/tasks');
  };

  return (
  <>
    <header className='header'>
      <p>ToDoList</p>
      <div>
        {isLoggedIn 
          ?<HiLogout onClick={() => logoutHandler()} className='profileBtn' size={60}/>
          :<HiUserCircle onClick={onProfileBtnClick} className='profileBtn' size={60}/>
        }
      </div>
    </header>
    </>
  )
}

export default Header