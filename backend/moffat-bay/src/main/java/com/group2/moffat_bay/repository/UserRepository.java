package com.group2.moffat_bay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.group2.moffat_bay.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByTelephone(String telephone);
    boolean existsByEmail(String email);
}
