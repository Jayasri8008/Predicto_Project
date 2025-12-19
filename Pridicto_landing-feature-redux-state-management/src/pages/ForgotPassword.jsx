import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/auth/forgot-password", {
        email,
      });

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 400 }}>
        <h2>Forgot Password</h2>

        {success ? (
          <>
            <p>OTP has been sent to <b>{email}</b></p>
            <Link to="/login">Back to login</Link>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
