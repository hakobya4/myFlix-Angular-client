import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private router: Router) {}
  welcomeView(): void {
    this.router.navigate(['movies']);
  }
  profileView(): void {
    this.router.navigate(['profile']);
  }
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
