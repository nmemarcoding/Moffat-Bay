package com.group2.moffat_bay.config;

import java.math.BigDecimal;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.group2.moffat_bay.model.Room;
import com.group2.moffat_bay.model.User;
import com.group2.moffat_bay.repository.RoomRepository;
import com.group2.moffat_bay.repository.UserRepository;
import com.group2.moffat_bay.service.UserService;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no rooms exist
        if (roomRepository.count() == 0) {
            initializeRooms();
        }

        // Create default admin user if it doesn't already exist
        final String adminEmail = "admin@moffatbay.com";
        final String adminPassword = "Admin@1234"; // raw password; will be hashed by UserService
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User(
                adminEmail,
                adminPassword,
                "Admin",
                "User",
                "000-000-0000",
                true
            );
            try {
                userService.register(admin);
                System.out.println("Admin user created: " + adminEmail + " (password: " + adminPassword + ")");
            } catch (Exception e) {
                System.err.println("Failed to create admin user: " + e.getMessage());
            }
        }
    }

    private void initializeRooms() {
        Room[] rooms = {
            new Room("101", "King", new BigDecimal("199.99"), 2),
            new Room("102", "Queen", new BigDecimal("179.99"), 2),
            new Room("103", "Double", new BigDecimal("159.99"), 2),
            new Room("201", "King", new BigDecimal("219.99"), 2),
            new Room("202", "Queen", new BigDecimal("199.99"), 2),
            new Room("203", "Double", new BigDecimal("179.99"), 2),
            new Room("301", "Suite", new BigDecimal("299.99"), 4),
            new Room("302", "King", new BigDecimal("239.99"), 2),
            new Room("303", "Queen", new BigDecimal("219.99"), 2),
            new Room("401", "Suite", new BigDecimal("349.99"), 4),
            new Room("402", "King", new BigDecimal("259.99"), 2),
            new Room("403", "Queen", new BigDecimal("239.99"), 2)
        };

        roomRepository.saveAll(Arrays.asList(rooms));
        System.out.println("Sample room data initialized successfully!");
    }
}
