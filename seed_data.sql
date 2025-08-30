-- Initial seed data
USE moffat_lodge;

-- Clear old data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE reservation;
TRUNCATE TABLE `user`;
TRUNCATE TABLE room_type;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert users
INSERT INTO `user` (email, password_hash, first_name, last_name, telephone) VALUES
('john.smith@example.com',  'hashed_pw_1', 'John',   'Smith', '555-111-2222'),
('maria.lopez@example.com', 'hashed_pw_2', 'Maria',  'Lopez', '555-333-4444'),
('daniel.cho@example.com',  'hashed_pw_3', 'Daniel', 'Cho',   '555-555-6666'),
('sarah.jones@example.com', 'hashed_pw_4', 'Sarah',  'Jones', '555-777-8888'),
('emily.wang@example.com',  'hashed_pw_5', 'Emily',  'Wang',  '555-999-0000');

-- Insert room types
INSERT INTO room_type (name, price_per_night) VALUES
('Single Queen', 135.00),
('King',         160.00),
('Double Full',  120.00),
('Double Queen', 150.00);

-- Insert reservations (let AUTO_INCREMENT assign reservation_id)
INSERT INTO reservation (user_id, room_type_id, guests, check_in, check_out) VALUES
(1, 1, 2, '2025-09-05', '2025-09-08'), -- John books a Single Queen
(2, 2, 2, '2025-09-06', '2025-09-10'), -- Maria books a King
(3, 3, 3, '2025-09-07', '2025-09-09'), -- Daniel books a Double Full
(4, 4, 4, '2025-09-12', '2025-09-15'), -- Sarah books a Double Queen
(5, 3, 3, '2025-09-10', '2025-09-12'); -- Emily books a Double Full
