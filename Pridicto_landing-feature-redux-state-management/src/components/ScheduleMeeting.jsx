import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FiCalendar,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";

export default function ScheduleMeeting() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !date || !time) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          meetingDate: date.toISOString().split("T")[0], // yyyy-MM-dd
          meetingTime: time, // backend accepts string
        }),
      });

      if (response.ok) {
        // ✅ SHOW SUCCESS ONLY IF STORED IN DB
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setName("");
          setEmail("");
          setDate(null);
          setTime("");
        }, 2000);
      } else {
        alert("❌ Failed to store meeting details");
      }
    } catch (error) {
      alert("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/40 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl"
    >
      {/* Header */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <FiCalendar className="text-indigo-500" />
        Schedule a Meeting
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Your Name
        </label>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-3 py-2 rounded-lg">
          <FiUser className="text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Your Email
        </label>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-3 py-2 rounded-lg">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Select Date
        </label>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          placeholderText="Choose a date"
          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 rounded-lg"
        />
      </div>

      {/* Time */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Select Time
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 rounded-lg"
        >
          <option value="">Choose time</option>
          <option value="10:00">10 AM</option>
          <option value="12:00">12 PM</option>
          <option value="15:00">3 PM</option>
          <option value="18:00">6 PM</option>
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!name || !email || !date || !time || loading}
        className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 disabled:opacity-50"
      >
        <FiSend className="w-4 h-4" />
        {loading ? "Saving..." : "Schedule Meeting"}
      </button>

      {/* Success */}
      {submitted && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl"
        >
          <FiCheckCircle className="text-green-500 w-14 h-14 mb-3" />
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            ✅ Meeting details stored successfully
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
