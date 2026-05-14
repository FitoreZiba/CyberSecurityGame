package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.progressDto.UserProgressDto;
import com.cybersecuritygame.backend.model.User;
import com.cybersecuritygame.backend.model.UserAnswer;
import com.cybersecuritygame.backend.model.UserProgress;
import com.cybersecuritygame.backend.repository.UserAnswerRepository;
import com.cybersecuritygame.backend.repository.UserProgressRepository;
import com.cybersecuritygame.backend.repository.UserRepository;
import com.cybersecuritygame.backend.service.UserProgressService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProgressServiceImpl implements UserProgressService {

    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;
    private final UserAnswerRepository userAnswerRepository;

    public UserProgressServiceImpl(UserRepository userRepository,
                                   UserProgressRepository userProgressRepository,
                                   UserAnswerRepository userAnswerRepository) {
        this.userRepository         = userRepository;
        this.userProgressRepository = userProgressRepository;
        this.userAnswerRepository   = userAnswerRepository;
    }

    @Override
    public UserProgressDto getMyProgress(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        List<UserProgress> progressList = userProgressRepository.findByUser(user);
        List<UserAnswer>   answers      = userAnswerRepository.findByUser(user);

        int totalAnswered = answers.size();
        int totalCorrect  = (int) answers.stream().filter(UserAnswer::isCorrect).count();

        int accuracy = totalAnswered > 0
                ? Math.round((float) totalCorrect / totalAnswered * 100)
                : 0;

        int completedCases = (int) progressList.stream()
                .filter(p -> p.getScore() >= 50)
                .count();

        UserProgressDto dto = new UserProgressDto();
        dto.setUserId(userId);
        dto.setTotalPoints(user.getPoints());
        dto.setLevel(user.getLevel());
        dto.setAccuracy(accuracy);
        dto.setCompletedCases(completedCases);
        dto.setTotalAnswered(totalAnswered);
        dto.setTotalCorrect(totalCorrect);

        return dto;
    }
}