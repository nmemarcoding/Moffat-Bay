package com.group2.moffat_bay.service;

import com.group2.moffat_bay.model.User;
import com.group2.moffat_bay.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // BCrypt via SecurityConfig

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User rawUser) {
        if (userRepository.existsByEmail(rawUser.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        // hash the raw password before saving
        String hashed = passwordEncoder.encode(rawUser.getPassword());
        rawUser.setPassword(hashed);
        return userRepository.save(rawUser);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
    
}
