import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit(): void {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.getMovies();
    } else this.router.navigate(['welcome']);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  openGenreDialog(name: any, description: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }
  openDirectorDialog(name: any, description: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }
  openSynopsisDialog(name: any, description: any): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }
  profileView(): void {
    this.router.navigate(['profile']);
  }
  addFavorites(id: string): void {
    this.fetchApiData
      .addFavorites(id, localStorage.getItem('username') || '{}')
      .subscribe(() => {
        this.snackBar.open('Added!', 'OK', {
          duration: 2000,
        });
      });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

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
