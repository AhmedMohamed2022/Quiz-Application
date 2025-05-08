import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { LeaderboardService } from '../../services/leaderboard.service';
import { fadeAnimation } from '../../animations/animations';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  animations: [fadeAnimation],
})
export class ResultsComponent implements OnInit {
  finalScore = 0;
  totalQuestions = 0;
  playerName = '';
  isSubmitted = false;

  constructor(
    private quizService: QuizService,
    private leaderboardService: LeaderboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.finalScore = this.quizService.getCurrentScore();
    this.quizService.totalQuestions$.subscribe((total) => {
      this.totalQuestions = total;
    });

    // If user navigated directly to results without taking quiz
    if (this.totalQuestions === 0) {
      this.router.navigate(['/']);
    }
  }

  getScorePercentage(): number {
    return (this.finalScore / this.totalQuestions) * 100;
  }

  getScoreMessage(): string {
    const percentage = this.getScorePercentage();

    if (percentage >= 90) return "Amazing! You're an Angular expert!";
    if (percentage >= 70) return 'Great job! You know Angular well!';
    if (percentage >= 50) return 'Good effort! Keep learning Angular!';
    return "Keep practicing! You'll get better at Angular!";
  }

  getScoreClass(): string {
    const percentage = this.getScorePercentage();

    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-primary';
    if (percentage >= 50) return 'text-warning';
    return 'text-danger';
  }

  submitScore(): void {
    if (!this.playerName.trim()) return;

    this.leaderboardService.addScore(this.playerName, this.finalScore);
    this.isSubmitted = true;
  }

  restartQuiz(): void {
    this.router.navigate(['/quiz']);
  }

  viewLeaderboard(): void {
    this.router.navigate(['/leaderboard']);
  }
}
