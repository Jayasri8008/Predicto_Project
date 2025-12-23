package com.predicto.auth.service;

import com.predicto.auth.entity.ContactMessage;
import com.predicto.auth.entity.Meeting;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.hibernate.annotations.Synchronize;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ==========================
    // 1️⃣ OTP EMAIL
    // ==========================
    @Async
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
    // 2️⃣ MEETING CONFIRMATION → USER
    // ==========================
    @Async
    public void sendMeetingConfirmation(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(meeting.getEmail());
            helper.setSubject("Predicto | Meeting Scheduled");
            helper.setFrom("predictoapp3@gmail.com");

            String html = """
                <div style="font-family: Arial, sans-serif; line-height: 1.6">
                    <h2>Meeting Scheduled Successfully</h2>
                    <p>Hi <b>%s</b>,</p>
                    <p>Your meeting has been scheduled.</p>

                    <p><b>Date:</b> %s</p>
                    <p><b>Time:</b> %s</p>

                    <p>You will receive a reminder at the meeting time.</p>
                    <br/>
                    <p>– Predicto Team</p>
                </div>
            """.formatted(
                    meeting.getName(),
                    meeting.getMeetingDate(),
                    meeting.getMeetingTime()
            );

            helper.setText(html, true);
            mailSender.send(message);

            System.out.println("📧 User meeting confirmation sent");

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send meeting confirmation email", e);
        }
    }

    // ==========================
    // 3️⃣ MEETING NOTIFICATION → ADMIN (NEW)

    // ==========================
    @Async
    public void notifyAdmin(Meeting meeting) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo("admin@predicto.ai"); // 🔁 change if needed
            helper.setSubject("New Meeting Scheduled | Predicto");
            helper.setFrom("predictoapp3@gmail.com");

            String html = """
                <div style="font-family: Arial, sans-serif; line-height: 1.6">
                    <h2>New Meeting Scheduled</h2>

                    <p><b>Name:</b> %s</p>
                    <p><b>Email:</b> %s</p>
                    <p><b>Date:</b> %s</p>
                    <p><b>Time:</b> %s</p>
                </div>
            """.formatted(
                    meeting.getName(),
                    meeting.getEmail(),
                    meeting.getMeetingDate(),
                    meeting.getMeetingTime()
            );

            helper.setText(html, true);
            mailSender.send(message);

            System.out.println("📧 Admin notified about meeting");

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to notify admin about meeting", e);
        }
    }

    // ==========================
    // 4️⃣ CONTACT FORM → ADMIN
    // ==========================
    @Async
    public void notifyAdmin(ContactMessage msg) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo("admin@predicto.ai");
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

    // ==========================
    // 5️⃣ MEETING REMINDER → USER (SCHEDULER)
    // ==========================
    @Async
    public void sendMeetingReminder(Meeting meeting) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(meeting.getEmail());
        message.setSubject("Meeting Reminder");
        message.setText(
            "Hi " + meeting.getName() + ",\n\n" +
            "You have a scheduled meeting now.\n\n" +
            "Time: " + meeting.getMeetingTime() + "\n\n" +
            "– Predicto Team"
        );

        mailSender.send(message);
        System.out.println("⏰ Meeting reminder sent");
    }
}
