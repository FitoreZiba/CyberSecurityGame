package com.cybersecuritygame.backend.repository;

import com.cybersecuritygame.backend.model.GameCategory;
import com.cybersecuritygame.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameCategoryRepository extends JpaRepository<GameCategory,Long> {

}
