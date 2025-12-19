import React from "react";
import { motion } from "framer-motion";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Google_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/LinkedIn_logo_initials.png",
];

export default function ClientLogosCarousel() {
  return (
    <section className="py-16 bg-gradient-to-t from-[#1a0033] to-[#330066]">
      <h3 className="text-center text-3xl font-bold text-white mb-8">Trusted by Industry Leaders</h3>
      <div className="overflow-hidden max-w-6xl mx-auto">
        <motion.div
          className="flex space-x-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}
          style={{ whiteSpace: "nowrap" }}
        >
          {logos.concat(logos).map((logo, idx) => (
            <img key={idx} src={logo} alt="Client logo" className="h-16 object-contain" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
