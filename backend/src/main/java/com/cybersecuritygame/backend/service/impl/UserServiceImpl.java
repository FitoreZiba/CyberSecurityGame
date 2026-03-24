package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.userDto.UserLoginDto;
import com.cybersecuritygame.backend.dto.userDto.UserRegisterDto;
import com.cybersecuritygame.backend.dto.userDto.UserResponseDto;
import com.cybersecuritygame.backend.model.Role;
import com.cybersecuritygame.backend.model.User;
import com.cybersecuritygame.backend.repository.UserRepository;
import com.cybersecuritygame.backend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDto registerUser(UserRegisterDto dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPoints(0);
        user.setLevel(1);
        user.setUsername(dto.getUsername());

        user=userRepository.save(user);

        return mapToDto(user);
    }

    @Override
    public UserResponseDto loginUser(UserLoginDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow();

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return mapToDto(user);
    }

    @Override
    public List<UserResponseDto> getTopUsers() {
        return userRepository.findAllByOrderByPointsDesc()
                .stream()
                .map(user -> {
                    UserResponseDto dto = new UserResponseDto();
                    dto.setId(user.getId());
                    dto.setUsername(user.getUsername());
                    dto.setPoints(user.getPoints());
                    dto.setLevel(user.getLevel());
                    return dto;
                })
                .toList();
    }

    private UserResponseDto mapToDto(User user) {
        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setId(user.getId());
        responseDto.setLevel(user.getLevel());
        responseDto.setEmail(user.getEmail());
        responseDto.setPoints(user.getPoints());
        responseDto.setUsername(user.getUsername());
        return responseDto;
    }
}
