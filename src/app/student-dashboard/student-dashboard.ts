import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective, FormsModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard {
  studentEmail: string = '';

  showCourses = false;
  selectedCourse: string | null = null;
  attendancePercentage: number | null = null;

  courses = ["Maths", "Physics", "Chemistry", "English", "Computer Science"];

  attendanceData: Record<string, { date: string; status: 'Present' | 'Absent' }[]> = {
    Maths: [
      { date: '2025-08-01', status: 'Present' },
      { date: '2025-08-02', status: 'Absent' },
      { date: '2025-08-03', status: 'Present' },
      { date: '2025-08-04', status: 'Present' },
      { date: '2025-08-05', status: 'Absent' },
    ],
    Physics: [
      { date: '2025-08-01', status: 'Absent' },
      { date: '2025-08-02', status: 'Absent' },
      { date: '2025-08-03', status: 'Present' },
      { date: '2025-08-04', status: 'Present' },
      { date: '2025-08-05', status: 'Present' },
    ],
    Chemistry: [
      { date: '2025-08-01', status: 'Present' },
      { date: '2025-08-02', status: 'Present' },
      { date: '2025-08-03', status: 'Present' },
      { date: '2025-08-04', status: 'Absent' },
      { date: '2025-08-05', status: 'Present' },
    ],
    English: [
      { date: '2025-08-01', status: 'Absent' },
      { date: '2025-08-02', status: 'Present' },
      { date: '2025-08-03', status: 'Absent' },
      { date: '2025-08-04', status: 'Present' },
      { date: '2025-08-05', status: 'Present' },
    ],
    "Computer Science": [
      { date: '2025-08-01', status: 'Absent' },
      { date: '2025-08-02', status: 'Absent' },
      { date: '2025-08-03', status: 'Absent' },
      { date: '2025-08-04', status: 'Present' },
      { date: '2025-08-05', status: 'Present' },
    ]
  };

  public lineChartData: any;
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  // For new attendance record form
  newRecordDate: string = '';
  newRecordStatus: 'Present' | 'Absent' = 'Present';

  constructor(@Inject(Router) private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.studentEmail = nav?.extras.state?.['email'] || '';
  }

  toggleCourses() {
    this.showCourses = !this.showCourses;
  }

  selectCourse(course: string) {
    this.selectedCourse = course;

    const dummyAttendance: any = {
      Maths: 85,
      Physics: 60,
      Chemistry: 92,
      English: 50,
      "Computer Science": 35
    };

    this.attendancePercentage = dummyAttendance[course];

    const records = this.attendanceData[course] || [];
    this.lineChartLabels = records.map(r => r.date);
    this.lineChartData = [
      {
        data: records.map(r => (r.status === 'Present' ? 1 : 0)),
        label: 'Attendance (1 = Present, 0 = Absent)',
        fill: false,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        tension: 0.1,
      }
    ];

    // Reset new record inputs on course selection
    this.newRecordDate = '';
    this.newRecordStatus = 'Present';
  }

  getAttendanceColor(): string {
    if (this.attendancePercentage === null) return 'transparent';
    if (this.attendancePercentage < 60) return 'red';
    if (this.attendancePercentage <= 75) return 'yellow';
    return 'green';
  }

  onRecordClick(record: { date: string; status: 'Present' | 'Absent' }) {
    alert(`Date: ${record.date}\nStatus: ${record.status}`);
  }

  addAttendanceRecord() {
    if (!this.selectedCourse) {
      alert('Please select a course first.');
      return;
    }
    if (!this.newRecordDate) {
      alert('Please select a date.');
      return;
    }
    // Check if date already exists
    const existingRecord = this.attendanceData[this.selectedCourse].find(r => r.date === this.newRecordDate);
    if (existingRecord) {
      alert('Attendance record for this date already exists.');
      return;
    }

    // Add new record
    this.attendanceData[this.selectedCourse].push({
      date: this.newRecordDate,
      status: this.newRecordStatus,
    });

    // Sort records by date ascending
    this.attendanceData[this.selectedCourse].sort((a, b) => a.date.localeCompare(b.date));

    // Refresh chart and attendance percentage (optional: recalculate attendance %)
    this.selectCourse(this.selectedCourse);

    // Clear form fields
    this.newRecordDate = '';
    this.newRecordStatus = 'Present';
  }
}
