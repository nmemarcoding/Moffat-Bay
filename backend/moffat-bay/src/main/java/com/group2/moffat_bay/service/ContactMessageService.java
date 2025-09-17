package com.group2.moffat_bay.service;

import com.group2.moffat_bay.dto.ContactMessageRequestDto;
import com.group2.moffat_bay.dto.ContactMessageResponseDto;
import com.group2.moffat_bay.model.ContactMessage;
import com.group2.moffat_bay.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactMessageService {
    private final ContactMessageRepository repo;

    public ContactMessageService(ContactMessageRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public ContactMessageResponseDto create(ContactMessageRequestDto req) {

         String name    = trim(req.getName());
        String email   = trim(req.getEmail());
        String phone   = trim(req.getPhone());
        String subject = trim(req.getSubject());
        String message = trim(req.getMessage());

        ContactMessage entity = new ContactMessage();
        entity.setName(name);
        entity.setEmail(email);
        entity.setPhone(phone);
        entity.setSubject(subject);
        entity.setMessage(message);

        entity = repo.save(entity);
        return toResponseDto(entity);
    }

    // ----Helpers---//

    private static String trim(String s) {
        return s == null? null : s.trim();
    }

    private static ContactMessageResponseDto toResponseDto(ContactMessage m) {
    ContactMessageResponseDto dto = new ContactMessageResponseDto();
    dto.setId(m.getId());
    dto.setName(m.getName());
    dto.setEmail(m.getEmail());
    dto.setPhone(m.getPhone());
    dto.setSubject(m.getSubject());
    dto.setMessage(m.getMessage());
    dto.setCreatedAt(m.getCreatedAt());
    return dto;
 }
}