import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, DollarSign, Users, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const caseStudies = [
  {
    id: 1,
    title: 'TechStart: 60% Faster Project Planning',
    company: 'TechStart Inc.',
    industry: 'SaaS',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    challenge: 'Manual estimation causing 40% project overruns and missed deadlines',
    solution: 'Implemented Predicto AI for automated cost and timeline prediction',
    results: {
      timeReduction: '60% faster planning',
      accuracyImprovement: '85% estimation accuracy',
      costSavings: '$500K annual savings',
      teamProductivity: '45% productivity increase'
    },
    metrics: [
      { label: 'Planning Time Reduced', value: '60%', icon: Clock },
      { label: 'Accuracy Improvement', value: '85%', icon: TrendingUp },
      { label: 'Cost Savings (Annual)', value: '$500K', icon: DollarSign },
      { label: 'Team Productivity', value: '+45%', icon: Users }
    ],
    testimonial: {
      quote: 'Predicto AI transformed how we manage projects. We went from guessing estimates to data-driven predictions.',
      author: 'Sarah Chen',
      role: 'VP of Engineering',
      company: 'TechStart Inc.'
    },
    featured: true
  },
  {
    id: 2,
    title: 'Digital Ventures: 3x ROI in 6 Months',
    company: 'Digital Ventures Ltd.',
    industry: 'Digital Agency',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db75?w=800&h=400&fit=crop',
    challenge: 'Client dissatisfaction with unrealistic timelines and budget overruns',
    solution: 'Adopted Predicto for transparent, accurate project estimates',
    results: {
      timeReduction: '50% faster delivery',
      accuracyImprovement: '90% on-time delivery',
      costSavings: '$250K savings',
      teamProductivity: '35% efficiency gain'
    },
    metrics: [
      { label: 'Faster Delivery', value: '50%', icon: Clock },
      { label: 'On-Time Rate', value: '90%', icon: TrendingUp },
      { label: 'Saved Budget', value: '$250K', icon: DollarSign },
      { label: 'Efficiency Gain', value: '+35%', icon: Users }
    ],
    testimonial: {
      quote: 'Our clients are much happier now that we can deliver projects on time and on budget consistently.',
      author: 'Marcus Rodriguez',
      role: 'CEO',
      company: 'Digital Ventures Ltd.'
    },
    featured: true
  },
  {
    id: 3,
    title: 'Innovation Lab: AI-Powered Team Optimization',
    company: 'Innovation Lab Corp.',
    industry: 'AI/ML Research',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    challenge: 'Complex ML projects with high uncertainty in timelines and resource needs',
    solution: 'Leveraged Predicto\'s neural estimation engine for precise predictions',
    results: {
      timeReduction: '55% prediction accuracy improvement',
      accuracyImprovement: '80% confidence in estimates',
      costSavings: '$1.2M ROI',
      teamProductivity: '50% better resource allocation'
    },
    metrics: [
      { label: 'Accuracy Improvement', value: '55%', icon: TrendingUp },
      { label: 'Estimate Confidence', value: '80%', icon: Clock },
      { label: 'Realized ROI', value: '$1.2M', icon: DollarSign },
      { label: 'Resource Optimization', value: '+50%', icon: Users }
    ],
    testimonial: {
      quote: 'Predicto handles the complexity of ML projects better than any tool we\'ve tried. Highly recommended.',
      author: 'Priya Kapoor',
      role: 'Director of Operations',
      company: 'Innovation Lab Corp.'
    },
    featured: false
  },
  {
    id: 4,
    title: 'CloudFirst: Enterprise-Scale Implementation',
    company: 'CloudFirst Solutions',
    industry: 'Enterprise Software',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    challenge: 'Managing 50+ concurrent projects with diverse teams and requirements',
    solution: 'Deployed Predicto enterprise across 200+ team members',
    results: {
      timeReduction: '45% planning efficiency',
      accuracyImprovement: '88% estimate accuracy',
      costSavings: '$2.5M saved',
      teamProductivity: '40% process improvement'
    },
    metrics: [
      { label: 'Efficiency Gain', value: '45%', icon: TrendingUp },
      { label: 'Accuracy', value: '88%', icon: Clock },
      { label: 'Cost Savings', value: '$2.5M', icon: DollarSign },
      { label: 'Process Improvement', value: '+40%', icon: Users }
    ],
    testimonial: {
      quote: 'Implementing Predicto across our enterprise was smooth and the ROI was immediate.',
      author: 'James Chen',
      role: 'SVP Engineering',
      company: 'CloudFirst Solutions'
    },
    featured: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const industries = ['All', ...new Set(caseStudies.map(cs => cs.industry))];
  
  const filteredCaseStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  const featuredStudies = caseStudies.filter(cs => cs.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Success Stories</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              See how leading companies improved their project estimation, reduced costs, and delivered on time with Predicto AI
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && (
          <section className="mb-20">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 bg-gradient-to-r from-brand-600 to-accent-600 from-accent-400 to-brand-400 bg-clip-text text-transparent"
            >
              Featured Results
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredStudies.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden border-2 border-gray-200 border-gray-700 bg-white bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={caseStudy.image} 
                      alt={caseStudy.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
                      {caseStudy.industry}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-white mb-2">{caseStudy.title}</h3>
                    <p className="text-gray-600 text-gray-400 mb-6">{caseStudy.company}</p>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {caseStudy.metrics.slice(0, 2).map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                          <div key={i} className="p-3 bg-gradient-to-br from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 rounded-lg">
                            <Icon className="w-5 h-5 text-brand-600 text-accent-400 mb-2" />
                            <p className="text-sm font-bold text-gray-900 text-white">{metric.value}</p>
                            <p className="text-xs text-gray-600 text-gray-400">{metric.label}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Testimonial */}
                    <div className="border-l-4 border-brand-600 border-accent-400 pl-4 mb-6">
                      <p className="text-gray-700 text-gray-300 italic mb-2">"{caseStudy.testimonial.quote}"</p>
                      <p className="text-sm font-semibold text-gray-900 text-white">{caseStudy.testimonial.author}</p>
                      <p className="text-xs text-gray-600 text-gray-400">{caseStudy.testimonial.role}, {caseStudy.testimonial.company}</p>
                    </div>

                    <Link
                      to={`/case-studies/${caseStudy.id}`}
                      className="inline-flex items-center gap-2 text-brand-600 text-accent-400 font-semibold hover:gap-3 transition-all"
                    >
                      View Full Story <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Industry Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-3"
        >
          <span className="text-gray-700 text-gray-300 font-semibold self-center">Filter by Industry:</span>
          {industries.map((industry) => (
            <motion.button
              key={industry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedIndustry === industry
                  ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-lg'
                  : 'border-2 border-gray-200 border-gray-700 text-gray-700 text-gray-300 hover:border-brand-500'
              }`}
            >
              {industry}
            </motion.button>
          ))}
        </motion.div>

        {/* All Case Studies */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredCaseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="rounded-xl overflow-hidden border-2 border-gray-200 border-gray-700 bg-white bg-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative overflow-hidden h-48">
                <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-gray-100 bg-gray-700 text-gray-700 text-gray-300 text-xs font-semibold rounded-full mb-3">
                  {caseStudy.industry}
                </span>
                <h3 className="text-xl font-bold text-gray-900 text-white mb-2">{caseStudy.title}</h3>
                <p className="text-gray-600 text-gray-400 text-sm mb-4">{caseStudy.company}</p>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {caseStudy.metrics.slice(0, 2).map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <div key={i} className="p-2 bg-gray-50 bg-gray-700 rounded">
                        <p className="text-sm font-bold text-gray-900 text-white">{metric.value}</p>
                        <p className="text-xs text-gray-600 text-gray-400">{metric.label}</p>
                      </div>
                    );
                  })}
                </div>

                <Link
                  to={`/case-studies/${caseStudy.id}`}
                  className="inline-flex items-center gap-2 text-brand-600 text-accent-400 font-semibold text-sm hover:gap-3 transition-all"
                >
                  Read Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 py-12 px-8 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 from-brand-900 via-brand-800 to-accent-800 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Projects?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join 75+ companies that are already using Predicto AI to estimate faster, deliver better, and save costs.
          </p>
          <Link
            to="/estimate"
            className="inline-block px-8 py-4 bg-white text-brand-600 font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            Get Started Now
          </Link>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
