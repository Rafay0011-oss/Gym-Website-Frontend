import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Modal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        const data = await login({
          email: formData.email,
          password: formData.password,
        });
        setSuccess(data.message);
        setTimeout(() => onClose(), 1000);
      } else {
        const data = await register(formData);
        setSuccess(data.message);
        setTimeout(() => onClose(), 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="modal-subtitle">
          {isLogin
            ? "Sign in to your FitClub account"
            : "Join the FitClub community today"}
        </p>

        {error && <div className="modal-error">{error}</div>}
        {success && <div className="modal-success">{success}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="modal-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="modal-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="modal-input"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          {!isLogin && (
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              className="modal-input"
              value={formData.phone}
              onChange={handleChange}
            />
          )}

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="modal-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={switchMode}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
