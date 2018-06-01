import { FacebookService, InitParams } from 'ngx-facebook';
import { DateshowService } from './../../services/dateshow.service';
import { RatingService } from './../../services/rating.service';
import { ScheduleService } from './../../services/schedule.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from './../../services/movie.service';
import { Dateshow } from './../../models/dateshow';
import { Component, OnInit, Directive, ElementRef, ComponentFactoryResolver, ComponentRef, Input } from '@angular/core';
import { Schedule_Movie } from '../../models/schedule';
import { Cinema } from '../../models/cinema';
import { Movie } from '../../models/movie';
import 'rxjs/add/operator/map';
import { ViewEncapsulation } from '@angular/core';
import '../../../assets/js/fbplugin.js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent implements OnInit {
  schedule_Days: Dateshow[];
  schedule_day: Schedule_Movie[];
  selectedCinema: Cinema ;
  idMove: number;
  current_url: string;
  urlfb: any;
  Time: any[];
  newRating: number;
  translate: TranslateService;
  titleEng: string;
  movie: Movie;
  movie_imdb: Movie;
  itemSelectPuk: number;
  // tslint:disable-next-line:max-line-length
  constructor(private movieService: MovieService, private route: ActivatedRoute, private scheduleService: ScheduleService, private ratingService: RatingService, private dateshowService: DateshowService, private router: Router, public sanitizer: DomSanitizer, private translateService: TranslateService) { 
    this.translate = translateService;
    translateService.setDefaultLang('vi');
    translateService.use('vi');  
}

  public itemImage: any =
  {
      'puk': 4,
      'selectedPuk': this.itemSelectPuk,
  };

  public itemSvg: any =
  {
      'puk': 10,
      'selectedPuk': this.itemSelectPuk,
     //  console.log('rating1:'+this.itemSelectPuk);
  };

  public itemHover: number;

  getMovieByid() {
    this.route.params.forEach((params: Params) => {
         const id = +params['id'];
         this.movieService.getMovieById(id)
             .subscribe(movie => this.movie = movie);
        this.movieService.getMovieById(id)
             .subscribe(movie =>{
              this.movieService.getIMDB(movie.titleEng).subscribe(movie => this.movie_imdb = movie);
              console.log('rating:' + this.movie.rating);
              this.itemSvg.selectedPuk = this.movie.rating;
              this.itemSelectPuk = this.movie.rating;
              this.idMove = this.movie.id;
              });
        //  setTimeout(() => {
        //      if (this.movie.titleEng) {
        //          this.movieService.getIMDB(this.movie.titleEng).subscribe(movie => this.movie_imdb = movie);
        //              console.log('rating:' + this.movie.rating);
        //              this.itemSvg.selectedPuk = this.movie.rating;
        //              this.itemSelectPuk = this.movie.rating;
        //              this.idMove = this.movie.id;
        //      }
        //  }, 1000);
     });
  }


  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.current_url = 'https://www.facebook.com/plugins/comments.php?api_key=196731574429025&amp;channel_url=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2F87XNE1PC38r.js%3Fversion%3D42%23cb%3Dfea26d7ba2398e%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff34f5a9db2e29f%26relation%3Dparent.parent&amp;href=http://localhost:4200' + this.router.url + '&amp;locale=vi_VN&amp;numposts=3&amp;sdk=joey&amp;version=v2.9&amp;width=200';
    this.urlfb = this.sanitizer.bypassSecurityTrustResourceUrl(this.current_url);
    this.getMovieByid();
    this.route.params.forEach((params: Params) => {
       const id = +params['id'];
       this.dateshowService.getDateByIdMovie(id)
           .subscribe(schedule_Day => this.schedule_Days = schedule_Day);
   });
   this.route.params.forEach((params: Params) => {
       const id = +params['id'];
        const day = params['day'];

       this.scheduleService.getScheduleByDay(id, day)
           .subscribe(schedule_day => this.schedule_day = schedule_day);
  });
  }

  pukChangeSvg(newPukValue: number): void {
    this.itemSvg.selectedPuk = newPukValue;
    if (this.itemSelectPuk === 0) {
      this.newRating = this.itemSvg.selectedPuk;
    } else {
          this.newRating = Math.round((this.itemSelectPuk + this.itemSvg.selectedPuk) / 2 );
    }
    this.ratingService.updateRate(this.idMove, this.newRating).subscribe(res => {
        console.log(res);
    }, err => {
        console.log(err);
  });
  }


  pukChangeImage(newPukValue: number): void {
    this.itemImage.selectedPuk = newPukValue;
  }

  pukHover(pukValue: number) {
    this.itemHover = pukValue;
  }
  sendRating(): void {

    if (this.itemSelectPuk === 0) {
            this.newRating = this.itemSvg.selectedPuk;
    } else {
            this.newRating = Math.round((this.itemSelectPuk + this.itemSvg.selectedPuk) / 2 );
    }
    this.ratingService.updateRate(this.idMove, this.newRating).subscribe(res => {
          console.log(res);
    }, err => {
          console.log(err);
        });
    $('#rateModal').modal('hide');
  }
}
