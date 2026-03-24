package com.cybersecuritygame.backend.web;

import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionResultDto;
import com.cybersecuritygame.backend.service.GameCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    private final GameCategoryService gameService;

    public GameController(GameCategoryService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/{categoryId}/questions")
    public ResponseEntity<List<QuestionDto>> getQuestions(@PathVariable Long categoryId) {
        return ResponseEntity.ok(gameService.getQuestionsByCategory(categoryId));
    }

    @PostMapping("/answer")
    public ResponseEntity<QuestionResultDto> submitAnswer(@RequestBody AnswerRequestDto dto) {
        return ResponseEntity.ok(gameService.submitAnswer(dto));
    }
}