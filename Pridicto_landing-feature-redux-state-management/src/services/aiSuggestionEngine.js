/**
 * AI-Powered Suggestion Engine
 * Provides personalized suggestion recommendations based on user behavior,
 * preferences, and collaborative filtering
 */

class AISuggestionEngine {
  constructor() {
    this.userProfiles = new Map();
    this.suggestionPatterns = new Map();
    this.collaborativeMatrix = new Map();
  }

  /**
   * Generate personalized suggestions for a user
   * @param {Object} user - User object with preferences and history
   * @param {Array} suggestions - All available suggestions
   * @param {Object} userBehavior - User interaction history
   * @returns {Array} Ranked and personalized suggestions
   */
  generatePersonalizedSuggestions(user, suggestions, userBehavior = {}) {
    if (!user || !suggestions || suggestions.length === 0) {
      return [];
    }

    // Build user profile if not exists
    if (!this.userProfiles.has(user.id)) {
      this.userProfiles.set(user.id, this.buildUserProfile(user, userBehavior));
    }

    const userProfile = this.userProfiles.get(user.id);
    const scoredSuggestions = suggestions.map(suggestion => {
      const score = this.calculateSuggestionScore(suggestion, userProfile, userBehavior);
      return { ...suggestion, aiScore: score, personalizedScore: score };
    });

    return this.rankSuggestions(scoredSuggestions, userProfile);
  }

  /**
   * Build user profile based on behavior and preferences
   * @param {Object} user - User object
   * @param {Object} behavior - User interaction history
   * @returns {Object} User profile
   */
  buildUserProfile(user, behavior) {
    const profile = {
      userId: user.id,
      preferences: {
        categories: new Set(),
        keywords: new Set(),
        timePatterns: [],
        engagementLevel: 'medium'
      },
      behavior: {
        votes: [],
        comments: [],
        views: [],
        timeSpent: 0,
        interactionCount: 0
      },
      recommendations: {
        lastUpdated: new Date(),
        preferredSuggestionTypes: [],
        avoidSuggestions: []
      }
    };

    // Extract preferences from behavior
    this.extractPreferencesFromBehavior(behavior, profile);

    // Add user role-based preferences
    this.addRoleBasedPreferences(user, profile);

    return profile;
  }

  /**
   * Extract user preferences from interaction history
   * @param {Object} behavior - User behavior data
   * @param {Object} profile - User profile to update
   */
  extractPreferencesFromBehavior(behavior, profile) {
    const { votes, comments, views, timeSpent } = behavior;

    // Analyze voting patterns
    if (votes && votes.length > 0) {
      votes.forEach(vote => {
        profile.behavior.votes.push(vote);
        if (vote.suggestion) {
          profile.preferences.categories.add(vote.suggestion.category);
          this.extractKeywords(vote.suggestion.title + ' ' + vote.suggestion.description, profile.preferences.keywords);
        }
      });
    }

    // Analyze comment patterns
    if (comments && comments.length > 0) {
      comments.forEach(comment => {
        profile.behavior.comments.push(comment);
        if (comment.suggestion) {
          profile.preferences.categories.add(comment.suggestion.category);
          this.extractKeywords(comment.content, profile.preferences.keywords);
        }
      });
    }

    // Analyze viewing patterns
    if (views && views.length > 0) {
      profile.behavior.views = views;
      profile.behavior.timeSpent = timeSpent || 0;
    }

    // Determine engagement level
    const totalInteractions = profile.behavior.votes.length + profile.behavior.comments.length;
    if (totalInteractions > 50) profile.preferences.engagementLevel = 'high';
    else if (totalInteractions > 20) profile.preferences.engagementLevel = 'medium';
    else profile.preferences.engagementLevel = 'low';
  }

  /**
   * Add role-based preferences to user profile
   * @param {Object} user - User object
   * @param {Object} profile - User profile to update
   */
  addRoleBasedPreferences(user, profile) {
    switch (user.role) {
      case 'ADMIN':
        profile.preferences.categories.add('Analytics');
        profile.preferences.categories.add('Dashboard');
        profile.preferences.categories.add('Features');
        profile.preferences.categories.add('Performance');
        break;
      case 'USER':
        profile.preferences.categories.add('UX');
        profile.preferences.categories.add('Features');
        profile.preferences.categories.add('Interface');
        break;
      case 'PREMIUM':
        profile.preferences.categories.add('Advanced Features');
        profile.preferences.categories.add('Customization');
        profile.preferences.categories.add('Analytics');
        break;
      default:
        profile.preferences.categories.add('General');
    }
  }

  /**
   * Extract keywords from text
   * @param {string} text - Text to analyze
   * @param {Set} keywordSet - Set to add keywords to
   */
  extractKeywords(text, keywordSet) {
    if (!text) return;
    
    const keywords = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    keywords.forEach(keyword => keywordSet.add(keyword));
  }

  /**
   * Calculate AI score for a suggestion based on user profile
   * @param {Object} suggestion - Suggestion to score
   * @param {Object} userProfile - User profile
   * @param {Object} userBehavior - User behavior
   * @returns {number} Score between 0 and 1
   */
  calculateSuggestionScore(suggestion, userProfile, userBehavior) {
    let score = 0;

    // Base score from votes and popularity
    score += Math.min((suggestion.netVotes || 0) / 100, 0.3);

    // Category preference match
    if (userProfile.preferences.categories.has(suggestion.category)) {
      score += 0.4;
    }

    // Keyword relevance
    const suggestionText = (suggestion.title + ' ' + suggestion.description).toLowerCase();
    let keywordMatch = 0;
    userProfile.preferences.keywords.forEach(keyword => {
      if (suggestionText.includes(keyword)) {
        keywordMatch += 0.1;
      }
    });
    score += Math.min(keywordMatch, 0.3);

    // Recency bonus
    const daysSinceCreated = (Date.now() - new Date(suggestion.createdAt)) / (1000 * 60 * 60 * 24);
    if (daysSinceCreated <= 7) score += 0.2;
    else if (daysSinceCreated <= 30) score += 0.1;

    // Status relevance
    if (suggestion.status === 'PENDING' || suggestion.status === 'UNDER_REVIEW') {
      score += 0.1;
    }

    // Engagement potential
    const engagementScore = Math.min((suggestion.commentCount || 0) / 20, 0.2);
    score += engagementScore;

    // User-specific adjustments
    score += this.getUserSpecificAdjustments(suggestion, userProfile, userBehavior);

    return Math.min(score, 1.0); // Cap at 1.0
  }

  /**
   * Apply user-specific adjustments to suggestion score
   * @param {Object} suggestion - Suggestion
   * @param {Object} userProfile - User profile
   * @param {Object} userBehavior - User behavior
   * @returns {number} Adjustment score
   */
  getUserSpecificAdjustments(suggestion, userProfile, userBehavior) {
    let adjustment = 0;

    // If user has already interacted with similar suggestions
    const similarInteraction = userProfile.behavior.votes.find(vote => 
      vote.suggestion && this.areSuggestionsSimilar(vote.suggestion, suggestion)
    );
    if (similarInteraction) {
      adjustment += similarInteraction.voteType === 'UPVOTE' ? 0.1 : -0.05;
    }

    // Engagement level adjustment
    switch (userProfile.preferences.engagementLevel) {
      case 'high':
        adjustment += 0.1; // Show more diverse suggestions
        break;
      case 'low':
        adjustment -= 0.05; // Focus on safer, popular choices
        break;
    }

    return adjustment;
  }

  /**
   * Check if two suggestions are similar
   * @param {Object} suggestion1 - First suggestion
   * @param {Object} suggestion2 - Second suggestion
   * @returns {boolean} Whether suggestions are similar
   */
  areSuggestionsSimilar(suggestion1, suggestion2) {
    if (suggestion1.category === suggestion2.category) return true;
    
    const text1 = (suggestion1.title + ' ' + suggestion1.description).toLowerCase();
    const text2 = (suggestion2.title + ' ' + suggestion2.description).toLowerCase();
    
    // Simple similarity check - could be enhanced with more sophisticated NLP
    return text1.includes('dashboard') && text2.includes('dashboard') ||
           text1.includes('analytics') && text2.includes('analytics') ||
           text1.includes('feature') && text2.includes('feature');
  }

  /**
   * Rank suggestions based on scores and diversity
   * @param {Array} suggestions - Scored suggestions
   * @param {Object} userProfile - User profile
   * @returns {Array} Ranked suggestions
   */
  rankSuggestions(suggestions, userProfile) {
    // Sort by score
    const sorted = suggestions.sort((a, b) => b.aiScore - a.aiScore);

    // Apply diversity to avoid showing too many similar suggestions
    return this.ensureDiversity(sorted, userProfile);
  }

  /**
   * Ensure diversity in suggestion recommendations
   * @param {Array} suggestions - Sorted suggestions
   * @param {Object} userProfile - User profile
   * @returns {Array} Diverse suggestions
   */
  ensureDiversity(suggestions, userProfile) {
    const diverse = [];
    const categoriesUsed = new Set();

    for (const suggestion of suggestions) {
      if (diverse.length >= 10) break; // Limit to top 10

      const category = suggestion.category || 'General';
      
      // Allow some repetition but prioritize diversity
      if (!categoriesUsed.has(category) || diverse.length < 5) {
        diverse.push(suggestion);
        categoriesUsed.add(category);
      }
    }

    return diverse;
  }

  /**
   * Update user profile based on new interaction
   * @param {number} userId - User ID
   * @param {Object} interaction - New interaction data
   */
  updateUserProfile(userId, interaction) {
    if (!this.userProfiles.has(userId)) return;

    const profile = this.userProfiles.get(userId);
    
    // Update behavior
    if (interaction.type === 'vote') {
      profile.behavior.votes.push(interaction.data);
    } else if (interaction.type === 'comment') {
      profile.behavior.comments.push(interaction.data);
    }

    // Update preferences
    if (interaction.suggestion) {
      profile.preferences.categories.add(interaction.suggestion.category);
      this.extractKeywords(
        interaction.suggestion.title + ' ' + interaction.suggestion.description,
        profile.preferences.keywords
      );
    }

    profile.recommendations.lastUpdated = new Date();
  }

  /**
   * Get trending suggestions based on user community
   * @param {Array} suggestions - All suggestions
   * @param {number} limit - Maximum number of suggestions
   * @returns {Array} Trending suggestions
   */
  getTrendingSuggestions(suggestions, limit = 5) {
    const trending = suggestions
      .filter(s => s.status === 'PENDING' || s.status === 'UNDER_REVIEW')
      .map(suggestion => {
        const velocity = (suggestion.netVotes || 0) + (suggestion.commentCount || 0) * 2;
        const daysSinceCreated = (Date.now() - new Date(suggestion.createdAt)) / (1000 * 60 * 60 * 24);
        const trendScore = velocity / Math.max(daysSinceCreated, 1);
        
        return { ...suggestion, trendScore };
      })
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit);

    return trending;
  }

  /**
   * Get contextual suggestions based on current page/context
   * @param {Array} suggestions - All suggestions
   * @param {string} context - Current page context
   * @param {Object} userProfile - User profile
   * @returns {Array} Contextual suggestions
   */
  getContextualSuggestions(suggestions, context, userProfile) {
    const contextKeywords = this.getContextKeywords(context);
    
    const contextual = suggestions
      .map(suggestion => {
        let contextualScore = 0;
        const text = (suggestion.title + ' ' + suggestion.description).toLowerCase();
        
        contextKeywords.forEach(keyword => {
          if (text.includes(keyword)) {
            contextualScore += 1;
          }
        });

        return { ...suggestion, contextualScore };
      })
      .filter(s => s.contextualScore > 0)
      .sort((a, b) => b.contextualScore - a.contextualScore)
      .slice(0, 5);

    return contextual;
  }

  /**
   * Get keywords for a specific context
   * @param {string} context - Page context
   * @returns {Array} Context keywords
   */
  getContextKeywords(context) {
    const contextMap = {
      dashboard: ['dashboard', 'analytics', 'chart', 'metric', 'kpi', 'widget'],
      portfolio: ['portfolio', 'project', 'case study', 'showcase', 'work'],
      insights: ['insight', 'data', 'analysis', 'trend', 'pattern'],
      services: ['service', 'feature', 'tool', 'solution', 'platform'],
      comparison: ['compare', 'versus', 'vs', 'difference', 'alternative']
    };

    return contextMap[context] || contextMap['dashboard'];
  }
}

// Export singleton instance
export default new AISuggestionEngine();