import React, { useState } from "react";
import axios from "axios";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API = "http://localhost:8080/auth";

  // ================= SEND OTP =================
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post(`${API}/forgot-password`, { email });
      setMessage("OTP sent to your email");
      setMode("verify");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  // ================= VERIFY OTP + RESET =================
  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post(`${API}/reset-password`, {
        email,
        otp,
        password: newPassword,
      });

      setMessage("Password reset successful. Please login.");
      setMode("login");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 400, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>{mode === "login" ? "Login" : mode === "forgot" ? "Forgot Password" : "Reset Password"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        {mode === "login" && (
          <>
            <button onClick={() => setMode("forgot")}>Forgot Password?</button>
          </>
        )}

        {mode === "forgot" && (
          <form onSubmit={sendOtp}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send OTP</button>
          </form>
        )}

        {mode === "verify" && (
          <form onSubmit={resetPassword}>
            <input
              type="text"
              placeholder="OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
