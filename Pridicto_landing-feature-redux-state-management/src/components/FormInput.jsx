import React from 'react';

export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  required = false,
}) {
  const hasError = touched && error;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`input-base ${hasError ? 'border-red-500 ring-2 ring-red-200 ring-red-900' : ''}`}
        aria-describedby={hasError ? `${name}-error` : undefined}
        aria-invalid={hasError}
      />
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600 text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
