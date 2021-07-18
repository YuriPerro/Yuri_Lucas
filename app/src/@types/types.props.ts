export interface QuizDataProps {
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  difficulty: number;
  questions: Array<Questions>;
}

export interface Questions {
  title: string;
  options: Array<string>;
  answerIndex: number;
}
