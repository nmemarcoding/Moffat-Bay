package com.group2.moffat_bay.dto;

public class LandingInfoDto {
    private HotelInfoDto hotelInfo;
    private HotelFeaturesDto features;

    public LandingInfoDto() {}

    public LandingInfoDto(HotelInfoDto hotelInfo, HotelFeaturesDto features) {
        this.hotelInfo = hotelInfo;
        this.features = features;
    }

    // getters and setters
    public HotelInfoDto getHotelInfo() { return hotelInfo; }
    public void setHotelInfo(HotelInfoDto hotelInfo) { this.hotelInfo = hotelInfo; }

    public HotelFeaturesDto getFeatures() { return features; }
    public void setFeatures(HotelFeaturesDto features) { this.features = features; }
}
