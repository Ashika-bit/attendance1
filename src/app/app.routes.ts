/*import { Routes } from '@angular/router';
import { Login } from './login/login';
import { StudentDashboard } from './student-dashboard/student-dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'student-dashboard', component: StudentDashboard },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
*/
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { StudentDashboard } from './student-dashboard/student-dashboard'; // 👈 add this


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'student-dashboard', component: StudentDashboard },

    { path: '', redirectTo: 'login', pathMatch: 'full' }

];
