package com.cybersecuritygame.backend.dto.gameDto;


import lombok.Data;

@Data
public class QuestionResultDto {
    private Long questionId;
    private boolean correct;
    private String correctAnswer;
    private String explanation;
}
