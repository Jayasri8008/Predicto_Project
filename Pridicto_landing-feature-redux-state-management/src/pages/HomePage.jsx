import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FeedbackModal from "../components/FeedbackModal";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  Shield,
  Users,
  Award,
  Target,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  BarChart3,
  Zap
} from "lucide-react";

// -------------------- Motion Variants --------------------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// -------------------- Reusable Button --------------------
const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg focus:ring-blue-500",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 focus:ring-blue-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// -------------------- Service Card --------------------
const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }}
    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 hover:shadow-xl hover:border-slate-200 transition-all duration-300"
  >
    <div className="w-11 h-11 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 rounded-xl flex items-center justify-center mb-5">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2.5">{title}</h3>
    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{description}</p>
    <ul className="space-y-1.5">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-sm text-slate-700">
          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

// -------------------- Testimonial Card --------------------
const TestimonialCard = ({ quote, author, role, company, rating = 5 }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{
      y: -6,
      scale: 1.01,
      transition: { type: "spring", stiffness: 240, damping: 22 }
    }}
    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 h-full flex flex-col"
  >
    <div className="flex mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
      ))}
    </div>
    <blockquote className="text-slate-700 text-sm leading-relaxed mb-5 flex-1">
      "{quote}"
    </blockquote>
    <div>
      <div className="font-semibold text-slate-900 text-sm">{author}</div>
      <div className="text-slate-600 text-xs">{role}</div>
      <div className="text-blue-600 text-xs font-medium mt-0.5">{company}</div>
    </div>
  </motion.div>
);

// -------------------- Statistics Counter --------------------
const StatCounter = ({ value, label, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < value) {
        setCount(prev => Math.min(prev + Math.ceil(value / 35), value));
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [count, value]);

  return (
    <div className="text-center lg:text-left">
      <div className="text-3xl lg:text-4xl font-semibold text-blue-700 mb-1">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
    </div>
  );
};

// -------------------- Use Case Card --------------------
const UseCaseCard = ({ icon: Icon, label, title, text }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{
      y: -6,
      scale: 1.02,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }}
    className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-[11px] font-medium text-slate-500 uppercase">
        {label}
      </span>
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Icon className="w-4 h-4 text-slate-700" />
      </div>
    </div>
    <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
  </motion.div>
);

// -------------------- Timeline Step Card --------------------
const StepCard = ({ icon: Icon, step, title, text }) => (
  <motion.div
    variants={fadeUp}
    className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-full bg-slate-900 text-[11px] flex items-center justify-center text-slate-100 font-semibold">
        {step}
      </div>
      <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
        <Icon className="w-4 h-4 text-slate-700" />
      </div>
    </div>
    <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
  </motion.div>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Parallax motion values for hero
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const floatXSmall = useTransform(mouseX, [0, 1], [10, -10]);
  const floatYSmall = useTransform(mouseY, [0, 1], [8, -8]);
  const floatXLarge = useTransform(mouseX, [0, 1], [-18, 18]);
  const floatYLarge = useTransform(mouseY, [0, 1], [16, -16]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const services = [
    {
      icon: Brain,
      title: "AI-Powered Estimation",
      description:
        "Predict effort, cost and timelines using models trained on historical delivery data and industry benchmarks.",
      features: [
        "Context-aware ML models",
        "Historical velocity calibration",
        "Domain-specific presets",
        "Continuous learning loop"
      ]
    },
    {
      icon: BarChart3,
      title: "Cost & Effort Analytics",
      description:
        "Understand where your budget goes with clear breakdowns by team, phase, workstream and dependency.",
      features: [
        "Cost & effort visibility",
        "Scenario comparison",
        "Budget variance insights",
        "Exportable executive reports"
      ]
    },
    {
      icon: Clock,
      title: "Timeline & Delivery Health",
      description:
        "Model realistic delivery plans with risk-aware timelines and milestone health checks.",
      features: [
        "Probability-based forecasting",
        "Milestone at-risk alerts",
        "What-if simulations",
        "Portfolio-level view"
      ]
    },
    {
      icon: Shield,
      title: "Risk & Governance",
      description:
        "Identify delivery risks early and embed governance into every estimation cycle.",
      features: [
        "Risk scoring engine",
        "Control checks & guardrails",
        "Approval workflows",
        "Audit-ready history"
      ]
    }
  ];

  const testimonials = [
    {
      quote:
        "Predicto.ai has become a core part of our portfolio governance. Our steering committees now start with one source of truth.",
      author: "Sarah Johnson",
      role: "Director of PMO",
      company: "TechCorp Solutions"
    },
    {
      quote:
        "We reduced cost overruns on strategic programs by over 35%. The quality of early estimates improved dramatically.",
      author: "Michael Chen",
      role: "VP Engineering",
      company: "InnovateLabs"
    },
    {
      quote:
        "The platform creates instant alignment between delivery, finance and leadership. It paid for itself within the first quarter.",
      author: "Emily Rodriguez",
      role: "Program Manager",
      company: "Global Systems Inc"
    }
  ];

  const stats = [
    { value: 500, label: "Projects Estimated", suffix: "+" },
    { value: 98, label: "Forecast Accuracy", suffix: "%" },
    { value: 50, label: "Enterprise Customers", suffix: "+" },
    { value: 24, label: "Avg. Hours Saved / Estimate", suffix: "" }
  ];

  const useCases = [
    {
      icon: Users,
      label: "For PMOs",
      title: "Standardize estimation across portfolios",
      text: "Replace spreadsheets with a single, governed approach to sizing and scenario planning across the organization."
    },
    {
      icon: Brain,
      label: "For Engineering",
      title: "Defend realistic commitments",
      text: "Use data-backed forecasts to negotiate scope, protect teams and still hit the outcomes the business cares about."
    },
    {
      icon: DollarSign,
      label: "For Finance",
      title: "Fund with confidence",
      text: "Connect estimates to financial models, track variances and support investment decisions with traceable assumptions."
    }
  ];

  const steps = [
    {
      icon: Globe,
      step: "01",
      title: "Connect & ingest",
      text: "Bring in historical delivery data or start from our curated industry templates. Connect Jira, Azure DevOps or spreadsheets."
    },
    {
      icon: Brain,
      step: "02",
      title: "Model complexity",
      text: "AI models evaluate scope, constraints and delivery patterns to recommend effort, cost and timelines for each initiative."
    },
    {
      icon: TrendingUp,
      step: "03",
      title: "Align & decide",
      text: "Scenario plan with stakeholders, adjust assumptions live and lock in plans with approvals and governance."
    },
    {
      icon: Target,
      step: "04",
      title: "Monitor & learn",
      text: "Compare estimates to actuals, feed back learnings and continuously improve your forecasting accuracy."
    }
  ];

  const highlights = [
    {
      icon: Award,
      title: "Enterprise-grade",
      text: "Built for multi-team, multi-region delivery portfolios."
    },
    {
      icon: Shield,
      title: "Secure by design",
      text: "RBAC, audit logs and encryption in transit & at rest."
    },
    {
      icon: Globe,
      title: "Global teams",
      text: "Designed for distributed delivery and remote programs."
    }
  ];

  const productGlance = [
    {
      title: "Portfolio overview",
      subtitle: "See your entire change agenda in one place.",
      tag: "CIO view"
    },
    {
      title: "Estimate vs. actuals",
      subtitle: "Close the loop and improve over every cycle.",
      tag: "Delivery health"
    },
    {
      title: "Scenario planning",
      subtitle: "Model trade-offs between scope, time and cost.",
      tag: "Exec decisioning"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
        {/* ================= HERO ================= */}
        <section
          className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-white"
          onMouseMove={handleMouseMove}
        >
          {/* Background lights */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
            <div className="absolute -bottom-40 -right-10 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
            <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          </div>

          {/* Floating shapes */}
          <motion.div
            style={{ x: floatXSmall, y: floatYSmall }}
            className="pointer-events-none absolute top-24 -right-10 w-40 h-40 rounded-3xl bg-gradient-to-br from-sky-500/40 via-cyan-400/30 to-indigo-500/40 blur-2xl opacity-60"
          />
          <motion.div
            style={{ x: floatXLarge, y: floatYLarge }}
            className="pointer-events-none absolute bottom-10 left-[-40px] w-56 h-56 rounded-full bg-gradient-to-tr from-indigo-500/40 via-purple-500/30 to-sky-400/40 blur-3xl opacity-50"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Left: Copy */}
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium mb-5 backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                  AI-driven portfolio estimation for modern delivery teams
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4">
                  Make{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200">
                    project estimates
                  </span>{" "}
                  as credible as{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-sky-200 to-indigo-200">
                    your results.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed mb-7 max-w-xl">
                  Predicto.ai helps PMOs, engineering and finance teams move from
                  spreadsheets and guesswork to a single, defensible way of sizing,
                  funding and steering initiatives.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button
                    size="lg"
                    onClick={() => navigate("/estimation")}
                    className="group"
                  >
                    Start a sample estimation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate("/contact")}
                    className="bg-transparent border border-white/30 text-white hover:bg-white hover:text-slate-900"
                  >
                    Talk to our team
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-[11px] text-slate-200/80 mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>14-day pilot • Guided onboarding</span>
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-200/80"
                >
                  {stats.map((stat) => (
                    <motion.div key={stat.label} variants={fadeUp}>
                      <StatCounter
                        value={stat.value}
                        label={stat.label}
                        suffix={stat.suffix}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Product Glimpse */}
              <motion.div variants={fadeUp} className="relative">
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 10,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-400/30 via-indigo-500/20 to-amber-300/30 blur-2xl opacity-80" />
                  <div className="relative bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-slate-100/80 p-6 sm:p-7 text-slate-900">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          Portfolio estimation overview
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Q1 strategic initiatives • Updated 2 min ago
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-100">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          98% forecast confidence
                        </span>
                      </div>
                    </div>

                    {/* Summary cards */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-slate-500">Total cost</span>
                          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          $3.2M
                        </div>
                        <div className="text-[10px] text-emerald-600 mt-0.5">
                          ↓ 14% vs. last plan
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-slate-500">Avg. duration</span>
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          16 weeks
                        </div>
                        <div className="text-[10px] text-amber-600 mt-0.5">
                          3 projects at risk
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-slate-500">Confidence</span>
                          <Shield className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          High
                        </div>
                        <div className="text-[10px] text-sky-600 mt-0.5">
                          Based on 480+ projects
                        </div>
                      </div>
                    </div>

                    {/* Product glance slider (simple) */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-slate-500">
                          Views your leadership will actually use
                        </span>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
                        {productGlance.map((item, idx) => (
                          <div
                            key={idx}
                            className="min-w-[160px] rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-xs"
                          >
                            <div className="text-[10px] text-slate-500 mb-1">
                              {item.tag}
                            </div>
                            <div className="text-xs font-semibold text-slate-900">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {item.subtitle}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-sky-100 border border-white flex items-center justify-center text-[10px] font-semibold text-sky-700">
                          PM
                        </div>
                        <div className="w-7 h-7 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[10px] font-semibold text-emerald-700">
                          Eng
                        </div>
                        <div className="w-7 h-7 rounded-full bg-amber-100 border border-white flex items-center justify-center text-[10px] font-semibold text-amber-700">
                          Fin
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Shared with{" "}
                        <span className="font-medium text-slate-700">
                          Delivery & Finance
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= TRUST STRIP ================= */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500"
            >
              <p className="font-medium text-slate-600">
                Trusted by delivery and technology teams across industries
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 text-[11px] uppercase tracking-wide">
                <span className="text-slate-400">Enterprise IT</span>
                <span className="text-slate-400">Consulting</span>
                <span className="text-slate-400">Fintech</span>
                <span className="text-slate-400">SaaS</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= HIGHLIGHTS STRIP ================= */}
        <section className="py-10 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm"
                >
                  <div className="mt-0.5">
                    <h.icon className="w-4 h-4 text-sky-300" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5">{h.title}</div>
                    <div className="text-[11px] text-slate-200/80">{h.text}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  One platform for estimation, planning and governance
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                  Bring consistency to how projects are sized, funded and tracked, from single
                  initiatives to complex, multi-region portfolios.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Built for teams running multiple concurrent programs</span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                Built for the teams who carry the numbers
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
                Predicto.ai sits at the intersection of delivery, technology and finance—giving
                each function what they need without creating more work.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {useCases.map((uc, idx) => (
                <UseCaseCard key={idx} {...uc} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= WORKFLOW / TIMELINE ================= */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                How Predicto.ai fits into your delivery flow
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
                Use Predicto.ai at the moments where decisions matter most—from early shaping
                and funding cycles through to steering committees.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              {/* Connector line on desktop */}
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {steps.map((step, idx) => (
                  <StepCard key={idx} {...step} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  Teams use Predicto.ai to build trust in their numbers
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                  From CIO dashboards to board packs, your estimates become a single source of
                  truth everyone can stand behind.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users className="w-4 h-4" />
                <span>Used across PMOs, engineering and finance</span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= FAQ + CTA ================= */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* FAQ */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3"
              >
                Answers to common questions
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-slate-600 mb-6"
              >
                Still evaluating if Predicto.ai is a fit? These are the topics most teams ask
                about during discovery.
              </motion.p>

              <div className="space-y-3">
                {[
                  {
                    q: "Who is Predicto.ai built for?",
                    a: "Predicto.ai is designed for delivery leaders, PMOs, engineering managers and finance partners who need consistent, defensible project estimates."
                  },
                  {
                    q: "Can we use Predicto.ai without historical data?",
                    a: "Yes. You can start with our pre-configured industry baselines and gradually enrich predictions as your own delivery data becomes available."
                  },
                  {
                    q: "How long does implementation take?",
                    a: "Most teams are live within 1–2 weeks. Integrations with tools like Jira or Azure DevOps can be added incrementally."
                  },
                  {
                    q: "Is our data secure?",
                    a: "Predicto.ai follows enterprise-grade security practices, including encryption in transit and at rest, role-based access and audit logging."
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="border border-slate-200 rounded-xl p-4 bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.q}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-7 lg:p-8 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute -top-24 right-0 w-64 h-64 bg-sky-500/40 blur-3xl" />
                <div className="absolute bottom-0 -left-10 w-64 h-64 bg-amber-400/40 blur-3xl" />
              </div>

              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                  Ready to see your next portfolio, before you commit?
                </h2>
                <p className="text-sm sm:text-base text-slate-200 mb-6 max-w-md">
                  We’ll walk you through a live estimation using your own initiatives, and
                  leave you with an exportable view you can share internally with leadership.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate("/signup")}
                    className="bg-white text-slate-900 hover:bg-slate-100"
                  >
                    Start a 14-day pilot
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/contact")}
                    className="border-white text-white hover:bg-white hover:text-slate-900"
                  >
                    Book discovery call
                  </Button>
                </div>

                <p className="text-[11px] text-slate-300">
                  No procurement needed for pilots • SOC-ready infrastructure • EU & US data
                  hosting options
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating Feedback Button */}
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          className="fixed bottom-6 right-6 z-30 rounded-full bg-slate-900 text-white text-xs px-4 py-2.5 shadow-lg hover:bg-slate-800 flex items-center gap-2"
        >
          <Star className="w-4 h-4" />
          Share feedback
        </button>

        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
        />
      </div>
    </Layout>
  );
}
