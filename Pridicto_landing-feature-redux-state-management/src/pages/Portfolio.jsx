// src/pages/Portfolio.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ShareButtons from "../components/ShareButtons";
import SuggestionBox from "../components/SuggestionBox";
import PersonalizedSuggestions from "../components/PersonalizedSuggestions";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Briefcase,
  Target,
  Users,
  PieChart,
  LineChart,
  Award,
  Star,
  ChevronDown,
  Sparkles,
  Crown,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  UserCheck,
  Rocket,
} from "lucide-react";

/**
 * Ultra Premium Royal Portfolio Page (single file)
 * - TailwindCSS required
 * - Framer Motion required
 * - lucide-react icons required
 *
 * Install:
 *   npm install framer-motion lucide-react
 *
 * Paste as src/pages/Portfolio.jsx
 */

// ---------- sample data ----------
const caseStudies = [
  {
    id: 1,
    title: "FinTech Startup Raised $1.2M Seed Funding",
    description:
      "Investor-ready pitch deck, 5-year model, KPI dashboards & GTM — enabling VC traction.",
    industry: "Finance",
    region: "USA",
    impact: "Raised $1.2M • 38% CAC Reduction • 2.4x Growth",
    category: "Pitch Deck • Modeling",
    image: "https://images.unsplash.com/photo-1559523182-a284c3fb7cff?q=80&w=1400",
  },
  {
    id: 2,
    title: "AgriTech Market Expansion Across 4 States",
    description:
      "Multi-region research, pricing & adoption roadmaps for mass rollout.",
    industry: "Agriculture",
    region: "India",
    impact: "4-State Rollout • 62% Accuracy • 3x Adoption",
    category: "Market Research • GTM",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400",
  },
  {
    id: 3,
    title: "AI Startup Pitch for UK VC Network",
    description: "Deep-tech deck, TAM/SAM/SOM, technical architecture and forecasts.",
    industry: "Technology",
    region: "UK",
    impact: "27% Faster Approval • 120% Outreach",
    category: "AI • Deck Design",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1400",
  },
  {
    id: 4,
    title: "E-commerce Scaling 10k → 120k Monthly",
    description: "Pricing optimization, logistics automation and retention funnels.",
    industry: "E-commerce",
    region: "UAE",
    impact: "12x Revenue • 22% Cost Reduction",
    category: "Analytics • Automation",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Rina Patel",
    role: "Founder — FinEdge",
    quote:
      "Their deck & modeling helped us close a seed round faster than expected. Execution was immaculate.",
    rating: 5,
  },
  {
    id: 2,
    name: "Omar Al-Fayed",
    role: "COO — ShopHub",
    quote:
      "Logistics automation cut costs and improved delivery SLAs. Highly recommended for growth-stage brands.",
    rating: 5,
  },
  {
    id: 3,
    name: "James Carter",
    role: "Head of Growth — AgroNext",
    quote:
      "Practical research and stellar GTM helped us expand across states with minimal friction.",
    rating: 5,
  },
];

// ---------- animation variants ----------
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ---------- helper components (inline) ----------
function IconRow({ children }) {
  return <div className="flex items-center gap-2 text-sm text-gray-300">{children}</div>;
}

function SparkleButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-700 to-yellow-400 px-6 py-3 rounded-full text-white font-semibold shadow-2xl transform-gpu hover:scale-[1.03] transition"
    >
      <Sparkles className="w-4 h-4" /> {children}
    </button>
  );
}

// ---------- main page ----------
export default function Portfolio() {
  const userId = useSelector((s) => s.auth?.user?.id);
  const [filter, setFilter] = useState("All");
  const [faqOpen, setFaqOpen] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);
  const testiTimer = useRef(null);

  useEffect(() => {
    // auto-rotate testimonials
    testiTimer.current = setInterval(() => {
      setTestiIndex((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(testiTimer.current);
  }, []);

  // filter logic
  const filtered = caseStudies.filter((c) => filter === "All" || c.industry === filter);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-[#05060b] via-[#0f1020] to-[#05060b] text-gray-100"
      >
        {/* decorative background orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -left-36 -top-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-700 to-yellow-400 opacity-20 blur-3xl animate-slow-float"></div>
          <div className="absolute right-[-6rem] top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-400 opacity-20 blur-2xl animate-slow-float-reverse"></div>
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/2 via-transparent to-transparent"></div>
        </div>

        <Navbar />

        <main className="pt-28 max-w-7xl mx-auto px-6 pb-28 space-y-20">
          <Breadcrumb />

          {/* HERO */}
          <motion.section initial="hidden" animate="show" variants={container} className="text-center max-w-4xl mx-auto">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-purple-400">
              The Royal Standard of Digital Excellence
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-300 mt-4 text-lg">
              Luxury-grade product thinking, data-driven execution and measurable outcomes — crafted for companies that want to scale with sophistication.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-4">
              <SparkleButton onClick={() => (window.location.href = "/contact")}>Start Your Project</SparkleButton>
              <a href="#case-studies" className="px-5 py-3 rounded-full border border-gray-700 text-gray-200 hover:bg-white/5 transition">
                View Case Studies
              </a>
            </motion.div>
          </motion.section>

          {/* STATS */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Crown className="w-6 h-6 text-yellow-400" />, title: "Clients", value: "200+" },
              { icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />, title: "Industries", value: "18+" },
              { icon: <Target className="w-6 h-6 text-yellow-400" />, title: "Success Rate", value: "93%" },
              { icon: <Rocket className="w-6 h-6 text-yellow-400" />, title: "Countries", value: "12+" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-transparent border border-yellow-500/10 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">{s.icon}</div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-yellow-300">{s.value}</h3>
                    <p className="text-gray-300 text-sm">{s.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* AWARDS / TRUST */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-6">
            <h3 className="text-center text-yellow-300 font-semibold mb-4">Trusted by leading organizations</h3>
            <div className="flex items-center gap-10 overflow-x-auto whitespace-nowrap py-4 scrollbar-hide px-2">
              {["McKinsey", "BCG", "Accenture", "Google", "TATA", "EY", "Nvidia AI"].map((b, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-white/3 text-gray-200 font-medium">{b}</div>
              ))}
            </div>
          </motion.section>

          {/* FILTERS */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex justify-center gap-4">
              {["All", "Finance", "Technology", "E-commerce", "Agriculture"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    filter === cat ? "bg-gradient-to-r from-purple-700 to-yellow-400 text-black" : "bg-white/3 text-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.section>

          {/* CASE STUDIES */}
          <motion.section id="case-studies" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {filtered.map((c, idx) => (
              <motion.article key={c.id} variants={fadeUp} className="rounded-3xl overflow-hidden bg-white/4 border border-yellow-500/10 shadow-2xl backdrop-blur-md">
                <div className="relative h-56 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover brightness-90" />
                  <div className="absolute left-4 top-4 bg-gradient-to-r from-purple-700/60 to-yellow-400/40 px-3 py-1 rounded-full text-xs font-semibold">
                    {c.industry}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-yellow-300">{c.title}</h4>
                  <p className="text-gray-300 text-sm mt-2">{c.description}</p>
                  <p className="text-yellow-400 text-sm mt-3">{c.impact}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <ShareButtons url={`${window.location.origin}/portfolio#${c.id}`} title={c.title} description={c.description} />
                    <a className="text-yellow-300 font-medium">Read →</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>

          {/* VISUALS + INSIGHTS */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="rounded-2xl p-6 bg-white/4 border border-yellow-500/10 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <LineChart className="w-5 h-5 text-yellow-300" />
                <h5 className="font-semibold text-white">Growth Forecast Impact</h5>
              </div>
              <div className="h-48 rounded-lg bg-gradient-to-br from-[#061021] to-[#031026] flex items-center justify-center text-gray-400">[Insert Chart Component]</div>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl p-6 bg-white/4 border border-yellow-500/10 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-5 h-5 text-yellow-300" />
                <h5 className="font-semibold text-white">Industry Distribution</h5>
              </div>
              <div className="h-48 rounded-lg bg-gradient-to-br from-[#061021] to-[#031026] flex items-center justify-center text-gray-400">[Insert Chart Component]</div>
            </motion.div>
          </motion.section>

          {/* WHY CHOOSE US (features) */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <TrendingUp className="w-5 h-5 text-yellow-300" />, title: "Growth First", desc: "KPIs designed to move the needle." },
              { icon: <UserCheck className="w-5 h-5 text-yellow-300" />, title: "Investor Ready", desc: "Decks & financials that close rounds." },
              { icon: <ShieldCheck className="w-5 h-5 text-yellow-300" />, title: "Compliant", desc: "Regulatory & data compliant processes." },
              { icon: <CheckCircle className="w-5 h-5 text-yellow-300" />, title: "Execution", desc: "Full-stack delivery & managed ops." },
            ].map((f, i) => (
              <motion.div variants={fadeUp} key={i} className="p-6 rounded-2xl bg-white/4 border border-yellow-500/8 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-md">{f.icon}</div>
                  <div>
                    <h6 className="font-semibold text-white">{f.title}</h6>
                    <p className="text-gray-300 text-sm">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* TESTIMONIALS CAROUSEL */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8">
            <h3 className="text-2xl font-bold text-yellow-300 text-center mb-6">Client Testimonials</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl bg-white/3 p-6 shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 font-semibold">
                    {testimonials[testiIndex].name.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </div>
                  <div>
                    <p className="text-gray-200 italic">“{testimonials[testiIndex].quote}”</p>
                    <div className="mt-3 text-sm text-gray-300">{testimonials[testiIndex].name} • {testimonials[testiIndex].role}</div>
                  </div>
                </div>
              </div>

              {/* controls */}
              <div className="mt-4 flex items-center justify-center gap-3">
                {testimonials.map((t, i) => (
                  <button key={t.id} onClick={() => setTestiIndex(i)} className={`w-3 h-3 rounded-full ${i === testiIndex ? "bg-yellow-300" : "bg-white/30"}`} />
                ))}
              </div>
            </div>
          </motion.section>

          {/* TIMELINE */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
            <h4 className="text-xl font-bold text-yellow-300 mb-6">Milestones</h4>
            <div className="relative border-l border-white/6 pl-8">
              {[
                { year: "2021", label: "Seed to Series A", desc: "Helped startups achieve seed closure." },
                { year: "2022", label: "Product-market Fit", desc: "Launched multiple regional pilots." },
                { year: "2023", label: "Scale & Ops", desc: "Built forecasting & automated ops." },
                { year: "2024", label: "Enterprise Growth", desc: "Onboarded Fortune 500 partners." },
              ].map((m, i) => (
                <div key={i} className="mb-8 relative">
                  <div className="absolute -left-6 top-0 w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">{m.year.slice(2)}</div>
                  <div className="ml-4">
                    <h5 className="font-semibold text-white">{m.label}</h5>
                    <p className="text-gray-300 text-sm mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* PRICING */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { plan: "Starter", price: "₹50k", bullets: ["Audit & roadmap", "1-month support"], featured: false },
              { plan: "Growth", price: "₹2.5L", bullets: ["Full GTM", "Dashboard & analytics", "3-month support"], featured: true },
              { plan: "Enterprise", price: "Custom", bullets: ["Dedicated team", "SLA & Integrations"], featured: false },
            ].map((p, i) => (
              <motion.div variants={fadeUp} key={i} className={`p-6 rounded-2xl ${p.featured ? "bg-gradient-to-br from-purple-700 to-yellow-400 text-black shadow-2xl" : "bg-white/4 border border-white/6"}`}>
                <h5 className="font-bold text-lg">{p.plan}</h5>
                <div className="mt-4 text-3xl font-extrabold">{p.price}</div>
                <ul className="mt-4 text-sm space-y-2 text-gray-200">
                  {p.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                </ul>
                <div className="mt-6">
                  <button className={`px-5 py-2 rounded-full ${p.featured ? "bg-black text-yellow-300" : "bg-yellow-300 text-black"}`}>Choose</button>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* FAQ */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
            <h4 className="text-xl font-bold text-yellow-300 mb-4">Frequently Asked Questions</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: "How do you price projects?", a: "We price based on scope, timelines and deliverables — with flexible contracts and milestone payments." },
                { q: "Do you handle end-to-end delivery?", a: "Yes — from research, design to engineering and operations." },
                { q: "Can you prepare investor-ready decks?", a: "Absolutely — decks, financials and investor materials are our forte." },
                { q: "What industries do you serve?", a: "Fintech, Agritech, E-commerce, Enterprise SaaS and more." },
              ].map((f, i) => (
                <div key={i} className="rounded-xl bg-white/4 p-4">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full text-left flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{f.q}</div>
                      {faqOpen === i && <div className="text-sm text-gray-300 mt-2">{f.a}</div>}
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* TEAM */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
            <h4 className="text-xl font-bold text-yellow-300 mb-6">Meet the Team</h4>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Asha R", role: "Head - Strategy" },
                { name: "Rahul M", role: "Lead - Engineering" },
                { name: "Nina S", role: "Head - Design" },
                { name: "Vikram K", role: "Data Science Lead" },
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/4 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/6 mx-auto flex items-center justify-center text-yellow-300 font-bold mb-3">
                    {p.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-300">{p.role}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* AI Suggestions + SuggestionBox */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 mt-12">
            <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/4 border border-white/6">
              <PersonalizedSuggestions userId={userId} limit={3} />
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/4 border border-white/6">
              <SuggestionBox context="portfolio" maxSuggestions={3} />
            </motion.div>
          </motion.section>

          {/* CTA */}
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 p-12 rounded-3xl bg-gradient-to-r from-purple-700 to-yellow-400 text-black text-center shadow-2xl">
            <h3 className="text-2xl font-bold">Ready to build something remarkable?</h3>
            <p className="text-sm mt-2 text-black/80">Book a consultation and get a tailored growth plan.</p>
            <div className="mt-6">
              <a href="/contact" className="px-6 py-3 rounded-full bg-black/90 text-yellow-300 font-semibold">Get Started</a>
            </div>
          </motion.section>
        </main>

        <Footer />

        {/* small inline styles */}
        <style jsx>{`
          @keyframes slowFloat { 0% { transform: translateY(0) } 50% { transform: translateY(-12px) } 100% { transform: translateY(0) } }
          @keyframes slowFloatReverse { 0% { transform: translateY(0) } 50% { transform: translateY(10px) } 100% { transform: translateY(0) } }
          .animate-slow-float { animation: slowFloat 8s ease-in-out infinite; }
          .animate-slow-float-reverse { animation: slowFloatReverse 9s ease-in-out infinite; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
