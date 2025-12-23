package com.predicto.auth.service;

import com.predicto.auth.entity.ContactMessage;
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

    // ==========================
    // OTP EMAIL (already used)
    // ==========================
    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Predicto | Password Reset OTP");
            helper.setFrom("predictoapp3@gmail.com");

            String html = """
                <div style="font-family: Arial, sans-serif;">
                    <h2>Password Reset OTP</h2>
                    <h1>%s</h1>
                    <p>Valid for 10 minutes</p>
                </div>
            """.formatted(otp);

            helper.setText(html, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }

    // ==========================
    // CONTACT FORM → ADMIN EMAIL
    // ==========================
    public void notifyAdmin(ContactMessage msg) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo("admin@predicto.ai");   // change if needed
            helper.setSubject("New Contact Message | Predicto");
            helper.setFrom("predictoapp3@gmail.com");

            String html = """
                <div style="font-family: Arial, sans-serif; line-height: 1.6">
                    <h2>New Contact Message</h2>
                    <p><b>Name:</b> %s</p>
                    <p><b>Email:</b> %s</p>
                    <p><b>Company:</b> %s</p>
                    <p><b>Message:</b></p>
                    <p>%s</p>
                </div>
            """.formatted(
                    msg.getName(),
                    msg.getEmail(),
                    msg.getCompany() == null ? "N/A" : msg.getCompany(),
                    msg.getMessage()
            );

            helper.setText(html, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send contact email", e);
        }
    }
}
