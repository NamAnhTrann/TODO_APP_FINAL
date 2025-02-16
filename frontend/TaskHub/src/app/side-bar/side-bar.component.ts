import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isCollapse = false
  @Input() userId!: string;

  constructor(private auth:AuthService, private router: Router){}
    toggleNavBarCollapse(){
      this.isCollapse = !this.isCollapse;
    }



    logout() {
      this.auth.logout().then(() => {
        this.router.navigate(['/login']);
      });
    }
}
