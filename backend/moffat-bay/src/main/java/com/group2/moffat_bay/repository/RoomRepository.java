package com.group2.moffat_bay.repository;

import com.group2.moffat_bay.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    
    List<Room> findAllByOrderByRoomNumber();
    
    Room findByRoomNumber(String roomNumber);
    
    List<Room> findByBedType(String bedType);
    
    List<Room> findByMaxGuestsGreaterThanEqual(Integer maxGuests);
}
