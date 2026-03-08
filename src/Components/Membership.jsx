import React from 'react'
import "./Membership.css"

const Membership = () => {
  return (
    <section id="Membership-section">
      <div className="membership-container">
        <h2 className="membership-heading">Memberships & Class Bundles</h2>
        <p className="membership-subtext">
          Flexible memberships and class bundles designed to fit your fitness goals and schedule.
        </p>

        <div className="membership-cards">
          <div className="membership-card">
            <h3>Basic Plan</h3>
            <p>Access to gym and group classes</p>
            <p className="price">$29/month</p>
            <button className="join-btn">Join Now</button>
          </div>

          <div className="membership-card">
            <h3>Premium Plan</h3>
            <p>Includes personal training sessions</p>
            <p className="price">$59/month</p>
            <button className="join-btn">Join Now</button>
          </div>

          <div className="membership-card">
            <h3>Class Bundle</h3>
            <p>10 group class passes to use anytime</p>
            <p className="price">$99</p>
            <button className="join-btn">Get Bundle</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Membership
