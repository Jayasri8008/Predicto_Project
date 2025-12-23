package com.predicto.auth.service;

import com.predicto.auth.entity.Meeting;
import com.predicto.auth.repository.MeetingRepository;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final EmailService emailService;

    public MeetingService(MeetingRepository meetingRepository, EmailService emailService) {
        this.meetingRepository = meetingRepository;
        this.emailService = emailService;
    }

    public Meeting saveMeeting(Meeting meeting) {
        Meeting saved = meetingRepository.save(meeting);
        emailService.sendMeetingReminder(saved);
        return saved;
    }
}
