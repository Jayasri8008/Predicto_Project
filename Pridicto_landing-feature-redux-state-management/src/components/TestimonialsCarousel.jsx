import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Predicto completely transformed how we plan projects. Accuracy is on point!",
    author: "Sarah Johnson, Project Manager",
  },
  {
    quote: "Predicto helped us reduce planning errors by 70% and improved team delivery speed dramatically.",
    author: "Juliana, CTO",
  },
  {
    quote: "The AI-powered forecasting is a game changer for our project management.",
    author: "Michael Lee, Product Owner",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a0033] to-[#000000] text-white text-center max-w-4xl mx-auto px-5 rounded-3xl relative">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-xl"
      >
        <p className="text-lg italic text-slate-200">{`“${testimonials[current].quote}”`}</p>
        <p className="mt-4 font-bold text-emerald-300">— {testimonials[current].author}</p>
      </motion.div>
    </section>
  );
}
