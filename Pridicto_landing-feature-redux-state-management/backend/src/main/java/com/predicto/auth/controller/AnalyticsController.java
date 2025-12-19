package com.predicto.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {
    
    private static final Logger logger = LoggerFactory.getLogger(AnalyticsController.class);
    
    // In-memory storage for analytics events (in production, use a proper database)
    private final Map<String, Object> analyticsData = new HashMap<>();
    
    public AnalyticsController() {
        // Initialize some default data
        analyticsData.put("totalEvents", 0);
        analyticsData.put("pageViews", 0);
        analyticsData.put("uniqueVisitors", 0);
        analyticsData.put("events", new java.util.ArrayList<>());
    }
    
    @PostMapping("/track")
    public ResponseEntity<?> trackEvent(@RequestBody Map<String, Object> eventData) {
        try {
            logger.info("Tracking event: {}", eventData);
            
            // Store the event
            Map<String, Object> storedEvent = new HashMap<>(eventData);
            storedEvent.put("id", System.currentTimeMillis());
            storedEvent.put("receivedAt", LocalDateTime.now().toString());
            
            // Update counters
            analyticsData.put("totalEvents", 
                ((Integer) analyticsData.get("totalEvents")) + 1);
            
            if ("page_view".equals(eventData.get("type"))) {
                analyticsData.put("pageViews", 
                    ((Integer) analyticsData.get("pageViews")) + 1);
            }
            
            // Add to events list
            ((java.util.List<Map<String, Object>>) analyticsData.get("events")).add(storedEvent);
            
            // Keep only the last 1000 events to prevent memory issues
            java.util.List<Map<String, Object>> events = 
                (java.util.List<Map<String, Object>>) analyticsData.get("events");
            if (events.size() > 1000) {
                events.remove(0);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Event tracked successfully");
            response.put("eventId", storedEvent.get("id"));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error tracking event", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to track event: " + e.getMessage()));
        }
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            logger.info("Fetching analytics dashboard");
            
            // For now, return mock data or basic analytics
            Map<String, Object> dashboardData = new HashMap<>();
            
            // Basic analytics from stored data
            dashboardData.put("pageViews", analyticsData.get("pageViews"));
            dashboardData.put("totalEvents", analyticsData.get("totalEvents"));
            dashboardData.put("uniqueVisitors", analyticsData.get("uniqueVisitors"));
            dashboardData.put("bounceRate", 45.2); // Mock data
            dashboardData.put("avgSessionDuration", 125); // Mock data in seconds
            dashboardData.put("conversionRate", 3.2); // Mock data as percentage
            
            // Mock top pages data
            dashboardData.put("topPages", java.util.Arrays.asList(
                Map.of("page", "/dashboard", "views", 156),
                Map.of("page", "/portfolio", "views", 89),
                Map.of("page", "/insights", "views", 67)
            ));
            
            // Mock user flow data
            dashboardData.put("userFlow", java.util.Arrays.asList(
                Map.of("from", "homepage", "to", "dashboard", "count", 45),
                Map.of("from", "dashboard", "to", "portfolio", "count", 23),
                Map.of("from", "portfolio", "to", "insights", "count", 12)
            ));
            
            return ResponseEntity.ok(dashboardData);
        } catch (Exception e) {
            logger.error("Error fetching dashboard", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to fetch dashboard data: " + e.getMessage()));
        }
    }
    
    @PostMapping("/session")
    public ResponseEntity<?> createSession(@RequestBody Map<String, Object> sessionData) {
        try {
            logger.info("Creating session: {}", sessionData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", "sess_" + System.currentTimeMillis());
            response.put("createdAt", LocalDateTime.now().toString());
            response.put("expiresAt", LocalDateTime.now().plusHours(1).toString());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error creating session", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to create session: " + e.getMessage()));
        }
    }
}
