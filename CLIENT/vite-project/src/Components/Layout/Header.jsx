import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1 className="site-title">3waïoli</h1>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/recettes">Recettes</Link></li>
          <li><Link to="/Auth/Signin">Connexion</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;