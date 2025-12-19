package com.predicto.auth.controller;

import com.predicto.auth.security.RateLimitingFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Development Controller for testing and debugging
 * Provides endpoints to manage rate limiting and other development features
 */
@RestController
@RequestMapping("/dev")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DevController {

    @Autowired
    private RateLimitingFilter rateLimitingFilter;

    /**
     * Clear rate limit for a specific IP address
     */
    @PostMapping("/clear-rate-limit")
    public ResponseEntity<?> clearRateLimit(@RequestParam String ip) {
        try {
            rateLimitingFilter.clearRateLimit(ip);
            return ResponseEntity.ok().body("{\"message\": \"Rate limit cleared for IP: " + ip + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Failed to clear rate limit: " + e.getMessage() + "\"}");
        }
    }

    /**
     * Get rate limit status for a specific IP address
     */
    @GetMapping("/rate-limit-status")
    public ResponseEntity<?> getRateLimitStatus(@RequestParam String ip) {
        try {
            String status = rateLimitingFilter.getRateLimitStatus(ip);
            return ResponseEntity.ok().body("{\"ip\": \"" + ip + "\", \"status\": \"" + status + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Failed to get rate limit status: " + e.getMessage() + "\"}");
        }
    }

    /**
     * Clear rate limit for localhost (0:0:0:0:0:0:0:1)
     */
    @PostMapping("/clear-localhost-rate-limit")
    public ResponseEntity<?> clearLocalhostRateLimit() {
        try {
            rateLimitingFilter.clearRateLimit("0:0:0:0:0:0:0:1");
            rateLimitingFilter.clearRateLimit("127.0.0.1");
            return ResponseEntity.ok().body("{\"message\": \"Localhost rate limit cleared\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Failed to clear localhost rate limit: " + e.getMessage() + "\"}");
        }
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok().body("{\"status\": \"OK\", \"message\": \"Development endpoints are working\"}");
    }
}