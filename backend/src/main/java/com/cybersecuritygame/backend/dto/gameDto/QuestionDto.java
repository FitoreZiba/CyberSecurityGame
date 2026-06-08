package com.cybersecuritygame.backend.dto.gameDto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class QuestionDto {
    private Long id;
    private String question;
    private Set<String> options;
    private String difficulty;
}
