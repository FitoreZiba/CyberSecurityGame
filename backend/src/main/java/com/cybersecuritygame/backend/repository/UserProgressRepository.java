package com.cybersecuritygame.backend.repository;

import com.cybersecuritygame.backend.model.GameCategory;
import com.cybersecuritygame.backend.model.User;
import com.cybersecuritygame.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress,Long> {
    List<UserProgress> findByUserId(Long aLong);
    Optional<UserProgress> findByUserAndCategory(User user, GameCategory category);
   List<UserProgress> findByUser(User user);
}