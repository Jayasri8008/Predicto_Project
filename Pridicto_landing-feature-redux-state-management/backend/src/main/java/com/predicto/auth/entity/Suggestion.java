package com.predicto.auth.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "suggestions")
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 200)
    @Column(name = "title")
    private String title;

    @NotBlank
    @Size(max = 2000)
    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "category")
    private String category;

    @Column(name = "tags")
    private String tags; // JSON string of tags

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private SuggestionStatus status = SuggestionStatus.PENDING;

    @Column(name = "upvotes")
    private Integer upvotes = 0;

    @Column(name = "downvotes")
    private Integer downvotes = 0;

    @Column(name = "views")
    private Integer views = 0;

    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    private SuggestionPriority priority = SuggestionPriority.MEDIUM;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "implemented_at")
    private LocalDateTime implementedAt;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "ai_score")
    private Double aiScore = 0.0; // AI relevance score

    @OneToMany(mappedBy = "suggestion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SuggestionVote> votes = new HashSet<>();

    @OneToMany(mappedBy = "suggestion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SuggestionComment> comments = new HashSet<>();

    public enum SuggestionStatus {
        PENDING,
        UNDER_REVIEW,
        APPROVED,
        IMPLEMENTED,
        REJECTED,
        DUPLICATE
    }

    public enum SuggestionPriority {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }

    public Suggestion() {
    }

    public Suggestion(String title, String description, User user) {
        this.title = title;
        this.description = description;
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public SuggestionStatus getStatus() {
        return status;
    }

    public void setStatus(SuggestionStatus status) {
        this.status = status;
    }

    public Integer getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(Integer upvotes) {
        this.upvotes = upvotes;
    }

    public Integer getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(Integer downvotes) {
        this.downvotes = downvotes;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public SuggestionPriority getPriority() {
        return priority;
    }

    public void setPriority(SuggestionPriority priority) {
        this.priority = priority;
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

    public LocalDateTime getImplementedAt() {
        return implementedAt;
    }

    public void setImplementedAt(LocalDateTime implementedAt) {
        this.implementedAt = implementedAt;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }

    public Double getAiScore() {
        return aiScore;
    }

    public void setAiScore(Double aiScore) {
        this.aiScore = aiScore;
    }

    public Set<SuggestionVote> getVotes() {
        return votes;
    }

    public void setVotes(Set<SuggestionVote> votes) {
        this.votes = votes;
    }

    public Set<SuggestionComment> getComments() {
        return comments;
    }

    public void setComments(Set<SuggestionComment> comments) {
        this.comments = comments;
    }

    // Utility methods
    public Integer getTotalVotes() {
        return upvotes - downvotes;
    }

    // Additional methods for compatibility
    public Integer getUpvoteCount() {
        return getUpvotes();
    }

    public void setUpvoteCount(Integer count) {
        setUpvotes(count);
    }

    public Integer getDownvoteCount() {
        return getDownvotes();
    }

    public void setDownvoteCount(Integer count) {
        setDownvotes(count);
    }

    public Integer getNetVotes() {
        return getTotalVotes();
    }

    public void setNetVotes(Integer votes) {
        // Set net votes by adjusting up and down votes proportionally
        if (votes >= 0) {
            setUpvotes(votes);
            setDownvotes(0);
        } else {
            setUpvotes(0);
            setDownvotes(Math.abs(votes));
        }
    }

    public void incrementViews() {
        this.views++;
    }

    public void addUpvote() {
        this.upvotes++;
    }

    public void addDownvote() {
        this.downvotes++;
    }

    public void removeUpvote() {
        if (this.upvotes > 0) {
            this.upvotes--;
        }
    }

    public void removeDownvote() {
        if (this.downvotes > 0) {
            this.downvotes--;
        }
    }
}
