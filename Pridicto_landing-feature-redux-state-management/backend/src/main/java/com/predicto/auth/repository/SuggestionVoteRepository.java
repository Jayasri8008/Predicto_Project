package com.predicto.auth.repository;

import com.predicto.auth.entity.SuggestionVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuggestionVoteRepository extends JpaRepository<SuggestionVote, Long> {

    Optional<SuggestionVote> findBySuggestionIdAndUserId(Long suggestionId, Long userId);

    boolean existsBySuggestionIdAndUserId(Long suggestionId, Long userId);

    @Query("SELECT COUNT(v) FROM SuggestionVote v WHERE v.suggestion.id = :suggestionId AND v.voteType = :voteType")
    long countBySuggestionIdAndVoteType(@Param("suggestionId") Long suggestionId, @Param("voteType") SuggestionVote.VoteType voteType);

    void deleteBySuggestionId(Long suggestionId);
}
