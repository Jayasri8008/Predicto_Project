package com.predicto.auth.service;

import com.predicto.auth.entity.User;
import com.predicto.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService;

    // ================= SIGNUP =================
    public void signup(String email, String password, String firstName, String lastName) {

        email = email.trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(email.split("@")[0]);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setActive(true);
        user.setEmailVerified(false);

        userRepository.save(user);
    }

    // ================= LOGIN =================
    public String login(String email, String password) {

        email = email.trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // If you later add JWT, generate token here
        return "LOGIN_SUCCESS";
    }

    // ================= RESET PASSWORD =================
    public void resetPassword(String email, String newPassword) {

        email = email.trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ================= SEND OTP =================
    public void sendResetOtp(String email) {

        email = email.trim().toLowerCase();

        userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email not registered"));

        otpService.generateAndSendOtp(email);
    }
}
