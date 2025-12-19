package com.predicto.auth.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider provider;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String password;

    private String firstName;
    private String lastName;

    private Boolean isActive = true;
    private Boolean emailVerified = false;
    // Security fields
    private Integer failedLoginAttempts = 0;
    private LocalDateTime lockedUntil;


    // 🔹 Getters & Setters

    public Long getId() {
        return id;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }
    // emailVerified setter
public void setEmailVerified(Boolean emailVerified) {
    this.emailVerified = emailVerified;
}

// active setter (clean JavaBeans style)
public void setActive(Boolean active) {
    this.isActive = active;
}
public Integer getFailedLoginAttempts() {
    return failedLoginAttempts;
}

public void setFailedLoginAttempts(Integer failedLoginAttempts) {
    this.failedLoginAttempts = failedLoginAttempts;
}

public LocalDateTime getLockedUntil() {
    return lockedUntil;
}

public void setLockedUntil(LocalDateTime lockedUntil) {
    this.lockedUntil = lockedUntil;
}


}
