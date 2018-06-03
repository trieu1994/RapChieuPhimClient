import { Cinema } from './../../models/cinema';
import { TranslateService } from '@ngx-translate/core';
import { Booking } from './../../models/booking';
import { MovieService } from './../../services/movie.service';
import { RatingService } from './../../services/rating.service';
import { CinemaService } from './../../services/cinema.service';
import { ScheduleService } from './../../services/schedule.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { Schedule_Movie } from '../../models/schedule';

declare var $: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  movies: Movie[];
  schedules: Schedule_Movie[];
  cinema: Cinema[];
  currentMovie = [];
  isfilteringMovie = true;
  selected: string;
  num: number;
  total: number;
  price: number;
  Time: any[];
  cinema_id: number;
  date: string;
  time: string;
  dateTime: string;
  listTime: any[];
  cinema_name: string;
  movie_name: string;
  fullname: string;
  address: string;
  phone: string;
  phone_number: string;
  email: string;
  token: string;
  allTime = [];
  translate: TranslateService;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private scheduleService: ScheduleService, private cinemaService: CinemaService, private ratingService: RatingService, private movieService: MovieService, private translateService: TranslateService) {
   this.translate = translateService;
   translateService.setDefaultLang('vi');
   translateService.use('vi');
  }

  getMovieSchedule(): void {
    this.scheduleService.getSchedule().subscribe(schedules => this.schedules = schedules);
    setTimeout(() => {
    }, 1000);
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  ngOnInit() {
    this.selected = '';
    this.getMovieSchedule();

    this.getMovies();
    this.cinemaService.getCinema().then(cinemas => this.cinema = cinemas);
    this.num = 0;
    this.total = 0;

    this.token = localStorage.getItem('token');
    console.log('currentEmail ' + localStorage.getItem('token'));

    this.dateTime = '';
    this.cinema_name = '';
    this.movie_name = '';

  }

  onSelect($event: any) {

    const sizeCurrentMovie = this.currentMovie.length;

    if (sizeCurrentMovie > 0) {

      // pop all food in food
      let sizeAllSchedule = this.schedules.length;

      while (sizeAllSchedule > 0) {
        this.schedules.splice(0, 1);
        sizeAllSchedule--;
      }
      this.currentMovie.forEach((value, index) => {
        this.schedules.push(value);
      }, this);
    } else {
      this.schedules.forEach(function (value, index) {
        this.currentMovie.push(value);
      }, this);
    }


    const indexArr = [];

    this.currentMovie.forEach(function (value, index) {
      if (!value.cinema.includes(this.selected)) {
        indexArr.push(index);
      }
    }, this);

    const size = indexArr.length;

    // push food out of array => filter for search
    for (let x = 0; x < size; x++) {
      this.schedules.splice(indexArr[x], 1);
      if (size > 0 && x < (size - 1)) {
        for (let y = 1; y < size; y++) {
          indexArr[y] -= 1;
        }
      }
    }

  }


onSelect2($event: any) {

    console.log('all food size sches ' + this.schedules);
    console.log('on key @@@@ ', this.selected);

    const sizeCurrentMovie = this.currentMovie.length;
    if (sizeCurrentMovie > 0) {

      // pop all food in food
      let sizeAllSchedule = this.schedules.length;
      console.log('current Movice ', this.schedules);

      while (sizeAllSchedule > 0) {
        this.schedules.splice(0, 1);
        sizeAllSchedule--;
      }
      this.currentMovie.forEach((value, index) => {
        this.schedules.push(value);
      }, this);
    } else {
      this.schedules.forEach(function (value, index) {
        this.currentMovie.push(value);
      }, this);
    }


    const indexArr = [];

    this.currentMovie.forEach(function (value, index) {
      if (!value.titleEng.includes(this.selected)) {
        indexArr.push(index);
      }
    }, this);

    const size = indexArr.length;

    // push food out of array => filter for search
    for (let x = 0; x < size; x++) {
      this.schedules.splice(indexArr[x], 1);
      if (size > 0 && x < (size - 1)) {
        for (let y = 1; y < size; y++) {
          indexArr[y] -= 1;
        }
      }
    }

    console.log('all food sizea ' + this.schedules);
    // console.log("current food size "+ this.currentMovie.length);

    // }
  }

  onKey(event: any) {
    console.log('total: ' + this.total);
    this.total = Math.round(this.num * this.price);
  }

  onSelect1(schedule: any, time: any) {
    this.price = schedule.price;
     this.dateTime = time + ' ' + schedule.dateShow;
     if (schedule.cinema_id === 1) {
       this.price = 50000;

     } else if (schedule.cinema_id === 2) {
       this.price = 60000;

     } else if (schedule.cinema_id === 3) {
       this.price = 70000;

     } else if (schedule.cinema_id === 4) {
       this.price = 100000;

     }

     this.cinema_name = schedule.cinema;
     this.movie_name = schedule.titleEng;
      this.token = localStorage.getItem('token');
     if (localStorage.getItem('token') !== null) {   
        this.fullname = localStorage.getItem('currentName').split('"')[1];
        this.address = localStorage.getItem('currentAddress').split('"')[1];
        this.phone = localStorage.getItem('currentPhone').split('"')[1];
    }
//  } else {
//    // $('#book1').modal('hide');
//    $('#login').modal('show');
//  }
}

Booking() {
   const booking = new Booking();
   booking.address = this.address;
   booking.fullname = this.fullname;
   booking.num = this.num;
   booking.total = this.total;
   booking.datetime = this.dateTime ;
   booking.movie_name = this.movie_name;
   booking.cinema_name = this.cinema_name;
   booking.phone = this.phone;
   booking.email = this.email;

  this.ratingService.booking(booking).subscribe(res => {
    console.log(res);

  }, err => {
    console.log(err);
  });
  alert('Đặt vé thành công');
   $('#book1').modal('hide');
   this.num = 0;
   this.total = 0;
}

closeSignUp() {
  $('#book1').modal('hide');
  this.dateTime = '';
  this.movie_name = '';
  this.cinema_name = '';
  this.price = 0;
  this.total = 0;
  this.fullname = '';
  this.num = 0;
}
}
