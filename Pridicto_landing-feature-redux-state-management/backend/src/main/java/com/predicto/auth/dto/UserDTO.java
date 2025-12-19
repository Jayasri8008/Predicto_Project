package com.predicto.auth.dto;

import com.predicto.auth.entity.User;

public class UserDTO {

    private Long id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private Boolean isActive;
    private Boolean emailVerified;
    private String provider; // ✅ matches User.provider

    // No-args constructor
    public UserDTO() {
    }

    // Entity → DTO constructor
    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.isActive = user.getIsActive();
        this.emailVerified = user.getEmailVerified();
        this.provider = user.getProvider().name(); // ✅ FIXED
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public String getProvider() {
        return provider;
    }
}
