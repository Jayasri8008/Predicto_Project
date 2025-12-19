package com.predicto.auth.service;

import com.predicto.auth.dto.SuggestionCommentDTO;
import com.predicto.auth.entity.SuggestionComment;
import com.predicto.auth.entity.User;
import com.predicto.auth.exception.ResourceNotFoundException;
import com.predicto.auth.repository.SuggestionCommentRepository;
import com.predicto.auth.repository.SuggestionRepository;
import com.predicto.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuggestionCommentService {

    @Autowired
    private SuggestionCommentRepository commentRepository;

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public SuggestionCommentDTO addComment(Long suggestionId, String content, Long userId, Long parentCommentId) {
        // Verify suggestion exists
        suggestionRepository.findById(suggestionId)
                .orElseThrow(() -> new ResourceNotFoundException("Suggestion not found"));

        // Verify user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        SuggestionComment comment = new SuggestionComment();
        comment.setContent(content);
        comment.setSuggestion(suggestionRepository.findById(suggestionId).get());
        comment.setUser(user);

        if (parentCommentId != null) {
            SuggestionComment parentComment = commentRepository.findById(parentCommentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }

        SuggestionComment savedComment = commentRepository.save(comment);
        return new SuggestionCommentDTO(savedComment);
    }

    public List<SuggestionCommentDTO> getCommentsBySuggestionId(Long suggestionId) {
        List<SuggestionComment> comments = commentRepository.findBySuggestionIdOrderByCreatedAtAsc(suggestionId);
        return comments.stream()
                .map(SuggestionCommentDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public SuggestionCommentDTO updateComment(Long commentId, String content, Long userId) {
        SuggestionComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        // Check if user owns the comment
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only edit your own comments");
        }

        comment.setContent(content);
        comment.setIsEdited(true);
        comment.setUpdatedAt(LocalDateTime.now());

        SuggestionComment updatedComment = commentRepository.save(comment);
        return new SuggestionCommentDTO(updatedComment);
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        SuggestionComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        // Check if user owns the comment
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }

    public List<SuggestionCommentDTO> getRepliesByParentCommentId(Long parentCommentId) {
        List<SuggestionComment> replies = commentRepository.findByParentComment_IdOrderByCreatedAtAsc(parentCommentId);
        return replies.stream()
                .map(SuggestionCommentDTO::new)
                .collect(Collectors.toList());
    }
}
