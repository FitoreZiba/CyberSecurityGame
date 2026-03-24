package com.cybersecuritygame.backend.dto.missionDto;


import lombok.Data;

@Data
public class MissionDto {
    private Long id;
    private String title;
    private String description;
    private int levelRequired;
}
