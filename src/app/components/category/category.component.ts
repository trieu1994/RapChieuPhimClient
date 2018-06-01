import { Movie } from './../../models/movie';
import { Cate } from './../../models/cate';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  movies: Movie[];
  cate: Cate;
  movie: Movie;
  constructor(private moviesService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const name = params['name'];
      this.moviesService.getMovieByCate(name)
          .subscribe(movies => this.movies = movies);
  });

  this.route.params.forEach((params: Params) => {
      const name = params['name'];
      this.moviesService.getCateByName(name)
          .then(cate => this.cate = cate);
  });
  }

  onSelect(movie: Movie) {
    this.router.navigate(['/movies', movie.id]);
}

}
