import React, { useState } from "react";
import { contactAPI } from "../api";
import "./Modal.css";

const ContactModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      const data = await contactAPI.submit(formData);
      setSuccess(data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (onSuccess) onSuccess(data.message);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

        <h2 className="modal-title">Get In Touch</h2>
        <p className="modal-subtitle">
          Have a question? Send us a message and we'll get back to you!
        </p>

        {error && <div className="modal-error">{error}</div>}
        {success && <div className="modal-success">{success}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="modal-input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="modal-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="modal-input"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className="modal-input modal-textarea"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
          />

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
