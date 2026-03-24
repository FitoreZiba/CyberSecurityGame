package com.cybersecuritygame.backend.service.impl;


import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionResultDto;
import com.cybersecuritygame.backend.model.Question;
import com.cybersecuritygame.backend.repository.QuestionRepository;
import com.cybersecuritygame.backend.service.GameCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameCategoryServiceImpl  implements GameCategoryService {
    private final QuestionRepository questionRepository;


    public GameCategoryServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }


    @Override
    public List<QuestionDto> getQuestionsByCategory(Long categoryId) {
        return questionRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public QuestionResultDto submitAnswer(AnswerRequestDto request) {
        Question q = questionRepository.findById(request.getQuestionId())
                .orElseThrow();

        boolean correct = q.getCorrectAnswer()
                .equals(request.getSelectedAnswer());

        return buildResult(q, correct);
    }
    private QuestionDto mapToDto(Question q) {
        QuestionDto dto = new QuestionDto();
        dto.setId(q.getId());
        dto.setQuestion(q.getQuestion());
        dto.setOptions(q.getOptions());
        dto.setDifficulty(q.getDifficulty().name());
        return dto;
    }

    private QuestionResultDto buildResult(Question q, boolean correct) {
        QuestionResultDto dto = new QuestionResultDto();
        dto.setQuestionId(q.getId());
        dto.setCorrect(correct);
        dto.setCorrectAnswer(q.getCorrectAnswer());
        dto.setExplanation(q.getExplanation());
        return dto;
    }
}
