import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * External api is declared
 */
const apiUrl = 'https://movie-api-myflix-39dfea723223.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it
   * available via this.http
   */
  constructor(private http: HttpClient) {}

  /**
   * This function takes the user details parameter
   * and fetches an external api function to register user
   * in a database
   *
   * @param userDetails object with username, password, email, birthday
   * @returns
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * This function takes the user details parameter
   * and fetches an external api function to return
   * token and user info
   *
   * @param userDetails object with username password
   * @returns token and user info
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * This function fetches an external api function to fetch movies
   *
   * @returns object of movie list
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter movie id and returns info
   * regarding one movie using an external api
   *
   * @param movie object movie id
   * @returns object of movie information
   */
  getOneMovie(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'movies/' + movie, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter director name and returns info
   * regarding the director using an external api
   *
   * @param director object director name
   * @returns object director info
   */
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'director/' + director, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter genre name and returns info
   * regarding the genre using an external api
   *
   * @param director object genre name
   * @returns object genre info
   */
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'genre/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter username and returns info
   * regarding the user using an external api
   *
   * @param username object username
   * @returns object user info
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter username and returns info
   * regarding the user's favorite movies list using an external api
   *
   * @param username object username
   * @returns object user's favorite list info
   */
  getFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameters username and movieID and returns the
   * external api to add movie id into user's favorite movies list array
   *
   * @param username object username
   * @param movieID object movie id
   * @returns
   */
  addFavorites(movieID: any, username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.FavoriteMovies.push(movieID); //adds movie id to the user's favorite movies array
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .post<any>(
        apiUrl + 'users/' + username + '/movies/' + movieID,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter movieID and returns a boolean
   * if the movie id is within the user's favorite list array
   *
   * @param movieID object movie id
   * @returns true or false
   */
  isFavoriteMovie(movieID: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**
   * This function takes parameters username and newUser and returns the
   * external api to update the users information with the newUser
   *
   * @param newUser object new user information
   * @param username object username
   * @returns
   */
  editUser(newUser: any, username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put<any>(apiUrl + 'users/' + username, newUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameter username and returns the external
   * api to delete the user from database
   *
   * @param username object username
   * @returns
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<any>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This function takes parameters username and movieID and returns the
   * external api to delete movie id from user's favorite movies list array
   *
   * @param movieID object movie id
   * @param username object username
   * @returns
   */
  deleteFavorites(movieID: any, username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const index = user.FavoriteMovies.indexOf(movieID);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }

    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete<any>(apiUrl + username + '/favorites/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  /**
   * This function takes parameter error and returns an error message
   *
   * @param error
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
