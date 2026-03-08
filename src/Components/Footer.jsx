import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="Footer">
      <div className="footer-container">

        <div className="footer-about">
          <h3>FITCLUB</h3>
          <p>Your fitness journey starts here. Stay motivated, stay consistent, and achieve your goals with us!</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Memberships</a></li>
            <li><a href="#">Classes</a></li>
            <li><a href="#">Trainers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: info@fitclub.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Location: Lahore, Pakistan</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FITCLUB. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
