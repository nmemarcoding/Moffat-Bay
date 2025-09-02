package com.group2.moffat_bay.controller;

import com.group2.moffat_bay.dto.RegistrationRequest;
import com.group2.moffat_bay.dto.UserDto;
import com.group2.moffat_bay.model.User;
import com.group2.moffat_bay.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest req) {
        try {
            User toCreate = new User(
                req.getEmail(),
                req.getPassword(),  // raw, will be hashed in service
                req.getFirstName(),
                req.getLastName(),
                req.getTelephone(),
                req.getIsAdmin() != null ? req.getIsAdmin() : false
            );
            User saved = userService.register(toCreate);
            return ResponseEntity.ok(new UserDto(saved));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Registration failed: " + e.getMessage());
        }
    }
}
