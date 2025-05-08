import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { fadeAnimation } from '../../animations/animations';
import { QuizResult } from '../../models/quiz.model';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  animations: [fadeAnimation],
})
export class LeaderboardComponent implements OnInit {
  leaderboardEntries: QuizResult[] = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardEntries = this.leaderboardService.getLeaderboard();
  }

  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
