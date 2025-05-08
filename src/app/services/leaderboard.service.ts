import { Injectable } from '@angular/core';
import { QuizResult } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private readonly STORAGE_KEY = 'quiz_leaderboard';

  constructor() {}

  getLeaderboard(): QuizResult[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  addScore(playerName: string, score: number): void {
    const leaderboard = this.getLeaderboard();

    const newEntry: QuizResult = {
      playerName,
      score,
      date: new Date(),
    };

    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leaderboard));
  }
}
