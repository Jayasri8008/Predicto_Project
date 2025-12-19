// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

// Suggestion System Types
export interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  comments: number;
  author: User;
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedEffort?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuggestionComment {
  id: string;
  content: string;
  author: User;
  suggestionId: string;
  parentId?: string;
  replies?: SuggestionComment[];
  createdAt: string;
  updatedAt: string;
}

export interface SuggestionStats {
  totalSuggestions: number;
  pendingSuggestions: number;
  approvedSuggestions: number;
  totalVotes: number;
  totalComments: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
}

// UI State Types
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  timestamp: number;
}

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  toasts: ToastMessage[];
  loading: {
    global: boolean;
    components: Record<string, boolean>;
  };
  modals: {
    isOpen: boolean;
    type: string | null;
    data?: any;
  };
  breadcrumbs?: Array<{ label: string; path?: string }>;
  pageTransition?: { from: string; to: string; type: string };
}

// Component Props Types
export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date';
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
  };
  options?: Array<{ value: string; label: string }>;
}

export interface FormData {
  [key: string]: any;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T = any> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

// Navigation and Routing Types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: User['role'][];
}

// Analytics and Tracking Types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  userId?: string;
  properties?: Record<string, any>;
}

// Project and Estimation Types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost?: number;
  actualCost?: number;
  estimatedDuration?: number;
  actualDuration?: number;
  progress: number;
  owner: User;
  team: User[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstimationRequest {
  projectType: string;
  complexity: 'simple' | 'medium' | 'complex' | 'enterprise';
  features: string[];
  timeline: string;
  budget?: number;
  teamSize?: number;
  technologies: string[];
  requirements: string;
}

export interface EstimationResult {
  id: string;
  requestId: string;
  estimatedCost: number;
  estimatedDuration: number;
  confidence: number;
  breakdown: {
    development: number;
    design: number;
    testing: number;
    deployment: number;
    maintenance: number;
  };
  recommendations: string[];
  createdAt: string;
}

// Dashboard and Metrics Types
export interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: string;
  color: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }>;
}

// Error Boundary Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Export utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;