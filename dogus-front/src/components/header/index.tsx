import React, { useEffect, useState } from 'react';
import './style.css'; 
import { deleteAuthUser, getAuthUser } from '../../utils/authService/Index';

const Header = () => {

  const [isUserAuth, setIsUserAuth] = useState<string | null>(getAuthUser())

  useEffect(() => {
    setIsUserAuth(getAuthUser())
  }, [])
  return (
    <header className="header">
      <div className="logo">
        LogoBurada
      </div>
      <nav className="navigation">
        <a href="/home">Home</a>
        <a href="/register">Register</a>
        {
          isUserAuth ? <a onClick={() => deleteAuthUser()} href="/login">Logout</a> : <a href="/login">Login</a>
        }

      </nav>
    </header>
  );
};

export default Header;
