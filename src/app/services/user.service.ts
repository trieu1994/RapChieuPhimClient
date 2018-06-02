import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UserService {
  private userApi = 'https://apicine.herokuapp.com/public/api/user';
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('token');
   }
   getUser(): Observable<User[]> {
    console.log('test');
    return this.http.get(this.userApi)
                .map(res => res.json())
                .catch(this.handleError);
  }

  getUserById(id: number): Observable<User> {
    return this.getUser()
            .map(users => users.find(user => user.id === id));
}
 getLogin(email: string, password: string): Observable<any> {
    const postUrl = 'https://apicine.herokuapp.com/public/api/login';

    const headers = new Headers({'Content-Type': 'application/json'});

     return this.http.post(postUrl, JSON.stringify({email, password}), {headers: headers});
}

changeInformation(id: number, name: string, address: string, phone: string, password: string): Observable<any> {
    const putUrl = 'https://apicine.herokuapp.com/public/api/user/' + id;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(putUrl, JSON.stringify({name, address, phone,password}), {headers: headers});
}

signUp(newAccount: any): Observable<any> {
  const url = 'https://apicine.herokuapp.com/public/api/register';
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.post(url, JSON.stringify(newAccount), {headers: headers}).map(res => res.json());
}

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setLoggedIn(logined: boolean) {
      this.loggedIn = logined;
  }
}
