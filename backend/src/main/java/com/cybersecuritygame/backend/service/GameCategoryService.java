package com.cybersecuritygame.backend.service;

import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionResultDto;

import java.util.List;

public interface GameCategoryService {

    List<QuestionDto> getQuestionsByCategory(Long categoryId);

    QuestionResultDto submitAnswer(AnswerRequestDto request);

}