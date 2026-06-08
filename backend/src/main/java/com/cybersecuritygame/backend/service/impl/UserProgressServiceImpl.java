package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.progressDto.UserProgressDto;
import com.cybersecuritygame.backend.model.User;
import com.cybersecuritygame.backend.model.UserAnswer;
import com.cybersecuritygame.backend.model.UserMissionProgress;
import com.cybersecuritygame.backend.repository.UserAnswerRepository;
import com.cybersecuritygame.backend.repository.UserMissionProgressRepository;
import com.cybersecuritygame.backend.repository.UserRepository;
import com.cybersecuritygame.backend.service.UserProgressService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProgressServiceImpl implements UserProgressService {

    private final UserRepository userRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final UserMissionProgressRepository missionProgressRepository;

    public UserProgressServiceImpl(UserRepository userRepository,
                                   UserAnswerRepository userAnswerRepository,
                                   UserMissionProgressRepository missionProgressRepository) {
        this.userRepository          = userRepository;
        this.userAnswerRepository    = userAnswerRepository;
        this.missionProgressRepository = missionProgressRepository;
    }

    @Override
    public UserProgressDto getMyProgress(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        List<UserAnswer> answers = userAnswerRepository.findByUser(user);

        int totalAnswered = answers.size();
        int totalCorrect  = (int) answers.stream()
                .filter(UserAnswer::isCorrect)
                .count();

        int accuracy = totalAnswered > 0
                ? Math.round((float) totalCorrect / totalAnswered * 100)
                : 0;

        List<UserMissionProgress> missionProgressList =
                missionProgressRepository.findByUser(user);

        int completedCases = (int) missionProgressList.stream()
                .filter(UserMissionProgress::isCompleted)
                .count();

        System.out.println(">>> getMyProgress userId=" + userId
                + " totalAnswered=" + totalAnswered
                + " totalCorrect=" + totalCorrect
                + " accuracy=" + accuracy
                + " completedMissions=" + completedCases);

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