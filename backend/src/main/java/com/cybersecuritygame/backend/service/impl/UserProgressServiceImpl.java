package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.progressDto.UserProgressDto;
import com.cybersecuritygame.backend.model.UserProgress;
import com.cybersecuritygame.backend.repository.UserProgressRepository;
import com.cybersecuritygame.backend.service.UserProgressService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserProgressServiceImpl implements UserProgressService {
    private final UserProgressRepository repo;



    public UserProgressServiceImpl(UserProgressRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserProgressDto getMyProgress(Long userId) {
        List<UserProgress> progressList = repo.findByUserId(userId);

        int totalScore = progressList.stream()
                .mapToInt(UserProgress::getScore)
                .sum();

        UserProgressDto dto = new UserProgressDto();
        dto.setScore(totalScore);
        dto.setCompleted(progressList.stream().allMatch(UserProgress::isCompleted));

        return dto;
    }
}
