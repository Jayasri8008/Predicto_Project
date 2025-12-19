// src/pages/EmailVerification.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiLoader, FiCheckCircle } from "react-icons/fi";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter the verification code from your email.");
      return;
    }

    // Here you would call your backend to verify the code
    try {
      setVerifying(true);
      await new Promise((res) => setTimeout(res, 1500)); // mock
      setSuccess(true);

      // After success you can navigate to "reset password" page or login
      // navigate("/reset-password");
    } catch (err) {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-80px] left-[-80px] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(15,23,42,0.9)] p-7">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Email verification
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <FiMail className="text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Check your email</h1>
            <p className="text-[11px] text-slate-300">
              We&apos;ve sent a verification link or code to:
            </p>
          </div>
        </div>

        {emailFromState && (
          <p className="text-xs text-emerald-300 mb-3 break-all">
            {emailFromState}
          </p>
        )}

        <p className="text-[11px] text-slate-300 mb-5">
          Paste the 6-digit code from your inbox, or click the link in the email.
          If you don&apos;t see it, check your spam folder.
        </p>

        {error && (
          <div className="mb-3 rounded-xl border border-rose-500/70 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {error}
          </div>
        )}

        {success ? (
          <div className="rounded-2xl border border-emerald-500/60 bg-emerald-500/10 px-4 py-4 flex flex-col items-center text-center">
            <FiCheckCircle className="w-7 h-7 text-emerald-300 mb-2" />
            <p className="text-sm text-emerald-100 mb-1">
              Verification successful!
            </p>
            <p className="text-[11px] text-emerald-100/80 mb-3">
              You can now set a new password or sign back in.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 rounded-full bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100"
              >
                Go to login
              </button>
              {/* If you later add a /reset-password route, you can navigate there here */}
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="text-xs text-slate-200 mb-1 block">
                Verification code
              </label>
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400/80 tracking-[0.3em] text-center"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_45px_rgba(6,78,59,0.9)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {verifying && <FiLoader className="animate-spin" />}
              {verifying ? "Verifying..." : "Verify code"}
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-slate-400 text-center">
          Didn&apos;t get an email?{" "}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-emerald-300 hover:text-emerald-100 underline underline-offset-2"
          >
            Resend
          </button>
        </p>

        <p className="mt-1 text-[11px] text-slate-500 text-center">
          Mistyped your email?{" "}
          <Link
            to="/forgot-password"
            className="text-emerald-300 hover:text-emerald-100 underline underline-offset-2"
          >
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
