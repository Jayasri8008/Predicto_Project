package com.predicto.auth.dto;

import com.predicto.auth.entity.SuggestionComment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class SuggestionCommentDTO {

    private Long id;

    @NotBlank
    @Size(max = 1000)
    private String content;

    private Long suggestionId;

    private Long userId;

    private Long parentCommentId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Boolean isEdited = false;

    private UserDTO user;

    private List<SuggestionCommentDTO> replies;

    public SuggestionCommentDTO() {
    }

    public SuggestionCommentDTO(SuggestionComment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.suggestionId = comment.getSuggestion().getId();
        this.userId = comment.getUser().getId();
        this.parentCommentId = comment.getParentCommentId();
        this.createdAt = comment.getCreatedAt();
        this.updatedAt = comment.getUpdatedAt();
        this.isEdited = comment.getIsEdited();

        if (comment.getUser() != null) {
            this.user = new UserDTO(comment.getUser());
        }

        if (comment.getReplies() != null && !comment.getReplies().isEmpty()) {
            this.replies = comment.getReplies().stream()
                    .map(SuggestionCommentDTO::new)
                    .collect(Collectors.toList());
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getSuggestionId() {
        return suggestionId;
    }

    public void setSuggestionId(Long suggestionId) {
        this.suggestionId = suggestionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(Long parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getIsEdited() {
        return isEdited;
    }

    public void setIsEdited(Boolean isEdited) {
        this.isEdited = isEdited;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public List<SuggestionCommentDTO> getReplies() {
        return replies;
    }

    public void setReplies(List<SuggestionCommentDTO> replies) {
        this.replies = replies;
    }
}
