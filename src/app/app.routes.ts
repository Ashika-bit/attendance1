import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { StudentDashboard } from './student-dashboard/student-dashboard'; // 👈 add this
import { FacultyDashboard } from './faculty-dashboard/faculty-dashboard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'student-dashboard', component: StudentDashboard },
    { path: 'faculty-dashboard', component: FacultyDashboard },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];
