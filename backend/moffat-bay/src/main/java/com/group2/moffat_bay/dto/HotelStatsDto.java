package com.group2.moffat_bay.dto;

public class HotelStatsDto {
    private Integer totalRooms;
    private Integer availableRooms;
    private Integer totalGuests;
    private Double averageRating;
    private Integer yearsInBusiness;

    public HotelStatsDto() {}

    public HotelStatsDto(Integer totalRooms, Integer availableRooms, Integer totalGuests, 
                        Double averageRating, Integer yearsInBusiness) {
        this.totalRooms = totalRooms;
        this.availableRooms = availableRooms;
        this.totalGuests = totalGuests;
        this.averageRating = averageRating;
        this.yearsInBusiness = yearsInBusiness;
    }

    // getters and setters
    public Integer getTotalRooms() { return totalRooms; }
    public void setTotalRooms(Integer totalRooms) { this.totalRooms = totalRooms; }

    public Integer getAvailableRooms() { return availableRooms; }
    public void setAvailableRooms(Integer availableRooms) { this.availableRooms = availableRooms; }

    public Integer getTotalGuests() { return totalGuests; }
    public void setTotalGuests(Integer totalGuests) { this.totalGuests = totalGuests; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getYearsInBusiness() { return yearsInBusiness; }
    public void setYearsInBusiness(Integer yearsInBusiness) { this.yearsInBusiness = yearsInBusiness; }
}
