import React from 'react';

// Loading Spinner Size Options
// SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Loading Spinner Variant Options
// SpinnerVariant = 'primary' | 'secondary' | 'white' | 'success' | 'danger';

// Loading Spinner Props
const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  text,
  className = '',
  fullScreen = false,
  overlay = false,
  showText = true,
  showLabel = false,
}) => {
  // Size configurations
  const sizeConfig = {
    xs: {
      container: 'w-3 h-3',
      spinner: 'w-3 h-3',
      text: 'text-xs',
    },
    sm: {
      container: 'w-4 h-4',
      spinner: 'w-4 h-4',
      text: 'text-sm',
    },
    md: {
      container: 'w-6 h-6',
      spinner: 'w-6 h-6',
      text: 'text-sm',
    },
    lg: {
      container: 'w-8 h-8',
      spinner: 'w-8 h-8',
      text: 'text-base',
    },
    xl: {
      container: 'w-12 h-12',
      spinner: 'w-12 h-12',
      text: 'text-lg',
    },
    '2xl': {
      container: 'w-16 h-16',
      spinner: 'w-16 h-16',
      text: 'text-xl',
    },
  };

  // Variant configurations
  const variantConfig = {
    primary: {
      color: 'text-indigo-600',
      border: 'border-indigo-600 border-t-transparent',
      bgColor: 'bg-indigo-600',
    },
    secondary: {
      color: 'text-gray-600',
      border: 'border-gray-600 border-t-transparent',
      bgColor: 'bg-gray-600',
    },
    white: {
      color: 'text-white',
      border: 'border-white border-t-transparent',
      bgColor: 'bg-white',
    },
    success: {
      color: 'text-green-600',
      border: 'border-green-600 border-t-transparent',
      bgColor: 'bg-green-600',
    },
    danger: {
      color: 'text-red-600',
      border: 'border-red-600 border-t-transparent',
      bgColor: 'bg-red-600',
    },
  };

  // Individual Spinner Component
  const Spinner = ({ size, variant }) => {
    const config = sizeConfig[size];
    const colors = variantConfig[variant];

    return (
      <div className={`${config.container} inline-block`}>
        <div 
          className={`${config.spinner} border-2 rounded-full ${colors.border} animate-spin`}
        />
      </div>
    );
  };

  // Dots Loading Component
  const DotsLoader = ({ size, variant }) => {
    const config = sizeConfig[size];
    const colors = variantConfig[variant];

    return (
      <div className="flex items-center space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${colors.bgColor} opacity-70 animate-pulse`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1.5s',
              animationFillMode: 'both',
            }}
          />
        ))}
      </div>
    );
  };

  // Pulse Loading Component
  const PulseLoader = ({ size, variant }) => {
    const config = sizeConfig[size];
    const colors = variantConfig[variant];

    return (
      <div className={`${config.container} inline-block`}>
        <div 
          className={`w-full h-full rounded-full ${colors.bgColor} animate-pulse`}
        />
      </div>
    );
  };

  // Full Screen Loading Component
  const FullScreenLoader = ({ size, variant, text, showText = true }) => {
    const config = sizeConfig[size];
    const colors = variantConfig[variant];

    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Spinner size={size} variant={variant} />
          </div>
          {showText && (
            <p className={`${colors.color} ${config.text} font-medium`}>
              {text || 'Loading...'}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Loading Overlay Component
  const LoadingOverlay = ({ children, isLoading, text = 'Loading...', variant = 'primary' }) => {
    return (
      <div className="relative">
        {children}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Spinner size="lg" variant={variant} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {text}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (fullScreen) {
    return (
      <FullScreenLoader
        size={size}
        variant={variant}
        text={text}
        showText={showText}
      />
    );
  }

  if (overlay) {
    return (
      <div className={`
        absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
        flex items-center justify-center z-50
      `}>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Spinner size={size} variant={variant} />
          </div>
          {showText && (
            <p className={`text-gray-600 dark:text-gray-300 text-sm font-medium ${className}`}>
              {text || 'Loading...'}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Spinner size={size} variant={variant} />
      {showText && text && (
        <p className={`${sizeConfig[size].text} font-medium mt-2 ${variantConfig[variant].color}`}>
          {text}
        </p>
      )}
      {showLabel && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {size.charAt(0).toUpperCase() + size.slice(1)} Loading
        </p>
      )}
    </div>
  );
};

// Skeleton Loading Component
const Skeleton = ({
  width = '100%',
  height = '1rem',
  className = '',
  rounded = false,
}) => {
  return (
    <div
      className={`
        animate-pulse bg-gray-300 dark:bg-gray-700 
        ${rounded ? 'rounded-full' : 'rounded'}
        ${className}
      `}
      style={{ width, height }}
    />
  );
};

// Loading Card Component
const LoadingCard = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <div className="space-y-4">
        <Skeleton width="60%" height="1.5rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="80%" height="1rem" />
        <div className="flex space-x-2">
          <Skeleton width="80px" height="2rem" rounded />
          <Skeleton width="60px" height="2rem" rounded />
        </div>
      </div>
    </div>
  );
};

// Loading Table Component
const LoadingTable = ({ 
  rows = 5, 
  columns = 4,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Skeleton width="40%" height="1.5rem" />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  width={colIndex === 0 ? "30%" : "15%"} 
                  height="1rem" 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export convenience variants
const SmallSpinner = (props) => (
  <LoadingSpinner {...props} size="sm" />
);

const LargeSpinner = (props) => (
  <LoadingSpinner {...props} size="lg" />
);

const FullScreenLoading = (props) => (
  <LoadingSpinner {...props} fullScreen={true} />
);

const DotsLoading = ({ 
  size = 'md', 
  variant = 'primary', 
  className = '' 
}) => (
  <div className={className}>
    <DotsLoader size={size} variant={variant} />
  </div>
);

const PulseLoading = ({ 
  size = 'md', 
  variant = 'primary', 
  className = '' 
}) => (
  <div className={className}>
    <PulseLoader size={size} variant={variant} />
  </div>
);

export { 
  LoadingOverlay,
  Skeleton, 
  LoadingCard, 
  LoadingTable,
  SmallSpinner,
  LargeSpinner,
  FullScreenLoading,
  DotsLoading,
  PulseLoading
};

const LoadingOverlay = ({ children, isLoading, text = 'Loading...', variant = 'primary' }) => {
  const Spinner = ({ size, variant }) => {
    const sizeConfig = {
      lg: { container: 'w-8 h-8' },
    };
    const variantConfig = {
      primary: { color: 'text-indigo-600', border: 'border-indigo-600 border-t-transparent' },
    };

    const config = sizeConfig.lg;
    const colors = variantConfig.primary;

    return (
      <div className={`${config.container} inline-block`}>
        <div className={`${config.spinner} border-2 rounded-full ${colors.border} animate-spin`} />
      </div>
    );
  };

  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Spinner size="lg" variant={variant} />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              {text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
