import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  /**
   * Navigates to movies view
   */
  welcomeView(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to profile view
   */
  profileView(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Navigates to welcome after users logout and clears storage
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
