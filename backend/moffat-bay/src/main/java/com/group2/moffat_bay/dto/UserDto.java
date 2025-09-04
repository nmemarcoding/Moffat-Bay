package com.group2.moffat_bay.dto;

import com.group2.moffat_bay.model.User;

public class UserDto {
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String telephone;
    private Boolean isAdmin;

    public UserDto() {}

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.telephone = user.getTelephone();
        this.isAdmin = user.getIsAdmin();
    }

    // getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public Boolean getIsAdmin() { return isAdmin; }
    public void setIsAdmin(Boolean isAdmin) { this.isAdmin = isAdmin; }
}
