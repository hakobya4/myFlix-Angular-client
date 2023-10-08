import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent {
  constructor(
    //accesses the dialogue's information to change it
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
}
