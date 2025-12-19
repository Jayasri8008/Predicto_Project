import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:8080/api';

// Async thunks for API calls
export const fetchUserProjects = createAsyncThunk(
  'dashboard/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserActivity = createAsyncThunk(
  'dashboard/fetchActivity',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/activity`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch activity');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBillingInfo = createAsyncThunk(
  'dashboard/fetchBilling',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/billing`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch billing info');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projects: [],
  activity: [],
  billing: null,
  selectedProject: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    sortBy: 'recent',
    searchTerm: '',
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    updateFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Activity
      .addCase(fetchUserActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity = action.payload;
      })
      .addCase(fetchUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Billing
      .addCase(fetchBillingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.billing = action.payload;
      })
      .addCase(fetchBillingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProject, updateFilter, deleteProject, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
