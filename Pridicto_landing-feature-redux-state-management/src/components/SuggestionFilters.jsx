import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SuggestionFilters = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsExpanded(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    handleInputChange('search', value);
    // Debounced search
    setTimeout(() => {
      onFilterChange({ ...localFilters, search: value });
    }, 300);
  };

  const hasActiveFilters = localFilters.search || localFilters.status;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Main search bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search suggestions..."
            value={localFilters.search}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
            hasActiveFilters || isExpanded
              ? 'text-blue-700 bg-blue-50 border-blue-300'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Active
            </span>
          )}
        </button>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={localFilters.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IMPLEMENTED">Implemented</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={localFilters.sortBy}
                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="createdAt">Date Created</option>
                <option value="upvotes">Most Upvoted</option>
                <option value="title">Title</option>
                <option value="comments">Most Commented</option>
              </select>
            </div>

            {/* Sort order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <select
                value={localFilters.sortOrder}
                onChange={(e) => handleInputChange('sortOrder', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Filter actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsExpanded(false);
                setLocalFilters(filters);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick filter chips */}
      {!isExpanded && hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {localFilters.search && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Search: "{localFilters.search}"
              <button
                onClick={() => {
                  handleInputChange('search', '');
                  onFilterChange({ ...localFilters, search: '' });
                }}
                className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {localFilters.status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Status: {localFilters.status.toLowerCase().replace('_', ' ')}
              <button
                onClick={() => {
                  handleInputChange('status', '');
                  onFilterChange({ ...localFilters, status: '' });
                }}
                className="ml-1 inline-flex items-center p-0.5 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionFilters;
