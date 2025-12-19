import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalculator, FaRobot, FaChartLine, FaClock, FaCheckCircle, FaArrowRight, FaArrowLeft, FaDownload, FaShare, FaUpload, FaMapMarkerAlt, FaUsers, FaCodeBranch } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EstimationForm() {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimateResult, setEstimateResult] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const projectType = watch('projectType');
  const complexity = watch('complexity');

  const onSubmit = async (data) => {
    setIsCalculating(true);
    try {
      // Simulate AI calculation with realistic pricing
      const aiEstimate = calculateAIEstimate(data);
      setEstimateResult(aiEstimate);

      // Store estimate in localStorage
      localStorage.setItem('estimate', JSON.stringify({
        ...aiEstimate,
        formData: data,
        timestamp: new Date().toISOString()
      }));

      setTimeout(() => {
        setIsCalculating(false);
        setStep(4); // Show results
      }, 3000);
    } catch (error) {
      setIsCalculating(false);
      alert('Error generating estimate. Please try again.');
    }
  };

  const calculateAIEstimate = (data) => {
    const baseRates = {
      web: { low: 15000, medium: 35000, high: 75000 },
      mobile: { low: 20000, medium: 50000, high: 100000 },
      ai: { low: 30000, medium: 80000, high: 200000 },
      ecommerce: { low: 25000, medium: 60000, high: 120000 }
    };

    const basePrice = baseRates[data.projectType]?.[data.complexity] || 30000;
    const teamMultiplier = data.teamSize * 1.2;
    const durationMultiplier = Math.max(0.8, data.duration / 12); // Normalize duration
    const techMultiplier = data.frontend && data.backend ? 1.3 : 1.1;

    const totalEstimate = Math.round(basePrice * teamMultiplier * durationMultiplier * techMultiplier);

    return {
      totalCost: totalEstimate,
      breakdown: {
        development: Math.round(totalEstimate * 0.6),
        design: Math.round(totalEstimate * 0.15),
        testing: Math.round(totalEstimate * 0.1),
        projectManagement: Math.round(totalEstimate * 0.1),
        contingency: Math.round(totalEstimate * 0.05)
      },
      timeline: Math.ceil(data.duration * 1.2), // weeks
      confidence: data.complexity === 'low' ? 95 : data.complexity === 'medium' ? 85 : 75,
      aiInsights: [
        `Based on ${data.teamSize} team members, expect ${Math.round(data.duration * 0.8)} productive weeks`,
        data.complexity === 'high' ? 'Consider phased delivery to reduce risks' : 'Standard delivery timeline recommended',
        `Market rate for similar projects: $${Math.round(totalEstimate * 0.9).toLocaleString()} - $${Math.round(totalEstimate * 1.1).toLocaleString()}`
      ]
    };
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDownloadEstimate = () => {
    const estimateData = {
      ...estimateResult,
      generatedAt: new Date().toISOString(),
      projectDetails: watch()
    };

    const dataStr = JSON.stringify(estimateData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `project-estimate-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100">
        <main className="pt-28 pb-16 max-w-4xl mx-auto px-6">
          <Breadcrumb />
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="text-center mb-8">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <FaCalculator className="text-indigo-600" />
              AI Project Estimation
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-2">Get accurate, AI-powered project estimates in minutes.</p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 4 && <div className={`w-12 h-1 ${step > stepNum ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <motion.div initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <FaRobot className="text-indigo-600" />
                  Step 1: Project Type
                </h2>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">What type of project are you planning?</span>
                    <select {...register('projectType', { required: true })} className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="">Select project type...</option>
                      <option value="web">🌐 Web Application</option>
                      <option value="mobile">📱 Mobile App</option>
                      <option value="ai">🤖 AI/ML Project</option>
                      <option value="ecommerce">🛒 E-commerce Platform</option>
                    </select>
                    {errors.projectType && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
                  </label>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="button" onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold flex items-center gap-2">
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <FaChartLine className="text-green-600" />
                  Step 2: Project Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                      <FaUsers className="text-indigo-600" />
                      Team Size
                    </span>
                    <input
                      type="number"
                      {...register('teamSize', { required: true, min: 1 })}
                      className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Number of developers"
                    />
                    {errors.teamSize && <span className="text-red-500 text-sm mt-1 block">Required, min 1</span>}
                  </label>
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Project Complexity Level</span>
                    <select {...register('complexity', { required: true })} className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="">Select complexity...</option>
                      <option value="low">🟢 Low - Basic features</option>
                      <option value="medium">🟡 Medium - Standard features</option>
                      <option value="high">🔴 High - Advanced features</option>
                    </select>
                    {errors.complexity && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
                  </label>
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                      <FaMapMarkerAlt className="text-indigo-600" />
                      Geographic Location
                    </span>
                    <input
                      type="text"
                      {...register('location')}
                      className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="City, Country (affects cost estimates)"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Estimated Duration (weeks)</span>
                    <input
                      type="number"
                      {...register('duration', { required: true, min: 1 })}
                      className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="How many weeks do you expect?"
                    />
                    {errors.duration && <span className="text-red-500 text-sm mt-1 block">Required, min 1</span>}
                  </label>
                </div>
                <div className="mt-6">
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                      <FaUpload className="text-indigo-600" />
                      Upload Documents (Optional)
                    </span>
                    <div className="mt-2">
                      <input
                        type="file"
                        {...register('documents')}
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      <p className="mt-1 text-sm text-gray-500">Upload blueprints, budgets, or project documents for more accurate estimates</p>
                    </div>
                  </label>
                </div>
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={prevStep} className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold flex items-center gap-2">
                    <FaArrowLeft /> Back
                  </button>
                  <button type="button" onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold flex items-center gap-2">
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-purple-600" />
                  Step 3: Tech Stack (Optional)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                      <FaCodeBranch className="text-indigo-600" />
                      Preferred Tech Stack
                    </span>
                    <select {...register('techStack')} className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="">Select preferred stack...</option>
                      <option value="mern">MERN (MongoDB, Express, React, Node)</option>
                      <option value="mean">MEAN (MongoDB, Express, Angular, Node)</option>
                      <option value="django">Django (Python)</option>
                      <option value="rails">Ruby on Rails</option>
                      <option value="laravel">Laravel (PHP)</option>
                      <option value="spring">Spring Boot (Java)</option>
                      <option value="serverless">Serverless (AWS Lambda, Firebase)</option>
                      <option value="other">Other/Custom</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Additional Requirements</span>
                    <textarea
                      {...register('requirements')}
                      className="mt-2 block w-full p-4 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Any specific features, integrations, or requirements..."
                      rows="3"
                    />
                  </label>
                </div>
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={prevStep} className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold flex items-center gap-2">
                    <FaArrowLeft /> Back
                  </button>
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold flex items-center gap-2">
                    {isCalculating ? (
                      <>
                        <LoadingSpinner />
                        AI Calculating...
                      </>
                    ) : (
                      <>
                        <FaRobot className="mr-2" />
                        Generate AI Estimate
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && estimateResult && (
              <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} className="space-y-6">
                {/* Results Header */}
                <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 text-white">
                  <h2 className="text-3xl font-bold mb-2">AI Estimate Complete!</h2>
                  <p className="text-xl opacity-90">Here's your personalized project estimate</p>
                </div>

                {/* Total Cost */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg text-center">
                  <h3 className="text-2xl font-bold mb-4">Total Estimated Cost</h3>
                  <div className="text-5xl font-bold text-indigo-600 mb-2">
                    ${estimateResult.totalCost.toLocaleString()}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {estimateResult.confidence}% confidence level
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FaChartLine className="text-indigo-600" />
                    Cost Breakdown
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(estimateResult.breakdown).map(([category, amount]) => (
                      <div key={category} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <span className="font-medium capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-bold text-indigo-600">${amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FaClock className="text-green-600" />
                    Project Timeline
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{estimateResult.timeline} weeks</div>
                    <p className="text-gray-600 dark:text-gray-300">Estimated completion time</p>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FaRobot className="text-purple-600" />
                    AI Insights & Recommendations
                  </h3>
                  <div className="space-y-4">
                    {estimateResult.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <FaRobot className="text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleDownloadEstimate}
                    className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Download Estimate
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaShare />
                    Get Detailed Quote
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  >
                    View Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </main>
      </div>
    </Layout>
  );
}
