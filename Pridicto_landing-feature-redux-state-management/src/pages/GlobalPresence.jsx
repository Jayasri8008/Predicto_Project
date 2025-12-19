import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const regions = [
  { name: 'India', contact: 'info@predicto.in', phone: '+91 12345 67890' },
  { name: 'UK', contact: 'info@predicto.uk', phone: '+44 20 1234 5678' },
  { name: 'Nigeria', contact: 'info@predicto.ng', phone: '+234 123 456 7890' },
  { name: 'USA', contact: 'info@predicto.us', phone: '+1 123 456 7890' },
  { name: 'Cyprus', contact: 'info@predicto.cy', phone: '+357 12 345 678' },
];

export default function GlobalPresence(){
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
      <Navbar />
      <main className="pt-28 max-w-7xl mx-auto px-6 pb-16 space-y-12">
        <motion.section initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="text-center">
          <h1 className="text-4xl font-extrabold">Our <span className="text-indigo-600">Global Presence</span></h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">Serving startups worldwide with local expertise.</p>
        </motion.section>

        <section>
          <div className="mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d4a32b7b2b0!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              title="Global Map"
            ></iframe>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {regions.map(region => (
              <div key={region.name} className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
                <h3 className="font-semibold text-indigo-600">{region.name}</h3>
                <p className="text-sm text-gray-500 mt-2">Email: {region.contact}</p>
                <p className="text-sm text-gray-400 mt-1">Phone: {region.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
