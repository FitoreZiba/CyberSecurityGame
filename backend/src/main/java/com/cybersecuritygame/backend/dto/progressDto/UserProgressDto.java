package com.cybersecuritygame.backend.dto.progressDto;

import lombok.Data;

@Data
public class UserProgressDto {
    private Long   userId;
    private int    totalPoints;
    private int    level;
    private int    accuracy;
    private int    completedCases;
    private int    totalAnswered;
    private int    totalCorrect;
}