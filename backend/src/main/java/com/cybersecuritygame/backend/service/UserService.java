package com.cybersecuritygame.backend.service;


import com.cybersecuritygame.backend.dto.userDto.UserLoginDto;
import com.cybersecuritygame.backend.dto.userDto.UserRegisterDto;
import com.cybersecuritygame.backend.dto.userDto.UserResponseDto;
import com.cybersecuritygame.backend.model.User;

import java.util.List;

public interface UserService {

    UserResponseDto registerUser(UserRegisterDto dto);
    UserResponseDto loginUser(UserLoginDto dto);
    List<UserResponseDto> getTopUsers();

}
