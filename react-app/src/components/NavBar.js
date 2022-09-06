
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'

const NavBar = () => {
  return (
    <nav className='left-nav'>
      <ul>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className="buzzer-icon" src="https://st2.depositphotos.com/1069290/10659/v/950/depositphotos_106590564-stock-illustration-bee-logo-sign-icon-vector.jpg?forcejpeg=true" alt=''/>
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
