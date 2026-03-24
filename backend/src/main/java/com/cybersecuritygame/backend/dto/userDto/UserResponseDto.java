package com.cybersecuritygame.backend.dto.userDto;


import lombok.Data;

@Data
public class UserResponseDto {

    private Long id;
    private String email;
    private String username;
    private int points;
    private int level;
}
