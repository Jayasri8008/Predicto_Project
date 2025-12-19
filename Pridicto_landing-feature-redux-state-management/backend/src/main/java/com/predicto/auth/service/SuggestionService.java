package com.predicto.auth.service;

import com.predicto.auth.entity.Suggestion;
import com.predicto.auth.entity.SuggestionVote;
import com.predicto.auth.entity.User;
import com.predicto.auth.exception.ResourceNotFoundException;
import com.predicto.auth.repository.SuggestionRepository;
import com.predicto.auth.repository.SuggestionVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SuggestionService {

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private SuggestionVoteRepository suggestionVoteRepository;

    @Autowired
    private UserService userService;

    public Suggestion createSuggestion(Suggestion suggestion, Long userId) {
        User user = userService.findById(userId);
        suggestion.setUser(user);
        return suggestionRepository.save(suggestion);
    }

    public Suggestion updateSuggestion(Long id, Suggestion suggestionDetails, Long userId) {
        Suggestion suggestion = findById(id);

        // Check if user owns the suggestion
        if (!suggestion.getUser().getId().equals(userId)) {
            throw new RuntimeException("User not authorized to update this suggestion");
        }

        suggestion.setTitle(suggestionDetails.getTitle());
        suggestion.setDescription(suggestionDetails.getDescription());
        suggestion.setCategory(suggestionDetails.getCategory());

        return suggestionRepository.save(suggestion);
    }

    public void deleteSuggestion(Long id, Long userId) {
        Suggestion suggestion = findById(id);

        // Check if user owns the suggestion
        if (!suggestion.getUser().getId().equals(userId)) {
            throw new RuntimeException("User not authorized to delete this suggestion");
        }

        suggestionRepository.delete(suggestion);
    }

    public Suggestion findById(Long id) {
        return suggestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Suggestion not found with id: " + id));
    }

    public Page<Suggestion> findAll(Pageable pageable) {
        return suggestionRepository.findAll(pageable);
    }

    public List<Suggestion> findByUserId(Long userId) {
        return suggestionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Suggestion> findByStatus(Suggestion.SuggestionStatus status) {
        return suggestionRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    public List<Suggestion> findTopSuggestions(Suggestion.SuggestionStatus status) {
        return suggestionRepository.findTopSuggestionsByStatus(status);
    }

    public List<Suggestion> searchSuggestions(String keyword) {
        return suggestionRepository.searchSuggestions(keyword);
    }

    @Transactional
    public SuggestionVote voteOnSuggestion(Long suggestionId, Long userId, SuggestionVote.VoteType voteType) {
        Suggestion suggestion = findById(suggestionId);
        User user = userService.findById(userId);

        Optional<SuggestionVote> existingVote = suggestionVoteRepository.findBySuggestionIdAndUserId(suggestionId, userId);

        if (existingVote.isPresent()) {
            SuggestionVote vote = existingVote.get();
            SuggestionVote.VoteType oldVoteType = vote.getVoteType();

            if (oldVoteType == voteType) {
                // User is removing their vote
                suggestionVoteRepository.delete(vote);
                updateVoteCounts(suggestion);
                return null;
            } else {
                // User is changing their vote
                vote.setVoteType(voteType);
                SuggestionVote savedVote = suggestionVoteRepository.save(vote);
                updateVoteCounts(suggestion);
                return savedVote;
            }
        } else {
            // New vote
            SuggestionVote newVote = new SuggestionVote(suggestion, user, voteType);
            SuggestionVote savedVote = suggestionVoteRepository.save(newVote);
            updateVoteCounts(suggestion);
            return savedVote;
        }
    }

    private void updateVoteCounts(Suggestion suggestion) {
        long upvoteCount = suggestionVoteRepository.countBySuggestionIdAndVoteType(suggestion.getId(), SuggestionVote.VoteType.UPVOTE);
        long downvoteCount = suggestionVoteRepository.countBySuggestionIdAndVoteType(suggestion.getId(), SuggestionVote.VoteType.DOWNVOTE);

        suggestion.setUpvoteCount((int) upvoteCount);
        suggestion.setDownvoteCount((int) downvoteCount);
        suggestion.setNetVotes((int) (upvoteCount - downvoteCount));

        suggestionRepository.save(suggestion);
    }

    public Optional<SuggestionVote> getUserVote(Long suggestionId, Long userId) {
        return suggestionVoteRepository.findBySuggestionIdAndUserId(suggestionId, userId);
    }

    public long countByStatus(Suggestion.SuggestionStatus status) {
        return suggestionRepository.countByStatus(status);
    }
}
