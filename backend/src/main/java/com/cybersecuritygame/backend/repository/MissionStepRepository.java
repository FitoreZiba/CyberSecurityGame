package com.cybersecuritygame.backend.repository;

import com.cybersecuritygame.backend.model.MissionStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MissionStepRepository extends JpaRepository<MissionStep,Long> {
   Optional<MissionStep> findFirstByMissionIdOrderByStepOrder(Long missionId);
   Optional<MissionStep> findByQuestionId(Long questionId);
   Optional<MissionStep> findByMissionIdAndStepOrder(Long missionId, int order);
}
