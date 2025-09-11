package com.group2.moffat_bay.service;

import com.group2.moffat_bay.dto.ReservationCreateDto;
import com.group2.moffat_bay.model.Reservation;
import com.group2.moffat_bay.model.User;
import com.group2.moffat_bay.model.Room;
import com.group2.moffat_bay.repository.ReservationRepository;
import com.group2.moffat_bay.repository.UserRepository;
import com.group2.moffat_bay.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Reservation createReservation(String userEmail, ReservationCreateDto reservationDto) {
        
        // Find user by email
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (!userOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        User user = userOpt.get();

        // Validate room exists
        Optional<Room> roomOpt = roomRepository.findById(reservationDto.getRoomId());
        if (!roomOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found");
        }
        Room room = roomOpt.get();

        // Validate dates
        LocalDate checkIn = reservationDto.getCheckIn();
        LocalDate checkOut = reservationDto.getCheckOut();
        
        if (checkIn == null || checkOut == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Check-in and check-out dates are required");
        }
        
        if (!checkOut.isAfter(checkIn)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Check-out date must be after check-in date");
        }

        // Validate guest count
        if (reservationDto.getGuests() == null || reservationDto.getGuests() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Guest count must be greater than 0");
        }
        
        if (reservationDto.getGuests() > room.getMaxGuests()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Guest count (" + reservationDto.getGuests() + ") exceeds room capacity (" + room.getMaxGuests() + ")");
        }

        // Check room availability
        List<Reservation> conflictingReservations = reservationRepository.findConflictingReservations(
            reservationDto.getRoomId(), checkIn, checkOut);
        
        if (!conflictingReservations.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Room is not available for the selected dates");
        }

        // Create and save reservation
        Reservation reservation = new Reservation(
            user.getUserId(),
            reservationDto.getRoomId(),
            reservationDto.getGuests(),
            checkIn,
            checkOut
        );

        return reservationRepository.save(reservation);
    }

    public Reservation getReservationById(Long reservationId) {
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));
    }

    public List<Reservation> getReservationsByUserEmail(String userEmail) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (!userOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        User user = userOpt.get();
        return reservationRepository.findByUserId(user.getUserId());
    }
}