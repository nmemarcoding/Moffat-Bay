package com.group2.moffat_bay.controller;

import com.group2.moffat_bay.model.Room;
import com.group2.moffat_bay.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Integer roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        return room.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/number/{roomNumber}")
    public ResponseEntity<Room> getRoomByNumber(@PathVariable String roomNumber) {
        Optional<Room> room = roomService.getRoomByNumber(roomNumber);
        return room.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bed-type/{bedType}")
    public ResponseEntity<List<Room>> getRoomsByBedType(@PathVariable String bedType) {
        List<Room> rooms = roomService.getRoomsByBedType(bedType);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/guests/{maxGuests}")
    public ResponseEntity<List<Room>> getRoomsByMaxGuests(@PathVariable Integer maxGuests) {
        List<Room> rooms = roomService.getRoomsByMaxGuests(maxGuests);
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        if (roomService.roomNumberExists(room.getRoomNumber())) {
            return ResponseEntity.badRequest().build();
        }
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<Room> updateRoom(@PathVariable Integer roomId, @RequestBody Room room) {
        if (!roomService.roomExists(roomId)) {
            return ResponseEntity.notFound().build();
        }
        room.setRoomId(roomId);
        Room updatedRoom = roomService.updateRoom(room);
        return ResponseEntity.ok(updatedRoom);
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
