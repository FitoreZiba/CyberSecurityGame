package com.cybersecuritygame.backend.repository;

import com.cybersecuritygame.backend.model.UserMissionProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserMissionProgressRepository extends JpaRepository<UserMissionProgress,Long> {
    Optional<UserMissionProgress> findByUserIdAndMissionId(Long userId, Long missionId);
}
