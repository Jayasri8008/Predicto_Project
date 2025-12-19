import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment } from '../store/slices/suggestionSlice';
import CommentItem from './CommentItem';
import { MessageCircle, Send, User } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const CommentSection = ({ suggestionId }) => {
  const dispatch = useDispatch();
  const { comments, commentError, loading } = useSelector(state => state.suggestions);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const [newComment, setNewComment] = useState('');
  const [replyToComment, setReplyToComment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    if (suggestionId) {
      dispatch(fetchComments(suggestionId));
    }
  }, [dispatch, suggestionId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setSubmitting(true);
    try {
      const commentData = {
        suggestionId,
        content: newComment.trim(),
        parentCommentId: replyToComment?.id || null
      };

      await dispatch(addComment(commentData)).unwrap();
      setNewComment('');
      setReplyToComment(null);
      setShowCommentForm(false);
      
      // Refresh comments
      dispatch(fetchComments(suggestionId));
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (comment) => {
    setReplyToComment(comment);
    setShowCommentForm(true);
    setNewComment(`@${comment.author.username} `);
  };

  const handleCancelReply = () => {
    setReplyToComment(null);
    setNewComment('');
    setShowCommentForm(false);
  };

  const handleCancel = () => {
    setShowCommentForm(false);
    setNewComment('');
    setReplyToComment(null);
  };

  const rootComments = comments.filter(comment => !comment.parentCommentId);
  const getReplies = (commentId) => {
    return comments.filter(comment => comment.parentCommentId === commentId);
  };

  if (!suggestionId) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Comments ({comments.length})
          </h3>
        </div>

        {/* Add comment button */}
        {isAuthenticated && !showCommentForm && (
          <button
            onClick={() => setShowCommentForm(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Add Comment
          </button>
        )}
      </div>

      {/* Error message */}
      {commentError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-700">{commentError}</p>
        </div>
      )}

      {/* Comment form */}
      {showCommentForm && (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          {replyToComment && (
            <div className="mb-3 p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  Replying to <strong>{replyToComment.author.username}</strong>
                </span>
                <button
                  onClick={handleCancelReply}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-blue-700 mt-1">{replyToComment.content}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmitComment}>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={replyToComment ? "Write your reply..." : "Add a comment..."}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  maxLength={1000}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {newComment.length}/1000 characters
                  </span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newComment.trim() || submitting}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <Send className="w-3 h-3 mr-1" />
                          {replyToComment ? 'Reply' : 'Comment'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Login prompt for unauthenticated users */}
      {!isAuthenticated && (
        <div className="mb-6 text-center py-8 bg-white rounded-lg border border-gray-200">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Join the conversation</h3>
          <p className="text-gray-600 mb-4">Sign in to share your thoughts and participate in discussions.</p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Share your feedback on suggestions</p>
            <p>• Ask questions and get clarification</p>
            <p>• Help improve the community</p>
          </div>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : rootComments.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
          <p className="text-gray-600">
            {isAuthenticated 
              ? "Be the first to share your thoughts on this suggestion!"
              : "Sign in to start the conversation."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rootComments.map((comment) => {
            const replies = getReplies(comment.id);
            return (
              <div key={comment.id} className="space-y-3">
                <CommentItem
                  comment={comment}
                  suggestionId={suggestionId}
                  onReply={handleReply}
                />
                {replies.length > 0 && (
                  <div className="ml-8 space-y-3">
                    {replies.map((reply) => (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        suggestionId={suggestionId}
                        onReply={handleReply}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
