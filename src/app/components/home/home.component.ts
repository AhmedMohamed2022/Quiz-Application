import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { fadeAnimation } from '../../animations/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeAnimation],
})
export class HomeComponent {
  title = 'Angular Quiz Challenge';
  constructor(private router: Router) {}
  startQuiz(event: Event) {
    event.preventDefault();
    this.router.navigate(['/quiz']);
  }
}
