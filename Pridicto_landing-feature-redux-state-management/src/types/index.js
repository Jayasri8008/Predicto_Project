// User and Authentication Types
export const User = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  company: '',
  avatar: '',
  role: 'user',
  isEmailVerified: false,
  createdAt: '',
  updatedAt: '',
};

export const AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const LoginCredentials = {
  email: '',
  password: '',
};

export const SignupData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  company: '',
};

// Suggestion System Types
export const Suggestion = {
  id: '',
  title: '',
  description: '',
  category: '',
  status: 'pending',
  upvotes: 0,
  downvotes: 0,
  userVote: null,
  comments: 0,
  author: User,
  tags: [],
  priority: 'medium',
  estimatedEffort: '',
  createdAt: '',
  updatedAt: '',
};

export const SuggestionComment = {
  id: '',
  content: '',
  author: User,
  suggestionId: '',
  parentId: '',
  replies: [],
  createdAt: '',
  updatedAt: '',
};

export const SuggestionStats = {
  totalSuggestions: 0,
  pendingSuggestions: 0,
  approvedSuggestions: 0,
  totalVotes: 0,
  totalComments: 0,
  topCategories: [],
};

// UI State Types
export const ToastMessage = {
  id: '',
  type: 'info',
  title: '',
  message: '',
  duration: 5000,
  timestamp: 0,
};

export const UIState = {
  theme: 'system',
  sidebarOpen: false,
  toasts: [],
  loading: {
    global: false,
    components: {},
  },
  modals: {
    isOpen: false,
    type: null,
    data: null,
  },
  breadcrumbs: [],
  pageTransition: null,
};

// Component Props Types
export const ComponentWithChildren = {
  children: null,
};

export const LoadingState = {
  isLoading: false,
  error: null,
};

// Form Types
export const FormField = {
  name: '',
  label: '',
  type: 'text',
  placeholder: '',
  required: false,
  validation: {
    minLength: null,
    maxLength: null,
    pattern: null,
    custom: null,
  },
  options: [],
};

export const FormData = {};

// API Response Types
export const ApiResponse = {
  success: false,
  data: null,
  message: '',
  errors: [],
};

export const PaginatedResponse = {
  content: [],
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  first: true,
  last: true,
  numberOfElements: 0,
};

// Navigation and Routing Types
export const NavigationItem = {
  id: '',
  label: '',
  path: '',
  icon: '',
  children: [],
  requiresAuth: false,
  roles: [],
};

// Analytics and Tracking Types
export const AnalyticsEvent = {
  event: '',
  category: '',
  action: '',
  label: '',
  value: 0,
  timestamp: 0,
  userId: '',
  properties: {},
};

// Project and Estimation Types
export const Project = {
  id: '',
  name: '',
  description: '',
  status: 'planning',
  priority: 'medium',
  estimatedCost: 0,
  actualCost: 0,
  estimatedDuration: 0,
  actualDuration: 0,
  progress: 0,
  owner: User,
  team: [],
  startDate: '',
  endDate: '',
  createdAt: '',
  updatedAt: '',
};

export const EstimationRequest = {
  projectType: '',
  complexity: 'medium',
  features: [],
  timeline: '',
  budget: 0,
  teamSize: 0,
  technologies: [],
  requirements: '',
};

export const EstimationResult = {
  id: '',
  requestId: '',
  estimatedCost: 0,
  estimatedDuration: 0,
  confidence: 0,
  breakdown: {
    development: 0,
    design: 0,
    testing: 0,
    deployment: 0,
    maintenance: 0,
  },
  recommendations: [],
  createdAt: '',
};

// Dashboard and Metrics Types
export const DashboardMetric = {
  id: '',
  title: '',
  value: 0,
  change: {
    value: 0,
    type: 'increase',
    period: '',
  },
  icon: '',
  color: '',
};

export const ChartData = {
  labels: [],
  datasets: [],
};

// Error Boundary Types
export const ErrorBoundaryState = {
  hasError: false,
  error: null,
  errorInfo: null,
};

// Search and Filter Types
export const SearchFilters = {
  query: '',
  category: '',
  status: '',
  dateRange: {
    start: '',
    end: '',
  },
  tags: [],
  sortBy: '',
  sortOrder: 'asc',
};