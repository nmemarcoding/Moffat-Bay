package com.group2.moffat_bay.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.group2.moffat_bay.dto.RoomCreateDto;
import com.group2.moffat_bay.dto.RoomDto;
import com.group2.moffat_bay.model.Room;
import com.group2.moffat_bay.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // ✅ NEW: Get available rooms by check-in, check-out, and guest count
    @GetMapping("/available")
    public ResponseEntity<List<RoomDto>> getAvailableRooms(
            @RequestParam("checkIn") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam("checkOut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
            @RequestParam("guests") Integer guests) {

        if (checkIn == null || checkOut == null || guests == null || guests < 1) {
            return ResponseEntity.badRequest().build();
        }

        if (!checkOut.isAfter(checkIn)) {
            return ResponseEntity.badRequest().body(List.of());
        }

        List<Room> availableRooms = roomService.getAvailableRooms(checkIn, checkOut, guests);
        List<RoomDto> roomDtos = availableRooms.stream()
                .map(RoomDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(roomDtos);
    }

    // 🔻 Keep this AFTER /available to prevent route conflicts
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Integer roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        return room.map(r -> ResponseEntity.ok(new RoomDto(r)))
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDto> roomDtos = rooms.stream()
                .map(RoomDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }

    @GetMapping("/number/{roomNumber}")
    public ResponseEntity<RoomDto> getRoomByNumber(@PathVariable String roomNumber) {
        Optional<Room> room = roomService.getRoomByNumber(roomNumber);
        return room.map(r -> ResponseEntity.ok(new RoomDto(r)))
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bed-type/{bedType}")
    public ResponseEntity<List<RoomDto>> getRoomsByBedType(@PathVariable String bedType) {
        List<Room> rooms = roomService.getRoomsByBedType(bedType);
        List<RoomDto> roomDtos = rooms.stream()
                .map(RoomDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }

    @GetMapping("/guests/{maxGuests}")
    public ResponseEntity<List<RoomDto>> getRoomsByMaxGuests(@PathVariable Integer maxGuests) {
        List<Room> rooms = roomService.getRoomsByMaxGuests(maxGuests);
        List<RoomDto> roomDtos = rooms.stream()
                .map(RoomDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }

    @PostMapping
    public ResponseEntity<RoomDto> createRoom(@Valid @RequestBody RoomCreateDto roomCreateDto) {
        if (roomService.roomNumberExists(roomCreateDto.getRoomNumber())) {
            return ResponseEntity.badRequest().build();
        }
        Room room = new Room(
                roomCreateDto.getRoomNumber(),
                roomCreateDto.getBedType(),
                roomCreateDto.getPricePerNight(),
                roomCreateDto.getMaxGuests()
        );
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(new RoomDto(createdRoom));
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Integer roomId,
                                              @Valid @RequestBody RoomCreateDto roomCreateDto) {
        if (!roomService.roomExists(roomId)) {
            return ResponseEntity.notFound().build();
        }
        Room room = new Room(
                roomCreateDto.getRoomNumber(),
                roomCreateDto.getBedType(),
                roomCreateDto.getPricePerNight(),
                roomCreateDto.getMaxGuests()
        );
        room.setRoomId(roomId);
        Room updatedRoom = roomService.updateRoom(room);
        return ResponseEntity.ok(new RoomDto(updatedRoom));
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer roomId) {
        if (!roomService.roomExists(roomId)) {
            return ResponseEntity.notFound().build();
        }
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }
}
