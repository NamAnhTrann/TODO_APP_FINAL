import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Daily } from '../model/dailyModel';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { User } from 'firebase/auth';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, FormsModule, SideBarComponent],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css'
})
export class DailyComponent {

  dailies: Daily[] = []
  dailyData: Daily = new Daily();
  userId = "";
  dailyId: string = "";
  user: User | null = null;


  constructor(private db: DatabaseService, private route: ActivatedRoute, private router:Router){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      console.log(id, "is retrieved")

      if(id){
        this.userId = id;
        this.fetchUserDailies(id);
      } else{
        console.error("Error ")
      }
    })
  }

  addDaily(){
    if (!this.userId) {
      console.error("User ID is missing! Cannot add task.");
      return;
    }
    this.db.addDailyTask(this.userId, this.dailyData).subscribe(()=>{
      this.dailyData = new Daily();
      this.fetchUserDailies(this.userId)
    })
  }

  fetchUserDailies(userId: string){
    this.db.displayDailyYask(userId).subscribe((data:any)=>{
      this.dailies = data;
    })
  }

  removeDaily(dailyId:string){
    this.db.removeDaily(dailyId).subscribe(()=>{
      if (this.userId) {
        this.fetchUserDailies(this.userId);
      }


    })

  }



}
