import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../user-registration-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieViewComponent } from '../movie-view/movie-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  // movies view loads all the movies
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Requests external api to get all movies and store it in a movies array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Opens up a genre dialogue with the name and description
   * variables displayed
   *
   * @param name
   * @param description
   */
  openGenreDialog(name: any, description: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  /**
   * Opens up a director dialogue with the name and description
   * variables displayed
   *
   * @param name
   * @param description
   */
  openDirectorDialog(name: any, description: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  /**
   * Opens up a synopsis dialogue with the name and description
   * variables displayed
   *
   * @param name
   * @param description
   */
  openSynopsisDialog(name: any, description: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  /**
   * Navigates user to the profile view
   */
  profileView(): void {
    this.router.navigate(['profile']);
  }

  /**
   * This function takes the parameter (movie)id and adds it to the user's
   * favorite list
   *
   * @param id
   */
  addFavorites(id: string): void {
    this.fetchApiData
      .addFavorites(id, localStorage.getItem('username') || '{}')
      .subscribe(() => {
        this.snackBar.open('Added!', 'OK', {
          duration: 2000,
        });
      });
  }

  /**
   * This function takes the parameter (movie) id returns boolian if it
   * is in the user's favorite list
   *
   * @param id
   * @returns
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * This function takes the parameter (movie) id and removes it from the
   * user's favorite list
   *
   * @param id
   */
  removeFavorites(id: string): void {
    this.fetchApiData
      .deleteFavorites(id, localStorage.getItem('username') || '{}')
      .subscribe(() => {
        this.snackBar.open('Removed!', 'OK', {
          duration: 2000,
        });
      });
  }
}
