package com.cybersecuritygame.backend.repository;


import com.cybersecuritygame.backend.model.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer,Long> {
}
