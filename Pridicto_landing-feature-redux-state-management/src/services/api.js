import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  transformResponse: (response, meta, arg) => {
    if (!response.success) {
      throw new Error(response.message || 'API request failed');
    }
    return response;
  },
});

// Create API with RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
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
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query({
      query: () => '/auth/me',
      providesTags: ['User', 'Auth'],
    }),

    // User profile management
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation({
      query: (passwords) => ({
        url: '/users/change-password',
        method: 'POST',
        body: passwords,
      }),
    }),

    // Suggestion system endpoints
    getSuggestions: builder.query({
      query: (params = {}) => ({
        url: '/suggestions',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Suggestions', id })),
              { type: 'Suggestions', id: 'LIST' },
            ]
          : [{ type: 'Suggestions', id: 'LIST' }],
    }),

    getSuggestion: builder.query({
      query: (id) => `/suggestions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Suggestions', id }],
    }),

    createSuggestion: builder.mutation({
      query: (suggestionData) => ({
        url: '/suggestions',
        method: 'POST',
        body: suggestionData,
      }),
      invalidatesTags: [{ type: 'Suggestions', id: 'LIST' }],
    }),

    updateSuggestion: builder.mutation({
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

    deleteSuggestion: builder.mutation({
      query: (id) => ({
        url: `/suggestions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Suggestions', id },
        { type: 'Suggestions', id: 'LIST' },
      ],
    }),

    voteSuggestion: builder.mutation({
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

    unvoteSuggestion: builder.mutation({
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
    getComments: builder.query({
      query: (suggestionId) => `/suggestions/${suggestionId}/comments`,
      providesTags: (result, error, suggestionId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comments', id })),
              { type: 'Comments', id: `SUGGESTION_${suggestionId}` },
            ]
          : [{ type: 'Comments', id: `SUGGESTION_${suggestionId}` }],
    }),

    addComment: builder.mutation({
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

    updateComment: builder.mutation({
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

    deleteComment: builder.mutation({
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
    getSuggestionStats: builder.query({
      query: () => '/suggestions/stats',
      providesTags: ['Suggestions'],
    }),

    // Project management endpoints
    getProjects: builder.query({
      query: (params = {}) => ({
        url: '/projects',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Projects', id })),
              { type: 'Projects', id: 'LIST' },
            ]
          : [{ type: 'Projects', id: 'LIST' }],
    }),

    getProject: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),

    createProject: builder.mutation({
      query: (projectData) => ({
        url: '/projects',
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    updateProject: builder.mutation({
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
    createEstimation: builder.mutation({
      query: (estimationData) => ({
        url: '/estimations',
        method: 'POST',
        body: estimationData,
      }),
    }),

    getEstimations: builder.query({
      query: (params = {}) => ({
        url: '/estimations',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Estimations', id })),
              { type: 'Estimations', id: 'LIST' },
            ]
          : [{ type: 'Estimations', id: 'LIST' }],
    }),

    getEstimation: builder.query({
      query: (id) => `/estimations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Estimations', id }],
    }),

    // Dashboard endpoints
    getDashboardMetrics: builder.query({
      query: (params = {}) => ({
        url: '/dashboard/metrics',
        params,
      }),
      providesTags: ['Dashboard'],
    }),

    getDashboardActivity: builder.query({
      query: (params = {}) => ({
        url: '/dashboard/activity',
        params,
      }),
      providesTags: ['Dashboard'],
    }),

    // File upload endpoints
    uploadFile: builder.mutation({
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
  useLoginMutation: useLoginMutation,
  useSignupMutation: useSignupMutation,
  useLogoutMutation: useLogoutMutation,
  useGetCurrentUserQuery: useGetCurrentUserQuery,
  useUpdateProfileMutation: useUpdateProfileMutation,
  useChangePasswordMutation: useChangePasswordMutation,

  // Suggestion hooks
  useGetSuggestionsQuery: useGetSuggestionsQuery,
  useGetSuggestionQuery: useGetSuggestionQuery,
  useCreateSuggestionMutation: useCreateSuggestionMutation,
  useUpdateSuggestionMutation: useUpdateSuggestionMutation,
  useDeleteSuggestionMutation: useDeleteSuggestionMutation,
  useVoteSuggestionMutation: useVoteSuggestionMutation,
  useUnvoteSuggestionMutation: useUnvoteSuggestionMutation,

  // Comment hooks
  useGetCommentsQuery: useGetCommentsQuery,
  useAddCommentMutation: useAddCommentMutation,
  useUpdateCommentMutation: useUpdateCommentMutation,
  useDeleteCommentMutation: useDeleteCommentMutation,

  // Stats hooks
  useGetSuggestionStatsQuery: useGetSuggestionStatsQuery,

  // Project hooks
  useGetProjectsQuery: useGetProjectsQuery,
  useGetProjectQuery: useGetProjectQuery,
  useCreateProjectMutation: useCreateProjectMutation,
  useUpdateProjectMutation: useUpdateProjectMutation,

  // Estimation hooks
  useCreateEstimationMutation: useCreateEstimationMutation,
  useGetEstimationsQuery: useGetEstimationsQuery,
  useGetEstimationQuery: useGetEstimationQuery,

  // Dashboard hooks
  useGetDashboardMetricsQuery: useGetDashboardMetricsQuery,
  useGetDashboardActivityQuery: useGetDashboardActivityQuery,

  // Utility hooks
  useUploadFileMutation: useUploadFileMutation,
} = api;

export default api;
