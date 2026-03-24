package com.cybersecuritygame.backend.web;


import com.cybersecuritygame.backend.dto.userDto.UserResponseDto;
import com.cybersecuritygame.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {


    private final UserService userService;


    @GetMapping("/leaderboard")
    public ResponseEntity<List<UserResponseDto>> leaderboard() {
        return ResponseEntity.ok(userService.getTopUsers());
    }



}