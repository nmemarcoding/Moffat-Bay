package com.group2.moffat_bay.controller;

import com.group2.moffat_bay.dto.ContactMessageRequestDto;
import com.group2.moffat_bay.dto.ContactMessageResponseDto;
import com.group2.moffat_bay.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") 
public class ContactController {

    private final ContactMessageService service;

    public ContactController(ContactMessageService service) {
        this.service = service;
    }

    // Support both paths so the frontend works regardless of which it calls
    @PostMapping({"/contact", "/landing/contact"})
    public ResponseEntity<ContactMessageResponseDto> create(
            @Valid @RequestBody ContactMessageRequestDto req) {
        return ResponseEntity.ok(service.create(req));
    }

    // Optional quick health check (handy while wiring things up)
    @GetMapping("/contact/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("contact-ok");
    }
}