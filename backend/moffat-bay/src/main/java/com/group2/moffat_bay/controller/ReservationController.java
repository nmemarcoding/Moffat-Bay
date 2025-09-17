package com.group2.moffat_bay.controller;

import com.group2.moffat_bay.dto.ReservationCreateDto;
import com.group2.moffat_bay.model.Reservation;
import com.group2.moffat_bay.dto.ReservationDto;
import com.group2.moffat_bay.model.User;
import com.group2.moffat_bay.repository.UserRepository;
import com.group2.moffat_bay.service.ReservationService;
import com.group2.moffat_bay.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public ReservationController(ReservationService reservationService,
                                 JwtUtil jwtUtil,
                                 UserRepository userRepository) {
        this.reservationService = reservationService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    /**
     * Create a new reservation for the currently logged-in user.
     */
    @PostMapping
    public ResponseEntity<Reservation> createReservation(
            @RequestBody ReservationCreateDto reservationDto,
            HttpServletRequest request) {

        jwtUtil.requireValidToken(request);
        String userEmail = jwtUtil.extractEmailFromRequest(request);
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }

        Reservation savedReservation = reservationService.createReservation(userEmail, reservationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReservation);
    }

    /**
     * Fetch a specific reservation by its numeric ID.
     * Only the reservation owner or an admin can view it.
     */
    @GetMapping("/{id:[0-9]+}") // regex ensures only numbers match this route
    public ResponseEntity<Reservation> getReservationById(
            @PathVariable("id") Long id,
            HttpServletRequest request) {

        jwtUtil.requireValidToken(request);
        String requesterEmail = jwtUtil.extractEmailFromRequest(request);
        if (requesterEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }

        User requester = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        Reservation reservation = reservationService.getReservationById(id);

        boolean isOwner = requester.getUserId().equals(reservation.getUserId());
        boolean isAdmin = Boolean.TRUE.equals(requester.getIsAdmin());

        if (!isOwner && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to view this reservation");
        }

        return ResponseEntity.ok(reservation);
    }

    /**
     * Fetch all reservations for the currently logged-in user.
     */
    @GetMapping("/me")
    public ResponseEntity<List<ReservationDto>> getMyReservations(HttpServletRequest request) {
        jwtUtil.requireValidToken(request);
        String userEmail = jwtUtil.extractEmailFromRequest(request);
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }

        List<Reservation> reservations = reservationService.getReservationsByUserEmail(userEmail);

        List<ReservationDto> dtos = reservations.stream().map(r -> {
            ReservationDto d = new ReservationDto();
            d.setReservationId(r.getReservationId());
            d.setRoomId(r.getRoomId());
            if (r.getRoom() != null) {
                // roomNumber may be Integer in model; toString for safety
                try {
                    d.setRoomNumber(r.getRoom().getRoomNumber() != null ? r.getRoom().getRoomNumber().toString() : null);
                } catch (Exception ex) {
                    d.setRoomNumber(null);
                }
                d.setBedType(r.getRoom().getBedType());
            }
            d.setGuests(r.getGuests());
            d.setCheckIn(r.getCheckIn());
            d.setCheckOut(r.getCheckOut());
            return d;
        }).toList();

        return ResponseEntity.ok(dtos);
    }

    /**
     * Admin-only: search reservations by user email or telephone.
     * Query params: `email` or `phone` (phone takes precedence if provided).
     */
    @GetMapping("/admin/search")
    public ResponseEntity<List<ReservationDto>> adminSearchReservations(
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phone", required = false) String phone,
            HttpServletRequest request) {

        // Require admin privileges
        jwtUtil.requireAdmin(request);

        if ((email == null || email.isBlank()) && (phone == null || phone.isBlank())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide email or phone to search");
        }

        List<Reservation> reservations;
        if (phone != null && !phone.isBlank()) {
            var userOpt = userRepository.findByTelephone(phone);
            if (userOpt.isEmpty()) {
                return ResponseEntity.ok(List.of());
            }
            reservations = reservationService.getReservationsByUserEmail(userOpt.get().getEmail());
        } else {
            reservations = reservationService.getReservationsByUserEmail(email);
        }

        List<ReservationDto> dtos = reservations.stream().map(r -> {
            ReservationDto d = new ReservationDto();
            d.setReservationId(r.getReservationId());
            d.setRoomId(r.getRoomId());
            if (r.getRoom() != null) {
                try {
                    d.setRoomNumber(r.getRoom().getRoomNumber() != null ? r.getRoom().getRoomNumber().toString() : null);
                } catch (Exception ex) {
                    d.setRoomNumber(null);
                }
                d.setBedType(r.getRoom().getBedType());
            }
            d.setGuests(r.getGuests());
            d.setCheckIn(r.getCheckIn());
            d.setCheckOut(r.getCheckOut());
            return d;
        }).toList();

        return ResponseEntity.ok(dtos);
    }
}
