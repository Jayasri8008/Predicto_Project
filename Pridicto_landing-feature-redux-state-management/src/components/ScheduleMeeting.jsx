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
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !date || !time) return;
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setDate(null);
      setTime("");
    }, 2000);
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

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Select Date
        </label>

        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" />

          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            placeholderText="Choose a date"
            className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            calendarClassName="!bg-white dark:!bg-slate-800 !rounded-xl !p-3 !border !border-gray-200 dark:!border-slate-700 shadow-lg scale-105"
            dayClassName={() =>
              "!text-gray-900 dark:!text-white hover:!bg-indigo-500 hover:!text-white rounded-lg"
            }
          />
        </div>
      </div>

      {/* Time Picker */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Select Time
        </label>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-3 py-2 rounded-lg">
          <FiClock className="text-gray-500 dark:text-gray-300" />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
          >
            <option value="">Choose time</option>
            <option value="10AM - 11AM">10 AM - 11 AM</option>
            <option value="12PM - 1PM">12 PM - 1 PM</option>
            <option value="3PM - 4PM">3 PM - 4 PM</option>
            <option value="6PM - 7PM">6 PM - 7 PM</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!name || !date || !time}
        className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiSend className="w-4 h-4" />
        Schedule Meeting
      </button>

      {/* Success Popup */}
      {submitted && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl"
        >
          <FiCheckCircle className="text-green-500 w-14 h-14 mb-3" />
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Meeting Scheduled!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
