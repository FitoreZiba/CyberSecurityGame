package com.cybersecuritygame.backend.dto.userDto;


import lombok.Data;

@Data
public class UserLoginDto {
    private String email;
    private String password;
}
