-- Recreate database fresh (safe to run anytime)
DROP DATABASE IF EXISTS moffat_lodge;
CREATE DATABASE moffat_lodge;
USE moffat_lodge;

-- USER table 
CREATE TABLE `user` (
  user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash CHAR(60) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  telephone VARCHAR(25) NOT NULL,
  PRIMARY KEY (user_id)
);

-- ROOM TYPE table
CREATE TABLE room_type (
  room_type_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL UNIQUE,
  price_per_night DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (room_type_id)
);

-- RESERVATION table
CREATE TABLE reservation (
  reservation_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  room_type_id TINYINT UNSIGNED NOT NULL,
  guests TINYINT UNSIGNED NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  PRIMARY KEY (reservation_id),
  CONSTRAINT fk_res_user
    FOREIGN KEY (user_id) REFERENCES `user`(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_res_room_type
    FOREIGN KEY (room_type_id) REFERENCES room_type(room_type_id)
);
