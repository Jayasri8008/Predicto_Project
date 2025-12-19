import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

/* ---------------------------------------------------------
   Elegant Motion Variants
--------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ---------------------------------------------------------
   UI Components
--------------------------------------------------------- */
const Button = ({ children, variant = "primary", ...props }) => {
  const styles = {
    base: "px-6 py-2 rounded-full font-semibold transition-all active:scale-95",
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.03]",
    airy:
      "bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/20",
    outline:
      "border border-white/20 text-white hover:bg-white/10 backdrop-blur",
  };
  return (
    <button className={`${styles.base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

const StatCard = ({ value, label }) => (
  <motion.div
    variants={fadeUp}
    className="flex flex-col bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-5 shadow-lg"
  >
    <div className="text-3xl font-bold text-indigo-300">{value}</div>
    <div className="text-sm text-slate-200 mt-1">{label}</div>
  </motion.div>
);

const FeatureCard = ({ title, desc }) => (
  <motion.div
    variants={fadeUp}
    className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
  >
    <h3 className="font-semibold text-white">{title}</h3>
    <p className="text-slate-300 mt-2 text-sm">{desc}</p>
  </motion.div>
);

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */
export default function About() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  // Spotlight effect follows mouse
  const handleMouseMove = (e) => {
    setSpotlight({ x: e.clientX, y: e.clientY });
  };

  return (
    <Layout>
      <div
        className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white"
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.12), transparent 40%)`,
          }}
        />

        {/* Floating Blobs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-20 left-0 w-96 h-96 bg-purple-600 blur-3xl rounded-full opacity-25"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-indigo-600 blur-3xl rounded-full opacity-20"
        />

        {/* CONTENT */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-24">

          {/* ---------------------------------------------------------
              HERO SECTION
          --------------------------------------------------------- */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* HERO TEXT */}
            <motion.div variants={fadeUp}>
              <p className="text-sm uppercase tracking-wider text-indigo-300 font-medium mb-3">
                About Predicto.ai
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Designed to bring{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                  intelligence & trust
                </span>{" "}
                to estimation.
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Predicto.ai transforms ambiguous project planning into
                defensible, data-backed decisions—powered by machine learning,
                risk modeling, and decades of delivery knowledge.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Button variant="primary" onClick={() => (window.location = "/contact")}>
                  Talk to Our Team
                </Button>
                <Button variant="outline" onClick={() => (window.location = "/estimation")}>
                  Try Predicto
                </Button>
              </div>
            </motion.div>

            {/* HERO IMAGE CARD */}
            <motion.div
              variants={fadeUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6">
                <img
                  src="public/assets/Project-Estimation-Techniques-main (1).jpg"
                  alt="Analytics"
                  className="rounded-2xl shadow-xl object-cover w-full h-80"
                />
              </div>
            </motion.div>
          </motion.section>

          {/* ---------------------------------------------------------
              STATS
          --------------------------------------------------------- */}
          <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard value="98.4%" label="Estimation Accuracy" />
            <StatCard value="12,000+" label="Projects Analysed" />
            <StatCard value="52+" label="Industry Models" />
            <StatCard value="4.9 / 5" label="Customer Rating" />
          </motion.section>

          {/* ---------------------------------------------------------
              FEATURES (Zig-Zag Layout)
          --------------------------------------------------------- */}
          <section className="grid md:grid-cols-3 gap-12 items-start">
            {/* Left Description */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
              <h2 className="text-3xl font-bold mb-3">
                What makes Predicto exceptional?
              </h2>
              <p className="text-slate-300 mb-6">
                We combine ML models, industry benchmarks, and governance flows
                to help enterprises connect planning with reality.
              </p>
              <Button variant="outline" onClick={() => (window.location = "/services")}>
                Explore Our Platform
              </Button>
            </motion.div>

            {/* Right Features */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <FeatureCard title="AI Cost Modeling" desc="Predict cost using dynamic pricing feeds & historical behavior." />
              <FeatureCard title="Timeline Forecasting" desc="Sprint speed prediction, dependency analysis & risk modeling." />
              <FeatureCard title="Feasibility Analysis" desc="Regulatory checks, compliance scoring, and location constraints." />
              <FeatureCard title="Scenario Simulation" desc="Compare vendors, strategies, and resource plans instantly." />
            </motion.div>
          </section>

          {/* ---------------------------------------------------------
              TIMELINE
          --------------------------------------------------------- */}
          <section>
            <h2 className="text-center text-3xl font-bold mb-14">
              Our Journey
            </h2>

            <div className="relative border-l border-white/20 pl-10 max-w-4xl mx-auto">
              {[
                { year: "2021", title: "Research Started", desc: "ML cost modeling prototypes created." },
                { year: "2022", title: "Initial Launch", desc: "Released for Construction & IT pilot customers." },
                { year: "2023", title: "Platform Expansion", desc: "Live pricing feeds + compliance engine added." },
                { year: "2024", title: "Enterprise Rollout", desc: "Advanced AI + governance workflows + SLAs." },
                { year: "2025", title: "Unified Planning Engine", desc: "Dual-mode estimation for IT + Construction." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  className="mb-12 relative"
                >
                  <div className="absolute -left-12 w-6 h-6 bg-indigo-500 rounded-full ring-4 ring-indigo-400/30" />
                  <div className="text-indigo-300 text-sm">{step.year}</div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-slate-300">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------
              TEAM
          --------------------------------------------------------- */}
          <section>
            <h2 className="text-center text-3xl font-bold mb-10">
              Leadership
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "RISINTERNATIONAL", role: "Founder & CEO", img: "/assets/team1.webp" },
                { name: "Lead Data Scientist", role: "AI/ML Modeling", img: "/assets/team2.webp" },
                { name: "Head of Product", role: "Product Strategy", img: "/assets/team3.webp" },
                { name: "Ops Lead", role: "Enterprise Delivery", img: "/assets/team4.webp" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl hover:scale-[1.03] transition-all"
                >
                  <img
                    src={m.img}
                    className="w-28 h-28 mx-auto rounded-full border-4 border-white/20 shadow-lg object-cover"
                  />
                  <h4 className="mt-4 font-semibold">{m.name}</h4>
                  <p className="text-slate-300 text-sm">{m.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------
              TRUST BADGES
          --------------------------------------------------------- */}
          <section className="flex gap-3 flex-wrap justify-center">
            {["ISO 27001", "GDPR Ready", "AES-256 Encryption", "Enterprise SLA"].map((txt, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-slate-200 rounded-full text-sm shadow-md"
              >
                {txt}
              </div>
            ))}
          </section>

          {/* ---------------------------------------------------------
              CTA
          --------------------------------------------------------- */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="bg-gradient-to-br from-indigo-600/80 to-purple-700/80 p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold">Our Achievements</h3>
              <p className="mt-3 text-slate-200">
                200+ clients served, 35% faster planning cycles, and $20M+ in
                investment confidence powered by Predicto insights.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                <li>• AI-powered estimation engine</li>
                <li>• Enterprise-grade compliance</li>
                <li>• 99.9% uptime infrastructure</li>
              </ul>
            </div>

            {/* Right */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
              <h3 className="text-xl font-semibold mb-3">Get a Feasibility Report</h3>
              <p className="text-slate-300 mb-5">
                Submit your project scope—our team will prepare a detailed,
                investor-ready feasibility report powered by AI insights.
              </p>

              <div className="flex gap-4">
                <Button variant="primary" onClick={() => (window.location = "/contact")}>
                  Request Report
                </Button>
                <Button variant="outline" onClick={() => (window.location = "/estimation")}>
                  Try Platform
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
