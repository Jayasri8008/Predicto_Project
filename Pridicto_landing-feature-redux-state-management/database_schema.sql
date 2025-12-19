-- Predicto.ai Authentication Database Schema
-- This schema supports user authentication with login, signup, and forgot password functionality

-- Create database
CREATE DATABASE IF NOT EXISTS predicto_auth;
USE predicto_auth;

-- Users table for storing user account information
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    email_verified BOOLEAN DEFAULT FALSE,
    account_locked BOOLEAN DEFAULT FALSE,
    account_expired BOOLEAN DEFAULT FALSE,
    credentials_expired BOOLEAN DEFAULT FALSE,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_enabled (enabled)
);

-- Password reset tokens table for forgot password functionality
CREATE TABLE password_reset_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expiry_date (expiry_date)
);

-- Email verification tokens table for account verification
CREATE TABLE email_verification_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id)
);

-- User sessions table for tracking active sessions (optional, for enhanced security)
CREATE TABLE user_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- Failed login attempts table for security (optional, for brute force protection)
CREATE TABLE failed_login_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_ip_address (ip_address),
    INDEX idx_attempted_at (attempted_at)
);

-- Insert sample admin user (password: admin123 - hashed with BCrypt)
-- Note: In production, use a proper password hashing tool
INSERT INTO users (email, password, first_name, last_name, role, email_verified, enabled) VALUES
('admin@predicto.ai', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lbdxp7Kd8dJhFQC7m', 'System', 'Administrator', 'ADMIN', TRUE, TRUE);

-- Insert sample regular user (password: user123 - hashed with BCrypt)
INSERT INTO users (email, password, first_name, last_name, role, email_verified, enabled) VALUES
('user@predicto.ai', '$2a$10$8K3lTJ8iAt6Z5EHsM8lbdxp7Kd8dJhFQC7mN.zmdr9k7uOCQb376NoUnuTJ', 'John', 'Doe', 'USER', TRUE, TRUE);

-- Create indexes for better performance
CREATE INDEX idx_users_email_enabled ON users(email, enabled);
CREATE INDEX idx_password_reset_tokens_expiry ON password_reset_tokens(expiry_date, used);
CREATE INDEX idx_email_verification_tokens_expiry ON email_verification_tokens(expiry_date, verified);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);

-- Clean up expired tokens (run this as a scheduled job)
DELIMITER //
CREATE PROCEDURE cleanup_expired_tokens()
BEGIN
    DELETE FROM password_reset_tokens WHERE expiry_date < NOW() AND used = FALSE;
    DELETE FROM email_verification_tokens WHERE expiry_date < NOW() AND verified = FALSE;
    DELETE FROM user_sessions WHERE expires_at < NOW();
END //
DELIMITER ;

-- Create view for active users
CREATE VIEW active_users AS
SELECT
    id,
    email,
    first_name,
    last_name,
    phone,
    company,
    role,
    email_verified,
    created_at,
    last_login_at
FROM users
WHERE enabled = TRUE AND account_locked = FALSE;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON predicto_auth.* TO 'predicto_user'@'localhost' IDENTIFIED BY 'your_password_here';
-- FLUSH PRIVILEGES;
