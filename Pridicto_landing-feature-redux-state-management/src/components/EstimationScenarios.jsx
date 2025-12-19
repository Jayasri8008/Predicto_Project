import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLightbulb, 
  FaCalculator, 
  FaClock, 
  FaUsers, 
  FaDollarSign,
  FaChartLine,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRedo
} from 'react-icons/fa';

export default function EstimationScenarios({ baseEstimate }) {
  const [activeScenario, setActiveScenario] = useState('realistic');
  const [scenarios, setScenarios] = useState({
    optimistic: null,
    realistic: baseEstimate || null,
    pessimistic: null
  });

  const calculateScenarioEstimate = (scenario) => {
    if (!baseEstimate) return null;

    const multipliers = {
      optimistic: {
        cost: 0.85,
        timeline: 0.80,
        teamSize: 0.90,
        confidence: 90
      },
      realistic: {
        cost: 1.0,
        timeline: 1.0,
        teamSize: 1.0,
        confidence: 85
      },
      pessimistic: {
        cost: 1.35,
        timeline: 1.50,
        teamSize: 1.25,
        confidence: 65
      }
    };

    const mult = multipliers[scenario];
    
    return {
      ...baseEstimate,
      totalCost: Math.round(baseEstimate.totalCost * mult.cost),
      timeline: Math.round(baseEstimate.timeline * mult.timeline),
      confidence: mult.confidence,
      scenario,
      breakdown: {
        ...baseEstimate.breakdown,
        development: Math.round(baseEstimate.breakdown.development * mult.cost),
        design: Math.round(baseEstimate.breakdown.design * mult.cost),
        testing: Math.round(baseEstimate.breakdown.testing * mult.cost),
        projectManagement: Math.round(baseEstimate.breakdown.projectManagement * mult.cost),
        contingency: Math.round(baseEstimate.breakdown.contingency * mult.cost)
      },
      risks: getRiskFactors(scenario),
      recommendations: getRecommendations(scenario)
    };
  };

  const getRiskFactors = (scenario) => {
    const riskMap = {
      optimistic: [
        'All assumptions go as planned',
        'No major technical challenges',
        'Team productivity exceeds expectations'
      ],
      realistic: [
        'Standard development challenges expected',
        'Moderate scope changes likely',
        'Normal team productivity levels'
      ],
      pessimistic: [
        'High probability of scope expansion',
        'Technical challenges likely',
        'Team productivity may be lower',
        'External dependencies uncertain'
      ]
    };
    return riskMap[scenario] || [];
  };

  const getRecommendations = (scenario) => {
    const recMap = {
      optimistic: [
        'Consider aggressive timeline',
        'Invest in premium resources',
        'Plan for early delivery bonuses'
      ],
      realistic: [
        'Standard project management approach',
        'Regular progress reviews',
        'Buffer for minor delays'
      ],
      pessimistic: [
        'Add 20% contingency budget',
        'Consider phased delivery',
        'Implement risk mitigation strategies',
        'Regular stakeholder communication'
      ]
    };
    return recMap[scenario] || [];
  };

  // Generate scenario estimates when base estimate changes
  React.useEffect(() => {
    if (baseEstimate) {
      setScenarios({
        optimistic: calculateScenarioEstimate('optimistic'),
        realistic: baseEstimate,
        pessimistic: calculateScenarioEstimate('pessimistic')
      });
    }
  }, [baseEstimate]);

  const scenarioColors = {
    optimistic: 'from-green-500 to-emerald-600',
    realistic: 'from-blue-500 to-indigo-600',
    pessimistic: 'from-orange-500 to-red-600'
  };

  const scenarioIcons = {
    optimistic: '🚀',
    realistic: '⚖️',
    pessimistic: '⚠️'
  };

  const scenarioLabels = {
    optimistic: 'Best Case',
    realistic: 'Most Likely',
    pessimistic: 'Worst Case'
  };

  if (!baseEstimate) {
    return (
      <div className="p-8 rounded-2xl bg-white bg-slate-800 shadow-lg text-center">
        <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Scenario Analysis</h3>
        <p className="text-gray-500 text-gray-400">
          Complete your estimate first to see scenario analysis
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{opacity:0,y:50}} 
      animate={{opacity:1,y:0}} 
      className="space-y-6"
    >
      <div className="p-8 rounded-2xl bg-white bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <FaChartLine className="text-purple-600" />
          Scenario Analysis
        </h3>
        <p className="text-gray-500 text-gray-400 mb-6">
          Explore different scenarios to understand potential project variations
        </p>

        {/* Scenario Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {Object.keys(scenarios).map((scenarioKey) => {
            const scenario = scenarios[scenarioKey];
            const isActive = activeScenario === scenarioKey;
            
            return (
              <button
                key={scenarioKey}
                onClick={() => setActiveScenario(scenarioKey)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-50 bg-indigo-900/20' 
                    : 'border-gray-200 border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{scenarioIcons[scenarioKey]}</div>
                  <div className="font-bold text-sm">{scenarioLabels[scenarioKey]}</div>
                  {scenario && (
                    <div className="text-xs text-gray-500 mt-1">
                      ${scenario.totalCost.toLocaleString()} • {scenario.timeline}w
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Details */}
        {scenarios[activeScenario] && (
          <motion.div
            key={activeScenario}
            initial={{opacity:0,x:20}}
            animate={{opacity:1,x:0}}
            className="space-y-6"
          >
            {/* Cost and Timeline Overview */}
            <div className={`p-6 rounded-xl bg-gradient-to-r ${scenarioColors[activeScenario]} text-white`}>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">
                    ${scenarios[activeScenario].totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Total Cost</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {scenarios[activeScenario].timeline} weeks
                  </div>
                  <div className="text-sm opacity-90">Timeline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {scenarios[activeScenario].confidence}%
                  </div>
                  <div className="text-sm opacity-90">Confidence</div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="p-6 bg-red-50 bg-red-900/20 rounded-xl">
              <h4 className="font-bold text-red-800 text-red-400 mb-3 flex items-center gap-2">
                <FaExclamationTriangle />
                Risk Factors
              </h4>
              <ul className="space-y-2">
                {scenarios[activeScenario].risks.map((risk, index) => (
                  <li key={index} className="text-red-700 text-red-300 text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="p-6 bg-blue-50 bg-blue-900/20 rounded-xl">
              <h4 className="font-bold text-blue-800 text-blue-400 mb-3 flex items-center gap-2">
                <FaLightbulb />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {scenarios[activeScenario].recommendations.map((rec, index) => (
                  <li key={index} className="text-blue-700 text-blue-300 text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cost Breakdown Comparison */}
            <div className="p-6 bg-gray-50 bg-slate-700 rounded-xl">
              <h4 className="font-bold mb-4">Cost Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(scenarios[activeScenario].breakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="capitalize font-medium">{category.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-indigo-600">${amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}