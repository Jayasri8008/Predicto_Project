import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How accurate are Predicto’s AI estimations?",
    answer:
      "Our AI models have been trained on thousands of real projects yielding an average accuracy of 90% for cost, timeline, and risk prediction.",
  },
  {
    question: "Can I integrate Predicto with my existing project management tools?",
    answer:
      "Yes, Predicto offers APIs and plugins that easily integrate with most popular project management and collaboration tools.",
  },
  {
    question: "Is my project data secure?",
    answer:
      "We use enterprise-grade encryption and security protocols to ensure your project data remains confidential and secure.",
  },
  {
    question: "Are there any limits on project size or complexity?",
    answer:
      "Predicto is scalable and supports projects of varying size and complexity, from small teams to large enterprises.",
  },
];

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#1a0033] to-[#330066] rounded-3xl text-white my-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map(({ question, answer }, index) => {
          const isExpanded = index === expandedIndex;
          return (
            <div key={index} className="bg-white/10 rounded-xl p-4 cursor-pointer select-none">
              <div
                className="flex justify-between items-center"
                onClick={() => toggle(index)}
                aria-expanded={isExpanded}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") toggle(index);
                }}
              >
                <h3 className="text-lg font-semibold">{question}</h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.p
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-3 text-slate-300 text-sm"
                  >
                    {answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
