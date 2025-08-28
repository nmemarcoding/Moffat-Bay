-- How to call these procedures
--CALL GetAllUsers();
--CALL GetAllReservations();
--CALL GetReservationsWithRooms();
--CALL GetAvailableRooms('2025-08-27', '2025-08-30');
--CALL GetUserReservations('example@gmail.com');

-- moffat bay database select
USE moffat_bay

-- Drop procedures if the already exist
DROP PROCEDURE IF EXISTS GetAllUsers;
DROP PROCEDURE IF EXISTS GetAllReservations;
DROP PROCEDURE IF EXISTS GetReservationsWithRooms;
DROP PROCEDURE IF EXISTS GetAvailableRooms;
DROP PROCEDURE IF EXISTS GetUserReservations;

-- Get all users
DELIMITER //
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT user_id, first_name, last_name, email, telephone
    FROM user
    ORDER BY last_name, first_name;
END //
DELIMITER ;

-- Get all reservations with user details
DELIMITER //
CREATE PROCEDURE GetAllReservations()
BEGIN
    SELECT r.reservation_id,
           u.first_name,
           u.last_name,
           u.email,
           r.check_in,
           r.check_out,
           r.guests
    FROM reservation r
    JOIN user u ON r.user_id = u.user_id
    ORDER BY r.check_in;
END //
DELIMITER ;

-- Get all reservations with room details
DELIMITER //
CREATE PROCEDURE GetReservationsWithRooms()
BEGIN
    SELECT r.reservation_id,
           u.first_name,
           u.last_name,
           rm.room_number,
           rm.bed_type,
           rm.price_per_night,
           r.check_in,
           r.check_out,
           r.guests
    FROM reservation r
    JOIN user u ON r.user_id = u.user_id
    JOIN room rm ON r.room_id = rm.room_id
    ORDER BY r.check_in;
END //
DELIMITER ;

-- Get available rooms between two dates
DELIMITER //
CREATE PROCEDURE GetAvailableRooms(IN start_date DATE, IN end_date DATE)
BEGIN
    SELECT rm.room_id, rm.room_number, rm.bed_type, rm.price_per_night, rm.max_guests
    FROM room rm
    WHERE rm.room_id NOT IN (
        SELECT r.room_id
        FROM reservation r
        WHERE (r.check_in <= end_date AND r.check_out >= start_date)
    )
    ORDER BY rm.price_per_night;
END //
DELIMITER ;

-- Get reservations for a specific user by email
DELIMITER //
CREATE PROCEDURE GetUserReservations(IN user_email VARCHAR(255))
BEGIN
    SELECT r.reservation_id,
           rm.room_number,
           r.check_in,
           r.check_out,
           r.guests
    FROM reservation r
    JOIN room rm ON r.room_id = rm.room_id
    JOIN user u ON r.user_id = u.user_id
    WHERE u.email = user_email
    ORDER BY r.check_in;
END //
DELIMITER