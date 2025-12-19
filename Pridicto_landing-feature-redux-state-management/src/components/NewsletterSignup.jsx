import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    // Ideally, handle subscribing the email to a newsletter provider via API here
  };

  return (
    <section className="max-w-md mx-auto bg-gradient-to-tr from-[#330066] to-[#660099] text-white rounded-3xl p-8 my-20 shadow-lg shadow-indigo-900/50">
      <h2 className="text-3xl font-bold mb-6 text-center">Join Our Newsletter</h2>
      <p className="text-sm text-slate-300 mb-6 text-center">
        Get the latest updates, tips, and exclusive AI project forecasting insights directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          className="flex-grow rounded-xl px-4 py-3 border border-white/20 bg-white/10 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          required
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-400 hover:bg-emerald-500 rounded-xl px-6 py-3 font-semibold text-black shadow-lg"
        >
          Subscribe
        </motion.button>
      </form>
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-emerald-300 text-center"
        >
          Thank you for subscribing!
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-500 text-center"
        >
          Please enter a valid email address.
        </motion.p>
      )}
    </section>
  );
}
