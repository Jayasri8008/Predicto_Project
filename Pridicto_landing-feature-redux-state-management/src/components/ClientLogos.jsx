import React from 'react';

export default function ClientLogos() {
  const logos = [
    { name: 'Acme Corp', color: 'bg-blue-100 bg-blue-900', textColor: 'text-blue-600 text-blue-300' },
    { name: 'TechStart', color: 'bg-purple-100 bg-purple-900', textColor: 'text-purple-600 text-purple-300' },
    { name: 'Innovation Lab', color: 'bg-green-100 bg-green-900', textColor: 'text-green-600 text-green-300' },
    { name: 'Digital Ventures', color: 'bg-pink-100 bg-pink-900', textColor: 'text-pink-600 text-pink-300' },
    { name: 'Future Systems', color: 'bg-indigo-100 bg-indigo-900', textColor: 'text-indigo-600 text-indigo-300' },
    { name: 'Cloud Builders', color: 'bg-cyan-100 bg-cyan-900', textColor: 'text-cyan-600 text-cyan-300' },
  ];

  return (
    <div className="w-full py-12 border-y border-gray-200 border-gray-800 bg-gray-50 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-gray-600 text-gray-400 mb-8">Trusted by leading companies</p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {logos.map((logo, idx) => (
            <div key={idx} className={`${logo.color} rounded-lg h-20 flex items-center justify-center`}>
              <span className={`${logo.textColor} font-semibold text-sm text-center px-2`}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
