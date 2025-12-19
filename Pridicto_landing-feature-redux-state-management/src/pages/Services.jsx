// src/pages/Services.jsx
import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import ServiceCard from "../components/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaChartLine,
  FaMoneyBillWave,
  FaSearch,
  FaHandshake,
  FaUsers,
  FaTools,
  FaBuilding,
  FaCalculator,
  FaProjectDiagram,
  FaCode,
  FaLeaf,
  FaShieldAlt,
  FaTasks,
  FaPlug,
  FaChartBar,
  FaCodeBranch,
  FaWrench,
  FaChalkboardTeacher,
  FaBalanceScale,
  FaFilter,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

/* ===================== DATA ===================== */

const services = [
  // Business Consulting
  {
    id: 1,
    category: "Business Consulting",
    icon: <FaFileAlt className="text-indigo-400" />,
    title: "Business Plan Writing",
    description:
      "Professional investor-ready plans with 5-year projections, market overview, and executive summary.",
    pricing: "Starting at $500",
    features: [
      "5-year financial projections",
      "Market analysis",
      "Executive summary",
      "Investor presentation",
    ],
  },
  {
    id: 2,
    category: "Business Consulting",
    icon: <FaChartLine className="text-sky-400" />,
    title: "Pitch Deck Creation",
    description:
      "10–15 slide presentations designed to impress investors, with visuals and storytelling.",
    pricing: "Starting at $800",
    features: [
      "Custom visuals",
      "Storytelling structure",
      "Investor-focused content",
      "Multiple revisions",
    ],
  },
  {
    id: 3,
    category: "Business Consulting",
    icon: <FaMoneyBillWave className="text-emerald-400" />,
    title: "Financial Modelling",
    description:
      "Custom Excel / Google Sheet based financial forecasts, P&L, and cash-flow analysis.",
    pricing: "Starting at $600",
    features: [
      "P&L statements",
      "Cash flow analysis",
      "Scenario modeling",
      "Excel/Google Sheets",
    ],
  },
  {
    id: 4,
    category: "Business Consulting",
    icon: <FaSearch className="text-purple-400" />,
    title: "Market Research & Feasibility",
    description:
      "In-depth desktop and primary research, competitive benchmarking, SWOT analysis.",
    pricing: "Starting at $700",
    features: [
      "SWOT analysis",
      "Competitive benchmarking",
      "Primary research",
      "Feasibility reports",
    ],
  },
  {
    id: 5,
    category: "Business Consulting",
    icon: <FaHandshake className="text-pink-400" />,
    title: "Startup Consulting",
    description:
      "End-to-end business setup support — strategy, process automation, operations.",
    pricing: "Starting at $1,000",
    features: [
      "Strategy development",
      "Process automation",
      "Operations setup",
      "Ongoing support",
    ],
  },
  {
    id: 6,
    category: "Business Consulting",
    icon: <FaUsers className="text-amber-400" />,
    title: "Recruitment & HR Support",
    description: "Talent acquisition and HR process setup for startups.",
    pricing: "Starting at $900",
    features: [
      "Talent acquisition",
      "HR process setup",
      "Interview coordination",
      "Onboarding support",
    ],
  },

  // Project Estimation
  {
    id: 7,
    category: "Project Estimation",
    icon: <FaBuilding className="text-orange-400" />,
    title: "Construction Cost Estimation",
    description:
      "Accurate estimation for residential, commercial, and infrastructure projects using AI and real-time material prices.",
    pricing: "Starting at $1,200",
    features: [
      "AI-driven estimates",
      "Real-time pricing",
      "Material breakdowns",
      "Infrastructure focus",
    ],
  },
  {
    id: 8,
    category: "Project Estimation",
    icon: <FaTools className="text-teal-400" />,
    title: "Material & Labor Estimation",
    description:
      "Auto-generate detailed breakdowns of material, equipment, and workforce requirements based on project scale.",
    pricing: "Starting at $800",
    features: [
      "Material breakdowns",
      "Labor requirements",
      "Equipment estimates",
      "Scale-based calculations",
    ],
  },
  {
    id: 9,
    category: "Project Estimation",
    icon: <FaCalculator className="text-rose-400" />,
    title: "Budget Forecasting & Affordability",
    description:
      "Predict cost variations and compare estimated vs. actual budgets with detailed analytics dashboards.",
    pricing: "Starting at $900",
    features: [
      "Cost variation predictions",
      "Budget comparisons",
      "Analytics dashboards",
      "Affordability analysis",
    ],
  },
  {
    id: 10,
    category: "Project Estimation",
    icon: <FaProjectDiagram className="text-indigo-300" />,
    title: "Feasibility Analysis for Projects",
    description:
      "End-to-end project viability assessment — covering technical, economic, and financial feasibility.",
    pricing: "Starting at $1,100",
    features: [
      "Technical feasibility",
      "Economic analysis",
      "Financial viability",
      "Comprehensive reports",
    ],
  },
  {
    id: 11,
    category: "Project Estimation",
    icon: <FaCode className="text-cyan-400" />,
    title: "Software Development Estimation",
    description:
      "Detailed cost/time estimates for web/apps, including tech stack analysis and scalability assessments.",
    pricing: "Starting at $1,000",
    features: [
      "Tech stack analysis",
      "Scalability assessments",
      "Code complexity analysis",
      "AI recommendations",
    ],
  },
  {
    id: 12,
    category: "Project Estimation",
    icon: <FaLeaf className="text-emerald-400" />,
    title: "Sustainability & Green Building Analysis",
    description:
      "Eco-friendly assessments for construction projects, including carbon footprint and material sustainability.",
    pricing: "Starting at $900",
    features: [
      "Carbon footprint analysis",
      "Green certification support",
      "Sustainable materials",
      "Compliance checks",
    ],
  },

  // Advanced Tools
  {
    id: 13,
    category: "Advanced Tools",
    icon: <FaShieldAlt className="text-slate-300" />,
    title: "Risk Management & Mitigation",
    description:
      "Identify and plan for project risks with AI-driven recommendations and contingency strategies.",
    pricing: "Starting at $800",
    features: [
      "Risk scoring",
      "Mitigation plans",
      "AI recommendations",
      "Contingency strategies",
    ],
  },
  {
    id: 14,
    category: "Advanced Tools",
    icon: <FaTasks className="text-blue-400" />,
    title: "Project Management Consulting",
    description:
      "End-to-end PM support, including Agile/Scrum setup, resource allocation, and milestone tracking.",
    pricing: "Starting at $1,500",
    features: [
      "Agile/Scrum setup",
      "Resource allocation",
      "Milestone tracking",
      "Workflow automation",
    ],
  },
  {
    id: 15,
    category: "Advanced Tools",
    icon: <FaPlug className="text-purple-400" />,
    title: "Integration with Project Tools",
    description:
      "Connect to Jira, Trello, Asana for seamless workflows and data syncing.",
    pricing: "Starting at $600",
    features: [
      "Jira/Trello/Asana integration",
      "Data syncing",
      "Seamless workflows",
      "API connections",
    ],
  },
  {
    id: 16,
    category: "Advanced Tools",
    icon: <FaChartBar className="text-orange-400" />,
    title: "Custom Dashboards & Reporting",
    description:
      "Build personalized analytics dashboards for clients with real-time data visualization.",
    pricing: "Starting at $700",
    features: [
      "Custom metrics",
      "Real-time visualization",
      "Exportable reports",
      "Personalized dashboards",
    ],
  },
  {
    id: 17,
    category: "Advanced Tools",
    icon: <FaCodeBranch className="text-indigo-300" />,
    title: "API Access & Developer Tools",
    description: "Provide APIs for third-party integrations and developer SDKs.",
    pricing: "Starting at $500/month",
    features: [
      "API documentation",
      "Developer SDKs",
      "Sandbox environment",
      "Third-party integrations",
    ],
  },
  {
    id: 18,
    category: "Advanced Tools",
    icon: <FaWrench className="text-red-400" />,
    title: "Ongoing Support & Maintenance",
    description:
      "Post-project monitoring, updates, and performance optimization.",
    pricing: "Starting at $400/month",
    features: [
      "24/7 support",
      "Performance monitoring",
      "Issue tracking",
      "Optimization updates",
    ],
  },

  // Additional Consulting
  {
    id: 19,
    category: "Business Consulting",
    icon: <FaChalkboardTeacher className="text-teal-400" />,
    title: "Training & Workshops",
    description:
      "Online/offline sessions on estimation best practices, AI tools, and project management.",
    pricing: "Starting at $300 per session",
    features: [
      "Interactive modules",
      "Best practices training",
      "AI tool workshops",
      "Certification options",
    ],
  },
  {
    id: 20,
    category: "Business Consulting",
    icon: <FaBalanceScale className="text-amber-400" />,
    title: "Global Compliance & Legal Review",
    description:
      "Ensure projects meet international standards, regulations, and legal requirements.",
    pricing: "Starting at $1,200",
    features: [
      "Regulatory audits",
      "Legal templates",
      "International standards",
      "Compliance checks",
    ],
  },
];

/* ===================== PAGE ===================== */

export default function Services() {
  const navigate = useNavigate();
  const { colors, resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");

  const categories = ["All", ...new Set(services.map((s) => s.category))];

  const filteredServices = useMemo(() => {
    let filtered = [...services];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q) ||
          service.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((service) => {
        const priceNum = parseInt(service.pricing.replace(/[^\d]/g, ""));
        switch (priceRange) {
          case "under500":
            return priceNum < 500;
          case "500to1000":
            return priceNum >= 500 && priceNum <= 1000;
          case "1000to1500":
            return priceNum >= 1000 && priceNum <= 1500;
          case "over1500":
            return priceNum > 1500;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.pricing.replace(/[^\d]/g, ""));
          const priceB = parseInt(b.pricing.replace(/[^\d]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.pricing.replace(/[^\d]/g, ""));
          const priceB = parseInt(b.pricing.replace(/[^\d]/g, ""));
          return priceB - priceA;
        });
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const featuredServices = filteredServices.slice(0, 3);
  const remainingServices = filteredServices.slice(3);

  return (
    <Layout>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
        }`}
      >
        <main className="pt-28 max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
          <Breadcrumb />

          {/* ============= HERO ============= */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border shadow-2xl px-6 py-10 sm:px-10 sm:py-12"
            style={{
              borderColor: isDark ? "#1f2937" : "#e2e8f0",
              background: isDark
                ? `radial-gradient(circle at top left, ${colors.primary}33, #020617 45%), radial-gradient(circle at bottom right, ${colors.secondary}33, #020617 45%)`
                : `radial-gradient(circle at top left, ${colors.primary}18, #ffffff 45%), radial-gradient(circle at bottom right, ${colors.secondary}18, #f1f5f9 45%)`,
            }}
          >
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: colors.secondary }}>
                  Services & Solutions
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-3">
                  Services that make{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    planning,
                  </span>{" "}
                  funding, and delivery feel predictable.
                </h1>
                <p
                  className="text-sm sm:text-base max-w-xl mb-6"
                  style={{
                    color: isDark ? "rgba(226,232,240,0.9)" : "rgba(71,85,105,0.9)",
                  }}
                >
                  Whether you're raising capital, validating feasibility, or
                  shaping a multi-stream portfolio, Predicto.ai combines
                  consulting, estimation, and tooling into one partner.
                </p>

                <div
                  className="flex flex-wrap gap-3 mb-6 text-[11px]"
                  style={{ color: isDark ? "#e2e8f0" : "#334155" }}
                >
                  <span className="px-3 py-1 rounded-full border text-xs"
                    style={{
                      backgroundColor: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.9)",
                      borderColor: isDark ? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.6)",
                    }}
                  >
                    Business strategy & investor assets
                  </span>
                  <span className="px-3 py-1 rounded-full border text-xs"
                    style={{
                      backgroundColor: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.9)",
                      borderColor: isDark ? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.6)",
                    }}
                  >
                    AI-powered project estimation
                  </span>
                  <span className="px-3 py-1 rounded-full border text-xs"
                    style={{
                      backgroundColor: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.9)",
                      borderColor: isDark ? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.6)",
                    }}
                  >
                    Enterprise tooling & integrations
                  </span>
                </div>

                <div
                  className="flex flex-wrap gap-4 text-[11px]"
                  style={{ color: isDark ? "#cbd5f5" : "#64748b" }}
                >
                  <div className="flex items-center gap-2">
                    <FaClock className="text-emerald-300" />
                    <span>Average 48-hour turnaround on standard requests</span>
                  </div>
                </div>
              </div>

              {/* Right small stat blocks */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div
                  className="rounded-2xl p-4 border"
                  style={{
                    backgroundColor: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
                    borderColor: isDark ? "rgba(148,163,184,0.5)" : "rgba(209,213,219,1)",
                  }}
                >
                  <div
                    className="text-xs mb-1"
                    style={{ color: isDark ? "#e2e8f0" : "#64748b" }}
                  >
                    Service coverage
                  </div>
                  <div
                    className="text-2xl font-semibold"
                    style={{ color: colors.primary }}
                  >
                    20+
                  </div>
                  <div
                    className="text-[11px] mt-1"
                    style={{ color: isDark ? "#cbd5f5" : "#6b7280" }}
                  >
                    Distinct offerings across consulting, estimation and tools.
                  </div>
                </div>
                <div
                  className="rounded-2xl p-4 border"
                  style={{
                    backgroundColor: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
                    borderColor: isDark ? "rgba(148,163,184,0.5)" : "rgba(209,213,219,1)",
                  }}
                >
                  <div
                    className="text-xs mb-1"
                    style={{ color: isDark ? "#e2e8f0" : "#64748b" }}
                  >
                    Industries served
                  </div>
                  <div
                    className="text-2xl font-semibold"
                    style={{ color: colors.secondary }}
                  >
                    4
                  </div>
                  <div
                    className="text-[11px] mt-1"
                    style={{ color: isDark ? "#cbd5f5" : "#6b7280" }}
                  >
                    Startups, IT, construction and professional services.
                  </div>
                </div>
                <div
                  className="rounded-2xl p-4 border col-span-2"
                  style={{
                    backgroundColor: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
                    borderColor: isDark ? "rgba(148,163,184,0.5)" : "rgba(209,213,219,1)",
                  }}
                >
                  <div
                    className="text-xs mb-1"
                    style={{ color: isDark ? "#e2e8f0" : "#64748b" }}
                  >
                    Not sure which service to choose?
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                  >
                    Use the filters and categories below, or{" "}
                    <button
                      onClick={() => navigate("/contact")}
                      className="underline"
                      style={{ color: colors.primary }}
                    >
                      talk to our team
                    </button>{" "}
                    and we&apos;ll recommend a tailored bundle.
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ============= CATEGORY TABS ============= */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: isDark ? "#cbd5f5" : "#64748b" }}
              >
                Browse by category
              </h2>
              <span
                className="text-xs"
                style={{ color: isDark ? "#9ca3af" : "#64748b" }}
              >
                Showing{" "}
                <span
                  className="font-semibold"
                  style={{ color: isDark ? "#f9fafb" : "#111827" }}
                >
                  {filteredServices.length}
                </span>{" "}
                of {services.length} services
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="relative whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all"
                    style={{
                      borderColor: isDark ? "#1f2937" : "#e5e7eb",
                      backgroundColor: isDark ? "#020617" : "#f9fafb",
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-full shadow-lg"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        style={{
                          backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* ============= FILTER SECTION ============= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl shadow-2xl p-6 backdrop-blur-xl"
            style={{
              backgroundColor: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.95)",
              border: `1px solid ${isDark ? "#1f2937" : "#e5e7eb"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FaFilter
                className="text-lg"
                style={{ color: colors.primary }}
              />
              <h2
                className="text-sm sm:text-base font-semibold"
                style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
              >
                Refine your search
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Search */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-medium"
                  style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                >
                  Search services
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Search by title, feature, use case..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border"
                    style={{
                      backgroundColor: isDark ? "#020617" : "#f9fafb",
                      borderColor: isDark ? "#1f2937" : "#e5e7eb",
                      color: isDark ? "#f9fafb" : "#0f172a",
                    }}
                  />
                </div>
              </div>

              {/* Category select */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-medium"
                  style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                >
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none border"
                  style={{
                    backgroundColor: isDark ? "#020617" : "#f9fafb",
                    borderColor: isDark ? "#1f2937" : "#e5e7eb",
                    color: isDark ? "#f9fafb" : "#0f172a",
                  }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-medium"
                  style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                >
                  <FaDollarSign className="inline mr-1 text-xs" />
                  Price range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none border"
                  style={{
                    backgroundColor: isDark ? "#020617" : "#f9fafb",
                    borderColor: isDark ? "#1f2937" : "#e5e7eb",
                    color: isDark ? "#f9fafb" : "#0f172a",
                  }}
                >
                  <option value="all">All prices</option>
                  <option value="under500">Under $500</option>
                  <option value="500to1000">$500 - $1,000</option>
                  <option value="1000to1500">$1,000 - $1,500</option>
                  <option value="over1500">Over $1,500</option>
                </select>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-medium"
                  style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                >
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none border"
                  style={{
                    backgroundColor: isDark ? "#020617" : "#f9fafb",
                    borderColor: isDark ? "#1f2937" : "#e5e7eb",
                    color: isDark ? "#f9fafb" : "#0f172a",
                  }}
                >
                  <option value="default">Recommended</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t"
              style={{ borderColor: isDark ? "#1f2937" : "#e5e7eb" }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs"
                    style={{ color: isDark ? "#9ca3af" : "#64748b" }}
                  >
                    Showing{" "}
                    <span
                      className="font-semibold"
                      style={{ color: isDark ? "#f9fafb" : "#111827" }}
                    >
                      {filteredServices.length}
                    </span>{" "}
                    of {services.length} services
                  </span>
                  {(selectedCategory !== "All" ||
                    searchQuery ||
                    priceRange !== "all" ||
                    sortBy !== "default") && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                        setPriceRange("all");
                        setSortBy("default");
                      }}
                      className="text-xs font-medium underline decoration-dotted"
                      style={{ color: colors.primary }}
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs"
                  style={{ color: isDark ? "#bbf7d0" : "#166534" }}
                >
                  <FaClock />
                  <span>
                    Our team can tailor any service into a custom engagement for
                    your use case.
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ============= FEATURED SERVICES ============= */}
          {featuredServices.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2
                  className="text-sm font-semibold"
                  style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
                >
                  Featured services
                </h2>
                <p
                  className="text-xs max-w-md"
                  style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                >
                  Popular choices when teams are starting with Predicto.ai or
                  preparing for funding, feasibility or large initiatives.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="relative group"
                  >
                    <div
                      className="absolute -inset-px rounded-2xl opacity-70 blur group-hover:opacity-100 group-hover:blur-md transition-all"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
                      }}
                    />
                    <div className="relative">
                      <ServiceCard
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        pricing={service.pricing}
                        features={service.features}
                        onLearnMore={() =>
                          navigate(`/services/${service.id}`)
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ============= SERVICES GRID ============= */}
          {remainingServices.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
            >
              <AnimatePresence>
                {remainingServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ delay: index * 0.03 }}
                    layout
                    className="relative group"
                  >
                    <ServiceCard
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      pricing={service.pricing}
                      features={service.features}
                      onLearnMore={() =>
                        navigate(`/services/${service.id}`)
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.section>
          )}

          {/* ============= EMPTY STATE ============= */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaSearch
                className="mx-auto text-5xl mb-4"
                style={{ color: isDark ? "#4b5563" : "#cbd5f5" }}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
              >
                No services match your criteria
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
              >
                Try changing the category, widening the price range, or removing
                some filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setPriceRange("all");
                  setSortBy("default");
                }}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Reset all filters
              </button>
            </motion.div>
          )}

          {/* ============= BOTTOM CTA ============= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-4"
          >
            <div
              className="relative overflow-hidden rounded-3xl border px-6 py-10 sm:px-10 sm:py-12"
              style={{
                borderColor: isDark ? "#1f2937" : "#e5e7eb",
                background: isDark
                  ? `linear-gradient(to bottom right, #020617, ${colors.primary}22)`
                  : `linear-gradient(to bottom right, #ffffff, ${colors.primary}15)`,
              }}
            >
              <div className="relative grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-semibold mb-3"
                    style={{ color: isDark ? "#f9fafb" : "#0f172a" }}
                  >
                    Need a tailored combination of services?
                  </h3>
                  <p
                    className="text-sm sm:text-base mb-5 max-w-lg"
                    style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                  >
                    We can bundle business planning, feasibility, estimation and
                    tooling into a structured engagement, aligned with your
                    budget, milestones and investor expectations.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate("/contact")}
                      className="px-6 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: isDark ? "#f9fafb" : "#0f172a",
                        color: isDark ? "#0f172a" : "#f9fafb",
                      }}
                    >
                      Talk to an expert
                    </button>
                    <button
                      onClick={() => navigate("/estimation")}
                      className="px-6 py-2 rounded-full text-sm font-semibold border"
                      style={{
                        borderColor: isDark ? "rgba(249,250,251,0.4)" : colors.primary,
                        color: isDark ? "#f9fafb" : colors.primary,
                        backgroundColor: isDark ? "transparent" : "transparent",
                      }}
                    >
                      Start a sample estimation
                    </button>
                  </div>
                </div>
                <div
                  className="text-sm space-y-2"
                  style={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <span>Priority lanes for funded and time-sensitive projects.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#0ea5e9" }}
                    />
                    <span>Flexible commercial models for startups and SMBs.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#facc15" }}
                    />
                    <span>Strict confidentiality and compliance for all data shared.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </Layout>
  );
}
