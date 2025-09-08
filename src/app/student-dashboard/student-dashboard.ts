import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard {
  studentEmail: string = '';  // will come from login

  showCourses = false;
  selectedCourse: string | null = null;
  attendancePercentage: number | null = null;

  courses = ["Maths", "Physics", "Chemistry", "English", "Computer Science"];

  constructor(private router: Router) {
    // 👇 Get email from router state (set during login)
    const nav = this.router.getCurrentNavigation();
    this.studentEmail = nav?.extras.state?.['email'] || '';
  }

  toggleCourses() {
    this.showCourses = !this.showCourses;
  }

  selectCourse(course: string) {
    this.selectedCourse = course;

    // Dummy attendance data
    const dummyAttendance: any = {
      Maths: 85,
      Physics: 60,
      Chemistry: 92,
      English: 50,
      "Computer Science": 35
    };

    this.attendancePercentage = dummyAttendance[course];
  }
  // Returns color based on attendance percentage
  getAttendanceColor(): string {
    if (this.attendancePercentage === null) {
      return 'transparent'; // no color if no attendance selected
    }
    if (this.attendancePercentage < 60) {
      return 'red';
    } else if (this.attendancePercentage >= 60 && this.attendancePercentage <= 75) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}

