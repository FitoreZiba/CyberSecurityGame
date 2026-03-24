package com.cybersecuritygame.backend.repository;

import com.cybersecuritygame.backend.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionRepository extends JpaRepository<Mission,Long> {
}
