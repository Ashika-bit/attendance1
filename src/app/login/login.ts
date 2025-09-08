import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Student login fields
  studentEmail = '';
  studentPassword = '';

  // Faculty login fields
  facultyEmail = '';
  facultyPassword = '';

  constructor(private router: Router) { }

  // ✅ Student login handler
  onStudentLogin() {
    if (!this.studentEmail || !this.studentPassword) {
      alert('Please enter both student email and password.');
      return;
    }

    this.router.navigate(['/student-dashboard'], {
      state: { email: this.studentEmail }
    });
  }

  // ✅ Faculty login handler
  facultyLogin() {
    if (!this.facultyEmail || !this.facultyPassword) {
      alert('Please enter both faculty email and password.');
      return;
    }

    this.router.navigate(['/faculty-dashboard'], {
      state: { email: this.facultyEmail }
    });
  }
}