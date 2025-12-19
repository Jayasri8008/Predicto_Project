package com.predicto.auth.repository;

import com.predicto.auth.entity.Suggestion;
import com.predicto.auth.entity.Suggestion.SuggestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    List<Suggestion> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Suggestion> findByStatusOrderByCreatedAtDesc(SuggestionStatus status);

    @Query("SELECT s FROM Suggestion s WHERE s.status = :status ORDER BY s.upvotes DESC, s.createdAt DESC")
    List<Suggestion> findTopSuggestionsByStatus(@Param("status") SuggestionStatus status);

    @Query("SELECT s FROM Suggestion s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Suggestion> searchSuggestions(@Param("keyword") String keyword);

    long countByStatus(SuggestionStatus status);
}
