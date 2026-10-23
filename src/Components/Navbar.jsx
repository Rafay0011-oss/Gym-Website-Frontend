import React from 'react'
import "./Navbar.css"
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ onLoginClick }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [darkMode])
  return (
    <div className='navbar'>
      <div className="left">
        FITCLUB
      </div>
      <div className={`mid ${isOpen ? "active" : ""}`}>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Services-section">Services</a></li>
          <li><a href="#Membership-section">Pricing</a></li>
          <li><a href="#Footer">Contact Us</a></li>
        </ul>
      </div>
      <div className="right">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
        {isAuthenticated ? (
          <button className="theme-toggle" onClick={logout}>
            👋 {user.name.split(' ')[0]}
          </button>
        ) : (
          <button className="theme-toggle" onClick={onLoginClick}>
            🔑 Login
          </button>
        )}
      </div>
        <div className="nav-icon" id="nav-icon" onClick={toggleMenu}>
          ☰
        </div>
    </div>
  )
}

export default Navbar
