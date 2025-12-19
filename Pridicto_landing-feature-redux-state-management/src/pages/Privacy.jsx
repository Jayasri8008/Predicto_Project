import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function Privacy() {
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
          <h1 className="text-5xl font-bold text-gray-900 text-white mb-4">Privacy Policy</h1>
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
              Predicto AI ("we", "us", "our", or "Company") operates the Predicto AI website and services (the "Service"). 
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use 
              our Service and the choices you have associated with that data.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">2. Information Collection and Use</h2>
            <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service.</p>
            
            <h3 className="text-xl font-semibold text-gray-900 text-white mt-6 mb-3">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Personal Data:</strong> Email address, name, phone number, address, company information</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visit, time spent on pages</li>
              <li><strong>Project Data:</strong> Project details, estimations, timelines, team information you provide</li>
              <li><strong>Technical Data:</strong> Device information, OS type, referring/exit pages</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">3. Use of Data</h2>
            <p className="mb-4">Predicto AI uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To send promotional communications (with your consent)</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To provide customer support</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or 
              method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your 
              Personal Data, we cannot guarantee its absolute security.
            </p>
            <p className="mt-4">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>SSL/TLS encryption for data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Two-factor authentication support</li>
              <li>Regular access logs and monitoring</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">5. Disclosure of Data</h2>
            <h3 className="text-lg font-semibold text-gray-900 text-white mt-4 mb-3">Legal Requirements</h3>
            <p>
              Predicto AI may disclose your Personal Data in the good faith belief that such action is necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of Predicto AI</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of users of the Service or the public</li>
              <li>Protect against legal liability</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">6. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our Service and store certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p>
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Session Cookies:</strong> These expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> These remain in your device until manually deleted</li>
              <li><strong>Analytics Cookies:</strong> These help us understand how you use our Service</li>
              <li><strong>Preference Cookies:</strong> These remember your preferences and settings</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">7. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Right to Access:</strong> You can request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> You can request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> You can limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> You can receive your data in a structured format</li>
              <li><strong>Right to Object:</strong> You can object to certain processing of your data</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at privacy@predicto.ai
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">8. Service Providers</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), 
              to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing 
              how our Service is used.
            </p>
            <p className="mt-4">
              These third parties have access to your Personal Data only to perform these tasks on our behalf and are 
              obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
