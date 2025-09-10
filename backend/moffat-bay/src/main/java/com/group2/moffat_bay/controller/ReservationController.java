package com.group2.moffat_bay.controller;

import com.group2.moffat_bay.dto.ReservationCreateDto;
import com.group2.moffat_bay.model.Reservation;
import com.group2.moffat_bay.service.ReservationService;
import com.group2.moffat_bay.util.JwtUtil;
import com.group2.moffat_bay.repository.UserRepository;
import com.group2.moffat_bay.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationCreateDto reservationDto, 
                                               HttpServletRequest request) {
        
        // Validate token and get user email
        jwtUtil.requireValidToken(request);
        String userEmail = jwtUtil.extractEmailFromRequest(request);
        
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }

        // Use service to create reservation
        Reservation savedReservation = reservationService.createReservation(userEmail, reservationDto);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReservation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable("id") Long id, HttpServletRequest request) {
        // Ensure token valid and get requester email
        jwtUtil.requireValidToken(request);
        String requesterEmail = jwtUtil.extractEmailFromRequest(request);
        if (requesterEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }

        // Find requester user
        User requester = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        // Load reservation
        Reservation reservation = reservationService.getReservationById(id);

        // Allow if requester is admin or owner of reservation
        boolean isOwner = requester.getUserId().equals(reservation.getUserId());
        boolean isAdmin = Boolean.TRUE.equals(requester.getIsAdmin());

        if (!isOwner && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to view this reservation");
        }

        return ResponseEntity.ok(reservation);
    }


}