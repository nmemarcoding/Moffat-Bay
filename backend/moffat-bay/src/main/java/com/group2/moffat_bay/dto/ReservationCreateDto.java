package com.group2.moffat_bay.dto;

import java.time.LocalDate;

public class ReservationCreateDto {
    
    private Integer roomId;
    private Short guests;
    private LocalDate checkIn;
    private LocalDate checkOut;

    // Default constructor
    public ReservationCreateDto() {}

    // Constructor
    public ReservationCreateDto(Integer roomId, Short guests, LocalDate checkIn, LocalDate checkOut) {
        this.roomId = roomId;
        this.guests = guests;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }

    // Getters and Setters
    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public Short getGuests() {
        return guests;
    }

    public void setGuests(Short guests) {
        this.guests = guests;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }
}