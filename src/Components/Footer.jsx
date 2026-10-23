import React, { useState } from 'react'
import "./Footer.css"
import { newsletterAPI } from '../api'

const Footer = ({ onContactClick, showToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterLoading(true);
    try {
      const data = await newsletterAPI.subscribe(newsletterEmail);
      showToast(data.message, 'success');
      setNewsletterEmail('');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer id="Footer">
      <div className="footer-container">

        <div className="footer-about">
          <h3>FITCLUB</h3>
          <p>Your fitness journey starts here. Stay motivated, stay consistent, and achieve your goals with us!</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn" disabled={newsletterLoading}>
              {newsletterLoading ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#Membership-section">Memberships</a></li>
            <li><a href="#Services-section">Classes</a></li>
            <li><a href="#About">Trainers</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: info@fitclub.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Location: Lahore, Pakistan</p>
          <button className="footer-contact-btn" onClick={onContactClick}>
            Send a Message
          </button>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FITCLUB. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
