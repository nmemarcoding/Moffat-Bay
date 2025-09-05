package com.group2.moffat_bay.dto;

public class HotelFeaturesDto {
    private String premiumRooms;
    private String service24_7;
    private String primeLocation;

    public HotelFeaturesDto() {}

    public HotelFeaturesDto(String premiumRooms, String service24_7, String primeLocation) {
        this.premiumRooms = premiumRooms;
        this.service24_7 = service24_7;
        this.primeLocation = primeLocation;
    }

    // getters and setters
    public String getPremiumRooms() { return premiumRooms; }
    public void setPremiumRooms(String premiumRooms) { this.premiumRooms = premiumRooms; }

    public String getService24_7() { return service24_7; }
    public void setService24_7(String service24_7) { this.service24_7 = service24_7; }

    public String getPrimeLocation() { return primeLocation; }
    public void setPrimeLocation(String primeLocation) { this.primeLocation = primeLocation; }
}
