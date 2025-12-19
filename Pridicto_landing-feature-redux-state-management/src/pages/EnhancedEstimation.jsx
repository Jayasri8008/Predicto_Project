import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import {
  FiDollarSign,
  FiClock,
  FiUsers,
  FiBarChart,
  FiDownload,
  FiSave,
  FiShare2,
  FiSettings,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function EnhancedEstimation() {
  const [isLoading, setIsLoading] = useState(false);
  const [estimation, setEstimation] = useState(null);

  const [formData, setFormData] = useState({
    projectType: "",
    complexity: "",
    budget: "",
  });

  const projectTypes = [
    { value: "web-app", label: "Web Application", icon: "🌐" },
    { value: "mobile-app", label: "Mobile App", icon: "📱" },
    { value: "software", label: "Software", icon: "💻" },
    { value: "construction", label: "Construction", icon: "🏗️" },
    { value: "consulting", label: "Consulting", icon: "📊" },
  ];

  const complexityLevels = [
    {
      value: "simple",
      label: "Simple",
      description: "Basic features, low complexity",
    },
    {
      value: "moderate",
      label: "Moderate",
      description: "Some custom features, medium complexity",
    },
    {
      value: "complex",
      label: "Complex",
      description: "Large features, high complexity",
    },
    {
      value: "enterprise",
      label: "Enterprise",
      description: "Mission-critical, multiple integrations",
    },
  ];

  const generateEstimation = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockEstimation = {
      cost: {
        total: 85000,
        breakdown: [
          { category: "Development", amount: 48000, percentage: 60 },
          { category: "Design", amount: 16000, percentage: 18 },
          { category: "Testing", amount: 14000, percentage: 12 },
          { category: "Management", amount: 7000, percentage: 10 },
        ],
      },
      timeline: {
        totalWeeks: 18,
        phases: [
          { phase: "Planning 📘", weeks: 2 },
          { phase: "Design 🎨", weeks: 3 },
          { phase: "Development 💻", weeks: 9 },
          { phase: "Testing 🧪", weeks: 3 },
          { phase: "Launch 🚀", weeks: 1 },
        ],
      },
      team: {
        totalMembers: 6,
        roles: [
          { role: "Project Manager", count: 1 },
          { role: "Senior Developer", count: 1 },
          { role: "Frontend Developer", count: 1 },
          { role: "Backend Developer", count: 1 },
          { role: "UI/UX Designer", count: 1 },
          { role: "QA Engineer", count: 1 },
        ],
      },
      risk: {
        score: 3.2,
        level: "Moderate",
        color: "#facc15",
        factors: ["Scope changes", "Third-party dependencies", "Team workload"],
      },
      confidence: 87,
    };

    setEstimation(mockEstimation);
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const exportPDF = () => alert("PDF export will be implemented here");
  const saveEstimation = () => alert("Estimation saved successfully!");

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl font-bold mb-4"
            >
              Project{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                Estimation Engine
              </span>
            </motion.h1>

            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              AI-powered cost, timeline, risk, and team estimations—crafted
              precisely for your project.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FiSettings className="text-indigo-400" />
                Project Details
              </h2>

              <div className="space-y-6">

                {/* Project Type */}
                <div>
                  <label className="text-sm text-slate-300 mb-3 block">
                    Project Type
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {projectTypes.map((type) => (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        key={type.value}
                        onClick={() => handleInputChange("projectType", type.value)}
                        className={`p-4 rounded-xl border transition-all text-left ${
                          formData.projectType === type.value
                            ? "bg-indigo-600/20 border-indigo-500 shadow-lg"
                            : "bg-white/5 border-white/10 hover:border-indigo-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-medium text-slate-200">
                            {type.label}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                <div>
                  <label className="text-sm text-slate-300 mb-3 block">
                    Complexity Level
                  </label>

                  <div className="space-y-3">
                    {complexityLevels.map((level) => (
                      <motion.button
                        key={level.value}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleInputChange("complexity", level.value)}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          formData.complexity === level.value
                            ? "bg-purple-600/20 border-purple-500 shadow-lg"
                            : "bg-white/5 border-white/10 hover:border-purple-400"
                        }`}
                      >
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-sm text-slate-400">
                          {level.description}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Budget Range
                  </label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/10"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                  >
                    <option value="">Select a range</option>
                    <option value="10k-25k">$10K - $25K</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={generateEstimation}
                  disabled={!formData.projectType || !formData.complexity}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold 
                             disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? "Generating..." : "Generate Estimation"}
                </motion.button>
              </div>
            </motion.div>

            {/* RESULTS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FiBarChart className="text-indigo-400" />
                Estimation Results
              </h2>

              {/* Empty State */}
              {!estimation && !isLoading && (
                <div className="h-60 flex flex-col justify-center items-center text-slate-400">
                  <FiBarChart className="text-5xl opacity-50 mb-4" />
                  <p>Fill out details to generate estimation</p>
                </div>
              )}

              {/* Loading Spinner */}
              {isLoading && (
                <div className="h-60 flex justify-center items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
                  />
                </div>
              )}

              {/* RESULTS UI */}
              {estimation && !isLoading && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* COST CARD */}
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl"
                    >
                      <div className="flex items-center gap-3">
                        <FiDollarSign className="text-3xl" />
                        <div>
                          <p className="text-lg font-semibold">Estimated Cost</p>
                          <p className="text-4xl font-bold">
                            ${estimation.cost.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-indigo-200 mt-2">
                        Confidence Score: {estimation.confidence}%
                      </p>
                    </motion.div>

                    {/* TIMELINE */}
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <FiClock className="text-indigo-400" />
                        <span className="font-semibold">
                          Total Timeline: {estimation.timeline.totalWeeks} Weeks
                        </span>
                      </div>

                      <div className="space-y-3">
                        {estimation.timeline.phases.map((p, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex justify-between"
                          >
                            <span className="text-slate-300">{p.phase}</span>
                            <span>{p.weeks}w</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* TEAM */}
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <FiUsers className="text-indigo-400" />
                        <span className="font-semibold">Team Structure</span>
                      </div>

                      <p className="text-3xl font-bold mb-3">
                        {estimation.team.totalMembers} Members
                      </p>

                      <div className="space-y-2">
                        {estimation.team.roles.map((role, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-300">{role.role}</span>
                            <span>{role.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RISK */}
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <FiAlertCircle className="text-yellow-400" />
                        <span className="font-semibold">
                          Risk Level: {estimation.risk.level}
                        </span>
                      </div>

                      <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${estimation.risk.score * 20}%` }}
                          className="h-full bg-yellow-400"
                        />
                      </div>

                      <ul className="mt-3 text-sm text-slate-300 space-y-1">
                        {estimation.risk.factors.map((r, i) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4">
                      <button
                        onClick={exportPDF}
                        className="flex-1 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
                      >
                        <FiDownload className="inline-block mr-2" /> Export PDF
                      </button>
                      <button
                        onClick={saveEstimation}
                        className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
                      >
                        <FiSave className="inline-block mr-2" /> Save
                      </button>

                      <button className="p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition">
                        <FiShare2 />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
