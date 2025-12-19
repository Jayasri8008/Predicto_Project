package com.predicto.auth.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final EmailService emailService;

    public OtpService(EmailService emailService) {
        this.emailService = emailService;
    }

    // ================= OTP STORE =================
    private static class OtpData {
        private final String otp;
        private final LocalDateTime expiry;

        private OtpData(String otp, LocalDateTime expiry) {
            this.otp = otp;
            this.expiry = expiry;
        }
    }

    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();

    // ================= OTP GENERATOR =================
    private static final String OTP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int OTP_LENGTH = 6;

    private String generateOtp() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder(OTP_LENGTH);

        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(OTP_CHARS.charAt(random.nextInt(OTP_CHARS.length())));
        }
        return otp.toString();
    }

    // ================= GENERATE & SEND OTP =================
    public void generateAndSendOtp(String email) {

        // Optional: block re-request until expiry
        OtpData existing = otpStore.get(email);
        if (existing != null && LocalDateTime.now().isBefore(existing.expiry)) {
            throw new IllegalStateException("OTP already sent. Please wait.");
        }

        String otp = generateOtp();

        otpStore.put(
                email,
                new OtpData(otp, LocalDateTime.now().plusMinutes(10))
        );

        emailService.sendOtpEmail(email, otp);

        System.out.println("✅ OTP generated and sent to " + email);
    }

    // ================= VERIFY OTP =================
    public void verifyOtp(String email, String otp) {

        OtpData data = otpStore.get(email);

        if (data == null) {
            throw new IllegalArgumentException("OTP not found or already used");
        }

        if (LocalDateTime.now().isAfter(data.expiry)) {
            otpStore.remove(email);
            throw new IllegalArgumentException("OTP expired");
        }

        if (!data.otp.equalsIgnoreCase(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        // OTP verified → remove
        otpStore.remove(email);

        System.out.println("✅ OTP verified for " + email);
    }
}
