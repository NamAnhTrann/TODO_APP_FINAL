import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, User } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {


  constructor(private auth: AuthService, private router:Router){}

  // ngOnInit(){
  //   this.auth.auth.onAuthStateChanged((user: User | null)=>{
  //     if(user){
  //       this.router.navigate(['/dashboard']);
  //       alert("You are logged in, redirecting to your dashboard!")
  //     } else {
  //       console.log("No user session")
  //     }
  //   })
  // }

  startNow() {
    this.auth.auth.onAuthStateChanged((user:User | null) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.auth.getUserIdByFirebaseUid(user.uid).subscribe(
          (response) => {
            console.log("MongoDB ID retrieved:", response.userId);
            this.router.navigate([`/dashboard/${response.userId}`]); // ✅ Navigate using `_id`
          },
          (error) => {
            console.error("Error retrieving MongoDB ID", error);
            this.router.navigate(['/login']);
          }
        );
      }
    });
  }
  

}
