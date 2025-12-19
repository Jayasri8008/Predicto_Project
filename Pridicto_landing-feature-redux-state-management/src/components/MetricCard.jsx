import React from 'react';
import CountUp from 'react-countup';

export default function MetricCard({label,value}) {
  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-slate-800 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold mt-2">
        {typeof value === 'number' ? <CountUp end={value} duration={2}/> : value}
      </div>
    </div>
  );
}
