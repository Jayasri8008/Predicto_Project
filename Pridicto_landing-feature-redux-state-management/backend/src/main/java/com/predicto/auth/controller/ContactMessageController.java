package com.predicto.auth.controller;
import com.predicto.auth.dto.ContactMessageRequest;
import com.predicto.auth.entity.ContactMessage;
import com.predicto.auth.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    // PUBLIC API
    @PostMapping
    public ResponseEntity<String> submit(
            @Valid @RequestBody ContactMessageRequest request) {

        service.save(request);
        return ResponseEntity.ok("Message sent successfully");
    }

    // ADMIN API
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<ContactMessage> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id) {
        service.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}

    

