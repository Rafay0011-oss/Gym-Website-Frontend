import React, { useState } from 'react'
import "./Membership.css"
import { useAuth } from '../context/AuthContext'
import { membershipAPI } from '../api'

const Membership = ({ onJoinClick, showToast }) => {
  const { isAuthenticated, user, updateUser } = useAuth();
  const [loading, setLoading] = useState(null);

  const handleSubscribe = async (plan) => {
    if (!isAuthenticated) {
      onJoinClick();
      return;
    }

    setLoading(plan);
    try {
      const data = await membershipAPI.subscribe(plan);
      updateUser({ ...user, membership: plan });
      showToast(data.message, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(null);
    }
  };

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
            <button
              className="join-btn"
              onClick={() => handleSubscribe('basic')}
              disabled={loading === 'basic'}
            >
              {loading === 'basic' ? 'Processing...' : user?.membership === 'basic' ? '✓ Subscribed' : 'Join Now'}
            </button>
          </div>

          <div className="membership-card">
            <h3>Premium Plan</h3>
            <p>Includes personal training sessions</p>
            <p className="price">$59/month</p>
            <button
              className="join-btn"
              onClick={() => handleSubscribe('premium')}
              disabled={loading === 'premium'}
            >
              {loading === 'premium' ? 'Processing...' : user?.membership === 'premium' ? '✓ Subscribed' : 'Join Now'}
            </button>
          </div>

          <div className="membership-card">
            <h3>Class Bundle</h3>
            <p>10 group class passes to use anytime</p>
            <p className="price">$99</p>
            <button
              className="join-btn"
              onClick={() => handleSubscribe('bundle')}
              disabled={loading === 'bundle'}
            >
              {loading === 'bundle' ? 'Processing...' : user?.membership === 'bundle' ? '✓ Subscribed' : 'Get Bundle'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Membership
