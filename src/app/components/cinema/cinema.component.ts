import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from './../../services/movie.service';
import { CinemaService } from './../../services/cinema.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Cinema } from '../../models/cinema';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CinemaComponent implements OnInit {
  meals: string[] = [];
  cinema: Cinema;
  movies: Movie[];

  public selected: number;
  cinema_name: string;
  status: string;
  movie_imdb: Movie;

  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  // tslint:disable-next-line:max-line-length
  constructor(private cinemaService: CinemaService, private movieService: MovieService, private activatedroute: ActivatedRoute, private route: Router) { }

  onClickFilter(cinema_name: string, status: string): void {
    const link = ['/cinemas', cinema_name, status];
    this.route.navigate(link, {relativeTo: this.activatedroute});
}


  ngOnInit() {
      this.activatedroute.params.subscribe((params: Params) => {
      const name: string = params['name'];
      const statusPr: string = params['status'];
      console.log(name);
      console.log(status);
      switch (name) {
          case 'CGV-Vinh-Trung': this.cinema_name = 'CGV Vĩnh Trung Plaza'; break;
          case 'CGV-Vincom': this.cinema_name = 'CGV VinCom Đà Nẵng'; break;
          case 'Lotte': this.cinema_name = 'Lotte Đà Nẵng'; break;
          case 'Galaxy': this.cinema_name = 'Galaxy Đà Nẵng'; break;
      }

      switch (statusPr) {
          case 'phimdangchieu': this.status = 'Phim đang chiếu'; break;
          case 'phimsapchieu': this.status = 'Phim sắp chiếu'; break;
          case 'phimtrongthang': this.status = 'Phim trong tháng'; break;
      }
      this.cinemaService.getCinemaByName(this.cinema_name)
          .then(cinema => {this.cinema = cinema; console.log(this.cinema); });
      console.log('1+ ' + this.cinema_name);
      console.log('2+ ' + this.status);
      this.movieService.getMoviesByStatusCinema(this.status, this.cinema_name)
      .subscribe(movies => {this.movies = movies; console.log(this.movies); });
  });
  }

}
