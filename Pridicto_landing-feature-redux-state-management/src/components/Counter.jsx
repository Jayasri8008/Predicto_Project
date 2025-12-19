import React, { useEffect, useState } from "react";

export default function Counter({ label, value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMilSecDur = 2000;
    let incrementTime = (totalMilSecDur / end) * 1.5;
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-5xl font-extrabold text-emerald-400">{count}</p>
      <p className="text-sm text-white/75">{label}</p>
    </div>
  );
}
