package com.cybersecuritygame.backend.repository;

import com.cybersecuritygame.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
    List<Question> findByCategoryId (Long categoryId);


    @Query(value = "SELECT * FROM question WHERE category_id = :categoryId ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomByCategoryId(@Param("categoryId") Long categoryId, @Param("limit") int limit);
}
