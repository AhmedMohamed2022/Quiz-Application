import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'quiz', component: QuizComponent, data: { animation: 'quiz' } },

  {
    path: 'results',
    component: ResultsComponent,
    data: { animation: 'results' },
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    data: { animation: 'leaderboard' },
  },
  { path: '**', redirectTo: '' },
  // {
  //   path: 'quiz',
  //   loadComponent: () =>
  //     import('./components/quiz/quiz/quiz.component').then(
  //       (m) => m.QuizComponent
  //     ),
  //   data: { animation: 'quiz' },
  // },
  // {
  //   path: 'results',
  //   loadComponent: () =>
  //     import('./components/results/results/results.component').then(
  //       (m) => m.ResultsComponent
  //     ),
  //   data: { animation: 'results' },
  // },
  // {
  //   path: 'leaderboard',
  //   loadComponent: () =>
  //     import('./components/leaderboard/leaderboard/leaderboard.component').then(
  //       (m) => m.LeaderboardComponent
  //     ),
  //   data: { animation: 'leaderboard' },
  // },
];
