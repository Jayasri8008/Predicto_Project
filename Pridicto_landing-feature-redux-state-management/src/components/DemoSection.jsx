import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X, BarChart3, TrendingUp, Clock } from 'lucide-react';

export default function DemoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const demoFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Estimation",
      description: "Watch how our AI processes project data instantly"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Cost Analysis",
      description: "See detailed breakdowns and cost predictions"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Timeline Forecasting",
      description: "Experience accurate project timeline predictions"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            See Predicto.ai in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience our AI-powered estimation platform through an interactive demo.
            Watch how we transform complex project data into clear, actionable insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
              <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center cursor-pointer group"
                   onClick={() => setIsVideoOpen(true)}>
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <p className="text-xl font-semibold">Watch Demo</p>
                  <p className="text-sm opacity-80">2:34 minutes</p>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm font-semibold text-indigo-600">90% Accuracy</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Validated Results</div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm font-semibold text-purple-600">1,000+ Projects</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Trained Data</div>
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center pt-6"
            >
              <button
                onClick={() => setIsVideoOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Interactive Demo
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Predicto.ai Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
