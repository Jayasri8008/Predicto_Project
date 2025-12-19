import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080";

  // ================= LOGIN =================
  const login = async ({ email, password }) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ WRONG PASSWORD / INVALID USER
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      // ❌ token missing (extra safety)
      if (!data.token) {
        throw new Error("Login failed");
      }

      // ✅ SUCCESS
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser({ email });

      return data; // 👈 IMPORTANT (used by UI)
    } finally {
      setLoading(false);
    }
  };

  // ================= SIGNUP =================
  const signup = async ({ firstName, lastName, email, password }) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
