import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaCalculator, FaStar, FaRocket } from 'react-icons/fa';

export default function ServiceCard({ icon, title, description, onLearnMore, pricing, features }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800 text-center overflow-hidden group cursor-pointer"
      onClick={onLearnMore}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* AI Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
        <FaRocket className="text-xs" />
        AI
      </div>

      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>

        {/* Quick Features */}
        {features && (
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {features.slice(0, 3).map((feature, index) => (
                <span key={index} className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                  {feature.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Preview */}
        {pricing && (
          <div className="mb-4">
            <div className="text-lg font-bold text-indigo-600">
              {pricing}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Starting price</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore();
            }}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Learn More
          </motion.button>

          {pricing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                // Quick calculator functionality could be added here
              }}
              className="px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              <FaCalculator />
            </motion.button>
          )}
        </div>

        {/* Hover Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
        >
          <FaStar className="text-yellow-500" />
          <span>AI-Powered</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
