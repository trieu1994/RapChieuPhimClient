import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Booking } from '../models/booking';

@Injectable()
export class RatingService {
  private bookingAPI = 'http://apicine.herokuapp.com/public/api/booking';
  private moviesApiUrl = 'http://apicine.herokuapp.com/public/api/movies/';
  constructor(private http: Http) { }
  updateRate(idMovie: number, rating: number): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const urlPut = this.moviesApiUrl + idMovie;
    console.log('url: ' + urlPut);
    console.log('body: ' + JSON.stringify({rating}));
    return this.http.put(urlPut, JSON.stringify({rating}), {headers: headers}).map(res => res.json());
  }

  booking(bookingO: Booking): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('body: ' + JSON.stringify(bookingO));
    return this.http.post(this.bookingAPI, JSON.stringify(bookingO), {headers: headers});
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
}

}
