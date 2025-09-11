package com.group2.moffat_bay.dto;

import java.time.LocalDate;

public class ReservationDto {

    private Long reservationId;
    private Integer roomId;
    private String roomNumber;
    private String bedType;
    private Short guests;
    private LocalDate checkIn;
    private LocalDate checkOut;

    public ReservationDto() { }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getBedType() {
        return bedType;
    }

    public void setBedType(String bedType) {
        this.bedType = bedType;
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
