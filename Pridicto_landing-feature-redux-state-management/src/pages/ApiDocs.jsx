import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Code } from 'lucide-react';
import Footer from '../components/Footer';

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/v1/projects/estimate',
    description: 'Get AI-powered project estimation',
    params: [
      { name: 'title', type: 'string', required: true, description: 'Project title' },
      { name: 'description', type: 'string', required: true, description: 'Detailed project description' },
      { name: 'technologies', type: 'array', required: true, description: 'Technologies to be used' },
      { name: 'teamSize', type: 'number', required: true, description: 'Expected team size' },
      { name: 'complexity', type: 'string', required: false, description: 'Project complexity (low, medium, high)' }
    ],
    response: {
      estimatedDays: 45,
      estimatedCost: 125000,
      confidence: '0.87',
      riskFactors: ['Technology adoption', 'Team experience'],
      timeline: '2024-03-15'
    },
    example: `curl -X POST https://api.predicto.ai/v1/projects/estimate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Mobile App Development",
    "description": "Build an iOS and Android app for fitness tracking",
    "technologies": ["React Native", "Firebase", "Redux"],
    "teamSize": 4,
    "complexity": "high"
  }'`
  },
  {
    method: 'GET',
    endpoint: '/api/v1/projects/:id',
    description: 'Get project details and historical estimates',
    params: [
      { name: 'id', type: 'string', required: true, description: 'Project ID' }
    ],
    response: {
      id: 'proj_123',
      title: 'Mobile App Development',
      estimatedDays: 45,
      actualDays: 42,
      status: 'completed',
      accuracy: '93%'
    },
    example: `curl https://api.predicto.ai/v1/projects/proj_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'POST',
    endpoint: '/api/v1/projects/:id/feedback',
    description: 'Submit actual project data for model improvement',
    params: [
      { name: 'id', type: 'string', required: true, description: 'Project ID' },
      { name: 'actualDays', type: 'number', required: true, description: 'Actual days taken' },
      { name: 'actualCost', type: 'number', required: true, description: 'Actual cost incurred' },
      { name: 'notes', type: 'string', required: false, description: 'Additional notes' }
    ],
    response: {
      success: true,
      message: 'Feedback recorded successfully'
    },
    example: `curl -X POST https://api.predicto.ai/v1/projects/proj_123/feedback \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "actualDays": 42,
    "actualCost": 115000,
    "notes": "Slightly faster due to team experience"
  }'`
  },
  {
    method: 'GET',
    endpoint: '/api/v1/analytics/team-performance',
    description: 'Get team performance analytics',
    params: [
      { name: 'teamId', type: 'string', required: true, description: 'Team ID' },
      { name: 'period', type: 'string', required: false, description: 'Period (week, month, year)' }
    ],
    response: {
      teamId: 'team_456',
      estimationAccuracy: '87%',
      averageVelocity: 35,
      completedProjects: 12,
      totalCostSavings: 450000
    },
    example: `curl https://api.predicto.ai/v1/analytics/team-performance?teamId=team_456&period=month \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'GET',
    endpoint: '/api/v1/health',
    description: 'Check API health status',
    params: [],
    response: {
      status: 'healthy',
      version: '1.0.0',
      timestamp: '2024-01-15T10:30:00Z'
    },
    example: `curl https://api.predicto.ai/v1/health`
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <pre className="p-4 overflow-x-auto text-sm text-gray-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ApiDocs() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Build intelligent project estimation into your applications with our powerful REST API
            </p>
            <div className="inline-block px-6 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
              v1.0 • BASE URL: https://api.predicto.ai
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Authentication */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8">Authentication</h2>
          <div className="bg-white bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700">
            <p className="text-gray-700 text-gray-300 mb-4">
              All API requests require authentication using a Bearer token. Include your API key in the Authorization header:
            </p>
            <CodeBlock code={`Authorization: Bearer YOUR_API_KEY`} />
            <p className="text-gray-700 text-gray-300 mt-4">
              <strong>Get your API key:</strong> Go to <Link to="/dashboard/settings" className="text-brand-600 text-accent-400 hover:underline">Account Settings</Link> and generate a new API key
            </p>
          </div>
        </motion.section>

        {/* Rate Limiting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8">Rate Limiting</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: 'Starter', limit: '100', period: '/month' },
              { tier: 'Professional', limit: '10,000', period: '/month' },
              { tier: 'Enterprise', limit: 'Unlimited', period: '' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 bg-white bg-gray-800 rounded-xl border-2 border-gray-200 border-gray-700"
              >
                <h3 className="font-bold text-gray-900 text-white mb-2">{item.tier}</h3>
                <p className="text-3xl font-bold text-brand-600 text-accent-400 mb-1">
                  {item.limit}
                </p>
                <p className="text-sm text-gray-600 text-gray-400">{item.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Endpoints */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8">API Endpoints</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Endpoints List */}
            <motion.div
              className="lg:col-span-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {apiEndpoints.map((endpoint, i) => (
                <motion.button
                  key={i}
                  variants={itemVariants}
                  onClick={() => setSelectedEndpoint(i)}
                  className={`w-full text-left p-4 rounded-lg mb-3 transition-all border-2 ${
                    selectedEndpoint === i
                      ? 'bg-brand-50 bg-brand-900/20 border-brand-500 border-accent-400'
                      : 'bg-white bg-gray-800 border-gray-200 border-gray-700 hover:border-brand-300 hover:border-accent-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                      endpoint.method === 'GET' ? 'bg-blue-100 bg-blue-900/30 text-blue-700 text-blue-300' :
                      endpoint.method === 'POST' ? 'bg-green-100 bg-green-900/30 text-green-700 text-green-300' :
                      'bg-orange-100 bg-orange-900/30 text-orange-700 text-orange-300'
                    }`}>
                      {endpoint.method}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 text-white truncate">{endpoint.endpoint}</p>
                      <p className="text-xs text-gray-600 text-gray-400 mt-1 line-clamp-2">{endpoint.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Endpoint Details */}
            <motion.div
              className="lg:col-span-2"
              key={selectedEndpoint}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {apiEndpoints.length > selectedEndpoint && (
                <div className="space-y-6">
                  <div className="bg-white bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className={`text-sm font-bold px-3 py-1 rounded ${
                        apiEndpoints[selectedEndpoint].method === 'GET' ? 'bg-blue-100 bg-blue-900/30 text-blue-700 text-blue-300' :
                        apiEndpoints[selectedEndpoint].method === 'POST' ? 'bg-green-100 bg-green-900/30 text-green-700 text-green-300' :
                        'bg-orange-100 bg-orange-900/30 text-orange-700 text-orange-300'
                      }`}>
                        {apiEndpoints[selectedEndpoint].method}
                      </span>
                      <p className="font-mono text-brand-600 text-accent-400 font-semibold break-all">
                        {apiEndpoints[selectedEndpoint].endpoint}
                      </p>
                    </div>

                    <p className="text-gray-700 text-gray-300 mb-6">{apiEndpoints[selectedEndpoint].description}</p>

                    {apiEndpoints[selectedEndpoint].params.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 text-white mb-3">Parameters</h4>
                        <div className="space-y-3">
                          {apiEndpoints[selectedEndpoint].params.map((param, i) => (
                            <div key={i} className="p-3 bg-gray-50 bg-gray-700 rounded-lg">
                              <div className="flex items-center gap-3 mb-1">
                                <code className="text-sm font-semibold text-brand-600 text-accent-400">
                                  {param.name}
                                </code>
                                <span className="text-xs bg-gray-200 bg-gray-600 px-2 py-1 rounded text-gray-700 text-gray-300">
                                  {param.type}
                                </span>
                                {param.required && (
                                  <span className="text-xs bg-red-100 bg-red-900/30 text-red-700 text-red-300 px-2 py-1 rounded">
                                    Required
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 text-gray-400">{param.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 text-white mb-3">Example Response</h4>
                      <CodeBlock code={JSON.stringify(apiEndpoints[selectedEndpoint].response, null, 2)} language="json" />
                    </div>
                  </div>

                  <div className="bg-white bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700">
                    <h4 className="font-semibold text-gray-900 text-white mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5" /> Example Request
                    </h4>
                    <CodeBlock code={apiEndpoints[selectedEndpoint].example} />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* SDK Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8">SDK Examples</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                language: 'JavaScript',
                code: `const predicto = new PredictAI('YOUR_API_KEY');

const estimate = await predicto.projects.estimate({
  title: 'Mobile App Development',
  description: 'Build an iOS and Android app',
  technologies: ['React Native', 'Firebase'],
  teamSize: 4,
  complexity: 'high'
});

console.log(\`Estimated: \${estimate.estimatedDays} days\`);`
              },
              {
                language: 'Python',
                code: `from predicto import PredictAI

client = PredictAI('YOUR_API_KEY')

estimate = client.projects.estimate(
  title='Mobile App Development',
  description='Build an iOS and Android app',
  technologies=['React Native', 'Firebase'],
  team_size=4,
  complexity='high'
)

print(f"Estimated: {estimate['estimatedDays']} days")`
              }
            ].map((sdk, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 border-gray-700"
              >
                <h3 className="font-bold text-gray-900 text-white mb-4">{sdk.language}</h3>
                <CodeBlock code={sdk.code} language={sdk.language.toLowerCase()} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Error Handling */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8">Error Handling</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { code: 400, message: 'Bad Request', description: 'Invalid parameters or missing required fields' },
              { code: 401, message: 'Unauthorized', description: 'Invalid or missing API key' },
              { code: 403, message: 'Forbidden', description: 'Rate limit exceeded' },
              { code: 500, message: 'Server Error', description: 'Internal server error' }
            ].map((error, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="p-6 bg-white bg-gray-800 rounded-xl border-2 border-gray-200 border-gray-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-red-600">{error.code}</span>
                  <span className="font-semibold text-gray-900 text-white">{error.message}</span>
                </div>
                <p className="text-sm text-gray-600 text-gray-400">{error.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 px-8 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 from-brand-900 via-brand-800 to-accent-800 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Integrate?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get started with our API in minutes. Visit our developer portal for more details and support.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Get API Key <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/predicto-ai/sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              GitHub SDK
            </a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
