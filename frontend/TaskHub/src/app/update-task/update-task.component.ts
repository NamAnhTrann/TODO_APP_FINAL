import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../model/taskMode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
  taskId: string = "";
  task: Task = {} as Task;
  userId: string = "";

  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('taskId')!;
      this.userId = params.get("userId")!;
      console.log(` Retrieved taskId from route: ${this.taskId}`);

      if (this.taskId) {
        this.fetchTask();
      } else {
        console.error(" Task ID is missing in URL!");
      }
    });
  }

  fetchTask() {
    this.db.getTaskById(this.taskId).subscribe(
      (taskData: Task) => {
        this.task = taskData;
        console.log(" Task data fetched successfully:", taskData);
      },
      (error) => {
        console.error(" Error fetching task:", error);
      }
    );
  }

  updateTask() {
    const userId = this.route.snapshot.paramMap.get('userId'); // Extract user ID

    if (!userId || !this.taskId) {
      console.error("Missing user ID or task ID in the URL!");
      return;
    }

    this.db.updateTask(this.taskId, this.task).subscribe(
      () => {
        this.router.navigate([`/dashboard/${userId}`]);
      },
      (error) => {
        console.error("Error updating task:", error);
      }
    );
  }

  cancelBtn(){
    this.router.navigate([`dashboard/${this.userId}`])

  }

}
