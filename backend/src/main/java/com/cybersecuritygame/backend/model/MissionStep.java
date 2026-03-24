package com.cybersecuritygame.backend.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class MissionStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stepOrder;

    @ManyToOne
    private Mission mission;

    @ManyToOne
    private Question question;
}
