package com.cybersecuritygame.backend.dto.gameDto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
    private Long id;
    private String question;
    private List<String> options;
    private String difficulty;
}
