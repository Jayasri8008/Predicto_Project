import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useApi from '../../hooks/useApi';

// Email Verification Thunks
export const sendVerificationEmail = createAsyncThunk(
  'features/sendVerificationEmail',
  async (_, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/email-verification/send');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'features/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/email-verification/verify', { token });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  'features/resendVerificationEmail',
  async (_, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/email-verification/resend');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Password Reset Thunks
export const requestPasswordReset = createAsyncThunk(
  'features/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/password-reset/request', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const confirmPasswordReset = createAsyncThunk(
  'features/confirmPasswordReset',
  async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/password-reset/confirm', {
        token,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Profile Upload Thunks
export const uploadProfilePicture = createAsyncThunk(
  'features/uploadProfilePicture',
  async (file, { rejectWithValue }) => {
    try {
      const api = useApi();
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/user/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Search Thunks
export const searchContent = createAsyncThunk(
  'features/searchContent',
  async ({ query, type }, { rejectWithValue }) => {
    try {
      const api = useApi();
      const params = new URLSearchParams({ q: query, type });
      const response = await api.get(`/search?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Activity Thunks
export const fetchActivity = createAsyncThunk(
  'features/fetchActivity',
  async ({ filter }, { rejectWithValue }) => {
    try {
      const api = useApi();
      let endpoint = '/activity';
      if (filter && filter !== 'all') {
        endpoint = `/activity/action/${filter}`;
      }
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Sharing Thunks
export const fetchShareLinks = createAsyncThunk(
  'features/fetchShareLinks',
  async (_, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.get('/share/my-links');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createShareLink = createAsyncThunk(
  'features/createShareLink',
  async ({ entityType, entityId, description, platform }, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/share', {
        entityType,
        entityId,
        description,
        platform,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteShareLink = createAsyncThunk(
  'features/deleteShareLink',
  async (id, { rejectWithValue }) => {
    try {
      const api = useApi();
      await api.delete(`/share/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Shortcuts Thunks
export const fetchShortcuts = createAsyncThunk(
  'features/fetchShortcuts',
  async (_, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.get('/shortcuts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createShortcut = createAsyncThunk(
  'features/createShortcut',
  async ({ name, keys, action, description }, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/shortcuts', {
        name,
        keys,
        action,
        description,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteShortcut = createAsyncThunk(
  'features/deleteShortcut',
  async (id, { rejectWithValue }) => {
    try {
      const api = useApi();
      await api.delete(`/shortcuts/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// PDF Export Thunks
export const exportProjectPDF = createAsyncThunk(
  'features/exportProjectPDF',
  async (projectId, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.get(`/export/project/${projectId}/pdf`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const exportProjectsPDF = createAsyncThunk(
  'features/exportProjectsPDF',
  async (_, { rejectWithValue }) => {
    try {
      const api = useApi();
      const response = await api.post('/export/projects/pdf', {}, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  // Email Verification
  emailVerified: false,
  emailLoading: false,
  emailError: null,

  // Password Reset
  passwordResetLoading: false,
  passwordResetError: null,

  // Profile
  profileLoading: false,
  profileError: null,

  // Search
  searchResults: [],
  searchLoading: false,
  searchError: null,

  // Activity
  activities: [],
  activityLoading: false,
  activityError: null,

  // Sharing
  shares: [],
  sharingLoading: false,
  sharingError: null,

  // Shortcuts
  shortcuts: [],
  shortcutsLoading: false,
  shortcutsError: null,

  // PDF
  pdfLoading: false,
  pdfError: null,
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    resetFeatureErrors: (state) => {
      state.emailError = null;
      state.passwordResetError = null;
      state.profileError = null;
      state.searchError = null;
      state.activityError = null;
      state.sharingError = null;
      state.shortcutsError = null;
      state.pdfError = null;
    },
  },
  extraReducers: (builder) => {
    // Email Verification
    builder
      .addCase(sendVerificationEmail.pending, (state) => {
        state.emailLoading = true;
        state.emailError = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.emailLoading = false;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.emailLoading = false;
        state.emailError = action.payload?.message || 'Failed to send email';
      })
      .addCase(verifyEmail.pending, (state) => {
        state.emailLoading = true;
        state.emailError = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.emailLoading = false;
        state.emailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.emailLoading = false;
        state.emailError = action.payload?.message || 'Failed to verify email';
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.emailLoading = true;
        state.emailError = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.emailLoading = false;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.emailLoading = false;
        state.emailError = action.payload?.message || 'Failed to resend email';
      });

    // Password Reset
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.passwordResetLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload?.message || 'Failed to request reset';
      })
      .addCase(confirmPasswordReset.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.passwordResetLoading = false;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload?.message || 'Failed to reset password';
      });

    // Profile
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state) => {
        state.profileLoading = false;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload?.message || 'Failed to upload profile picture';
      });

    // Search
    builder
      .addCase(searchContent.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.data || [];
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload?.message || 'Search failed';
        state.searchResults = [];
      });

    // Activity
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.activityLoading = true;
        state.activityError = null;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.activityLoading = false;
        state.activities = action.payload.data || [];
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.activityLoading = false;
        state.activityError = action.payload?.message || 'Failed to fetch activities';
      });

    // Sharing
    builder
      .addCase(fetchShareLinks.pending, (state) => {
        state.sharingLoading = true;
        state.sharingError = null;
      })
      .addCase(fetchShareLinks.fulfilled, (state, action) => {
        state.sharingLoading = false;
        state.shares = action.payload.data || [];
      })
      .addCase(fetchShareLinks.rejected, (state, action) => {
        state.sharingLoading = false;
        state.sharingError = action.payload?.message || 'Failed to fetch shares';
      })
      .addCase(createShareLink.fulfilled, (state, action) => {
        state.shares.push(action.payload.data);
      })
      .addCase(deleteShareLink.fulfilled, (state, action) => {
        state.shares = state.shares.filter((s) => s.id !== action.payload.id);
      });

    // Shortcuts
    builder
      .addCase(fetchShortcuts.pending, (state) => {
        state.shortcutsLoading = true;
        state.shortcutsError = null;
      })
      .addCase(fetchShortcuts.fulfilled, (state, action) => {
        state.shortcutsLoading = false;
        state.shortcuts = action.payload.data || [];
      })
      .addCase(fetchShortcuts.rejected, (state, action) => {
        state.shortcutsLoading = false;
        state.shortcutsError = action.payload?.message || 'Failed to fetch shortcuts';
      })
      .addCase(createShortcut.fulfilled, (state, action) => {
        state.shortcuts.push(action.payload.data);
      })
      .addCase(deleteShortcut.fulfilled, (state, action) => {
        state.shortcuts = state.shortcuts.filter((s) => s.id !== action.payload.id);
      });

    // PDF
    builder
      .addCase(exportProjectPDF.pending, (state) => {
        state.pdfLoading = true;
        state.pdfError = null;
      })
      .addCase(exportProjectPDF.fulfilled, (state) => {
        state.pdfLoading = false;
      })
      .addCase(exportProjectPDF.rejected, (state, action) => {
        state.pdfLoading = false;
        state.pdfError = action.payload?.message || 'Failed to export PDF';
      })
      .addCase(exportProjectsPDF.pending, (state) => {
        state.pdfLoading = true;
        state.pdfError = null;
      })
      .addCase(exportProjectsPDF.fulfilled, (state) => {
        state.pdfLoading = false;
      })
      .addCase(exportProjectsPDF.rejected, (state, action) => {
        state.pdfLoading = false;
        state.pdfError = action.payload?.message || 'Failed to export PDFs';
      });
  },
});

export const { resetFeatureErrors } = featuresSlice.actions;
export default featuresSlice.reducer;
