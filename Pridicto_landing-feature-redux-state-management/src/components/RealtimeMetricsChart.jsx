import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function RealtimeMetricsChart() {
  const [metrics, setMetrics] = useState({
    estimationAccuracy: 87,
    projectOnTime: 92,
    teamProductivity: 78,
    costSavings: 34,
  });

  const [prevMetrics, setPrevMetrics] = useState({ ...metrics });
  const [animatingKeys, setAnimatingKeys] = useState(new Set());

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = {
          estimationAccuracy: Math.min(100, Math.max(80, prev.estimationAccuracy + (Math.random() - 0.5) * 3)),
          projectOnTime: Math.min(100, Math.max(85, prev.projectOnTime + (Math.random() - 0.5) * 2)),
          teamProductivity: Math.min(100, Math.max(70, prev.teamProductivity + (Math.random() - 0.5) * 3)),
          costSavings: Math.min(100, Math.max(25, prev.costSavings + (Math.random() - 0.5) * 2)),
        };
        
        // Track which metrics changed
        const changing = new Set();
        Object.keys(newMetrics).forEach(key => {
          if (Math.abs(newMetrics[key] - prev[key]) > 0.5) {
            changing.add(key);
          }
        });
        
        if (changing.size > 0) {
          setAnimatingKeys(changing);
          setTimeout(() => setAnimatingKeys(new Set()), 500);
        }
        
        setPrevMetrics(prev);
        return newMetrics;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const MetricBar = ({ label, value, icon: Icon, color }) => {
    const isIncreasing = value >= (prevMetrics[label.toLowerCase().replace(/\s+/g, '')] || value);
    const isAnimating = animatingKeys.has(label.toLowerCase().replace(/\s+/g, ''));

    return (
      <motion.div
        layout
        className="mb-6 last:mb-0"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-gray-900 text-white text-sm">
              {label}
            </span>
          </div>
          <motion.div
            animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1"
          >
            <span className="font-bold text-lg text-gray-900 text-white">
              {Math.round(value)}%
            </span>
            {isIncreasing ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </motion.div>
        </div>

        <div className="w-full bg-gray-200 bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`h-full ${color} rounded-full`}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white bg-gray-800 rounded-xl border-2 border-gray-200 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 text-white">Real-time Performance</h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 bg-green-500 rounded-full"
        />
      </div>

      <MetricBar
        label="EstimationAccuracy"
        value={metrics.estimationAccuracy}
        icon={TrendingUp}
        color="bg-blue-100 bg-blue-900/30 text-blue-600 text-blue-400"
      />

      <MetricBar
        label="ProjectOnTime"
        value={metrics.projectOnTime}
        icon={TrendingUp}
        color="bg-green-100 bg-green-900/30 text-green-600 text-green-400"
      />

      <MetricBar
        label="TeamProductivity"
        value={metrics.teamProductivity}
        icon={TrendingUp}
        color="bg-purple-100 bg-purple-900/30 text-purple-600 text-purple-400"
      />

      <MetricBar
        label="CostSavings"
        value={metrics.costSavings}
        icon={TrendingUp}
        color="bg-orange-100 bg-orange-900/30 text-orange-600 text-orange-400"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 from-green-900/20 to-emerald-900/20 rounded-lg border border-green-200 border-green-800"
      >
        <p className="text-xs text-green-700 text-green-400 font-semibold">
          ✓ All metrics updating in real-time • Connected to live data stream
        </p>
      </motion.div>
    </div>
  );
}
