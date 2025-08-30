-- Seed data to match the ERD (Users, Room, Reservation)
USE moffat_lodge;

-- Clear in FK-safe order
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE reservation;
TRUNCATE TABLE room;
TRUNCATE TABLE `user`;
SET FOREIGN_KEY_CHECKS = 1;

-- USERS
INSERT INTO `user` (email, password_hash, first_name, last_name, telephone, is_admin) VALUES
('john.smith@example.com',  'hashed_pw_1', 'John',   'Smith', '555-111-2222', 0),
('maria.lopez@example.com', 'hashed_pw_2', 'Maria',  'Lopez', '555-333-4444', 0),
('daniel.cho@example.com',  'hashed_pw_3', 'Daniel', 'Cho',   '555-555-6666', 0),
('sarah.jones@example.com', 'hashed_pw_4', 'Sarah',  'Jones', '555-777-8888', 0),
('emily.wang@example.com',  'hashed_pw_5', 'Emily',  'Wang',  '555-999-0000', 1); -- make Emily an admin as an example

-- ROOMS
INSERT INTO room (room_number, bed_type, price_per_night, max_guests) VALUES
('101', 'Single Queen', 135.00, 2),
('102', 'King',         160.00, 2),
('201', 'Double Full',  120.00, 4),
('202', 'Double Queen', 150.00, 4);

-- RESERVATIONS (room_id refers to the rooms inserted above: 1..4)
INSERT INTO reservation (user_id, room_id, guests, check_in, check_out) VALUES
(1, 1, 2, '2025-09-05', '2025-09-08'), -- John in room 101
(2, 2, 2, '2025-09-06', '2025-09-10'), -- Maria in room 102
(3, 3, 3, '2025-09-07', '2025-09-09'), -- Daniel in room 201
(4, 4, 4, '2025-09-12', '2025-09-15'), -- Sarah in room 202
(5, 3, 3, '2025-09-10', '2025-09-12'); -- Emily in room 201
