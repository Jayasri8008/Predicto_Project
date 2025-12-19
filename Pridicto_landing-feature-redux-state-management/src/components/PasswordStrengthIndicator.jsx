import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    return { score, checks };
  };

  const { score, checks } = getPasswordStrength(password);

  const getStrengthColor = () => {
    if (score < 3) return 'bg-red-500';
    if (score < 4) return 'bg-yellow-500';
    if (score < 5) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (score < 3) return 'Weak';
    if (score < 4) return 'Fair';
    if (score < 5) return 'Good';
    return 'Strong';
  };

  const getStrengthWidth = () => {
    return `${(score / 5) * 100}%`;
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: getStrengthWidth() }}
          ></div>
        </div>
        <span className={`text-sm font-medium ${score < 3 ? 'text-red-500' : score < 4 ? 'text-yellow-500' : score < 5 ? 'text-blue-500' : 'text-green-500'}`}>
          {getStrengthText()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className={`flex items-center gap-1 ${checks.length ? 'text-green-600' : 'text-gray-500'}`}>
          {checks.length ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
          8+ characters
        </div>
        <div className={`flex items-center gap-1 ${checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
          {checks.uppercase ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
          Uppercase
        </div>
        <div className={`flex items-center gap-1 ${checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
          {checks.lowercase ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
          Lowercase
        </div>
        <div className={`flex items-center gap-1 ${checks.number ? 'text-green-600' : 'text-gray-500'}`}>
          {checks.number ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
          Number
        </div>
        <div className={`flex items-center gap-1 col-span-2 ${checks.special ? 'text-green-600' : 'text-gray-500'}`}>
          {checks.special ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
          Special character (!@#$%^&*)
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
