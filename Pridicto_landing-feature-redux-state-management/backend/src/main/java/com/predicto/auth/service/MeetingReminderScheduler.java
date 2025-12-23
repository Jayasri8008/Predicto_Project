package com.predicto.auth.service;

import com.predicto.auth.entity.Meeting;
import com.predicto.auth.repository.MeetingRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class MeetingReminderScheduler {

    private final MeetingRepository repository;
    private final EmailService emailService;

    public MeetingReminderScheduler(MeetingRepository repository,
                                    EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    // runs every minute
    @Scheduled(cron = "0 * * * * *")
    public void sendMeetingReminders() {

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now().withSecond(0).withNano(0);

        List<Meeting> meetings = repository.findAll();

        for (Meeting meeting : meetings) {
            if (meeting.getMeetingDate().equals(today)
                && meeting.getMeetingTime().equals(now)) {

                emailService.sendMeetingReminder(meeting);
            }
        }
    }
}
