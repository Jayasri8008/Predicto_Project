import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  trackEvent,
  startPageView,
  updateTimeOnPage,
  updateScrollDepth,
  trackInteraction,
} from '../store/slices/analyticsSlice';

const useAnalytics = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Track page view
  const trackPageView = useCallback((pageName, pageData = {}) => {
    dispatch(startPageView(pageName));
    dispatch(trackEvent({
      type: 'page_view',
      page: pageName,
      ...pageData,
      userId: user?.id,
    }));
  }, [dispatch, user]);

  // Track user interactions
  const trackUserInteraction = useCallback((interactionType, element, data = {}) => {
    dispatch(trackInteraction({
      type: interactionType,
      element,
      ...data,
    }));

    dispatch(trackEvent({
      type: 'user_interaction',
      interactionType,
      element,
      ...data,
      userId: user?.id,
    }));
  }, [dispatch, user]);

  // Track conversions
  const trackConversion = useCallback((conversionType, value = null, data = {}) => {
    dispatch(trackEvent({
      type: 'conversion',
      conversionType,
      value,
      ...data,
      userId: user?.id,
    }));
  }, [dispatch, user]);

  // Track form submissions
  const trackFormSubmission = useCallback((formName, success = true, data = {}) => {
    dispatch(trackEvent({
      type: 'form_submission',
      formName,
      success,
      ...data,
      userId: user?.id,
    }));
  }, [dispatch, user]);

  // Track search queries
  const trackSearch = useCallback((query, resultsCount = 0, filters = {}) => {
    dispatch(trackEvent({
      type: 'search',
      query,
      resultsCount,
      filters,
      userId: user?.id,
    }));
  }, [dispatch, user]);

  // Track feature usage
  const trackFeatureUsage = useCallback((featureName, action, data = {}) => {
    dispatch(trackEvent({
      type: 'feature_usage',
      featureName,
      action,
      ...data,
      userId: user?.id,
    }));
  }, [dispatch, user]);

  // Auto-track page views on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    // Track initial page load
    trackPageView(window.location.pathname);

    // Listen for navigation events (if using react-router)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackPageView]);

  // Auto-track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTimeOnPage());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Auto-track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      dispatch(updateScrollDepth(Math.round(scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  return {
    trackPageView,
    trackUserInteraction,
    trackConversion,
    trackFormSubmission,
    trackSearch,
    trackFeatureUsage,
  };
};

export default useAnalytics;
