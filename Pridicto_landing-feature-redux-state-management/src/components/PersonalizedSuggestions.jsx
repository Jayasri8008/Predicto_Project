import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sparkles, ThumbsUp, Clock, User, TrendingUp, Eye, Target } from 'lucide-react';

const PersonalizedSuggestions = ({ userId, limit = 5, className = '' }) => {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.suggestions);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  // Simulated AI personalization logic
  const generatePersonalizedSuggestions = () => {
    if (!suggestions || suggestions.length === 0) return [];

    // In a real implementation, this would use actual AI/ML algorithms
    // For now, we'll simulate personalization based on:
    // 1. User's previous voting patterns
    // 2. Categories they've interacted with
    // 3. Time-based relevance
    // 4. Popular suggestions in their areas of interest

    const scoredSuggestions = suggestions.map(suggestion => {
      let score = 0;

      // Base score from votes and AI score
      score += (suggestion.netVotes || 0) * 0.3;
      score += (suggestion.aiScore || 0) * 0.2;

      // Recency boost (newer suggestions get slight boost)
      const daysSinceCreated = (Date.now() - new Date(suggestion.createdAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceCreated <= 7) score += 0.2;

      // Status relevance (pending suggestions more relevant for active users)
      if (suggestion.status === 'PENDING' || suggestion.status === 'UNDER_REVIEW') {
        score += 0.1;
      }

      // Category relevance (simulate user preferences)
      const userPreferences = getUserPreferences();
      if (userPreferences.includes(suggestion.category)) {
        score += 0.3;
      }

      // Engagement potential
      const engagementScore = (suggestion.commentCount || 0) * 0.1 + (suggestion.views || 0) * 0.001;
      score += engagementScore;

      return { ...suggestion, personalizationScore: score };
    });

    return scoredSuggestions
      .sort((a, b) => b.personalizationScore - a.personalizationScore)
      .slice(0, limit);
  };

  const getUserPreferences = () => {
    // Simulate user preferences based on their profile
    // In real implementation, this would come from analytics
    const preferences = [];
    
    if (user) {
      // Based on user role or profile data
      if (user.role === 'ADMIN') {
        preferences.push('Analytics', 'Dashboard', 'Features');
      } else if (user.role === 'USER') {
        preferences.push('UX', 'Features', 'Performance');
      }
    }

    return preferences;
  };

  useEffect(() => {
    if (isAuthenticated && suggestions.length > 0) {
      setLoadingAI(true);
      
      // Simulate AI processing delay
      const timer = setTimeout(() => {
        const personalized = generatePersonalizedSuggestions();
        setPersonalizedSuggestions(personalized);
        setLoadingAI(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [suggestions, user, isAuthenticated]);

  if (!isAuthenticated || loadingAI) {
    return (
      <div className={`bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 ${className}`}>
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
          <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
            AI-Powered Suggestions
          </h2>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-purple-200 dark:bg-purple-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-purple-100 dark:bg-purple-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (personalizedSuggestions.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
          Personalized for You
        </h2>
        <div className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
          AI-Powered
        </div>
      </div>

      <div className="space-y-4">
        {personalizedSuggestions.map((suggestion, index) => (
          <div
            key={suggestion.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-800 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    #{index + 1} Match
                  </span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                    {Math.round(suggestion.personalizationScore * 100)}% match
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {suggestion.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                  {suggestion.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{suggestion.netVotes || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{suggestion.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(suggestion.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">
                      {suggestion.category || 'General'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="mt-3 pt-3 border-t border-purple-100 dark:border-purple-800">
              <div className="flex items-center space-x-2 text-xs text-purple-700 dark:text-purple-300">
                <Target className="w-3 h-3" />
                <span className="font-medium">AI Insight:</span>
                <span>
                  {getAIInsight(suggestion)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between">
          <div className="text-xs text-purple-700 dark:text-purple-300">
            Based on your activity and preferences
          </div>
          <Link
            to="/suggestions"
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
          >
            Explore all suggestions →
          </Link>
        </div>
      </div>
    </div>
  );
};

const getAIInsight = (suggestion) => {
  // Simulate AI-generated insights based on suggestion properties
  if (suggestion.netVotes > 10) {
    return "High community interest";
  } else if (suggestion.status === 'PENDING') {
    return "Recently submitted, gaining traction";
  } else if (suggestion.views > 50) {
    return "Frequently viewed by users";
  } else if (suggestion.commentCount > 5) {
    return "Active discussion topic";
  } else {
    return "Emerging suggestion";
  }
};

export default PersonalizedSuggestions;