package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionResultDto;
import com.cybersecuritygame.backend.model.*;
import com.cybersecuritygame.backend.repository.QuestionRepository;
import com.cybersecuritygame.backend.repository.UserAnswerRepository;
import com.cybersecuritygame.backend.repository.UserProgressRepository;
import com.cybersecuritygame.backend.repository.UserRepository;
import com.cybersecuritygame.backend.service.GameCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameCategoryServiceImpl implements GameCategoryService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final UserProgressRepository userProgressRepository;

    public GameCategoryServiceImpl(QuestionRepository questionRepository,
                                   UserRepository userRepository,
                                   UserAnswerRepository userAnswerRepository, UserProgressRepository userProgressRepository) {
        this.questionRepository   = questionRepository;
        this.userRepository       = userRepository;
        this.userAnswerRepository = userAnswerRepository;
        this.userProgressRepository = userProgressRepository;
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

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found: " + request.getQuestionId()));

        boolean correct = question.getCorrectAnswer()
                .trim()
                .equalsIgnoreCase(request.getSelectedAnswer().trim());

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + request.getUserId()));

        UserAnswer answer = new UserAnswer();
        answer.setUser(user);
        answer.setQuestion(question);
        answer.setSelectedAnswer(request.getSelectedAnswer());
        answer.setCorrect(correct);
        userAnswerRepository.save(answer);

        if (correct) {
            int newPoints = user.getPoints() + 10;
            int newLevel  = LevelUtils.calculateLevel(newPoints);
            user.setPoints(newPoints);
            user.setLevel(newLevel);
            userRepository.save(user);
            System.out.println(">>> Correct answer — user=" + user.getUsername()
                    + " points=" + newPoints + " level=" + newLevel);
        }

        return buildResult(question, correct, user.getPoints(), user.getLevel());
    }

    private void updateUserProgress(User user, GameCategory category, boolean correct) {
        Optional<UserProgress> existing = userProgressRepository
                .findByUserAndCategory(user, category);

        UserProgress progress;
        if (existing.isPresent()) {
            progress = existing.get();
        } else {
            progress = new UserProgress();
            progress.setUser(user);
            progress.setCategory(category);
            progress.setScore(0);
            progress.setCompleted(false);
        }

        if (correct) {
            progress.setScore(progress.getScore() + 10);
        }

        userProgressRepository.save(progress);
    }

    private QuestionDto mapToDto(Question q) {
        QuestionDto dto = new QuestionDto();
        dto.setId(q.getId());
        dto.setQuestion(q.getQuestion());
        dto.setOptions(q.getOptions());
        dto.setDifficulty(q.getDifficulty().name());
        return dto;
    }

    private QuestionResultDto buildResult(Question q, boolean correct, int newPoints, int newLevel) {
        QuestionResultDto dto = new QuestionResultDto();
        dto.setQuestionId(q.getId());
        dto.setCorrect(correct);
        dto.setCorrectAnswer(q.getCorrectAnswer());
        dto.setExplanation(q.getExplanation());
        dto.setNewPoints(newPoints);
        dto.setNewLevel(newLevel);
        return dto;
    }
}