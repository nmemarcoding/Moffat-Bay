package com.group2.moffat_bay.repository;

import com.group2.moffat_bay.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    
    List<Room> findAllByOrderByRoomNumber();
    
    Room findByRoomNumber(String roomNumber);
    
    List<Room> findByBedType(String bedType);
    
    List<Room> findByMaxGuestsGreaterThanEqual(Integer maxGuests);
    @Query("""
    SELECT r FROM Room r
    WHERE r.maxGuests >= :guests
    AND r.roomId NOT IN (
        SELECT res.roomId FROM Reservation res
        WHERE (res.checkIn < :checkOut AND res.checkOut > :checkIn)
    )
    """)
    List<Room> findAvailableRooms(
        @Param("checkIn") LocalDate checkIn,
        @Param("checkOut") LocalDate checkOut,
        @Param("guests") Integer guests
    );

}
