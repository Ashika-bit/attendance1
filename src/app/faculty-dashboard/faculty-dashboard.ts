import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faculty-dashboard.html',
  styleUrl: './faculty-dashboard.css'
})
export class FacultyDashboard {
  facultyEmail: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.facultyEmail = nav?.extras.state?.['email'] || '';
  }
}
