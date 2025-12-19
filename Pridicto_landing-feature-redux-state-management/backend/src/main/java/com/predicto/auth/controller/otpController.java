package com.predicto.auth.controller;

import com.predicto.auth.service.OtpService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/otp")
@CrossOrigin(origins = "http://localhost:5173")
public class otpController {

    private final OtpService otpService;

    public otpController(OtpService otpService) {
        this.otpService = otpService;
    }

    // ✅ SEND OTP
    @PostMapping("/send")
    public void sendOtp(@RequestBody Map<String, String> body) {
        otpService.generateAndSendOtp(body.get("email"));
    }

    // ✅ VERIFY OTP ONLY (NO RESET HERE)
    @PostMapping("/verify")
    public void verifyOtp(@RequestBody Map<String, String> body) {
        otpService.verifyOtp(
                body.get("email"),
                body.get("otp")
        );
    }
}
