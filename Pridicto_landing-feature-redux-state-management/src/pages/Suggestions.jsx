import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuggestions,
  fetchSuggestionStats,
  setFilters,
  clearError,
  setCurrentSuggestion,
  clearCurrentSuggestion
} from '../store/slices/suggestionSlice';
import SuggestionCard from '../components/SuggestionCard';
import SuggestionForm from '../components/SuggestionForm';
import SuggestionFilters from '../components/SuggestionFilters';
import SuggestionStats from '../components/SuggestionStats';
import LoadingSpinner from '../components/LoadingSpinner';
import { Plus, X } from 'lucide-react';

const Suggestions = () => {
  const dispatch = useDispatch();
  const {
    suggestions,
    loading,
    error,
    pagination,
    filters,
    stats
  } = useSelector(state => state.suggestions);
  const { isAuthenticated } = useSelector(state => state.auth);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSuggestion, setEditingSuggestion] = useState(null);

  useEffect(() => {
    dispatch(fetchSuggestions());
    if (isAuthenticated) {
      dispatch(fetchSuggestionStats());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      // Handle error display
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [error, dispatch]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(fetchSuggestions({ ...newFilters, page: 0 }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchSuggestions({ ...filters, page }));
  };

  const handleCreateSuggestion = () => {
    setEditingSuggestion(null);
    setShowCreateForm(true);
  };

  const handleEditSuggestion = (suggestion) => {
    setEditingSuggestion(suggestion);
    setShowCreateForm(true);
  };

  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingSuggestion(null);
    dispatch(clearCurrentSuggestion());
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingSuggestion(null);
    dispatch(fetchSuggestions(filters));
    if (isAuthenticated) {
      dispatch(fetchSuggestionStats());
    }
  };

  const handleViewSuggestion = (suggestion) => {
    dispatch(setCurrentSuggestion(suggestion));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Suggestions</h1>
              <p className="text-gray-600 mt-2">
                Share your ideas and help improve our platform
              </p>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleCreateSuggestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Suggestion
              </button>
            )}
          </div>

          {/* Stats */}
          {stats && <SuggestionStats stats={stats} />}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <SuggestionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => dispatch(clearError())}
                  className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingSuggestion ? 'Edit Suggestion' : 'Create New Suggestion'}
                </h3>
                <button
                  onClick={handleFormClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SuggestionForm
                suggestion={editingSuggestion}
                onSuccess={handleFormSuccess}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        )}

        {/* Suggestions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions yet</h3>
            <p className="text-gray-500 mb-4">
              {isAuthenticated
                ? "Be the first to share your ideas!"
                : "Sign in to share your suggestions."
              }
            </p>
            {isAuthenticated && (
              <button
                onClick={handleCreateSuggestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Suggestion
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onEdit={handleEditSuggestion}
                onView={handleViewSuggestion}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    i === pagination.page
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
