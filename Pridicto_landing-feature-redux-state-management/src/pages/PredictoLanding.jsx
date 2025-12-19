import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, CheckCircle } from "lucide-react";

// ========= Animation helpers =========
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
  viewport: { once: true, amount: 0.3 },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
  viewport: { once: true, amount: 0.3 },
});

export default function PredictoAIModern() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen bg-[#F3F4F8] text-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ============== GLOBAL BACKDROP + CURSOR SPOTLIGHT ============== */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        {/* Soft background blobs */}
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-96 w-96 rounded-full bg-indigo-200/60 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/50 blur-3xl" />
      </div>

      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        animate={{
          background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(59,130,246,0.12), transparent 55%)`,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 30 }}
      />

      {/* ========================== NAVBAR ========================== */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-4 lg:py-5 sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/70 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 shadow-md shadow-blue-300/60" />
          <h1 className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight">
            Predicto<span className="text-blue-600">.ai</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/features" className="hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link to="/estimate" className="hover:text-blue-600 transition-colors">
            Estimate
          </Link>
          <Link to="/services" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </div>

        <Link
          to="/estimate"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-sm hover:shadow-md"
        >
          Launch Estimator
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      {/* ========================== HERO ========================== */}
      <section className="relative">
        {/* hero gradient band */}
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-20 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT SIDE */}
          <motion.div
            {...fadeIn(0)}
            className="relative text-gray-900 space-y-7"
          >
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-1.5 backdrop-blur-md text-[11px] font-medium tracking-[0.18em] uppercase text-gray-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              AI PROJECT INTELLIGENCE
            </motion.div>

            <motion.h2
              {...fadeUp(0.25)}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-semibold leading-tight tracking-tight"
            >
              Make{" "}
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                estimates
              </span>{" "}
              as reliable as your{" "}
              <span className="bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent">
                delivery.
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.4)}
              className="text-sm sm:text-base text-gray-700 max-w-xl leading-relaxed"
            >
              Predicto.ai turns rough project briefs into defensible, data-driven
              cost, effort, and timeline forecasts—ready for stakeholders, investors
              and delivery teams.
            </motion.p>

            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link
                to="/estimate"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-white text-gray-900 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Start a sample estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-gray-300 text-gray-900 hover:bg-gray-100 transition-all"
              >
                Talk to our team
                <Cpu className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp(0.7)}
              className="flex flex-wrap gap-4 text-[11px] text-gray-700 pt-3"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>14-day guided pilot</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Security & NDA ready</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE – GLASS PANEL / DASHBOARD */}
          <motion.div
            {...fadeUp(0.3)}
            className="relative"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-400/25 via-indigo-400/15 to-emerald-300/25 blur-2xl opacity-90" />
            <div className="relative rounded-3xl bg-slate-950/85 text-slate-50 border border-white/10 shadow-2xl backdrop-blur-2xl p-5 sm:p-6 overflow-hidden">
              {/* subtle shine */}
              <div className="pointer-events-none absolute -top-10 left-1/4 h-24 w-2/3 bg-gradient-to-r from-white/10 via-white/30 to-white/10 opacity-50 blur-3xl" />

              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Portfolio snapshot
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Q2 strategic initiatives • Updated 3 mins ago
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                </div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
                <div className="rounded-2xl bg-slate-900/85 border border-slate-700/70 p-3">
                  <p className="text-[11px] text-slate-400 mb-1">
                    Total forecast
                  </p>
                  <p className="text-sm font-semibold">$3.2M</p>
                  <p className="text-[10px] text-emerald-300 mt-0.5">
                    ↓ 14% vs last cycle
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/85 border border-slate-700/70 p-3">
                  <p className="text-[11px] text-slate-400 mb-1">
                    Avg. duration
                  </p>
                  <p className="text-sm font-semibold">16 weeks</p>
                  <p className="text-[10px] text-amber-300 mt-0.5">
                    3 projects at risk
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/85 border border-slate-700/70 p-3">
                  <p className="text-[11px] text-slate-400 mb-1">
                    Confidence
                  </p>
                  <p className="text-sm font-semibold">High</p>
                  <p className="text-[10px] text-sky-300 mt-0.5">
                    Based on 480+ projects
                  </p>
                </div>
              </div>

              {/* Bar list */}
              <div className="mb-5 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] text-slate-400">
                    Estimate vs actual (last 6 programs)
                  </p>
                  <span className="text-[10px] text-emerald-300 bg-emerald-900/40 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    92% forecast accuracy
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      name: "Digital onboarding",
                      status: "On track",
                      width: "80%",
                      color: "bg-sky-400",
                    },
                    {
                      name: "Data platform revamp",
                      status: "+4.2%",
                      width: "88%",
                      color: "bg-amber-400",
                    },
                    {
                      name: "Global payments rollout",
                      status: "-2.1%",
                      width: "76%",
                      color: "bg-emerald-400",
                    },
                  ].map((row, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-200">{row.name}</span>
                        <span className="text-slate-300">{row.status}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800/90 overflow-hidden">
                        <motion.div
                          className={`h-1.5 rounded-full ${row.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: row.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between pt-1 relative z-10">
                <div className="flex -space-x-2">
                  {["PM", "ENG", "FIN"].map((label, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-100"
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  Shared with{" "}
                  <span className="text-slate-100 font-medium">
                    Delivery & Finance
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p className="font-medium text-gray-700">
            Trusted by delivery, PMO and finance teams across industries
          </p>
          <div className="flex flex-wrap gap-4 tracking-wide uppercase">
            <span className="text-gray-500">Enterprise IT</span>
            <span className="text-gray-500">Consulting</span>
            <span className="text-gray-500">Fintech</span>
            <span className="text-gray-500">SaaS</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-[#F3F4F8]">
        <motion.div
          {...fadeUp(0.05)}
          className="max-w-6xl mx-auto px-6 lg:px-12 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
              One platform for estimation, planning & governance
            </h3>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
              Bring consistency to how projects are sized, funded and tracked—from
              early-stage shaping to portfolio steering committees.
            </p>
          </div>
          <p className="text-xs text-gray-600">
            Built for teams running multiple concurrent programs and initiatives.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "AI cost & effort",
              desc: "Context-aware models analyse scope, complexity and historical velocity.",
              icon: "💡",
            },
            {
              title: "Risk-aware timelines",
              desc: "Probability-based schedules with clear risk bands and milestone health.",
              icon: "📈",
            },
            {
              title: "Cross-team alignment",
              desc: "One shared view for delivery, finance & leadership to agree on.",
              icon: "🤝",
            },
            {
              title: "Audit-ready history",
              desc: "Every assumption, change and approval tracked for future reference.",
              icon: "🗂️",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp(0.1 + index * 0.05)}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all p-5 overflow-hidden"
            >
              <div className="absolute -top-10 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-40 blur-2xl" />
              <div className="inline-flex items-center justify-center mb-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 px-3 py-2 text-xl">
                {item.icon}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PIPELINE ================= */}
      <section className="py-20 bg-white border-y border-gray-200">
        <motion.div
          {...fadeUp(0.05)}
          className="text-center mb-10 px-6"
        >
          <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
            How Predicto.ai fits into your flow
          </h3>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            From early idea shaping to executive approval, use Predicto.ai at each decision point.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 lg:px-0 relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-300 via-indigo-300 to-transparent" />
          {[
            "Ingest briefs & historicals",
            "AI estimation & scenarios",
            "Risk & feasibility review",
            "Funding & roadmap alignment",
            "Ongoing tracking & learning",
          ].map((step, index) => (
            <motion.div
              key={step}
              {...fadeUp(0.1 + index * 0.05)}
              className={`flex mb-10 ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              } justify-center`}
            >
              <div className="w-full md:w-[55%]">
                <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4">
                  <div className="absolute -left-3 -top-3 w-7 h-7 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {step}
                  </h4>
                  <p className="text-xs text-gray-700">
                    {index === 0 &&
                      "Attach your scope, backlog, or high-level idea. Pull in past initiatives and delivery data."}
                    {index === 1 &&
                      "AI proposes effort, cost and timelines with configurable assumptions and scenarios."}
                    {index === 2 &&
                      "Highlight constraints, dependencies and risk hotspots before committing."}
                    {index === 3 &&
                      "Align leadership, finance and delivery on a realistic, defensible plan."}
                    {index === 4 &&
                      "Compare estimate vs actuals, close the loop and continuously improve forecasts."}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-20 bg-white">
        <motion.div
          {...fadeUp(0.05)}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-semibold text-blue-700 mb-6">
            “We finally trust our numbers.”
          </h3>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg px-8 py-10">
            <p className="text-base text-gray-800 leading-relaxed mb-4">
              “Predicto.ai has become the starting point for every major initiative.
              Our PMO, delivery leads and finance teams now speak the same language
              when it comes to effort, cost and risk.”
            </p>
            <p className="text-sm font-semibold text-gray-900">Juliana, CTO</p>
            <p className="text-xs text-gray-600 mt-1">Global SaaS company</p>
          </div>
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-[#F3F4F8]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Projects estimated", value: "1,200+" },
            { label: "Forecast accuracy", value: "90%" },
            { label: "Teams onboarded", value: "75+" },
            { label: "Avg. time saved", value: "5×" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUp(0.05 + index * 0.05)}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm py-7 px-3"
            >
              <p className="text-2xl font-semibold text-blue-600">
                {stat.value}
              </p>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-20 bg-white">
        <motion.div
          {...fadeUp(0.05)}
          className="max-w-5xl mx-auto px-6 lg:px-12 text-center mb-10"
        >
          <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
            Simple, transparent pricing
          </h3>
          <p className="text-sm text-gray-700">
            Start with a guided pilot. Scale to programs, portfolios and enterprises.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "Free",
              desc: "For individuals & early teams",
              highlight: false,
            },
            {
              name: "Pro",
              price: "$29/mo",
              desc: "For growing delivery teams",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "Talk to us",
              desc: "For large portfolios & PMOs",
              highlight: false,
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.name}
              {...fadeUp(0.08 + index * 0.05)}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className={`rounded-3xl border p-7 bg-white shadow-sm ${
                plan.highlight
                  ? "border-blue-500 shadow-blue-100"
                  : "border-gray-200"
              }`}
            >
              <p className="text-xs font-medium text-gray-600 uppercase tracking-[0.18em]">
                {plan.name}
              </p>
              <p className="mt-4 text-3xl font-semibold text-blue-600">
                {plan.price}
              </p>
              <p className="mt-1 text-xs text-gray-700">{plan.desc}</p>

              <ul className="mt-5 space-y-2 text-left text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  AI estimation engine
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  Unlimited scenarios
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  PDF & stakeholder exports
                </li>
              </ul>

              <button
                className={`mt-6 w-full py-2.5 rounded-full text-xs font-semibold ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95"
                    : "bg-gray-900 text-white hover:bg-black"
                } transition-all`}
              >
                {plan.name === "Enterprise"
                  ? "Book a conversation"
                  : `Choose ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-[#F3F4F8]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h3
            {...fadeUp(0.05)}
            className="text-3xl lg:text-4xl font-semibold text-center text-gray-900 mb-8"
          >
            Frequently asked questions
          </motion.h3>

          <div className="space-y-3">
            {[
              {
                q: "Can we start without historical data?",
                a: "Yes. You can use industry baselines and refine estimates as your own data accumulates.",
              },
              {
                q: "Is Predicto.ai only for software projects?",
                a: "No. It supports IT, consulting and construction-style projects with configurable templates.",
              },
              {
                q: "How long does it take to onboard?",
                a: "Most teams run their first estimation within a week, with guided support if needed.",
              },
              {
                q: "How do you handle security & compliance?",
                a: "We follow enterprise-grade practices, encryption and are happy to work under NDAs.",
              },
            ].map((faq, index) => (
              <motion.details
                key={faq.q}
                {...fadeUp(0.08 + index * 0.05)}
                className="group rounded-2xl border border-gray-200 bg-white px-5 py-4 hover:border-blue-400/70 transition-all"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-gray-900">
                    {faq.q}
                  </span>
                  <span className="text-blue-500 text-lg group-open:rotate-180 transition-transform">
                    ⌃
                  </span>
                </summary>
                <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-center text-white">
        <motion.div
          {...fadeUp(0.05)}
          className="max-w-xl mx-auto px-6"
        >
          <h3 className="text-2xl lg:text-3xl font-semibold mb-3">
            Stay ahead with project intelligence
          </h3>
          <p className="text-sm text-white/85 mb-7">
            Short, practical emails on estimation, planning and governance—no spam.
          </p>

          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="name@company.com"
              className="flex-1 px-4 py-3 rounded-full text-sm text-gray-900 outline-none border border-transparent focus:border-blue-200"
            />
            <button className="px-7 py-3 rounded-full bg-white text-blue-700 text-sm font-semibold hover:bg-slate-50 transition-all">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-[11px] text-gray-600">
        © {new Date().getFullYear()} Predicto.ai — Retouch IT Services Pvt Ltd. All rights reserved.
      </footer>
    </div>
  );
}
