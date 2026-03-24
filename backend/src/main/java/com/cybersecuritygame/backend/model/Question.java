package com.cybersecuritygame.backend.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String question;
    @ElementCollection
    private List<String> options;
    private String correctAnswer;
    private String explanation;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;


    @ManyToOne
    private GameCategory category;

}
