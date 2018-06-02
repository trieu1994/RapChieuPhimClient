import { Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { New } from '../models/new';

@Injectable()
export class NewsService {
  private newsAPI = 'https://apicine.herokuapp.com/public/api/news';

  constructor(private http: Http) { }

  getNews(): Observable<New[]> {
    return this.http.get(this.newsAPI)
          .map(res => res.json())
            .catch(this.handleError);
  }

  getNewById(id: number): Observable<New> {
    return this.getNews().map(news => news.find(anew => anew.id === id));
 }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
