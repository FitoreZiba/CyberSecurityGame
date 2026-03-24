package com.cybersecuritygame.backend.web;


import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.missionDto.MissionStepDto;
import com.cybersecuritygame.backend.service.MissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/missions")
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/{missionId}/{userId}/start")
    public ResponseEntity<MissionStepDto> startMission(@PathVariable Long missionId,@PathVariable Long userId) {
        return ResponseEntity.ok(missionService.startMission(missionId,userId));
    }

    @PostMapping("/step/answer")
    public ResponseEntity<MissionStepDto> submitStep(@RequestBody AnswerRequestDto dto) {
        return ResponseEntity.ok(missionService.submitStep(dto));
    }
}