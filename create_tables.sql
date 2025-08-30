-- Recreate database fresh
DROP DATABASE IF EXISTS moffat_lodge;
CREATE DATABASE moffat_lodge;
USE moffat_lodge;

-- USERS 
CREATE TABLE `user` (
  user_id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(254)    NOT NULL UNIQUE,
  password_hash CHAR(60)        NOT NULL,
  first_name    VARCHAR(100)    NOT NULL,
  last_name     VARCHAR(100)    NOT NULL,
  telephone     VARCHAR(25)     NOT NULL,
  is_admin      TINYINT(1)      NOT NULL DEFAULT 0,  -- Boolean Default False
  PRIMARY KEY (user_id)
) ENGINE=InnoDB;

-- ROOM
CREATE TABLE room (
  room_id         INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  room_number     VARCHAR(10)      NOT NULL UNIQUE,
  bed_type        VARCHAR(32)      NOT NULL,
  price_per_night DECIMAL(8,2)     NOT NULL,
  max_guests      TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (room_id)
) ENGINE=InnoDB;

-- RESERVATION 
CREATE TABLE reservation (
  reservation_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id        BIGINT UNSIGNED NOT NULL,
  room_id        INT UNSIGNED    NOT NULL,
  guests         TINYINT UNSIGNED NOT NULL,
  check_in       DATE            NOT NULL,
  check_out      DATE            NOT NULL,
  PRIMARY KEY (reservation_id),
  KEY idx_res_user (user_id),
  KEY idx_res_room (room_id),
  CONSTRAINT fk_res_user FOREIGN KEY (user_id)
    REFERENCES `user`(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_res_room FOREIGN KEY (room_id)
    REFERENCES room(room_id)   ON DELETE RESTRICT,
  CHECK (check_out > check_in)
) ENGINE=InnoDB;
