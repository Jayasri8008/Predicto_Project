import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import {
  FiUser,
  FiBell,
  FiTarget,
  FiActivity,
  FiCheckCircle,
  FiTrendingUp,
  FiStar,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export default function UserPortal() {
  const [tab, setTab] = useState("dashboard");

  const projects = [
    { name: "E-Commerce App", status: "Completed", icon: FiCheckCircle, color: "text-green-400" },
    { name: "Mobile Banking", status: "In Progress", icon: FiActivity, color: "text-yellow-400" },
    { name: "AI Dashboard", status: "Planned", icon: FiTarget, color: "text-purple-400" },
  ];

  const notifications = [
    { text: "Payment received successfully", type: "success", time: "2 hours ago" },
    { text: "Project deadline approaching", type: "warning", time: "6 hours ago" },
    { text: "New message from client", type: "success", time: "1 day ago" },
  ];

  return (
    <Layout>
      <div className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold tracking-wide">
            User Dashboard
          </h1>
          <p className="text-gray-300 mt-1">grow with your dream – User Details </p>
        </motion.div>

        {/* NAV TABS */}
        <div className="flex gap-4 mb-6">
          <TabBtn icon={FiStar} label="Dashboard" active={tab === "dashboard"} onClick={() => setTab("dashboard")} />
          <TabBtn icon={FiUser} label="Profile" active={tab === "profile"} onClick={() => setTab("profile")} />
          <TabBtn icon={FiTarget} label="Projects" active={tab === "projects"} onClick={() => setTab("projects")} />
          <TabBtn icon={FiBell} label="Notifications" active={tab === "notifications"} onClick={() => setTab("notifications")} />
        </div>

        {/* ================= CONTENT ================= */}

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-4 gap-6">
              <StatBox icon={FiTarget} title="Total Projects" value="12" />
              <StatBox icon={FiActivity} title="Active Projects" value="5" />
              <StatBox icon={FiCheckCircle} title="Completed" value="7" />
              <StatBox icon={FiTrendingUp} title="Growth" value="23%" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl mt-8"
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <FiStar /> Performance
              </h2>
              <p className="text-5xl font-bold text-green-400">92%</p>
              <p className="text-gray-300 mt-2">Excellent performance 👏</p>
            </motion.div>
          </motion.div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6"><FiUser /> User Profile</h2>

            <ProfileItem icon={FiUser} label="Name" value="Akshay" />
            <ProfileItem icon={FiMail} label="Email" value="akhk4639@gmail.com" />
            <ProfileItem icon={FiPhone} label="Phone" value="6362243163" />
            <ProfileItem icon={FiStar} label="Account Type" value="Premium User" />
          </motion.div>
        )}

        {/* PROJECTS */}
        {tab === "projects" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FiTarget /> Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-xl"
                >
                  <p className="text-xl font-semibold mb-1">{p.name}</p>
                  <div className="flex items-center gap-2">
                    <p.icon className={p.color} />
                    <span className="text-gray-300">{p.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* NOTIFICATIONS */}
        {tab === "notifications" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FiBell /> Notifications
            </h2>

            <div className="space-y-4">
              {notifications.map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-4 rounded-xl bg-black/40 border border-white/10 flex justify-between"
                >
                  <span>{n.text}</span>
                  <span className="text-gray-400 text-sm">{n.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

/* ---------- Small Components ---------- */

function TabBtn({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl flex items-center gap-2 transition ${
        active ? "bg-purple-600 shadow-xl" : "bg-white/10 hover:bg-white/20"
      }`}
    >
      <Icon /> {label}
    </button>
  );
}

function StatBox({ icon: Icon, title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-gray-300 mb-1">
        <Icon className="text-purple-400" /> {title}
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
    </motion.div>
  );
}

function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10 mb-3">
      <div className="flex items-center gap-3">
        <Icon className="text-purple-400" />
        <span className="text-gray-300">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}