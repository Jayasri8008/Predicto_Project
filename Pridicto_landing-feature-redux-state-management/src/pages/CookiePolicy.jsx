import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand-600 text-accent-400 hover:gap-3 transition-all mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-600 text-gray-400">Last updated: January 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-invert max-w-none space-y-8 text-gray-700 text-gray-300"
        >
          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Predicto AI, Inc. ("Company", "we", "us", or "our") uses cookies and similar 
              tracking technologies on our website and services (the "Service"). This policy is designed to help you understand 
              what cookies are, how we use them, and how you can control your preferences.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They contain information about your browsing activity and can be used to remember your preferences.
            </p>
            <p className="mt-4">
              There are two main types of cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. 
                They are used to track your activity during a single browsing session.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> These remain on your device until they expire or you manually delete them. 
                They are used to remember your preferences across multiple visits.
              </li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Essential Cookies</h3>
            <p>
              These cookies are necessary for the Service to function properly. They enable user login, session management, 
              and security features.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Session tokens for user authentication</li>
              <li>CSRF protection tokens</li>
              <li>User preferences and settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Analytics Cookies</h3>
            <p>
              These cookies help us understand how you use the Service by tracking your navigation, pages visited, 
              and time spent on pages. This information is used to improve our Service.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Google Analytics (_ga, _gid, _gat)</li>
              <li>Hotjar tracking cookies (_hjid, _hjFirstSeen)</li>
              <li>Custom analytics tracking</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Preference Cookies</h3>
            <p>
              These cookies remember your preferences and settings, such as language, theme (dark/light mode), 
              and other customizations.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Theme preference (dark/light mode)</li>
              <li>Language selection</li>
              <li>User interface customizations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization features of the Service.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Form data persistence</li>
              <li>Recently accessed projects</li>
              <li>User dashboard customizations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Marketing Cookies</h3>
            <p>
              These cookies track your interactions across websites and are used for targeted advertising and marketing purposes.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Facebook Pixel tracking</li>
              <li>LinkedIn conversion tracking</li>
              <li>Google Ads tracking</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">4. Third-Party Cookies</h2>
            <p>
              We may use third-party services that place cookies on your device. These services include:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Google Analytics:</strong> For website analytics and traffic measurement</li>
              <li><strong>Hotjar:</strong> For session recording and heatmaps</li>
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Intercom:</strong> For customer communication and support</li>
              <li><strong>Facebook/Google:</strong> For advertising and retargeting</li>
            </ul>
            <p className="mt-4">
              These third parties have their own cookie policies. We recommend reviewing their policies to understand how 
              they use your information.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">5. Cookie Consent</h2>
            <p>
              When you first visit our website, you will be presented with a cookie consent banner. By continuing to use 
              the Service, you consent to our use of cookies as described in this policy.
            </p>
            <p className="mt-4">
              You can update your cookie preferences at any time through the cookie management center on our website.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">6. How to Control Cookies</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their settings. You can typically:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Block all cookies</li>
              <li>Allow only certain types of cookies</li>
              <li>Delete existing cookies</li>
              <li>Be notified before a cookie is stored</li>
            </ul>
            <p className="mt-4">
              Instructions for controlling cookies in popular browsers:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Google Chrome: chrome.google.com/settings/cookies</li>
              <li>Mozilla Firefox: firefox.com/privacy</li>
              <li>Safari: apple.com/safari</li>
              <li>Microsoft Edge: microsoft.com/edge</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Cookie Management Center</h3>
            <p>
              You can manage your cookie preferences on our website by accessing the Cookie Management Center, 
              typically found in the footer or settings area of our website.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Do Not Track</h3>
            <p>
              Many browsers include a Do Not Track (DNT) feature. When DNT is enabled, your browser sends a special signal 
              to websites. We respect DNT signals and will limit our collection of tracking information.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">7. Impact of Disabling Cookies</h2>
            <p>
              If you disable cookies, you may experience limited functionality in certain areas of the Service. For example:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>You may not be able to stay logged in</li>
              <li>Your preferences may not be saved</li>
              <li>Some features may not work properly</li>
              <li>The Service may not perform optimally</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">8. Similar Technologies</h2>
            <p>
              In addition to cookies, we may use other similar technologies to track your activity:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Web Beacons (Pixels): Tiny images used to track page visits</li>
              <li>Local Storage: HTML5 local storage for storing data on your device</li>
              <li>Device Fingerprinting: Collecting device and browser characteristics</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">9. International Considerations</h2>
            <p>
              Our cookie practices comply with international regulations including:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>GDPR (EU):</strong> Requires explicit consent for non-essential cookies</li>
              <li><strong>CCPA (California):</strong> Allows users to opt-out of cookie tracking</li>
              <li><strong>LGPD (Brazil):</strong> Requires transparent cookie disclosure</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">10. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or technology. 
              We will notify you of significant changes by updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">11. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at:</p>
            <div className="mt-4 p-4 bg-gray-50 bg-gray-700 rounded-lg">
              <p><strong>Email:</strong> privacy@predicto.ai</p>
              <p><strong>Address:</strong> Predicto AI, Inc., 123 Tech Street, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
