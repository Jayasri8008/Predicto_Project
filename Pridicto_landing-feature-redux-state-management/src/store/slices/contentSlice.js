import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for content management
export const fetchServices = createAsyncThunk(
  'content/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/content/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTestimonials = createAsyncThunk(
  'content/fetchTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/content/testimonials');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPortfolio = createAsyncThunk(
  'content/fetchPortfolio',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/content/portfolio');
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogPosts = createAsyncThunk(
  'content/fetchBlogPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/content/blog?${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitContactForm = createAsyncThunk(
  'content/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/content/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit contact form');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  services: [],
  testimonials: [],
  portfolio: [],
  blogPosts: [],
  faqs: [],
  loading: {
    services: false,
    testimonials: false,
    portfolio: false,
    blogPosts: false,
    contact: false,
  },
  error: {
    services: null,
    testimonials: null,
    portfolio: null,
    blogPosts: null,
    contact: null,
  },
  // Static content fallbacks
  staticContent: {
    hero: {
      title: "Transform Your Business with AI-Powered Solutions",
      subtitle: "Get accurate project estimations, expert consulting, and cutting-edge AI implementations",
      ctaText: "Get Started Today",
      backgroundImage: "/assets/hero-bg.jpg"
    },
    features: [
      {
        id: 1,
        title: "Project Estimation",
        description: "Accurate cost and timeline predictions using advanced AI algorithms",
        icon: "📊",
        link: "/services/project-estimation"
      },
      {
        id: 2,
        title: "Business Consulting",
        description: "Strategic guidance to optimize your business processes and growth",
        icon: "🎯",
        link: "/services/consulting"
      },
      {
        id: 3,
        title: "AI Solutions",
        description: "Custom AI implementations tailored to your specific needs",
        icon: "🤖",
        link: "/services/ai-solutions"
      }
    ],
    stats: [
      { label: "Projects Completed", value: "500+", icon: "📈" },
      { label: "Client Satisfaction", value: "98%", icon: "⭐" },
      { label: "Years Experience", value: "10+", icon: "🏆" },
      { label: "Countries Served", value: "25+", icon: "🌍" }
    ]
  }
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearError: (state, action) => {
      const { key } = action.payload;
      state.error[key] = null;
    },
    updateStaticContent: (state, action) => {
      state.staticContent = { ...state.staticContent, ...action.payload };
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload };
      }
    },
    removeService: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
    },
    addTestimonial: (state, action) => {
      state.testimonials.push(action.payload);
    },
    updateTestimonial: (state, action) => {
      const index = state.testimonials.findIndex(testimonial => testimonial.id === action.payload.id);
      if (index !== -1) {
        state.testimonials[index] = { ...state.testimonials[index], ...action.payload };
      }
    },
    removeTestimonial: (state, action) => {
      state.testimonials = state.testimonials.filter(testimonial => testimonial.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Services
      .addCase(fetchServices.pending, (state) => {
        state.loading.services = true;
        state.error.services = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading.services = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading.services = false;
        state.error.services = action.payload;
      })
      // Testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading.testimonials = true;
        state.error.testimonials = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading.testimonials = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading.testimonials = false;
        state.error.testimonials = action.payload;
      })
      // Portfolio
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading.portfolio = true;
        state.error.portfolio = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading.portfolio = false;
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading.portfolio = false;
        state.error.portfolio = action.payload;
      })
      // Blog Posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading.blogPosts = true;
        state.error.blogPosts = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading.blogPosts = false;
        state.blogPosts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading.blogPosts = false;
        state.error.blogPosts = action.payload;
      })
      // Contact Form
      .addCase(submitContactForm.pending, (state) => {
        state.loading.contact = true;
        state.error.contact = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading.contact = false;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading.contact = false;
        state.error.contact = action.payload;
      });
  },
});

export const {
  clearError,
  updateStaticContent,
  addService,
  updateService,
  removeService,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
} = contentSlice.actions;

export default contentSlice.reducer;
