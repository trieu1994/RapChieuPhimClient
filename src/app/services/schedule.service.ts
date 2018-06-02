import { Injectable } from '@angular/core';
import { Schedule_Movie } from '../models/schedule';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleService {
  private scheduleApiUrl = 'https://apicine.herokuapp.com/public/api/schedule';
  schedule: Schedule_Movie[];
  constructor(private http: Http) { }

  getSchedule(): Observable<Schedule_Movie[]> {
    console.log('service');
    return this.http.get(this.scheduleApiUrl)
        .map(res => res.json())
        .catch(this.handleError);
  }


  getScheduleById(id: number): Observable<Schedule_Movie[]> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getSchedule().map(schedule => schedule.filter(schedule => schedule.movie_id === id));
  }

  getScheduleByCinema(id: number): Observable<Schedule_Movie[]> {
      // tslint:disable-next-line:no-shadowed-variable
      return this.getSchedule().map(schedule => schedule.filter(schedule => schedule.cinema_id === id));
  }

  getScheduleByDay(id: number, showingDay: String): Observable<Schedule_Movie[]> {
      // tslint:disable-next-line:no-shadowed-variable
      return this.getSchedule().map(schedule => schedule.filter(schedule => schedule.dateShow === showingDay && schedule.movie_id === id));
  }

  getScheduleByDayCinema(id: number, showingDay: String, cinema: string): Observable<Schedule_Movie[]> {
      // tslint:disable-next-line:no-shadowed-variable
      return this.getScheduleByDay(id, showingDay).map(schedule => schedule.filter(schedule => schedule.cinema === cinema));
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
