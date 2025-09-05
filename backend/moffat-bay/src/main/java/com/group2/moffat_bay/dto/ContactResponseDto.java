package com.group2.moffat_bay.dto;

public class ContactResponseDto {
    private String message;
    private String status;

    public ContactResponseDto() {}

    public ContactResponseDto(String message, String status) {
        this.message = message;
        this.status = status;
    }

    // getters and setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
