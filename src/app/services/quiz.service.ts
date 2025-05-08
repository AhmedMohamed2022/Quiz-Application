import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Question, QuizResult } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private currentScore = 0;
  private totalQuestions = 0;
  private currentQuestionIndex = 0;
  private questions: Question[] = [];

  private questionSubject = new BehaviorSubject<Question | null>(null);
  public currentQuestion$ = this.questionSubject.asObservable();

  private scoreSubject = new BehaviorSubject<number>(0);
  public score$ = this.scoreSubject.asObservable();

  private questionIndexSubject = new BehaviorSubject<number>(0);
  public questionIndex$ = this.questionIndexSubject.asObservable();

  private totalQuestionsSubject = new BehaviorSubject<number>(0);
  public totalQuestions$ = this.totalQuestionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadQuestions(): Observable<{ questions: Question[] }> {
    return this.http.get<{ questions: Question[] }>('/mock-questions.json');
  }

  initQuiz(): void {
    this.currentScore = 0;
    this.currentQuestionIndex = 0;
    this.scoreSubject.next(0);
    this.questionIndexSubject.next(0);

    this.loadQuestions().subscribe((data) => {
      this.questions = data.questions;
      this.totalQuestions = this.questions.length;
      this.totalQuestionsSubject.next(this.totalQuestions);
      this.nextQuestion();
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length) {
      this.questionSubject.next(this.questions[this.currentQuestionIndex]);
      this.questionIndexSubject.next(this.currentQuestionIndex + 1);
      this.currentQuestionIndex++;
    } else {
      this.questionSubject.next(null); // Quiz finished
    }
  }

  answerQuestion(selectedIndex: number): boolean {
    const currentQuestion = this.questionSubject.getValue();
    if (!currentQuestion) return false;

    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      this.currentScore++;
      this.scoreSubject.next(this.currentScore);
    }

    return isCorrect;
  }

  getCurrentScore(): number {
    return this.currentScore;
  }

  isQuizFinished(): boolean {
    return this.currentQuestionIndex >= this.totalQuestions;
  }
}
