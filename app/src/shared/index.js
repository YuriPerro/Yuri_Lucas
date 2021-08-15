export const QUIZ_DIFFICULTY_XP = { 1: 55, 2: 80, 3: 150 };

export const getQuizXp = (quiz) => QUIZ_DIFFICULTY_XP[quiz.difficulty];

export const getXpToLevelUp = (level) => level * 500;
