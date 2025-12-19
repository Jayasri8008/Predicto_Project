package com.predicto.auth.dto;

import com.predicto.auth.entity.SuggestionVote;

public class SuggestionVoteDTO {

    private Long id;

    private Long suggestionId;

    private Long userId;

    private SuggestionVote.VoteType voteType;

    public SuggestionVoteDTO() {
    }

    public SuggestionVoteDTO(SuggestionVote vote) {
        this.id = vote.getId();
        this.suggestionId = vote.getSuggestion().getId();
        this.userId = vote.getUser().getId();
        this.voteType = vote.getVoteType();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public SuggestionVote.VoteType getVoteType() {
        return voteType;
    }

    public void setVoteType(SuggestionVote.VoteType voteType) {
        this.voteType = voteType;
    }
}
