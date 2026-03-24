package com.cybersecuritygame.backend.dto.progressDto;

import lombok.Data;

@Data
public class UserProgressDto {

    private String categoryName;
    private int score;
    private boolean completed;
}
