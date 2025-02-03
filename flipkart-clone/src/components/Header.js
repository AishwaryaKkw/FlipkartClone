// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Flipkart_logo_2018.svg" 
          alt="Flipkart Logo"
          className="header__logoImage"
        />
      </div>

      <div className="header__search">
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          className="header__searchInput" 
        />
        <button className="header__searchButton">Search</button>
      </div>

      <div className="header__nav">
        {/* Link to the Login page */}
        <Link to="/login">
          <button className="header__navButton">Login</button>
        </Link>

        {/* Link to the Register page */}
        <Link to="/register">
          <button className="header__navButton">Sign Up</button>
        </Link>

        <button className="header__navButton">Cart</button>
      </div>
    </div>
  );
};

export default Header;
