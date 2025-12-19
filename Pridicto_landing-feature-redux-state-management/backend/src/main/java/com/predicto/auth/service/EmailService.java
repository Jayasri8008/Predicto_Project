package com.predicto.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Predicto | Password Reset OTP");
            helper.setFrom("predictoapp3@gmail.com");

            String html = """
                <div style="font-family: Arial, sans-serif; line-height: 1.6">
                    <h2>Predicto Password Reset</h2>
                    <p>Use the following OTP to reset your password:</p>
                    <h1 style="letter-spacing: 4px;">%s</h1>
                    <p>This OTP is valid for <b>10 minutes</b>.</p>
                    <p>If you didn’t request this, you can ignore this email.</p>
                    <br/>
                    <p>— Predicto Team</p>
                </div>
            """.formatted(otp);

            helper.setText(html, true);

            mailSender.send(message);

            System.out.println("📧 OTP email sent to " + toEmail);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send OTP email");
        }
    }
}
