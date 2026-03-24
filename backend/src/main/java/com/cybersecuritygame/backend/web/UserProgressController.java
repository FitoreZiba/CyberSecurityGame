package com.cybersecuritygame.backend.web;


import com.cybersecuritygame.backend.dto.progressDto.UserProgressDto;
import com.cybersecuritygame.backend.service.UserProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/progress")
public class UserProgressController {

    private final UserProgressService progressService;

    public UserProgressController(UserProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProgressDto> getProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getMyProgress(userId));
    }
}