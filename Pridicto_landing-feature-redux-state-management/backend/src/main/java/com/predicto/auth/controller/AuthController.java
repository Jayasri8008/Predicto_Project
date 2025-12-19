package com.predicto.auth.controller;

import com.predicto.auth.service.AuthService;
import com.predicto.auth.service.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    // ================= SEND OTP =================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {

        String email = body.get("email").trim().toLowerCase();
        otpService.generateAndSendOtp(email);

        return ResponseEntity.ok("OTP sent to email");
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {

        String email = body.get("email").trim().toLowerCase();
        String otp = body.get("otp").trim();

        otpService.verifyOtp(email, otp);

        return ResponseEntity.ok("OTP verified");
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {

        String email = body.get("email").trim().toLowerCase();
        String otp = body.get("otp").trim();
        String newPassword = body.get("password");

        // 1️⃣ Verify OTP
        otpService.verifyOtp(email, otp);

        // 2️⃣ Reset password
        authService.resetPassword(email, newPassword);

        return ResponseEntity.ok("Password reset successful");
    }

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {

        authService.signup(
                body.get("email"),
                body.get("password"),
                body.get("firstName"),
                body.get("lastName")
        );

        return ResponseEntity.ok("Signup successful");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String token = authService.login(
                body.get("email"),
                body.get("password")
        );

        return ResponseEntity.ok(Map.of("token", token));
    }
}
