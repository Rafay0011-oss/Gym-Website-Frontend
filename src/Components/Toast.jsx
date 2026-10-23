import React, { useEffect } from "react";
import "./Modal.css";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {type === "success" ? "✅ " : "❌ "}
      {message}
    </div>
  );
};

export default Toast;
