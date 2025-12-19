import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteSuggestion, unvoteSuggestion, deleteSuggestion } from '../store/slices/suggestionSlice';
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, Edit, Trash2, Eye } from 'lucide-react';

const SuggestionCard = ({ suggestion, onEdit, onView, isAuthenticated }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleVote = async (voteType) => {
    if (!isAuthenticated) return;
    
    try {
      if (suggestion.userVote?.voteType === voteType) {
        await dispatch(unvoteSuggestion(suggestion.id)).unwrap();
      } else {
        await dispatch(voteSuggestion({ 
          suggestionId: suggestion.id, 
          voteType 
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteSuggestion(suggestion.id)).unwrap();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete suggestion:', error);
    }
  };

  const canEdit = user && suggestion.authorId === user.id;
  const timeAgo = new Date(suggestion.createdAt).toLocaleDateString();
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'IMPLEMENTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600" onClick={() => onView(suggestion)}>
              {suggestion.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
              {suggestion.status?.toLowerCase().replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {timeAgo}
            </span>
            {suggestion.author && (
              <span>by {suggestion.author.username}</span>
            )}
            {suggestion.tags && suggestion.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {suggestion.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    #{tag}
                  </span>
                ))}
                {suggestion.tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{suggestion.tags.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        {canEdit && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(suggestion)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit suggestion"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete suggestion"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-3">
        {suggestion.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Voting buttons */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote('UP')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                  suggestion.userVote?.voteType === 'UP'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm font-medium">{suggestion.upvotes || 0}</span>
              </button>
              <button
                onClick={() => handleVote('DOWN')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                  suggestion.userVote?.voteType === 'DOWN'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm font-medium">{suggestion.downvotes || 0}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{suggestion.upvotes || 0}</span>
              <ThumbsDown className="w-4 h-4" />
              <span className="text-sm">{suggestion.downvotes || 0}</span>
            </div>
          )}

          {/* Comments count */}
          {suggestion.comments > 0 && (
            <button
              onClick={() => onView(suggestion)}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{suggestion.comments} comments</span>
            </button>
          )}
        </div>

        {/* View details */}
        <button
          onClick={() => onView(suggestion)}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">View details</span>
        </button>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Suggestion</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this suggestion? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;