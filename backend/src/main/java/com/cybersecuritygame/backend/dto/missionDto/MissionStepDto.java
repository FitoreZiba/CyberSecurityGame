package com.cybersecuritygame.backend.dto.missionDto;

import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import lombok.Data;

@Data
public class MissionStepDto {
    private int stepOrder;
    private QuestionDto question;
    private boolean correct;
    private boolean completed;
    private boolean missionCompleted;
    private String explanation;
    private String correctAnswer;
    private String message;
}