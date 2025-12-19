import React from 'react';

export default function ExperienceCard({ item }) {
  return (
    <div className="card p-4 border-l-4 border-l-brand-600">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 text-white">{item.role}</h3>
          <p className="text-sm text-gray-500 text-gray-400 font-medium mt-1">{item.company} • {item.range}</p>
        </div>
        <div className="text-xs text-gray-400">{item.location}</div>
      </div>
      <p className="mt-3 text-sm text-gray-600 text-gray-300">{item.summary}</p>
    </div>
  );
}
