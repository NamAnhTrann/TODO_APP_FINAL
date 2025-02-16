import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DailyComponent } from './daily/daily.component';

export const routes: Routes = [
    {path: "", component: HomepageComponent},
    {path: "dashboard/:id", component:DashboardComponent},
    {path: "login", component: LoginComponent},
    {path: "add-task/:id", component:AddTaskComponent},
    {path: 'update-task/:userId/:taskId', component: UpdateTaskComponent },
    {path: "user-detail/:id", component:UserDetailComponent},
    {path: "daily-task/:id", component:DailyComponent}
];
