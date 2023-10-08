import { Component, OnInit } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls
import { UserRegistrationService } from '../user-registration-service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.scss'],
})
export class ConfirmFormComponent implements OnInit {
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ConfirmFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  /**
   * This is the function that uses the external api to delete a user
   * from the mongodb database and clears the local storage of the user
   */
  deleteUser(): void {
    this.dialogRef.close(); // This will close the modal on success
    this.router.navigate(['welcome']);

    this.snackBar.open('User deleted', 'OK', {
      duration: 2000,
    });
    this.fetchApiData
      .deleteUser(localStorage.getItem('username') || '{}')
      .subscribe(() => {});
    localStorage.clear();
  }
}
