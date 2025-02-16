import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../model/userModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  userId = "";
  user: User = {} as User;
 

 
  constructor(private db:DatabaseService, private route:ActivatedRoute, private router: Router){}
  ngOnInit() {
    this.fetchUser();
  }

  fetchUser(){
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
    });
  }

  updateUser(){
    const userId = this.route.snapshot.paramMap.get("id");
    if (!userId ) {
      console.error("Missing user ID or task ID in the URL!");
      return;
    }
    this.db.updateUser(this.userId, this.user).subscribe(()=>{
      this.router.navigate([`/dashboard/${userId}`]);
    }, 
    (err) =>{
      console.error("Error updating user", err)
    }
  );

    
  }


  

}
