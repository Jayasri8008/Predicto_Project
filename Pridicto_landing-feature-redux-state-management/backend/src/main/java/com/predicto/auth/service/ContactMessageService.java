package com.predicto.auth.service;

import com.predicto.auth.dto.ContactMessageRequest;
import com.predicto.auth.entity.ContactMessage;
import com.predicto.auth.repository.ContactMessageRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactMessageService(
            ContactMessageRepository repository,
            EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    public void save(ContactMessageRequest request) {

        ContactMessage msg = new ContactMessage();
        msg.setName(request.getName());
        msg.setEmail(request.getEmail());
        msg.setCompany(request.getCompany());
        msg.setMessage(request.getMessage());

        repository.save(msg);

        // Send admin email
       emailService.notifyAdmin(msg);

    }

    public List<ContactMessage> getAll() {
        return repository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
    }

    public void markAsRead(Long id) {
        ContactMessage msg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        msg.setReadStatus(true);
        repository.save(msg);
    }
}


