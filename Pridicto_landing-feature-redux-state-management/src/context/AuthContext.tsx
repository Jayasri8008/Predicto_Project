import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector, selectAuth } from '../store';
import { 
  loadUser, 
  rehydrateFromStorage, 
  loginUser, 
  registerUser, 
  logoutUser, 
  clearAuth,
  clearError,
  updateUser
} from '../store/slices/authSlice';
import { 
  createSuccessToast, 
  createErrorToast,
  createWarningToast
} from '../store/slices/uiSlice';
import { 
  useLoginMutation,
  useSignupMutation, 
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation
} from '../services/api';
import type { User, LoginCredentials, SignupData } from '../types';

// Authentication Context Types
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Toast delay utility
const showToastAfter = (dispatch: any, delay: number, toastAction: any) => {
  setTimeout(() => {
    dispatch(toastAction);
  }, delay);
};

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  
  // RTK Query mutations
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [signupMutation, { isLoading: signupLoading }] = useSignupMutation();
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();
  const [updateProfileMutation, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  
  // Load user on mount (if token exists)
  useEffect(() => {
    const { token, user } = loadFromLocalStorage();
    if (token && !authState.user) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  // Show error toasts
  useEffect(() => {
    if (authState.error) {
      dispatch(createErrorToast('Authentication Error', authState.error));
      dispatch(clearError()); // Clear error after showing toast
    }
  }, [authState.error, dispatch]);

  // Auto-logout on token expiration
  useEffect(() => {
    if (authState.isAuthenticated && !authState.loading) {
      // Set up token refresh or expiration check
      // This is a simplified version - you might want to decode JWT tokens
      const tokenExpiration = localStorage.getItem('token_expiration');
      if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
        handleLogout();
      }
    }
  }, [authState.isAuthenticated, authState.loading]);

  // Login function
  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const result = await loginMutation(credentials).unwrap();
      
      // Update Redux state
      dispatch(loadUser());
      
      // Show success toast
      dispatch(createSuccessToast('Welcome back!', 'You have been successfully logged in.'));
      
    } catch (error: any) {
      const errorMessage = error?.message || 'Login failed. Please check your credentials.';
      dispatch(createErrorToast('Login Failed', errorMessage));
      throw new Error(errorMessage);
    }
  };

  // Signup function
  const handleSignup = async (userData: SignupData): Promise<void> => {
    try {
      const result = await signupMutation(userData).unwrap();
      
      // Update Redux state
      dispatch(loadUser());
      
      // Show success toast
      dispatch(createSuccessToast(
        'Account Created!', 
        'Welcome to Predicto.ai! Please check your email to verify your account.'
      ));
      
    } catch (error: any) {
      const errorMessage = error?.message || 'Registration failed. Please try again.';
      dispatch(createErrorToast('Registration Failed', errorMessage));
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutMutation().unwrap();
      
      // Clear auth state
      dispatch(clearAuth());
      
      // Show info toast
      dispatch(createSuccessToast('Logged Out', 'You have been successfully logged out.'));
      
    } catch (error: any) {
      // Even if server logout fails, clear local state
      dispatch(clearAuth());
      dispatch(createWarningToast('Session Ended', 'Your session has ended.'));
    }
  };

  // Update profile function
  const handleUpdateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      const result = await updateProfileMutation(userData).unwrap();
      
      // Update user in Redux state
      dispatch(updateUser(userData));
      
      // Show success toast
      dispatch(createSuccessToast('Profile Updated', 'Your profile has been successfully updated.'));
      
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update profile.';
      dispatch(createErrorToast('Update Failed', errorMessage));
      throw new Error(errorMessage);
    }
  };

  // Refresh user data
  const handleRefreshUser = async (): Promise<void> => {
    try {
      dispatch(loadUser());
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to refresh user data.';
      dispatch(createErrorToast('Refresh Failed', errorMessage));
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading || loginLoading || signupLoading || logoutLoading,
    error: authState.error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError: () => dispatch(clearError()),
    refreshUser: handleRefreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected routes
interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredRole?: User['role'];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = null,
  requiredRole,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    if (fallback) return fallback;
    // You can add router navigation here if needed
    return <div>Please log in to access this page.</div>;
  }

  // Check role permissions
  if (requiredRole && user?.role !== requiredRole) {
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
};

// HOC for role-based access
export const withRoleGuard = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: User['role'],
  fallback?: ReactNode
) => {
  return (props: P) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== requiredRole) {
      return fallback || <div>Access denied.</div>;
    }

    return <Component {...props} />;
  };
};

// Utility functions
const loadFromLocalStorage = (): { token: string | null; user: User | null } => {
  try {
    const token = localStorage.getItem('predicto_token');
    const userStr = localStorage.getItem('predicto_user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token, user };
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return { token: null, user: null };
  }
};

// Auto-cleanup function for expired tokens
export const cleanupExpiredAuth = (): void => {
  const tokenExpiration = localStorage.getItem('token_expiration');
  if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
    localStorage.removeItem('predicto_token');
    localStorage.removeItem('predicto_user');
    localStorage.removeItem('token_expiration');
  }
};

// Initialize auth cleanup on module load
if (typeof window !== 'undefined') {
  cleanupExpiredAuth();
}

export default AuthContext;