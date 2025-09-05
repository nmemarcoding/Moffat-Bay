package com.group2.moffat_bay.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/landing")
@CrossOrigin(origins = "http://localhost:3000")
public class LandingController {

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getLandingInfo() {
        Map<String, Object> info = new HashMap<>();
        
        // Hotel information
        Map<String, String> hotelInfo = new HashMap<>();
        hotelInfo.put("name", "Moffat Bay");
        hotelInfo.put("description", "Experience luxury and comfort in the heart of nature. Your perfect getaway awaits.");
        hotelInfo.put("address", "123 Moffat Bay Road, Scenic Valley");
        hotelInfo.put("phone", "+1 (555) 123-4567");
        hotelInfo.put("email", "info@moffatbay.com");
        
        // Features
        Map<String, Object> features = new HashMap<>();
        features.put("premiumRooms", "Luxuriously appointed rooms with stunning views and modern amenities");
        features.put("service24_7", "Round-the-clock concierge service to meet all your needs");
        features.put("primeLocation", "Situated in the most beautiful location with easy access to attractions");
        
        info.put("hotelInfo", hotelInfo);
        info.put("features", features);
        
        return ResponseEntity.ok(info);
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContactForm(@RequestBody Map<String, String> contactData) {
        // In a real application, you would save this to a database or send an email
        // For now, we'll just return a success response
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Thank you for your message! We'll get back to you soon.");
        response.put("status", "success");
        
        // Log the contact form submission (in production, you'd want to save this)
        System.out.println("Contact form submitted:");
        System.out.println("Name: " + contactData.get("name"));
        System.out.println("Email: " + contactData.get("email"));
        System.out.println("Message: " + contactData.get("message"));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getHotelStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Mock statistics - in a real app, these would come from the database
        stats.put("totalRooms", 25);
        stats.put("availableRooms", 18);
        stats.put("totalGuests", 156);
        stats.put("averageRating", 4.8);
        stats.put("yearsInBusiness", 15);
        
        return ResponseEntity.ok(stats);
    }
}
