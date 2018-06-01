import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cinema } from '../models/cinema';
import { CINEMAS } from '../components/cinema/mock-data';


@Injectable()
export class CinemaService {

  constructor(private http: Http) { }

  getCinema(): Promise<Cinema[]> {
    return Promise.resolve(CINEMAS);
}

  getCinemaByName(name: string): Promise<Cinema> {
    return this.getCinema()
          // tslint:disable-next-line:no-shadowed-variable
          .then(CINEMAS => CINEMAS.find(cinema => cinema.name === name));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
