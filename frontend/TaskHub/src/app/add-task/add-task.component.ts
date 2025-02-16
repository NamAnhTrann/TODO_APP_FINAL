import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Task } from '../model/taskMode';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  userId = "";
  taskData: Task = new Task();

  constructor(private db:DatabaseService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    console.log("Retrieved User ID:", this.userId);

  }

  addTask() {
  console.log("Sending request with:", this.taskData);
  this.db.addTask(this.userId, this.taskData).subscribe(
    (response) => {
      console.log("Task added successfully", response);
      this.taskData = new Task(); //
      this.router.navigate([`dashboard/${this.userId}`])
    },
    (error) => {
      console.error("Failed to add task:", error);
    }
  );

}
cancelBtn(){
  this.router.navigate([`dashboard/${this.userId}`])

}




}
