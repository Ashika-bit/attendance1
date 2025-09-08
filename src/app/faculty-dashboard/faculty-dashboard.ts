import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faculty-dashboard.html',
  styleUrls: ['./faculty-dashboard.css']
})
export class FacultyDashboard {
  facultyEmail: string = '';
  course: string = '';

  // Dummy list of 20 students
  students = Array.from({ length: 20 }, (_, i) => ({
    rollNo: `ROLL${i + 1}`,
    name: `Student ${i + 1}`,
    attendance: null as 'Present' | 'Absent' | null
  }));

  constructor(private route: ActivatedRoute, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.facultyEmail = nav?.extras.state?.['email'] || '';
    this.course = this.route.snapshot.params['course'] || '';
  }

  markAttendance(rollNo: string, status: 'Present' | 'Absent') {
    const student = this.students.find(s => s.rollNo === rollNo);
    if (student) {
      student.attendance = status;
    }
  }
}