/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  studentEmail: string = '';
  studentPassword: string = '';
  facultyEmail: string = '';
  facultyPassword: string = '';

  constructor(private router: Router) { }

  studentLogin() {
    this.router.navigate(['/student-dashboard'], {
      state: { email: this.studentEmail }
    });
  }

  facultyLogin() {
    this.router.navigate(['/faculty-dashboard'], {
      state: { email: this.facultyEmail }
    });
  }
}
*/
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
  facultyLogin() {
    throw new Error('Method not implemented.');
  }
  studentEmail: any;
  studentPassword: any;
  facultyEmail: any;
  facultyPassword: any;
  constructor(private router: Router) { }

  onStudentLogin() {
    // Here you can validate input if needed
    this.router.navigate(['/student-dashboard']);
  }

}
