import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteSuggestion, unvoteSuggestion } from '../store/slices/suggestionSlice';
import { ThumbsUp, ThumbsDown, Loader } from 'lucide-react';

const VoteButtons = ({ suggestionId, upvotes = 0, downvotes = 0, userVote, size = 'md', showLabels = false, onVoteChange }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [votingState, setVotingState] = useState('idle'); // 'idle', 'upvoting', 'downvoting'
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [displayUserVote, setDisplayUserVote] = useState(userVote);

  const handleVote = async (voteType) => {
    if (!isAuthenticated || votingState !== 'idle') return;

    setVotingState(voteType === 'UP' ? 'upvoting' : 'downvoting');

    try {
      if (displayUserVote?.voteType === voteType) {
        // Remove existing vote
        const result = await dispatch(unvoteSuggestion(suggestionId)).unwrap();
        
        // Update display counts optimistically
        if (voteType === 'UP') {
          setDisplayUpvotes(prev => Math.max(0, prev - 1));
        } else {
          setDisplayDownvotes(prev => Math.max(0, prev - 1));
        }
        setDisplayUserVote(null);
        
        if (onVoteChange) {
          onVoteChange({
            upvotes: voteType === 'UP' ? displayUpvotes - 1 : displayUpvotes,
            downvotes: voteType === 'DOWN' ? displayDownvotes - 1 : displayDownvotes,
            userVote: null
          });
        }
      } else {
        // Add new vote or change existing vote
        const result = await dispatch(voteSuggestion({ suggestionId, voteType })).unwrap();
        
        // Update display counts optimistically
        if (voteType === 'UP') {
          const prevUserVote = displayUserVote?.voteType === 'DOWN' ? displayDownvotes + 1 : displayDownvotes;
          setDisplayUpvotes(prev => prev + 1);
          setDisplayDownvotes(displayUserVote?.voteType === 'DOWN' ? prevUserVote - 1 : prevUserVote);
        } else {
          const prevUserVote = displayUserVote?.voteType === 'UP' ? displayUpvotes + 1 : displayUpvotes;
          setDisplayDownvotes(prev => prev + 1);
          setDisplayUpvotes(displayUserVote?.voteType === 'UP' ? prevUserVote - 1 : prevUserVote);
        }
        setDisplayUserVote({ voteType });
        
        if (onVoteChange) {
          onVoteChange({
            upvotes: voteType === 'UP' ? displayUpvotes + 1 : (displayUserVote?.voteType === 'DOWN' ? displayUpvotes + 1 : displayUpvotes),
            downvotes: voteType === 'DOWN' ? displayDownvotes + 1 : (displayUserVote?.voteType === 'UP' ? displayDownvotes + 1 : displayDownvotes),
            userVote: { voteType }
          });
        }
      }
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setVotingState('idle');
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'px-2 py-1 text-xs',
          icon: 'w-3 h-3',
          count: 'text-xs'
        };
      case 'lg':
        return {
          button: 'px-4 py-2 text-base',
          icon: 'w-6 h-6',
          count: 'text-base'
        };
      default:
        return {
          button: 'px-3 py-1.5 text-sm',
          icon: 'w-4 h-4',
          count: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const isVoting = votingState !== 'idle';

  return (
    <div className="flex items-center space-x-2">
      {/* Upvote button */}
      <button
        onClick={() => handleVote('UP')}
        disabled={!isAuthenticated || isVoting}
        className={`
          inline-flex items-center rounded-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${sizeClasses.button}
          ${displayUserVote?.voteType === 'UP'
            ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-700'
          }
          ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isVoting && votingState === 'upvoting' ? 'opacity-75' : ''}
        `}
        title={!isAuthenticated ? 'Please log in to vote' : (displayUserVote?.voteType === 'UP' ? 'Remove upvote' : 'Upvote')}
      >
        {isVoting && votingState === 'upvoting' ? (
          <Loader className={`${sizeClasses.icon} mr-1 animate-spin`} />
        ) : (
          <ThumbsUp className={`${sizeClasses.icon} mr-1`} />
        )}
        {showLabels && <span>Upvote</span>}
        <span className={`${sizeClasses.count} font-semibold`}>
          {displayUpvotes}
        </span>
      </button>

      {/* Downvote button */}
      <button
        onClick={() => handleVote('DOWN')}
        disabled={!isAuthenticated || isVoting}
        className={`
          inline-flex items-center rounded-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          ${sizeClasses.button}
          ${displayUserVote?.voteType === 'DOWN'
            ? 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200' 
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-700'
          }
          ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isVoting && votingState === 'downvoting' ? 'opacity-75' : ''}
        `}
        title={!isAuthenticated ? 'Please log in to vote' : (displayUserVote?.voteType === 'DOWN' ? 'Remove downvote' : 'Downvote')}
      >
        {isVoting && votingState === 'downvoting' ? (
          <Loader className={`${sizeClasses.icon} mr-1 animate-spin`} />
        ) : (
          <ThumbsDown className={`${sizeClasses.icon} mr-1`} />
        )}
        {showLabels && <span>Downvote</span>}
        <span className={`${sizeClasses.count} font-semibold`}>
          {displayDownvotes}
        </span>
      </button>

      {/* Score indicator */}
      {size === 'lg' && (
        <div className="flex items-center ml-4 text-sm text-gray-500">
          <span>Score: </span>
          <span className={`font-semibold ml-1 ${
            displayUpvotes - displayDownvotes > 0 ? 'text-green-600' : 
            displayUpvotes - displayDownvotes < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {displayUpvotes - displayDownvotes}
          </span>
        </div>
      )}

      {/* Login prompt for unauthenticated users */}
      {!isAuthenticated && (
        <div className="text-xs text-gray-500 italic">
          Log in to vote
        </div>
      )}
    </div>
  );
};

export default VoteButtons;