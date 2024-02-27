import React from 'react';
import './style.css'; // CSS dosyasını import ediyoruz

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        LogoBurada
      </div>
      <nav className="navigation">
        <a href="/home">Home</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
