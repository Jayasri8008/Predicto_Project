import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaUserTie, 
  FaCode, 
  FaPaintBrush, 
  FaCog, 
  FaChartLine,
  FaPlus,
  FaMinus,
  FaDollarSign,
  FaClock,
  FaLightbulb,
  FaCheckCircle
} from 'react-icons/fa';

export default function ResourcePlanner({ baseEstimate, onResourceUpdate }) {
  const [teamComposition, setTeamComposition] = useState([
    { role: 'Frontend Developer', count: 2, rate: 85, efficiency: 100 },
    { role: 'Backend Developer', count: 2, rate: 95, efficiency: 100 },
    { role: 'UI/UX Designer', count: 1, rate: 75, efficiency: 100 },
    { role: 'Project Manager', count: 1, rate: 100, efficiency: 100 },
    { role: 'QA Engineer', count: 1, rate: 70, efficiency: 100 }
  ]);

  const [allocationStrategy, setAllocationStrategy] = useState('balanced');
  const [optimizationGoals, setOptimizationGoals] = useState({
    cost: true,
    speed: false,
    quality: true
  });

  const roleTemplates = {
    'Frontend Developer': { icon: FaCode, color: 'blue', baseRate: 85 },
    'Backend Developer': { icon: FaCog, color: 'green', baseRate: 95 },
    'Full Stack Developer': { icon: FaCode, color: 'purple', baseRate: 90 },
    'UI/UX Designer': { icon: FaPaintBrush, color: 'pink', baseRate: 75 },
    'Project Manager': { icon: FaUserTie, color: 'indigo', baseRate: 100 },
    'QA Engineer': { icon: FaCheckCircle, color: 'yellow', baseRate: 70 },
    'DevOps Engineer': { icon: FaCog, color: 'orange', baseRate: 110 },
    'Data Scientist': { icon: FaChartLine, color: 'red', baseRate: 120 }
  };

  const calculateTotalCost = () => {
    const weeks = baseEstimate?.timeline || 16;
    return teamComposition.reduce((total, member) => {
      const efficiencyMultiplier = member.efficiency / 100;
      const effectiveWeeks = weeks / efficiencyMultiplier;
      return total + (member.count * member.rate * effectiveWeeks * 40);
    }, 0);
  };

  const calculateTeamEfficiency = () => {
    const totalRoles = teamComposition.reduce((sum, role) => sum + role.count, 0);
    const weightedEfficiency = teamComposition.reduce((sum, role) => 
      sum + (role.count * role.efficiency), 0) / totalRoles;
    return Math.round(weightedEfficiency);
  };

  const addTeamMember = (role) => {
    const existingRole = teamComposition.find(r => r.role === role);
    const template = roleTemplates[role];
    
    if (existingRole) {
      setTeamComposition(teamComposition.map(r => 
        r.role === role ? { ...r, count: r.count + 1 } : r
      ));
    } else {
      setTeamComposition([...teamComposition, {
        role,
        count: 1,
        rate: template.baseRate,
        efficiency: 100
      }]);
    }
  };

  const removeTeamMember = (index) => {
    if (teamComposition[index].count > 1) {
      setTeamComposition(teamComposition.map((r, i) => 
        i === index ? { ...r, count: r.count - 1 } : r
      ));
    } else {
      setTeamComposition(teamComposition.filter((_, i) => i !== index));
    }
  };

  const updateMemberRate = (index, newRate) => {
    setTeamComposition(teamComposition.map((r, i) => 
      i === index ? { ...r, rate: newRate } : r
    ));
  };

  const updateMemberEfficiency = (index, newEfficiency) => {
    setTeamComposition(teamComposition.map((r, i) => 
      i === index ? { ...r, efficiency: newEfficiency } : r
    ));
  };

  const optimizeTeamComposition = () => {
    const optimizationStrategies = {
      cost: () => {
        // Reduce team size, focus on senior developers
        setTeamComposition([
          { role: 'Full Stack Developer', count: 2, rate: 90, efficiency: 100 },
          { role: 'Project Manager', count: 1, rate: 100, efficiency: 100 },
          { role: 'QA Engineer', count: 1, rate: 70, efficiency: 100 }
        ]);
      },
      speed: () => {
        // Increase team size for parallel work
        setTeamComposition([
          { role: 'Frontend Developer', count: 3, rate: 85, efficiency: 100 },
          { role: 'Backend Developer', count: 3, rate: 95, efficiency: 100 },
          { role: 'UI/UX Designer', count: 2, rate: 75, efficiency: 100 },
          { role: 'Project Manager', count: 1, rate: 100, efficiency: 100 },
          { role: 'QA Engineer', count: 2, rate: 70, efficiency: 100 },
          { role: 'DevOps Engineer', count: 1, rate: 110, efficiency: 100 }
        ]);
      },
      quality: () => {
        // Include senior roles and specialists
        setTeamComposition([
          { role: 'Frontend Developer', count: 2, rate: 95, efficiency: 100 },
          { role: 'Backend Developer', count: 2, rate: 105, efficiency: 100 },
          { role: 'UI/UX Designer', count: 2, rate: 85, efficiency: 100 },
          { role: 'Project Manager', count: 1, rate: 100, efficiency: 100 },
          { role: 'QA Engineer', count: 2, rate: 80, efficiency: 100 },
          { role: 'DevOps Engineer', count: 1, rate: 110, efficiency: 100 }
        ]);
      }
    };

    if (optimizationGoals.cost) optimizationStrategies.cost();
    else if (optimizationGoals.speed) optimizationStrategies.speed();
    else if (optimizationGoals.quality) optimizationStrategies.quality();
  };

  const getOptimizationSuggestions = () => {
    const totalCost = calculateTotalCost();
    const baseCost = baseEstimate?.totalCost || 0;
    const costDifference = ((totalCost - baseCost) / baseCost) * 100;

    const suggestions = [];

    if (costDifference > 20) {
      suggestions.push({
        type: 'cost',
        message: 'Consider reducing team size or using more junior developers to reduce costs by ~20%',
        impact: 'High'
      });
    }

    if (costDifference < -10) {
      suggestions.push({
        type: 'investment',
        message: 'Your team investment is below market rate. Consider adding specialists for better quality.',
        impact: 'Medium'
      });
    }

    if (calculateTeamEfficiency() < 80) {
      suggestions.push({
        type: 'efficiency',
        message: 'Team efficiency is low. Consider role specialization or better resource allocation.',
        impact: 'High'
      });
    }

    return suggestions;
  };

  const totalCost = calculateTotalCost();
  const teamEfficiency = calculateTeamEfficiency();
  const suggestions = getOptimizationSuggestions();

  return (
    <motion.div 
      initial={{opacity:0,y:50}} 
      animate={{opacity:1,y:0}} 
      className="space-y-6"
    >
      <div className="p-8 rounded-2xl bg-white bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <FaUsers className="text-indigo-600" />
          Resource Planning & Optimization
        </h3>
        <p className="text-gray-500 text-gray-400 mb-6">
          Optimize your team composition and resource allocation for better project outcomes
        </p>

        {/* Team Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 bg-blue-900/20 rounded-lg">
            <div className="text-center">
              <FaUsers className="text-blue-600 text-2xl mx-auto mb-2" />
              <div className="text-xl font-bold">
                {teamComposition.reduce((sum, role) => sum + role.count, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Team Size</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 bg-green-900/20 rounded-lg">
            <div className="text-center">
              <FaDollarSign className="text-green-600 text-2xl mx-auto mb-2" />
              <div className="text-xl font-bold">
                ${totalCost.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 bg-purple-900/20 rounded-lg">
            <div className="text-center">
              <FaClock className="text-purple-600 text-2xl mx-auto mb-2" />
              <div className="text-xl font-bold">{teamEfficiency}%</div>
              <div className="text-sm text-gray-600">Team Efficiency</div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 bg-orange-900/20 rounded-lg">
            <div className="text-center">
              <FaChartLine className="text-orange-600 text-2xl mx-auto mb-2" />
              <div className="text-xl font-bold">
                {baseEstimate ? Math.round((totalCost / baseEstimate.totalCost) * 100) : 100}%
              </div>
              <div className="text-sm text-gray-600">vs Base Estimate</div>
            </div>
          </div>
        </div>

        {/* Optimization Goals */}
        <div className="p-6 bg-gray-50 bg-slate-700 rounded-xl mb-6">
          <h4 className="font-bold mb-4">Optimization Goals</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={optimizationGoals.cost}
                onChange={(e) => setOptimizationGoals({...optimizationGoals, cost: e.target.checked})}
                className="rounded"
              />
              <FaDollarSign className="text-green-600" />
              <span>Cost Optimization</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={optimizationGoals.speed}
                onChange={(e) => setOptimizationGoals({...optimizationGoals, speed: e.target.checked})}
                className="rounded"
              />
              <FaClock className="text-blue-600" />
              <span>Speed Optimization</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={optimizationGoals.quality}
                onChange={(e) => setOptimizationGoals({...optimizationGoals, quality: e.target.checked})}
                className="rounded"
              />
              <FaCheckCircle className="text-purple-600" />
              <span>Quality Focus</span>
            </label>
          </div>
          <button
            onClick={optimizeTeamComposition}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Optimize Team Composition
          </button>
        </div>

        {/* Team Members */}
        <div className="space-y-4">
          <h4 className="font-bold">Current Team Composition</h4>
          {teamComposition.map((member, index) => {
            const template = roleTemplates[member.role];
            const Icon = template.icon;
            
            return (
              <motion.div 
                key={member.role}
                initial={{opacity:0,x:-20}}
                animate={{opacity:1,x:0}}
                className="p-4 border border-gray-200 border-gray-700 rounded-lg"
              >
                <div className="grid md:grid-cols-6 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <Icon className={`text-${template.color}-600`} />
                    <div>
                      <div className="font-medium">{member.role}</div>
                      <div className="text-sm text-gray-500">${member.rate}/hr</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center">{member.count}</span>
                    <button
                      onClick={() => addTeamMember(member.role)}
                      className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Rate ($/hr)</label>
                    <input
                      type="number"
                      value={member.rate}
                      onChange={(e) => updateMemberRate(index, parseInt(e.target.value))}
                      className="w-full p-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Efficiency (%)</label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={member.efficiency}
                      onChange={(e) => updateMemberEfficiency(index, parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-xs text-center">{member.efficiency}%</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">${(member.count * member.rate * (baseEstimate?.timeline || 16) * 40).toLocaleString()}</div>
                    <div className="text-gray-500">Total Cost</div>
                  </div>
                  <div className="text-right">
                    <button className="text-red-500 hover:text-red-700 text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add New Role */}
        <div className="mt-6">
          <h4 className="font-bold mb-3">Add Team Members</h4>
          <div className="grid md:grid-cols-4 gap-3">
            {Object.keys(roleTemplates).map(role => {
              if (teamComposition.find(m => m.role === role)) return null;
              const template = roleTemplates[role];
              const Icon = template.icon;
              
              return (
                <button
                  key={role}
                  onClick={() => addTeamMember(role)}
                  className="p-3 border border-gray-200 border-gray-700 rounded-lg hover:border-indigo-300 transition-colors text-left"
                >
                  <Icon className={`text-${template.color}-600 mb-2`} />
                  <div className="text-sm font-medium">{role}</div>
                  <div className="text-xs text-gray-500">${template.baseRate}/hr</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-6 p-6 bg-yellow-50 bg-yellow-900/20 rounded-xl">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <FaLightbulb className="text-yellow-600" />
              Optimization Suggestions
            </h4>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white bg-slate-800 rounded-lg">
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    suggestion.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {suggestion.impact}
                  </div>
                  <div className="text-sm">{suggestion.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}