import React from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import ScheduleMeeting from "../components/ScheduleMeeting";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiZap,
  FiStar,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

export default function Contact() {
  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">

        {/* ---------------- BACKGROUND ANIMATIONS ---------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="pointer-events-none absolute w-[900px] h-[900px] bg-indigo-700/20 rounded-full blur-[180px] -top-40 -left-40"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          className="pointer-events-none absolute w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[160px] bottom-0 right-0"
        />
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute left-1/2 top-1/3 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"
        />

        {/* Animated floating lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 0.15, x: "120%" }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.6 }}
              className="absolute top-0 w-[35vw] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ top: `${i * 7}vh` }}
            />
          ))}
        </div>

        {/* ---------------- HERO SECTION ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-28 pb-14 text-center max-w-3xl mx-auto px-6"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Let’s Build Something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Extraordinary
            </span>
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Our experts respond within 24 hours. Tell us your idea — we’ll turn
            it into a real plan, estimation, and roadmap.
          </p>
        </motion.div>

        {/* ---------------- MAIN GRID ---------------- */}
        <main className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* =======================================================
               LEFT PANEL (Advertisement + Map + Highlights)
               ======================================================= */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 overflow-hidden"
            >
              {/* Glow Effects */}
              <div className="absolute -top-20 -left-10 w-72 h-72 bg-indigo-600/30 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500/30 blur-3xl rounded-full"></div>

              <div className="relative">
                <h2 className="text-3xl font-bold mb-4">
                  Why Work With{" "}
                  <span className="text-indigo-400">Predicto.ai?</span>
                </h2>

                <p className="text-slate-300 text-sm mb-6 max-w-md">
                  Trusted by startups, enterprises, and engineering teams for
                  end-to-end estimation, feasibility analysis, and roadmapping.
                </p>

                {/* Highlight Blocks */}
                <div className="space-y-4">
                  {[
                    {
                      icon: <FiZap className="text-indigo-400 text-xl" />,
                      title: "Ultra-Fast Estimates",
                      desc: "Generate feasibility reports in under 60 seconds.",
                    },
                    {
                      icon: <FiStar className="text-yellow-400 text-xl" />,
                      title: "98% Confidence Level",
                      desc: "Accurate predictions using domain-trained AI.",
                    },
                    {
                      icon: <FiCalendar className="text-cyan-400 text-xl" />,
                      title: "Live Strategy Sessions",
                      desc: "Book a planning call with our expert consultants.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div>{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <FiMail className="text-indigo-400" /> info@predicto.ai
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <FiPhone className="text-indigo-400" /> +1 234-567-890
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <FiMapPin className="text-indigo-400" />
                    123 Startup Avenue, USA
                  </div>
                </div>

                {/* MAP */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-xl"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d4a32b7b2b0!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
                    width="100%"
                    height="280"
                    loading="lazy"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>

            {/* =======================================================
               RIGHT PANEL (Contact Form + Meeting Scheduler)
               ======================================================= */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Contact Form */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <FiMail className="text-indigo-400" /> Send a Message
                </h2>
                <p className="text-slate-300 text-sm mb-6">
                  Our team will respond within 24 hours.
                </p>
                <ContactForm />
              </motion.div>

              {/* Meeting Scheduler */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <FiCalendar className="text-indigo-400" /> Schedule a Meeting
                </h2>
                <p className="text-slate-300 text-sm mb-6">
                  Pick a time that works best for you.
                </p>
                <ScheduleMeeting />
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
