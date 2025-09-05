package com.group2.moffat_bay.dto;

import java.math.BigDecimal;

import com.group2.moffat_bay.model.Room;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RoomDto {
    private Integer roomId;

    @NotBlank
    private String roomNumber;

    @NotBlank
    private String bedType;

    @NotNull @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal pricePerNight;

    @NotNull @Min(1)
    private Integer maxGuests;

    public RoomDto() {}

    public RoomDto(Room room) {
        this.roomId = room.getRoomId();
        this.roomNumber = room.getRoomNumber();
        this.bedType = room.getBedType();
        this.pricePerNight = room.getPricePerNight();
        this.maxGuests = room.getMaxGuests();
    }

    // getters and setters
    public Integer getRoomId() { return roomId; }
    public void setRoomId(Integer roomId) { this.roomId = roomId; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getBedType() { return bedType; }
    public void setBedType(String bedType) { this.bedType = bedType; }

    public BigDecimal getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; }

    public Integer getMaxGuests() { return maxGuests; }
    public void setMaxGuests(Integer maxGuests) { this.maxGuests = maxGuests; }
}
