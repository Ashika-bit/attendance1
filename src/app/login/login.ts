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

  onStudentLogin() {
    // You can add validation here
    if (this.studentEmail && this.studentPassword) {
      this.router.navigate(['/student-dashboard'], {
        state: { email: this.studentEmail }
      });
    } else {
      alert('Please enter student email and password');
    }
  }

  facultyLogin() {
    const courseMap: Record<string, string> = {
      'faculty1@gmail.com': 'Maths',
      'faculty2@gmail.com': 'Physics',
      'faculty3@gmail.com': 'Chemistry',
      'faculty4@gmail.com': 'English',
      'faculty5@gmail.com': 'Computer Science'
    };

    const course = courseMap[this.facultyEmail];
    if (!course) {
      alert('Unrecognized faculty email');
      return;
    }

    this.router.navigate(['/faculty-dashboard', course], {
      state: { email: this.facultyEmail }
    });
  }
}