import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const OtpVerification = ({ email, onSuccess, onResendClick, loading, error }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6 && !loading) {
      onSuccess(otp);
    }
  };

  const handleResend = () => {
    setOtp('');
    setTimeLeft(600);
    setCanResend(false);
    onResendClick?.();
  };

  const isValid = otp.length === 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-3"
          >
            <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              One-Time Password
            </label>
            <input
              id="otp"
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full px-4 py-3 text-2xl text-center tracking-widest font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              disabled={loading}
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">Enter digits only. Length: {otp.length}/6</p>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading || timeLeft <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span> Verifying...
              </>
            ) : isValid ? (
              <>
                <FiCheckCircle /> Verify OTP
              </>
            ) : (
              'Enter 6-digit OTP'
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-700 mb-2">
            <strong>Time remaining:</strong>{' '}
            <span className={timeLeft < 120 ? 'text-red-600 font-bold' : 'text-blue-600'}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend && timeLeft > 0}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 font-medium disabled:cursor-not-allowed"
          >
            {canResend ? 'Resend OTP' : `Resend in ${Math.ceil(timeLeft / 60)} min`}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Didn't receive the code? Check spam folder or try resending.
        </p>
      </div>
    </motion.div>
  );
};

export default OtpVerification;
