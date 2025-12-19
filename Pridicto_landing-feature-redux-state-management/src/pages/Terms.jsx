import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function Terms() {
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
          <h1 className="text-5xl font-bold text-gray-900 text-white mb-4">Terms of Service</h1>
          <p className="text-gray-600 text-gray-400">Last updated: January 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-invert max-w-none space-y-8 text-gray-700 text-gray-300"
        >
          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") 
              and Predicto AI, Inc. ("Company", "we", "us", or "our") governing your use of the Predicto AI website, mobile 
              application, and all associated services (collectively, the "Service").
            </p>
            <p className="mt-4">
              By accessing and using the Service, you accept and agree to be bound by and comply with these Terms. If you do not 
              agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">2. License to Use</h2>
            <p>
              Subject to your complete and ongoing compliance with these Terms, Company grants you a limited, non-exclusive, 
              non-transferable, and revocable license to access and use the Service solely for your personal, non-commercial use.
            </p>
            <p className="mt-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Reproduce, duplicate, copy, or sell any portion of the Service</li>
              <li>Reverse engineer, decompile, or attempt to derive the source code of the Service</li>
              <li>Remove or alter any proprietary notices or labels</li>
              <li>Access the Service through automated means (bots, spiders, etc.)</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Interfere with the operation of the Service or networks connected to it</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">3. User Accounts</h2>
            <p>
              To access certain features of the Service, you may be required to create an account. You are responsible for 
              maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="mt-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Provide accurate, current, and complete information</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Maintain the security of your password</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">4. User Content</h2>
            <p>
              The Service may allow you to post, submit, or display content including but not limited to project data, 
              estimations, and team information ("User Content"). By submitting User Content, you grant Company a worldwide, 
              non-exclusive, royalty-free license to use, copy, modify, and distribute your User Content.
            </p>
            <p className="mt-4">You represent and warrant that:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>You own or have the right to all User Content you submit</li>
              <li>User Content does not infringe any third-party rights</li>
              <li>User Content does not contain viruses or malicious code</li>
              <li>User Content complies with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">5. Payment Terms</h2>
            <p>
              If you purchase a paid plan, you agree to pay all fees according to the pricing displayed at the time of purchase. 
              All fees are exclusive of applicable taxes unless otherwise stated.
            </p>
            <p className="mt-4">Billing and Renewals:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Subscriptions will automatically renew unless you cancel</li>
              <li>You will be charged on your renewal date</li>
              <li>Cancellations must be made at least 24 hours before renewal</li>
              <li>No refunds are provided for partial months or unused features</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">6. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, 
              GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="mt-4">
              THE LIABILITY OF COMPANY FOR ANY CLAIM ARISING FROM OR RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNT 
              YOU PAID FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. COMPANY MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="mt-4">
              COMPANY DOES NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. YOUR USE OF THE SERVICE 
              IS AT YOUR OWN RISK.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Company and its officers, directors, employees, agents, and 
              affiliates from any claims, damages, losses, or expenses (including attorney's fees) arising from or relating to 
              your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">9. Termination</h2>
            <p>
              Company may terminate or suspend your account and access to the Service at any time, with or without cause, and 
              with or without notice. Upon termination:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Your right to use the Service immediately ceases</li>
              <li>Your User Content may be deleted</li>
              <li>No refunds will be issued for unused portions of subscriptions</li>
            </ul>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">10. Intellectual Property Rights</h2>
            <p>
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, 
              images, audio, and video, are owned by Company or its content suppliers and are protected by international copyright laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, transmit, modify, or create derivative works of the Service or its content without 
              Company's prior written permission.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">11. Changes to Terms</h2>
            <p>
              Company reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
              Your continued use of the Service following any changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section className="bg-white bg-gray-800 p-8 rounded-xl border-2 border-gray-200 border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-4">12. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <div className="mt-4 p-4 bg-gray-50 bg-gray-700 rounded-lg">
              <p><strong>Email:</strong> legal@predicto.ai</p>
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
