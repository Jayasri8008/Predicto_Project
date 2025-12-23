package com.predicto.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ContactMessageRequest {

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    // OPTIONAL
    private String company;

    @NotBlank
    private String message;

    // ---------- Getters & Setters ----------
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}

    
