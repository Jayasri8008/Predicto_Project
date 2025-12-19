import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

// Button Variants
// ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
// ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Button Props Interface
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  onClick,
  ...props
}, ref) => {
  // Size variants with proper spacing and typography
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  // Color variants for different states
  const variantClasses = {
    primary: {
      base: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500',
      text: 'text-white',
      disabled: 'bg-indigo-300 cursor-not-allowed',
    },
    secondary: {
      base: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500',
      text: 'text-white',
      disabled: 'bg-gray-300 cursor-not-allowed',
    },
    outline: {
      base: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 focus:ring-indigo-500',
      text: 'text-indigo-600',
      disabled: 'border-gray-300 text-gray-400 cursor-not-allowed',
    },
    ghost: {
      base: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500',
      text: 'text-gray-700',
      disabled: 'text-gray-400 cursor-not-allowed',
    },
    danger: {
      base: 'bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
      text: 'text-white',
      disabled: 'bg-red-300 cursor-not-allowed',
    },
  };

  // Determine if button should be disabled
  const isDisabled = disabled || loading;

  // Handle click events
  const handleClick = (e) => {
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg
        border border-transparent
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:cursor-not-allowed
        transform hover:scale-105 active:scale-95
        ${fullWidth ? 'w-full' : ''}
        ${sizeClasses[size]}
        ${isDisabled ? variantClasses[variant].disabled : variantClasses[variant].base}
        ${className}
      `}
      {...props}
    >
      {/* Left Icon or Loading Spinner */}
      <div className="flex items-center">
        {loading ? (
          <div className="mr-2">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : icon && iconPosition === 'left' ? (
          <span className="mr-2">{icon}</span>
        ) : null}

        {/* Button Text */}
        {children && (
          <span className={variantClasses[variant].text}>
            {children}
          </span>
        )}

        {/* Right Icon */}
        {!loading && icon && iconPosition === 'right' ? (
          <span className="ml-2">{icon}</span>
        ) : null}
      </div>
    </button>
  );
});

// Display name for better debugging
Button.displayName = 'Button';

// Export with additional helpful variants
const ButtonGroup = ({
  children,
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={`
        inline-flex
        ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
        ${orientation === 'horizontal' ? '[&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none' : '[&>button:first-child]:rounded-b-none [&>button:last-child]:rounded-t-none'}
        ${orientation === 'horizontal' ? '[&>button:not(:first-child):not(:last-child)]:rounded-none' : '[&>button:not(:first-child):not(:last-child)]:rounded-none'}
        ${orientation === 'horizontal' ? '[&>button+button]:border-l-0' : '[&>button+button]:border-t-0'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export { ButtonGroup };

// Convenience component variants
const PrimaryButton = (props) => (
  <Button {...props} variant="primary" />
);

const SecondaryButton = (props) => (
  <Button {...props} variant="secondary" />
);

const OutlineButton = (props) => (
  <Button {...props} variant="outline" />
);

const GhostButton = (props) => (
  <Button {...props} variant="ghost" />
);

const DangerButton = (props) => (
  <Button {...props} variant="danger" />
);

export { Button, PrimaryButton, SecondaryButton, OutlineButton, GhostButton, DangerButton };
export default Button;