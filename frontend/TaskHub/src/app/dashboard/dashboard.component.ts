import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Task } from '../model/taskMode';
import { AuthService } from '../services/auth.service';
import { User } from '../model/userModel';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CommonModule } from '@angular/common';
import { WeatherWdigetComponent } from "../weather-wdiget/weather-wdiget.component";
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DailyComponent } from "../daily/daily.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterOutlet, SideBarComponent, CalendarComponent, CommonModule, WeatherWdigetComponent, DragDropModule, DailyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: User | null = null;
  task: Task[] = [];
  taskId:string = "";
  isCollapse = false
  userId = "";

  taskNotDone: Task[] = [];
  taskPending: Task[] = [];
  taskDone: Task[] = [];




  constructor(private db:DatabaseService, private router: Router, private route: ActivatedRoute, private auth:AuthService){ }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Extract `id` from URL
      console.log(`The extracted user ID is: ${id}`);

      if (id) {
        this.userId = id;
        this.fetchUserTask(id); // Call `fetchUserTask()` only if `id` exists
        this.fetchUserId(id)
      } else {
        console.log("User ID is missing in the URL");
      }
    });
  }
  toggleNavBarCollapse(){
    this.isCollapse = !this.isCollapse;
  }

  fetchUserId(userId:string){
    this.db.getUserId(userId).subscribe((data:any)=>{
      this.user = data;
      console.log("Fetch User Data")
    })

  }


  //drag and drop
  drop(event: CdkDragDrop<Task[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      // Same column: just reorder
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Moved to a different column
      const movedTask = event.previousContainer.data[event.previousIndex];
      movedTask.taskCompletion = newStatus;

      // Update status in DB
      this.db.updateTaskStatus(movedTask._id, newStatus).subscribe(() => {
        console.log('Task status updated to', newStatus);
      });

      // Transfer the item between arrays
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log("Updated")
    }
  }


  fetchUserTask(userId: string) {
    this.db.getTaskByUser(userId).subscribe((data: any) => {
      this.task = data;
      this.taskNotDone = data.filter((task: { taskCompletion: string; }) => task.taskCompletion === "NOT DONE");
      this.taskPending = data.filter((task: { taskCompletion: string; }) => task.taskCompletion === "PENDING");
      this.taskDone = data.filter((task: { taskCompletion: string; }) => task.taskCompletion === "DONE");
      console.log("Fetched user-specific tasks:", data);
    }, (error) => {
      console.error("Error fetching tasks:", error);
    });
  }


    // getUserId(id : string){
    //   this.db.getUserId(id).subscribe((data:any)=>{
    //     console.log(`ID retrieved: ${id}`)
    //   })
    // }

    deleteTask(taskId: string){
      this.db.removeTask(taskId).subscribe(()=>{
        if (this.user && this.user._id) {
          this.fetchUserTask(this.user._id);
        }
      });
    }

    fetchTaskId(taskId: string){
      this.db.getTaskById(taskId).subscribe((data:any)=>{
        this.task = data;
      })
    }

    fetchTask(){
      this.db.getTask().subscribe((data:any)=>{
        this.task = data;
        console.log("Received task data:", data);
      });
    }

    addTaskBtn() {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.router.navigate([`/add-task/${userId}`]);
      } else {
        console.log("User ID is missing");
      }
    }

    updateTask(taskId: string){
      const userId = this.route.snapshot.paramMap.get('id'); // Extract user ID
      if (userId) {
        this.router.navigate([`/update-task/${userId}/${taskId}`]); // ✅ Pass both userId and taskId
      } else {
        console.log("User ID is missing");
      }
    }


    logout() {
      this.auth.logout().then(() => {
        this.router.navigate(['/login']);
      });
    }







}
