import { Dateshow } from './../models/dateshow';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DateshowService {
  private dateAPI = 'http://apicine.herokuapp.com/public/api/scheduleDateshow';
  constructor(private http: Http) { }
  getDateShow(): Observable< Dateshow[] > {
        return this.http.get(this.dateAPI)
              .map(res => res.json())
                .catch(this.handleError);
  }

  getDateByIdMovie(id: number): Observable< Dateshow[] > {
    return this.getDateShow().map(Movies => Movies.filter(dateshow => dateshow.movie_id === id));
}

  private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }
}
