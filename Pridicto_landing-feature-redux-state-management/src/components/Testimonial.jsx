import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonial({ quote, author, position, company }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-2xl shadow bg-white dark:bg-slate-800"
    >
      <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{position}, {company}</p>
      </div>
    </motion.div>
  );
}
