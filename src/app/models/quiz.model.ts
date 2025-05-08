export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  playerName: string;
  score: number;
  date: Date;
}
