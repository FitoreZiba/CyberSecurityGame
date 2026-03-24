package com.cybersecuritygame.backend.service;

import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.missionDto.MissionStepDto;

public interface MissionService {

    MissionStepDto startMission(Long missionId, Long userId);
    MissionStepDto submitStep(AnswerRequestDto request);
}
