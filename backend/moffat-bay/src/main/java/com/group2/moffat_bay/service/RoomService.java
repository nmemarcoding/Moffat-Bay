package com.group2.moffat_bay.service;

import com.group2.moffat_bay.model.Room;
import com.group2.moffat_bay.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAllByOrderByRoomNumber();
    }

    public Optional<Room> getRoomById(Integer roomId) {
        return roomRepository.findById(roomId);
    }

    public Optional<Room> getRoomByNumber(String roomNumber) {
        return Optional.ofNullable(roomRepository.findByRoomNumber(roomNumber));
    }

    public List<Room> getRoomsByBedType(String bedType) {
        return roomRepository.findByBedType(bedType);
    }

    public List<Room> getRoomsByMaxGuests(Integer maxGuests) {
        return roomRepository.findByMaxGuestsGreaterThanEqual(maxGuests);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Integer roomId) {
        roomRepository.deleteById(roomId);
    }

    public boolean roomExists(Integer roomId) {
        return roomRepository.existsById(roomId);
    }

    public boolean roomNumberExists(String roomNumber) {
        return roomRepository.findByRoomNumber(roomNumber) != null;
    }

    public List<Room> getAvailableRooms(LocalDate checkIn, LocalDate checkOut, Integer guests) {
        return roomRepository.findAvailableRooms(checkIn, checkOut, guests);
    }

}
