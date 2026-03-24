package com.cybersecuritygame.backend.service;

import com.cybersecuritygame.backend.dto.progressDto.UserProgressDto;

public interface UserProgressService {
    UserProgressDto getMyProgress(Long userId);

}
