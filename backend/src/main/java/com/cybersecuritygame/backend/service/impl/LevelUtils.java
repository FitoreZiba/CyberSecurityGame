package com.cybersecuritygame.backend.service.impl;

public class LevelUtils {


        public static int calculateLevel(int points) {
            int level = points / 100;
            return Math.min(level, 4);
        }
}
