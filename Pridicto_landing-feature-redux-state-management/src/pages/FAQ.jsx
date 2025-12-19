import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is Predicto.ai?",
    answer: "Predicto.ai is an AI-powered project estimation platform that helps developers, managers, and startups accurately estimate project costs, timelines, and resources using machine learning trained on thousands of real-world projects."
  },
  {
    question: "How accurate are the estimations?",
    answer: "Our AI model has been validated on over 1,000 real projects and achieves 90% accuracy. However, final estimates should always be reviewed by experienced project managers."
  },
  {
    question: "What types of projects can I estimate?",
    answer: "We support estimation for web applications, mobile apps, AI/ML projects, e-commerce platforms, and construction projects. Our system adapts to different tech stacks and project complexities."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a 14-day free trial that allows you to generate up to 5 project estimates and access basic dashboard features."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also opt for annual invoicing."
  },
  {
    question: "Can I export my estimates?",
    answer: "Yes, all estimates can be exported as PDF reports, Excel spreadsheets, or shared directly with your team via email."
  },
  {
    question: "Do you offer consulting services?",
    answer: "Absolutely! Our expert consultants can help refine your estimates, provide strategic advice, and assist with project planning."
  },
  {
    question: "Is my data secure?",
    answer: "We use enterprise-grade encryption and comply with GDPR and SOC 2 standards. Your project data is never shared with third parties."
  },
  {
    question: "Can I integrate Predicto.ai with other tools?",
    answer: "Yes, we offer API access and integrations with popular project management tools like Jira, Trello, and Asana."
  },
  {
    question: "What if I need help?",
    answer: "Our support team is available 24/7 via email, chat, or phone. Premium customers get priority support and dedicated account managers."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="pt-28 max-w-4xl mx-auto px-6 pb-16">
        <Breadcrumb />
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Predicto.ai and our services.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-indigo-600" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4"
                  id={`faq-${index}`}
                >
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-8 bg-indigo-600 text-white rounded-2xl"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">Our team is here to help you succeed.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
