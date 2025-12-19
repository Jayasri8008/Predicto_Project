// src/pages/AuthPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiLoader,
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiShield,
  FiBookOpen,
  FiBriefcase,
  FiGlobe,
  FiLink,
  FiUsers,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roles = [
  {
    id: "student",
    label: "Student / Learner",
    badge: "Academic & Capstone",
    tagline: "Perfect for projects, hackathons and learning journeys.",
  },
  {
    id: "company",
    label: "Company / Startup",
    badge: "Teams & Clients",
    tagline: "For product, delivery & leadership teams planning initiatives.",
  },
  {
    id: "freelancer",
    label: "Freelancer / Consultant",
    badge: "Client Workflows",
    tagline: "Quote, scope and plan work across multiple clients.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ananya • Product Manager",
    role: "Scaled 12+ initiatives",
    quote: "Predicto.ai turned vague ideas into clear, confident delivery plans.",
  },
  {
    id: 2,
    name: "Rahul • Final-year CS",
    role: "Capstone project lead",
    quote: "We estimated effort, timelines and risks for our project in under an hour.",
  },
  {
    id: 3,
    name: "Maya • Freelance Developer",
    role: "Handled 9+ active clients",
    quote: "My proposals now look data-backed instead of guesswork.",
  },
];

// animation helpers
const slideVariants = {
  initialRight: { opacity: 0, x: 40 },
  initialLeft: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exitLeft: { opacity: 0, x: -40, transition: { duration: 0.35 } },
  exitRight: { opacity: 0, x: 40, transition: { duration: 0.35 } },
};

const testimonialVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
};

const AuthPage = () => {
  // view: login | signup | forgot | verify
  const [mode, setMode] = useState("login");
  const [activeRoleIndex, setActiveRoleIndex] = useState(1); // default company
  const activeRole = roles[activeRoleIndex];

  const navigate = useNavigate();
  const { login, signup, loading } = useAuth();

  const API_BASE_URL =
    import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080";

  // intro splash (ad-like)
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setShowSplash(false), 1300);
    return () => clearTimeout(id);
  }, []);

  // testimonials carousel
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // ===================== FORM STATE =====================
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loginErrors, setLoginErrors] = useState({});

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [signupErrors, setSignupErrors] = useState({});

  // role-specific signup details (UI only for now)
  const [studentDetails, setStudentDetails] = useState({
    institute: "",
    course: "",
    graduationYear: "",
  });

  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    roleTitle: "",
    teamSize: "",
  });

  const [freelancerDetails, setFreelancerDetails] = useState({
    speciality: "",
    portfolioUrl: "",
    clientsCount: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [verifyForm, setVerifyForm] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [verifyErrors, setVerifyErrors] = useState({});

  const [submitError, setSubmitError] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [showVerifyNew, setShowVerifyNew] = useState(false);
  const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);

  // ===================== PASSWORD STRENGTH =====================
  const passwordStrength = useMemo(() => {
    const pwd = signupForm.password || "";
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (!pwd)
      return {
        label: "Enter a strong password",
        level: 0,
        color: "bg-slate-700",
      };
    if (score <= 2)
      return {
        label: "Weak — add more characters & symbols",
        level: 1,
        color: "bg-rose-500",
      };
    if (score === 3)
      return {
        label: "Good — can be stronger",
        level: 2,
        color: "bg-amber-400",
      };
    return { label: "Strong password", level: 3, color: "bg-emerald-500" };
  }, [signupForm.password]);

  // ===================== VALIDATION =====================
  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email))
      errors.email = "Please enter a valid email";
    if (!loginForm.password) errors.password = "Password is required";
    return errors;
  };

  const validateSignupForm = () => {
    const errors = {};
    if (!signupForm.firstName) errors.firstName = "First name is required";
    if (!signupForm.lastName) errors.lastName = "Last name is required";

    if (!signupForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupForm.email))
      errors.email = "Please enter a valid email";

    if (!signupForm.password) {
      errors.password = "Password is required";
    } else if (signupForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!signupForm.acceptTerms) {
      errors.acceptTerms = "Please accept the Terms & Privacy Policy";
    }

    // light role-based validation (optional)
    if (activeRole.id === "student" && !studentDetails.institute) {
      errors.roleDetails = "Please add your institute (you can keep others optional).";
    }
    if (activeRole.id === "company" && !companyDetails.companyName) {
      errors.roleDetails = "Please add your company name.";
    }
    if (activeRole.id === "freelancer" && !freelancerDetails.speciality) {
      errors.roleDetails = "Please describe your primary skill.";
    }

    return errors;
  };

  const validateForgot = () => {
    if (!forgotEmail) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(forgotEmail)) return "Please enter a valid email";
    return "";
  };

  const validateVerifyForm = () => {
    const errors = {};
    if (!verifyForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(verifyForm.email))
      errors.email = "Please enter a valid email";

    if (!verifyForm.code) errors.code = "Verification code is required";

    if (!verifyForm.newPassword)
      errors.newPassword = "New password is required";
    else if (verifyForm.newPassword.length < 6)
      errors.newPassword = "Password must be at least 6 characters";

    if (verifyForm.newPassword !== verifyForm.confirmNewPassword)
      errors.confirmNewPassword = "Passwords do not match";

    return errors;
  };

  // ===================== SUBMITS =====================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const errors = validateLoginForm();
    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await login({
        email: loginForm.email,
        password: loginForm.password,
      });
      setLoginForm({ email: "", password: "", remember: false });
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(error.message || "Login failed. Please try again.");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const errors = validateSignupForm();
    setSignupErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      // TODO: if backend supports it, send role + role-specific details here as well.
      await signup({
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
        email: signupForm.email,
        password: signupForm.password,
      });

      setSignupForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      setStudentDetails({ institute: "", course: "", graduationYear: "" });
      setCompanyDetails({ companyName: "", roleTitle: "", teamSize: "" });
      setFreelancerDetails({
        speciality: "",
        portfolioUrl: "",
        clientsCount: "",
      });

      setMode("login");
      setLoginForm({ email: signupForm.email, password: "", remember: false });
    } catch (error) {
      setSubmitError(error.message || "Signup failed. Please try again.");
    }
  };

  const handleForgotSubmit = async (e) => {
  e.preventDefault();
  setForgotError("");

  const msg = validateForgot();
  if (msg) {
    setForgotError(msg);
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to send OTP");
    }

    setVerifyForm((prev) => ({ ...prev, email: forgotEmail }));
    setMode("verify");
  } catch (err) {
    setForgotError(err.message || "Failed to send OTP");
  }
 
};

 const handleVerifySubmit = async (e) => {
  e.preventDefault();
  setVerifyErrors({});
  setSubmitError("");

  const errors = validateVerifyForm();
  setVerifyErrors(errors);
  if (Object.keys(errors).length > 0) return;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: verifyForm.email,
        otp: verifyForm.code,
        password: verifyForm.newPassword,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Invalid OTP");
    }

    setMode("login");
    setLoginForm((prev) => ({
      ...prev,
      email: verifyForm.email,
      password: "",
    }));
  } catch (err) {
    setSubmitError(err.message || "Password reset failed");
  }
};


  // ===================== SOCIAL AUTH HANDLERS =====================
 const handleGoogleAuth = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

  
const handleGitHubAuth = () => {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/github`;
};

  const handleAppleAuth = () => {
    // TODO: Implement /auth/apple on your backend
    window.location.href = `${API_BASE_URL}/auth/apple`;
  };

  const handleLinkedInAuth = () => {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/linkedin`;
};



  // ===================== ROLE CAROUSEL =====================
  const goNextRole = () => {
    setActiveRoleIndex((prev) => (prev + 1) % roles.length);
  };

  const goPrevRole = () => {
    setActiveRoleIndex((prev) => (prev - 1 + roles.length) % roles.length);
  };

  const getRolePositionClass = (index) => {
    if (index === activeRoleIndex) return "z-20 scale-100";
    if ((index + 1) % roles.length === activeRoleIndex)
      return "opacity-60 scale-90 translate-x-6 md:translate-x-10 z-10";
    if ((index - 1 + roles.length) % roles.length === activeRoleIndex)
      return "opacity-60 scale-90 -translate-x-6 md:-translate-x-10 z-10";
    return "opacity-0 scale-75 pointer-events-none";
  };

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";
  const isVerify = mode === "verify";

  // ===================== ROLE-SPECIFIC SIGNUP SECTION =====================
  const renderRoleSpecificSignup = () => {
    if (activeRole.id === "student") {
      return (
        <div className="mt-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 px-3 py-3 space-y-3">
          <div className="flex items-center gap-2 text-xs text-cyan-100 mb-1">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400/60">
              <FiBookOpen className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="font-medium text-[12px]">Student details</p>
              <p className="text-[10px] text-cyan-100/80">
                Helps us shape templates and language for your academic work.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={studentDetails.institute}
              onChange={(e) =>
                setStudentDetails((prev) => ({
                  ...prev,
                  institute: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-cyan-400/80"
              placeholder="Institute / University"
            />
            <input
              type="text"
              value={studentDetails.course}
              onChange={(e) =>
                setStudentDetails((prev) => ({
                  ...prev,
                  course: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-cyan-400/80"
              placeholder="Course / Program"
            />
          </div>
          <input
            type="text"
            value={studentDetails.graduationYear}
            onChange={(e) =>
              setStudentDetails((prev) => ({
                ...prev,
                graduationYear: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-cyan-400/80"
            placeholder="Graduation year (optional)"
          />
        </div>
      );
    }

    if (activeRole.id === "company") {
      return (
        <div className="mt-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-3 space-y-3">
          <div className="flex items-center gap-2 text-xs text-emerald-100 mb-1">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/60">
              <FiBriefcase className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="font-medium text-[12px]">Company details</p>
              <p className="text-[10px] text-emerald-100/80">
                Tailors the workspace for product, delivery and leadership use.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={companyDetails.companyName}
              onChange={(e) =>
                setCompanyDetails((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400/80"
              placeholder="Company / Startup name"
            />
            <input
              type="text"
              value={companyDetails.roleTitle}
              onChange={(e) =>
                setCompanyDetails((prev) => ({
                  ...prev,
                  roleTitle: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400/80"
              placeholder="Your role / department"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={companyDetails.teamSize}
              onChange={(e) =>
                setCompanyDetails((prev) => ({
                  ...prev,
                  teamSize: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400/80"
              placeholder="Team size (approx)"
            />
            <div className="flex items-center text-[10px] text-emerald-100/80">
              <FiUsers className="w-3.5 h-3.5 mr-1" />
              This helps scale estimation defaults for your organisation.
            </div>
          </div>
        </div>
      );
    }

    if (activeRole.id === "freelancer") {
      return (
        <div className="mt-2 rounded-2xl border border-purple-500/40 bg-purple-500/5 px-3 py-3 space-y-3">
          <div className="flex items-center gap-2 text-xs text-purple-100 mb-1">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 border border-purple-400/60">
              <FiGlobe className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="font-medium text-[12px]">Freelancer details</p>
              <p className="text-[10px] text-purple-100/80">
                Designed to make proposals, scopes and client estimates faster.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={freelancerDetails.speciality}
              onChange={(e) =>
                setFreelancerDetails((prev) => ({
                  ...prev,
                  speciality: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-purple-400/80"
              placeholder="Primary skill (e.g. Java, UI, PM)"
            />
            <input
              type="text"
              value={freelancerDetails.clientsCount}
              onChange={(e) =>
                setFreelancerDetails((prev) => ({
                  ...prev,
                  clientsCount: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-purple-400/80"
              placeholder="Clients handled (approx)"
            />
          </div>
          <input
            type="text"
            value={freelancerDetails.portfolioUrl}
            onChange={(e) =>
              setFreelancerDetails((prev) => ({
                ...prev,
                portfolioUrl: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-purple-400/80"
            placeholder="Portfolio / GitHub / website link (optional)"
          />
          <p className="text-[10px] text-purple-100/80 flex items-center gap-1">
            <FiLink className="w-3.5 h-3.5" />
            Linking this later in your profile can auto-fill proposal templates.
          </p>
        </div>
      );
    }

    return null;
  };

  // ===================== SPLASH VIEW =====================
  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/60">
              P
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Predicto.ai
          </h1>
          <p className="text-sm text-slate-300">
            Smart project estimation for students, teams and freelancers.
          </p>
        </motion.div>
      </div>
    );
  }

  // ===================== UI =====================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden relative">
      {/* Background grid + blobs + sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {/* gradient blobs */}
        <div className="absolute -top-24 -left-10 w-72 h-72 bg-cyan-500/25 rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute top-1/3 -right-16 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl opacity-80 animate-[ping_6s_linear_infinite]" />
        <div className="absolute bottom-[-6rem] left-1/4 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl opacity-70 animate-[pulse_7s_ease-in-out_infinite]" />

        {/* grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,#22d3ee18,transparent_50%),radial-gradient(circle_at_100%_0,#4f46e518,transparent_55%),radial-gradient(circle_at_0_100%,#ec489918,transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* sparkles */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-100 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-indigo-100 rounded-full animate-ping delay-150" />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-emerald-100 rounded-full animate-ping delay-300" />
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ rotateY: 4, rotateX: -2, scale: 1.01 }}
        className="relative z-10 w-full max-w-5xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_40px_120px_rgba(15,23,42,0.9)] overflow-hidden"
      >
        <div className="grid md:grid-cols-[1.1fr,1fr]">
          {/* LEFT PANEL – ROLE / BRANDING + TESTIMONIALS */}
          <div className="relative hidden md:flex flex-col justify-between p-8 lg:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 border-r border-white/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold shadow-md shadow-cyan-500/40 group-hover:shadow-cyan-400/70 transition-all">
                    P
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Predicto.ai
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Smart project estimation
                    </p>
                  </div>
                </Link>
                <div className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Early Access
                </div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl lg:text-4xl font-semibold leading-tight mb-3"
              >
                One login,{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  three ways to work.
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm text-slate-300 max-w-md"
              >
                We tune your experience based on how you work — student, team or
                independent expert. Estimates, language and defaults all adapt.
              </motion.p>

              {/* Animated testimonials */}
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-2">
                  Loved by teams & learners
                </p>
                <div className="relative h-24">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonials[activeTestimonialIndex].id}
                      variants={testimonialVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.7)]"
                    >
                      <p className="text-[11px] text-slate-200 italic mb-2">
                        “{testimonials[activeTestimonialIndex].quote}”
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-medium text-slate-200">
                          {testimonials[activeTestimonialIndex].name}
                        </span>
                        <span>{testimonials[activeTestimonialIndex].role}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* 3D Role Carousel */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                <span>Choose who you&apos;re logging in as</span>
                <span className="uppercase tracking-[0.18em] text-slate-400">
                  Role preset
                </span>
              </div>

              <div className="relative h-44">
                <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
                  {roles.map((role, index) => (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => setActiveRoleIndex(index)}
                      className={`absolute w-[85%] md:w-[80%] lg:w-[78%] origin-center rounded-2xl border backdrop-blur-xl bg-slate-900/80 px-4 py-4 text-left transition-all duration-500 shadow-[0_24px_60px_rgba(15,23,42,0.85)] ${
                        getRolePositionClass(index)
                      } ${
                        index === activeRoleIndex
                          ? "border-cyan-400/70 shadow-cyan-500/30"
                          : "border-white/10"
                      }`}
                      style={{ transformOrigin: "center" }}
                      whileHover={
                        index === activeRoleIndex
                          ? { y: -4, rotateY: 3, scale: 1.02 }
                          : { scale: 0.92 }
                      }
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                          {index === activeRoleIndex ? "Active role" : "Preset"}
                        </div>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-100">
                          {role.badge}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-50 mb-1">
                        {role.label}
                      </div>
                      <p className="text-xs text-slate-300">{role.tagline}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <div className="flex gap-1">
                  {roles.map((role, index) => (
                    <span
                      key={role.id}
                      className={`h-1 rounded-full transition-all ${
                        index === activeRoleIndex
                          ? "w-6 bg-cyan-400"
                          : "w-2 bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={goPrevRole}
                    className="h-8 w-8 rounded-full border border-white/15 flex items-center justify-center text-xs text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200 transition-colors"
                    type="button"
                  >
                    <FiArrowLeft />
                  </button>
                  <button
                    onClick={goNextRole}
                    className="h-8 w-8 rounded-full border border-white/15 flex items-center justify-center text-xs text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200 transition-colors"
                    type="button"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                You can always change this later in your workspace settings.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL – AUTH FLOWS */}
          <div className="relative bg-slate-950/70 md:bg-slate-950/40 p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

            {/* Top heading / mode switch */}
            <div className="relative flex items-center justify-between mb-6">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {activeRole.label}
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
                  {mode === "login" && "Welcome back"}
                  {mode === "signup" && "Create your workspace"}
                  {mode === "forgot" && "Reset your password"}
                  {mode === "verify" && "Verify & set new password"}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {mode === "login" && "Sign in to continue where you left off."}
                  {mode === "signup" &&
                    "We’ll set up a space that matches how you work."}
                  {mode === "forgot" &&
                    "We’ll email you a verification code to continue."}
                  {mode === "verify" &&
                    "Check your email for the code, then choose a new password."}
                </p>
              </div>

              {(isLogin || isSignup) && (
                <div className="flex items-center gap-1 text-[11px] bg-slate-900/70 border border-white/10 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      isLogin
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-300"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      isSignup
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-300"
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              )}

              {(isForgot || isVerify) && (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-[11px] text-slate-300 hover:text-slate-100 flex items-center gap-1"
                >
                  <FiArrowLeft className="w-3 h-3" /> Back to login
                </button>
              )}
            </div>

            {/* Error banner */}
            {submitError && (
              <div className="mb-4 rounded-xl border border-rose-500/60 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-100">
                {submitError}
              </div>
            )}

            {/* Social auth (only on login + signup) */}
            {(isLogin || isSignup) && (
              <div className="mb-5">
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="relative group w-full rounded-full border border-white/15 bg-slate-950/60 hover:bg-slate-900/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-50 flex items-center justify-center gap-2 transition-all overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                    <FcGoogle className="w-4 h-4 bg-white rounded-full z-10" />
                    <span className="z-10">Continue with Google</span>
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleGitHubAuth}
                      className="flex items-center justify-center gap-1 rounded-full border border-white/15 bg-slate-950/70 px-2 py-2 text-[11px] text-slate-100 hover:border-cyan-400/60 hover:text-cyan-100 transition-all"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span className="hidden sm:inline">GitHub</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAppleAuth}
                      className="flex items-center justify-center gap-1 rounded-full border border-white/15 bg-slate-950/70 px-2 py-2 text-[11px] text-slate-100 hover:border-cyan-400/60 hover:text-cyan-100 transition-all"
                    >
                      <FaApple className="w-4 h-4" />
                      <span className="hidden sm:inline">Apple</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLinkedInAuth}
                      className="flex items-center justify-center gap-1 rounded-full border border-white/15 bg-slate-950/70 px-2 py-2 text-[11px] text-slate-100 hover:border-cyan-400/60 hover:text-cyan-100 transition-all"
                    >
                      <FiLinkedin className="w-4 h-4" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-[0.18em]">
                    or use email
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </div>
            )}

            {/* MAIN VIEWS */}
            <AnimatePresence mode="wait" initial={false}>
              {/* LOGIN */}
              {isLogin && (
                <motion.div
                  key="login"
                  variants={slideVariants}
                  initial="initialRight"
                  animate="animate"
                  exit="exitLeft"
                >
                  <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                        <FiMail className="w-4 h-4" /> Email
                      </label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                          loginErrors.email
                            ? "border-rose-500/80 focus:border-rose-400/90"
                            : "border-white/10 focus:border-cyan-400/80"
                        }`}
                        placeholder="you@example.com"
                      />
                      {loginErrors.email && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {loginErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                        <FiLock className="w-4 h-4" /> Password
                      </label>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 pr-10 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                            loginErrors.password
                              ? "border-rose-500/80 focus:border-rose-400/90"
                              : "border-white/10 focus:border-cyan-400/80"
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowLoginPassword((prev) => !prev)
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                        >
                          {showLoginPassword ? (
                            <FiEyeOff className="w-4 h-4" />
                          ) : (
                            <FiEye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={loginForm.remember}
                          onChange={(e) =>
                            setLoginForm((prev) => ({
                              ...prev,
                              remember: e.target.checked,
                            }))
                          }
                          className="h-3 w-3 rounded border-slate-500 bg-slate-900"
                        />
                        <span>Remember this device</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Role info */}
                    <div className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/5 px-3 py-2 mt-1">
                      <FiShield className="w-4 h-4 text-cyan-300" />
                      <p className="text-[11px] text-slate-200">
                        You&apos;re signing in as{" "}
                        <span className="font-semibold text-cyan-200">
                          {activeRole.label}
                        </span>
                        . This helps us personalise templates, language and
                        dashboards.
                      </p>
                    </div>

                    {/* Login button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_45px_rgba(8,47,73,0.9)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-700" />
                      {loading && <FiLoader className="animate-spin z-10" />}
                      <span className="z-10">
                        {loading ? "Logging you in..." : "Continue to workspace"}
                      </span>
                    </button>

                    {/* Switch to signup */}
                    <p className="pt-3 text-[11px] text-slate-300 text-center">
                      New here?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2"
                      >
                        Create an account
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}

              {/* SIGNUP */}
              {isSignup && (
                <motion.div
                  key="signup"
                  variants={slideVariants}
                  initial="initialLeft"
                  animate="animate"
                  exit="exitRight"
                >
                  <form className="space-y-4" onSubmit={handleSignupSubmit}>
                    {/* Names */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                          <FiUser className="w-4 h-4" /> First name
                        </label>
                        <input
                          type="text"
                          value={signupForm.firstName}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                            signupErrors.firstName
                              ? "border-rose-500/80 focus:border-rose-400/90"
                              : "border-white/10 focus:border-cyan-400/80"
                          }`}
                          placeholder="First name"
                        />
                        {signupErrors.firstName && (
                          <p className="mt-1 text-[11px] text-rose-300">
                            {signupErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                          <FiUser className="w-4 h-4" /> Last name
                        </label>
                        <input
                          type="text"
                          value={signupForm.lastName}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                            signupErrors.lastName
                              ? "border-rose-500/80 focus:border-rose-400/90"
                              : "border-white/10 focus:border-cyan-400/80"
                          }`}
                          placeholder="Last name"
                        />
                        {signupErrors.lastName && (
                          <p className="mt-1 text-[11px] text-rose-300">
                            {signupErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                        <FiMail className="w-4 h-4" /> Work email
                      </label>
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                          signupErrors.email
                            ? "border-rose-500/80 focus:border-rose-400/90"
                            : "border-white/10 focus:border-cyan-400/80"
                        }`}
                        placeholder="you@company.com"
                      />
                      {signupErrors.email && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {signupErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                          <FiLock className="w-4 h-4" /> Password
                        </label>
                        <div className="relative">
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            value={signupForm.password}
                            onChange={(e) =>
                              setSignupForm((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 pr-10 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                              signupErrors.password
                                ? "border-rose-500/80 focus:border-rose-400/90"
                                : "border-white/10 focus:border-cyan-400/80"
                            }`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowSignupPassword((prev) => !prev)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                          >
                            {showSignupPassword ? (
                              <FiEyeOff className="w-4 h-4" />
                            ) : (
                              <FiEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {signupErrors.password && (
                          <p className="mt-1 text-[11px] text-rose-300">
                            {signupErrors.password}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                          <FiLock className="w-4 h-4" /> Confirm password
                        </label>
                        <div className="relative">
                          <input
                            type={showSignupConfirm ? "text" : "password"}
                            value={signupForm.confirmPassword}
                            onChange={(e) =>
                              setSignupForm((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                            className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 pr-10 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                              signupErrors.confirmPassword
                                ? "border-rose-500/80 focus:border-rose-400/90"
                                : "border-white/10 focus:border-cyan-400/80"
                            }`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowSignupConfirm((prev) => !prev)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                          >
                            {showSignupConfirm ? (
                              <FiEyeOff className="w-4 h-4" />
                            ) : (
                              <FiEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {signupErrors.confirmPassword && (
                          <p className="mt-1 text-[11px] text-rose-300">
                            {signupErrors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Password strength */}
                    <div className="space-y-1">
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all`}
                          style={{
                            width:
                              passwordStrength.level === 0
                                ? "0%"
                                : passwordStrength.level === 1
                                ? "33%"
                                : passwordStrength.level === 2
                                ? "66%"
                                : "100%",
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-300 flex items-center gap-1">
                        <FiShield className="w-3 h-3 text-cyan-300" />
                        {passwordStrength.label}
                      </p>
                    </div>

                    {/* Role-specific details */}
                    {renderRoleSpecificSignup()}
                    {signupErrors.roleDetails && (
                      <p className="mt-1 text-[11px] text-rose-300">
                        {signupErrors.roleDetails}
                      </p>
                    )}

                    {/* Terms */}
                    <div>
                      <label className="inline-flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signupForm.acceptTerms}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              acceptTerms: e.target.checked,
                            }))
                          }
                          className="h-3 w-3 rounded border-slate-500 bg-slate-900"
                        />
                        <span>
                          I agree to the{" "}
                          <span className="underline underline-offset-2">
                            Terms
                          </span>{" "}
                          &{" "}
                          <span className="underline underline-offset-2">
                            Privacy Policy
                          </span>
                          .
                        </span>
                      </label>
                      {signupErrors.acceptTerms && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {signupErrors.acceptTerms}
                        </p>
                      )}
                    </div>

                    {/* Role info */}
                    <p className="text-[11px] text-slate-300">
                      Workspace will be tuned for{" "}
                      <span className="text-cyan-300 font-medium">
                        {activeRole.label}
                      </span>
                      . You can change this later.
                    </p>

                    {/* Signup button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-1 w-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_45px_rgba(8,47,73,0.9)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-700" />
                      {loading && <FiLoader className="animate-spin z-10" />}
                      <span className="z-10">
                        {loading ? "Creating your account..." : "Create workspace"}
                      </span>
                    </button>

                    {/* Switch to login */}
                    <p className="pt-3 text-[11px] text-slate-300 text-center">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}

              {/* FORGOT PASSWORD */}
              {isForgot && (
                <motion.div
                  key="forgot"
                  variants={slideVariants}
                  initial="initialRight"
                  animate="animate"
                  exit="exitLeft"
                >
                  <form className="space-y-4" onSubmit={handleForgotSubmit}>
                    <div>
                      <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                        <FiMail className="w-4 h-4" /> Account email
                      </label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                          forgotError
                            ? "border-rose-500/80 focus:border-rose-400/90"
                            : "border-white/10 focus:border-cyan-400/80"
                        }`}
                        placeholder="you@example.com"
                      />
                      {forgotError && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {forgotError}
                        </p>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-300 flex items-center gap-1">
                      <FiShield className="w-3 h-3 text-cyan-300" />
                      We&apos;ll send a one-time code to this email to verify
                      it&apos;s really you.
                    </p>

                    <button
                      type="submit"
                      className="mt-1 w-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_45px_rgba(8,47,73,0.9)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      Send verification code
                    </button>

                    <p className="pt-3 text-[11px] text-slate-300 text-center">
                      Remembered your password?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2"
                      >
                        Back to login
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}

              {/* VERIFY + RESET PASSWORD */}
              {isVerify && (
                <motion.div
                  key="verify"
                  variants={slideVariants}
                  initial="initialLeft"
                  animate="animate"
                  exit="exitRight"
                >
                  <form className="space-y-4" onSubmit={handleVerifySubmit}>
                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                        <FiMail className="w-4 h-4" /> Email
                      </label>
                      <input
                        type="email"
                        value={verifyForm.email}
                        onChange={(e) =>
                          setVerifyForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                          verifyErrors.email
                            ? "border-rose-500/80 focus:border-rose-400/90"
                            : "border-white/10 focus:border-cyan-400/80"
                        }`}
                        placeholder="you@example.com"
                      />
                      {verifyErrors.email && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {verifyErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Code */}
                    <div>
                      <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                        <FiShield className="w-4 h-4" /> Verification code
                      </label>
                      <input
                        type="text"
                        value={verifyForm.code}
                        onChange={(e) =>
                          setVerifyForm((prev) => ({
                            ...prev,
                            code: e.target.value,
                          }))
                        }
                        className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 tracking-[0.3em] uppercase ${
                          verifyErrors.code
                            ? "border-rose-500/80 focus:border-rose-400/90"
                            : "border-white/10 focus:border-cyan-400/80"
                        }`}
                        placeholder="A1B2C3"
                      />
                      {verifyErrors.code && (
                        <p className="mt-1 text-[11px] text-rose-300">
                          {verifyErrors.code}
                        </p>
                      )}
                    </div>


                    {/* New passwords */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                          <FiLock className="w-4 h-4" /> New password
                        </label>
                        <div className="relative">
                          <input
                            type={showVerifyNew ? "text" : "password"}
                            value={verifyForm.newPassword}
                            onChange={(e) =>
                              setVerifyForm((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                              }))
                            }
                            className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 pr-10 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                              verifyErrors.newPassword
                                ? "border-rose-500/80 focus:border-rose-400/90"
                                : "border-white/10 focus:border-cyan-400/80"
                            }`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowVerifyNew((prev) => !prev)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                          >
                            {showVerifyNew ? (
                              <FiEyeOff className="w-4 h-4" />
                            ) : (
                              <FiEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {verifyErrors.newPassword && (
                          <p className="mt-1 text-[11px] text-rose-300">
                            {verifyErrors.newPassword}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
                          <FiLock className="w-4 h-4" /> Confirm password
                        </label>
                        <div className="relative">
                          <input
                            type={showVerifyConfirm ? "text" : "password"}
                            value={verifyForm.confirmNewPassword}
                            onChange={(e) =>
                              setVerifyForm((prev) => ({
                                ...prev,
                                confirmNewPassword: e.target.value,
                              }))
                            }
                            className={`w-full rounded-xl border bg-slate-950/70 px-3 py-2.5 pr-10 text-sm text-slate-50 outline-none transition-all placeholder:text-slate-500 ${
                              verifyErrors.confirmNewPassword
                                ? "border-rose-500/80 focus:border-rose-400/90"
                                : "border-white/10 focus:border-cyan-400/80"
                            }`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowVerifyConfirm((prev) => !prev)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                          >
                            {showVerifyConfirm ? (
                              <FiEyeOff className="w-4 h-4" />
                            ) : (
                              <FiEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {verifyErrors.confirmNewPassword && (
                          <p className="mt-1 text-[11px] text-rose-300">
                            {verifyErrors.confirmNewPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">
                      Once verified, we&apos;ll sign you in with your new
                      password.
                    </p>

                    <button
                      type="submit"
                      className="mt-1 w-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_45px_rgba(8,47,73,0.9)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      Reset password & sign in
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );

}
export default AuthPage; 