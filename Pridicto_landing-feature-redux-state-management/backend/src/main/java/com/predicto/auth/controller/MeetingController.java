package com.predicto.auth.controller;

import com.predicto.auth.entity.Meeting;
import com.predicto.auth.repository.MeetingRepository;
import com.predicto.auth.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins = "*")
public class MeetingController {

    private final MeetingRepository meetingRepository;
    private final EmailService emailService;

    public MeetingController(MeetingRepository meetingRepository,
                             EmailService emailService) {
        this.meetingRepository = meetingRepository;
        this.emailService = emailService;
    }

    // ✅ CREATE MEETING
   @PostMapping
public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {

    System.out.println("🔥 MEETING API HIT FROM FRONTEND");

    Meeting saved = meetingRepository.save(meeting);
    System.out.println("✅ MEETING SAVED");

    try {
        System.out.println("📧 SENDING EMAIL...");
        emailService.sendMeetingConfirmation(saved);
        emailService.notifyAdmin(saved);
        System.out.println("✅ EMAIL METHOD COMPLETED");
    } catch (Exception e) {
        System.out.println("❌ EMAIL FAILED");
        e.printStackTrace();
    }

    return ResponseEntity.ok(saved);
}


    // ✅ GET ALL MEETINGS
    @GetMapping
    public ResponseEntity<?> getAllMeetings() {
        return ResponseEntity.ok(meetingRepository.findAll());
    }
}
