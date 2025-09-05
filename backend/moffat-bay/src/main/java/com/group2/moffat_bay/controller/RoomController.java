package com.group2.moffat_bay.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group2.moffat_bay.dto.RoomCreateDto;
import com.group2.moffat_bay.dto.RoomDto;
import com.group2.moffat_bay.model.Room;
import com.group2.moffat_bay.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDto> roomDtos = rooms.stream()
                .map(RoomDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roomDtos);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Integer roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        return room.map(r -> ResponseEntity.ok(new RoomDto(r)))
                  .orElse(ResponseEntity.notFound().build());
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
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Integer roomId, @Valid @RequestBody RoomCreateDto roomCreateDto) {
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
