package com.cybersecuritygame.backend.dto.gameDto;


import com.cybersecuritygame.backend.model.User;
import lombok.Data;

@Data
public class AnswerRequestDto {
    private Long questionId;
    private Long missionId;
    private String selectedAnswer;
    private Long userId;

}
