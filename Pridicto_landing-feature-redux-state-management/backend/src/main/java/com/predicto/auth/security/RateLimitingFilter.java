package com.predicto.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Rate Limiting Filter for Authentication Endpoints
 * Implements token bucket algorithm for rate limiting
 */
@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(RateLimitingFilter.class);
    
    // Rate limiting configuration
    private static final int MAX_ATTEMPTS_PER_15_MIN = 5; // Max login attempts per 15 minutes
    private static final int MAX_OTP_REQUESTS_PER_HOUR = 3; // Max OTP requests per hour
    private static final long RATE_LIMIT_WINDOW_MINUTES = 15;
    private static final long OTP_WINDOW_MINUTES = 60;
    
    // Store request counts per IP address
    private final ConcurrentHashMap<String, RequestCounter> loginAttempts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, RequestCounter> otpRequests = new ConcurrentHashMap<>();
    
    private static class RequestCounter {
        private final AtomicInteger count = new AtomicInteger(0);
        private volatile LocalDateTime windowStart = LocalDateTime.now();
        
        public boolean isWindowExpired(long windowMinutes) {
            return LocalDateTime.now().isAfter(windowStart.plusMinutes(windowMinutes));
        }
        
        public void resetWindow() {
            windowStart = LocalDateTime.now();
            count.set(0);
        }
        
        public int incrementAndGet() {
            return count.incrementAndGet();
        }
        
        public int getCount() {
            return count.get();
        }
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String clientIP = getClientIP(request);
        String requestURI = request.getRequestURI();
        
        // Development bypass: Skip rate limiting for localhost during development
        if (clientIP.equals("127.0.0.1") || clientIP.equals("0:0:0:0:0:0:0:1")) {
            logger.debug("Rate limiting bypassed for localhost IP: {}", clientIP);
        } else {
            // Apply rate limiting only to authentication endpoints
            if (requestURI.startsWith("/auth/")) {
                if (requestURI.endsWith("/login")) {
                    if (!isRateLimitAllowed(clientIP, loginAttempts, MAX_ATTEMPTS_PER_15_MIN, RATE_LIMIT_WINDOW_MINUTES)) {
                        response.setStatus(429);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\": \"Too many login attempts. Please try again after 15 minutes.\"}");
                        logger.warn("Rate limit exceeded for login from IP: {}", clientIP);
                        return;
                    }
                } else if (requestURI.endsWith("/register") || requestURI.endsWith("/resend-otp")) {
                    if (!isRateLimitAllowed(clientIP, otpRequests, MAX_OTP_REQUESTS_PER_HOUR, OTP_WINDOW_MINUTES)) {
                        response.setStatus(429);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\": \"Too many OTP requests. Please try again after 1 hour.\"}");
                        logger.warn("OTP rate limit exceeded from IP: {}", clientIP);
                        return;
                    }
                }
            }
        }
        
        filterChain.doFilter(request, response);
    }
    
    private boolean isRateLimitAllowed(String clientIP, ConcurrentHashMap<String, RequestCounter> counterMap, 
                                     int maxAttempts, long windowMinutes) {
        RequestCounter counter = counterMap.computeIfAbsent(clientIP, k -> new RequestCounter());
        
        synchronized (counter) {
            if (counter.isWindowExpired(windowMinutes)) {
                counter.resetWindow();
            }
            
            int currentCount = counter.incrementAndGet();
            
            if (currentCount > maxAttempts) {
                logger.warn("Rate limit exceeded for IP: {} (attempts: {})", clientIP, currentCount);
                return false;
            }
            
            return true;
        }
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
    
    // Method to clear rate limit for a specific IP (for testing or admin purposes)
    public void clearRateLimit(String clientIP) {
        loginAttempts.remove(clientIP);
        otpRequests.remove(clientIP);
        logger.info("Rate limit cleared for IP: {}", clientIP);
    }
    
    // Method to get current rate limit status for an IP
    public String getRateLimitStatus(String clientIP) {
        RequestCounter loginCounter = loginAttempts.get(clientIP);
        RequestCounter otpCounter = otpRequests.get(clientIP);
        
        int loginCount = loginCounter != null ? loginCounter.getCount() : 0;
        int otpCount = otpCounter != null ? otpCounter.getCount() : 0;
        
        return String.format("Login attempts: %d/%d, OTP requests: %d/%d", 
                           loginCount, MAX_ATTEMPTS_PER_15_MIN, otpCount, MAX_OTP_REQUESTS_PER_HOUR);
    }
}