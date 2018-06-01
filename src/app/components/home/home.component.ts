import { TranslateService} from '@ngx-translate/core';
import { NewsService } from './../../services/news.service';
import { Router } from '@angular/router';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { New } from '../../models/new';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textSearch: string;
  isfilteringMovie = true;
  translate: TranslateService;
  movies: Movie[];
  movie: Movie;
  search: '';
  currentMovie = [];
  news: New[];
  anew: New;
  // tslint:disable-next-line:max-line-length
  constructor(private movieService: MovieService, private router: Router , private newsService: NewsService, private translateService: TranslateService) {
    this.translate = translateService;
    translateService.setDefaultLang('vi');
    translateService.use('vi');
   }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  getNews(): void {
    this.newsService.getNews().subscribe(news => this.news = news);
  }

  selectNew(anew: New) {
    this.router.navigate(['/news', anew.id]);
  }

  ngOnInit() {
    this.getMovies();
    this.textSearch = '';
    this.isfilteringMovie = true;
    this.getNews();
  }

  onKey(event: any) {
    this.isfilteringMovie = false;
    console.log('on key @@@@ ', this.textSearch);
    // reverst food
    var sizeCurrentMovie = this.currentMovie.length;
    if (sizeCurrentMovie > 0) {
      //pop all food in food
      var sizeAllMovie = this.movies.length;
      while (sizeAllMovie > 0) {
        this.movies.splice(0, 1);
        sizeAllMovie--;
      }
      this.currentMovie.forEach((value, index) => {
        this.movies.push(value);
      }, this);
    }

    else {
      this.movies.forEach(function (value, index) {
        this.currentMovie.push(value);
      }, this);
    }

    var ENTER_KEY = 13;
    var indexArr = [];

    this.currentMovie.forEach(function (value, index) {
      if (!value.titleViet.includes(this.textSearch)) {
        indexArr.push(index);
      }
    }, this);

    var size = indexArr.length;

    // push food out of array => filter for search
    for (var x = 0; x < size; x++) {
      this.movies.splice(indexArr[x], 1);
      if (size > 0 && x < (size - 1)) {
        for (var y = 1; y < size; y++) {
          indexArr[y] -= 1;
        }
      }
    }

    console.log('all food size ' + this.movies.length);
    console.log('current food size ' + this.currentMovie.length);
      
    // if(event.keyCode === ENTER_KEY) {
    //   this.searchTags();
    // }
  }
}
