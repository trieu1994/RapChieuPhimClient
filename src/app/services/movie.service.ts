import { CATES } from './../components/category/mock-data';
import { Cate } from './../models/cate';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MovieAll, Movie } from '../models/movie';

@Injectable()
export class MovieService {
  private moviesAllUrl = 'https://apicine.herokuapp.com/public/api/allmovies';
  private moviesApiUrl = 'https://apicine.herokuapp.com/public/api/movies';

  getAllMovies(): Observable<MovieAll[]> {
    return this.http.get(this.moviesAllUrl)
        .map(res => res.json())
        .catch(this.handleError );
  }

  getMovies(): Observable<Movie[]> {
        return this.http.get(this.moviesApiUrl)
            .map(res => res.json())
            .catch(this.handleError);
  }

  constructor(private http: Http) { }

  getCates(): Promise<Cate[]> {
    return Promise.resolve(CATES);
  }

  getMoviesCinema(): Observable<Movie[]> {
      return this.getMovies().map(Movies => Movies.filter(movie => movie.cinema === name));
  }

  getMoviesByStatusCinema(status: string, cinema_name: string): Observable<Movie[]> {
      return this.getMovies().map(Movies => Movies.filter(movie => (movie.status === status && movie.cinema === cinema_name)));
  }

  getMovieById(id: number): Observable<Movie> {
    return this.getMovies().map(Movies => Movies.find(movie => movie.id === id ));
 }

  getIMDB(title: string): Observable<Movie> {
    return this.http.get('https://www.omdbapi.com/?t=' + title + '&plot=short&r=json' + '&apikey=b6ab99d7')
            .map(res => res.json())
            .catch(this.handleError);
}

  getMovieByCate(name: string): Observable<Movie[]>{
    return this.getMovies().map(Movies => Movies.filter(movie => movie.cate === name));
 }
  getCateByName(name: string): Promise<Cate> {
      return this.getCates().then(CATES => CATES.find(cate => cate.name === name));

  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
}
}
