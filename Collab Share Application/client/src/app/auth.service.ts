import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {


  private register = 'http://localhost:9090/user/register';
  private login = 'http://localhost:9090/user/login';

  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  isLoggedIn() {
    return this.loggedInStatus;
  }

  registerUser(params: {}): Observable<any> {
    console.log(params);
    return this.http.post(this.register, params);
  }

  loginUser(params: {}): Observable<any> {
    return this.http.post(this.login, params);
  }

}
