package com.cybersecuritygame.backend.dto.userDto;


import lombok.Data;

@Data
public class UserRegisterDto {
    private String username;
    private String email;
    private String password;
}
