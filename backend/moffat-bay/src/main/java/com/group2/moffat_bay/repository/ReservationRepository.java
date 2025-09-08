package com.group2.moffat_bay.repository;

import com.group2.moffat_bay.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    @Query("SELECT r FROM Reservation r WHERE r.roomId = :roomId AND " +
           "((r.checkIn <= :checkOut AND r.checkOut > :checkIn))")
    List<Reservation> findConflictingReservations(@Param("roomId") Integer roomId,
                                                   @Param("checkIn") LocalDate checkIn,
                                                   @Param("checkOut") LocalDate checkOut);
}