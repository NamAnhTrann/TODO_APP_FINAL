import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  user: any;

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit() {
    this.auth.auth.onAuthStateChanged((user: User | null) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.auth.getUserIdByFirebaseUid(user.uid).subscribe(
          (response) => {
            const userId = response.userId;
            console.log("MongoDB ID retrieved:", userId);

            this.auth.isUserProfileComplete(userId).subscribe(
              (profileResponse) => {
                setTimeout(() => {
                  if (!profileResponse.isComplete) {
                    this.router.navigate([`/user-detail/${userId}`]); // ✅ Redirect to profile setup
                  } else {
                    this.router.navigate([`/dashboard/${userId}`]); // ✅ Navigate using `_id`
                  }
                });
              },
              (error) => {
                console.error("Error checking user profile", error);
                this.router.navigate(['/login']);
              }
            );
          },
          (error) => {
            console.error("Error retrieving MongoDB ID", error);
            this.router.navigate(['/login']);
          }
        );
      }
    });
  }

  googleSignup(){
    this.auth.loginWithGoogle().then(()=>{
      window.location.reload(); 
    }).catch((error)=>{
      console.error("Error during login", error)
    })
  }

}
