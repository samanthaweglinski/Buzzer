import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "../CSS/LogoutButton.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div onClick={onLogout} className="logout-button">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
    </div>
  )
};

export default LogoutButton;
