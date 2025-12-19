package com.predicto.auth.repository;

import com.predicto.auth.entity.SuggestionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuggestionCommentRepository extends JpaRepository<SuggestionComment, Long> {

    List<SuggestionComment> findBySuggestionIdOrderByCreatedAtAsc(Long suggestionId);

    List<SuggestionComment> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<SuggestionComment> findByParentCommentIsNullAndSuggestionIdOrderByCreatedAtAsc(Long suggestionId);

    List<SuggestionComment> findByParentComment_IdOrderByCreatedAtAsc(Long parentCommentId);

    @Query("SELECT COUNT(c) FROM SuggestionComment c WHERE c.suggestion.id = :suggestionId")
    long countBySuggestionId(@Param("suggestionId") Long suggestionId);

    void deleteBySuggestionId(Long suggestionId);
}
