package com.cybersecuritygame.backend.service.impl;

import com.cybersecuritygame.backend.dto.gameDto.AnswerRequestDto;
import com.cybersecuritygame.backend.dto.gameDto.QuestionDto;
import com.cybersecuritygame.backend.dto.missionDto.MissionStepDto;
import com.cybersecuritygame.backend.model.*;
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

        System.out.println(">>> startMission missionId=" + missionId + " userId=" + userId);

        Optional<UserMissionProgress> progressOpt =
                progressRepository.findByUserIdAndMissionId(userId, missionId);

        UserMissionProgress progress;

        if (progressOpt.isPresent()) {
            progress = progressOpt.get();
            progress.setCurrentStep(1);
            progressRepository.save(progress);

        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId));

            Mission mission = missionRepository.findById(missionId)
                    .orElseThrow(() -> new RuntimeException("Mission not found: " + missionId));

            progress = new UserMissionProgress();
            progress.setUser(user);
            progress.setMission(mission);
            progress.setCurrentStep(1);
            progress.setCompleted(false);
            progressRepository.save(progress);
        }

        MissionStep step = stepRepository
                .findByMissionIdAndStepOrder(missionId, progress.getCurrentStep())
                .orElseThrow(() -> new RuntimeException(
                        "Step not found for missionId=" + missionId
                                + " stepOrder=" + progress.getCurrentStep()));

        return mapStepToDto(step, false, null, null);
    }

    @Override
    public MissionStepDto submitStep(AnswerRequestDto request) {

        System.out.println(">>> submitStep userId="    + request.getUserId()
                + " questionId=" + request.getQuestionId()
                + " answer=["    + request.getSelectedAnswer() + "]");


        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException(
                        "Question not found: " + request.getQuestionId()));

        String stored   = question.getCorrectAnswer().trim().toLowerCase();
        String selected = request.getSelectedAnswer().trim().toLowerCase();

        System.out.println(">>> stored answer:   [" + stored   + "]");
        System.out.println(">>> selected answer: [" + selected + "]");

        boolean correct = stored.equals(selected);
        System.out.println(">>> correct: " + correct);

        String explanation  = question.getExplanation();
        String correctAnswer = question.getCorrectAnswer();

        if (!correct) {
            MissionStepDto dto = new MissionStepDto();
            dto.setCorrect(false);
            dto.setCompleted(false);
            dto.setMissionCompleted(false);
            dto.setExplanation(explanation);
            dto.setCorrectAnswer(correctAnswer);
            dto.setMessage("Not correct — read the explanation and try again!");
            dto.setQuestion(buildQuestionDto(question));
            return dto;
        }

        MissionStep currentStep = stepRepository
                .findByQuestionId(question.getId())
                .orElseThrow(() -> new RuntimeException(
                        "MissionStep not found for questionId: " + question.getId()));

        Long missionId = currentStep.getMission().getId();

        UserMissionProgress progress = progressRepository
                .findByUserIdAndMissionId(request.getUserId(), missionId)
                .orElseThrow(() -> new RuntimeException(
                        "Progress not found for userId=" + request.getUserId()
                                + " missionId=" + missionId));

        if (currentStep.getStepOrder() != progress.getCurrentStep()) {
            MissionStepDto dto = new MissionStepDto();
            dto.setCorrect(false);
            dto.setCompleted(false);
            dto.setMissionCompleted(false);
            dto.setMessage("Step order mismatch — please restart the mission.");
            dto.setQuestion(buildQuestionDto(question));
            return dto;
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException(
                        "User not found: " + request.getUserId()));
        user.setPoints(user.getPoints() + 10);
        userRepository.save(user);

        int nextStepOrder = progress.getCurrentStep() + 1;
        Optional<MissionStep> nextStepOpt = stepRepository
                .findByMissionIdAndStepOrder(missionId, nextStepOrder);

        if (nextStepOpt.isEmpty()) {

            if (!progress.isCompleted()) {
                progress.setCompleted(true);
                System.out.println(">>> Mission COMPLETED for user="
                        + user.getUsername() + " mission=" + missionId);
            } else {
                System.out.println(">>> Mission already completed previously — not counting again");
            }

            progressRepository.save(progress);

            MissionStepDto dto = new MissionStepDto();
            dto.setCorrect(true);
            dto.setCompleted(true);
            dto.setMissionCompleted(true);
            dto.setExplanation(explanation);
            dto.setCorrectAnswer(correctAnswer);
            dto.setMessage("Mission complete! Outstanding work, Agent!");
            return dto;
        }

        progress.setCurrentStep(nextStepOrder);
        progressRepository.save(progress);

        MissionStepDto dto = mapStepToDto(
                nextStepOpt.get(), true, explanation, correctAnswer);
        dto.setCorrect(true);
        dto.setMissionCompleted(false);
        return dto;
    }

    private MissionStepDto mapStepToDto(MissionStep step, boolean showPrevExplanation,
                                        String explanation, String correctAnswer) {
        MissionStepDto dto = new MissionStepDto();
        dto.setStepOrder(step.getStepOrder());
        dto.setCompleted(false);
        dto.setQuestion(buildQuestionDto(step.getQuestion()));
        if (showPrevExplanation) {
            dto.setExplanation(explanation);
            dto.setCorrectAnswer(correctAnswer);
        }
        return dto;
    }

    private QuestionDto buildQuestionDto(Question q) {
        QuestionDto qDto = new QuestionDto();
        qDto.setId(q.getId());
        qDto.setQuestion(q.getQuestion());
        qDto.setOptions(q.getOptions());
        qDto.setDifficulty(q.getDifficulty().name());
        return qDto;
    }
}