package com.group2.moffat_bay.controller;

import com.group2.moffat_bay.dto.RegistrationRequest;
import com.group2.moffat_bay.dto.UserDto;
import com.group2.moffat_bay.model.User;
import com.group2.moffat_bay.service.UserService;
import com.group2.moffat_bay.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // === REGISTER  ===
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest req) {
        try {
            User toCreate = new User(
                req.getEmail(),
                req.getPassword(),  // raw; service will hash
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

    // === LOGIN ===
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            Optional<User> existing = userService.findByEmail(loginRequest.getEmail());
            if (existing.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            User user = existing.get();
            if (!userService.checkPassword(user, loginRequest.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            // generate JWT
            String token = jwtUtil.generateToken(user);

            // attach token in Authorization header
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new UserDto(user));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/check-token")
    public ResponseEntity<?> checkToken(HttpServletRequest request) {
        try {
            jwtUtil.requireValidToken(request); // throws 401 if invalid/missing
            String email = jwtUtil.extractEmailFromRequest(request);
            return ResponseEntity.ok("Token is valid for user: " + email);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }
}
