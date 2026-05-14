package com.cybersecuritygame.backend.repository;


import com.cybersecuritygame.backend.model.User;
import com.cybersecuritygame.backend.model.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer,Long> {
    List<UserAnswer> findByUser(User user);

}
