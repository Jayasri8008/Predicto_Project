import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { TrendingUp, Clock, DollarSign, Users, ArrowLeft, Check } from 'lucide-react';
import Footer from '../components/Footer';

const caseStudies = [
  {
    id: 1,
    title: 'TechStart: 60% Faster Project Planning',
    company: 'TechStart Inc.',
    website: 'techstart.io',
    industry: 'SaaS',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    challenge: `TechStart was struggling with manual project estimation processes. Their teams were consistently over-promising on timelines and under-estimating costs, resulting in:
    
    • 40% project overruns on average
    • Missed deadlines causing client dissatisfaction
    • Budget overruns of 25-35% per project
    • Unable to accurately forecast resource needs
    • Team burnout from scope creep and unmet expectations`,
    solution: `We implemented Predicto AI across their organization:
    
    1. Data Integration: Connected project history, team capacity, and resource data
    2. ML Model Training: Built custom models based on TechStart's past projects
    3. Team Training: Trained 45 team members on best practices
    4. Workflow Integration: Integrated Predicto into their daily project planning
    5. Continuous Optimization: Refined models based on real results`,
    implementation: {
      timeline: '8 weeks',
      teamSize: '45 engineers across 3 teams',
      projectsAnalyzed: '120+ historical projects',
      dataPoints: '50,000+ estimation parameters'
    },
    results: {
      timeReduction: '60% faster planning',
      accuracyImprovement: '85% estimation accuracy',
      costSavings: '$500K annual savings',
      teamProductivity: '45% productivity increase',
      clientSatisfaction: '92% on-time delivery rate'
    },
    metrics: [
      { label: 'Planning Time Reduced', value: '60%', icon: Clock, before: '4 days', after: '1.6 days' },
      { label: 'Accuracy Improvement', value: '85%', icon: TrendingUp, before: '45%', after: '85%' },
      { label: 'Cost Savings (Annual)', value: '$500K', icon: DollarSign, before: '28% overruns', after: '5% avg overage' },
      { label: 'Team Productivity', value: '+45%', icon: Users, before: '55% on estimation', after: '30% on estimation' }
    ],
    beforeAfter: [
      {
        category: 'Estimation Accuracy',
        before: '45%',
        after: '85%',
        improvement: '+89%'
      },
      {
        category: 'On-Time Delivery',
        before: '58%',
        after: '92%',
        improvement: '+59%'
      },
      {
        category: 'Budget Overruns',
        before: '31% avg',
        after: '5% avg',
        improvement: '-84%'
      },
      {
        category: 'Planning Efficiency',
        before: '4 days/project',
        after: '1.6 days/project',
        improvement: '-60%'
      }
    ],
    testimonial: {
      quote: 'Predicto AI transformed how we manage projects. We went from guessing estimates to data-driven predictions. Now we can confidently commit to timelines because we know what we can deliver. The $500K savings in the first year alone was incredible.',
      author: 'Sarah Chen',
      role: 'VP of Engineering',
      company: 'TechStart Inc.'
    },
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Jira', 'Slack'],
    keyBenefits: [
      'Accurate project timelines from day one',
      'Better resource allocation and planning',
      'Improved client satisfaction and retention',
      'Reduced team stress and burnout',
      'Data-driven decision making',
      'Continuous improvement through ML'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'Digital Ventures: 3x ROI in 6 Months',
    company: 'Digital Ventures Ltd.',
    website: 'digitalventures.com',
    industry: 'Digital Agency',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db75?w=800&h=400&fit=crop',
    challenge: `Digital Ventures was a fast-growing digital agency facing growth pains:
    
    • Client dissatisfaction with unrealistic timelines
    • Frequent budget overruns straining profitability
    • Inability to accurately price projects
    • Lost business to competitors with better estimates
    • Team confidence eroded by failed commitments`,
    solution: `Strategic implementation across the agency:
    
    1. Historical Data Analysis: Analyzed 200+ completed projects
    2. Predictive Modeling: Built industry-specific models
    3. Pricing Integration: Connected to pricing proposals
    4. Client Portal: Provided transparency to clients
    5. Continuous Learning: Monthly model refinements`,
    implementation: {
      timeline: '6 weeks',
      teamSize: '30 project managers and team leads',
      projectsAnalyzed: '200+ completed projects',
      dataPoints: '35,000+ project parameters'
    },
    results: {
      timeReduction: '50% faster delivery',
      accuracyImprovement: '90% on-time delivery',
      costSavings: '$250K savings',
      teamProductivity: '35% efficiency gain',
      clientRetention: '94% retention rate'
    },
    metrics: [
      { label: 'Faster Delivery', value: '50%', icon: Clock, before: '3 weeks', after: '1.5 weeks' },
      { label: 'On-Time Rate', value: '90%', icon: TrendingUp, before: '62%', after: '90%' },
      { label: 'Saved Budget', value: '$250K', icon: DollarSign, before: '22% overruns', after: '8% avg overage' },
      { label: 'Efficiency Gain', value: '+35%', icon: Users, before: '60% management', after: '39% management' }
    ],
    beforeAfter: [
      {
        category: 'On-Time Delivery',
        before: '62%',
        after: '90%',
        improvement: '+45%'
      },
      {
        category: 'Project Profitability',
        before: '14% margin',
        after: '22% margin',
        improvement: '+57%'
      },
      {
        category: 'Client Satisfaction',
        before: '7.2/10',
        after: '9.1/10',
        improvement: '+26%'
      },
      {
        category: 'Sales Cycle',
        before: '2 weeks estimate',
        after: '2 days estimate',
        improvement: '-86%'
      }
    ],
    testimonial: {
      quote: 'Our clients are much happier now that we can deliver projects on time and on budget consistently. The confidence boost from having accurate estimates has been transformational for our sales team.',
      author: 'Marcus Rodriguez',
      role: 'CEO',
      company: 'Digital Ventures Ltd.'
    },
    techStack: ['Angular', 'Spring Boot', 'MySQL', 'Kubernetes', 'GCP', 'Asana', 'Teams'],
    keyBenefits: [
      'Competitive pricing advantage',
      'Faster sales cycles',
      'Higher profit margins',
      'Better client relationships',
      'Team morale improvement',
      'Scalable estimation process'
    ],
    featured: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CaseStudyDetail() {
  const { id } = useParams();
  const caseStudy = caseStudies.find(cs => cs.id === parseInt(id));

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 from-gray-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 text-white mb-4">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-brand-600 text-accent-400 hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      {/* Header */}
      <section className="relative py-12 bg-white bg-gray-800 border-b-2 border-gray-200 border-gray-700">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-brand-600 text-accent-400 hover:gap-3 transition-all mb-6 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-3 py-1 bg-brand-100 bg-brand-900/30 text-brand-700 text-brand-300 text-sm font-semibold rounded-full mb-4">
              {caseStudy.industry}
            </span>
            <h1 className="text-5xl font-bold text-gray-900 text-white mb-4">{caseStudy.title}</h1>
            <p className="text-xl text-gray-600 text-gray-300 mb-2">{caseStudy.company}</p>
            <p className="text-gray-500 text-gray-400">www.{caseStudy.website}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl overflow-hidden mb-16 shadow-xl border-2 border-gray-200 border-gray-700"
        >
          <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-96 object-cover" />
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {caseStudy.metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 border-2 border-brand-200 border-brand-700"
              >
                <Icon className="w-8 h-8 text-brand-600 text-accent-400 mb-3" />
                <p className="text-3xl font-bold text-gray-900 text-white">{metric.value}</p>
                <p className="text-sm text-gray-700 text-gray-300 font-semibold mt-2">{metric.label}</p>
                <div className="mt-3 text-xs text-gray-600 text-gray-400 space-y-1">
                  <p><span className="font-semibold">Before:</span> {metric.before}</p>
                  <p><span className="font-semibold">After:</span> {metric.after}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Challenge & Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-white bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">The Challenge</h2>
            <p className="text-gray-700 text-gray-300 whitespace-pre-line text-sm leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="bg-white bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">Our Solution</h2>
            <p className="text-gray-700 text-gray-300 whitespace-pre-line text-sm leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </motion.div>

        {/* Implementation Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 p-8 rounded-2xl border-2 border-brand-200 border-brand-700 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-white mb-6">Implementation</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.entries(caseStudy.implementation).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-600 text-gray-400 uppercase tracking-wide font-semibold mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-2xl font-bold text-brand-600 text-accent-400">{value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Before & After Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8 text-center">Before & After</h2>
          
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudy.beforeAfter.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border-2 border-gray-200 border-gray-700 rounded-xl overflow-hidden bg-white bg-gray-800"
              >
                <div className="grid grid-cols-3">
                  <div className="p-4 border-r-2 border-gray-200 border-gray-700">
                    <p className="text-xs text-gray-600 text-gray-400 uppercase tracking-wider font-semibold mb-2">Before</p>
                    <p className="text-2xl font-bold text-gray-600 text-gray-400">{item.before}</p>
                  </div>
                  <div className="p-4 border-r-2 border-gray-200 border-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-6 h-6 text-accent-500 mb-2 mx-auto" />
                      <p className="text-xs font-bold text-accent-600 text-accent-400">{item.improvement}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20">
                    <p className="text-xs text-gray-600 text-gray-400 uppercase tracking-wider font-semibold mb-2">After</p>
                    <p className="text-2xl font-bold text-brand-600 text-accent-400">{item.after}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 bg-gray-700/50">
                  <p className="text-sm font-semibold text-gray-700 text-gray-300">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-600 to-accent-500 from-brand-900 to-accent-900 p-12 rounded-2xl text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-white/5 rounded-full" />
          
          <div className="relative z-10">
            <p className="text-2xl italic font-light mb-6">"{caseStudy.testimonial.quote}"</p>
            <div>
              <p className="font-bold text-lg">{caseStudy.testimonial.author}</p>
              <p className="text-white/80">{caseStudy.testimonial.role}, {caseStudy.testimonial.company}</p>
            </div>
          </div>
        </motion.section>

        {/* Key Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-8 text-center">Key Benefits Realized</h2>
          
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudy.keyBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 rounded-lg bg-white bg-gray-800 border-2 border-gray-200 border-gray-700 hover:border-brand-500 hover:border-accent-400 transition-colors"
              >
                <Check className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-gray-300 font-semibold">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Tech Stack */}
        {caseStudy.techStack && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700 mb-16"
          >
            <h3 className="text-xl font-bold text-gray-900 text-white mb-6">Technology Stack</h3>
            <div className="flex flex-wrap gap-3">
              {caseStudy.techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-brand-100 bg-brand-900/30 text-brand-700 text-brand-300 rounded-full font-semibold text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 px-8 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 from-brand-900 via-brand-800 to-accent-800 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready for Similar Success?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            See how Predicto AI can help your organization achieve similar results.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/estimate"
              className="px-8 py-3 bg-white text-brand-600 font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/case-studies"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              View More Cases
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
