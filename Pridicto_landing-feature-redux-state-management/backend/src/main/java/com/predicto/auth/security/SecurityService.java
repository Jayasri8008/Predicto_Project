package com.predicto.auth.security;

import com.predicto.auth.entity.User;
import com.predicto.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Enhanced Security Service for Account Lockout and Failed Login Attempts
 * Implements account lockout after multiple failed login attempts
 */
@Service
public class SecurityService {

    @Autowired
    private UserRepository userRepository;
    
    // Security configuration
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCKOUT_DURATION_MINUTES = 30;
    private static final int BACKOFF_MULTIPLIER = 2; // Doubles lockout time for repeat offenders
    
    /**
     * Check if user account is locked
     */
    public boolean isAccountLocked(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getLockedUntil() != null && LocalDateTime.now().isBefore(user.getLockedUntil());
        }
        return false;
    }
    
    /**
     * Get remaining lockout time in minutes
     */
    public long getRemainingLockoutTime(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getLockedUntil() != null && LocalDateTime.now().isBefore(user.getLockedUntil())) {
                return java.time.Duration.between(LocalDateTime.now(), user.getLockedUntil()).toMinutes();
            }
        }
        return 0;
    }
    
    /**
     * Record failed login attempt
     */
    public void recordFailedLogin(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            int currentAttempts = user.getFailedLoginAttempts() != null ? user.getFailedLoginAttempts() : 0;
            
            // Increment failed attempts
            user.setFailedLoginAttempts(currentAttempts + 1);
            
            // Check if we need to lock the account
            if (currentAttempts + 1 >= MAX_FAILED_ATTEMPTS) {
                lockAccount(user);
            }
            
            userRepository.save(user);
        }
    }
    
    /**
     * Record successful login - reset failed attempts
     */
    public void recordSuccessfulLogin(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setFailedLoginAttempts(0);
            user.setLockedUntil(null);
            userRepository.save(user);
        }
    }
    
    /**
     * Lock user account
     */
    private void lockAccount(User user) {
        int previousAttempts = user.getFailedLoginAttempts() != null ? user.getFailedLoginAttempts() : 0;
        
        // Calculate lockout duration based on number of failed attempts
        long lockoutMinutes = LOCKOUT_DURATION_MINUTES;
        if (previousAttempts > MAX_FAILED_ATTEMPTS) {
            // Increase lockout time for repeat offenders
            int multiplier = (previousAttempts - MAX_FAILED_ATTEMPTS) / MAX_FAILED_ATTEMPTS + 1;
            lockoutMinutes *= Math.min(multiplier * BACKOFF_MULTIPLIER, 8); // Cap at 8x the base duration
        }
        
        user.setLockedUntil(LocalDateTime.now().plusMinutes(lockoutMinutes));
        
        // Log security event
        System.err.println("SECURITY ALERT: Account locked for user: " + user.getEmail() + 
                          " until " + user.getLockedUntil() + " (failed attempts: " + user.getFailedLoginAttempts() + ")");
    }
    
    /**
     * Unlock account manually (for admin use)
     */
    public void unlockAccount(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setFailedLoginAttempts(0);
            user.setLockedUntil(null);
            userRepository.save(user);
            
            System.out.println("Account unlocked for user: " + email);
        }
    }
    
    /**
     * Check if email is verified
     */
    public boolean isEmailVerified(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.map(User::getEmailVerified).orElse(false);
    }
    
    /**
     * Mark email as verified
     */
    public void markEmailAsVerified(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setEmailVerified(true);
            userRepository.save(user);
        }
    }
    
    /**
     * Get security status for user
     */
    public String getSecurityStatus(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            StringBuilder status = new StringBuilder();
            
            status.append("Email verified: ").append(user.getEmailVerified() ? "Yes" : "No").append("; ");
            status.append("Failed attempts: ").append(user.getFailedLoginAttempts()).append("/").append(MAX_FAILED_ATTEMPTS).append("; ");
            
            if (user.getLockedUntil() != null && LocalDateTime.now().isBefore(user.getLockedUntil())) {
                status.append("Account locked until: ").append(user.getLockedUntil());
            } else {
                status.append("Account status: Active");
            }
            
            return status.toString();
        }
        return "User not found";
    }
}