import { DateshowService } from './../../services/dateshow.service';
import { RatingService } from './../../services/rating.service';
import { MovieDetailComponent } from './movie-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: 'movies/:id/:day',
      component: MovieDetailComponent,
      resolve: {
      }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [RatingService, DateshowService]
})
export class MovieDetailRoutingModule { }
