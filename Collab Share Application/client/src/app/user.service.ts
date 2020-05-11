import { Injectable } from '@angular/core';
import { UserList } from './interfaces/userlist';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private list = 'http://localhost:9090/user/list';
  private add = 'http://localhost:9090/user/add';
  private update = 'http://localhost:9090/user/update';
  private addposts = 'http://localhost:9090/user/addposts';
  private getposts = 'http://localhost:9090/user/getposts';
  private getuserdata = 'http://localhost:9090/user/userdata';

  public editId: any;
  // Inject the HTTPClient module into the service
  constructor(private http: HttpClient, private router: Router) { }

  checkSession() {
    if (localStorage.getItem('loggedUser') === null) {
      this.router.navigateByUrl('/loginpage');
    }
  }

  // Get all users
  getAllUsers(): Observable<UserList[]> {
    return this.http.get<UserList[]>(this.list);
  }

  getSessionData(resData): Observable<any> {
    return this.http.post(this.getuserdata, resData);
  }

  // Add users
  addUser(params: {}): Observable<any> {
    return this.http.post(this.add, params);
  }


  // Update user
  updateUser(params: {}): Observable<UserList> {
    console.log(params);
    return this.http.post<UserList>(this.update, params);
  }

  addPost(params: {}): Observable<any> {
    return this.http.post(this.addposts, params);
  }

  getAllPost(): Observable<any> {
    return this.http.post(this.getposts, {});
  }

}
