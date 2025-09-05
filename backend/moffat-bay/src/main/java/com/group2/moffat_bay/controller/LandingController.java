package com.group2.moffat_bay.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group2.moffat_bay.dto.ContactFormDto;
import com.group2.moffat_bay.dto.ContactResponseDto;
import com.group2.moffat_bay.dto.HotelFeaturesDto;
import com.group2.moffat_bay.dto.HotelInfoDto;
import com.group2.moffat_bay.dto.HotelStatsDto;
import com.group2.moffat_bay.dto.LandingInfoDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/landing")
public class LandingController {

    @GetMapping("/info")
    public ResponseEntity<LandingInfoDto> getLandingInfo() {
        HotelInfoDto hotelInfo = new HotelInfoDto(
            "Moffat Bay",
            "Experience luxury and comfort in the heart of nature. Your perfect getaway awaits.",
            "123 Moffat Bay Road, Scenic Valley",
            "+1 (555) 123-4567",
            "info@moffatbay.com"
        );
        
        HotelFeaturesDto features = new HotelFeaturesDto(
            "Luxuriously appointed rooms with stunning views and modern amenities",
            "Round-the-clock concierge service to meet all your needs",
            "Situated in the most beautiful location with easy access to attractions"
        );
        
        LandingInfoDto info = new LandingInfoDto(hotelInfo, features);
        
        return ResponseEntity.ok(info);
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactResponseDto> submitContactForm(@Valid @RequestBody ContactFormDto contactData) {
        // In a real application, you would save this to a database or send an email
        // For now, we'll just return a success response
        
        ContactResponseDto response = new ContactResponseDto(
            "Thank you for your message! We'll get back to you soon.",
            "success"
        );
        
        // Log the contact form submission (in production, you'd want to save this)
        System.out.println("Contact form submitted:");
        System.out.println("Name: " + contactData.getName());
        System.out.println("Email: " + contactData.getEmail());
        System.out.println("Message: " + contactData.getMessage());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<HotelStatsDto> getHotelStats() {
        // Mock statistics - in a real app, these would come from the database
        HotelStatsDto stats = new HotelStatsDto(25, 18, 156, 4.8, 15);
        
        return ResponseEntity.ok(stats);
    }
}
