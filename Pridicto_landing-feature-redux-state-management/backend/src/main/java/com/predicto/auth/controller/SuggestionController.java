package com.predicto.auth.controller;

import com.predicto.auth.dto.SuggestionCommentDTO;
import com.predicto.auth.dto.SuggestionDTO;
import com.predicto.auth.dto.SuggestionVoteDTO;
import com.predicto.auth.entity.Suggestion;
import com.predicto.auth.entity.SuggestionVote;
import com.predicto.auth.service.SuggestionCommentService;
import com.predicto.auth.service.SuggestionService;
import com.predicto.auth.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/suggestions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SuggestionController {

    @Autowired
    private SuggestionService suggestionService;

    @Autowired
    private SuggestionCommentService suggestionCommentService;

    @Autowired
    private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SuggestionDTO> createSuggestion(@Valid @RequestBody SuggestionDTO suggestionDTO, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            Suggestion suggestion = new Suggestion();
            suggestion.setTitle(suggestionDTO.getTitle());
            suggestion.setDescription(suggestionDTO.getDescription());
            suggestion.setCategory(suggestionDTO.getCategory());

            Suggestion savedSuggestion = suggestionService.createSuggestion(suggestion, userId);
            SuggestionDTO responseDTO = new SuggestionDTO(savedSuggestion);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SuggestionDTO> updateSuggestion(@PathVariable Long id, @Valid @RequestBody SuggestionDTO suggestionDTO, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            Suggestion suggestionDetails = new Suggestion();
            suggestionDetails.setTitle(suggestionDTO.getTitle());
            suggestionDetails.setDescription(suggestionDTO.getDescription());
            suggestionDetails.setCategory(suggestionDTO.getCategory());

            Suggestion updatedSuggestion = suggestionService.updateSuggestion(id, suggestionDetails, userId);
            SuggestionDTO responseDTO = new SuggestionDTO(updatedSuggestion);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSuggestion(@PathVariable Long id, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            suggestionService.deleteSuggestion(id, userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuggestionDTO> getSuggestion(@PathVariable Long id, Authentication authentication) {
        try {
            Suggestion suggestion = suggestionService.findById(id);
            SuggestionDTO responseDTO = new SuggestionDTO(suggestion);

            if (authentication != null) {
                Long userId = userService.getUserIdFromAuthentication(authentication);
                Optional<SuggestionVote> userVote = suggestionService.getUserVote(id, userId);
                if (userVote.isPresent()) {
                    responseDTO.setUserVote(new SuggestionVoteDTO(userVote.get()));
                }
            }

            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<SuggestionDTO>> getAllSuggestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Authentication authentication) {

        try {
            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

            Page<Suggestion> suggestions = suggestionService.findAll(pageable);
            Page<SuggestionDTO> suggestionDTOs = suggestions.map(suggestion -> {
                SuggestionDTO dto = new SuggestionDTO(suggestion);
                if (authentication != null) {
                    Long userId = userService.getUserIdFromAuthentication(authentication);
                    Optional<SuggestionVote> userVote = suggestionService.getUserVote(suggestion.getId(), userId);
                    if (userVote.isPresent()) {
                        dto.setUserVote(new SuggestionVoteDTO(userVote.get()));
                    }
                }
                return dto;
            });

            return ResponseEntity.ok(suggestionDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<SuggestionDTO>> getUserSuggestions(Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            List<Suggestion> suggestions = suggestionService.findByUserId(userId);
            List<SuggestionDTO> suggestionDTOs = suggestions.stream()
                    .map(SuggestionDTO::new)
                    .toList();
            return ResponseEntity.ok(suggestionDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<SuggestionDTO>> getSuggestionsByStatus(@PathVariable Suggestion.SuggestionStatus status, Authentication authentication) {
        try {
            List<Suggestion> suggestions = suggestionService.findByStatus(status);
            List<SuggestionDTO> suggestionDTOs = suggestions.stream()
                    .map(suggestion -> {
                        SuggestionDTO dto = new SuggestionDTO(suggestion);
                        if (authentication != null) {
                            Long userId = userService.getUserIdFromAuthentication(authentication);
                            Optional<SuggestionVote> userVote = suggestionService.getUserVote(suggestion.getId(), userId);
                            if (userVote.isPresent()) {
                                dto.setUserVote(new SuggestionVoteDTO(userVote.get()));
                            }
                        }
                        return dto;
                    })
                    .toList();
            return ResponseEntity.ok(suggestionDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/top")
    public ResponseEntity<List<SuggestionDTO>> getTopSuggestions(@RequestParam(defaultValue = "OPEN") Suggestion.SuggestionStatus status) {
        try {
            List<Suggestion> suggestions = suggestionService.findTopSuggestions(status);
            List<SuggestionDTO> suggestionDTOs = suggestions.stream()
                    .map(SuggestionDTO::new)
                    .toList();
            return ResponseEntity.ok(suggestionDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<SuggestionDTO>> searchSuggestions(@RequestParam String keyword) {
        try {
            List<Suggestion> suggestions = suggestionService.searchSuggestions(keyword);
            List<SuggestionDTO> suggestionDTOs = suggestions.stream()
                    .map(SuggestionDTO::new)
                    .toList();
            return ResponseEntity.ok(suggestionDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/{id}/vote")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SuggestionVoteDTO> voteOnSuggestion(@PathVariable Long id, @RequestParam SuggestionVote.VoteType voteType, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            SuggestionVote vote = suggestionService.voteOnSuggestion(id, userId, voteType);
            if (vote != null) {
                SuggestionVoteDTO voteDTO = new SuggestionVoteDTO(vote);
                return ResponseEntity.ok(voteDTO);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<SuggestionCommentDTO>> getSuggestionComments(@PathVariable Long id) {
        try {
            List<SuggestionCommentDTO> comments = suggestionCommentService.getCommentsBySuggestionId(id);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/{id}/comments")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SuggestionCommentDTO> addComment(@PathVariable Long id, @Valid @RequestBody SuggestionCommentDTO commentDTO, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            SuggestionCommentDTO savedComment = suggestionCommentService.addComment(id, commentDTO.getContent(), userId, commentDTO.getParentCommentId());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/comments/{commentId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SuggestionCommentDTO> updateComment(@PathVariable Long commentId, @Valid @RequestBody SuggestionCommentDTO commentDTO, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            SuggestionCommentDTO updatedComment = suggestionCommentService.updateComment(commentId, commentDTO.getContent(), userId);
            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/comments/{commentId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, Authentication authentication) {
        try {
            Long userId = userService.getUserIdFromAuthentication(authentication);
            suggestionCommentService.deleteComment(commentId, userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getSuggestionStats() {
        try {
            long openCount = suggestionService.countByStatus(Suggestion.SuggestionStatus.PENDING);
            long inProgressCount = suggestionService.countByStatus(Suggestion.SuggestionStatus.UNDER_REVIEW);
            long implementedCount = suggestionService.countByStatus(Suggestion.SuggestionStatus.IMPLEMENTED);
            long rejectedCount = suggestionService.countByStatus(Suggestion.SuggestionStatus.REJECTED);

            return ResponseEntity.ok(new Object() {
                public final long open = openCount;
                public final long inProgress = inProgressCount;
                public final long implemented = implementedCount;
                public final long rejected = rejectedCount;
            });
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
