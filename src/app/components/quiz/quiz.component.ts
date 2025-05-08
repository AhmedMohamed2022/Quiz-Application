import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/quiz.model';
import { fadeAnimation, slideInAnimation } from '../../animations/animations';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [slideInAnimation, fadeAnimation],
})
export class QuizComponent implements OnInit, OnDestroy {
  currentQuestion: Question | null = null;
  timeLeft = 15;
  timer$ = new Subject<void>();
  progress = 100;
  questionIndex = 0;
  totalQuestions = 0;
  selectedAnswer: number | null = null;
  answerSubmitted = false;
  isCorrect = false;
  timerSubscription?: Subscription;
  totalQuestionsSub?: Subscription;
  questionIndexSub?: Subscription;
  currentQuestionSub?: Subscription;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.initQuiz();

    this.totalQuestionsSub = this.quizService.totalQuestions$.subscribe(
      (total) => {
        this.totalQuestions = total;
      }
    );

    this.questionIndexSub = this.quizService.questionIndex$.subscribe(
      (index) => {
        this.questionIndex = index;
      }
    );

    this.currentQuestionSub = this.quizService.currentQuestion$.subscribe(
      (question) => {
        this.currentQuestion = question;

        if (question) {
          this.resetTimer();
          this.startTimer();
        } else if (this.quizService.isQuizFinished()) {
          this.navigateToResults();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.timer$.next();
    this.timer$.complete();
    this.timerSubscription?.unsubscribe();
    this.totalQuestionsSub?.unsubscribe();
    this.questionIndexSub?.unsubscribe();
    this.currentQuestionSub?.unsubscribe();
  }

  resetTimer(): void {
    this.timeLeft = 15;
    this.progress = 100;
    this.selectedAnswer = null;
    this.answerSubmitted = false;
    this.isCorrect = false;
    this.timer$.next();
  }

  startTimer(): void {
    this.timerSubscription = interval(100)
      .pipe(takeUntil(this.timer$))
      .subscribe(() => {
        this.timeLeft -= 0.1;
        this.progress = (this.timeLeft / 15) * 100;

        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.progress = 0;
          this.answerSubmitted = true;
          this.timer$.next();

          setTimeout(() => this.nextQuestion(), 2000);
        }
      });
  }

  selectAnswer(optionIndex: number): void {
    if (this.answerSubmitted) return;

    this.selectedAnswer = optionIndex;
    this.answerSubmitted = true;
    this.isCorrect = this.quizService.answerQuestion(optionIndex);
    this.timer$.next();

    setTimeout(() => this.nextQuestion(), 2000);
  }

  nextQuestion(): void {
    this.quizService.nextQuestion();
  }

  navigateToResults(): void {
    this.router.navigate(['/results']);
  }

  getProgressBarClass(): string {
    if (this.progress > 60) return 'bg-success';
    if (this.progress > 30) return 'bg-warning';
    return 'bg-danger';
  }

  getOptionClass(index: number): string {
    if (!this.answerSubmitted) return '';

    if (this.currentQuestion && index === this.currentQuestion.correctAnswer) {
      return 'correct';
    }

    if (
      index === this.selectedAnswer &&
      this.selectedAnswer !== this.currentQuestion?.correctAnswer
    ) {
      return 'incorrect';
    }

    return '';
  }
}
