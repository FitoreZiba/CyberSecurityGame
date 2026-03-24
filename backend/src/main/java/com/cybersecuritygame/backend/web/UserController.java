package com.cybersecuritygame.backend.web;



import com.cybersecuritygame.backend.dto.userDto.UserLoginDto;
import com.cybersecuritygame.backend.dto.userDto.UserRegisterDto;
import com.cybersecuritygame.backend.dto.userDto.UserResponseDto;
import com.cybersecuritygame.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRegisterDto dto) {
        return ResponseEntity.ok(userService.registerUser(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserLoginDto dto) {
        return ResponseEntity.ok(userService.loginUser(dto));
    }
}