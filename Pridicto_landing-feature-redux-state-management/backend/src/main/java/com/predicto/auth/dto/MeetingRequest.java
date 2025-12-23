package com.predicto.auth.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class MeetingRequest {

    private String name;
    private String email;
    private LocalDate date;
    private LocalTime time;

    // ===== GETTERS =====

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    // ===== SETTERS =====

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}


