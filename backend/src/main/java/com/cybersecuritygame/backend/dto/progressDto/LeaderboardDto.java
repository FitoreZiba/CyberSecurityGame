package com.cybersecuritygame.backend.dto.progressDto;

import lombok.Data;

@Data
public class LeaderboardDto {
    private String email;
    private int points;
    private int level;
}
