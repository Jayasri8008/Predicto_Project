import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  Send,
  Sparkles,
  Zap,
  Target,
  DollarSign
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: "Features", href: "#features", icon: Zap },
    { name: "Pricing", href: "#pricing", icon: DollarSign },
    { name: "About", href: "#about", icon: Target },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const resources = [
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
    { name: "Blog", href: "#blog" },
    { name: "Support", href: "#support" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-400" },
    { name: "GitHub", icon: Github, href: "https://github.com", color: "hover:text-gray-300" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400" },
  ];

  return (
    <footer className="relative mt-12">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b4e] to-[#000000] rounded-t-2xl" />
      
      {/* Subtle floating element */}
      <div className="absolute inset-0 overflow-hidden rounded-t-2xl pointer-events-none">
        <motion.div
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Predicto.ai</h3>
              </div>
              
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                AI-powered project estimation and risk analysis for confident decisions.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Mail className="w-3 h-3 text-indigo-400" />
                  <span>hello@predicto.ai</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Phone className="w-3 h-3 text-indigo-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin className="w-3 h-3 text-indigo-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-base font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors text-sm"
                    >
                      <link.icon className="w-3 h-3 group-hover:text-indigo-400" />
                      <span>{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-base font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={resource.name}>
                    <motion.a
                      href={resource.href}
                      whileHover={{ x: 3 }}
                      className="text-gray-300 hover:text-indigo-400 transition-colors text-sm"
                    >
                      {resource.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-base font-semibold text-white mb-4 mt-6">Legal</h4>
              <ul className="space-y-2">
                {legal.map((item, index) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 3 }}
                      className="text-gray-300 hover:text-indigo-400 transition-colors text-sm"
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10"
            >
              <h4 className="text-base font-semibold text-white mb-3">Stay Updated</h4>
              <p className="text-gray-300 text-xs mb-4">
                Get the latest AI insights delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm"
                >
                  <Send className="w-3 h-3" />
                  Subscribe
                </motion.button>
              </form>
              
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-xs text-center mt-3"
                >
                  Thank you! 🎉
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-xs text-center sm:text-left"
              >
                © {new Date().getFullYear()} Predicto.ai — Built by RISINTERNATIONAL & Team. All rights reserved.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 ${social.color} border border-white/10 transition-all hover:shadow-md hover:bg-white/20`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
