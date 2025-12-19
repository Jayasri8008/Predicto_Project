import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams just starting with AI-powered estimation',
    monthlyPrice: 99,
    annualPrice: 990,
    popular: false,
    features: [
      { name: 'Up to 50 projects/month', included: true },
      { name: 'Basic estimation features', included: true },
      { name: 'Email support', included: true },
      { name: '3 team members', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'API access', included: false },
      { name: 'Advanced reporting', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Dedicated account manager', included: false }
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Professional',
    description: 'For growing teams needing advanced features and dedicated support',
    monthlyPrice: 299,
    annualPrice: 2990,
    popular: true,
    features: [
      { name: 'Up to 500 projects/month', included: true },
      { name: 'Advanced estimation features', included: true },
      { name: 'Priority email & chat support', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Advanced analytics & insights', included: true },
      { name: 'API access', included: true },
      { name: 'Advanced reporting & exports', included: true },
      { name: 'Priority support (8 hours)', included: true },
      { name: 'Custom integrations', included: false },
      { name: 'Dedicated account manager', included: false }
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    description: 'For large organizations requiring full customization and support',
    monthlyPrice: null,
    annualPrice: null,
    popular: false,
    features: [
      { name: 'Unlimited projects', included: true },
      { name: 'Enterprise-grade features', included: true },
      { name: '24/7 dedicated support', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Custom analytics & dashboards', included: true },
      { name: 'Full API access', included: true },
      { name: 'Advanced reporting & exports', included: true },
      { name: 'Priority support (24/7)', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Dedicated account manager', included: true }
    ],
    cta: 'Contact Sales'
  }
];

const comparisonFeatures = [
  { category: 'Projects & Estimation', items: [
    { name: 'Monthly Projects', starter: '50', professional: '500', enterprise: 'Unlimited' },
    { name: 'Estimation Accuracy', starter: 'Good', professional: 'Excellent', enterprise: 'Custom-tuned' },
    { name: 'Historical Data Analysis', starter: 'Limited', professional: 'Full', enterprise: 'Full' },
    { name: 'Custom ML Models', starter: false, professional: false, enterprise: true }
  ]},
  { category: 'Team & Collaboration', items: [
    { name: 'Team Members', starter: '3', professional: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Role-based Access Control', starter: false, professional: true, enterprise: true },
    { name: 'Team Templates', starter: false, professional: true, enterprise: true },
    { name: 'Audit Logs', starter: false, professional: true, enterprise: true }
  ]},
  { category: 'Analytics & Reporting', items: [
    { name: 'Basic Analytics', starter: true, professional: true, enterprise: true },
    { name: 'Advanced Dashboards', starter: false, professional: true, enterprise: true },
    { name: 'Custom Reports', starter: false, professional: true, enterprise: true },
    { name: 'Predictive Analytics', starter: false, professional: true, enterprise: true }
  ]},
  { category: 'Integrations', items: [
    { name: 'Jira Integration', starter: true, professional: true, enterprise: true },
    { name: 'Azure DevOps Integration', starter: true, professional: true, enterprise: true },
    { name: 'Slack Integration', starter: false, professional: true, enterprise: true },
    { name: 'Custom Integrations', starter: false, professional: false, enterprise: true }
  ]},
  { category: 'Support', items: [
    { name: 'Email Support', starter: true, professional: true, enterprise: true },
    { name: 'Chat Support', starter: false, professional: true, enterprise: true },
    { name: 'Phone Support', starter: false, professional: 'Business hours', enterprise: '24/7' },
    { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true }
  ]},
  { category: 'Security & Compliance', items: [
    { name: 'SSL Encryption', starter: true, professional: true, enterprise: true },
    { name: 'Two-Factor Authentication', starter: true, professional: true, enterprise: true },
    { name: 'SSO/SAML', starter: false, professional: false, enterprise: true },
    { name: 'SOC 2 Certified', starter: true, professional: true, enterprise: true }
  ]}
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

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your team. All plans include a free 14-day trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="inline-flex p-1 bg-white/20 rounded-full"
              >
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-brand-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    billingPeriod === 'annual'
                      ? 'bg-white text-brand-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Annual <span className="text-xs bg-accent-500 text-white px-2 py-1 rounded-full ml-2">Save 17%</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`rounded-2xl border-2 overflow-hidden transition-all ${
                plan.popular
                  ? 'border-brand-600 border-accent-400 shadow-2xl scale-105'
                  : 'border-gray-200 border-gray-700 shadow-lg'
              } bg-white bg-gray-800`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-brand-600 to-accent-500 text-white py-2 px-4 text-center font-bold text-sm">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold text-brand-600 text-accent-400">
                        ${billingPeriod === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                      </span>
                      <span className="text-gray-600 text-gray-400">
                        /{billingPeriod === 'monthly' ? 'month' : 'month (annual)'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-brand-600 text-accent-400 mb-4">
                      Custom Pricing
                    </div>
                  )}
                  <p className="text-xs text-gray-500 text-gray-400">
                    {billingPeriod === 'annual' && plan.annualPrice && (
                      <>Billed ${plan.annualPrice} annually</>
                    )}
                    {billingPeriod === 'monthly' && plan.monthlyPrice && (
                      <>Billed ${plan.monthlyPrice} monthly</>
                    )}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-bold transition-all mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white hover:shadow-lg'
                      : 'border-2 border-brand-600 border-accent-400 text-brand-600 text-accent-400 hover:bg-brand-50 hover:bg-brand-900/20'
                  }`}
                >
                  {plan.cta}
                </motion.button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${
                        feature.included
                          ? 'text-gray-700 text-gray-300'
                          : 'text-gray-400 text-gray-500 line-through'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-white mb-4 text-center">
            Detailed Feature Comparison
          </h2>
          <p className="text-center text-gray-600 text-gray-400 mb-12">
            See exactly what each plan includes
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="bg-white bg-gray-800 rounded-2xl border-2 border-gray-200 border-gray-700 overflow-hidden">
              {comparisonFeatures.map((category, ci) => (
                <div key={ci}>
                  <motion.button
                    onClick={() => setExpandedCategory(expandedCategory === ci ? null : ci)}
                    className="w-full p-4 bg-gradient-to-r from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 border-b border-gray-200 border-gray-700 flex items-center justify-between hover:bg-brand-100 hover:bg-brand-900/30 transition-all text-left"
                  >
                    <h3 className="font-bold text-gray-900 text-white">{category.category}</h3>
                    <motion.div
                      animate={{ rotate: expandedCategory === ci ? 180 : 0 }}
                      className="text-brand-600 text-accent-400"
                    >
                      ▼
                    </motion.div>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: expandedCategory === ci ? 1 : 0,
                      height: expandedCategory === ci ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {category.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 border-gray-700 last:border-b-0 items-center"
                      >
                        <div className="text-gray-700 text-gray-300 font-semibold text-sm">
                          {item.name}
                        </div>
                        <div className="text-center">
                          {typeof item.starter === 'boolean' ? (
                            item.starter ? (
                              <Check className="w-5 h-5 text-accent-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 text-gray-600 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700 text-gray-300 font-semibold text-sm">
                              {item.starter}
                            </span>
                          )}
                        </div>
                        <div className="text-center">
                          {typeof item.professional === 'boolean' ? (
                            item.professional ? (
                              <Check className="w-5 h-5 text-accent-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 text-gray-600 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700 text-gray-300 font-semibold text-sm">
                              {item.professional}
                            </span>
                          )}
                        </div>
                        <div className="text-center">
                          {typeof item.enterprise === 'boolean' ? (
                            item.enterprise ? (
                              <Check className="w-5 h-5 text-accent-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 text-gray-600 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700 text-gray-300 font-semibold text-sm">
                              {item.enterprise}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'Can I change plans at any time?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Absolutely! All plans come with a 14-day free trial. No credit card required to get started.'
              },
              {
                q: 'What happens to my data if I cancel?',
                a: 'Your data remains accessible for 30 days after cancellation. You can export all your projects and data before that period ends.'
              },
              {
                q: 'Do you offer discounts for longer commitments?',
                a: 'Yes! Annual plans include 17% savings compared to monthly billing. Contact our sales team for custom enterprise discounts.'
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees! You only pay for the plan you choose. For Enterprise plans, we offer custom pricing without hidden costs.'
              },
              {
                q: 'Can I get API access on lower plans?',
                a: 'API access is included in Professional and Enterprise plans. Contact us if you need API access on the Starter plan.'
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl bg-white bg-gray-800 border-2 border-gray-200 border-gray-700"
              >
                <h3 className="font-bold text-gray-900 text-white mb-3">{faq.q}</h3>
                <p className="text-gray-600 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
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
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of teams already using Predicto AI to estimate better and deliver faster.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-brand-600 font-bold rounded-lg hover:bg-gray-100 transition-all inline-flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </motion.button>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
