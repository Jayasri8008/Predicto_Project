import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchSuggestions = createAsyncThunk(
  'suggestions/fetchSuggestions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/suggestions', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch suggestions');
    }
  }
);

export const fetchSuggestionById = createAsyncThunk(
  'suggestions/fetchSuggestionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/suggestions/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch suggestion');
    }
  }
);

export const createSuggestion = createAsyncThunk(
  'suggestions/createSuggestion',
  async (suggestionData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/suggestions', suggestionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create suggestion');
    }
  }
);

export const updateSuggestion = createAsyncThunk(
  'suggestions/updateSuggestion',
  async ({ id, suggestionData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/suggestions/${id}`, suggestionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update suggestion');
    }
  }
);

export const deleteSuggestion = createAsyncThunk(
  'suggestions/deleteSuggestion',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/suggestions/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete suggestion');
    }
  }
);

export const voteSuggestion = createAsyncThunk(
  'suggestions/voteSuggestion',
  async ({ suggestionId, voteType }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/suggestions/${suggestionId}/vote`, { voteType });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to vote on suggestion');
    }
  }
);

export const unvoteSuggestion = createAsyncThunk(
  'suggestions/unvoteSuggestion',
  async (suggestionId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/suggestions/${suggestionId}/vote`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove vote');
    }
  }
);

export const fetchComments = createAsyncThunk(
  'suggestions/fetchComments',
  async (suggestionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/suggestions/${suggestionId}/comments`);
      return { suggestionId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const addComment = createAsyncThunk(
  'suggestions/addComment',
  async ({ suggestionId, content, parentCommentId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/suggestions/${suggestionId}/comments`, { content, parentCommentId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const updateComment = createAsyncThunk(
  'suggestions/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/suggestions/comments/${commentId}`, { content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'suggestions/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/suggestions/comments/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

export const fetchSuggestionStats = createAsyncThunk(
  'suggestions/fetchSuggestionStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/suggestions/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

// Initial state
const initialState = {
  suggestions: [],
  currentSuggestion: null,
  comments: [],
  stats: null,
  loading: false,
  error: null,
  commentError: null,
  filters: {
    search: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },
};

// Slice
const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCommentError: (state) => {
      state.commentError = null;
    },
    setCurrentSuggestion: (state, action) => {
      state.currentSuggestion = action.payload;
    },
    clearCurrentSuggestion: (state) => {
      state.currentSuggestion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch suggestions
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.content || action.payload;
        state.pagination = {
          page: action.payload.pageable?.pageNumber || 0,
          size: action.payload.pageable?.pageSize || 10,
          totalPages: action.payload.totalPages || 0,
          totalElements: action.payload.totalElements || 0,
        };
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch suggestion by ID
      .addCase(fetchSuggestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSuggestion = action.payload;
      })
      .addCase(fetchSuggestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create suggestion
      .addCase(createSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions.unshift(action.payload);
        state.pagination.totalElements += 1;
      })
      .addCase(createSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update suggestion
      .addCase(updateSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        if (state.currentSuggestion?.id === action.payload.id) {
          state.currentSuggestion = action.payload;
        }
      })
      .addCase(updateSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete suggestion
      .addCase(deleteSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = state.suggestions.filter(s => s.id !== action.payload);
        state.pagination.totalElements -= 1;
        if (state.currentSuggestion?.id === action.payload) {
          state.currentSuggestion = null;
        }
      })
      .addCase(deleteSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Vote suggestion
      .addCase(voteSuggestion.fulfilled, (state, action) => {
        const suggestion = state.suggestions.find(s => s.id === action.payload.id);
        if (suggestion) {
          suggestion.upvotes = action.payload.upvotes;
          suggestion.downvotes = action.payload.downvotes;
          suggestion.userVote = action.payload.userVote;
        }
        if (state.currentSuggestion?.id === action.payload.id) {
          state.currentSuggestion.upvotes = action.payload.upvotes;
          state.currentSuggestion.downvotes = action.payload.downvotes;
          state.currentSuggestion.userVote = action.payload.userVote;
        }
      })

      // Unvote suggestion
      .addCase(unvoteSuggestion.fulfilled, (state, action) => {
        const suggestion = state.suggestions.find(s => s.id === action.payload.id);
        if (suggestion) {
          suggestion.upvotes = action.payload.upvotes;
          suggestion.downvotes = action.payload.downvotes;
          suggestion.userVote = action.payload.userVote;
        }
        if (state.currentSuggestion?.id === action.payload.id) {
          state.currentSuggestion.upvotes = action.payload.upvotes;
          state.currentSuggestion.downvotes = action.payload.downvotes;
          state.currentSuggestion.userVote = action.payload.userVote;
        }
      })

      // Fetch comments
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (action.payload.suggestionId) {
          state.comments = action.payload.comments;
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentError = action.payload;
      })

      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        // Update comment count in suggestions
        const suggestion = state.suggestions.find(s => s.id === action.payload.suggestionId);
        if (suggestion) {
          suggestion.comments = (suggestion.comments || 0) + 1;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.commentError = action.payload;
      })

      // Update comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.commentError = action.payload;
      })

      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c.id !== action.payload);
        // Update comment count in suggestions
        const suggestion = state.suggestions.find(s => s.id === action.payload.suggestionId);
        if (suggestion && suggestion.comments > 0) {
          suggestion.comments -= 1;
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.commentError = action.payload;
      })

      // Fetch stats
      .addCase(fetchSuggestionStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const {
  setFilters,
  clearError,
  clearCommentError,
  setCurrentSuggestion,
  clearCurrentSuggestion,
} = suggestionSlice.actions;

export default suggestionSlice.reducer;
