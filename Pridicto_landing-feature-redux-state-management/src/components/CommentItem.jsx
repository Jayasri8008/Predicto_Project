import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment, deleteComment } from '../store/slices/suggestionSlice';
import { MessageCircle, Edit, Trash2, Save, X, User } from 'lucide-react';

const CommentItem = ({ comment, suggestionId, onReply, onEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  [1, 2, 3]
  const [editContent, setEditContent] = useState(comment.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOwner = user && comment.authorId === user.id;

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;

    try {
      await dispatch(updateComment({ commentId: comment.id, content: editContent.trim() })).unwrap();
      setIsEditing(false);
      onEdit?.();
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteComment(comment.id)).unwrap();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      setIsDeleting(false);
    }
  };

  const timeAgo = new Date(comment.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.author?.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.username}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                {comment.author?.username || 'Anonymous'}
              </span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
              {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                <span className="text-xs text-gray-400">(edited)</span>
              )}
            </div>

            {/* Actions */}
            {isOwner && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleEdit}
                  disabled={isEditing || isDeleting}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
                  title="Edit comment"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isEditing || isDeleting}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  title="Delete comment"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Comment content */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Edit your comment..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editContent.trim() || isDeleting}
                  className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {/* Reply button */}
                <button
                  onClick={() => onReply?.(comment)}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Comment</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this comment? This action cannot be undone.
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
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
