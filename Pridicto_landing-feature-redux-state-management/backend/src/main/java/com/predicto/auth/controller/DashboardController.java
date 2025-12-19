package com.predicto.auth.controller;

import com.predicto.auth.entity.User;
import com.predicto.auth.repository.UserRepository;
import com.predicto.auth.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final UserRepository userRepository;

    public DashboardController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {

        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
            return ResponseEntity.badRequest().body("User not authenticated");
        }

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        User user = userRepository.findById(principal.getId()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("provider", user.getProvider());
        profile.put("isActive", user.getIsActive());
        profile.put("emailVerified", user.getEmailVerified());

        return ResponseEntity.ok(profile);
    }
}
