import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartBar, 
  FaGlobe, 
  FaDollarSign, 
  FaClock, 
  FaUsers,
  FaIndustry,
  FaTrendingUp,
  FaInfoCircle,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function EstimationComparison({ userEstimate, projectType }) {
  const [selectedBenchmark, setSelectedBenchmark] = useState('industry');
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Market benchmark data (this would come from real market data API)
  const benchmarkData = {
    industry: {
      web: {
        low: { cost: 12000, timeline: 8, team: 2 },
        medium: { cost: 28000, timeline: 16, team: 4 },
        high: { cost: 65000, timeline: 28, team: 6 }
      },
      mobile: {
        low: { cost: 18000, timeline: 10, team: 3 },
        medium: { cost: 42000, timeline: 20, team: 5 },
        high: { cost: 85000, timeline: 32, team: 8 }
      },
      ai: {
        low: { cost: 25000, timeline: 12, team: 3 },
        medium: { cost: 68000, timeline: 24, team: 6 },
        high: { cost: 180000, timeline: 40, team: 10 }
      },
      ecommerce: {
        low: { cost: 22000, timeline: 14, team: 3 },
        medium: { cost: 52000, timeline: 26, team: 5 },
        high: { cost: 105000, timeline: 36, team: 8 }
      }
    },
    regional: {
      'North America': { multiplier: 1.4, label: '🇺🇸 North America' },
      'Europe': { multiplier: 1.2, label: '🇪🇺 Europe' },
      'Asia-Pacific': { multiplier: 0.8, label: '🌏 Asia-Pacific' },
      'Latin America': { multiplier: 0.6, label: '🌎 Latin America' },
      'Eastern Europe': { multiplier: 0.5, label: '🇵🇱 Eastern Europe' },
      'Global Average': { multiplier: 1.0, label: '🌍 Global Average' }
    }
  };

  const complexityLevels = ['low', 'medium', 'high'];
  const projectTypes = ['web', 'mobile', 'ai', 'ecommerce'];

  const getBenchmarkEstimate = () => {
    if (!userEstimate || !projectType) return null;

    // Determine complexity level from user estimate
    const complexity = userEstimate.confidence > 90 ? 'low' : 
                     userEstimate.confidence > 75 ? 'medium' : 'high';

    const baseBenchmark = benchmarkData.industry[projectType][complexity];
    const regionalMultiplier = benchmarkData.regional[selectedRegion].multiplier;

    return {
      cost: Math.round(baseBenchmark.cost * regionalMultiplier),
      timeline: Math.round(baseBenchmark.timeline * regionalMultiplier),
      team: baseBenchmark.team,
      confidence: complexity === 'low' ? 92 : complexity === 'medium' ? 85 : 78,
      breakdown: {
        development: Math.round(baseBenchmark.cost * 0.65 * regionalMultiplier),
        design: Math.round(baseBenchmark.cost * 0.12 * regionalMultiplier),
        testing: Math.round(baseBenchmark.cost * 0.13 * regionalMultiplier),
        projectManagement: Math.round(baseBenchmark.cost * 0.08 * regionalMultiplier),
        contingency: Math.round(baseBenchmark.cost * 0.02 * regionalMultiplier)
      }
    };
  };

  const benchmark = getBenchmarkEstimate();
  const costDifference = benchmark ? 
    Math.round(((userEstimate?.totalCost - benchmark.cost) / benchmark.cost) * 100) : 0;

  const getComparisonColor = (diff) => {
    if (diff < -10) return 'text-green-600';
    if (diff > 10) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getComparisonLabel = (diff) => {
    if (diff < -10) return 'More Competitive';
    if (diff > 10) return 'Above Market';
    return 'Market Rate';
  };

  return (
    <motion.div 
      initial={{opacity:0,y:50}} 
      animate={{opacity:1,y:0}} 
      className="space-y-6"
    >
      <div className="p-8 rounded-2xl bg-white bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <FaChartBar className="text-indigo-600" />
          Market Comparison
        </h3>
        <p className="text-gray-500 text-gray-400 mb-6">
          See how your estimate compares to industry standards and regional rates
        </p>

        {/* Benchmark Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Benchmark Type</label>
            <select 
              value={selectedBenchmark}
              onChange={(e) => setSelectedBenchmark(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-slate-700 border-slate-600"
            >
              <option value="industry">Industry Standards</option>
              <option value="competitors">Competitor Analysis</option>
              <option value="historical">Your Historical Data</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-600" />
              Regional Analysis
            </label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-slate-700 border-slate-600"
            >
              {Object.entries(benchmarkData.regional).map(([region, data]) => (
                <option key={region} value={region}>{data.label}</option>
              ))}
            </select>
          </div>
        </div>

        {!userEstimate || !benchmark ? (
          <div className="text-center py-8">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 text-gray-400">
              Complete your estimate to see market comparison
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Comparison Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 from-blue-900/20 to-indigo-900/20 rounded-xl">
                <div className="text-center">
                  <FaDollarSign className="text-blue-600 text-3xl mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    ${userEstimate.totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 text-gray-400">Your Estimate</div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 from-green-900/20 to-emerald-900/20 rounded-xl">
                <div className="text-center">
                  <FaTrendingUp className="text-green-600 text-3xl mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    ${benchmark.cost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 text-gray-400">Market Benchmark</div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 from-purple-900/20 to-pink-900/20 rounded-xl">
                <div className="text-center">
                  <FaChartBar className="text-purple-600 text-3xl mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${getComparisonColor(costDifference)}`}>
                    {costDifference > 0 ? '+' : ''}{costDifference}%
                  </div>
                  <div className="text-sm text-gray-600 text-gray-400">
                    {getComparisonLabel(costDifference)}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 border-gray-700">
                    <th className="text-left py-3 px-4">Metric</th>
                    <th className="text-center py-3 px-4">Your Estimate</th>
                    <th className="text-center py-3 px-4">Market Benchmark</th>
                    <th className="text-center py-3 px-4">Difference</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-100 border-gray-800">
                    <td className="py-3 px-4 font-medium">Total Cost</td>
                    <td className="py-3 px-4 text-center">${userEstimate.totalCost.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">${benchmark.cost.toLocaleString()}</td>
                    <td className={`py-3 px-4 text-center font-bold ${getComparisonColor(costDifference)}`}>
                      {costDifference > 0 ? '+' : ''}{costDifference}%
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 border-gray-800">
                    <td className="py-3 px-4 font-medium">Timeline</td>
                    <td className="py-3 px-4 text-center">{userEstimate.timeline} weeks</td>
                    <td className="py-3 px-4 text-center">{benchmark.timeline} weeks</td>
                    <td className="py-3 px-4 text-center">
                      {userEstimate.timeline > benchmark.timeline ? '+' : ''}
                      {userEstimate.timeline - benchmark.timeline} weeks
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 border-gray-800">
                    <td className="py-3 px-4 font-medium">Confidence Level</td>
                    <td className="py-3 px-4 text-center">{userEstimate.confidence}%</td>
                    <td className="py-3 px-4 text-center">{benchmark.confidence}%</td>
                    <td className="py-3 px-4 text-center">
                      {userEstimate.confidence > benchmark.confidence ? 'Higher' : 'Lower'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Regional Analysis */}
            <div className="p-6 bg-gray-50 bg-slate-700 rounded-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <FaGlobe className="text-indigo-600" />
                Regional Cost Analysis
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(benchmarkData.regional).map(([region, data]) => {
                  const regionalCost = Math.round(benchmark.cost / data.multiplier);
                  const isSelected = selectedRegion === region;
                  
                  return (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-50 bg-indigo-900/20' 
                          : 'border-gray-200 border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{data.label}</div>
                      <div className="text-lg font-bold">${regionalCost.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {data.multiplier > 1 ? '+' : ''}{Math.round((data.multiplier - 1) * 100)}% vs average
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry Insights */}
            <div className="p-6 bg-blue-50 bg-blue-900/20 rounded-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <FaIndustry className="text-blue-600" />
                Industry Insights
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Market Trends</h5>
                  <ul className="text-sm space-y-1 text-blue-700 text-blue-300">
                    <li>• AI/ML projects showing 25% cost increase</li>
                    <li>• Remote work reducing overhead by 15%</li>
                    <li>• Cloud-native architectures gaining popularity</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Recommendations</h5>
                  <ul className="text-sm space-y-1 text-blue-700 text-blue-300">
                    <li>• Consider agile delivery for better pricing</li>
                    <li>• Leverage open-source to reduce costs</li>
                    <li>• Plan for post-launch maintenance budget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}