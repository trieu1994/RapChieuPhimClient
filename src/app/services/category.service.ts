import { Http, Response, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cate } from '../models/cate';

@Injectable()
export class CategoryService {
  private cateAPI = 'http://apicine.herokuapp.com/public/api/categories';
  constructor(private http: Http) { }

  getCates(): Observable< Cate[] > {
    return this.http.get(this.cateAPI)
    .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
}
}
