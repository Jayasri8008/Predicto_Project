import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function TestimonialCard({ quote, author, role, company, avatar, rating = 5 }) {
  return (
    <div className="card p-6">
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4 text-accent-500" />
        ))}
      </div>
      <p className="text-gray-600 text-gray-300 italic mb-4">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center text-white font-semibold text-sm">
          {avatar || author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-white text-sm">{author}</div>
          <div className="text-xs text-gray-500 text-gray-400">{role} @ {company}</div>
        </div>
      </div>
    </div>
  );
}
