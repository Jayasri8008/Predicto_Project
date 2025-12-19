package com.predicto.auth.dto;

import com.predicto.auth.entity.Suggestion;
import com.predicto.auth.entity.Suggestion.SuggestionStatus;

import java.time.LocalDateTime;

public class SuggestionDTO {

    private Long id;

    private String title;

    private String description;

    private String category;

    private SuggestionStatus status;

    private int upvoteCount;

    private int downvoteCount;

    private int netVotes;

    private int commentCount;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UserDTO user;

    private SuggestionVoteDTO userVote;

    public SuggestionDTO() {
    }

    public SuggestionDTO(Suggestion suggestion) {
        this.id = suggestion.getId();
        this.title = suggestion.getTitle();
        this.description = suggestion.getDescription();
        this.category = suggestion.getCategory();
        this.status = suggestion.getStatus();
        this.upvoteCount = suggestion.getUpvoteCount();
        this.downvoteCount = suggestion.getDownvoteCount();
        this.netVotes = suggestion.getNetVotes();
        this.createdAt = suggestion.getCreatedAt();
        this.updatedAt = suggestion.getUpdatedAt();

        if (suggestion.getUser() != null) {
            this.user = new UserDTO(suggestion.getUser());
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public SuggestionStatus getStatus() {
        return status;
    }

    public void setStatus(SuggestionStatus status) {
        this.status = status;
    }

    public int getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(int upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public int getDownvoteCount() {
        return downvoteCount;
    }

    public void setDownvoteCount(int downvoteCount) {
        this.downvoteCount = downvoteCount;
    }

    public int getNetVotes() {
        return netVotes;
    }

    public void setNetVotes(int netVotes) {
        this.netVotes = netVotes;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
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

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public SuggestionVoteDTO getUserVote() {
        return userVote;
    }

    public void setUserVote(SuggestionVoteDTO userVote) {
        this.userVote = userVote;
    }
}
