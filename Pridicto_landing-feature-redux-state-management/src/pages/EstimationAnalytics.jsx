import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { 
  FaChartLine, 
  FaCalculator, 
  FaBuilding, 
  FaTools, 
  FaDollarSign,
  FaUsers,
  FaShieldAlt,
  FaFileAlt,
  FaProjectDiagram,
  FaCode,
  FaLeaf,
  FaPlug,
  FaTasks,
  FaBalanceScale,
  FaArrowRight,
  FaStar,
  FaRocket,
  FaGlobe,
  FaHandshake,
  FaChalkboardTeacher,
  FaWrench
} from 'react-icons/fa';

export default function EstimationAnalytics() {
  const serviceCategories = [
    {
      id: 'consulting',
      title: 'Business Consulting',
      icon: FaHandshake,
      color: 'indigo',
      description: 'Professional business planning and consulting services',
      services: [
        {
          icon: FaFileAlt,
          title: 'Business Plan Writing',
          description: 'Professional investor-ready plans with 5-year projections',
          pricing: 'Starting at $500',
          features: ['5-year financial projections', 'Market analysis', 'Executive summary', 'Investor presentation']
        },
        {
          icon: FaChartLine,
          title: 'Pitch Deck Creation',
          description: '10–15 slide presentations designed to impress investors',
          pricing: 'Starting at $800',
          features: ['Custom visuals', 'Storytelling structure', 'Investor-focused content', 'Multiple revisions']
        },
        {
          icon: FaDollarSign,
          title: 'Financial Modelling',
          description: 'Custom Excel/Google Sheet based financial forecasts',
          pricing: 'Starting at $600',
          features: ['P&L statements', 'Cash flow analysis', 'Scenario modeling', 'Excel/Google Sheets']
        },
        {
          icon: FaGlobe,
          title: 'Market Research & Feasibility',
          description: 'In-depth desktop and primary research',
          pricing: 'Starting at $700',
          features: ['SWOT analysis', 'Competitive benchmarking', 'Primary research', 'Feasibility reports']
        }
      ]
    },
    {
      id: 'estimation',
      title: 'Project Estimation',
      icon: FaCalculator,
      color: 'blue',
      description: 'Comprehensive project cost and feasibility analysis',
      services: [
        {
          icon: FaBuilding,
          title: 'Construction Cost Estimation',
          description: 'Accurate estimation for residential, commercial, and infrastructure',
          pricing: 'Starting at $1,200',
          features: ['AI-driven estimates', 'Real-time pricing', 'Material breakdowns', 'Infrastructure focus']
        },
        {
          icon: FaTools,
          title: 'Material & Labor Estimation',
          description: 'Auto-generate detailed breakdowns of requirements',
          pricing: 'Starting at $800',
          features: ['Material breakdowns', 'Labor requirements', 'Equipment estimates', 'Scale-based calculations']
        },
        {
          icon: FaProjectDiagram,
          title: 'Feasibility Analysis',
          description: 'End-to-end project viability assessment',
          pricing: 'Starting at $1,100',
          features: ['Technical feasibility', 'Economic analysis', 'Financial viability', 'Comprehensive reports']
        },
        {
          icon: FaCode,
          title: 'Software Development Estimation',
          description: 'Detailed cost/time estimates for web/apps',
          pricing: 'Starting at $1,000',
          features: ['Tech stack analysis', 'Scalability assessments', 'Code complexity analysis', 'AI recommendations']
        },
        {
          icon: FaLeaf,
          title: 'Sustainability Analysis',
          description: 'Eco-friendly assessments for construction projects',
          pricing: 'Starting at $900',
          features: ['Carbon footprint analysis', 'Green certification support', 'Sustainable materials', 'Compliance checks']
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Tools & Integration',
      icon: FaTools,
      color: 'purple',
      description: 'Professional tools and consulting for project management',
      services: [
        {
          icon: FaShieldAlt,
          title: 'Risk Management & Mitigation',
          description: 'AI-driven recommendations and contingency strategies',
          pricing: 'Starting at $800',
          features: ['Risk scoring', 'Mitigation plans', 'AI recommendations', 'Contingency strategies']
        },
        {
          icon: FaTasks,
          title: 'Project Management Consulting',
          description: 'End-to-end PM support with Agile/Scrum setup',
          pricing: 'Starting at $1,500',
          features: ['Agile/Scrum setup', 'Resource allocation', 'Milestone tracking', 'Workflow automation']
        },
        {
          icon: FaPlug,
          title: 'Integration with Project Tools',
          description: 'Connect to Jira, Trello, Asana for seamless workflows',
          pricing: 'Starting at $600',
          features: ['Jira/Trello/Asana integration', 'Data syncing', 'Seamless workflows', 'API connections']
        },
        {
          icon: FaBalanceScale,
          title: 'Global Compliance & Legal Review',
          description: 'Ensure projects meet international standards',
          pricing: 'Starting at $1,200',
          features: ['Regulatory audits', 'Legal templates', 'International standards', 'Compliance checks']
        },
        {
          icon: FaChalkboardTeacher,
          title: 'Training & Workshops',
          description: 'Online/offline sessions on estimation best practices',
          pricing: 'Starting at $300 per session',
          features: ['Interactive modules', 'Best practices training', 'AI tool workshops', 'Certification options']
        },
        {
          icon: FaWrench,
          title: 'Ongoing Support & Maintenance',
          description: 'Post-project monitoring and performance optimization',
          pricing: 'Starting at $400/month',
          features: ['24/7 support', 'Performance monitoring', 'Issue tracking', 'Optimization updates']
        }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      indigo: 'from-indigo-500 to-indigo-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-100 from-slate-900 via-slate-800 to-slate-900">
        <main className="pt-28 pb-16 max-w-7xl mx-auto px-6">
          <Breadcrumb />
          
          {/* Header */}
          <motion.div 
            initial={{opacity:0,y:30}} 
            animate={{opacity:1,y:0}} 
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Professional Estimation Services
            </h1>
            <p className="text-2xl text-gray-600 text-gray-300 max-w-4xl mx-auto mb-8">
              Comprehensive business consulting, project estimation, and advanced tools 
              for professionals who demand accuracy and reliability.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/enhanced-estimate"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaCalculator />
                Start Professional Estimation
                <FaArrowRight />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaStar />
                View All Services
              </Link>
            </div>
          </motion.div>

          {/* Service Categories */}
          {serviceCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.id}
              initial={{opacity:0,y:50}}
              animate={{opacity:1,y:0}}
              transition={{delay: categoryIndex * 0.2}}
              className="mb-20"
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${getColorClasses(category.color)} flex items-center justify-center mb-6 shadow-lg`}>
                  <category.icon className="text-white text-3xl" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 text-gray-100 mb-4">
                  {category.title}
                </h2>
                <p className="text-xl text-gray-600 text-gray-300 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {category.services.map((service, serviceIndex) => {
                  const Icon = service.icon;
                  
                  return (
                    <motion.div
                      key={service.title}
                      initial={{opacity:0,y:30}}
                      animate={{opacity:1,y:0}}
                      transition={{delay: (categoryIndex * 0.2) + (serviceIndex * 0.1)}}
                      className="p-8 bg-white bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 border-gray-700 group"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getColorClasses(category.color)} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="text-white text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 text-gray-100 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 text-gray-300 mb-3 leading-relaxed">
                            {service.description}
                          </p>
                          <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getColorClasses(category.color)} text-white font-semibold`}>
                            {service.pricing}
                          </div>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getColorClasses(category.color)}`}></div>
                            <span className="text-gray-600 text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <Link
                        to="/contact"
                        className={`w-full px-6 py-3 bg-gradient-to-r ${getColorClasses(category.color)} text-white rounded-lg hover:shadow-lg transition-all duration-300 text-center font-medium flex items-center justify-center gap-2 group-hover:scale-105`}
                      >
                        <FaRocket />
                        Get Professional Quote
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}

          {/* Features Highlight */}
          <motion.div
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{delay: 0.8}}
            className="p-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-2xl text-white mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Predicto.ai?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-90">Client Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Industry Applications */}
          <motion.div
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{delay: 1.0}}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="p-8 bg-white bg-slate-800 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <FaBuilding className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Construction & Infrastructure</h3>
              <p className="text-gray-600 text-gray-300">
                Comprehensive construction cost estimation, material planning, and feasibility analysis for projects of all scales.
              </p>
            </div>
            
            <div className="p-8 bg-white bg-slate-800 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                <FaCode className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Software Development</h3>
              <p className="text-gray-600 text-gray-300">
                Technology stack analysis, development cost estimation, and project timeline planning for software initiatives.
              </p>
            </div>
            
            <div className="p-8 bg-white bg-slate-800 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <FaHandshake className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Business Consulting</h3>
              <p className="text-gray-600 text-gray-300">
                Strategic business planning, financial modeling, and market research for startups and established businesses.
              </p>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{delay: 1.2}}
            className="text-center p-12 bg-gray-50 bg-slate-800 rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-600 text-gray-300 mb-8 max-w-2xl mx-auto">
              Get professional estimation and consulting services tailored to your specific industry and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/enhanced-estimate"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaCalculator />
                Start Professional Estimation
                <FaStar />
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}