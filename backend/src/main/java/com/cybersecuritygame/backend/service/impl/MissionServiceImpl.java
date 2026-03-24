package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import com.cybersecuritygame.backend.dto.missionDto.MissionStepDto;
import com.cybersecuritygame.backend.model.*;
import com.cybersecuritygame.backend.model.UserMissionProgress;
import com.cybersecuritygame.backend.repository.*;
import com.cybersecuritygame.backend.service.MissionService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionStepRepository stepRepository;
    private final QuestionRepository questionRepository;
    private final UserMissionProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final MissionRepository missionRepository;

    public MissionServiceImpl(MissionStepRepository stepRepository,
                              QuestionRepository questionRepository,
                              UserMissionProgressRepository progressRepository,
                              UserRepository userRepository,
                              MissionRepository missionRepository) {
        this.stepRepository = stepRepository;
        this.questionRepository = questionRepository;
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.missionRepository = missionRepository;
    }


    @Override
    public MissionStepDto startMission(Long missionId, Long userId) {

        Optional<UserMissionProgress> progressOpt =
                progressRepository.findByUserIdAndMissionId(userId, missionId);

        UserMissionProgress progress;

        if (progressOpt.isPresent()) {
            progress = progressOpt.get();
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Mission mission = missionRepository.findById(missionId)
                    .orElseThrow(() -> new RuntimeException("Mission not found"));

            progress = new UserMissionProgress();
            progress.setUser(user);
            progress.setMission(mission);
            progress.setCurrentStep(1);
            progress.setCompleted(false);

            progressRepository.save(progress);
        }

        MissionStep step = stepRepository
                .findByMissionIdAndStepOrder(missionId, progress.getCurrentStep())
                .orElseThrow(() -> new RuntimeException("Step not found"));

        return mapStepToDto(step);
    }

    @Override
    public MissionStepDto submitStep(AnswerRequestDto request) {

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        boolean correct = question.getCorrectAnswer()
                .equals(request.getSelectedAnswer());

        if (!correct) {
            throw new RuntimeException("Wrong answer, try again");
        }

        MissionStep currentStep = stepRepository
                .findByQuestionId(question.getId())
                .orElseThrow(() -> new RuntimeException("Step not found"));

        Long missionId = currentStep.getMission().getId();

        UserMissionProgress progress = progressRepository
                .findByUserIdAndMissionId(request.getUser().getId(), missionId)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        if (currentStep.getStepOrder() != progress.getCurrentStep()) {
            throw new RuntimeException("You must complete steps in order!");
        }

        User user = progress.getUser();
        user.setPoints(user.getPoints() + 10);
        userRepository.save(user);

        int nextStepOrder = progress.getCurrentStep() + 1;

        Optional<MissionStep> nextStepOpt = stepRepository
                .findByMissionIdAndStepOrder(missionId, nextStepOrder);

        if (nextStepOpt.isEmpty()) {
            progress.setCompleted(true);
            progressRepository.save(progress);

            MissionStepDto dto = new MissionStepDto();
            dto.setCompleted(true);
            dto.setMessage("🎉 Mission completed! Great job!");

            return dto;
        }


        progress.setCurrentStep(nextStepOrder);
        progressRepository.save(progress);

        return mapStepToDto(nextStepOpt.get());
    }

    private MissionStepDto mapStepToDto(MissionStep step) {

        Question q = step.getQuestion();

        QuestionDto qDto = new QuestionDto();
        qDto.setId(q.getId());
        qDto.setQuestion(q.getQuestion());
        qDto.setOptions(q.getOptions());
        qDto.setDifficulty(q.getDifficulty().name());

        MissionStepDto dto = new MissionStepDto();
        dto.setStepOrder(step.getStepOrder());
        dto.setQuestion(qDto);

        return dto;
    }
}