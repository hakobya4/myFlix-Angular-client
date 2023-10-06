import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  moviesFavorite: any = [];
  @Input() editData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      this.fetchApiData
        .getUser(localStorage.getItem('username') || '{}')
        .subscribe((result) => {
          this.user = result;
          this.favoriteMovies();
        });
    } else this.router.navigate(['welcome']);
  }
  editUser(): void {
    this.fetchApiData
      .editUser(this.editData, localStorage.getItem('username') || '{}')
      .subscribe(
        (result) => {
          localStorage.setItem('user', JSON.stringify(result));
          localStorage.setItem('username', result.Username);
          this.snackBar.open('User updated', 'OK', {
            duration: 2000,
          });
          window.location.reload();
        },
        () => {
          this.snackBar.open(
            'Fields Missing Values or User Already exist',
            'OK',
            {
              duration: 2000,
            }
          );
        }
      );
  }

  favoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const movies = resp;
      this.moviesFavorite = movies.filter(
        (movie: { _id: any }) =>
          this.user.FavoriteMovies.indexOf(movie._id) >= 0
      );
    });
  }
  deleteUser(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
    this.snackBar.open('User deleted', 'OK', {
      duration: 2000,
    });
    this.fetchApiData
      .deleteUser(localStorage.getItem('username') || '{}')
      .subscribe(() => {
        localStorage.clear();
      });
  }
}
