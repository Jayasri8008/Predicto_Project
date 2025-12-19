import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  User,
  LoginCredentials,
  SignupData,
  ApiResponse,
  PaginatedResponse,
  Suggestion,
  SuggestionComment,
  SuggestionStats,
  Project,
  EstimationRequest,
  EstimationResult,
  DashboardMetric,
} from '../types';

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

// Response transformer for error handling
const baseQueryWithTransform = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
  transformResponse: (response: ApiResponse, meta, arg) => {
    if (!response.success) {
      throw new Error(response.message || 'API request failed');
    }
    return response;
  },
});

// Create API with RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithTransform,
  tagTypes: [
    'User',
    'Suggestions',
    'Comments',
    'Projects',
    'Estimations',
    'Dashboard',
    'Auth',
  ],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<{ user: User; token: string }, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    signup: builder.mutation<{ user: User; token: string }, SignupData>({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User', 'Auth'],
    }),

    // User profile management
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (passwords) => ({
        url: '/users/change-password',
        method: 'POST',
        body: passwords,
      }),
    }),

    // Suggestion system endpoints
    getSuggestions: builder.query<PaginatedResponse<Suggestion>, { page?: number; size?: number; filters?: any }>({
      query: (params) => ({
        url: '/suggestions',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Suggestions' as const, id })),
              { type: 'Suggestions' as const, id: 'LIST' },
            ]
          : [{ type: 'Suggestions', id: 'LIST' }],
    }),

    getSuggestion: builder.query<Suggestion, string>({
      query: (id) => `/suggestions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Suggestions', id }],
    }),

    createSuggestion: builder.mutation<Suggestion, Omit<Suggestion, 'id' | 'author' | 'upvotes' | 'downvotes' | 'comments' | 'createdAt' | 'updatedAt'>>({
      query: (suggestionData) => ({
        url: '/suggestions',
        method: 'POST',
        body: suggestionData,
      }),
      invalidatesTags: [{ type: 'Suggestions', id: 'LIST' }],
    }),

    updateSuggestion: builder.mutation<Suggestion, { id: string; data: Partial<Suggestion> }>({
      query: ({ id, data }) => ({
        url: `/suggestions/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),

    deleteSuggestion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/suggestions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),

    voteSuggestion: builder.mutation<Suggestion, { id: string; voteType: 'up' | 'down' }>({
      query: ({ id, voteType }) => ({
        url: `/suggestions/${id}/vote`,
        method: 'POST',
        body: { voteType },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),

    unvoteSuggestion: builder.mutation<Suggestion, string>({
      query: (id) => ({
        url: `/suggestions/${id}/vote`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),

    // Comment system endpoints
    getComments: builder.query<SuggestionComment[], string>({
      query: (suggestionId) => `/suggestions/${suggestionId}/comments`,
      providesTags: (result, error, suggestionId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comments' as const, id })),
              { type: 'Comments', id: `SUGGESTION_${suggestionId}` },
            ]
          : [{ type: 'Comments', id: `SUGGESTION_${suggestionId}` }],
    }),

    addComment: builder.mutation<SuggestionComment, Omit<SuggestionComment, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (commentData) => ({
        url: '/comments',
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { suggestionId }) => [
        { type: 'Comments', id: `SUGGESTION_${suggestionId}` },
        { type: 'Suggestions', id: suggestionId },
      ],
    }),

    updateComment: builder.mutation<SuggestionComment, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Comments', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),

    deleteComment: builder.mutation<void, { commentId: string; suggestionId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { commentId, suggestionId }) => [
        { type: 'Comments', id: commentId },
        { type: 'Comments', id: `SUGGESTION_${suggestionId}` },
        { type: 'Suggestions', id: suggestionId },
      ],
    }),

    // Suggestion statistics
    getSuggestionStats: builder.query<SuggestionStats, void>({
      query: () => '/suggestions/stats',
      providesTags: ['Suggestions'],
    }),

    // Project management endpoints
    getProjects: builder.query<PaginatedResponse<Project>, { page?: number; size?: number }>({
      query: (params) => ({
        url: '/projects',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Projects' as const, id })),
              { type: 'Projects' as const, id: 'LIST' },
            ]
          : [{ type: 'Projects', id: 'LIST' }],
    }),

    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),

    createProject: builder.mutation<Project, Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (projectData) => ({
        url: '/projects',
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    updateProject: builder.mutation<Project, { id: string; data: Partial<Project> }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    // Estimation system endpoints
    createEstimation: builder.mutation<EstimationResult, EstimationRequest>({
      query: (estimationData) => ({
        url: '/estimations',
        method: 'POST',
        body: estimationData,
      }),
    }),

    getEstimations: builder.query<PaginatedResponse<EstimationResult>, { page?: number; size?: number }>({
      query: (params) => ({
        url: '/estimations',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Estimations' as const, id })),
              { type: 'Estimations' as const, id: 'LIST' },
            ]
          : [{ type: 'Estimations', id: 'LIST' }],
    }),

    getEstimation: builder.query<EstimationResult, string>({
      query: (id) => `/estimations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Estimations', id }],
    }),

    // Dashboard endpoints
    getDashboardMetrics: builder.query<DashboardMetric[], { timeframe?: string }>({
      query: (params) => ({
        url: '/dashboard/metrics',
        params,
      }),
      providesTags: ['Dashboard'],
    }),

    getDashboardActivity: builder.query<any[], { limit?: number }>({
      query: (params) => ({
        url: '/dashboard/activity',
        params,
      }),
      providesTags: ['Dashboard'],
    }),

    // File upload endpoints
    uploadFile: builder.mutation<{ url: string; filename: string }, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Auth hooks
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,

  // Suggestion hooks
  useGetSuggestionsQuery,
  useGetSuggestionQuery,
  useCreateSuggestionMutation,
  useUpdateSuggestionMutation,
  useDeleteSuggestionMutation,
  useVoteSuggestionMutation,
  useUnvoteSuggestionMutation,

  // Comment hooks
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,

  // Stats hooks
  useGetSuggestionStatsQuery,

  // Project hooks
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,

  // Estimation hooks
  useCreateEstimationMutation,
  useGetEstimationsQuery,
  useGetEstimationQuery,

  // Dashboard hooks
  useGetDashboardMetricsQuery,
  useGetDashboardActivityQuery,

  // Utility hooks
  useUploadFileMutation,
} = api;

export default api;