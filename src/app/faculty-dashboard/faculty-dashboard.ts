import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Student {
  rollNo: string;
  name: string;
  attendance: 'Present' | 'Absent' | null;
}

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './faculty-dashboard.html',
  styleUrls: ['./faculty-dashboard.css']
})
export class FacultyDashboard {
  facultyEmail: string = '';
  course: string = '';

  // Initial dummy students list
  students: Student[] = Array.from({ length: 20 }, (_, i) => ({
    rollNo: `ROLL${i + 1}`,
    name: `Student ${i + 1}`,
    attendance: null
  }));

  // Form controls
  formRollNo: string = '';
  formName: string = '';
  action: 'Add' | 'Delete' = 'Add';

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

  submitAction() {
    if (!this.formRollNo.trim() || !this.formName.trim()) {
      alert('Please enter both Roll No and Name');
      return;
    }

    if (this.action === 'Add') {
      // Check if rollNo already exists
      const exists = this.students.find(s => s.rollNo.toLowerCase() === this.formRollNo.trim().toLowerCase());
      if (exists) {
        alert('Student with this Roll No already exists!');
        return;
      }
      this.students.push({
        rollNo: this.formRollNo.trim(),
        name: this.formName.trim(),
        attendance: null
      });
      alert('Student added successfully!');
    } else if (this.action === 'Delete') {
      const index = this.students.findIndex(
        s => s.rollNo.toLowerCase() === this.formRollNo.trim().toLowerCase() &&
          s.name.toLowerCase() === this.formName.trim().toLowerCase()
      );
      if (index === -1) {
        alert('Student not found with the given Roll No and Name.');
        return;
      }
      this.students.splice(index, 1);
      alert('Student deleted successfully!');
    }

    // Reset form inputs
    this.formRollNo = '';
    this.formName = '';
    this.action = 'Add';
  }
}
