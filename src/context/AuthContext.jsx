import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("fitclub_token");
    const savedUser = localStorage.getItem("fitclub_user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("fitclub_token");
        localStorage.removeItem("fitclub_user");
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const data = await authAPI.register(userData);
    localStorage.setItem("fitclub_token", data.token);
    localStorage.setItem("fitclub_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const login = async (credentials) => {
    const data = await authAPI.login(credentials);
    localStorage.setItem("fitclub_token", data.token);
    localStorage.setItem("fitclub_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("fitclub_token");
    localStorage.removeItem("fitclub_user");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem("fitclub_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
